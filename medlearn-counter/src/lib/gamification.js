import { LEVELS, STREAK_BONUS } from '../config/constants.js';
import { addDays } from './dates.js';

/** Bonus XP when the in-a-row count reaches 3, 5, 10 (and every further 10). */
export function streakBonus(inARow) {
  if (STREAK_BONUS[inARow]) return STREAK_BONUS[inARow];
  if (inARow > 10 && inARow % 10 === 0) return STREAK_BONUS[10];
  return 0;
}

export function levelInfo(xp) {
  let index = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].min) index = i;
  const cur = LEVELS[index];
  const next = LEVELS[index + 1];
  const progress = next ? (xp - cur.min) / (next.min - cur.min) : 1;
  return { index, number: index + 1, name: cur.name, min: cur.min, next: next?.min ?? null, nextName: next?.name ?? null, progress, toNext: next ? next.min - xp : 0 };
}

/** Day streak shown to the user: still alive if the goal was met today or yesterday. */
export function liveDayStreak(stats, now) {
  if (!stats.lastGoalDate) return 0;
  if (stats.lastGoalDate === now || stats.lastGoalDate === addDays(now, -1)) return stats.dayStreak || 0;
  return 0;
}
