'use client';

import { useSkin } from '@/components/SkinProvider';
import { LIVE_MOMENTS } from '@/components/EnergyTrails';
import { DesignBand } from '@/components/DesignBand';
import type { SkinId } from '@/lib/skins';

export function DirectoryHero() {
  const { skin, skinConfig } = useSkin();
  const moments = LIVE_MOMENTS[skin as SkinId] ?? LIVE_MOMENTS.primary;

  return (
    <>
      <DesignBand className="pb-16 pt-16 md:pb-20 md:pt-20" trails waves>
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            {skinConfig.motif} The Universe directory
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Explore institutions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted md:text-lg">
            Filter by type, open a school profile, and apply with the full student + guardian form.
          </p>

          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-2">
            {moments.map((m) => (
              <div
                key={m.title}
                className="flex items-center gap-2 rounded-full border border-line/70 bg-card/70 px-3 py-1.5 text-xs backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
                <span className="font-semibold">{m.title}</span>
                <span className="hidden text-muted sm:inline">{m.badge}</span>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-10 h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </div>
      </DesignBand>
    </>
  );
}
