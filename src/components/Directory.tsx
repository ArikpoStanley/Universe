'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { directoryFilters, type DirectoryFilterId } from '@/lib/skins';
import { useSkin } from '@/components/SkinProvider';
import { SchoolCard } from '@/components/SchoolCard';
import { WaveBackdrop } from '@/components/WaveBackdrop';
import type { PublicInstitution } from '@/lib/institutions';

export function Directory({ schools }: { schools: PublicInstitution[] }) {
  const { skinConfig } = useSkin();
  const [filter, setFilter] = useState<DirectoryFilterId>('all');

  const visible = useMemo(() => {
    const active = directoryFilters.find((item) => item.id === filter);
    if (!active || active.types.length === 0) return schools;
    const set = new Set(active.types);
    return schools.filter((school) => set.has(school.type));
  }, [filter, schools]);

  return (
    <section className="relative overflow-hidden bg-transparent">
      <WaveBackdrop intensity="default" />
      <div className="relative mx-auto max-w-site px-5 py-12 md:px-10 lg:px-14">
        <div className="flex flex-wrap items-center gap-2">
          {directoryFilters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
                  active
                    ? 'text-white'
                    : 'border border-line bg-card/60 text-muted backdrop-blur-sm hover:text-foreground'
                }`}
                style={active ? { background: 'rgb(var(--accent))' } : undefined}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <p className="mt-5 text-sm text-muted">
          {visible.length} institution{visible.length === 1 ? '' : 's'}
        </p>

        {visible.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-line bg-card/80 p-16 text-center backdrop-blur-sm">
            <p className="text-4xl">{skinConfig.motif}</p>
            <p className="mt-3 text-muted">No institutions match this filter yet.</p>
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
      </div>
    </section>
  );
}
