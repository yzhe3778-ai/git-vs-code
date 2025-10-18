import Dexie, { type EntityTable } from 'dexie';

export interface Todo {
  id?: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  priority?: 'low' | 'medium' | 'high';
}

const db = new Dexie('PixelTodoListDB') as Dexie & {
  todos: EntityTable<Todo, 'id'>;
};

// Schema 定义
db.version(1).stores({
  todos: '++id, text, completed, createdAt, priority',
});

export { db };
