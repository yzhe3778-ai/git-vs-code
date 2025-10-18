import { create } from 'zustand';
import { db, type Todo } from '../utils/db';
import { pixelSound } from '../utils/sound';

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchTodos: () => Promise<void>;
  addTodo: (text: string, priority?: Todo['priority']) => Promise<void>;
  toggleTodo: (id: number) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  updateTodo: (id: number, updates: Partial<Todo>) => Promise<void>;
  clearCompleted: () => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: false,
  error: null,

  fetchTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const todos = await db.todos.orderBy('createdAt').reverse().toArray();
      set({ todos, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addTodo: async (text: string, priority: Todo['priority'] = 'medium') => {
    try {
      const now = new Date();
      await db.todos.add({
        text,
        completed: false,
        createdAt: now,
        updatedAt: now,
        priority,
      });
      pixelSound.add();
      await get().fetchTodos();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  toggleTodo: async (id: number) => {
    try {
      const todo = await db.todos.get(id);
      if (todo) {
        await db.todos.update(id, {
          completed: !todo.completed,
          updatedAt: new Date(),
        });
        pixelSound.complete();
        await get().fetchTodos();
      }
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteTodo: async (id: number) => {
    try {
      await db.todos.delete(id);
      pixelSound.delete();
      await get().fetchTodos();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateTodo: async (id: number, updates: Partial<Todo>) => {
    try {
      await db.todos.update(id, {
        ...updates,
        updatedAt: new Date(),
      });
      await get().fetchTodos();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  clearCompleted: async () => {
    try {
      await db.todos.where('completed').equals(1).delete();
      await get().fetchTodos();
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
