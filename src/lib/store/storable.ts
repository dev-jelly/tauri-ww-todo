import {get, writable} from 'svelte/store'

export function storable<T>(data) {
  const store = writable<T>(data);
  const { subscribe, set, update } = store;
  const isBrowser = typeof window !== 'undefined';

  isBrowser &&
  localStorage.storable &&
  set(JSON.parse(localStorage.storable));

  return {
    subscribe,
    set: n => {
      isBrowser && (localStorage.storable = JSON.stringify(n));
      set(n);
    },
    update: cb => {
      const updatedStore = cb(get(store));

      isBrowser && (localStorage.storable = JSON.stringify(updatedStore));
      set(updatedStore);
    }
  };
}