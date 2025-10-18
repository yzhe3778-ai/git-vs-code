import React, { useState } from 'react';
import type { Todo } from '../utils/db';
import { PixelButton } from './PixelButton';
import styles from './AddTodo.module.css';

interface AddTodoProps {
  onAdd: (text: string, priority: Todo['priority']) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Todo['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText('');
      setPriority('medium');
    }
  };

  return (
    <div className={styles['add-todo']}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="新的任务..."
          className={styles.input}
          maxLength={200}
        />
        <PixelButton type="submit" disabled={!text.trim()}>
          添加
        </PixelButton>
      </form>

      <div className={styles['priority-selector']}>
        {(['low', 'medium', 'high'] as const).map((p) => (
          <button
            key={p}
            type="button"
            className={`${styles['priority-option']} ${priority === p ? styles.active : ''}`}
            onClick={() => setPriority(p)}
          >
            {p === 'low' && '低'}
            {p === 'medium' && '中'}
            {p === 'high' && '高'}
          </button>
        ))}
      </div>
    </div>
  );
};
