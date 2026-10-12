import { useRef, useState } from 'react';
import { importFile, importText } from '../lib/importer.js';
import { useApp } from '../state/AppContext.jsx';
import { Icon, Segmented } from './ui/index.jsx';

const FIELD_LABEL = {
  brand: 'Brand', salt: 'Salt', strength: 'Strength', form: 'Form', company: 'Company', class: 'Class', category: 'Category',
  rack: 'Rack', shelf: 'Shelf', mrp: 'MRP', rx: 'Rx/OTC', notes: 'Notes', dataStatus: 'Status', dataRemark: 'Remark', uses: 'Uses',
  mechanismHi: 'How it works (Hinglish)', mechanismEn: 'How it works (English)', analogy: 'Analogy', precautions: 'Precautions',
  whenNotToGive: 'When not to give', interactions: 'Interactions', sideEffects: 'Side effects', alternatives: 'Alternative brands',
  memoryTrick: 'Memory trick', counterQuestions: 'Counter questions',
};

export const BUNDLED_INVENTORY = `${import.meta.env.BASE_URL}data/store-inventory.csv`;
export const SAMPLE_TEMPLATE = `${import.meta.env.BASE_URL}sample-template.csv`;

export function ColumnGuide() {
  return (
    <details className="rounded-btn border border-line p-3.5">
      <summary className="cursor-pointer text-sm font-extrabold">Column guide</summary>
      <div className="mt-3 space-y-2 text-sm text-ink-alt">
        <p>
          <b>Needed:</b> Brand (or “Medicine / Brand Name”).
        </p>
        <p>
          <b>Recommended:</b> Salt, Strength, Class, Category, Rack, Shelf (or “Sec”), MRP.
        </p>
        <p>
          <b>Optional:</b> Form, Company, Rx/OTC, Uses, How it works, Precautions, When not to give, Interactions, Side effects, Alternative brands, Memory trick,
          Counter questions. You can also add these later inside the app.
        </p>
        <p>Column names are matched loosely, so “Medicine / Brand Name”, “brand_name” and “Brand” all work. In list columns, separate items with “;”.</p>
        <p>If a file has both “Category” and “Colour Class”, Category is used as the drug class and Colour Class as the category.</p>
      </div>
    </details>
  );
}

export default function ImportPanel({ onDone, compact = false }) {
  const { rawCount, importMedicines, showToast } = useApp();
  const input = useRef(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [mode, setMode] = useState('merge');

  const run = async (fn) => {
    setBusy(true);
    setError(null);
    setPreview(null);
    try {
      setPreview(await fn());
    } catch (e) {
      setError(e.message || String(e));
    } finally {
      setBusy(false);
    }
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (f) run(async () => ({ ...(await importFile(f)), fileName: f.name }));
  };

  const loadBundled = () =>
    run(async () => {
      const res = await fetch(BUNDLED_INVENTORY);
      if (!res.ok) throw new Error('Could not load the bundled inventory file.');
      return { ...(await importText(await res.text())), fileName: 'store-inventory.csv' };
    });

  const confirm = () => {
    const r = importMedicines(preview.medicines, rawCount ? mode : 'replace');
    showToast(`Imported: ${r.added} new, ${r.updated} updated`);
    setPreview(null);
    onDone?.();
  };

  return (
    <div className="space-y-3">
      <input ref={input} type="file" accept=".csv,.xlsx,.xls,.ods,.json,text/csv,application/json" className="hidden" onChange={onFile} />
      <button className="btn-primary w-full" disabled={busy} onClick={() => input.current?.click()}>
        <Icon name="upload" /> {busy ? 'Reading file…' : 'Import CSV / Excel / JSON'}
      </button>
      <button className="btn-tonal w-full" disabled={busy} onClick={loadBundled}>
        <Icon name="file" /> Load my store inventory (bundled CSV)
      </button>
      {!compact && (
        <a href={SAMPLE_TEMPLATE} download="medlearn-sample-template.csv" className="btn-text w-full">
          <Icon name="download" /> Download sample CSV template
        </a>
      )}

      {error && (
        <div className="flex items-start gap-2 rounded-btn border border-danger-border bg-danger-bg p-3 text-sm font-semibold text-danger-body">
          <Icon name="ban" size={18} className="mt-0.5 text-danger-text" /> {error}
        </div>
      )}

      {preview && (
        <div className="animate-fadein space-y-3 rounded-card border border-primary/40 bg-primary-soft/50 p-4">
          <div className="text-base font-extrabold">{preview.fileName}</div>
          <ul className="space-y-1 text-sm font-semibold text-ink-alt">
            <li>{preview.report.rows.toLocaleString('en-IN')} rows read</li>
            <li>
              <b className="text-ink">{preview.report.medicines.toLocaleString('en-IN')} medicines</b> found
            </li>
            {preview.report.merged > 0 && <li>{preview.report.merged} repeated rows merged (extra rack locations kept)</li>}
            {preview.report.skipped > 0 && <li>{preview.report.skipped} rows skipped (no brand name)</li>}
          </ul>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(preview.report.mapped).map(([f, h]) => (
              <span key={f} className="chip bg-surface text-ink-alt" title={`From column "${h}"`}>
                <Icon name="check" size={14} className="text-success" /> {FIELD_LABEL[f] || f}
              </span>
            ))}
          </div>
          {preview.report.unmapped.length > 0 && <p className="text-xs font-semibold text-ink-muted">Ignored columns: {preview.report.unmapped.join(', ')}</p>}
          {rawCount > 0 && (
            <Segmented
              label="Import mode"
              value={mode}
              onChange={setMode}
              options={[
                { value: 'merge', label: 'Add & update' },
                { value: 'replace', label: 'Replace all' },
              ]}
            />
          )}
          <p className="text-xs font-semibold text-ink-muted">Your progress and your own added details are kept.</p>
          <div className="flex gap-2">
            <button className="btn-primary flex-1" onClick={confirm}>
              Import {preview.report.medicines.toLocaleString('en-IN')}
            </button>
            <button className="btn-secondary" onClick={() => setPreview(null)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
