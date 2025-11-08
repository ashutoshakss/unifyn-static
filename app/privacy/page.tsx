import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Unifyn - India\'s unified finance superapp and broker agnostic trading platform. Learn how we protect your data and ensure privacy in our trading platform.',
  keywords: [
    'Unifyn privacy policy',
    'unified finance privacy',
    'broker agnostic platform privacy',
    'trading platform data protection',
    'financial data security',
  ],
  openGraph: {
    title: 'Privacy Policy | Unifyn - Unified Finance Superapp',
    description: 'Learn how Unifyn protects your privacy and secures your data in our broker agnostic trading platform.',
    url: 'https://unifyn.trade/privacy',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Unifyn',
    description: 'Learn how we protect your data in our unified finance platform.',
  },
  alternates: {
    canonical: 'https://unifyn.trade/privacy',
  },
};

export default function PrivacyPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const sourceParamRaw = Array.isArray(searchParams?.source) ? searchParams.source[0] : searchParams?.source;
  const hideChrome = typeof sourceParamRaw === 'string' && sourceParamRaw.toLowerCase() === 'mobile';
  return (
    <>
      {!hideChrome && <Header />}
      <main id="content" className="relative pt-28 pb-12" role="main">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 lg:p-12 prose prose-invert prose-slate max-w-none" role="article" aria-labelledby="privacy-heading">
            <h1 id="privacy-heading" className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
            <p className="text-sm text-slate-400 mb-8" role="contentinfo">Last updated: January 1, 2025</p>
            <div className="space-y-6 text-slate-300">
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Introduction</h2><p>Unifyn ("we", "our", "us") respects your privacy. This Privacy Policy explains how we collect, use, and protect your personal information.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Information We Collect</h2><ul className="list-disc pl-6 space-y-2"><li><strong>Account Information:</strong> Email, name (if provided).</li><li><strong>Broker Tokens:</strong> OAuth access tokens from your broker (encrypted at rest).</li><li><strong>Trading Data:</strong> Orders, positions, P&L fetched via broker API (stored securely).</li><li><strong>Usage Data:</strong> Pages visited, features used, anonymized analytics.</li></ul></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. How We Use Your Data</h2><ul className="list-disc pl-6 space-y-2"><li>To provide Unifyn's trading interface and analytics.</li><li>To communicate updates, support, and security notices.</li><li>To improve and optimize our services.</li><li>To comply with legal obligations.</li></ul></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Data Security</h2><p>We implement industry-standard security practices:</p><ul className="list-disc pl-6 space-y-2"><li>HTTPS encryption in transit.</li><li>Encryption at rest for sensitive data (broker tokens, trading records).</li><li>OAuth-based authentication (we never store broker passwords).</li><li>Regular security audits.</li></ul></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. Data Sharing</h2><p>We do <strong>not</strong> sell your data. We may share data only:</p><ul className="list-disc pl-6 space-y-2"><li>With your explicit consent.</li><li>With service providers (cloud hosting, analytics) under strict agreements.</li><li>When required by law or to protect our rights.</li></ul></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Your Rights</h2><p>You have the right to:</p><ul className="list-disc pl-6 space-y-2"><li>Access your personal data.</li><li>Request correction or deletion.</li><li>Withdraw consent or revoke broker permissions.</li><li>Export your data (CSV ledger, etc.).</li></ul><p>To exercise these rights, contact <a href="mailto:privacy@unifyn.trade" className="text-cyan-400 hover:text-cyan-300">privacy@unifyn.trade</a>.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Cookies & Analytics</h2><p>We use minimal cookies for session management. Analytics (GA4 or Plausible) are privacy-first and require consent. You can disable analytics at any time.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Children's Privacy</h2><p>Unifyn is not intended for users under 18. We do not knowingly collect data from minors.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. International Users</h2><p>Unifyn is designed for users in India. By using our service, you consent to data processing in India.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Changes to This Policy</h2><p>We may update this Privacy Policy. Continued use after updates constitutes acceptance.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">11. Contact</h2><p>For privacy questions, email <a href="mailto:privacy@unifyn.trade" className="text-cyan-400 hover:text-cyan-300">privacy@unifyn.trade</a></p></section>
            </div>
          </article>
        </div>
      </main>
      {!hideChrome && <Footer />}
    </>
  );
}


