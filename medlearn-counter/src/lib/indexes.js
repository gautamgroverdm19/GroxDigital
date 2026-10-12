// Lookup tables built once per data change. Keeps search and quiz fast with 5,000+ medicines.
import { norm, saltCore } from './text.js';

const push = (map, key, val) => {
  if (!key) return;
  const arr = map.get(key);
  if (arr) arr.push(val);
  else map.set(key, [val]);
};
const addSet = (map, key, val) => {
  if (!key || !val) return;
  let s = map.get(key);
  if (!s) map.set(key, (s = new Set()));
  s.add(val);
};

export const locKey = (rack, shelf) => `${String(rack || '').toUpperCase()}|${norm(shelf)}`;
export const locLabel = (l) => [l?.rack && `Rack ${l.rack}`, l?.shelf && `Shelf ${l.shelf}`].filter(Boolean).join(' · ');

/** Apply your own edits on top of imported data. */
export function applyEdits(medicines, edits) {
  if (!edits || !Object.keys(edits).length) return medicines;
  return medicines.map((m) => {
    const e = edits[m.id];
    if (!e) return m;
    const merged = { ...m, ...e };
    if ('rack' in e || 'shelf' in e) {
      const first = { rack: String(merged.rack || '').toUpperCase(), shelf: merged.shelf || '' };
      merged.locations = [first, ...(m.locations || []).slice(1)];
    }
    return merged;
  });
}

export function buildIndex(meds) {
  const idx = {
    byId: new Map(),
    bySalt: new Map(),
    byClass: new Map(),
    byCategory: new Map(),
    byLocation: new Map(),
    byRack: new Map(),
    display: { salt: new Map(), class: new Map(), category: new Map(), company: new Map() },
    categoryClasses: new Map(),
    classSalts: new Map(),
    categorySalts: new Map(),
    shelvesByRack: new Map(),
    racks: [],
    search: [],
    categories: [],
  };

  meds.forEach((m) => {
    idx.byId.set(m.id, m);
    const s = saltCore(m.salt), c = norm(m.class), g = norm(m.category), co = norm(m.company);
    if (s) idx.display.salt.set(s, m.salt);
    if (c) idx.display.class.set(c, m.class);
    if (g) idx.display.category.set(g, m.category);
    if (co) idx.display.company.set(co, m.company);
    push(idx.bySalt, s, m);
    push(idx.byClass, c, m);
    push(idx.byCategory, g || '__none', m);
    addSet(idx.categoryClasses, g, c);
    addSet(idx.classSalts, c, s);
    addSet(idx.categorySalts, g, s);
    (m.locations || []).forEach((l) => {
      push(idx.byLocation, locKey(l.rack, l.shelf), m);
      if (l.rack) {
        push(idx.byRack, l.rack, m);
        addSet(idx.shelvesByRack, l.rack, l.shelf);
      }
    });
    idx.search.push({
      m,
      brand: norm(m.brand),
      salt: norm(m.salt),
      cat: `${norm(m.class)} ${norm(m.category)}`,
      rack: (m.locations || []).map((l) => `${l.rack} ${norm(l.shelf)}`).join(' '),
    });
  });

  idx.racks = [...idx.byRack.keys()].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  idx.categories = [...idx.byCategory.entries()]
    .map(([key, list]) => ({ key, name: key === '__none' ? 'Uncategorised' : idx.display.category.get(key), count: list.length }))
    .sort((a, b) => b.count - a.count);
  return idx;
}

/** Other medicines with the same salt (computed from your data). */
export function sameSaltBrands(idx, med) {
  const s = saltCore(med.salt);
  if (!s) return [];
  return (idx.bySalt.get(s) || []).filter((m) => m.id !== med.id);
}

/** Instant search: every word must match brand, salt, class/category or rack. */
export function searchMedicines(idx, query, field = 'all') {
  const words = norm(query).split(' ').filter(Boolean);
  if (!words.length) return [];
  const out = [];
  for (const row of idx.search) {
    const hay = field === 'brand' ? row.brand : field === 'salt' ? row.salt : field === 'category' ? row.cat : field === 'rack' ? row.rack : `${row.brand} ${row.salt} ${row.cat} ${row.rack}`;
    if (!words.every((w) => hay.includes(w))) continue;
    const q = words.join(' ');
    const score = row.brand.startsWith(q) ? 0 : row.brand.includes(q) ? 1 : row.salt.startsWith(q) ? 2 : row.salt.includes(q) ? 3 : 4;
    out.push({ m: row.m, score });
  }
  out.sort((a, b) => a.score - b.score || a.m.brand.localeCompare(b.m.brand));
  return out.map((r) => r.m);
}
