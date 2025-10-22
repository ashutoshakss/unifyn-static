import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function HomePage() {
  // FAQ Structured Data for AEO
  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a unified finance superapp?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A unified finance superapp like Unifyn brings together multiple financial services and brokers into one seamless platform. It allows you to connect different stock brokers (Angel One, Zerodha, Upstox, etc.) and manage all your trading, analytics, and portfolio from a single, unified interface.',
        },
      },
      {
        '@type': 'Question',
        name: 'What does broker agnostic trading mean?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Broker agnostic trading means you can use a single platform regardless of which stock broker you use. Unifyn is a broker agnostic trading app that connects to multiple brokers simultaneously, giving you freedom to choose any broker while enjoying a consistent trading experience.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does Unifyn enable unified finance?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unifyn enables unified finance by securely connecting to your existing broker accounts via OAuth authentication. You can then trade, view analytics, manage your portfolio, and access consolidated reports all from one unified interface, eliminating the need to switch between different broker apps.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which brokers does this broker agnostic platform support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unifyn supports major Indian brokers including Angel One, Zerodha, Upstox, ICICI Direct, HDFC Securities, 5Paisa, and Kotak Securities. As a broker agnostic trading app, we continue to add more brokers to provide comprehensive unified finance coverage.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is Unifyn a stock broker?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No, Unifyn is not a stock broker. We are a unified finance superapp and broker agnostic trading platform that connects to your existing broker accounts. All trades are executed through your registered broker\'s API under their terms and regulations.',
        },
      },
      {
        '@type': 'Question',
        name: 'How secure is the unified finance platform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unifyn uses industry-leading security practices including OAuth-based authentication (we never store broker passwords), end-to-end encryption, HTTPS for all communications, and scoped permissions. Your data is encrypted at rest and we follow strict privacy-first principles for our unified finance platform.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the benefits of using a broker agnostic trading app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Benefits include: unified view of all your portfolios across brokers, consolidated P&L and analytics, single interface for trading, better portfolio management, simplified tax reporting, and freedom to choose brokers based on features rather than being locked into one app.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does Unifyn unified finance superapp cost?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Unifyn offers transparent pricing with no hidden fees. Pricing details are being finalized and will be announced soon. As a broker agnostic platform, you will continue to pay your existing broker charges; Unifyn charges only for the unified interface and analytics features.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-cyan-500 text-white px-4 py-2 rounded-lg z-50">Skip to main content</a>
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
      <main id="content" className="relative" role="main">
        <section aria-labelledby="hero-heading" className="min-h-screen flex items-center justify-center pt-28 md:pt-20 pb-12">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 sm:px-4 py-1.5 text-xs sm:text-sm text-cyan-300 mb-6 sm:mb-8 backdrop-blur-sm" role="banner">
              <span aria-label="India's first unified finance superapp" className="leading-tight">India's first unified finance superapp - broker‑agnostic platform</span>
            </div>
            <h1 id="hero-heading" className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 sm:mb-6 leading-tight">
              Unified Finance Superapp<br/>
              <span className="text-cyan-400">Broker Agnostic Trading</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
              Experience <strong>unified finance</strong> with India's premier <strong>broker agnostic trading app</strong>. Connect Angel One, Zerodha, Upstox and more brokers in one seamless interface for trading, analytics and ledger management.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4" role="group" aria-label="Call to action buttons">
              <button 
                data-open-modal="connect-broker" 
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-cyan-700 text-white hover:bg-cyan-800 shadow-lg shadow-cyan-700/25 transition-all hover:shadow-cyan-700/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Connect your broker to unified finance platform"
              >
                Connect your broker
              </button>
              <button 
                data-open-modal="signup" 
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
                aria-label="Get early access to broker agnostic trading app"
              >
                Get early access
              </button>
            </div>
            <p className="mt-6 sm:mt-8 text-xs text-slate-400 max-w-2xl mx-auto px-4 leading-relaxed" role="note">
              <strong>Disclaimer:</strong> Unifyn is not a stock broker. Market investments are subject to risks. Logos shown are trademarks of their respective owners; Unifyn is not affiliated unless stated.
            </p>
            <div className="mt-12 sm:mt-16">
              <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 px-4">Built for India. Broker-agnostic unified finance.</p>
              <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-4" role="list" aria-label="Supported brokers for unified finance platform">
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-slate-400" role="listitem" aria-label="Angel One">AO</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-slate-400" role="listitem" aria-label="Zerodha">Z</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-slate-400" role="listitem" aria-label="Upstox">U</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-slate-400" role="listitem" aria-label="ICICI Direct">IC</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-slate-400" role="listitem" aria-label="HDFC Securities">HDFC</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-slate-400" role="listitem" aria-label="5Paisa">5P</div>
                <div className="rounded-lg border border-slate-700/50 bg-slate-800/30 backdrop-blur-sm px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-medium text-slate-400" role="listitem" aria-label="Kotak Securities">K</div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" aria-labelledby="features-heading" className="py-16 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16">
              <h2 id="features-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                Unified Finance Platform Features
              </h2>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">
                Experience <strong>broker agnostic trading</strong> with our <strong>unified finance superapp</strong>. Connect Zerodha, Angel One, and more in one app. Get unified trading analytics for India with fast, keyboard‑first execution.
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/50 transition-colors focus-within:border-cyan-500/50">
                <div className="text-3xl sm:text-4xl mb-3" role="img" aria-label="Unified Login Icon">🔗</div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Unified Login</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Connect multiple brokers through our <strong>broker agnostic platform</strong> and use a single, consistent interface for all your trading needs.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/50 transition-colors focus-within:border-cyan-500/50">
                <div className="text-3xl sm:text-4xl mb-3" role="img" aria-label="Smart Trading Icon">⚡</div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Smart Trading</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Lightning-fast, keyboard‑first order entry and quick actions for seamless <strong>unified finance</strong> trading experience.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/50 transition-colors focus-within:border-cyan-500/50">
                <div className="text-3xl sm:text-4xl mb-3" role="img" aria-label="Analytics Icon">📊</div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Deep Analytics</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Comprehensive P&L tracking, win/loss analysis, heatmaps, and segment insights across all connected brokers.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/50 transition-colors focus-within:border-cyan-500/50">
                <div className="text-3xl sm:text-4xl mb-3" role="img" aria-label="Ledger Icon">📑</div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Ledger & Taxes</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Broker‑synced ledger statements with CSV export for easy tax filing and portfolio management.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/50 transition-colors focus-within:border-cyan-500/50">
                <div className="text-3xl sm:text-4xl mb-3" role="img" aria-label="Alerts Icon">🔔</div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Real-time Alerts</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Customizable price and event alerts via email or push notifications to never miss trading opportunities.</p>
              </article>
              <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/50 transition-colors focus-within:border-cyan-500/50">
                <div className="text-3xl sm:text-4xl mb-3" role="img" aria-label="Customization Icon">🎛️</div>
                <h3 className="font-semibold text-white mb-2 text-base sm:text-lg">Full Customization</h3>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Personalize themes, layouts, and keyboard shortcuts to create your perfect <strong>unified finance</strong> workspace.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="pricing" aria-labelledby="pricing-heading" className="py-16 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center">
              <h2 id="pricing-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                Simple, Transparent Pricing
              </h2>
              <p className="text-base sm:text-lg text-slate-400 mb-8 sm:mb-12 px-2 leading-relaxed max-w-2xl mx-auto">
                Affordable <strong>unified finance superapp</strong> pricing. Transparent plans with no hidden fees for our <strong>broker agnostic trading platform</strong>.
              </p>
              <div className="inline-block rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 sm:p-8 mx-2" role="status">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Pricing details coming soon. Get notified when we launch our competitive pricing plans.</p>
              </div>
            </header>
          </div>
        </section>

        <section id="security" aria-labelledby="security-heading" className="py-16 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-10 sm:mb-12">
              <h2 id="security-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                Security & Compliance
              </h2>
              <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-2 leading-relaxed">
                Your security is our top priority. Our <strong>unified finance platform</strong> uses industry-leading security practices to keep your data safe.
              </p>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
              <article className="flex gap-3 sm:gap-4">
                <div className="text-cyan-400 text-xl sm:text-2xl shrink-0" aria-hidden="true">✓</div>
                <div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-base sm:text-lg">Zero Password Storage</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">You log in directly at your broker via secure OAuth authentication. We never store your broker passwords.</p>
                </div>
              </article>
              <article className="flex gap-3 sm:gap-4">
                <div className="text-cyan-400 text-xl sm:text-2xl shrink-0" aria-hidden="true">✓</div>
                <div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-base sm:text-lg">Scoped Permissions</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Only read/write trading access that you explicitly approve through our <strong>broker agnostic platform</strong>.</p>
                </div>
              </article>
              <article className="flex gap-3 sm:gap-4">
                <div className="text-cyan-400 text-xl sm:text-2xl shrink-0" aria-hidden="true">✓</div>
                <div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-base sm:text-lg">End-to-End Encryption</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">HTTPS encryption in transit and AES-256 encryption at rest for all stored data and artifacts.</p>
                </div>
              </article>
              <article className="flex gap-3 sm:gap-4">
                <div className="text-cyan-400 text-xl sm:text-2xl shrink-0" aria-hidden="true">✓</div>
                <div>
                  <h3 className="font-semibold text-white mb-1 sm:mb-2 text-base sm:text-lg">Privacy-First Analytics</h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">Analytics only with your explicit consent. No invasive tracking or data selling in our <strong>unified finance superapp</strong>.</p>
                </div>
              </article>
            </div>
            <p className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-slate-400 px-4 leading-relaxed" role="note">
              <strong>Disclaimer:</strong> Unifyn is not a stock broker and does not provide investment advice. Market investments are subject to risks.
            </p>
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="py-16 sm:py-20 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="text-center mb-12 sm:mb-16">
              <h2 id="faq-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-slate-400 px-2 leading-relaxed">
                Everything you need to know about our <strong>unified finance superapp</strong> and <strong>broker agnostic trading platform</strong>.
              </p>
            </header>
            <div className="space-y-4 sm:space-y-6">
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>What is a unified finance superapp?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  A <strong>unified finance superapp</strong> like Unifyn brings together multiple financial services and brokers into one seamless platform. It allows you to connect different stock brokers (Angel One, Zerodha, Upstox, etc.) and manage all your trading, analytics, and portfolio from a single, unified interface.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>What does broker agnostic trading mean?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  <strong>Broker agnostic trading</strong> means you can use a single platform regardless of which stock broker you use. Unifyn is a <strong>broker agnostic trading app</strong> that connects to multiple brokers simultaneously, giving you freedom to choose any broker while enjoying a consistent trading experience.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>How does Unifyn enable unified finance?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Unifyn enables <strong>unified finance</strong> by securely connecting to your existing broker accounts via OAuth authentication. You can then trade, view analytics, manage your portfolio, and access consolidated reports all from one unified interface, eliminating the need to switch between different broker apps.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>Which brokers does this broker agnostic platform support?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Unifyn supports major Indian brokers including Angel One, Zerodha, Upstox, ICICI Direct, HDFC Securities, 5Paisa, and Kotak Securities. As a <strong>broker agnostic trading app</strong>, we continue to add more brokers to provide comprehensive <strong>unified finance</strong> coverage.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>Is Unifyn a stock broker?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  No, Unifyn is not a stock broker. We are a <strong>unified finance superapp</strong> and <strong>broker agnostic trading platform</strong> that connects to your existing broker accounts. All trades are executed through your registered broker's API under their terms and regulations.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>How secure is the unified finance platform?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Unifyn uses industry-leading security practices including OAuth-based authentication (we never store broker passwords), end-to-end encryption, HTTPS for all communications, and scoped permissions. Your data is encrypted at rest and we follow strict privacy-first principles for our <strong>unified finance platform</strong>.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>What are the benefits of using a broker agnostic trading app?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Benefits include: unified view of all your portfolios across brokers, consolidated P&L and analytics, single interface for trading, better portfolio management, simplified tax reporting, and freedom to choose brokers based on features rather than being locked into one app.
                </p>
              </details>
              <details className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-6 hover:border-cyan-500/30 transition-colors group">
                <summary className="font-semibold text-white text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>How much does Unifyn unified finance superapp cost?</span>
                  <span className="text-cyan-400 text-2xl group-open:rotate-180 transition-transform shrink-0" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Unifyn offers transparent pricing with no hidden fees. Pricing details are being finalized and will be announced soon. As a <strong>broker agnostic platform</strong>, you will continue to pay your existing broker charges; Unifyn charges only for the unified interface and analytics features.
                </p>
              </details>
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="py-16 sm:py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
              <header className="text-center mb-8 sm:mb-12">
                <h2 id="contact-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">Contact Us</h2>
                <p className="text-base sm:text-lg text-slate-400 px-2 leading-relaxed">Support, partnerships, media — we're here to help with our <strong>unified finance platform</strong>.</p>
              </header>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 sm:p-8">
                <form className="space-y-4 sm:space-y-5" aria-label="Contact form">
                  <div>
                    <label htmlFor="name" className="block text-sm sm:text-base font-medium text-slate-300 mb-2">
                      Name <span className="text-red-400" aria-label="required">*</span>
                    </label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text"
                      required
                      aria-required="true"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" 
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm sm:text-base font-medium text-slate-300 mb-2">
                      Email <span className="text-red-400" aria-label="required">*</span>
                    </label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email"
                      required
                      aria-required="true"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all" 
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm sm:text-base font-medium text-slate-300 mb-2">
                      Message <span className="text-red-400" aria-label="required">*</span>
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      rows={5} 
                      required
                      aria-required="true"
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none" 
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full rounded-full px-6 py-3 sm:py-3.5 text-sm sm:text-base font-semibold bg-cyan-700 text-white hover:bg-cyan-800 transition-colors shadow-lg shadow-cyan-700/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    aria-label="Send message to Unifyn"
                  >
                    Send message
                  </button>
                </form>
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-800">
                  <p className="text-sm sm:text-base text-slate-300">
                    Prefer email? <a href="mailto:support@unifyn.trade" className="text-cyan-400 hover:text-cyan-300 transition-colors underline break-all">support@unifyn.trade</a>
                  </p>
                  <address className="mt-2 not-italic text-sm sm:text-base text-slate-400">
                    Bengaluru, Karnataka, India
                  </address>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}


