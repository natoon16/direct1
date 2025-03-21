import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wedding Directory Florida - Find Wedding Vendors in Florida',
  description: 'Find the best wedding vendors in Florida. Browse photographers, venues, DJs, florists, and more for your special day.',
};

export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {children}
    </div>
  );
} 