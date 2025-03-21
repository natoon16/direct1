import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://weddingdirectoryflorida.com'),
  title: {
    default: 'Wedding Directory Florida - Find Local Wedding Vendors',
    template: '%s - Wedding Directory Florida'
  },
  description: 'Find the best wedding vendors in Florida. Browse photographers, venues, caterers, and more for your perfect wedding day.',
  keywords: ['wedding vendors', 'florida wedding', 'wedding directory', 'wedding photographers', 'wedding venues', 'wedding caterers'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://weddingdirectoryflorida.com',
    siteName: 'Wedding Directory Florida',
    title: 'Wedding Directory Florida - Find Local Wedding Vendors',
    description: 'Find the best wedding vendors in Florida. Browse photographers, venues, caterers, and more for your perfect wedding day.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wedding Directory Florida'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wedding Directory Florida - Find Local Wedding Vendors',
    description: 'Find the best wedding vendors in Florida. Browse photographers, venues, caterers, and more for your perfect wedding day.',
    images: ['/og-image.jpg']
  },
  alternates: {
    canonical: 'https://weddingdirectoryflorida.com'
  },
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' }
    ]
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_MEASUREMENT_ID');
          `}
        </Script>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
