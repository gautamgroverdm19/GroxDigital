// Global app state. Holds data + progress, persists through the repository,
// and exposes the actions screens use. Business rules live in src/lib.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { WEEKLY_PASS_PERCENT, XP_PER_CORRECT, XP_PER_FLASHCARD_KNOWN } from '../config/constants.js';
import { addDays, today as todayKey } from '../lib/dates.js';
import { streakBonus } from '../lib/gamification.js';
import { applyEdits, buildIndex } from '../lib/indexes.js';
import { mergeMedicines } from '../lib/importer.js';
import { buildWeeklyPlan, pickToday } from '../lib/plan.js';
import { applyAnswer, getProgress, markOpened } from '../lib/srs.js';
import { DEFAULT_SETTINGS, DEFAULT_STATS, KEYS, clearEverything, loadAll, save } from '../services/repository.js';

const AppContext = createContext(null);
const DAILY_LOG_DAYS = 120;

function useToday() {
  const [now, setNow] = useState(todayKey());
  useEffect(() => {
    const tick = () => setNow(todayKey());
    const id = setInterval(tick, 60000);
    document.addEventListener('visibilitychange', tick);
    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', tick);
    };
  }, []);
  return now;
}

export function AppProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState({
    medicines: [],
    edits: {},
    progress: {},
    settings: DEFAULT_SETTINGS,
    stats: DEFAULT_STATS,
  });
  const ref = useRef(state);
  const timers = useRef({});
  const pending = useRef({});
  const [saveError, setSaveError] = useState(null);
  const [toast, setToast] = useState(null);
  const now = useToday();

  const flush = useCallback((key) => {
    if (!(key in pending.current)) return;
    const value = pending.current[key];
    delete pending.current[key];
    save(KEYS[key], value).then(() => setSaveError(null)).catch((e) => setSaveError(e.message));
  }, []);

  /** Update one slice; keeps a ref in sync (so actions can return values) and saves after 250 ms. */
  const update = useCallback(
    (key, updater) => {
      const prev = ref.current[key];
      const next = typeof updater === 'function' ? updater(prev) : updater;
      ref.current = { ...ref.current, [key]: next };
      setState(ref.current);
      pending.current[key] = next;
      clearTimeout(timers.current[key]);
      timers.current[key] = setTimeout(() => flush(key), 250);
      return next;
    },
    [flush]
  );

  useEffect(() => {
    loadAll().then((data) => {
      ref.current = data;
      setState(data);
      setReady(true);
    });
    const flushAll = () => Object.keys(pending.current).forEach(flush);
    window.addEventListener('pagehide', flushAll);
    return () => window.removeEventListener('pagehide', flushAll);
  }, [flush]);

  // Theme: explicit choice or follow the device.
  const theme = state.settings.theme;
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => document.documentElement.classList.toggle('dark', theme ? theme === 'dark' : mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, [theme]);

  const medicines = useMemo(() => applyEdits(state.medicines, state.edits), [state.medicines, state.edits]);
  const idx = useMemo(() => buildIndex(medicines), [medicines]);
  const plan = useMemo(() => buildWeeklyPlan(idx), [idx]);
  const currentWeek = Math.max(1, Math.min(state.stats.weekly?.current || 1, plan.length || 1));
  const goal = state.settings.dailyGoal;

  // Freeze "Today's 5" for the day (re-picked on a new day, new data or a new goal).
  useEffect(() => {
    if (!ready || !medicines.length) return;
    const t = state.stats.today || {};
    const want = Math.min(goal, medicines.length);
    const valid = t.date === now && t.ids?.length === want && t.ids.every((id) => idx.byId.has(id));
    if (valid) return;
    const ids = pickToday({ meds: medicines, idx, progress: ref.current.progress, plan, currentWeek, goal, now });
    update('stats', (s) => ({ ...s, today: { date: now, ids } }));
  }, [ready, now, goal, medicines, idx, plan, currentWeek, state.stats.today, update]);

  const showToast = useCallback((msg) => {
    setToast({ msg, id: Date.now() });
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(id);
  }, [toast]);

  const logDay = useCallback(
    (s, { medId, ok, xp, inARow = 0 }) => {
      const day = s.daily?.[now] || { answered: 0, correct: 0, xp: 0, ids: [] };
      const nextDay = {
        answered: day.answered + 1,
        correct: day.correct + (ok ? 1 : 0),
        xp: day.xp + xp,
        ids: day.ids.includes(medId) ? day.ids : [...day.ids, medId],
      };
      const cutoff = addDays(now, -DAILY_LOG_DAYS);
      const daily = Object.fromEntries(Object.entries({ ...s.daily, [now]: nextDay }).filter(([d]) => d >= cutoff));
      let { dayStreak = 0, lastGoalDate = null } = s;
      if (nextDay.ids.length >= ref.current.settings.dailyGoal && lastGoalDate !== now) {
        dayStreak = lastGoalDate === addDays(now, -1) ? dayStreak + 1 : 1;
        lastGoalDate = now;
      }
      return { ...s, xp: (s.xp || 0) + xp, daily, dayStreak, lastGoalDate, bestInARow: Math.max(s.bestInARow || 0, inARow) };
    },
    [now]
  );

  const actions = useMemo(
    () => ({
      importMedicines(list, mode = 'merge') {
        let summary;
        update('medicines', (prev) => {
          if (mode === 'replace' || !prev.length) {
            summary = { added: list.length, updated: 0 };
            return list;
          }
          const r = mergeMedicines(prev, list);
          summary = { added: r.added, updated: r.updated };
          return r.medicines;
        });
        update('stats', (s) => ({ ...s, today: { date: null, ids: [] } }));
        return summary;
      },
      updateMedicine(id, patch) {
        update('edits', (e) => ({ ...e, [id]: { ...(e[id] || {}), ...patch } }));
      },
      openMedicine(id) {
        const p = getProgress(ref.current.progress, id);
        const next = markOpened(p);
        if (next !== p) update('progress', (all) => ({ ...all, [id]: next }));
      },
      /** inARow = correct answers in a row INCLUDING this one (0 if wrong). */
      recordAnswer({ medId, ok, type, inARow = 0 }) {
        const before = getProgress(ref.current.progress, medId);
        const after = applyAnswer(before, ok, type, now);
        update('progress', (all) => ({ ...all, [medId]: after }));
        const bonus = ok ? streakBonus(inARow) : 0;
        const xp = ok ? XP_PER_CORRECT + bonus : 0;
        update('stats', (s) => logDay(s, { medId, ok, xp, inARow }));
        return { before: before.status, after: after.status, nextReview: after.nextReview, xp, bonus };
      },
      recordFlashcard({ medId, known }) {
        const before = getProgress(ref.current.progress, medId);
        const after = applyAnswer(before, known, 'flashcard', now);
        update('progress', (all) => ({ ...all, [medId]: after }));
        const xp = known ? XP_PER_FLASHCARD_KNOWN : 0;
        update('stats', (s) => logDay(s, { medId, ok: known, xp }));
        return { before: before.status, after: after.status, xp };
      },
      saveWeeklyResult({ week, correct, total, seconds }) {
        const percent = total ? Math.round((correct / total) * 100) : 0;
        const passed = percent >= WEEKLY_PASS_PERCENT;
        let unlocked = false;
        update('stats', (s) => {
          const w = { ...(s.weekly || { current: 1, results: {} }) };
          const best = w.results?.[week];
          w.results = { ...w.results, [week]: { percent, correct, total, seconds, date: now, best: Math.max(percent, best?.best || 0) } };
          if (passed && week === w.current && w.current < plan.length) {
            w.current += 1;
            unlocked = true;
          }
          return { ...s, weekly: w };
        });
        return { percent, passed, unlocked };
      },
      setSettings(patch) {
        update('settings', (s) => ({ ...s, ...patch }));
      },
      resetProgress() {
        update('progress', {});
        update('stats', { ...DEFAULT_STATS });
      },
      async clearAll() {
        await clearEverything();
        Object.values(timers.current).forEach(clearTimeout);
        pending.current = {};
        const fresh = { medicines: [], edits: {}, progress: {}, settings: { ...DEFAULT_SETTINGS }, stats: { ...DEFAULT_STATS } };
        ref.current = fresh;
        setState(fresh);
      },
      exportBackup() {
        const { medicines: m, edits, progress, settings, stats } = ref.current;
        return { app: 'medlearn-counter', version: 1, exportedAt: new Date().toISOString(), medicines: m, edits, progress, settings, stats };
      },
      restoreBackup(data) {
        if (data?.app !== 'medlearn-counter' || !Array.isArray(data.medicines)) throw new Error('This is not a MedLearn Counter backup file.');
        update('medicines', data.medicines);
        update('edits', data.edits || {});
        update('progress', data.progress || {});
        update('settings', { ...DEFAULT_SETTINGS, ...(data.settings || {}) });
        update('stats', { ...DEFAULT_STATS, ...(data.stats || {}) });
      },
      showToast,
    }),
    [update, now, logDay, plan.length, showToast]
  );

  const value = {
    ready,
    now,
    medicines,
    rawCount: state.medicines.length,
    edits: state.edits,
    idx,
    plan,
    currentWeek,
    progress: state.progress,
    settings: state.settings,
    stats: state.stats,
    todayIds: state.stats.today?.date === now ? state.stats.today.ids : [],
    saveError,
    toast,
    ...actions,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
