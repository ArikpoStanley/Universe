'use client';

import Link from 'next/link';
import { institutionTypeLabels, institutionTypeToSkin, skins } from '@/lib/skins';
import type { PublicInstitution } from '@/lib/institutions';

export function SchoolCard({ school }: { school: PublicInstitution }) {
  const skin = skins[institutionTypeToSkin(school.type)];
  const location = [school.city, school.state].filter(Boolean).join(', ') || school.country || 'Location on request';

  return (
    <Link
      href={`/schools/${school.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line/80 bg-card/90 shadow-[0_12px_40px_-28px_rgb(var(--accent)/0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_22px_56px_-20px_rgb(var(--accent)/0.55)]"
    >
      <div className="relative flex h-44 items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${skin.heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/55 to-black/10" />
        {school.primaryColor ? (
          <span
            className="absolute left-0 top-0 z-10 h-1 w-full"
            style={{ background: school.primaryColor }}
            aria-hidden
          />
        ) : null}
        <span className="absolute right-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-white shadow-sm">
          {institutionTypeLabels[school.type] ?? school.type}
        </span>
        <div className="relative z-10 flex items-center gap-3 p-4">
          {school.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={school.logoUrl} alt="" className="h-12 w-12 rounded-xl object-contain shadow-md ring-2 ring-white/20" />
          ) : (
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/90 text-2xl shadow-md ring-2 ring-white/15">
              {skin.motif}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 pt-3">
        <h3 className="text-lg font-bold leading-snug transition-colors group-hover:text-accent-soft">
          {school.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted">📍 {location}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="truncate text-xs font-semibold text-muted/80">
            {school.contactEmail ?? school.contactPhone ?? 'View profile'}
          </span>
          <span className="shrink-0 text-sm font-bold text-accent-soft transition-transform group-hover:translate-x-0.5">
            Apply →
          </span>
        </div>
      </div>
    </Link>
  );
}
