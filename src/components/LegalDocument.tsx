import Link from 'next/link';
import type { ReactNode } from 'react';
import { PageHero } from '@/components/sections/PageHero';
import { LEGAL_LINKS } from '@/lib/legal';

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function LegalDocument({
  title,
  summary,
  effectiveDate,
  current,
  children,
}: {
  title: string;
  summary: string;
  effectiveDate: string;
  current: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero section={{ type: 'hero', kicker: 'Legal', heading: title, subheading: summary }} />
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-10">
        <nav aria-label="Legal documents" className="mb-8 flex flex-wrap gap-2">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={link.href === current ? 'page' : undefined}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                link.href === current
                  ? 'border-accent bg-accent/15 text-accent-soft'
                  : 'border-line/70 text-muted hover:text-accent-soft'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <article className="legal-doc glass-panel rounded-2xl border border-line/60 p-6 md:p-10">
          <p className="!mt-0 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            Effective {formatDate(effectiveDate)}
          </p>
          {children}
        </article>
      </section>
    </>
  );
}
