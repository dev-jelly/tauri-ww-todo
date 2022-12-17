import {get, writable} from 'svelte/store'

export function storable<T>(key: string, data: T) {
  const store = writable<T>(data);
  const { subscribe, set } = store;
  const isBrowser = typeof window !== 'undefined';

  isBrowser &&
  localStorage[key] &&
  set(JSON.parse(localStorage[key]));


  return {
    get: () => get(store),
    subscribe,
    set: n => {
      isBrowser && (localStorage[key] = JSON.stringify(n));
      set(n);
    },
    update: cb => {
      const updatedStore = cb(get(store));
      isBrowser && (localStorage[key] = JSON.stringify(updatedStore));
      set(updatedStore);
    }
  };
}