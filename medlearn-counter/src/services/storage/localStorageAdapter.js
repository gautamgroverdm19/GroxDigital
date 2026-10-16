// LocalStorage implementation of the storage adapter interface.
// Every adapter exposes the same async methods, so a cloud adapter
// (Firebase / Supabase) can replace this one without touching the UI.
//
//   get(key)        -> Promise<any | null>
//   set(key, value) -> Promise<void>
//   remove(key)     -> Promise<void>
//   keys()          -> Promise<string[]>
//
// Some hosts (sandboxed frames, private windows) block localStorage and even
// throw when you touch it. In that case we fall back to in-memory storage so
// the app still opens; progress then lasts only until the page is closed.

const PREFIX = 'mlc:';

function memoryStore() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
    allKeys: () => [...m.keys()],
  };
}

function pickStore() {
  try {
    const ls = window.localStorage;
    const probe = PREFIX + '__probe';
    ls.setItem(probe, '1');
    ls.removeItem(probe);
    return {
      getItem: (k) => ls.getItem(k),
      setItem: (k, v) => ls.setItem(k, v),
      removeItem: (k) => ls.removeItem(k),
      allKeys: () => Object.keys(ls),
      persistent: true,
    };
  } catch {
    return memoryStore();
  }
}

export function createLocalStorageAdapter() {
  const ls = typeof window !== 'undefined' ? pickStore() : memoryStore();
  return {
    name: ls.persistent ? 'localStorage' : 'memory',
    async get(key) {
      let raw = null;
      try {
        raw = ls.getItem(PREFIX + key);
      } catch {
        return null;
      }
      if (raw === null) return null;
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    },
    async set(key, value) {
      try {
        ls.setItem(PREFIX + key, JSON.stringify(value));
      } catch (err) {
        const quota = err && (err.name === 'QuotaExceededError' || err.code === 22);
        throw new Error(quota ? 'Browser storage is full. Export a backup and remove some data.' : String(err));
      }
    },
    async remove(key) {
      try {
        ls.removeItem(PREFIX + key);
      } catch {}
    },
    async keys() {
      try {
        return ls.allKeys().filter((k) => k.startsWith(PREFIX)).map((k) => k.slice(PREFIX.length));
      } catch {
        return [];
      }
    },
  };
}
