import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { HBars } from '../components/ui/Charts.jsx';
import { Bar, Burst, EmptyState, Icon, SafetyFooter, StatusBadge, XPBar } from '../components/ui/index.jsx';
import { STATUS_LABEL, WEEKLY_PASS_PERCENT } from '../config/constants.js';
import { prettyDate } from '../lib/dates.js';
import { levelInfo, liveDayStreak } from '../lib/gamification.js';
import { COPY, FEEDBACK, tx } from '../lib/i18n.js';
import { QUESTION_TYPES, buildQuiz } from '../lib/quiz.js';
import { useApp } from '../state/AppContext.jsx';

const LETTERS = ['A', 'B', 'C', 'D'];

function Result({ mode, questions, answers, startXp, seconds, weekly, onRetryMisses }) {
  const { stats, idx, now, settings } = useApp();
  const navigate = useNavigate();
  const correct = answers.filter((a) => a.ok).length;
  const xpEarned = answers.reduce((s, a) => s + a.xp, 0);
  const bonus = answers.reduce((s, a) => s + a.bonus, 0);
  const before = levelInfo(startXp);
  const level = levelInfo(stats.xp || 0);
  const levelUp = level.index > before.index;
  const misses = answers.filter((a) => !a.ok);

  const byType = useMemo(() => {
    const m = new Map();
    questions.forEach((q, i) => {
      const r = m.get(q.type) || { ok: 0, n: 0 };
      r.n++;
      if (answers[i]?.ok) r.ok++;
      m.set(q.type, r);
    });
    return [...m.entries()];
  }, [questions, answers]);
  const byClass = useMemo(() => {
    const m = new Map();
    questions.forEach((q, i) => {
      const med = idx.byId.get(q.medId);
      const k = med?.class || med?.category || 'Other';
      const r = m.get(k) || { ok: 0, n: 0 };
      r.n++;
      if (answers[i]?.ok) r.ok++;
      m.set(k, r);
    });
    return [...m.entries()].map(([k, r]) => ({ key: k, label: k, value: r.ok / r.n, ok: r.ok, n: r.n })).sort((a, b) => b.n - a.n);
  }, [questions, answers, idx]);

  return (
    <div className="space-y-4">
      <section className="card relative overflow-hidden text-center">
        {levelUp && <Burst />}
        <p className="overline">{mode === 'weekly' ? `Week ${weekly?.week} revision test` : 'Quiz result'}</p>
        <div className="mt-2 text-4xl font-extrabold tracking-[-0.02em]">
          {mode === 'weekly' ? `${weekly?.percent}%` : `${correct}/${questions.length}`}
        </div>
        {mode === 'weekly' && (
          <p className="text-base font-bold text-ink-muted">
            {correct}/{questions.length} correct · {Math.floor(seconds / 60)}m {seconds % 60}s
          </p>
        )}
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <span className="chip bg-gold-bg text-gold">
            <Icon name="star" size={15} /> +{xpEarned} XP{bonus ? ` (incl. +${bonus} streak bonus)` : ''}
          </span>
          <span className="chip bg-streak-bg text-streak">
            <Icon name="flame" size={15} /> {liveDayStreak(stats, now)}-day streak
          </span>
        </div>
        {mode === 'weekly' && (
          <p className={`mt-3 text-base font-bold ${weekly?.passed ? 'text-success' : 'text-ink-alt'}`}>{tx(settings.lang, weekly?.passed ? COPY.weekPassed : COPY.weekRetry)}</p>
        )}
        <div className="mt-4 text-left">
          {levelUp && <p className="mb-2 text-center text-base font-extrabold text-primary-strong dark:text-primary">Level up! You are now a {level.name}.</p>}
          <XPBar level={level} />
        </div>
      </section>

      {mode === 'weekly' && (
        <>
          <section className="card">
            <h2 className="mb-3 text-lg font-extrabold">Accuracy by class</h2>
            <HBars rows={byClass.slice(0, 8)} valueFormat={(r) => `${r.ok}/${r.n}`} />
          </section>
          <section className="card">
            <h2 className="mb-3 text-lg font-extrabold">By question type</h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {byType.map(([t, r]) => (
                <div key={t} className="rounded-btn bg-line-soft p-3">
                  <div className="text-xs font-bold text-ink-muted">{QUESTION_TYPES[t]?.label}</div>
                  <div className="text-xl font-extrabold">{Math.round((r.ok / r.n) * 100)}%</div>
                  <div className="text-xs font-semibold text-ink-muted">
                    {r.ok}/{r.n}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      <section className="card">
        <h2 className="mb-3 text-lg font-extrabold">Questions</h2>
        <ul className="divide-y divide-line-soft">
          {questions.map((q, i) => {
            const a = answers[i];
            const med = idx.byId.get(q.medId);
            if (!a || !med) return null;
            return (
              <li key={i}>
                <Link to={`/medicine/${encodeURIComponent(med.id)}`} className="focus-ring flex items-center gap-3 py-3">
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${a.ok ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger-text'}`}>
                    <Icon name={a.ok ? 'check' : 'x'} size={17} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-extrabold">{med.brand}</div>
                    <div className="truncate text-sm font-semibold text-ink-muted">
                      {q.typeLabel}
                      {a.before !== a.after ? ` · ${STATUS_LABEL[a.before]} → ${STATUS_LABEL[a.after]}` : ''}
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <StatusBadge status={a.after} />
                    {a.nextReview && <div className="mt-1 text-xs font-semibold text-ink-muted">Review {prettyDate(a.nextReview)}</div>}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="grid gap-2 sm:grid-cols-2">
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to Today
        </button>
        {misses.length > 0 ? (
          <button className="btn-secondary" onClick={onRetryMisses}>
            {mode === 'weekly' ? 'Practice the misses' : 'Review mistakes'}
          </button>
        ) : (
          <button className="btn-secondary" onClick={() => navigate('/practice')}>
            More practice
          </button>
        )}
      </div>
      <SafetyFooter full={false} />
    </div>
  );
}

export default function Quiz() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const app = useApp();
  const { idx, medicines, progress, plan, currentWeek, todayIds, now, stats, settings, recordAnswer, saveWeeklyResult } = app;
  const mode = params.get('mode') || 'quick';
  const type = params.get('type') || undefined;
  const key = params.toString();
  const weekNo = mode === 'weekly' ? Number(params.get('week')) || currentWeek : null;

  const [session, setSession] = useState(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    if (!medicines.length) return;
    const questions = buildQuiz({
      mode,
      type,
      ids: (params.get('ids') || '').split(',').filter(Boolean),
      medId: params.get('id'),
      idx,
      meds: medicines,
      progress,
      plan,
      currentWeek: weekNo || currentWeek,
      todayIds,
      now,
    });
    startRef.current = Date.now();
    setSession({ questions, i: 0, answers: [], picked: null, inARow: 0, startXp: stats.xp || 0, done: false, weekly: null, seconds: 0 });
    // Build once per URL; answering must not regenerate the quiz.
  }, [key, medicines.length > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!session) return null;
  const { questions, i, answers, picked, inARow } = session;

  if (!questions.length) {
    return (
      <div className="pt-4">
        <EmptyState
          icon="practice"
          title="Not enough data for this quiz yet"
          action={
            <button className="btn-primary w-full" onClick={() => navigate('/practice')}>
              Back to Practice
            </button>
          }
        >
          {mode === 'weak' ? tx(settings.lang, COPY.noWeak) : 'Import more medicines, or add details like uses and precautions, to unlock this question type.'}
        </EmptyState>
      </div>
    );
  }

  if (session.done) {
    return (
      <div className="pt-2">
        <Result
          mode={mode}
          questions={questions}
          answers={answers}
          startXp={session.startXp}
          seconds={session.seconds}
          weekly={session.weekly}
          onRetryMisses={() => {
            const ids = [...new Set(answers.filter((a) => !a.ok).map((a) => a.medId))];
            setParams({ mode: 'ids', ids: ids.join(','), r: String(Date.now()) });
          }}
        />
      </div>
    );
  }

  const q = questions[i];
  const answered = picked !== null;
  const last = answers[answers.length - 1];
  const okNow = answered && q.options[picked].correct;

  const choose = (oi) => {
    if (answered) return;
    const ok = q.options[oi].correct;
    const streak = ok ? inARow + 1 : 0;
    const res = recordAnswer({ medId: q.medId, ok, type: q.type, inARow: streak });
    setSession((s) => ({ ...s, picked: oi, inARow: streak, answers: [...s.answers, { ...res, ok, medId: q.medId, type: q.type }] }));
  };

  const next = () => {
    if (i + 1 < questions.length) {
      setSession((s) => ({ ...s, i: s.i + 1, picked: null }));
      return;
    }
    const seconds = Math.round((Date.now() - startRef.current) / 1000);
    let weekly = null;
    if (mode === 'weekly') {
      const correct = answers.filter((a) => a.ok).length;
      weekly = { week: weekNo, ...saveWeeklyResult({ week: weekNo, correct, total: questions.length, seconds }) };
    }
    setSession((s) => ({ ...s, done: true, seconds, weekly }));
    window.scrollTo(0, 0);
  };

  const med = idx.byId.get(q.medId);
  const praise = FEEDBACK.correct[i % FEEDBACK.correct.length];

  return (
    <div className="flex min-h-[calc(100dvh-40px)] flex-col">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="focus-ring -ml-2 grid h-11 w-11 place-items-center rounded-full hover:bg-line-soft" aria-label="Close quiz">
          <Icon name="x" />
        </button>
        <div className="flex-1">
          <Bar value={(i + (answered ? 1 : 0)) / questions.length} label="Quiz progress" />
        </div>
        <span className="text-sm font-extrabold text-ink-muted">
          {i + 1}/{questions.length}
        </span>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="chip bg-primary-soft text-primary-strong dark:text-primary">{q.typeLabel}</span>
        {q.chip && <span className="chip max-w-[60%] truncate bg-line-soft text-ink-alt">{q.chip}</span>}
        {mode === 'weekly' && <span className="chip bg-line-soft text-ink-muted">Week {weekNo} test</span>}
        {inARow >= 2 && (
          <span className="chip ml-auto bg-streak-bg text-streak">
            <Icon name="flame" size={15} /> {inARow} in a row
          </span>
        )}
      </div>

      <h1 className="mb-5 text-[22px] font-extrabold leading-snug">{q.prompt}</h1>

      <div className="space-y-2.5" role="radiogroup" aria-label="Answer options">
        {q.options.map((o, oi) => {
          const isPicked = picked === oi;
          let cls = 'border-line bg-surface hover:border-primary/60';
          if (answered && o.correct) cls = `border-success bg-success-bg text-success ${isPicked ? 'animate-pulseok' : ''}`;
          else if (answered && isPicked) cls = 'border-danger-border bg-danger-bg text-danger-body animate-shake';
          else if (answered) cls = 'border-line bg-surface opacity-60';
          return (
            <button key={oi} role="radio" aria-checked={isPicked} disabled={answered} onClick={() => choose(oi)} className={`focus-ring flex min-h-[56px] w-full items-center gap-3 rounded-btn border-[1.5px] px-3.5 py-3 text-left transition ${cls}`}>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-extrabold ${answered && o.correct ? 'bg-success text-surface' : 'bg-line-soft text-ink-muted'}`}>
                {answered && o.correct ? <Icon name="check" size={17} /> : answered && isPicked ? <Icon name="x" size={17} /> : LETTERS[oi]}
              </span>
              <span className="text-base font-bold">{o.label}</span>
            </button>
          );
        })}
      </div>

      {answered && (
        <section aria-live="polite" className={`mt-5 animate-fadein rounded-card border p-4 ${okNow ? 'border-success/40 bg-success-bg' : 'border-danger-border bg-danger-bg'}`}>
          <div className="flex items-center gap-2">
            <h2 className={`flex-1 text-lg font-extrabold ${okNow ? 'text-success' : 'text-danger-text'}`}>{okNow ? tx(settings.lang, praise) : tx(settings.lang, FEEDBACK.wrong)}</h2>
            {okNow && (
              <span className="chip bg-gold-bg text-gold">
                +{last.xp} XP{last.bonus ? ' 🔥' : ''}
              </span>
            )}
          </div>
          {!okNow && <p className="mt-1 text-base font-extrabold text-ink">{q.options[q.answer].label}</p>}
          <p className="mt-2 text-base leading-relaxed text-ink-alt">{tx(settings.lang, q.explain)}</p>
          {last.bonus > 0 && <p className="mt-1 text-sm font-bold text-gold">Streak bonus +{last.bonus} XP for {inARow} in a row!</p>}
          {med && (
            <Link to={`/medicine/${encodeURIComponent(med.id)}`} className="mt-2 inline-flex h-11 items-center gap-1 text-sm font-bold text-primary-strong dark:text-primary">
              Open {med.brand} card <Icon name="right" size={16} />
            </Link>
          )}
        </section>
      )}

      <div className="mt-auto pt-6">
        <button className="btn-primary w-full" disabled={!answered} onClick={next}>
          {i + 1 < questions.length ? 'Next question' : 'See result'} <Icon name="right" />
        </button>
        {mode !== 'weekly' && <p className="mt-3 text-center text-xs font-semibold text-ink-muted">Wrong answers come back tomorrow; right ones less often.</p>}
        {mode === 'weekly' && <p className="mt-3 text-center text-xs font-semibold text-ink-muted">Score {WEEKLY_PASS_PERCENT}% to unlock the next week.</p>}
      </div>
    </div>
  );
}
