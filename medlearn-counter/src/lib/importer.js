// Import medicine data from CSV, Excel (.xlsx/.xls) or JSON.
// Column names are matched loosely (case, spaces and symbols ignored), so
// "Medicine / Brand Name", "brand_name" and "Brand" all map to `brand`.
import { clean, headerKey, hash, norm, slug } from './text.js';

// field -> accepted header keys (already passed through headerKey()).
export const COLUMN_SYNONYMS = {
  brand: ['brand', 'brandname', 'medicine', 'medicinename', 'medicinebrandname', 'name', 'product', 'productname', 'item', 'itemname'],
  salt: ['salt', 'saltcomposition', 'composition', 'generic', 'genericname', 'molecule', 'content', 'saltname'],
  strength: ['strength', 'dose', 'potency'],
  form: ['form', 'dosageform', 'formulation', 'packtype'],
  company: ['company', 'manufacturer', 'mfr', 'mfg', 'marketedby', 'brandcompany', 'pharma'],
  class: ['class', 'drugclass', 'pharmacologicalclass', 'therapeuticclass', 'pharmaclass', 'subcategory'],
  category: ['category', 'colourclass', 'colorclass', 'group', 'therapeuticgroup', 'therapeuticcategory', 'department'],
  rack: ['rack', 'rackno', 'racknumber', 'almirah', 'cupboard'],
  shelf: ['shelf', 'sec', 'section', 'shelfno', 'shelfnumber', 'row', 'bin', 'position'],
  mrp: ['mrp', 'price', 'rate', 'mrprs', 'mrpinr', 'sellingprice'],
  rx: ['rx', 'rxotc', 'otcrx', 'prescription', 'schedule'],
  notes: ['notes', 'note'],
  dataStatus: ['status', 'verification', 'verifystatus'],
  dataRemark: ['remarksource', 'remark', 'remarks', 'source'],
  uses: ['uses', 'use', 'indication', 'indications', 'commonuses', 'usedfor'],
  mechanismHi: ['howitworkshinglish', 'mechanismhinglish', 'mechanismhi', 'howitworkshi'],
  mechanismEn: ['howitworks', 'howitworksenglish', 'mechanism', 'mechanismenglish', 'mechanismen', 'moa', 'mechanismofaction'],
  analogy: ['analogy'],
  precautions: ['precautions', 'precaution', 'warnings', 'caution'],
  whenNotToGive: ['whennottogive', 'contraindications', 'contraindication', 'donotgive'],
  interactions: ['interactions', 'keyinteractions', 'druginteractions', 'interaction'],
  sideEffects: ['sideeffects', 'sideeffect', 'adverseeffects'],
  alternatives: ['alternativebrands', 'alternatives', 'alternative', 'samesaltbrands', 'substitutes'],
  memoryTrick: ['memorytrick', 'trick', 'mnemonic', 'memorytip'],
  counterQuestions: ['counterquestions', 'askthecustomer', 'questions', 'customerquestions'],
};

// Fields a user can type into from the Medicine Card (everything except identity).
export const TEXT_FIELDS = [
  'uses', 'mechanismHi', 'mechanismEn', 'analogy', 'precautions', 'whenNotToGive',
  'interactions', 'sideEffects', 'alternatives', 'memoryTrick', 'counterQuestions',
];
export const BASIC_FIELDS = ['brand', 'salt', 'strength', 'form', 'company', 'class', 'category', 'rack', 'shelf', 'mrp', 'rx'];

/** Decide which source column feeds which field. Returns { map: {field: header}, unmapped: [headers] }. */
export function mapColumns(headers) {
  const keys = headers.map(headerKey);
  const map = {};
  const used = new Set();

  const take = (field, key) => {
    const i = keys.indexOf(key);
    if (i >= 0 && !used.has(i) && !map[field]) {
      map[field] = headers[i];
      used.add(i);
    }
  };

  // Files that have a "Colour Class"/group column use "Category" as the drug class
  // (e.g. "Analgesic / Antipyretic") and the colour class as the category ("Pain, Fever & Joints").
  const hasGroup = keys.some((k) => ['colourclass', 'colorclass', 'group', 'therapeuticgroup'].includes(k));
  const hasClass = COLUMN_SYNONYMS.class.some((k) => keys.includes(k));
  if (hasGroup && !hasClass && keys.includes('category')) {
    take('class', 'category');
    ['colourclass', 'colorclass', 'group', 'therapeuticgroup'].forEach((k) => take('category', k));
  }

  for (const [field, syns] of Object.entries(COLUMN_SYNONYMS)) {
    for (const k of syns) take(field, k);
  }
  const unmapped = headers.filter((_, i) => !used.has(i) && headerKey(headers[i]) && !['sno', 'srno', 'slno', 'id', 'no'].includes(headerKey(headers[i])));
  return { map, unmapped };
}

export function medicineId(brand, salt) {
  return `${slug(brand)}-${hash(`${norm(brand)}|${norm(salt)}`)}`;
}

function buildDataNote(status, remark) {
  const s = clean(status);
  const r = clean(remark);
  if (!s || /^ok$/i.test(s)) return '';
  return r ? `${s} — ${r}` : s;
}

