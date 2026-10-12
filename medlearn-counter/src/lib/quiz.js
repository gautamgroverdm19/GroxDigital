// Dynamic multiple-choice questions built from YOUR data.
// Wrong options are real values from other medicines in the file, chosen to be
// confusable (same class / same category / same rack first), never random words.
import { QUICK_QUIZ_LENGTH, STATUS, WEEKLY_TEST_LENGTH } from '../config/constants.js';
import { locKey, locLabel, sameSaltBrands } from './indexes.js';
import { dueMedicines, weakMedicines, weekMedicines } from './plan.js';
import { getProgress, priority } from './srs.js';
import { classCore, norm, saltCore, shuffle, toList } from './text.js';

export const QUESTION_TYPES = {
  salt: { label: 'Salt', short: 'Brand → Salt' },
  brand: { label: 'Brand', short: 'Salt → Brand' },
  class: { label: 'Class', short: 'Class' },
  category: { label: 'Category', short: 'Category' },
  rack: { label: 'Rack', short: 'Rack' },
  location: { label: 'Location', short: 'Rack · Shelf' },
  findByLocation: { label: 'Find by location', short: 'Shelf → Brand' },
  company: { label: 'Company', short: 'Company' },
  use: { label: 'Use', short: 'Use' },
  alternative: { label: 'Brand alternative', short: 'Same salt' },
  precaution: { label: 'Precaution', short: 'Precaution' },
};

// Types where the brand name is the answer – the medicine chip must not reveal it.
const HIDES_BRAND = new Set(['brand', 'findByLocation', 'alternative']);

/** Pick up to n unique values from pools (in order), skipping anything `reject` flags. */
function pickDistractors(pools, n, reject) {
  const out = [];
  const seen = new Set();
  for (const pool of pools) {
    for (const v of shuffle(pool)) {
      if (out.length >= n) return out;
      const k = norm(v);
      if (!v || seen.has(k) || reject(v)) continue;
      seen.add(k);
      out.push(v);
    }
  }
  return out;
}

const disp = (idx, kind, keys) => [...(keys || [])].map((k) => idx.display[kind].get(k)).filter(Boolean);
const brands = (list) => (list || []).map((m) => m.brand);
const L = (hi, en) => ({ hi, en });

function make(type, med, prompt, correct, distractors, explain) {
  if (!correct || distractors.length < 3) return null;
  const options = shuffle([{ label: correct, correct: true }, ...distractors.slice(0, 3).map((d) => ({ label: d, correct: false }))]);
  return {
    key: `${med.id}:${type}`,
    medId: med.id,
    type,
    typeLabel: QUESTION_TYPES[type].label,
    chip: HIDES_BRAND.has(type) ? med.category || med.class || '' : med.brand,
    prompt,
    options,
    answer: options.findIndex((o) => o.correct),
    explain,
  };
}

const withTrick = (med, e) => (med.memoryTrick ? { hi: `${e.hi} Trick: ${med.memoryTrick}`, en: `${e.en} Trick: ${med.memoryTrick}` } : e);

