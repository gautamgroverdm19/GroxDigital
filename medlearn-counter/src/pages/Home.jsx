import { Link, useNavigate } from 'react-router-dom';
import { GoalRing, Icon, MedicineRow, SafetyFooter, StreakChip, XPBar, Bar } from '../components/ui/index.jsx';
import { fromKey } from '../lib/dates.js';
import { levelInfo, liveDayStreak } from '../lib/gamification.js';
import { dueMedicines, weekProgress } from '../lib/plan.js';
import { useApp } from '../state/AppContext.jsx';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

export default function Home() {
  const { now, stats, settings, todayIds, idx, progress, medicines, plan, currentWeek } = useApp();
  const navigate = useNavigate();
  const doneIds = new Set(stats.daily?.[now]?.ids || []);
  const todayMeds = todayIds.map((id) => idx.byId.get(id)).filter(Boolean);
  const doneCount = todayMeds.filter((m) => doneIds.has(m.id)).length;
  const practicedToday = doneIds.size;
  const level = levelInfo(stats.xp || 0);
  const due = dueMedicines(medicines, progress, now);
  const next = todayMeds.find((m) => !doneIds.has(m.id));
  const week = plan[currentWeek - 1];
  const roadmapStart = Math.max(0, Math.min(currentWeek - 2, plan.length - 4));
  const roadmap = plan.slice(roadmapStart, roadmapStart + 4);
  const reminder = settings.reminderTime && new Date().toTimeString().slice(0, 5) >= settings.reminderTime;

  return (
    <div className="space-y-5">
      <header className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-ink-muted">{fromKey(now).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1 className="text-[26px] font-extrabold leading-tight tracking-[-0.01em]">{greeting()}!</h1>
        </div>
        <StreakChip days={liveDayStreak(stats, now)} />
        <Link to="/settings" className="focus-ring -mr-2 grid h-11 w-11 place-items-center rounded-full text-ink-muted hover:bg-line-soft lg:hidden" aria-label="Settings">
          <Icon name="gear" />
        </Link>
      </header>

      <section className="card flex items-center gap-5">
        <GoalRing value={Math.min(practicedToday, settings.dailyGoal)} goal={settings.dailyGoal} />
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <div className="text-lg font-extrabold">{practicedToday >= settings.dailyGoal ? 'Daily goal done!' : 'Daily goal'}</div>
            <div className="text-sm font-semibold text-ink-muted">
              {practicedToday >= settings.dailyGoal ? 'Streak safe for today.' : `Practise ${settings.dailyGoal - practicedToday} more medicine${settings.dailyGoal - practicedToday === 1 ? '' : 's'}`}
            </div>
          </div>
          <XPBar level={level} />
        </div>
      </section>

      {due.length > 0 && (
        <Link to="/quiz?mode=quick" className="focus-ring flex items-center gap-3 rounded-card border-[1.5px] border-primary bg-surface p-4">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-primary-soft text-primary-strong dark:text-primary">
            <Icon name="clock" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-base font-extrabold">
              {due.length} medicine{due.length === 1 ? '' : 's'} due for review
            </div>
            <div className="text-sm font-semibold text-ink-muted">{reminder ? `It's past your ${settings.reminderTime} review time.` : 'Quick quiz brings them back.'}</div>
          </div>
          <Icon name="right" className="text-ink-muted" />
        </Link>
      )}

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="overline">Today's {todayMeds.length}</h2>
          <Link to="/today" className="text-sm font-bold text-primary-strong dark:text-primary">
            See all
          </Link>
        </div>
        <div className="space-y-2">
          {todayMeds.map((m, i) => (
            <MedicineRow
              key={m.id}
              med={m}
              progress={progress}
              now={now}
              from="today"
              lead={
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-extrabold ${doneIds.has(m.id) ? 'bg-success-bg text-success' : 'bg-line-soft text-ink-muted'}`}>
                  {doneIds.has(m.id) ? <Icon name="check" size={18} /> : i + 1}
                </span>
              }
            />
          ))}
        </div>
        <button className="btn-primary mt-4 w-full" onClick={() => (next ? navigate(`/medicine/${encodeURIComponent(next.id)}?from=today`) : navigate('/quiz?mode=quick'))}>
          {next ? (doneCount ? 'Continue learning' : 'Start learning') : 'All done — take a quick quiz'}
          <Icon name="right" />
        </button>
      </section>

      {week && (
        <section className="card">
          <div className="mb-4 flex items-baseline justify-between gap-3">
            <h2 className="text-lg font-extrabold">Your roadmap</h2>
            <span className="text-sm font-bold text-ink-muted">
              Week {currentWeek} of {plan.length}
            </span>
          </div>
          <ol className="space-y-4">
            {roadmap.map((w) => {
              const wp = weekProgress(idx, w, progress);
              const locked = w.n > currentWeek;
              const passed = stats.weekly?.results?.[w.n]?.best >= 70;
              return (
                <li key={w.n}>
                  <Link to={`/learn?week=${w.n}`} className="focus-ring block rounded-btn">
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${w.n === currentWeek ? 'bg-primary text-onprimary' : passed ? 'bg-success-bg text-success' : 'bg-line-soft text-ink-muted'}`}>
                        {passed ? <Icon name="check" size={15} /> : locked ? <Icon name="lock" size={14} /> : w.n}
                      </span>
                      <span className={`flex-1 truncate text-base font-bold ${locked ? 'text-ink-muted' : ''}`}>
                        Week {w.n} · {w.label}
                      </span>
                      <span className="text-xs font-bold text-ink-muted">
                        {wp.started}/{wp.total}
                      </span>
                    </div>
                    <Bar value={wp.total ? wp.started / wp.total : 0} height={8} label={`Week ${w.n} progress`} />
                  </Link>
                </li>
              );
            })}
          </ol>
        </section>
      )}
      <SafetyFooter full={false} />
    </div>
  );
}
