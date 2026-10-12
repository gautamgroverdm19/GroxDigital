import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { DailyBars } from '../components/ui/Charts.jsx';
import { Icon, MedicineRow, PageHeader, StreakChip, XPBar } from '../components/ui/index.jsx';
import { LEVELS, STATUS } from '../config/constants.js';
import { fromKey, lastNDays } from '../lib/dates.js';
import { levelInfo, liveDayStreak } from '../lib/gamification.js';
import { dueMedicines } from '../lib/plan.js';
import { norm } from '../lib/text.js';
import { useApp } from '../state/AppContext.jsx';

function StatTile({ label, value, sub, tone = 'text-ink' }) {
  return (
    <div className="card">
      <div className="text-xs font-bold text-ink-muted">{label}</div>
      <div className={`mt-1 text-3xl font-extrabold tracking-[-0.02em] ${tone}`}>{value}</div>
      {sub && <div className="text-xs font-semibold text-ink-muted">{sub}</div>}
    </div>
  );
}

export default function Progress() {
  const { medicines, progress, stats, now, idx } = useApp();
  const [allCats, setAllCats] = useState(false);
  const level = levelInfo(stats.xp || 0);

  const totals = useMemo(() => {
    let mastered = 0, inProgress = 0, correct = 0, wrong = 0;
    for (const m of medicines) {
      const p = progress[m.id];
      if (!p) continue;
      if (p.status === STATUS.MASTERED) mastered++;
      else if (p.status === STATUS.LEARNING || p.status === STATUS.PRACTICING) inProgress++;
      correct += p.correct || 0;
      wrong += p.wrong || 0;
    }
    return { mastered, inProgress, notStarted: medicines.length - mastered - inProgress, acc: correct + wrong ? Math.round((correct / (correct + wrong)) * 100) : null, answered: correct + wrong };
  }, [medicines, progress]);

  const days = lastNDays(7, now).map((d) => ({
    key: d,
    label: fromKey(d).toLocaleDateString('en-IN', { weekday: 'short' }),
    value: stats.daily?.[d]?.answered || 0,
    isToday: d === now,
  }));
  const weekAnswered = days.reduce((s, d) => s + d.value, 0);

  const catRows = useMemo(
    () =>
      idx.categories.map((c) => {
        const list = idx.byCategory.get(c.key) || [];
        let mastered = 0, practicing = 0;
        for (const m of list) {
          const s = progress[m.id]?.status;
          if (s === STATUS.MASTERED) mastered++;
          else if (s === STATUS.PRACTICING) practicing++;
        }
        return { ...c, mastered, practicing };
      }),
    [idx, progress]
  );

  const weakAreas = useMemo(() => {
    const m = new Map();
    for (const med of medicines) {
      const p = progress[med.id];
      if (!p || !(p.correct + p.wrong)) continue;
      const k = norm(med.class) || norm(med.category);
      if (!k) continue;
      const r = m.get(k) || { name: med.class || med.category, ok: 0, n: 0 };
      r.ok += p.correct;
      r.n += p.correct + p.wrong;
      m.set(k, r);
    }
    return [...m.values()].filter((r) => r.n >= 3 && r.ok / r.n < 0.8).sort((a, b) => a.ok / a.n - b.ok / b.n).slice(0, 6);
  }, [medicines, progress]);

  const due = dueMedicines(medicines, progress, now).slice(0, 6);

  return (
    <div className="space-y-4">
      <PageHeader title="Progress" subtitle={`${medicines.length.toLocaleString('en-IN')} medicines · ${totals.answered.toLocaleString('en-IN')} answers so far`} right={<StreakChip days={liveDayStreak(stats, now)} />} />

      <section className="card">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-bg text-xl font-extrabold text-gold">{level.number}</span>
          <div>
            <div className="text-xl font-extrabold">{level.name}</div>
            <div className="text-sm font-semibold text-ink-muted">{(stats.xp || 0).toLocaleString('en-IN')} XP total</div>
          </div>
        </div>
        <XPBar level={level} />
        <ol className="mt-4 grid grid-cols-6 gap-1" aria-label="Levels">
          {LEVELS.map((l, i) => (
            <li key={l.name} className="text-center" title={`${l.name} · ${l.min} XP`}>
              <div className={`mx-auto mb-1 h-2 rounded-full ${i <= level.index ? 'bg-gold' : 'bg-gold-bg'}`} />
              <span className={`hidden text-xs font-bold sm:block ${i === level.index ? 'text-gold' : 'text-ink-muted'}`}>{l.name}</span>
              <span className={`text-xs font-bold sm:hidden ${i === level.index ? 'text-gold' : 'text-ink-muted'}`}>{i + 1}</span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Mastered" value={totals.mastered} tone="text-success" />
        <StatTile label="In progress" value={totals.inProgress} sub="Learning + Practicing" />
        <StatTile label="To practise" value={totals.notStarted.toLocaleString('en-IN')} sub="Not started" />
        <StatTile label="Accuracy" value={totals.acc === null ? '—' : `${totals.acc}%`} sub="All answers" />
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-2">
        <section className="card">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="text-lg font-extrabold">Daily practice</h2>
            <span className="text-sm font-bold text-ink-muted">{weekAnswered} answers · 7 days</span>
          </div>
          <DailyBars data={days} />
        </section>

        <section className="card">
          <div className="mb-1 flex items-baseline justify-between">
            <h2 className="text-lg font-extrabold">Category mastery</h2>
          </div>
          <div className="mb-3 flex gap-4 text-xs font-bold text-ink-muted" aria-label="Legend">
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Mastered</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary-light/60" /> Practicing</span>
          </div>
          <ul className="space-y-3">
            {(allCats ? catRows : catRows.slice(0, 8)).map((c) => (
              <li key={c.key}>
                <div className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm font-bold">{c.name}</span>
                  <span className="shrink-0 text-xs font-bold text-ink-muted">
                    {c.mastered} + {c.practicing} / {c.count}
                  </span>
                </div>
                <div className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full bg-primary-soft" title={`${c.mastered} mastered, ${c.practicing} practicing of ${c.count}`}>
                  {c.mastered > 0 && <div className="fill-anim h-full bg-primary" style={{ width: `${(c.mastered / c.count) * 100}%` }} />}
                  {c.practicing > 0 && <div className="fill-anim h-full bg-primary-light/60" style={{ width: `${(c.practicing / c.count) * 100}%` }} />}
                </div>
              </li>
            ))}
          </ul>
          {catRows.length > 8 && (
            <button className="btn-text mt-1" onClick={() => setAllCats((a) => !a)}>
              {allCats ? 'Show fewer' : `Show all ${catRows.length}`}
            </button>
          )}
        </section>

        <section className="card">
          <h2 className="mb-3 text-lg font-extrabold">Weak areas</h2>
          {weakAreas.length ? (
            <ul className="space-y-2">
              {weakAreas.map((w) => (
                <li key={w.name} className="flex items-center gap-3 rounded-btn bg-line-soft px-3 py-2.5">
                  <span className="min-w-0 flex-1 truncate text-sm font-bold">{w.name}</span>
                  <span className="text-sm font-extrabold text-danger-text">{Math.round((w.ok / w.n) * 100)}%</span>
                  <span className="text-xs font-semibold text-ink-muted">{w.n} ans</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-semibold text-ink-muted">Classes where your accuracy is below 80% (after 3+ answers) show up here.</p>
          )}
          <Link to="/quiz?mode=weak" className="btn-primary mt-4 w-full">
            <Icon name="practice" /> Practice weak areas
          </Link>
        </section>

        <section className="card">
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-lg font-extrabold">Review due</h2>
            <Link to="/quiz?mode=quick" className="text-sm font-bold text-primary-strong dark:text-primary">
              Practise now
            </Link>
          </div>
          {due.length ? (
            <div className="space-y-2">
              {due.map((m) => (
                <MedicineRow key={m.id} med={m} progress={progress} now={now} />
              ))}
            </div>
          ) : (
            <p className="text-sm font-semibold text-ink-muted">Nothing due. Great work!</p>
          )}
        </section>
      </div>
    </div>
  );
}
