import { useEffect, useRef, useState } from 'react';
import ImportPanel, { ColumnGuide, sampleTemplateHref } from '../components/ImportPanel.jsx';
import { Icon, PageHeader, SafetyFooter, Segmented, Sheet, Toggle } from '../components/ui/index.jsx';
import { DAILY_GOAL_OPTIONS, SAFETY_FULL } from '../config/constants.js';
import { useApp } from '../state/AppContext.jsx';

function Row({ title, sub, children }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="min-w-0 flex-1">
        <div className="text-base font-bold">{title}</div>
        {sub && <div className="text-sm font-semibold text-ink-muted">{sub}</div>}
      </div>
      {children}
    </div>
  );
}

function InstallCard() {
  const [canPrompt, setCanPrompt] = useState(!!window.__installPrompt);
  const installed = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
  useEffect(() => {
    const on = () => setCanPrompt(true);
    window.addEventListener('installable', on);
    return () => window.removeEventListener('installable', on);
  }, []);
  if (installed) return null;
  const install = async () => {
    const e = window.__installPrompt;
    if (!e) return;
    e.prompt();
    await e.userChoice;
    window.__installPrompt = null;
    setCanPrompt(false);
  };
  return (
    <section className="card space-y-3">
      <h2 className="text-lg font-extrabold">Install on your phone</h2>
      <p className="text-sm font-semibold text-ink-muted">No Play Store needed. The app gets its own icon and works without internet after the first open.</p>
      {canPrompt ? (
        <button className="btn-primary w-full" onClick={install}>
          <Icon name="download" /> Install app
        </button>
      ) : (
        <ul className="space-y-1.5 text-sm font-semibold text-ink-alt">
          <li>
            <b>Android (Chrome):</b> menu ⋮ → <b>Add to Home screen</b> / <b>Install app</b>
          </li>
          <li>
            <b>iPhone (Safari):</b> Share button → <b>Add to Home Screen</b>
          </li>
        </ul>
      )}
    </section>
  );
}

export default function Settings() {
  const { settings, setSettings, resetProgress, clearAll, exportBackup, restoreBackup, showToast, medicines } = useApp();
  const [confirm, setConfirm] = useState(null);
  const restoreRef = useRef(null);
  const isDark = settings.theme ? settings.theme === 'dark' : document.documentElement.classList.contains('dark');

  const download = () => {
    const blob = new Blob([JSON.stringify(exportBackup())], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `medlearn-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };
  const onRestore = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    try {
      restoreBackup(JSON.parse(await f.text()));
      showToast('Backup restored');
    } catch (err) {
      showToast(err.message);
    }
  };

  return (
    <div className="space-y-4">
      <PageHeader back="/" title="Settings" subtitle="Changes save automatically" />

      <section className="card divide-y divide-line-soft py-2">
        <div className="py-3">
          <div className="mb-2 text-base font-bold">Explanation language</div>
          <Segmented
            label="Explanation language"
            value={settings.lang}
            onChange={(lang) => setSettings({ lang })}
            options={[
              { value: 'hi', label: 'Hinglish' },
              { value: 'en', label: 'English' },
            ]}
          />
        </div>
        <div className="py-3">
          <div className="mb-2 text-base font-bold">Daily goal</div>
          <Segmented label="Daily goal" value={settings.dailyGoal} onChange={(dailyGoal) => setSettings({ dailyGoal })} options={DAILY_GOAL_OPTIONS.map((n) => ({ value: n, label: `${n} medicines` }))} />
        </div>
        <Row title="Dark mode" sub={settings.theme ? 'Set by you' : 'Following your device'}>
          <Toggle label="Dark mode" checked={isDark} onChange={(on) => setSettings({ theme: on ? 'dark' : 'light' })} />
        </Row>
        <Row title="Review reminder time" sub="Home shows a reminder after this time when reviews are due">
          <input type="time" className="input w-32 py-2" value={settings.reminderTime || ''} onChange={(e) => setSettings({ reminderTime: e.target.value })} aria-label="Review reminder time" />
        </Row>
      </section>

      <InstallCard />

      <section className="card space-y-3">
        <h2 className="text-lg font-extrabold">Import medicine data</h2>
        <p className="text-sm font-semibold text-ink-muted">{medicines.length.toLocaleString('en-IN')} medicines in the app now. Re-importing keeps your progress and your own added details.</p>
        <ImportPanel compact />
        <ColumnGuide />
        <a href={sampleTemplateHref()} download="medlearn-sample-template.csv" className="btn-secondary w-full">
          <Icon name="download" /> Download sample CSV template
        </a>
      </section>

      <section className="card space-y-2">
        <h2 className="text-lg font-extrabold">Backup</h2>
        <p className="text-sm font-semibold text-ink-muted">Data lives in this browser only. Download a backup to move to another phone or computer.</p>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-tonal" onClick={download}>
            <Icon name="download" /> Backup
          </button>
          <button className="btn-tonal" onClick={() => restoreRef.current?.click()}>
            <Icon name="upload" /> Restore
          </button>
        </div>
        <input ref={restoreRef} type="file" accept=".json,application/json" className="hidden" onChange={onRestore} />
      </section>

      <section className="card space-y-2">
        <h2 className="text-lg font-extrabold">Reset</h2>
        <button className="btn-secondary w-full" onClick={() => setConfirm('progress')}>
          <Icon name="refresh" /> Reset progress (keep medicines)
        </button>
        <button className="btn w-full border-[1.5px] border-danger-border bg-surface text-danger-text" onClick={() => setConfirm('all')}>
          <Icon name="trash" /> Delete all data
        </button>
      </section>

      <section className="rounded-card border border-caution-border bg-caution-bg p-4 text-caution-body">
        <div className="mb-1 flex items-center gap-2 font-extrabold text-caution-text">
          <Icon name="triangle" size={20} /> Safety
        </div>
        <p className="text-base leading-relaxed">{SAFETY_FULL}</p>
        <p className="mt-2 text-sm font-semibold">Verify all medicine content you add against CIMS/MIMS.</p>
      </section>

      <Sheet open={!!confirm} onClose={() => setConfirm(null)} title={confirm === 'all' ? 'Delete all data?' : 'Reset progress?'}>
        <p className="mb-5 text-base text-ink-alt">
          {confirm === 'all'
            ? 'This removes your medicines, your added details, progress, XP and settings from this browser. Download a backup first if you may need it.'
            : 'Statuses, review dates, XP, streaks and test results go back to zero. Your medicine list and added details stay.'}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn-secondary" onClick={() => setConfirm(null)}>
            Cancel
          </button>
          <button
            className="btn bg-danger-text text-surface"
            onClick={async () => {
              if (confirm === 'all') await clearAll();
              else resetProgress();
              showToast(confirm === 'all' ? 'All data deleted' : 'Progress reset');
              setConfirm(null);
            }}
          >
            {confirm === 'all' ? 'Delete' : 'Reset'}
          </button>
        </div>
      </Sheet>
      <SafetyFooter full={false} />
    </div>
  );
}
