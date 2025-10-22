import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="content" className="relative pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-8 lg:p-12 prose prose-invert prose-slate max-w-none">
            <h1 className="text-4xl font-bold text-white mb-2">Terms & Conditions</h1>
            <p className="text-sm text-slate-400 mb-8">Last updated: January 1, 2025</p>
            <div className="space-y-6 text-slate-300">
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2><p>By using Unifyn, you agree to these Terms & Conditions. If you do not agree, do not use our services.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">2. Service Description</h2><p>Unifyn provides a unified interface for connecting to multiple stock brokers in India. We are not a stock broker. All trades are executed via your registered broker's API under their terms.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">3. User Obligations</h2><ul className="list-disc pl-6 space-y-2"><li>You must be 18 years or older.</li><li>You are responsible for maintaining the confidentiality of your account.</li><li>You agree to provide accurate information.</li><li>You will not misuse or abuse the service.</li></ul></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">4. Broker Authentication</h2><p>When connecting a broker, you will be redirected to your broker's OAuth login. Unifyn never stores your broker password. You grant Unifyn read/write trading permissions as approved by you during OAuth consent.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">5. No Investment Advice</h2><p>Unifyn does not provide investment advice. All analytics, reports, and features are informational. You are solely responsible for your trading decisions.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">6. Market Risks</h2><p>Market investments are subject to risks. Past performance is not indicative of future results. You may lose your entire investment.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">7. Limitation of Liability</h2><p>Unifyn is provided "as is" without warranties. We are not liable for losses arising from use of our service, downtime, or data loss.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">8. Termination</h2><p>We reserve the right to suspend or terminate your account at our discretion, including for violation of these Terms.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">9. Changes to Terms</h2><p>We may update these Terms from time to time. Continued use after changes constitutes acceptance.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">10. Governing Law</h2><p>These Terms are governed by the laws of India. Any disputes will be subject to the exclusive jurisdiction of courts in Bengaluru, Karnataka.</p></section>
              <section><h2 className="text-2xl font-semibold text-white mt-8 mb-4">11. Contact</h2><p>For questions about these Terms, contact us at <a href="mailto:legal@unifyn.trade" className="text-cyan-400 hover:text-cyan-300">legal@unifyn.trade</a></p></section>
            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}


