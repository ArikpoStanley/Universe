'use client';

import { useSkin } from '@/components/SkinProvider';
import { WaveBackdrop, WaveDivider } from '@/components/WaveBackdrop';
import { EnergyTrails } from '@/components/EnergyTrails';
import { LIVE_MOMENTS } from '@/components/EnergyTrails';
import type { SkinId } from '@/lib/skins';

export function DirectoryHero() {
  const { skin, skinConfig } = useSkin();
  const moments = LIVE_MOMENTS[skin as SkinId] ?? LIVE_MOMENTS.primary;

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-16 pt-16 md:px-10 md:pt-20 lg:px-14">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center transition-[background-image] duration-700"
          style={{ backgroundImage: `url(${skinConfig.heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/55 to-background/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/35 via-transparent to-background/30" />
        <EnergyTrails intensity="hero" />
        <WaveBackdrop intensity="strong" />

        <div className="relative mx-auto max-w-site text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            {skinConfig.motif} The Universe directory
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            Explore institutions
          </h1>
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted md:text-lg">
            Modern classrooms, clean campuses — filter by type, open a school profile, and apply with the full student + guardian form.
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
      </section>
      <WaveDivider />
    </>
  );
}
