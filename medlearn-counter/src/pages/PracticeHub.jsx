import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FilterChips, Icon, PageHeader, SafetyFooter } from '../components/ui/index.jsx';
import { QUICK_QUIZ_LENGTH, WEEKLY_PASS_PERCENT, WEEKLY_TEST_LENGTH } from '../config/constants.js';
import { dueMedicines, flashcardDeck, weakMedicines } from '../lib/plan.js';
import { QUESTION_TYPES, availableTypes } from '../lib/quiz.js';
import { useApp } from '../state/AppContext.jsx';

function Tile({ to, icon, title, sub, count }) {
  return (
    <Link to={to} className="card focus-ring flex flex-col gap-3 transition hover:border-primary/50">
      <div className="flex items-center justify-between">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary-strong dark:text-primary">
          <Icon name={icon} />
        </span>
        {count !== undefined && <span className="text-2xl font-extrabold">{count}</span>}
      </div>
      <div>
        <div className="text-base font-extrabold">{title}</div>
        <div className="text-sm font-semibold text-ink-muted">{sub}</div>
      </div>
    </Link>
  );
}

export default function PracticeHub() {
  const app = useApp();
  const { medicines, progress, now, idx, plan, currentWeek, stats } = app;
  const navigate = useNavigate();
  const [type, setType] = useState('all');
  const due = dueMedicines(medicines, progress, now);
  const weak = weakMedicines(medicines, progress);
  const deckSize = useMemo(
    () => flashcardDeck({ meds: medicines, idx, progress, todayIds: app.todayIds, plan, currentWeek, now }).length,
    [medicines, idx, progress, app.todayIds, plan, currentWeek, now]
  );
  const types = useMemo(() => availableTypes(idx, medicines), [idx, medicines]);
  const week = plan[currentWeek - 1];
  const lastWeekly = stats.weekly?.results?.[currentWeek];

  const start = () => navigate(`/quiz?mode=quick${type !== 'all' ? `&type=${type}` : ''}`);

  return (
    <div className="space-y-4">
      <PageHeader title="Practice" subtitle="Short sessions between customers" />

      <section className="rounded-card bg-primary p-5 text-onprimary">
        <p className="text-sm font-bold uppercase tracking-[0.08em] opacity-80">Recommended</p>
        <h2 className="mt-1 text-xl font-extrabold">Quick Quiz · {QUICK_QUIZ_LENGTH} questions</h2>
        <p className="mt-1 text-base font-semibold opacity-90">{due.length ? `${due.length} due for review come first` : `From Week ${currentWeek}: ${week?.label || ''}`}</p>
        <div className="mt-4">
          <p className="mb-2 text-sm font-bold opacity-90">Question type</p>
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
            {[{ value: 'all', label: 'Mixed' }, ...types.map((t) => ({ value: t, label: QUESTION_TYPES[t].short }))].map((o) => (
              <button
                key={o.value}
                onClick={() => setType(o.value)}
                aria-pressed={type === o.value}
                className={`focus-ring h-11 shrink-0 whitespace-nowrap rounded-chip px-3.5 text-sm font-bold ${type === o.value ? 'bg-surface text-primary-strong dark:text-primary' : 'bg-white/15 text-onprimary'}`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <button onClick={start} className="btn mt-4 w-full bg-surface text-primary-strong dark:text-primary">
          <Icon name="play" /> Start quiz
        </button>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <Tile to="/flashcards" icon="cards" title="Flashcards" sub="Flip, recall, rate yourself" count={deckSize} />
        <Tile to="/weak" icon="alert" title="Weak Medicines" sub="Most mistakes first" count={weak.length} />
      </div>

      {week && (
        <Link to={`/quiz?mode=weekly&week=${currentWeek}`} className="card focus-ring flex items-center gap-3 hover:border-primary/50">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-bg text-gold">
            <Icon name="star" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-base font-extrabold">Weekly Revision Test</div>
            <div className="truncate text-sm font-semibold text-ink-muted">
              Week {currentWeek} · {week.label} · {WEEKLY_TEST_LENGTH} questions
              {lastWeekly ? ` · best ${lastWeekly.best}%` : ` · ${WEEKLY_PASS_PERCENT}% unlocks Week ${currentWeek + 1}`}
            </div>
          </div>
          <Icon name="right" className="text-ink-muted" />
        </Link>
      )}

      <section className="card">
        <h2 className="mb-2 text-lg font-extrabold">Earlier weeks</h2>
        {currentWeek > 1 ? (
          <FilterChips
            label="Retake a weekly test"
            value={null}
            onChange={(w) => navigate(`/quiz?mode=weekly&week=${w}`)}
            options={plan.slice(0, currentWeek - 1).map((w) => ({ value: w.n, label: `W${w.n} · ${w.label}${stats.weekly?.results?.[w.n] ? ` · ${stats.weekly.results[w.n].best}%` : ''}` }))}
          />
        ) : (
          <p className="text-sm font-semibold text-ink-muted">Pass the Week 1 test to unlock Week 2.</p>
        )}
      </section>
      <SafetyFooter full={false} />
    </div>
  );
}
