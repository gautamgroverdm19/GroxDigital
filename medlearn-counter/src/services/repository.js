// Data repository: the only module that knows how app data is stored.
// Components and state call these functions; they never touch storage directly.
import { getStorage } from './storage/index.js';

export const KEYS = {
  medicines: 'medicines', // imported base data (array)
  edits: 'edits', // { [id]: { field: value } } – your own additions, kept across re-imports
  progress: 'progress', // { [id]: progress entry }
  settings: 'settings',
  stats: 'stats', // xp, streaks, daily log, weekly tests
};

export const DEFAULT_SETTINGS = {
  lang: 'hi', // 'hi' = Hinglish explanations, 'en' = English
  dailyGoal: 5,
  theme: null, // null = follow device, 'light' | 'dark'
  reminderTime: '18:00',
};

export const DEFAULT_STATS = {
  xp: 0,
  dayStreak: 0,
  lastGoalDate: null,
  bestInARow: 0,
  daily: {}, // { 'YYYY-MM-DD': { answered, correct, xp, ids: [] } }
  weekly: { current: 1, results: {} },
  today: { date: null, ids: [] },
};

export async function loadAll() {
  const s = getStorage();
  const [medicines, edits, progress, settings, stats] = await Promise.all([
    s.get(KEYS.medicines),
    s.get(KEYS.edits),
    s.get(KEYS.progress),
    s.get(KEYS.settings),
    s.get(KEYS.stats),
  ]);
  return {
    medicines: Array.isArray(medicines) ? medicines : [],
    edits: edits || {},
    progress: progress || {},
    settings: { ...DEFAULT_SETTINGS, ...(settings || {}) },
    stats: { ...DEFAULT_STATS, ...(stats || {}), weekly: { ...DEFAULT_STATS.weekly, ...(stats?.weekly || {}) } },
  };
}

export function save(key, value) {
  return getStorage().set(key, value);
}

export async function clearProgress() {
  const s = getStorage();
  await Promise.all([s.remove(KEYS.progress), s.remove(KEYS.stats)]);
}

export async function clearEverything() {
  const s = getStorage();
  const keys = await s.keys();
  await Promise.all(keys.map((k) => s.remove(k)));
}
