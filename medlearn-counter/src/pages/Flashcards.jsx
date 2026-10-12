import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmptyState, Icon, ReviewDue, SafetyFooter, StatusBadge } from '../components/ui/index.jsx';
import { locLabel } from '../lib/indexes.js';
import { flashcardDeck } from '../lib/plan.js';
import { tx } from '../lib/i18n.js';
import { toList } from '../lib/text.js';
import { useApp } from '../state/AppContext.jsx';

const Missing = () => <span className="font-semibold text-ink-muted">Add details on the card</span>;

function Row({ label, children }) {
  return (
    <div>
      <div className="text-xs font-extrabold uppercase tracking-[0.06em] text-ink-muted">{label}</div>
      <div className="text-base font-semibold text-ink-alt">{children}</div>
    </div>
  );
}

export default function Flashcards() {
  const app = useApp();
  const { progress, now, settings, recordFlashcard } = app;
  const navigate = useNavigate();
  const [deck, setDeck] = useState(null);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [tally, setTally] = useState({ known: 0, practice: 0, xp: 0 });

  useEffect(() => {
    if (!deck && app.medicines.length) setDeck(flashcardDeck({ meds: app.medicines, idx: app.idx, progress, todayIds: app.todayIds, plan: app.plan, currentWeek: app.currentWeek, now }));
  }, [app.medicines.length]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!deck) return null;
  if (!deck.length)
    return (
      <div className="pt-4">
        <EmptyState icon="cards" title="No flashcards right now" action={<button className="btn-primary w-full" onClick={() => navigate('/')}>Back to Today</button>} />
      </div>
    );

  if (i >= deck.length) {
    return (
      <div className="pt-4">
        <EmptyState
          icon="check"
          title="Deck finished!"
          action={
            <div className="space-y-2">
              <button className="btn-primary w-full" onClick={() => navigate('/')}>
                Back to Today
              </button>
              <button className="btn-secondary w-full" onClick={() => navigate('/quiz?mode=weak')}>
                Practice weak medicines
              </button>
            </div>
          }
        >
          {tally.known} known · {tally.practice} need practice · +{tally.xp} XP
        </EmptyState>
      </div>
    );
  }

  const med = deck[i];
  const p = progress[med.id];
  const mech = settings.lang === 'hi' ? med.mechanismHi || med.mechanismEn : med.mechanismEn || med.mechanismHi;
  const alert = toList(med.whenNotToGive)[0] || toList(med.precautions)[0];

  const answer = (known) => {
    const r = recordFlashcard({ medId: med.id, known });
    setTally((t) => ({ known: t.known + (known ? 1 : 0), practice: t.practice + (known ? 0 : 1), xp: t.xp + r.xp }));
    setFlipped(false);
    setI((x) => x + 1);
  };

  return (
    <div className="flex min-h-[calc(100dvh-40px)] flex-col">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="focus-ring -ml-2 grid h-11 w-11 place-items-center rounded-full hover:bg-line-soft" aria-label="Close flashcards">
          <Icon name="x" />
        </button>
        <h1 className="flex-1 text-lg font-extrabold">Flashcards</h1>
        <span className="text-sm font-extrabold text-ink-muted">
          Card {i + 1} of {deck.length}
        </span>
      </div>

      <div className="flip-scene flex-1">
        <button
          key={`${med.id}-${i}`}
          className={`flip-card focus-ring relative grid min-h-[440px] w-full rounded-card text-left ${flipped ? 'flipped' : ''}`}
          onClick={() => setFlipped((f) => !f)}
          aria-label={flipped ? 'Show front' : 'Flip card'}
        >
          <div className="flip-face card col-start-1 row-start-1 flex flex-col items-center justify-center text-center">
            <div className="mb-4 flex flex-wrap justify-center gap-2">
              <StatusBadge status={p?.status} />
              <ReviewDue progress={p} now={now} />
            </div>
            <div className="break-words text-4xl font-extrabold tracking-[-0.02em]">{med.brand}</div>
            {med.form && <div className="mt-2 text-base font-semibold text-ink-muted">{med.form}</div>}
            <div className="mt-8 flex items-center gap-2 text-sm font-bold text-primary-strong dark:text-primary">
              <Icon name="refresh" size={18} /> Tap to flip
            </div>
          </div>

          <div className="flip-face flip-back card col-start-1 row-start-1 space-y-3 overflow-y-auto">
            <div className="text-2xl font-extrabold tracking-[-0.02em]">{med.brand}</div>
            <Row label="Salt">{med.salt || <Missing />}{med.strength ? ` · ${med.strength}` : ''}</Row>
            <Row label="Class">{med.class || <Missing />}</Row>
            <Row label="How it works">{mech || <Missing />}</Row>
            <Row label="Uses">{toList(med.uses).join(', ') || <Missing />}</Row>
            {alert && (
              <div className="flex items-start gap-2 rounded-btn border border-caution-border bg-caution-bg p-2.5 text-sm font-semibold text-caution-body">
                <Icon name="triangle" size={18} className="mt-0.5 text-caution-text" /> {alert}
              </div>
            )}
            {med.memoryTrick && (
              <div className="rounded-btn bg-primary-soft p-2.5 text-sm font-bold text-primary-strong dark:text-primary">
                <Icon name="bulb" size={16} className="mr-1 inline" /> {med.memoryTrick}
              </div>
            )}
            <div className="flex gap-6">
              <Row label="Where">{locLabel(med) || '—'}</Row>
              <Row label="MRP">{med.mrp ? `₹${med.mrp}` : '—'}</Row>
            </div>
            <Link to={`/medicine/${encodeURIComponent(med.id)}`} onClick={(e) => e.stopPropagation()} className="inline-flex h-11 items-center gap-1 text-sm font-bold text-primary-strong dark:text-primary">
              Open full card <Icon name="right" size={16} />
            </Link>
          </div>
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button className="btn-secondary" disabled={!flipped} onClick={() => answer(false)}>
          Need Practice
        </button>
        <button className="btn-primary" disabled={!flipped} onClick={() => answer(true)}>
          I Know This
        </button>
      </div>
      {!flipped && <p className="mt-2 text-center text-xs font-semibold text-ink-muted">{tx(settings.lang, { hi: 'Pehle khud yaad karo, phir flip karo.', en: 'Try to recall first, then flip.' })}</p>}
      {flipped && <SafetyFooter />}
    </div>
  );
}
