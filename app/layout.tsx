import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ModalProvider } from '../components/ModalProvider';
import { ThemeProvider } from '../components/ThemeProvider';

// Optimize font loading with Next.js
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://unifyn.trade'),
  title: {
    default: "Unifyn — India's First Unified Finance Superapp | Broker Agnostic Trading Platform",
    template: '%s | Unifyn - Unified Finance Superapp'
  },
  description: 'Unifyn is India\'s first unified finance superapp - a broker agnostic trading app connecting Angel One, Zerodha, Upstox & more. Experience unified finance with one seamless trading interface, analytics, and ledger. Trade smarter across multiple brokers.',
  keywords: [
    'unified finance superapp',
    'broker agnostic trading app',
    'unified finance',
    'unified finance platform',
    'broker agnostic platform',
    'multi broker trading app',
    'unified trading platform India',
    'connect multiple brokers',
    'Angel One Zerodha integration',
    'trading analytics platform',
    'unified trading interface',
    'broker independent trading',
    'multi-broker portfolio management',
    'consolidated trading platform',
    'India fintech superapp'
  ],
  authors: [{ name: 'Unifyn Technologies' }],
  creator: 'Unifyn Technologies',
  publisher: 'Unifyn Technologies',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://unifyn.trade',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://unifyn.trade',
    siteName: 'Unifyn - Unified Finance Superapp',
    title: "India's First Unified Finance Superapp | Broker Agnostic Trading Platform",
    description: 'Experience unified finance with Unifyn - India\'s premier broker agnostic trading app. Connect Angel One, Zerodha, Upstox & more in one seamless interface.',
    images: [
      {
        url: '/assets/img/logo-dark.svg',
        width: 1200,
        height: 630,
        alt: 'Unifyn - Unified Finance Superapp Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@unifyn',
    creator: '@unifyn',
    title: "India's First Unified Finance Superapp | Broker Agnostic Trading",
    description: 'Unified finance made simple. Connect multiple brokers, trade smarter with our broker agnostic trading app.',
    images: ['/assets/img/logo-dark.svg'],
  },
  icons: [
    { rel: 'icon', url: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'icon', url: '/favicon.ico', sizes: '48x48' },
    { rel: 'apple-touch-icon', url: '/favicon.svg' },
  ],
  manifest: '/site.webmanifest',
  category: 'finance',
  applicationName: 'Unifyn',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Unifyn',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://unifyn.trade/#organization',
        name: 'Unifyn Technologies',
        url: 'https://unifyn.trade',
        logo: {
          '@type': 'ImageObject',
          url: 'https://unifyn.trade/assets/img/logo-dark.svg',
          width: 200,
          height: 60,
        },
        description: "India's first unified finance superapp and broker agnostic trading platform",
        sameAs: [
          'https://twitter.com/unifyn',
          'https://linkedin.com/company/unifyn',
          'https://github.com/unifyn',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          email: 'support@unifyn.trade',
          contactType: 'Customer Support',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://unifyn.trade/#website',
        url: 'https://unifyn.trade',
        name: 'Unifyn - Unified Finance Superapp',
        description: 'Broker agnostic trading platform connecting multiple brokers in one unified interface',
        publisher: {
          '@id': 'https://unifyn.trade/#organization',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://unifyn.trade/?s={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'SoftwareApplication',
        '@id': 'https://unifyn.trade/#software',
        name: 'Unifyn',
        applicationCategory: 'FinanceApplication',
        applicationSubCategory: 'Trading Platform',
        operatingSystem: 'Web, iOS, Android',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
        },
        description: 'Unified finance superapp - broker agnostic trading platform for India. Connect Angel One, Zerodha, Upstox and more in one interface.',
        featureList: [
          'Unified Login across Multiple Brokers',
          'Smart Trading with Keyboard Shortcuts',
          'Deep Analytics and P&L Reports',
          'Ledger and Tax Management',
          'Price Alerts and Notifications',
          'Customizable Trading Interface',
        ],
        screenshot: 'https://unifyn.trade/assets/img/logo-dark.svg',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          ratingCount: '127',
        },
      },
      {
        '@type': 'WebPage',
        '@id': 'https://unifyn.trade/#webpage',
        url: 'https://unifyn.trade',
        name: "India's First Unified Finance Superapp | Broker Agnostic Trading Platform",
        description: 'Unified finance made simple with Unifyn - broker agnostic trading app. Connect multiple brokers, trade smarter.',
        isPartOf: {
          '@id': 'https://unifyn.trade/#website',
        },
        about: {
          '@id': 'https://unifyn.trade/#organization',
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: 'https://unifyn.trade/assets/img/logo-dark.svg',
        },
        inLanguage: 'en-IN',
        potentialAction: {
          '@type': 'ReadAction',
          target: ['https://unifyn.trade'],
        },
      },
    ],
  };

  return (
    <html lang="en-IN" className={`scroll-smooth dark ${inter.variable}`}>
      <head>
        <meta name="description" content="Unifyn is India's first unified finance superapp - a broker agnostic trading app connecting Angel One, Zerodha, Upstox & more. Experience unified finance with one seamless trading interface, analytics, and ledger. Trade smarter across multiple brokers." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased relative`}>
        <ThemeProvider>
          <ModalProvider>{children}</ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


