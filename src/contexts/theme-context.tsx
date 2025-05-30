'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';

type Theme = 'light' | 'dark';

type ThemeAction = { type: 'TOGGLE' } | { type: 'SET'; payload: Theme };

interface ThemeState {
  theme: Theme;
}

interface ThemeContextType extends ThemeState {
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function themeReducer(state: ThemeState, action: ThemeAction): ThemeState {
  switch (action.type) {
    case 'TOGGLE':
      return { theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET':
      return { theme: action.payload };
    default:
      return state;
  }
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, { theme: 'light' });

  // Инициализация и side-effect для Tailwind
  useEffect(() => {
    const root = window.document.documentElement;
    const saved = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved || (prefersDark ? 'dark' : 'light');
    dispatch({ type: 'SET', payload: initial });
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (state.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  const toggleTheme = () => dispatch({ type: 'TOGGLE' });

  return (
    <ThemeContext.Provider value={{ theme: state.theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeContextProvider');
  return ctx;
}