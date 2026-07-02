import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/use-auth';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KrayoNova | Building Tomorrow\'s Digital Experiences',
  description: 'We create AI-powered products, premium websites, mobile applications, and digital experiences.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-text-main bg-bg-gray overflow-x-hidden selection:bg-primary/20 selection:text-primary" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

