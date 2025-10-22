import Link from 'next/link';

export function Header() {
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
            <button data-theme-menu-toggle className="w-9 h-9 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
              <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
            </button>
            <div className="absolute right-0 mt-2 w-32 rounded-xl bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 shadow-xl hidden" data-theme-menu-panel>
              <button className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/10 rounded-t-xl transition-colors" data-theme-option="light">Light</button>
              <button className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/10 transition-colors" data-theme-option="dark">Dark</button>
              <button className="block w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-white/10 rounded-b-xl transition-colors" data-theme-option="system">System</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}


