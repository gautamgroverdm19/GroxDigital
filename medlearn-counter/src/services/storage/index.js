// Pick the active storage adapter here.
// To add cloud sync later, write e.g. firebaseAdapter.js / supabaseAdapter.js with the same
// get/set/remove/keys methods and return it below (for example when the user is signed in).
import { createLocalStorageAdapter } from './localStorageAdapter.js';

let adapter = createLocalStorageAdapter();

export function getStorage() {
  return adapter;
}

export function setStorage(next) {
  adapter = next;
}
