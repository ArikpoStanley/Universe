import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SkinProvider } from '@/components/SkinProvider';
import { Preloader } from '@/components/Preloader';
import { Navbar } from '@/components/Navbar';
import { TechPulseBar } from '@/components/TechInAction';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Universe — One Platform. Every Institution.',
    template: '%s | Universe',
  },
  description:
    'Create and run nursery, primary, secondary, and tertiary schools on one platform — attendance, assessment, results, finance, and family messaging.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0B1220' },
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider>
          <SkinProvider>
            <Preloader />
            <Navbar />
            <div className="pt-[72px]">
              <TechPulseBar />
              {children}
            </div>
            <Footer />
          </SkinProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
