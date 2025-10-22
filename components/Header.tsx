"use client";
import Link from 'next/link';
import { useTheme } from './ThemeProvider';

export function Header() {
  const { mode, setMode } = useTheme();
  return (
    <header className="fixed top-6 left-0 right-0 z-50" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg">
          <img src="/assets/img/logo-dark.svg" alt="Unifyn - Unified Finance Superapp Logo" className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 shadow-lg" role="navigation" aria-label="Primary">
          <Link href="/" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="Go to home page">Home</Link>
          <Link href="/#features" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="View platform features">Features</Link>
          <Link href="/#pricing" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="View pricing plans">Pricing</Link>
          <Link href="/#security" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="Learn about security">Security</Link>
          <Link href="/#contact" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="Contact us">Contact</Link>
        </div>
        <div className="flex items-center gap-3" role="navigation" aria-label="User actions">
          <button 
            data-open-modal="login" 
            className="text-sm text-slate-300 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded px-2 py-1"
            aria-label="Login to Unifyn"
          >
            Login
          </button>
          <button 
            data-open-modal="signup" 
            className="rounded-full px-5 py-2 text-sm font-semibold bg-cyan-700 text-white hover:bg-cyan-800 transition-colors shadow-lg shadow-cyan-700/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            aria-label="Sign up for Unifyn"
          >
            Signup
          </button>
          <div className="relative">
            <select
              aria-label="Select theme preference"
              className="bg-transparent text-slate-300 border border-slate-700/30 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 cursor-pointer"
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


