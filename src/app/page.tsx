'use client';

import React from 'react';
import { Toaster } from 'sonner';
import { AddTodo } from '@/components/AddTodo';
import { TodoList } from '@/components/TodoList';
import { TodoFilter } from '@/components/TodoFilter';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTodoStore } from '@/store/useTodoStore';

export default function Home() {
  const todos = useTodoStore((state) => state.todos);
  const filter = useTodoStore((state) => state.filter);
  const addTodo = useTodoStore((state) => state.addTodo);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const editTodo = useTodoStore((state) => state.editTodo);
  const setFilter = useTodoStore((state) => state.setFilter);

  const filteredTodos = React.useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container max-w-2xl mx-auto p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Список задач
          </h1>
          <ThemeToggle />
        </div>

        <AddTodo onAdd={addTodo} />
        <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </div>
      <Toaster position="bottom-right" />
    </main>
  );
} 