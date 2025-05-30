import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Todo, TodoFilter, TodoStore } from '@/types/todo';

export const useTodoStore = create<TodoStore>()(
  persist(
    (set) => ({
      todos: [],
      filter: 'all',
      addTodo: (text: string) => {
        const newTodo: Todo = {
          id: crypto.randomUUID(),
          text,
          completed: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        set((state) => ({
          todos: [...state.todos, newTodo],
        }));
      },
      toggleTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
              : todo
          ),
        })),
      deleteTodo: (id: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== id),
        })),
      editTodo: (id: string, text: string) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo.id === id
              ? { ...todo, text, updatedAt: new Date() }
              : todo
          ),
        })),
      setFilter: (filter: TodoFilter) => set({ filter }),
    }),
    {
      name: 'todo-storage',
    }
  )
); 