import { useState } from 'react';

/**
 * Single-series vertical bars (daily practice). One hue; today's bar uses primary-light.
 * Hover / focus a bar for its value. A visually-hidden table gives the numbers to screen readers.
 */
export function DailyBars({ data, height = 140, unit = 'answers' }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <figure>
      <div className="relative flex items-end gap-2 border-b border-line" style={{ height }}>
        {data.map((d, i) => (
          <div key={d.key} className="group relative flex h-full flex-1 flex-col justify-end" onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            {hover === i && (
              <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-chip bg-ink px-2 py-1 text-xs font-bold text-bg">
                {d.value} {unit}
              </div>
            )}
            <button
              className={`focus-ring fill-anim w-full rounded-t-[4px] ${d.isToday ? 'bg-primary-light' : 'bg-primary'}`}
              style={{ height: `${(d.value / max) * 100}%`, minHeight: d.value ? 4 : 2, opacity: d.value ? 1 : 0.25 }}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-label={`${d.label}: ${d.value} ${unit}`}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-2">
        {data.map((d) => (
          <span key={d.key} className={`flex-1 text-center text-xs font-bold ${d.isToday ? 'text-primary-strong dark:text-primary' : 'text-ink-muted'}`}>
            {d.label}
          </span>
        ))}
      </div>
      <table className="sr-only">
        <tbody>
          {data.map((d) => (
            <tr key={d.key}>
              <th>{d.label}</th>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}

/** Horizontal bars with a label and a value text (category mastery, accuracy). */
export function HBars({ rows, valueFormat = (r) => `${Math.round(r.value * 100)}%`, color = 'bg-primary', height = 10 }) {
  return (
    <ul className="space-y-3.5">
      {rows.map((r) => (
        <li key={r.key} title={r.title}>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="truncate text-sm font-bold">{r.label}</span>
            <span className="shrink-0 text-xs font-bold text-ink-muted">{valueFormat(r)}</span>
          </div>
          <div className="w-full overflow-hidden rounded-full bg-primary-soft" style={{ height }}>
            <div className={`fill-anim h-full rounded-full ${r.color || color}`} style={{ width: `${Math.max(0, Math.min(1, r.value)) * 100}%` }} />
          </div>
        </li>
      ))}
    </ul>
  );
}
