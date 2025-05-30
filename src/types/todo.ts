export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type TodoFilter = 'all' | 'active' | 'completed';
  
  export interface TodoStore {
    todos: Todo[];
    filter: TodoFilter;
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (id: string, text: string) => void;
    setFilter: (filter: TodoFilter) => void;
  } 