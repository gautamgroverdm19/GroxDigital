// UI labels are English; explanations switch between Hinglish ('hi') and English ('en').
export function tx(lang, text) {
  if (!text) return '';
  if (typeof text === 'string') return text;
  return text[lang] || text.en || text.hi || '';
}

export const FEEDBACK = {
  correct: [{ hi: 'Sahi jawab!', en: 'Correct!' }, { hi: 'Bilkul sahi!', en: 'Spot on!' }, { hi: 'Badhiya!', en: 'Well done!' }],
  wrong: { hi: 'Koi baat nahi — sahi jawab yeh hai:', en: 'Not quite — the right answer is:' },
};

export const COPY = {
  emptyField: { hi: 'Abhi yahan kuch nahi likha. "Add details" dabao aur apne words mein likho.', en: 'Nothing here yet. Tap "Add details" and write it in your own words.' },
  weekPassed: { hi: 'Shabash! Agla week unlock ho gaya.', en: 'Great! The next week is unlocked.' },
  weekRetry: { hi: 'Thoda aur practice karo — 70% par agla week khulega.', en: 'A bit more practice — the next week unlocks at 70%.' },
  noWeak: { hi: 'Abhi koi weak medicine nahi. Quiz khelo, galtiyan yahan dikhengi.', en: 'No weak medicines yet. Take a quiz — mistakes show up here.' },
};