const GENERATORS = {
  salt(med, { idx }) {
    const core = saltCore(med.salt);
    if (!core) return null;
    const c = norm(med.class), g = norm(med.category);
    const d = pickDistractors(
      [disp(idx, 'salt', idx.classSalts.get(c)), disp(idx, 'salt', idx.categorySalts.get(g)), [...idx.display.salt.values()]],
      3,
      (v) => saltCore(v) === core
    );
    return make('salt', med, `What is the salt (composition) of ${med.brand}?`, med.salt, d,
      withTrick(med, L(`${med.brand} ka salt hai ${med.salt}.${med.class ? ` Ye ${med.class} hai.` : ''}`, `${med.brand} contains ${med.salt}.${med.class ? ` It is a ${med.class}.` : ''}`)));
  },

  brand(med, { idx }) {
    const core = saltCore(med.salt);
    if (!core) return null;
    const same = new Set(brands(idx.bySalt.get(core)).map(norm));
    const d = pickDistractors(
      [brands(idx.byClass.get(norm(med.class))), brands(idx.byCategory.get(norm(med.category))), brands(idx.search.slice(0, 400).map((r) => r.m))],
      3,
      (v) => same.has(norm(v))
    );
    return make('brand', med, `Which brand contains ${med.salt}?`, med.brand, d,
      L(`${med.salt} wala brand hai ${med.brand}.`, `${med.brand} is the brand that contains ${med.salt}.`));
  },

  class(med, { idx }) {
    if (!med.class) return null;
    // Options drop the bracket part, e.g. "PPI (Rabeprazole)" -> "PPI", so the salt doesn't give the answer away.
    const short = (v) => String(v).replace(/\s*\([^)]*\)/g, '').trim();
    const core = classCore(med.class);
    const d = pickDistractors(
      [disp(idx, 'class', idx.categoryClasses.get(norm(med.category))).map(short), [...idx.display.class.values()].map(short)],
      3,
      (v) => classCore(v) === core || !v
    );
    return make('class', med, `${med.brand} belongs to which class?`, short(med.class) || med.class, d,
      withTrick(med, L(`${med.brand} (${med.salt || 'salt —'}) ${med.class} class mein aata hai.`, `${med.brand} (${med.salt || 'salt not added'}) is a ${med.class}.`)));
  },

  category(med, { idx }) {
    if (!med.category) return null;
    const d = pickDistractors([idx.categories.map((c) => c.name)], 3, (v) => norm(v) === norm(med.category) || v === 'Uncategorised');
    return make('category', med, `${med.brand} is from which category?`, med.category, d,
      L(`${med.brand} ${med.category} category ki dawai hai.`, `${med.brand} is in the ${med.category} category.`));
  },

  rack(med, { idx }) {
    if (!med.rack) return null;
    const own = new Set((med.locations || []).map((l) => l.rack));
    const d = pickDistractors([idx.racks], 3, (v) => own.has(v));
    return make('rack', med, `In which rack is ${med.brand} kept?`, `Rack ${med.rack}`, d.map((r) => `Rack ${r}`),
      L(`${med.brand} Rack ${med.rack}${med.shelf ? `, Shelf ${med.shelf}` : ''} mein rakhi hai.`, `${med.brand} is kept in Rack ${med.rack}${med.shelf ? `, Shelf ${med.shelf}` : ''}.`));
  },

  location(med, { idx }) {
    if (!med.rack || !med.shelf) return null;
    const own = new Set((med.locations || []).map((l) => locKey(l.rack, l.shelf)));
    const sameRack = [...(idx.shelvesByRack.get(med.rack) || [])].map((s) => locLabel({ rack: med.rack, shelf: s }));
    const all = idx.racks.flatMap((r) => [...(idx.shelvesByRack.get(r) || [])].map((s) => locLabel({ rack: r, shelf: s })));
    const keyOf = (label) => {
      const m = label.match(/^Rack (.*) · Shelf (.*)$/);
      return m ? locKey(m[1], m[2]) : '';
    };
    const d = pickDistractors([sameRack, all], 3, (v) => own.has(keyOf(v)));
    const where = locLabel(med);
    return make('location', med, `Where exactly is ${med.brand} kept?`, where, d,
      L(`${med.brand} ki jagah: ${where}.`, `${med.brand} is at ${where}.`));
  },

  findByLocation(med, { idx }) {
    if (!med.rack || !med.shelf) return null;
    const here = new Set(brands(idx.byLocation.get(locKey(med.rack, med.shelf))).map(norm));
    const d = pickDistractors(
      [brands(idx.byCategory.get(norm(med.category))), brands(idx.byRack.get(med.rack)), brands(idx.search.slice(0, 400).map((r) => r.m))],
      3,
      (v) => here.has(norm(v))
    );
    const where = locLabel(med);
    return make('findByLocation', med, `Which of these is kept at ${where}?`, med.brand, d,
      L(`${where} par ${med.brand} rakhi hai.`, `${med.brand} is kept at ${where}.`));
  },

  company(med, { idx }) {
    if (!med.company) return null;
    const d = pickDistractors([[...idx.display.company.values()]], 3, (v) => norm(v) === norm(med.company));
    return make('company', med, `Which company makes ${med.brand}?`, med.company, d,
      L(`${med.brand} ko ${med.company} banati hai.`, `${med.brand} is made by ${med.company}.`));
  },

  use(med, ctx) {
    const use = toList(med.uses)[0];
    if (!use) return null;
    const own = new Set(toList(med.uses).map(norm));
    const sameSalt = saltCore(med.salt);
    const pool = ctx.withField('uses').filter((m) => saltCore(m.salt) !== sameSalt && norm(m.category) !== norm(med.category)).map((m) => toList(m.uses)[0]);
    const d = pickDistractors([pool], 3, (v) => own.has(norm(v)));
    return make('use', med, `${med.brand} is mainly given for…`, use, d,
      withTrick(med, L(`${med.brand} mainly ${use} ke liye diya jata hai.`, `${med.brand} is mainly given for ${use}.`)));
  },

  alternative(med, { idx }) {
    const alts = sameSaltBrands(idx, med);
    if (!alts.length) return null;
    const pick = shuffle(alts)[0];
    const same = new Set([med, ...alts].map((m) => norm(m.brand)));
    const d = pickDistractors(
      [brands(idx.byClass.get(norm(med.class))), brands(idx.byCategory.get(norm(med.category))), brands(idx.search.slice(0, 400).map((r) => r.m))],
      3,
      (v) => same.has(norm(v))
    );
    return make('alternative', med, `Which brand has the same salt as ${med.brand}?`, pick.brand, d,
      L(`${med.brand} aur ${pick.brand} dono mein same salt hai: ${med.salt}.`, `${med.brand} and ${pick.brand} share the same salt: ${med.salt}.`));
  },

  precaution(med, ctx) {
    const pre = toList(med.precautions)[0];
    if (!pre) return null;
    const pool = ctx.withField('precautions').filter((m) => saltCore(m.salt) !== saltCore(med.salt)).map((m) => toList(m.precautions)[0]);
    const d = pickDistractors([pool], 3, (v) => norm(v) === norm(pre));
    return make('precaution', med, `Which precaution applies to ${med.brand}?`, pre, d,
      L(`${med.brand} dete waqt dhyan rakho: ${pre}.`, `When dispensing ${med.brand}: ${pre}.`));
  },
};

