import Link from 'next/link';
import { Logo } from './Logo';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Platform',
    links: [
      { label: 'Products', href: '/products' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Partner With Us', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms & Conditions', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line/60 bg-surface">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Fintech infrastructure-as-a-service. Powering mortgages, loans, savings, investment
              and commodity finance across Africa — on the regulatory backing of CBN-licensed
              partners.
            </p>
            <p className="mt-6 text-xs tracking-wide text-muted/70">Lagos, Nigeria</p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-gold"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 select-none overflow-hidden">
          <p className="bg-gradient-to-b from-gold/25 to-transparent bg-clip-text text-center font-display text-[18vw] font-bold leading-none tracking-tight text-transparent md:text-[10rem]">
            SPRING
          </p>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line/60 pt-8 text-xs text-muted/80 md:flex-row">
          <p>© {new Date().getFullYear()} Spring TD Limited. All rights reserved.</p>
          <p className="text-center">
            Mortgages are processed by AG Mortgage Bank and CBN-licensed partners. Spring provides
            infrastructure, not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
