import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
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
