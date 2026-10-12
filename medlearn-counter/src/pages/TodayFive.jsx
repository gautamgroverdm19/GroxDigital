import { useNavigate } from 'react-router-dom';
import { Icon, MedicineRow, PageHeader, SafetyFooter } from '../components/ui/index.jsx';
import { useApp } from '../state/AppContext.jsx';

export default function TodayFive() {
  const { now, stats, todayIds, idx, progress, plan, currentWeek } = useApp();
  const navigate = useNavigate();
  const doneIds = new Set(stats.daily?.[now]?.ids || []);
  const meds = todayIds.map((id) => idx.byId.get(id)).filter(Boolean);
  const next = meds.find((m) => !doneIds.has(m.id));
  const week = plan[currentWeek - 1];

  return (
    <div>
      <PageHeader back="/" title={`Today's ${meds.length} Medicines`} subtitle={week ? `Week ${currentWeek} · ${week.label} · review-due items first` : ''} />
      <div className="space-y-2">
        {meds.map((m, i) => (
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
            extra={
              <div className="truncate text-sm font-semibold text-ink-muted">
                {[m.strength, m.form].filter(Boolean).join(' · ')}
              </div>
            }
          />
        ))}
      </div>
      <p className="mt-3 text-sm font-semibold text-ink-muted">A medicine gets a tick once you answer a question or flashcard on it today.</p>
      <button className="btn-primary mt-5 w-full" onClick={() => (next ? navigate(`/medicine/${encodeURIComponent(next.id)}?from=today`) : navigate('/quiz?mode=ids&ids=' + meds.map((m) => m.id).join(',')))}>
        {next ? 'Open next medicine card' : "Quiz me on today's list"} <Icon name="right" />
      </button>
      <SafetyFooter />
    </div>
  );
}
