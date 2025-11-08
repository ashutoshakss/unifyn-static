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
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [isDark, setIsDark] = useState<boolean>(true);

  // Initialize from storage
  useEffect(() => {
    try {
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
      const themeParamRaw = params?.get('theme')?.toLowerCase();
      if (themeParamRaw === 'light' || themeParamRaw === 'dark' || themeParamRaw === 'system') {
        setMode(themeParamRaw as ThemeMode);
        try { localStorage.setItem(STORAGE_KEY, themeParamRaw); } catch {}
        return;
      }
      const saved = (localStorage.getItem(STORAGE_KEY) as ThemeMode) || 'dark';
      setMode(saved as ThemeMode);
    } catch {
      setMode('dark');
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


