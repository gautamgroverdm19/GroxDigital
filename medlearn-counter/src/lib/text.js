// Small text utilities shared by the importer, search and quiz.

export function norm(s) {
  return String(s ?? '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .replace(/[.\s]+$/, '')
    .trim();
}

export function headerKey(s) {
  return String(s ?? '').replace(/^﻿/, '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function clean(s) {
  if (s === null || s === undefined) return '';
  return String(s).replace(/\s+/g, ' ').trim();
}

// Splits a stored text field into list items. Chips (side effects, brands) may also split on commas.
export function toList(value, { commas = false } = {}) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(clean).filter(Boolean);
  const re = commas ? /[\n;|,]+/ : /[\n;|]+/;
  return String(value).split(re).map(clean).filter(Boolean);
}

export function hash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
  return (h >>> 0).toString(36);
}

export function slug(s) {
  return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 28) || 'item';
}

export function shuffle(arr, rand = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pluralize(n, word, plural = `${word}s`) {
  return `${n.toLocaleString('en-IN')} ${n === 1 ? word : plural}`;
}

const FORM_WORDS = new Set(['tablet', 'tablets', 'tab', 'capsule', 'capsules', 'cap', 'injection', 'inj', 'syrup', 'syp', 'suspension', 'susp', 'drops', 'drop', 'cream', 'gel', 'ointment', 'lotion', 'sr', 'er', 'xr', 'cr', 'xl', 'mr', 'dsr', 'ds', 'forte', 'plus', 'dt', 'md', 'od', 'oral', 'solution', 'respule', 'inhaler', 'spray', 'nasal', 'eye', 'ear', 'iv', 'im', 'shots', 'kit', 'sachet', 'powder', 'dry', 'paediatric', 'pediatric', 'kid', 'junior', 'jr', 'advance', 'gold', 'max', 'new', 'combo', 'combination', 'and', 'with', 'of']);
const UNIT_RE = /^\d|^(mg|mcg|g|gm|ml|iu|%|lac|million|mm)$/;

/** Salt "core": ingredients only (no strength, units or dosage form). Used to treat
 *  "Paracetamol 650mg" and "Paracetamol 500mg Tablet" as the same salt. */
export function saltCore(s) {
  const base = norm(s).replace(/\([^)]*\)/g, ' ').replace(/[^a-z0-9+/%. -]/g, ' ');
  const parts = base
    .split(/\+|\/|,| & /)
    .map((part) =>
      part
        .split(/\s+/)
        .filter((w) => w && !UNIT_RE.test(w) && !FORM_WORDS.has(w))
        .join(' ')
        .trim()
    )
    .filter(Boolean);
  return [...new Set(parts)].sort().join(' + ');
}

/** Class "core" = first meaningful word, so "Antibiotic (Amox-Clav)" ~ "Antibiotic combo". */
export function classCore(s) {
  return norm(s).replace(/\([^)]*\)/g, ' ').split(/[\s/,-]+/).filter(Boolean)[0] || '';
}
