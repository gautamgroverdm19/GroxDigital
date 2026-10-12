import { useDeferredValue, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterChips, Icon, MedicineRow, PageHeader } from '../components/ui/index.jsx';
import { searchMedicines } from '../lib/indexes.js';
import { useApp } from '../state/AppContext.jsx';

const PAGE = 50;

export default function Search() {
  const { idx, progress, now, medicines } = useApp();
  const [params, setParams] = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [field, setField] = useState('all');
  const [limit, setLimit] = useState(PAGE);
  const dq = useDeferredValue(q);
  const results = useMemo(() => searchMedicines(idx, dq, field), [idx, dq, field]);

  const onChange = (v) => {
    setQ(v);
    setLimit(PAGE);
    setParams(v ? { q: v } : {}, { replace: true });
  };

  return (
    <div>
      <PageHeader title="Search" subtitle={`${medicines.length.toLocaleString('en-IN')} medicines in your list`} />
      <div className="relative mb-3">
        <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          autoFocus
          type="search"
          inputMode="search"
          value={q}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Brand, salt or category…"
          className="input h-[52px] pl-12 text-lg"
          aria-label="Search medicines"
        />
      </div>
      <FilterChips
        label="Search in"
        value={field}
        onChange={(v) => {
          setField(v);
          setLimit(PAGE);
        }}
        options={[
          { value: 'all', label: 'All' },
          { value: 'brand', label: 'Brand' },
          { value: 'salt', label: 'Salt' },
          { value: 'category', label: 'Class / Category' },
          { value: 'rack', label: 'Rack / Shelf' },
        ]}
      />
      {dq ? (
        <>
          <p className="my-3 text-sm font-bold text-ink-muted" aria-live="polite">
            {results.length.toLocaleString('en-IN')} result{results.length === 1 ? '' : 's'}
          </p>
          <div className="space-y-2">
            {results.slice(0, limit).map((m) => (
              <MedicineRow key={m.id} med={m} progress={progress} now={now} />
            ))}
          </div>
          {results.length > limit && (
            <button className="btn-secondary mt-4 w-full" onClick={() => setLimit((l) => l + PAGE)}>
              Show more ({(results.length - limit).toLocaleString('en-IN')} left)
            </button>
          )}
        </>
      ) : (
        <p className="mt-6 text-center text-base font-semibold text-ink-muted">Type to search instantly — e.g. a brand, “paracetamol”, “antibiotic” or a shelf like “A1”.</p>
      )}
    </div>
  );
}
