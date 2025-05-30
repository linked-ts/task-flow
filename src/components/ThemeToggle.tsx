'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/theme-context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Переключить тему"
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          ${theme === 'dark' ? 'opacity-0 scale-75 rotate-45' : 'opacity-100 scale-100 rotate-0'}`}
      />
      <Moon
        className={`h-5 w-5 transition-all duration-300 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
          ${theme === 'dark' ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45'}`}
      />
    </button>
  );
}