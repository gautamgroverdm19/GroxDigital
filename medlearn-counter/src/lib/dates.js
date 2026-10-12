// Local-time date helpers. Dates are stored as 'YYYY-MM-DD' strings.
const pad = (n) => String(n).padStart(2, '0');

export function toKey(d = new Date()) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export function today() {
  return toKey(new Date());
}
export function fromKey(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y, m - 1, d);
}
export function addDays(key, n) {
  const d = fromKey(key);
  d.setDate(d.getDate() + n);
  return toKey(d);
}
export function diffDays(a, b) {
  // whole days from b to a (a - b)
  return Math.round((fromKey(a) - fromKey(b)) / 86400000);
}
export function lastNDays(n, end = today()) {
  return Array.from({ length: n }, (_, i) => addDays(end, i - (n - 1)));
}
export function prettyDate(key, opts = { day: 'numeric', month: 'short' }) {
  if (!key) return '';
  return fromKey(key).toLocaleDateString('en-IN', opts);
}
export function relativeDue(key, now = today()) {
  if (!key) return '';
  const d = diffDays(key, now);
  if (d < 0) return `${-d}d overdue`;
  if (d === 0) return 'Due today';
  if (d === 1) return 'Due tomorrow';
  return `Due ${prettyDate(key)}`;
}
