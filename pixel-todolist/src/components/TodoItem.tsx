import React from 'react';
import type { Todo } from '../utils/db';
import { PixelButton } from './PixelButton';
import styles from './TodoItem.module.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`${styles['todo-item']} ${todo.completed ? styles.completed : ''}`}>
      <div
        className={`${styles.checkbox} ${todo.completed ? styles.checked : ''}`}
        onClick={() => todo.id && onToggle(todo.id)}
        role="checkbox"
        aria-checked={todo.completed}
        tabIndex={0}
      />

      <span className={`${styles.text} ${todo.completed ? styles.completed : ''}`}>
        {todo.text}
      </span>

      {todo.priority && (
        <span className={`${styles.priority} ${styles[todo.priority]}`}>
          {todo.priority}
        </span>
      )}

      <div className={styles.actions}>
        <PixelButton
          size="small"
          variant="danger"
          onClick={() => todo.id && onDelete(todo.id)}
          aria-label="删除待办"
        >
          ✕
        </PixelButton>
      </div>
    </div>
  );
};
