'use client';

import React, { useState } from 'react';
import { Check, Trash2, Edit2, X, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
    onDelete(todo.id);
    toast.success('Задача удалена', {
      action: {
        label: 'Отменить',
        onClick: () => {
          // В реальном приложении здесь была бы логика отмены удаления
          toast.error('Функция отмены пока не реализована');
        },
      },
    });
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
      toast.success('Задача обновлена');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
    }
  };

  return (
    <div className="flex items-center gap-2 p-2 border rounded-lg group hover:bg-gray-50 dark:hover:bg-gray-800">
      <button
        onClick={() => onToggle(todo.id)}
        className={`p-1 rounded-full ${
          todo.completed
            ? 'bg-green-500 text-white'
            : 'border-2 border-gray-300 hover:border-green-500'
        }`}
      >
        <Check className="w-4 h-4" />
      </button>

      {isEditing ? (
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <button
            onClick={handleEdit}
            className="p-1 text-green-500 hover:text-green-600"
          >
            <Save className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditText(todo.text);
            }}
            className="p-1 text-gray-500 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <span
            className={`flex-1 ${
              todo.completed ? 'line-through text-gray-500' : ''
            }`}
          >
            {todo.text}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-blue-500 hover:text-blue-600"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-red-500 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
} 