import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen flex items-center justify-center px-4 pt-32">
        <div className="text-center max-w-xl">
          <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">404</div>
          <h1 className="text-3xl font-bold text-white mb-4">Page not found</h1>
          <p className="text-lg text-slate-400 mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/" className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold bg-cyan-700 text-white hover:bg-cyan-800 transition-colors shadow-lg shadow-cyan-700/20">Go home</Link>
            <a href="/#contact" className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold border border-slate-700 text-slate-300 hover:bg-slate-800 transition-colors">Contact support</a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}


