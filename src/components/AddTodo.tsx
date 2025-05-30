'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

const todoSchema = z.object({
  text: z.string().min(1, 'Задача не может быть пустой'),
});

type TodoFormData = z.infer<typeof todoSchema>;

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = handleSubmit((data) => {
    onAdd(data.text);
    reset();
    toast.success('Задача добавлена');
  });

  return (
    <div className="mb-4">
      <form onSubmit={onSubmit} className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            {...register('text')}
            placeholder="Добавить новую задачу..."
            className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>
      {errors.text && (
        <p className="mt-1 text-sm text-red-500">{errors.text.message}</p>
      )}
    </div>
  );
} 