function context(idx, meds) {
  const cache = {};
  return {
    idx,
    withField(f) {
      if (!cache[f]) cache[f] = meds.filter((m) => m[f]);
      return cache[f];
    },
  };
}

export function questionFor(med, ctx, preferred, exclude = new Set(), strict = false) {
  const order = strict ? [preferred] : [...(preferred ? [preferred] : []), ...shuffle(Object.keys(GENERATORS))];
  for (const t of order) {
    if (exclude.has(`${med.id}:${t}`)) continue;
    const q = GENERATORS[t]?.(med, ctx);
    if (q) return q;
  }
  return null;
}

/** Which question types your data can support (for the type chips on the Practice tab). */
export function availableTypes(idx, meds) {
  const ctx = context(idx, meds);
  const sample = shuffle(meds).slice(0, 60);
  return Object.keys(GENERATORS).filter((t) => sample.some((m) => GENERATORS[t](m, ctx)));
}

/**
 * Build a quiz.
 * mode: 'quick' | 'weak' | 'medicine' | 'ids' | 'weekly'
 */
export function buildQuiz({ mode = 'quick', type, ids = [], medId, idx, meds, progress, plan, currentWeek, todayIds = [], now }) {
  const ctx = context(idx, meds);
  const count = mode === 'weekly' ? WEEKLY_TEST_LENGTH : QUICK_QUIZ_LENGTH;
  const week = plan[Math.min(currentWeek, plan.length) - 1];
  let targets = [];

  if (mode === 'medicine' && medId) targets = [idx.byId.get(medId)].filter(Boolean);
  else if (mode === 'ids') targets = ids.map((id) => idx.byId.get(id)).filter(Boolean);
  else if (mode === 'weak') targets = weakMedicines(meds, progress).slice(0, 12);
  else if (mode === 'weekly') {
    const wm = weekMedicines(idx, week);
    const started = shuffle(wm.filter((m) => getProgress(progress, m.id).status !== STATUS.NOT_STARTED));
    targets = [...started, ...shuffle(wm.filter((m) => getProgress(progress, m.id).status === STATUS.NOT_STARTED))];
  } else {
    const seen = new Set();
    const add = (m) => m && !seen.has(m.id) && (seen.add(m.id), targets.push(m));
    dueMedicines(meds, progress, now).slice(0, count).forEach(add);
    todayIds.forEach((id) => add(idx.byId.get(id)));
    shuffle(weekMedicines(idx, week)).slice(0, count * 3).forEach(add);
    if (targets.length < count || type) shuffle(meds).slice(0, type ? 300 : count * 3).forEach(add);
  }
  if (mode === 'weak') targets.sort((a, b) => priority(progress[b.id], now) - priority(progress[a.id], now));

  const questions = [];
  const used = new Set();
  // Several rounds so a short list (one medicine, 2 weak ones) still gets varied questions.
  for (let round = 0; round < 6 && questions.length < count; round++) {
    let added = 0;
    for (const m of targets) {
      if (questions.length >= count) break;
      if (round > 0 && mode !== 'medicine' && mode !== 'ids' && mode !== 'weak') break;
      const preferred = type || (mode === 'weak' ? progress[m.id]?.lastMistakeType : null);
      const q = questionFor(m, ctx, round === 0 ? preferred : type, used, !!type && mode === 'quick');
      if (q) {
        used.add(q.key);
        questions.push(q);
        added++;
      }
    }
    if (!added) break;
  }
  return questions;
}
