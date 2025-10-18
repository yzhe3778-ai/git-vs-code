import { useEffect, useState, useMemo } from 'react';
import { useTodoStore } from './stores/todoStore';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';
import { PixelButton } from './components/PixelButton';
import styles from './App.module.css';

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const { todos, isLoading, fetchTodos, addTodo, toggleTodo, deleteTodo, clearCompleted } = useTodoStore();
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const stats = useMemo(() => ({
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }), [todos]);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>🎮 Pixel Todo</h1>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles['stat-value']}>{stats.total}</span>
              <span>总计</span>
            </div>
            <div className={styles.stat}>
              <span className={styles['stat-value']}>{stats.active}</span>
              <span>进行中</span>
            </div>
            <div className={styles.stat}>
              <span className={styles['stat-value']}>{stats.completed}</span>
              <span>已完成</span>
            </div>
          </div>
        </header>

        <AddTodo onAdd={addTodo} />

        <div className={styles['filter-bar']}>
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              className={`${styles['filter-button']} ${filter === f ? styles.active : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' && '全部'}
              {f === 'active' && '进行中'}
              {f === 'completed' && '已完成'}
            </button>
          ))}
        </div>

        <div className={styles['todo-list']}>
          {isLoading ? (
            <div className={styles.loading}>加载中...</div>
          ) : filteredTodos.length === 0 ? (
            <div className={styles['empty-state']}>
              {filter === 'all' && '暂无任务，添加一个吧！'}
              {filter === 'active' && '没有进行中的任务'}
              {filter === 'completed' && '没有已完成的任务'}
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {stats.completed > 0 && (
          <div className={styles.footer}>
            <PixelButton variant="danger" onClick={clearCompleted}>
              清除已完成 ({stats.completed})
            </PixelButton>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
