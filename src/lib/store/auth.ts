import { writable } from 'svelte/store';

function createAuth() {
  const stored = localStorage.getItem('jwt');
  const { subscribe, set } = writable<string | null>(stored);

  return {
    subscribe,
    login: (token: string) => {
      localStorage.setItem('jwt', token);
      set(token);
    },
    logout: () => {
      localStorage.removeItem('jwt');
      set(null);
    }
  };
}

export const auth = createAuth();
