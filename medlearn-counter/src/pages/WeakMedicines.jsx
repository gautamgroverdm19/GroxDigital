import { Link, useNavigate } from 'react-router-dom';
import { EmptyState, Icon, PageHeader, SafetyFooter } from '../components/ui/index.jsx';
import { relativeDue } from '../lib/dates.js';
import { COPY, tx } from '../lib/i18n.js';
import { weakMedicines } from '../lib/plan.js';
import { QUESTION_TYPES } from '../lib/quiz.js';
import { accuracy } from '../lib/srs.js';
import { useApp } from '../state/AppContext.jsx';

export default function WeakMedicines() {
  const { medicines, progress, now, settings } = useApp();
  const navigate = useNavigate();
  const weak = weakMedicines(medicines, progress);

  return (
    <div>
      <PageHeader back="/practice" title="Weak Medicines" subtitle={weak.length ? `${weak.length} to fix · most mistakes first` : ''} />
      {!weak.length ? (
        <EmptyState icon="check" title="Nothing weak yet" action={<Link className="btn-primary w-full" to="/quiz?mode=quick">Take a quick quiz</Link>}>
          {tx(settings.lang, COPY.noWeak)}
        </EmptyState>
      ) : (
        <ul className="space-y-2">
          {weak.map((m) => {
            const p = progress[m.id];
            const acc = accuracy(p);
            return (
              <li key={m.id}>
                <Link to={`/medicine/${encodeURIComponent(m.id)}`} className="focus-ring flex items-center gap-3 rounded-btn border border-line bg-surface p-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-btn bg-danger-bg text-danger-text" title="Wrong answers">
                    <span className="text-lg font-extrabold leading-none">{p.wrong}</span>
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-extrabold">{m.brand}</div>
                    <div className="truncate text-sm font-semibold text-ink-muted">
                      Last miss: {p.lastMistakeType === 'flashcard' ? 'Flashcard' : QUESTION_TYPES[p.lastMistakeType]?.label || '—'}
                      {acc !== null ? ` · ${Math.round(acc * 100)}%` : ''}
                    </div>
                  </div>
                  <span className="shrink-0 text-xs font-bold text-primary-strong dark:text-primary">{relativeDue(p.nextReview, now)}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <SafetyFooter full={false} />
      {weak.length > 0 && (
        <div className="sticky bottom-[96px] mt-4 lg:bottom-4">
          <button className="btn-primary w-full shadow-lg" onClick={() => navigate('/quiz?mode=weak')}>
            <Icon name="practice" /> Practice Weak Medicines
          </button>
        </div>
      )}
    </div>
  );
}
