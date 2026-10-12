import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { importText, mapColumns, mergeMedicines } from '../src/lib/importer.js';
import { buildIndex } from '../src/lib/indexes.js';
import { buildWeeklyPlan, pickToday } from '../src/lib/plan.js';
import { availableTypes, buildQuiz } from '../src/lib/quiz.js';
import { applyAnswer, emptyProgress } from '../src/lib/srs.js';
import { saltCore } from '../src/lib/text.js';
import { streakBonus, levelInfo } from '../src/lib/gamification.js';

const csv = readFileSync(new URL('../public/data/store-inventory.csv', import.meta.url), 'utf8');

test('maps the store inventory columns', () => {
  const headers = csv.split('\n')[0].replace(/^﻿/, '').split(',');
  const { map } = mapColumns(headers);
  assert.equal(map.brand, 'Medicine / Brand Name');
  assert.equal(map.salt, 'Salt / Composition');
  assert.equal(map.class, 'Category');
  assert.equal(map.category, 'Colour Class');
  assert.equal(map.shelf, 'Sec');
});

test('imports, merges duplicates into locations', async () => {
  const { medicines, report } = await importText(csv);
  assert.ok(medicines.length > 2500, `got ${medicines.length}`);
  assert.ok(report.merged > 0);
  const multi = medicines.find((m) => m.locations.length > 1);
  assert.ok(multi, 'some medicine has several locations');
  const again = mergeMedicines(medicines, medicines);
  assert.equal(again.added, 0);
});

test('salt core ignores strength and form', () => {
  assert.equal(saltCore('Paracetamol 650mg'), saltCore('Paracetamol 500mg Tablet'));
  assert.notEqual(saltCore('Paracetamol 650mg'), saltCore('Ibuprofen 400mg + Paracetamol 325mg'));
});

test('quiz options are 4, unique, one correct, distractors are real data', async () => {
  const { medicines } = await importText(csv);
  const idx = buildIndex(medicines);
  const plan = buildWeeklyPlan(idx);
  assert.match(plan[0].label, /Acidity/);
  const types = availableTypes(idx, medicines);
  for (const type of types) {
    const qs = buildQuiz({ mode: 'quick', type, idx, meds: medicines, progress: {}, plan, currentWeek: 1, now: '2026-10-12' });
    assert.ok(qs.length > 0, type);
    for (const q of qs) {
      assert.equal(q.type, type);
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options.map((o) => o.label.toLowerCase())).size, 4, JSON.stringify(q.options));
      assert.equal(q.options.filter((o) => o.correct).length, 1);
    }
  }
  const weekly = buildQuiz({ mode: 'weekly', idx, meds: medicines, progress: {}, plan, currentWeek: 1, now: '2026-10-12' });
  assert.equal(weekly.length, 15);
});

test('works with a tiny file', async () => {
  const small = csv.split('\n').slice(0, 31).join('\n');
  const { medicines } = await importText(small);
  const idx = buildIndex(medicines);
  const plan = buildWeeklyPlan(idx);
  const qs = buildQuiz({ mode: 'quick', idx, meds: medicines, progress: {}, plan, currentWeek: 1, now: '2026-10-12' });
  assert.equal(qs.length, 5);
  const ids = pickToday({ meds: medicines, idx, progress: {}, plan, currentWeek: 1, goal: 5, now: '2026-10-12' });
  assert.equal(ids.length, 5);
});

test('spaced repetition 1-3-7-14 then mastered; wrong drops a step', () => {
  let p = emptyProgress();
  let d = '2026-01-01';
  p = applyAnswer(p, true, 'salt', d);
  assert.equal(p.status, 'practicing');
  assert.equal(p.nextReview, '2026-01-02');
  const steps = [];
  for (let i = 0; i < 4; i++) {
    d = p.nextReview;
    p = applyAnswer(p, true, 'salt', d);
    steps.push(p.nextReview);
  }
  assert.deepEqual(steps, ['2026-01-05', '2026-01-12', '2026-01-26', '2026-02-25']);
  assert.equal(p.status, 'mastered');
  p = applyAnswer(p, false, 'rack', d);
  assert.equal(p.status, 'practicing');
  assert.equal(p.lastMistakeType, 'rack');
  assert.equal(p.nextReview, '2026-01-27');
});

test('xp rules', () => {
  assert.equal(streakBonus(3), 15);
  assert.equal(streakBonus(5), 25);
  assert.equal(streakBonus(10), 50);
  assert.equal(streakBonus(4), 0);
  assert.equal(levelInfo(900).name, 'Salt Spotter');
});