/**
 * Turn raw rows (objects keyed by header) into medicine records.
 * Same brand + salt in several racks becomes ONE medicine with several locations.
 */
export function rowsToMedicines(rows, headers) {
  const { map, unmapped } = mapColumns(headers);
  const byId = new Map();
  let skipped = 0;
  let merged = 0;

  for (const row of rows) {
    const get = (f) => (map[f] ? clean(row[map[f]]) : '');
    const brand = get('brand');
    if (!brand) {
      skipped++;
      continue;
    }
    const salt = get('salt');
    const id = medicineId(brand, salt);
    const rack = get('rack').toUpperCase();
    const shelf = get('shelf');
    const loc = rack || shelf ? { rack, shelf } : null;

    if (byId.has(id)) {
      const m = byId.get(id);
      merged++;
      if (loc && !m.locations.some((l) => l.rack === loc.rack && norm(l.shelf) === norm(loc.shelf))) m.locations.push(loc);
      // Fill blanks from the duplicate row.
      for (const f of [...BASIC_FIELDS, ...TEXT_FIELDS]) {
        if (!m[f] && get(f) && f !== 'rack' && f !== 'shelf') m[f] = get(f);
      }
      continue;
    }

    const med = { id, brand, salt, locations: loc ? [loc] : [] };
    for (const f of [...BASIC_FIELDS, ...TEXT_FIELDS, 'notes']) {
      if (f === 'brand' || f === 'salt' || f === 'rack' || f === 'shelf') continue;
      const v = get(f);
      if (v) med[f] = v;
    }
    if (med.rx) med.rx = /^rx$/i.test(med.rx) ? 'Rx' : /^otc$/i.test(med.rx) ? 'OTC' : med.rx;
    const dataNote = buildDataNote(get('dataStatus'), get('dataRemark'));
    if (dataNote) med.dataNote = dataNote;
    byId.set(id, med);
  }

  const medicines = [...byId.values()].map((m) => ({
    ...m,
    rack: m.locations[0]?.rack || '',
    shelf: m.locations[0]?.shelf || '',
  }));
  return { medicines, report: { rows: rows.length, medicines: medicines.length, merged, skipped, mapped: map, unmapped } };
}

async function parseCsvText(text) {
  const Papa = (await import('papaparse')).default;
  const res = Papa.parse(text.replace(/^﻿/, ''), { header: true, skipEmptyLines: 'greedy' });
  return { rows: res.data, headers: res.meta.fields || [] };
}

function parseJsonText(text) {
  const data = JSON.parse(text);
  const rows = Array.isArray(data) ? data : Array.isArray(data.medicines) ? data.medicines : null;
  if (!rows) throw new Error('JSON must be an array of medicines, or { "medicines": [...] }.');
  const headers = [...new Set(rows.flatMap((r) => Object.keys(r || {})))];
  // Support our own export format (locations array) directly.
  const flat = rows.map((r) => {
    if (Array.isArray(r.locations) && r.locations.length && !r.rack) return { ...r, rack: r.locations[0].rack, shelf: r.locations[0].shelf };
    return r;
  });
  if (!headers.includes('rack') && flat.some((r) => r.rack)) headers.push('rack', 'shelf');
  return { rows: flat, headers };
}

async function parseExcel(buffer) {
  const XLSX = await import('xlsx');
  const wb = XLSX.read(buffer, { type: 'array' });
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: '', raw: false });
  const headers = XLSX.utils.sheet_to_json(sheet, { header: 1 })[0] || [];
  return { rows, headers: headers.map(String) };
}

/** Parse a File chosen by the user. Returns { medicines, report }. */
export async function importFile(file) {
  const name = file.name.toLowerCase();
  let parsed;
  if (name.endsWith('.xlsx') || name.endsWith('.xls') || name.endsWith('.ods')) {
    parsed = await parseExcel(await file.arrayBuffer());
  } else if (name.endsWith('.json')) {
    parsed = parseJsonText(await file.text());
  } else {
    parsed = await parseCsvText(await file.text());
  }
  return finish(parsed);
}

export async function importText(text, kind = 'csv') {
  return finish(kind === 'json' ? parseJsonText(text) : await parseCsvText(text));
}

function finish({ rows, headers }) {
  const result = rowsToMedicines(rows, headers);
  if (!result.report.mapped.brand) {
    throw new Error('Could not find a Brand / Medicine name column. Check the column guide and sample template.');
  }
  if (!result.medicines.length) throw new Error('No medicines found in this file.');
  return result;
}

/** Merge a fresh import into existing data (keeps ids, so progress and your edits survive). */
export function mergeMedicines(existing, incoming) {
  const map = new Map(existing.map((m) => [m.id, m]));
  let added = 0;
  let updated = 0;
  for (const m of incoming) {
    if (map.has(m.id)) {
      map.set(m.id, { ...map.get(m.id), ...m });
      updated++;
    } else {
      map.set(m.id, m);
      added++;
    }
  }
  return { medicines: [...map.values()], added, updated };
}
