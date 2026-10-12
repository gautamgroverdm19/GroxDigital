import { useEffect, useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SAFETY_FULL, SAFETY_SHORT, STATUS_LABEL } from '../../config/constants.js';
import { relativeDue } from '../../lib/dates.js';
import { locLabel } from '../../lib/indexes.js';
import { isDue } from '../../lib/srs.js';
import Icon from './Icon.jsx';

export { Icon };

const STATUS_CLS = {
  not_started: 'bg-st-nsbg text-st-nstext',
  learning: 'bg-st-lbg text-st-ltext',
  practicing: 'bg-st-pbg text-st-ptext',
  mastered: 'bg-st-mbg text-st-mtext',
};
const STATUS_DOT = {
  not_started: 'bg-ink-muted/40',
  learning: 'bg-st-ltext',
  practicing: 'bg-st-ptext',
  mastered: 'bg-success',
};

export function StatusBadge({ status = 'not_started' }) {
  return <span className={`chip ${STATUS_CLS[status]}`}>{STATUS_LABEL[status]}</span>;
}

export function StatusDot({ status = 'not_started' }) {
  return <span className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[status]}`} aria-label={STATUS_LABEL[status]} />;
}

/** "Review due" marker: teal outline, never red. */
export function ReviewDue({ progress, now, compact = false }) {
  if (!isDue(progress, now)) return null;
  return (
    <span className="chip border-[1.5px] border-primary text-primary-strong dark:text-primary">
      <Icon name="clock" size={15} />
      {compact ? 'Due' : 'Review due'}
    </span>
  );
}

export function StreakChip({ days }) {
  return (
    <span className="chip bg-streak-bg text-streak" title="Days in a row you met your daily goal">
      <Icon name="flame" size={16} />
      {days} {days === 1 ? 'day' : 'days'}
    </span>
  );
}

export function GoalRing({ value, goal, size = 96 }) {
  const r = (size - 11) / 2;
  const c = 2 * Math.PI * r;
  const pct = goal ? Math.min(1, value / goal) : 0;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} role="img" aria-label={`${value} of ${goal} done today`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="11" className="stroke-primary-soft" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="11" strokeLinecap="round" className="fill-anim stroke-primary" strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-xl font-extrabold">
          {value}/{goal}
        </span>
        <span className="mt-1 text-xs font-semibold text-ink-muted">today</span>
      </div>
    </div>
  );
}

export function Bar({ value, className = 'bg-primary', track = 'bg-primary-soft', height = 10, label }) {
  return (
    <div className={`w-full overflow-hidden rounded-full ${track}`} style={{ height }} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(value * 100)} aria-label={label}>
      <div className={`fill-anim h-full rounded-full ${className}`} style={{ width: `${Math.max(0, Math.min(1, value)) * 100}%` }} />
    </div>
  );
}

export function XPBar({ level }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="chip bg-gold-bg text-gold">
          <Icon name="star" size={15} /> Lv {level.number} · {level.name}
        </span>
        <span className="text-xs font-semibold text-ink-muted">{level.next ? `${level.toNext} XP to next` : 'Top level'}</span>
      </div>
      <Bar value={level.progress} className="bg-gold" track="bg-gold-bg" label="XP to next level" />
    </div>
  );
}

export function SegmentBar({ total = 5, filled = 0, label }) {
  return (
    <div className="flex gap-1.5" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={filled} aria-label={label}>
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${i < filled ? 'bg-primary' : 'bg-primary-soft'}`} />
      ))}
    </div>
  );
}

export function SafetyFooter({ full = true }) {
  return (
    <p className="mt-8 flex items-start gap-2 rounded-btn bg-line-soft px-4 py-3 text-xs font-semibold leading-relaxed text-ink-muted">
      <Icon name="info" size={18} className="mt-0.5" />
      <span>{full ? SAFETY_FULL : SAFETY_SHORT}</span>
    </p>
  );
}

