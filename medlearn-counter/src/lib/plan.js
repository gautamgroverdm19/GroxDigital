// Weekly roadmap, Today's 5, flashcard deck and weak list – all derived from your data.
import { FLASHCARD_DECK_SIZE, STATUS, WEEKLY_PLAN_TEMPLATE } from '../config/constants.js';
import { getProgress, isDue, isWeak, priority } from './srs.js';

export function buildWeeklyPlan(idx) {
  const remaining = new Map(idx.categories.map((c) => [c.key, c]));
  const weeks = [];
  for (const t of WEEKLY_PLAN_TEMPLATE) {
    const re = new RegExp(t.pattern, 'i');
    const keys = [...remaining.values()].filter((c) => c.key !== '__none' && re.test(c.name)).map((c) => c.key);
    if (!keys.length) continue;
    keys.forEach((k) => remaining.delete(k));
    weeks.push({ label: t.label, categoryKeys: keys });
  }
  // Every other category becomes its own week, biggest first.
  for (const c of [...remaining.values()].sort((a, b) => b.count - a.count)) {
    weeks.push({ label: c.name, categoryKeys: [c.key] });
  }
  return weeks.map((w, i) => ({
    ...w,
    n: i + 1,
    count: w.categoryKeys.reduce((s, k) => s + (idx.byCategory.get(k)?.length || 0), 0),
    categoryNames: w.categoryKeys.map((k) => (k === '__none' ? 'Uncategorised' : idx.display.category.get(k))),
  }));
}

export function weekMedicines(idx, week) {
  if (!week) return [];
  return week.categoryKeys.flatMap((k) => idx.byCategory.get(k) || []);
}

export function weekProgress(idx, week, progress) {
  const meds = weekMedicines(idx, week);
  let mastered = 0, practicing = 0, learning = 0;
  for (const m of meds) {
    const s = progress[m.id]?.status;
    if (s === STATUS.MASTERED) mastered++;
    else if (s === STATUS.PRACTICING) practicing++;
    else if (s === STATUS.LEARNING) learning++;
  }
  return { total: meds.length, mastered, practicing, learning, started: mastered + practicing + learning };
}

export function dueMedicines(meds, progress, now) {
  return meds
    .filter((m) => isDue(progress[m.id], now))
    .sort((a, b) => priority(progress[b.id], now) - priority(progress[a.id], now));
}

/** Today's list: anything due first, then the current week's category, then the rest. */
export function pickToday({ meds, idx, progress, plan, currentWeek, goal, now }) {
  const out = [];
  const seen = new Set();
  const add = (m) => {
    if (out.length < goal && !seen.has(m.id)) {
      seen.add(m.id);
      out.push(m.id);
    }
  };
  dueMedicines(meds, progress, now).forEach(add);
  const week = plan[Math.min(currentWeek, plan.length) - 1];
  const wm = weekMedicines(idx, week);
  wm.filter((m) => getProgress(progress, m.id).status === STATUS.LEARNING).forEach(add);
  wm.filter((m) => getProgress(progress, m.id).status === STATUS.NOT_STARTED).forEach(add);
  for (const w of plan) {
    if (out.length >= goal) break;
    weekMedicines(idx, w).filter((m) => getProgress(progress, m.id).status === STATUS.NOT_STARTED).forEach(add);
  }
  wm.forEach(add); // everything started already: revise the week
  return out;
}

export function weakMedicines(meds, progress) {
  return meds
    .filter((m) => isWeak(progress[m.id]))
    .sort((a, b) => (progress[b.id].wrong - progress[a.id].wrong) || (progress[b.id].lastMistakeDate || '').localeCompare(progress[a.id].lastMistakeDate || ''));
}

export function flashcardDeck({ meds, idx, progress, todayIds, plan, currentWeek, now }) {
  const out = [];
  const seen = new Set();
  const add = (m) => {
    if (m && out.length < FLASHCARD_DECK_SIZE && !seen.has(m.id)) {
      seen.add(m.id);
      out.push(m);
    }
  };
  dueMedicines(meds, progress, now).forEach(add);
  todayIds.forEach((id) => add(idx.byId.get(id)));
  const wm = weekMedicines(idx, plan[Math.min(currentWeek, plan.length) - 1]);
  wm.filter((m) => [STATUS.LEARNING, STATUS.PRACTICING].includes(getProgress(progress, m.id).status)).forEach(add);
  if (out.length < 10) wm.forEach(add);
  return out;
}
