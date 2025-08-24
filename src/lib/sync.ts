import { storable } from './store/storable';
import { api } from './api';

export type SyncAction =
  | { type: 'create'; title: string }
  | { type: 'update'; id: number; completed: boolean }
  | { type: 'delete'; id: number };

// Persisted queue so that actions survive app restarts
export const syncQueue = storable<SyncAction[]>('syncQueue', []);

export const isOnline = () => typeof navigator !== 'undefined' && navigator.onLine;

function enqueue(action: SyncAction) {
  syncQueue.update((q) => [...q, action]);
}

async function processQueue() {
  if (!isOnline()) return;
  const queue = [...syncQueue.get()];
  if (queue.length === 0) return;
  for (const action of queue) {
    try {
      switch (action.type) {
        case 'create':
          await api('/todos', {
            method: 'POST',
            body: JSON.stringify({ title: action.title }),
          });
          break;
        case 'update':
          await api(`/todos/${action.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ completed: action.completed }),
          });
          break;
        case 'delete':
          await api(`/todos/${action.id}`, { method: 'DELETE' });
          break;
      }
      // remove processed item
      syncQueue.update((q) => q.filter((i) => i !== action));
    } catch (e) {
      // Stop processing on first failure to retry later
      console.error('Sync action failed', e);
      break;
    }
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', processQueue);
  // Try processing once at startup
  processQueue();
}

export { enqueue, processQueue };
