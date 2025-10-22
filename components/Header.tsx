"use client";
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export function Header() {
  const { mode, setMode } = useTheme();
  return (
    <header className="fixed top-6 left-0 right-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <img src="/assets/img/logo-dark.svg" alt="Unifyn" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 shadow-lg">
          <Link href="/" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">Home</Link>
          <Link href="/#features" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">Features</Link>
          <Link href="/#pricing" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">Pricing</Link>
          <Link href="/#security" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">Security</Link>
          <Link href="/#contact" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all">Contact</Link>
        </div>
        <div className="flex items-center gap-3">
          <button data-open-modal="login" className="text-sm text-slate-300 hover:text-white transition-colors">Login</button>
          <button data-open-modal="signup" className="rounded-full px-5 py-2 text-sm font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20">Signup</button>
          <div className="relative">
            <select
              aria-label="Theme"
              className="bg-transparent text-slate-300 border border-slate-700/30 rounded-full px-3 py-1.5 text-sm"
              value={mode}
              onChange={(e) => setMode(e.target.value as any)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </div>
      </nav>
    </header>
  );
}