export function PageHeader({ title, subtitle, back, right }) {
  const navigate = useNavigate();
  return (
    <header className="mb-5 flex items-start gap-3">
      {back && (
        <button onClick={() => (window.history.length > 1 ? navigate(-1) : navigate(back))} className="focus-ring -ml-2 grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-line-soft" aria-label="Back">
          <Icon name="back" />
        </button>
      )}
      <div className="min-w-0 flex-1 pt-1">
        <h1 className="text-[24px] font-extrabold leading-tight tracking-[-0.01em]">{title}</h1>
        {subtitle && <p className="mt-1 text-sm font-semibold text-ink-muted">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}

export function Collapsible({ id, title, icon, defaultOpen = true, children, tone }) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  return (
    <section id={id} className={`card scroll-mt-20 ${tone || ''}`}>
      <button className="focus-ring -m-1 flex w-[calc(100%+8px)] items-center gap-2.5 rounded-btn p-1 text-left" aria-expanded={open} aria-controls={uid} onClick={() => setOpen((o) => !o)}>
        {icon && <Icon name={icon} className="text-primary" />}
        <h2 className="flex-1 text-lg font-extrabold">{title}</h2>
        <Icon name="down" size={20} className={`text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div id={uid} className="mt-3 animate-fadein">
          {children}
        </div>
      )}
    </section>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <button role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)} className={`focus-ring relative h-8 w-14 shrink-0 rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-line'}`}>
      <span className={`absolute top-1 h-6 w-6 rounded-full bg-surface shadow transition-all ${checked ? 'left-7' : 'left-1'}`} />
    </button>
  );
}

export function Segmented({ value, options, onChange, label }) {
  return (
    <div role="radiogroup" aria-label={label} className="flex rounded-btn bg-line-soft p-1">
      {options.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`focus-ring h-11 flex-1 rounded-[11px] px-3 text-sm font-bold transition ${value === o.value ? 'bg-surface text-primary-strong shadow-sm dark:text-primary' : 'text-ink-muted'}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function FilterChips({ value, options, onChange, label }) {
  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]" role="radiogroup" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={`focus-ring h-11 shrink-0 whitespace-nowrap rounded-chip border px-3.5 text-sm font-bold transition ${value === o.value ? 'border-primary bg-primary-soft text-primary-strong dark:text-primary' : 'border-line bg-surface text-ink-muted'}`}
        >
          {o.label}
          {o.count !== undefined && <span className="ml-1.5 opacity-70">{o.count.toLocaleString('en-IN')}</span>}
        </button>
      ))}
    </div>
  );
}

/** One list row for a medicine: brand, salt · class, rack, status. */
export function MedicineRow({ med, progress, now, lead, extra, to, from }) {
  const p = progress?.[med.id];
  return (
    <Link
      to={to || `/medicine/${encodeURIComponent(med.id)}${from ? `?from=${from}` : ''}`}
      className="focus-ring flex min-h-[64px] items-center gap-3 rounded-btn border border-line bg-surface px-3.5 py-3 transition hover:border-primary/50"
    >
      {lead}
      <div className="min-w-0 flex-1">
        <div className="truncate text-base font-extrabold">{med.brand}</div>
        <div className="truncate text-sm font-semibold text-ink-muted">
          {[med.salt || 'Salt not added', med.class].filter(Boolean).join(' · ')}
        </div>
        {extra}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <StatusBadge status={p?.status || 'not_started'} />
        <ReviewDue progress={p} now={now} compact />
        {!extra && med.rack && <span className="text-xs font-bold text-ink-muted">{locLabel(med).replace('Rack ', '').replace(' · Shelf ', ' · ')}</span>}
      </div>
    </Link>
  );
}

export function DueText({ date, now }) {
  return <span>{relativeDue(date, now)}</span>;
}

export function EmptyState({ icon = 'info', title, children, action }) {
  return (
    <div className="card flex flex-col items-center px-6 py-10 text-center">
      <div className="mb-3 grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-primary-strong dark:text-primary">
        <Icon name={icon} size={28} />
      </div>
      <h2 className="text-lg font-extrabold">{title}</h2>
      {children && <div className="mt-1.5 max-w-sm text-base text-ink-muted">{children}</div>}
      {action && <div className="mt-5 w-full max-w-xs">{action}</div>}
    </div>
  );
}

/** Bottom sheet / dialog. */
export function Sheet({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-label={title} className="max-h-[90dvh] w-full max-w-lg animate-fadein overflow-y-auto rounded-t-[22px] bg-surface p-5 pb-8 sm:rounded-[22px]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="flex-1 text-xl font-extrabold">{title}</h2>
          <button onClick={onClose} className="focus-ring grid h-11 w-11 place-items-center rounded-full hover:bg-line-soft" aria-label="Close">
            <Icon name="x" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Teal dot burst for level-ups. */
export function Burst() {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <span
            key={i}
            className="absolute h-2.5 w-2.5 animate-burst rounded-full bg-primary-light"
            style={{ '--dx': `${Math.cos(a) * 70}px`, '--dy': `${Math.sin(a) * 70}px` }}
          />
        );
      })}
    </div>
  );
}
