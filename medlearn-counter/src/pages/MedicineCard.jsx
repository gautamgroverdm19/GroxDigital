import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import EditableField from '../components/ui/EditableField.jsx';
import { Collapsible, EmptyState, Icon, PageHeader, ReviewDue, SafetyFooter, SegmentBar, Sheet, StatusBadge, StatusDot } from '../components/ui/index.jsx';
import { STATUS_LABEL } from '../config/constants.js';
import { relativeDue } from '../lib/dates.js';
import { locLabel, sameSaltBrands } from '../lib/indexes.js';
import { accuracy, getProgress } from '../lib/srs.js';
import { toList } from '../lib/text.js';
import { useApp } from '../state/AppContext.jsx';

const BASIC = [
  ['brand', 'Brand'], ['salt', 'Salt / composition'], ['strength', 'Strength'], ['form', 'Form'], ['company', 'Company'],
  ['class', 'Class'], ['category', 'Category'], ['rack', 'Rack'], ['shelf', 'Shelf'], ['mrp', 'MRP (₹)'], ['rx', 'Rx / OTC'],
];

function masterySteps(p) {
  if (p.status === 'mastered') return 5;
  if (p.status === 'practicing') return Math.min(4, 1 + (p.reps || 1));
  if (p.status === 'learning') return 1;
  return 0;
}

function EditBasics({ med, open, onClose }) {
  const { updateMedicine, showToast } = useApp();
  const [draft, setDraft] = useState({});
  useEffect(() => {
    if (open) setDraft(Object.fromEntries(BASIC.map(([k]) => [k, med[k] || ''])));
  }, [open, med]);
  const save = () => {
    const patch = {};
    for (const [k] of BASIC) if ((draft[k] || '') !== (med[k] || '')) patch[k] = draft[k].trim();
    if (patch.brand === '') delete patch.brand;
    if (Object.keys(patch).length) updateMedicine(med.id, patch);
    showToast('Details saved');
    onClose();
  };
  return (
    <Sheet open={open} onClose={onClose} title="Edit medicine details">
      <div className="space-y-3">
        {BASIC.map(([k, label]) => (
          <label key={k} className="block">
            <span className="mb-1 block text-xs font-bold text-ink-muted">{label}</span>
            <input className="input" value={draft[k] || ''} onChange={(e) => setDraft((d) => ({ ...d, [k]: e.target.value }))} />
          </label>
        ))}
        <button className="btn-primary w-full" onClick={save}>
          Save
        </button>
      </div>
    </Sheet>
  );
}

function AlertBlock({ tone, icon, title, med, field }) {
  const cls =
    tone === 'danger'
      ? 'border-danger-border bg-danger-bg text-danger-body'
      : 'border-caution-border bg-caution-bg text-caution-body';
  const head = tone === 'danger' ? 'text-danger-text' : 'text-caution-text';
  return (
    <div className={`rounded-btn border p-3.5 ${cls}`}>
      <div className={`mb-2 flex items-center gap-2 text-base font-extrabold ${head}`}>
        <Icon name={icon} size={20} /> {title}
      </div>
      <EditableField med={med} field={field} label={title} list placeholder="One point per line">
        <ul className="list-disc space-y-1 pl-5 text-base leading-relaxed">
          {toList(med[field]).map((x, i) => (
            <li key={i}>{x}</li>
          ))}
        </ul>
      </EditableField>
    </div>
  );
}

