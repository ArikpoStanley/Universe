'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SearchX } from 'lucide-react';
import { directoryFilters, type DirectoryFilterId } from '@/lib/skins';
import { useSkin } from '@/components/SkinProvider';
import { SchoolCard } from '@/components/SchoolCard';
import { DesignBand } from '@/components/DesignBand';
import type { PublicInstitution } from '@/lib/institutions';

export type DirectoryHeading = {
  kicker?: string;
  title?: string;
  body?: string;
};

/** Join all searchable location/name fields into one lowercase haystack. */
function searchable(school: PublicInstitution): string {
  return [
    school.name,
    school.city,
    school.state,
    school.country,
    school.physicalAddress,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

export function Directory({
  schools,
  heading,
}: {
  schools: PublicInstitution[];
  heading?: DirectoryHeading;
}) {
  const { skinConfig } = useSkin();
  const [filter, setFilter] = useState<DirectoryFilterId>('all');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const active = directoryFilters.find((item) => item.id === filter);
    const q = query.trim().toLowerCase();
    return schools.filter((school) => {
      const matchesType =
        !active || active.types.length === 0 || active.types.includes(school.type);
      if (!matchesType) return false;
      if (!q) return true;
      return searchable(school).includes(q);
    });
  }, [filter, query, schools]);

  const typeFilterActive = filter !== 'all';

  return (
    <DesignBand className="pb-24 pt-8 md:pb-28 md:pt-12" trails waves>
      {heading && (
        <div className="mb-8 max-w-3xl md:mb-12">
          {heading.kicker && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              {skinConfig.motif} {heading.kicker}
            </p>
          )}
          {heading.title && (
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {heading.title}
            </h2>
          )}
          {heading.body && (
            <p className="mt-4 max-w-2xl text-muted md:text-lg">{heading.body}</p>
          )}
        </div>
      )}

      {/* Search + type filters */}
      <div className="flex flex-col gap-4">
        <label className="group relative block w-full max-w-2xl">
          <span className="sr-only">Search institutions by name or location</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-muted transition-colors group-focus-within:text-accent-soft" />
          <input
            type="search"
            inputMode="search"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, city, state, or country…"
            className="w-full rounded-2xl border border-line bg-card/75 py-3.5 pl-11 pr-11 text-[15px] text-foreground shadow-sm outline-none backdrop-blur-md transition-colors placeholder:text-muted/70 focus:border-accent/60 focus:ring-2 focus:ring-accent/20"
          />
          {query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-line/60 hover:text-foreground"
            >
              <SearchX className="h-4 w-4" />
            </button>
          )}
        </label>

        <div className="flex flex-wrap items-center gap-2">
          {directoryFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                aria-pressed={active}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  active
                    ? 'text-white'
                    : 'border border-line bg-card/70 text-muted backdrop-blur-md hover:text-foreground'
                }`}
                style={active ? { background: 'rgb(var(--accent))' } : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {visible.length} institution{visible.length === 1 ? '' : 's'}
        {query.trim() ? ` matching “${query.trim()}”` : ''}
        {typeFilterActive ? ` · ${directoryFilters.find((f) => f.id === filter)?.label}` : ''} ·
        academics on campus · apply on Universe
      </p>

      {visible.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-line bg-card/80 p-16 text-center backdrop-blur-sm">
          <p className="text-4xl">{skinConfig.motif}</p>
          <p className="mt-3 text-muted">
            No institutions match {query.trim() ? `“${query.trim()}”` : 'this filter'} yet.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setFilter('all');
            }}
            className="btn-ghost mt-5"
          >
            Clear search & filters
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((school, index) => (
            <motion.div
              key={school.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <SchoolCard school={school} />
            </motion.div>
          ))}
        </div>
      )}
    </DesignBand>
  );
}
