"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ThemeMode = 'system' | 'light' | 'dark';

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
};

const STORAGE_KEY = 'theme';
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemPrefersDark() {
  return typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initialize from storage
  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'system';
      setMode(saved);
    } catch {
      setMode('system');
    }
  }, []);

  // Apply theme to <html> and persist
  useEffect(() => {
    const dark = mode === 'dark' ? true : mode === 'light' ? false : getSystemPrefersDark();
    setIsDark(dark);
    const root = document.documentElement;
    root.classList.toggle('dark', dark);
    try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
  }, [mode]);

  // React to system changes when mode is system
  useEffect(() => {
    if (mode !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setIsDark(mql.matches);
    if (mql.addEventListener) mql.addEventListener('change', handler);
    else (mql as any).addListener?.(handler);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', handler);
      else (mql as any).removeListener?.(handler);
    };
  }, [mode]);

  const setModeSafe = useCallback((m: ThemeMode) => setMode(m), []);

  const value = useMemo(() => ({ mode, setMode: setModeSafe, isDark }), [mode, setModeSafe, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}


