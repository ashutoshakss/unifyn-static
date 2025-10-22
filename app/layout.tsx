import './globals.css';
import type { Metadata, Viewport } from 'next';
import { ModalProvider } from '../components/ModalProvider';

export const metadata: Metadata = {
  title: "Unifyn — India's first unified, broker‑agnostic trading hub",
  description: 'Connect Angel One, Zerodha, Upstox and more. Trade, analytics, and ledger in one interface — not a broker.',
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
};

export const viewport: Viewport = {
  themeColor: '#0f172a',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-slate-950 text-slate-100 antialiased font-sans relative">
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}