function RackDiagram({ med }) {
  const { idx } = useApp();
  if (!med.rack) return null;
  const shelves = [...(idx.shelvesByRack.get(med.rack) || [])].sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  const racks = idx.racks;
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-1.5" aria-label="Racks">
        {racks.map((r) => (
          <span key={r} className={`grid h-9 min-w-9 place-items-center rounded-chip px-2 text-sm font-extrabold ${r === med.rack ? 'bg-primary text-onprimary' : 'bg-line-soft text-ink-muted'}`}>
            {r}
          </span>
        ))}
      </div>
      <div className="rounded-btn border-2 border-line p-2">
        <div className="mb-1.5 text-center text-xs font-extrabold text-ink-muted">RACK {med.rack}</div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {shelves.map((s) => {
            const here = (med.locations || []).some((l) => l.rack === med.rack && l.shelf === s);
            return (
              <span key={s} className={`rounded-[8px] px-2 py-2 text-center text-sm font-bold ${here ? 'bg-primary-soft text-primary-strong ring-2 ring-primary dark:text-primary' : 'bg-line-soft text-ink-muted'}`}>
                {s}
                {here && ' ●'}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function MedicineCard() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const from = params.get('from');
  const navigate = useNavigate();
  const { idx, progress, now, openMedicine, settings, todayIds, stats } = useApp();
  const med = idx.byId.get(id);
  const [editing, setEditing] = useState(false);
  const [showAllAlts, setShowAllAlts] = useState(false);

  useEffect(() => {
    if (med) openMedicine(med.id);
  }, [med?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!med) {
    return (
      <div>
        <PageHeader back="/" title="Medicine not found" />
        <EmptyState icon="search" title="This medicine is not in your list" action={<Link to="/search" className="btn-primary w-full">Search medicines</Link>}>
          It may have been removed by a new import.
        </EmptyState>
      </div>
    );
  }

  const p = getProgress(progress, med.id);
  const lang = settings.lang;
  const mechField = lang === 'hi' ? 'mechanismHi' : 'mechanismEn';
  const otherMech = lang === 'hi' ? med.mechanismEn : med.mechanismHi;
  const alts = sameSaltBrands(idx, med);
  const todayPos = from === 'today' ? todayIds.indexOf(med.id) : -1;
  const doneToday = new Set(stats.daily?.[now]?.ids || []);
  const nextToday = todayPos >= 0 ? todayIds.slice(todayPos + 1).concat(todayIds.slice(0, todayPos)).find((x) => !doneToday.has(x) && x !== med.id) : null;
  const acc = accuracy(p);
  const jump = (target) => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="space-y-4">
      <PageHeader
        back="/"
        title={todayPos >= 0 ? `Medicine ${todayPos + 1} of ${todayIds.length}` : 'Medicine card'}
        right={
          <button onClick={() => setEditing(true)} className="focus-ring grid h-11 w-11 place-items-center rounded-full text-ink-muted hover:bg-line-soft" aria-label="Edit details">
            <Icon name="pencil" />
          </button>
        }
      />
      {todayPos >= 0 ? (
        <SegmentBar total={todayIds.length} filled={todayPos + 1} label="Position in today's list" />
      ) : (
        <div>
          <SegmentBar total={5} filled={masterySteps(p)} label="Mastery path" />
          <p className="mt-1.5 text-xs font-semibold text-ink-muted">Mastery path · {STATUS_LABEL[p.status]}</p>
        </div>
      )}

      <section className="card">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <StatusBadge status={p.status} />
          <ReviewDue progress={p} now={now} />
          {med.rx && <span className={`chip ${/rx/i.test(med.rx) ? 'bg-caution-bg text-caution-text' : 'bg-line-soft text-ink-muted'}`}>{med.rx}</span>}
        </div>
        <h2 className="break-words text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">{med.brand}</h2>
        <p className="mt-1 text-lg font-bold text-ink-alt">{[med.salt || 'Salt not added', med.strength].filter(Boolean).join(' · ')}</p>
        <p className="mt-0.5 text-base font-semibold text-ink-muted">{[med.form, med.company].filter(Boolean).join(' · ') || 'Form / company not added'}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {med.class && <span className="chip bg-primary-soft text-primary-strong dark:text-primary">{med.class}</span>}
          {med.category && <span className="chip bg-line-soft text-ink-alt">{med.category}</span>}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line-soft pt-4">
          <div>
            <div className="text-xs font-bold text-ink-muted">Location</div>
            <div className="text-base font-extrabold">{locLabel(med) || '—'}</div>
            {med.locations?.length > 1 && <div className="text-xs font-semibold text-ink-muted">+{med.locations.length - 1} more place{med.locations.length > 2 ? 's' : ''}</div>}
          </div>
          <div>
            <div className="text-xs font-bold text-ink-muted">MRP</div>
            <div className="text-base font-extrabold">{med.mrp ? `₹${med.mrp}` : <button onClick={() => setEditing(true)} className="text-sm font-bold text-primary-strong underline dark:text-primary">Add details</button>}</div>
          </div>
        </div>
        {(p.correct || p.wrong) > 0 && (
          <p className="mt-3 text-sm font-semibold text-ink-muted">
            {p.correct} right · {p.wrong} wrong{acc !== null ? ` · ${Math.round(acc * 100)}% accuracy` : ''}
            {p.nextReview ? ` · ${relativeDue(p.nextReview, now)}` : ''}
          </p>
        )}
      </section>

      {med.dataNote && (
        <div className="flex items-start gap-2 rounded-btn border border-line bg-surface p-3.5 text-sm font-semibold text-ink-alt">
          <Icon name="info" size={18} className="mt-0.5 text-info" />
          <span>
            <b className="text-info">Data note:</b> {med.dataNote}
          </span>
        </div>
      )}

      <nav className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none]" aria-label="Jump to section">
        {[
          ['how', 'How it works'],
          ['alerts', 'Alerts'],
          ['trick', 'Trick'],
          ['ask', 'Ask'],
          ['where', 'Location'],
        ].map(([t, l]) => (
          <button key={t} onClick={() => jump(t)} className="focus-ring h-11 shrink-0 rounded-chip border border-line bg-surface px-3.5 text-sm font-bold text-ink-alt">
            {l}
          </button>
        ))}
      </nav>

      <Collapsible id="how" title="How it works" icon="sparkle">
        {!med[mechField] && otherMech && (
          <p className="mb-3 whitespace-pre-line text-base leading-relaxed text-ink-alt">
            {otherMech} <span className="text-xs font-bold text-ink-muted">({lang === 'hi' ? 'English' : 'Hinglish'})</span>
          </p>
        )}
        <EditableField med={med} field={mechField} label={lang === 'hi' ? 'How it works (Hinglish)' : 'How it works (English)'} placeholder="2 simple lines" />
        <div className="mt-3 rounded-btn bg-line-soft p-3">
          <div className="mb-1 text-xs font-extrabold text-ink-muted">ANALOGY</div>
          <EditableField med={med} field="analogy" label="Analogy" placeholder="Jaise… (an everyday comparison)">
            <p className="text-base italic leading-relaxed text-ink-alt">{med.analogy}</p>
          </EditableField>
        </div>
      </Collapsible>

      <Collapsible title="Common uses" icon="check">
        <EditableField med={med} field="uses" label="Uses" list placeholder="One use per line">
          <ul className="space-y-1.5">
            {toList(med.uses).map((u, i) => (
              <li key={i} className="flex gap-2 text-base text-ink-alt">
                <Icon name="check" size={18} className="mt-0.5 text-primary" /> {u}
              </li>
            ))}
          </ul>
        </EditableField>
      </Collapsible>

      <Collapsible id="alerts" title="Dispensing alerts" icon="triangle">
        <div className="space-y-3">
          <AlertBlock tone="caution" icon="triangle" title="Precautions" med={med} field="precautions" />
          <AlertBlock tone="danger" icon="ban" title="When NOT to give" med={med} field="whenNotToGive" />
          <AlertBlock tone="caution" icon="alert" title="Key interactions" med={med} field="interactions" />
        </div>
      </Collapsible>

      <Collapsible title="Side effects" icon="info">
        <EditableField med={med} field="sideEffects" label="Side effects" list placeholder="One per line">
          <div className="flex flex-wrap gap-2">
            {toList(med.sideEffects, { commas: true }).map((s, i) => (
              <span key={i} className="chip bg-line-soft text-ink-alt">
                {s}
              </span>
            ))}
          </div>
        </EditableField>
      </Collapsible>

      <Collapsible title={`Same-salt brands${alts.length ? ` (${alts.length})` : ''}`} icon="chain">
        {alts.length > 0 ? (
          <div className="space-y-2">
            {(showAllAlts ? alts : alts.slice(0, 4)).map((a) => (
              <Link key={a.id} to={`/medicine/${encodeURIComponent(a.id)}`} className="focus-ring flex min-h-[52px] items-center gap-3 rounded-btn border border-line px-3 py-2">
                <StatusDot status={progress[a.id]?.status} />
                <div className="min-w-0 flex-1">
                  <div className="truncate font-extrabold">{a.brand}</div>
                  <div className="truncate text-sm font-semibold text-ink-muted">{[a.salt, locLabel(a)].filter(Boolean).join(' · ')}</div>
                </div>
                <Icon name="right" size={18} className="text-ink-muted" />
              </Link>
            ))}
            {alts.length > 4 && (
              <button className="btn-text" onClick={() => setShowAllAlts((s) => !s)}>
                {showAllAlts ? 'Show less' : `Show all ${alts.length}`}
              </button>
            )}
          </div>
        ) : (
          <p className="mb-3 text-sm font-semibold text-ink-muted">No other brand with this salt in your list.</p>
        )}
        <div className="mt-3">
          <div className="mb-1 text-xs font-extrabold text-ink-muted">OTHER BRANDS YOU KNOW (not in your list)</div>
          <EditableField med={med} field="alternatives" label="Alternative brands" list placeholder="One brand per line">
            <div className="flex flex-wrap gap-2">
              {toList(med.alternatives, { commas: true }).map((s, i) => (
                <span key={i} className="chip bg-line-soft text-ink-alt">
                  {s}
                </span>
              ))}
            </div>
          </EditableField>
        </div>
      </Collapsible>

      <section id="trick" className="scroll-mt-20 rounded-card border border-primary/30 bg-primary-soft p-5 text-primary-strong dark:text-primary">
        <div className="mb-2 flex items-center gap-2 text-lg font-extrabold">
          <Icon name="bulb" /> Memory trick
        </div>
        <EditableField med={med} field="memoryTrick" label="Memory trick" placeholder="Apna yaad rakhne ka tareeka…">
          <p className="text-lg font-bold leading-relaxed">{med.memoryTrick}</p>
        </EditableField>
      </section>

      <Collapsible id="ask" title="Ask the customer" icon="chat">
        <EditableField med={med} field="counterQuestions" label="Counter questions" list placeholder="One question per line">
          <div className="space-y-2">
            {toList(med.counterQuestions).map((q, i) => (
              <div key={i} className="w-fit max-w-[90%] rounded-[18px] rounded-bl-[6px] bg-primary-soft px-4 py-2.5 text-base font-semibold text-primary-strong dark:text-primary">
                {q}
              </div>
            ))}
          </div>
        </EditableField>
      </Collapsible>

      <Collapsible id="where" title="Store location" icon="pin">
        <RackDiagram med={med} />
        {med.locations?.length > 1 && (
          <p className="mt-3 text-sm font-semibold text-ink-alt">Also kept at: {med.locations.slice(1).map(locLabel).join('; ')}</p>
        )}
        <p className="mt-3 text-base font-bold">MRP: {med.mrp ? `₹${med.mrp}` : <span className="text-ink-muted">not added</span>}</p>
        {med.notes && <p className="mt-2 text-sm font-semibold text-ink-muted">Note: {med.notes}</p>}
      </Collapsible>

      <SafetyFooter />

      <div className="sticky bottom-[96px] z-20 flex gap-2 pt-2 lg:bottom-4">
        <Link to={`/quiz?mode=medicine&id=${encodeURIComponent(med.id)}`} className="btn-primary flex-1 shadow-lg">
          <Icon name="practice" /> Quiz me on this medicine
        </Link>
        {nextToday && (
          <button onClick={() => navigate(`/medicine/${encodeURIComponent(nextToday)}?from=today`)} className="btn-secondary shadow-lg" aria-label="Next medicine">
            Next <Icon name="right" />
          </button>
        )}
      </div>
      <EditBasics med={med} open={editing} onClose={() => setEditing(false)} />
    </div>
  );
}
