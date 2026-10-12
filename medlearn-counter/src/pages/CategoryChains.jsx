import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FilterChips, Icon, PageHeader, SafetyFooter, StatusDot } from '../components/ui/index.jsx';
import { STATUS_LABEL } from '../config/constants.js';
import { weekMedicines } from '../lib/plan.js';
import { norm, saltCore } from '../lib/text.js';
import { useApp } from '../state/AppContext.jsx';

const MAX_CLASSES = 8;
const MAX_SALTS = 6;
const MAX_BRANDS = 5;

function ClassCard({ name, meds, progress }) {
  const [all, setAll] = useState(false);
  const salts = useMemo(() => {
    const m = new Map();
    for (const med of meds) {
      const k = saltCore(med.salt) || '—';
      if (!m.has(k)) m.set(k, { name: med.salt || 'Salt not added', meds: [] });
      m.get(k).meds.push(med);
    }
    return [...m.values()].sort((a, b) => b.meds.length - a.meds.length);
  }, [meds]);
  const shown = all ? salts : salts.slice(0, MAX_SALTS);
  return (
    <div className="card">
      <div className="mb-3 flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-extrabold">{name}</h3>
        <span className="text-xs font-bold text-ink-muted">{meds.length} brands</span>
      </div>
      <ul className="space-y-3 border-l-2 border-primary/30 pl-4">
        {shown.map((s) => (
          <li key={s.name} className="relative">
            <span className="absolute -left-[21px] top-2 h-2.5 w-2.5 rounded-full bg-primary" />
            <div className="text-base font-bold text-ink-alt">{s.name}</div>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {s.meds.slice(0, MAX_BRANDS).map((m) => (
                <Link key={m.id} to={`/medicine/${encodeURIComponent(m.id)}`} className="focus-ring inline-flex min-h-[36px] items-center gap-1.5 rounded-chip border border-line bg-surface px-2.5 text-sm font-bold hover:border-primary">
                  <StatusDot status={progress[m.id]?.status} /> {m.brand}
                </Link>
              ))}
              {s.meds.length > MAX_BRANDS && <span className="self-center text-xs font-bold text-ink-muted">+{s.meds.length - MAX_BRANDS} more</span>}
            </div>
          </li>
        ))}
      </ul>
      {salts.length > MAX_SALTS && (
        <button className="btn-text mt-1" onClick={() => setAll((a) => !a)}>
          {all ? 'Show fewer salts' : `Show all ${salts.length} salts`}
        </button>
      )}
    </div>
  );
}

export default function CategoryChains() {
  const { idx, plan, currentWeek, progress } = useApp();
  const [params, setParams] = useSearchParams();
  const weekParam = Number(params.get('week')) || null;
  const initial = weekParam ? `w${weekParam}` : params.get('cat') || `w${currentWeek}`;
  const [sel, setSel] = useState(initial);
  const [allClasses, setAllClasses] = useState(false);

  const options = useMemo(
    () => [
      ...plan.slice(0, Math.max(currentWeek, 4)).map((w) => ({ value: `w${w.n}`, label: `W${w.n} · ${w.label}`, count: w.count })),
      ...idx.categories.map((c) => ({ value: c.key, label: c.name, count: c.count })),
    ],
    [plan, currentWeek, idx]
  );

  const { title, meds } = useMemo(() => {
    if (sel.startsWith('w')) {
      const w = plan[Number(sel.slice(1)) - 1];
      return { title: w ? `Week ${w.n} · ${w.label}` : '', meds: weekMedicines(idx, w) };
    }
    const c = idx.categories.find((x) => x.key === sel);
    return { title: c?.name || '', meds: idx.byCategory.get(sel) || [] };
  }, [sel, plan, idx]);

  const classes = useMemo(() => {
    const m = new Map();
    for (const med of meds) {
      const k = norm(med.class) || '—';
      if (!m.has(k)) m.set(k, { name: med.class || 'Class not added', meds: [] });
      m.get(k).meds.push(med);
    }
    return [...m.values()].sort((a, b) => b.meds.length - a.meds.length);
  }, [meds]);

  const pick = (v) => {
    setSel(v);
    setAllClasses(false);
    setParams(v.startsWith('w') ? { week: v.slice(1) } : { cat: v }, { replace: true });
  };

  return (
    <div className="space-y-4">
      <PageHeader title="Category Chains" subtitle="Problem → class → salt → brands" />
      <FilterChips label="Category" value={sel} onChange={pick} options={options} />

      <div className="flex items-center gap-3 rounded-card bg-primary p-4 text-onprimary">
        <Icon name="chain" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-lg font-extrabold">{title}</div>
          <div className="text-sm font-semibold opacity-90">
            {classes.length} classes · {meds.length} brands
          </div>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {(allClasses ? classes : classes.slice(0, MAX_CLASSES)).map((c) => (
          <ClassCard key={c.name} name={c.name} meds={c.meds} progress={progress} />
        ))}
      </div>
      {classes.length > MAX_CLASSES && (
        <button className="btn-secondary w-full" onClick={() => setAllClasses((a) => !a)}>
          {allClasses ? 'Show fewer classes' : `Show all ${classes.length} classes`}
        </button>
      )}

      <div className="flex flex-wrap gap-x-4 gap-y-2 rounded-btn bg-line-soft p-3" aria-label="Legend">
        {Object.entries(STATUS_LABEL).map(([k, v]) => (
          <span key={k} className="inline-flex items-center gap-1.5 text-xs font-bold text-ink-muted">
            <StatusDot status={k} /> {v}
          </span>
        ))}
      </div>
      <SafetyFooter />
    </div>
  );
}
