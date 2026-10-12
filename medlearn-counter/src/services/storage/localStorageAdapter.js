// LocalStorage implementation of the storage adapter interface.
// Every adapter exposes the same async methods, so a cloud adapter
// (Firebase / Supabase) can replace this one without touching the UI.
//
//   get(key)        -> Promise<any | null>
//   set(key, value) -> Promise<void>
//   remove(key)     -> Promise<void>
//   keys()          -> Promise<string[]>

const PREFIX = 'mlc:';

export function createLocalStorageAdapter() {
  const ls = typeof window !== 'undefined' ? window.localStorage : null;
  return {
    name: 'localStorage',
    async get(key) {
      if (!ls) return null;
      const raw = ls.getItem(PREFIX + key);
      if (raw === null) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    },
    async set(key, value) {
      if (!ls) return;
      try {
        ls.setItem(PREFIX + key, JSON.stringify(value));
      } catch (err) {
        const quota = err && (err.name === 'QuotaExceededError' || err.code === 22);
        throw new Error(quota ? 'Browser storage is full. Export a backup and remove some data.' : String(err));
      }
    },
    async remove(key) {
      ls?.removeItem(PREFIX + key);
    },
    async keys() {
      if (!ls) return [];
      return Object.keys(ls).filter((k) => k.startsWith(PREFIX)).map((k) => k.slice(PREFIX.length));
    },
  };
}
