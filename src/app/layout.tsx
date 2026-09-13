import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Spring — Powering the Future of Mortgages in Africa',
    template: '%s | Spring',
  },
  description:
    'Fintech infrastructure-as-a-service. Spring delivers mortgage, loan, savings, investment and commodity products through banks, fintechs, real estate firms and communities — on CBN-licensed rails.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#070709' },
    { media: '(prefers-color-scheme: light)', color: '#faf7ef' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-noise min-h-screen">
        <ThemeProvider>
          <Preloader />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
