"use client";
import Link from 'next/link';
import { useTheme } from './ThemeProvider';
import { useState, useEffect } from 'react';

export function Header() {
  const { mode, setMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menu on escape key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };

    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 md:bg-transparent bg-slate-950/80 md:backdrop-blur-none backdrop-blur-lg md:border-b-0 border-b border-slate-800/50" role="banner">
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 md:py-6 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo - LEFT SIDE */}
        <Link href="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950 rounded-lg shrink-0">
          <img src="/assets/img/logo-dark.svg" alt="Unifyn - Unified Finance Superapp Logo" className="h-6 sm:h-8 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 rounded-full px-2 py-1.5 bg-slate-900/40 backdrop-blur-xl border border-slate-700/30 shadow-lg" role="navigation" aria-label="Primary">
          <Link href="/" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="Go to home page">Home</Link>
          <Link href="/#features" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="View platform features">Features</Link>
          <Link href="/#pricing" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="View pricing plans">Pricing</Link>
          <Link href="/#security" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="Learn about security">Security</Link>
          <Link href="/#contact" className="px-4 py-1.5 rounded-full text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white/10" aria-label="Contact us">Contact</Link>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3" role="navigation" aria-label="User actions">
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

        {/* Mobile Menu Button - RIGHT SIDE */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg -mr-2"
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu - RIGHT SIDE Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="md:hidden fixed inset-0 bg-black/70 z-[60]"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Sidebar - RIGHT SIDE */}
          <div className="md:hidden fixed top-0 right-0 h-screen w-80 bg-slate-900 border-l border-slate-700 shadow-2xl z-[70] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700 shrink-0">
              <span className="text-lg font-semibold text-white">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links - Scrollable */}
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <Link 
                href="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:bg-slate-800 transition-all mb-2"
              >
                Home
              </Link>
              <Link 
                href="/#features" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:bg-slate-800 transition-all mb-2"
              >
                Features
              </Link>
              <Link 
                href="/#pricing" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:bg-slate-800 transition-all mb-2"
              >
                Pricing
              </Link>
              <Link 
                href="/#security" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:bg-slate-800 transition-all mb-2"
              >
                Security
              </Link>
              <Link 
                href="/#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-lg text-lg font-medium text-white hover:bg-slate-800 transition-all"
              >
                Contact
              </Link>
            </nav>

            {/* Bottom Actions - Fixed */}
            <div className="p-4 border-t border-slate-700 shrink-0 space-y-3">
              <div className="flex gap-2">
                <button 
                  data-open-modal="login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg text-base font-medium text-white hover:bg-slate-800 transition-all text-center border border-slate-700"
                >
                  Login
                </button>
                <button 
                  data-open-modal="signup" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 rounded-lg px-4 py-2.5 text-base font-semibold bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
                >
                  Signup
                </button>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">Theme</label>
                <select
                  className="w-full bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                  value={mode}
                  onChange={(e) => setMode(e.target.value as any)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}


