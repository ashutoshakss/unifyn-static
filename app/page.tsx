import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-500 text-white px-4 py-2 rounded-lg z-50">Skip to content</a>
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl"></div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/40 via-white/10 to-transparent"></div>
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-white/30 rounded-full"></div>
        <div className="absolute top-40 right-1/3 w-1 h-1 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-cyan-400/30 rounded-full"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-white/20 rounded-full"></div>
      </div>
      <Header />
      <main id="content" className="relative">
        <section className="min-h-screen flex items-center justify-center pt-20">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300 mb-8 backdrop-blur-sm">India's first unified, broker‑agnostic hub</div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">Trade smarter<br/>across brokers</h1>
            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">Connect Angel One, Zerodha, Upstox and more. One interface for trading, analytics and ledger.</p>
            <div className="flex items-center justify-center gap-4">
              <button data-open-modal="connect-broker" className="inline-flex items-center rounded-full px-8 py-3.5 text-base font-semibold bg-cyan-500 text-white hover:bg-cyan-600 shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-500/40">Connect your broker</button>
              <button data-open-modal="signup" className="inline-flex items-center rounded-full px-8 py-3.5 text-base font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all">Get early access</button>
            </div>
            <p className="mt-8 text-xs text-slate-400 max-w-2xl mx-auto">Unifyn is not a stock broker. Market investments are subject to risks. Logos shown are trademarks of their respective owners; Unifyn is not affiliated unless stated.</p>
            <div className="mt-16">
              <p className="text-sm text-slate-400 mb-4">Built for India. Broker-agnostic.</p>
              <div className="flex items-center justify-center gap-3 flex-wrap">
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-400">AO</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-400">Z</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-400">U</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-400">IC</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-400">HDFC</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-400">5P</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-3 py-1.5 text-xs font-medium text-slate-400">K</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything in one interface</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Connect Zerodha and Angel One in one app. Unified trading analytics for India with fast, keyboard‑first execution.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-colors"><div className="text-3xl mb-3">🔗</div><h3 className="font-semibold text-white mb-2">Unified Login</h3><p className="text-sm text-slate-400">Connect multiple brokers and use a single, consistent interface.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-colors"><div className="text-3xl mb-3">⚡</div><h3 className="font-semibold text-white mb-2">Smart Trading</h3><p className="text-sm text-slate-400">Fast, keyboard‑first order entry and quick actions.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-colors"><div className="text-3xl mb-3">📊</div><h3 className="font-semibold text-white mb-2">Deep Analytics</h3><p className="text-sm text-slate-400">P&L, win/loss, heatmaps, and segment insights.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-colors"><div className="text-3xl mb-3">📑</div><h3 className="font-semibold text-white mb-2">Ledger & Taxes</h3><p className="text-sm text-slate-400">Broker‑synced statements with CSV export.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-colors"><div className="text-3xl mb-3">🔔</div><h3 className="font-semibold text-white mb-2">Alerts</h3><p className="text-sm text-slate-400">Price and event alerts via email or push.</p></div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 hover:border-cyan-500/50 transition-colors"><div className="text-3xl mb-3">🎛️</div><h3 className="font-semibold text-white mb-2">Customization</h3><p className="text-sm text-slate-400">Themes, layouts, and keyboard shortcuts that fit your flow.</p></div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple pricing</h2>
              <p className="text-lg text-slate-400 mb-12">Transparent plans. No hidden fees.</p>
              <div className="inline-block rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8">
                <p className="text-slate-400">Pricing details coming soon.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="security" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Security & Compliance</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Your security is our priority. We use industry-standard practices to keep your data safe.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <div className="flex gap-3"><div className="text-cyan-500 text-xl">✓</div><div><h3 className="font-semibold text-white mb-1">Zero password storage</h3><p className="text-sm text-slate-400">You log in at your broker via OAuth.</p></div></div>
              <div className="flex gap-3"><div className="text-cyan-500 text-xl">✓</div><div><h3 className="font-semibold text-white mb-1">Scoped permissions</h3><p className="text-sm text-slate-400">Read/write trading access you approve.</p></div></div>
              <div className="flex gap-3"><div className="text-cyan-500 text-xl">✓</div><div><h3 className="font-semibold text-white mb-1">End-to-end encryption</h3><p className="text-sm text-slate-400">HTTPS in transit and at rest for stored artifacts.</p></div></div>
              <div className="flex gap-3"><div className="text-cyan-500 text-xl">✓</div><div><h3 className="font-semibold text-white mb-1">Privacy-first analytics</h3><p className="text-sm text-slate-400">With consent; no invasive tracking.</p></div></div>
            </div>
            <p className="mt-8 text-center text-xs text-slate-400">Unifyn is not a stock broker and does not provide investment advice. Market investments are subject to risks.</p>
          </div>
        </section>

        <section id="contact" className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Contact Us</h2>
                <p className="text-lg text-slate-400">Support, partnerships, media — we're here to help.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8">
                <form className="space-y-5">
                  <div><label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Name</label><input id="name" name="name" className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" /></div>
                  <div><label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label><input id="email" name="email" className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" /></div>
                  <div><label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label><textarea id="message" name="message" rows={5} className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none" /></div>
                  <button className="w-full rounded-full px-6 py-3 text-sm font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors shadow-lg shadow-cyan-500/20">Send message</button>
                </form>
                <div className="mt-8 pt-8 border-t border-slate-800"><p className="text-sm text-slate-400">Prefer email? <a href="mailto:support@unifyn.trade" className="text-cyan-400 hover:text-cyan-300 transition-colors">support@unifyn.trade</a></p><address className="mt-2 not-italic text-sm text-slate-500">Bengaluru, India</address></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


