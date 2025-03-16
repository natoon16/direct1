import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Florida Wedding Directory',
    template: '%s | Florida Wedding Directory',
  },
  description: 'Find the perfect wedding vendors in Florida. Browse venues, photographers, caterers, and more.',
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
