"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type ModalName = 'login' | 'signup' | null;

type ModalContextValue = {
  open: (name: Exclude<ModalName, null>) => void;
  close: () => void;
};

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
}

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState<ModalName>(null);

  const open = useCallback((name: Exclude<ModalName, null>) => setOpenName(name), []);
  const close = useCallback(() => setOpenName(null), []);

  useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', !!openName);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [openName, close]);

  // Also support data-open-modal / data-close-modal for convenience
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const openEl = target.closest('[data-open-modal]') as HTMLElement | null;
      const closeEl = target.closest('[data-close-modal]') as HTMLElement | null;
      if (openEl && openEl.getAttribute('data-open-modal')) {
        e.preventDefault();
        const name = openEl.getAttribute('data-open-modal') as 'login' | 'signup' | null;
        if (name) open(name);
        return;
      }
      if (closeEl) {
        e.preventDefault();
        close();
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [open, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {/* Login Modal */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${openName === 'login' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={openName !== 'login'}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" data-close-modal></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
          <div className={`relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl shadow-2xl shadow-cyan-500/10 w-full max-w-lg border border-slate-700/50 backdrop-blur-xl transform transition-all duration-300 ${openName === 'login' ? 'scale-100' : 'scale-95'}`}>
            <button data-close-modal className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all flex items-center justify-center group" aria-label="Close">
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="relative px-8 py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Connect your broker</h2>
                <p className="text-sm text-slate-400">Choose your broker to continue with secure OAuth authentication. We never see your password.</p>
              </div>
              <div className="space-y-3">
                {['Angel One','Zerodha','Upstox','ICICI Direct','HDFC Securities'].map((label, i) => (
                  <a key={label} href="#" className="group flex items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 hover:bg-slate-700/50 hover:border-cyan-500/50 px-5 py-4 transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center">
                        <span className="text-xs font-semibold text-slate-300">{['AO','Z','U','IC','HD'][i]}</span>
                      </div>
                      <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{label}</span>
                    </div>
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5"><svg className="w-5 h-5 text-cyan-500/60" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg></div>
                  <p className="text-xs text-slate-400 leading-relaxed">Your credentials are handled directly by your broker. Unifyn never has access to your password. Read our <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${openName === 'signup' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={openName !== 'signup'}
      >
        <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" data-close-modal></div>
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
          <div className={`relative bg-gradient-to-br from-slate-900/95 to-slate-800/95 rounded-3xl shadow-2xl shadow-cyan-500/10 w-full max-w-lg border border-slate-700/50 backdrop-blur-xl transform transition-all duration-300 ${openName === 'signup' ? 'scale-100' : 'scale-95'}`}>
            <button data-close-modal className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white transition-all flex items-center justify-center group" aria-label="Close">
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div className="relative px-8 py-8">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 mb-4">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Get early access</h2>
                <p className="text-sm text-slate-400">Be among the first to experience India's unified trading hub. No spam, unsubscribe anytime.</p>
              </div>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); close(); }}>
                <div>
                  <label htmlFor="signup-name" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Name (Optional)</label>
                  <input id="signup-name" name="name" type="text" placeholder="Enter your name" className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all" />
                </div>
                <div>
                  <label htmlFor="signup-email" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Email Address *</label>
                  <input id="signup-email" name="email" type="email" required placeholder="you@example.com" className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all" />
                </div>
                <div>
                  <label htmlFor="signup-usecase" className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">Primary Use Case (Optional)</label>
                  <select id="signup-usecase" name="usecase" className="w-full rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all">
                    <option value="">Select use case</option>
                    <option value="intraday">Intraday trading</option>
                    <option value="swing">Swing trading</option>
                    <option value="options">Options trading</option>
                    <option value="investing">Long-term investing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500/50 bg-slate-800" />
                    <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">I agree to receive product updates and newsletters from Unifyn. No spam, unsubscribe anytime.</span>
                  </label>
                </div>
                <button type="submit" className="w-full rounded-xl px-6 py-3.5 text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 duration-200">Request early access</button>
                <div className="text-sm text-center" role="status" aria-live="polite"></div>
              </form>
              <div className="mt-6 pt-6 border-t border-slate-700/50 text-center">
                <p className="text-xs text-slate-400">By signing up, you agree to our <a href="/terms" className="text-cyan-400 hover:text-cyan-300 transition-colors">Terms</a> and <a href="/privacy" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalContext.Provider>
  );
}


