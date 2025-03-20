import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Wedding Directory Florida - Find Local Wedding Vendors',
    template: '%s - Wedding Directory Florida'
  },
  description: 'Find the best wedding vendors in Florida. Browse photographers, venues, caterers, and more for your perfect wedding day.',
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
    <html lang="en" className="h-full">
      <head>
        <meta name="msvalidate.01" content="82BB97B4BF4623390ACE010D6D6948BE" />
      </head>
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Header />
        <main className="flex-grow relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
