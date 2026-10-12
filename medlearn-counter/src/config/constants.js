// Central place for all tunable learning rules. Change numbers here, not in components.

export const APP_NAME = 'MedLearn Counter';

export const STATUS = {
  NOT_STARTED: 'not_started',
  LEARNING: 'learning',
  PRACTICING: 'practicing',
  MASTERED: 'mastered',
};

export const STATUS_ORDER = [STATUS.NOT_STARTED, STATUS.LEARNING, STATUS.PRACTICING, STATUS.MASTERED];

export const STATUS_LABEL = {
  not_started: 'Not Started',
  learning: 'Learning',
  practicing: 'Practicing',
  mastered: 'Mastered',
};

// Spaced repetition: after the 1st, 2nd, 3rd, 4th correct review the next one comes in…
export const REVIEW_INTERVALS = [1, 3, 7, 14];
// Correct at the 14-day review => Mastered; mastered items come back for a check after this many days.
export const MASTERED_INTERVAL = 30;

// Gamification
export const XP_PER_CORRECT = 10;
export const XP_PER_FLASHCARD_KNOWN = 5;
export const STREAK_BONUS = { 3: 15, 5: 25, 10: 50 }; // in-a-row bonus; every further 10 in a row gives +50 again
export const LEVELS = [
  { name: 'Beginner', min: 0 },
  { name: 'Counter Learner', min: 300 },
  { name: 'Salt Spotter', min: 900 },
  { name: 'Dispensing Pro', min: 2000 },
  { name: 'Pharma Ace', min: 4000 },
  { name: 'Medical Store Master', min: 7500 },
];

export const DAILY_GOAL_OPTIONS = [3, 5, 10];
export const QUICK_QUIZ_LENGTH = 5;
export const WEEKLY_TEST_LENGTH = 15;
export const WEEKLY_PASS_PERCENT = 70;
export const FLASHCARD_DECK_SIZE = 20;

// Weekly roadmap from the design. Each week matches imported categories by keyword
// (never by medicine name). Unmatched categories are appended as extra weeks automatically.
export const WEEKLY_PLAN_TEMPLATE = [
  { label: 'Acidity', pattern: 'acid|stomach|gastr|antacid|ulcer' },
  { label: 'Fever / Pain', pattern: 'fever|pain|analges|antipyretic|joint' },
  { label: 'Antibiotics', pattern: 'antibiotic|antibacterial' },
  { label: 'Cold / Cough / Allergy', pattern: 'cough|cold|allerg|asthma' },
];

export const SAFETY_SHORT = 'For learning and training only. Not medical advice.';
export const SAFETY_FULL =
  'For learning and training only. Not medical advice. Dosage and treatment decisions must follow a doctor\'s prescription and standard references (CIMS/MIMS/Drugs.com).';
