// Spaced repetition + learning status rules.
//  Not Started -> Learning (card opened) -> Practicing (answered correctly once) -> Mastered (correct at 14-day review)
//  Correct: next review in 1, 3, 7, then 14 days. Wrong: review resets to 1 day and status drops one step.
import { MASTERED_INTERVAL, REVIEW_INTERVALS, STATUS } from '../config/constants.js';
import { addDays, diffDays, today } from './dates.js';

export const emptyProgress = () => ({
  status: STATUS.NOT_STARTED,
  reps: 0,
  nextReview: null,
  lastPracticed: null,
  correct: 0,
  wrong: 0,
  lastMistakeType: null,
  lastMistakeDate: null,
  recent: [], // last results, newest last: 1 = correct, 0 = wrong
});

export function getProgress(progress, id) {
  return progress[id] || emptyProgress();
}

export function isDue(p, now = today()) {
  return !!p?.nextReview && p.nextReview <= now;
}

export function accuracy(p) {
  const n = (p?.correct || 0) + (p?.wrong || 0);
  return n ? p.correct / n : null;
}

export function markOpened(p) {
  if (p.status !== STATUS.NOT_STARTED) return p;
  return { ...p, status: STATUS.LEARNING };
}

const dropOne = {
  [STATUS.MASTERED]: STATUS.PRACTICING,
  [STATUS.PRACTICING]: STATUS.LEARNING,
  [STATUS.LEARNING]: STATUS.LEARNING,
  [STATUS.NOT_STARTED]: STATUS.LEARNING,
};

/** Apply one answer. Returns the new progress entry. */
export function applyAnswer(prev, ok, type, now = today()) {
  const p = { ...prev, recent: [...(prev.recent || []), ok ? 1 : 0].slice(-10), lastPracticed: now };
  if (ok) {
    p.correct = (p.correct || 0) + 1;
    if (p.status === STATUS.NOT_STARTED || p.status === STATUS.LEARNING) {
      p.status = STATUS.PRACTICING;
      p.reps = 1;
      p.nextReview = addDays(now, REVIEW_INTERVALS[0]);
    } else if (!p.nextReview || p.nextReview <= now) {
      // Only a review that was actually due moves the schedule forward.
      if (p.status === STATUS.MASTERED) {
        p.nextReview = addDays(now, MASTERED_INTERVAL);
      } else {
        p.reps = (p.reps || 0) + 1;
        if (p.reps > REVIEW_INTERVALS.length) {
          p.status = STATUS.MASTERED;
          p.nextReview = addDays(now, MASTERED_INTERVAL);
        } else {
          p.nextReview = addDays(now, REVIEW_INTERVALS[p.reps - 1]);
        }
      }
    }
  } else {
    p.wrong = (p.wrong || 0) + 1;
    p.status = dropOne[p.status] || STATUS.LEARNING;
    p.reps = p.status === STATUS.PRACTICING ? 1 : 0;
    p.nextReview = addDays(now, 1);
    p.lastMistakeType = type || null;
    p.lastMistakeDate = now;
  }
  return p;
}

/**
 * Review priority – higher comes first. Uses overdue days, wrong count,
 * accuracy and how recently the last mistake happened.
 */
export function priority(p, now = today()) {
  if (!p) return 0;
  const overdue = p.nextReview ? Math.max(0, diffDays(now, p.nextReview)) : 0;
  const acc = accuracy(p);
  const recentMiss = p.lastMistakeDate ? Math.max(0, 7 - diffDays(now, p.lastMistakeDate)) / 7 : 0;
  return (isDue(p, now) ? 10 : 0) + overdue * 1.5 + (p.wrong || 0) * 2 + (acc === null ? 0 : (1 - acc) * 5) + recentMiss * 3;
}

/** A medicine is "weak" if you got it wrong and it is not yet solid. */
export function isWeak(p) {
  if (!p || !p.wrong) return false;
  const acc = accuracy(p);
  const last = p.recent?.[p.recent.length - 1];
  return last === 0 || acc < 0.8 || p.status === STATUS.LEARNING;
}
