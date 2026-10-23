'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { WaveBackdrop } from '@/components/WaveBackdrop';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Platform', href: '/products' },
      { label: 'Institutions', href: '/schools' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-transparent backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgb(var(--accent)/0.18),transparent_55%)]" aria-hidden />
      <WaveBackdrop intensity="strong" />
      <div className="relative mx-auto max-w-site px-5 py-16 md:px-10 lg:px-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              One operating system for nursery, primary, secondary, and tertiary institutions —
              academics, attendance, results, finance, and family messaging.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-accent-soft">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent-soft">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 select-none overflow-hidden">
          <p className="bg-gradient-to-b from-accent/30 to-transparent bg-clip-text text-center text-[14vw] font-black leading-none tracking-tight text-transparent md:text-[9rem]">
            UNIVERSE
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-8 text-xs text-muted/80 md:flex-row">
          <p>© {new Date().getFullYear()} Universe. All rights reserved.</p>
          <p className="text-center">Built for schools that want one platform — not a pile of tools.</p>
        </div>
      </div>
    </footer>
  );
}
