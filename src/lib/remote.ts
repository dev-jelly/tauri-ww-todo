import { api } from './api';
import { enqueue, isOnline } from './sync';

export type RemoteTodo = {
  id: number;
  title: string;
  completed: boolean;
};

export async function fetchTodos() {
  if (!isOnline()) return [];
  return api<RemoteTodo[]>('/todos');
}

export async function createTodo(title: string) {
  if (!isOnline()) {
    const tempId = Date.now();
    enqueue({ type: 'create', title });
    return { id: tempId, title, completed: false } as RemoteTodo;
  }
  return api<RemoteTodo>('/todos', {
    method: 'POST',
    body: JSON.stringify({ title })
  });
}

export async function updateTodo(id: number, completed: boolean) {
  if (!isOnline()) {
    enqueue({ type: 'update', id, completed });
    return { id, title: '', completed } as RemoteTodo;
  }
  return api<RemoteTodo>(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ completed })
  });
}

export async function deleteTodo(id: number) {
  if (!isOnline()) {
    enqueue({ type: 'delete', id });
    return;
  }
  return api<void>(`/todos/${id}`, { method: 'DELETE' });
}
