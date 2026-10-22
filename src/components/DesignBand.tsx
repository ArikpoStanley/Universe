'use client';

import { useId, type ReactNode } from 'react';
import { useReducedMotion } from 'framer-motion';
import { EnergyTrails } from '@/components/EnergyTrails';
import { WaveBackdrop } from '@/components/WaveBackdrop';
import { useSkin } from '@/components/SkinProvider';
import type { SkinId } from '@/lib/skins';

type Variant = 'mesh' | 'grid' | 'aurora' | 'editorial' | 'playful';

const VARIANT_BY_SKIN: Record<SkinId, Variant> = {
  nursery: 'playful',
  primary: 'mesh',
  secondary: 'grid',
  tertiary: 'editorial',
};

/**
 * Designed / illustrated section shell — no photography.
 * Academics × tech atmosphere via meshes, grids, and SVG motifs.
 */
export function DesignBand({
  variant,
  trails = true,
  waves = true,
  className = '',
  innerClassName = '',
  children,
}: {
  variant?: Variant;
  trails?: boolean;
  waves?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  const { skin } = useSkin();
  const resolved = variant ?? VARIANT_BY_SKIN[skin] ?? 'mesh';

  return (
    <section className={`relative overflow-hidden ${className}`}>
      <IllustrationBackdrop variant={resolved} />
      {trails ? <EnergyTrails intensity="page" /> : null}
      {waves ? <WaveBackdrop intensity="subtle" /> : null}
      <div className={`relative mx-auto max-w-site px-5 md:px-10 lg:px-14 ${innerClassName}`}>{children}</div>
    </section>
  );
}

/** Full-bleed abstract illustration layer. */
export function IllustrationBackdrop({
  variant = 'mesh',
  className = '',
}: {
  variant?: Variant;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Transparent art over the shared fixed atmosphere — each band's art
          fades at its top/bottom so sections blend with no visible seam. */}
      <div
        className="absolute inset-0"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 16%, black 84%, transparent)',
        }}
      >
        {variant === 'playful' && <PlayfulArt reduce={!!reduce} uid={uid} />}
        {variant === 'mesh' && <MeshArt reduce={!!reduce} uid={uid} />}
        {variant === 'grid' && <GridArt reduce={!!reduce} uid={uid} />}
        {variant === 'editorial' && <EditorialArt reduce={!!reduce} uid={uid} />}
        {variant === 'aurora' && <AuroraArt />}
      </div>

      {/* Gentle vignette for depth without a horizontal band */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgb(var(--background)/0.3)_100%)]" />
    </div>
  );
}

/** Compact card — optional inset photo (in-card media, not a section background). */
export function IllustrationCard({
  title,
  body,
  motif = 'book',
  image,
  imageAlt,
  className = '',
  radius = 'rounded-3xl',
}: {
  title: string;
  body: string;
  motif?: 'book' | 'board' | 'lab' | 'campus' | 'family' | 'orbit';
  /** Photo shown inside the card chrome — never a page background. */
  image?: string;
  imageAlt?: string;
  className?: string;
  radius?: string;
}) {
  const uid = useId().replace(/:/g, '');

  if (image) {
    return (
      <figure
        className={`flex h-full flex-col overflow-hidden border border-line/70 bg-card/70 shadow-[0_30px_80px_-40px_rgb(var(--accent)/0.45)] backdrop-blur-xl ${radius} ${className}`}
      >
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={imageAlt || title} className="h-full w-full object-cover" />
        </div>
        <figcaption className="flex flex-1 flex-col p-5 md:p-6">
          <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent-soft">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
            In the school
          </span>
          <p className="font-display text-lg font-bold leading-snug">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
        </figcaption>
      </figure>
    );
  }

  return (
    <figure
      className={`relative overflow-hidden border border-line/70 bg-card/55 shadow-[0_30px_80px_-40px_rgb(var(--accent)/0.45)] backdrop-blur-xl ${radius} ${className}`}
    >
      <div className="absolute inset-0 opacity-90">
        <CardMotif motif={motif} uid={uid} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
      <figcaption className="relative flex min-h-[16rem] flex-col justify-end p-5 md:min-h-[20rem] md:p-7">
        <span className="mb-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent-soft">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
          Designed for schools
        </span>
        <p className="font-display text-lg font-bold leading-snug">{title}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
      </figcaption>
    </figure>
  );
}

function PlayfulArt({ reduce, uid }: { reduce: boolean; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_20%,rgb(var(--accent)/0.28),transparent_50%),radial-gradient(ellipse_at_85%_10%,rgb(var(--ok)/0.18),transparent_45%),radial-gradient(ellipse_at_50%_90%,rgb(var(--accent-soft)/0.16),transparent_50%)]" />
      <svg className="absolute inset-0 h-full w-full opacity-70" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`p-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent-soft))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        {!reduce && (
          <>
            <circle cx="180" cy="160" r="70" fill={`url(#p-${uid})`} className="animate-floaty" />
            <circle cx="980" cy="220" r="110" fill="rgb(var(--accent) / 0.12)" className="animate-floaty" style={{ animationDelay: '1s' }} />
            <circle cx="720" cy="560" r="90" fill="rgb(var(--ok) / 0.12)" className="animate-floaty" style={{ animationDelay: '2s' }} />
          </>
        )}
        <path d="M120 620 C280 520 420 700 580 560 C740 420 900 640 1080 500" fill="none" stroke="rgb(var(--accent-soft) / 0.35)" strokeWidth="3" strokeLinecap="round" />
        <path d="M80 240 C240 300 360 120 520 200" fill="none" stroke="rgb(var(--accent) / 0.25)" strokeWidth="2" strokeDasharray="8 14" />
        {/* soft book + block shapes */}
        <rect x="860" y="480" width="90" height="70" rx="14" fill="rgb(var(--accent) / 0.18)" stroke="rgb(var(--accent-soft) / 0.4)" />
        <rect x="240" y="420" width="60" height="60" rx="16" fill="rgb(var(--ok) / 0.16)" transform="rotate(-12 270 450)" />
      </svg>
    </>
  );
}

function MeshArt({ reduce, uid }: { reduce: boolean; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgb(var(--accent)/0.22),transparent_55%),radial-gradient(ellipse_at_90%_30%,rgb(var(--accent-soft)/0.14),transparent_50%)]" />
      <div className="absolute inset-0 bg-grid-accent opacity-40" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`m-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0" />
            <stop offset="50%" stopColor="rgb(var(--accent-soft))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(var(--ok))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 520 C200 440 320 600 500 480 C680 360 820 560 1200 400" fill="none" stroke={`url(#m-${uid})`} strokeWidth="2" className={reduce ? '' : 'animate-trail-dash'} strokeDasharray="10 16" />
        <path d="M0 300 C260 360 420 180 640 280 C860 380 980 220 1200 300" fill="none" stroke="rgb(var(--accent) / 0.2)" strokeWidth="1.5" />
        {/* abstract whiteboard + seedling */}
        <rect x="160" y="180" width="200" height="120" rx="12" fill="rgb(var(--card) / 0.35)" stroke="rgb(var(--accent) / 0.35)" />
        <line x1="190" y1="220" x2="320" y2="220" stroke="rgb(var(--accent-soft) / 0.5)" strokeWidth="3" />
        <line x1="190" y1="245" x2="290" y2="245" stroke="rgb(var(--accent) / 0.35)" strokeWidth="3" />
        <circle cx="980" cy="520" r="8" fill="rgb(var(--ok) / 0.7)" />
        <path d="M980 520 C970 470 1000 450 990 420" fill="none" stroke="rgb(var(--ok) / 0.55)" strokeWidth="3" />
      </svg>
    </>
  );
}

function GridArt({ reduce, uid }: { reduce: boolean; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-surface/15" />
      <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(rgb(var(--accent)/0.08)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--accent)/0.08)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute -right-20 top-10 h-[70%] w-[45%] -skew-y-3 bg-gradient-to-br from-accent/20 via-accent-soft/10 to-transparent" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`g-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.5" />
            <stop offset="100%" stopColor="rgb(var(--ok))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon points="900,120 1100,180 1040,360 820,300" fill={`url(#g-${uid})`} opacity="0.35" />
        <polygon points="80,480 220,420 280,580 120,620" fill="rgb(var(--accent) / 0.12)" />
        <path d="M60 200 L200 200 L200 340" fill="none" stroke="rgb(var(--accent-soft) / 0.45)" strokeWidth="2" />
        <circle cx="200" cy="200" r="5" fill="rgb(var(--accent))" />
        <path
          d="M400 650 L520 520 L680 580 L820 430"
          fill="none"
          stroke="rgb(var(--accent) / 0.35)"
          strokeWidth="2"
          strokeDasharray="6 10"
          className={reduce ? '' : 'animate-trail-dash-slow'}
        />
        {/* atom / lab glyph */}
        <ellipse cx="980" cy="520" rx="70" ry="28" fill="none" stroke="rgb(var(--accent-soft) / 0.4)" strokeWidth="2" transform="rotate(30 980 520)" />
        <ellipse cx="980" cy="520" rx="70" ry="28" fill="none" stroke="rgb(var(--accent) / 0.35)" strokeWidth="2" transform="rotate(-40 980 520)" />
        <circle cx="980" cy="520" r="8" fill="rgb(var(--ok) / 0.8)" />
      </svg>
    </>
  );
}

function EditorialArt({ reduce, uid }: { reduce: boolean; uid: string }) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgb(var(--accent)/0.16),transparent_55%),linear-gradient(180deg,rgb(var(--surface)/0.4),transparent)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`e-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="rgb(var(--accent-deep))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <line x1="120" y1="120" x2="120" y2="680" stroke="rgb(var(--accent) / 0.25)" strokeWidth="1" />
        <line x1="160" y1="160" x2="480" y2="160" stroke="rgb(var(--accent-soft) / 0.35)" strokeWidth="1" />
        <rect x="720" y="140" width="320" height="420" fill={`url(#e-${uid})`} opacity="0.4" />
        <rect x="760" y="200" width="240" height="12" fill="rgb(var(--accent-soft) / 0.35)" />
        <rect x="760" y="240" width="180" height="8" fill="rgb(var(--accent) / 0.25)" />
        <rect x="760" y="270" width="200" height="8" fill="rgb(var(--accent) / 0.2)" />
        {/* open book silhouette */}
        <path
          d="M200 520 C280 460 360 460 420 520 L420 620 C340 580 260 580 200 620 Z"
          fill="rgb(var(--accent) / 0.12)"
          stroke="rgb(var(--accent-soft) / 0.4)"
        />
        <path
          d="M420 520 C500 460 580 460 640 520 L640 620 C560 580 480 580 420 620 Z"
          fill="rgb(var(--accent-soft) / 0.1)"
          stroke="rgb(var(--accent) / 0.35)"
        />
        {!reduce && <circle cx="980" cy="560" r="48" fill="none" stroke="rgb(var(--accent) / 0.25)" strokeWidth="1" className="animate-pulse-glow" />}
      </svg>
    </>
  );
}

function AuroraArt() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgb(var(--accent)/0.25),transparent_50%),radial-gradient(ellipse_at_70%_60%,rgb(var(--ok)/0.12),transparent_45%),radial-gradient(ellipse_at_50%_0%,rgb(var(--accent-soft)/0.18),transparent_40%)]" />
  );
}

function CardMotif({ motif, uid }: { motif: string; uid: string }) {
  if (motif === 'board') {
    return (
      <svg className="h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="320" fill="rgb(var(--surface))" />
        <rect x="40" y="40" width="320" height="180" rx="10" fill="rgb(var(--card))" stroke="rgb(var(--accent) / 0.4)" />
        <line x1="70" y1="90" x2="280" y2="90" stroke="rgb(var(--accent-soft))" strokeWidth="4" />
        <line x1="70" y1="120" x2="240" y2="120" stroke="rgb(var(--accent) / 0.5)" strokeWidth="4" />
        <circle cx="300" cy="160" r="18" fill="rgb(var(--ok) / 0.35)" />
        <rect x="80" y="250" width="100" height="14" rx="4" fill="rgb(var(--accent) / 0.25)" />
      </svg>
    );
  }
  if (motif === 'lab') {
    return (
      <svg className="h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="320" fill="rgb(var(--surface))" />
        <ellipse cx="200" cy="150" rx="90" ry="36" fill="none" stroke={`rgb(var(--accent-soft))`} strokeWidth="2" transform="rotate(25 200 150)" />
        <ellipse cx="200" cy="150" rx="90" ry="36" fill="none" stroke="rgb(var(--accent))" strokeWidth="2" transform="rotate(-35 200 150)" />
        <circle cx="200" cy="150" r="10" fill="rgb(var(--ok))" />
        <path d="M80 260 L140 200 L200 240 L280 160" fill="none" stroke="rgb(var(--accent) / 0.45)" strokeWidth="2" strokeDasharray="4 8" />
      </svg>
    );
  }
  if (motif === 'campus') {
    return (
      <svg className="h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="320" fill="rgb(var(--surface))" />
        <rect x="60" y="100" width="90" height="140" fill="rgb(var(--accent) / 0.2)" />
        <rect x="160" y="60" width="100" height="180" fill="rgb(var(--accent) / 0.28)" />
        <rect x="270" y="120" width="80" height="120" fill="rgb(var(--accent-soft) / 0.22)" />
        <rect x="40" y="240" width="320" height="10" fill="rgb(var(--accent) / 0.2)" />
      </svg>
    );
  }
  if (motif === 'family') {
    return (
      <svg className="h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
        <rect width="400" height="320" fill="rgb(var(--surface))" />
        <circle cx="150" cy="130" r="28" fill="rgb(var(--accent) / 0.3)" />
        <circle cx="230" cy="120" r="34" fill="rgb(var(--accent-soft) / 0.35)" />
        <path d="M100 220 C120 180 180 180 200 220" fill="rgb(var(--accent) / 0.2)" />
        <path d="M180 220 C210 170 280 170 310 220" fill="rgb(var(--accent-soft) / 0.22)" />
        <rect x="250" y="200" width="70" height="40" rx="8" fill="rgb(var(--ok) / 0.25)" stroke="rgb(var(--ok) / 0.5)" />
      </svg>
    );
  }
  if (motif === 'orbit') {
    return (
      <svg className="h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id={`o-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--accent-soft))" stopOpacity="0.45" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="320" fill="rgb(var(--surface))" />
        <circle cx="200" cy="150" r="100" fill={`url(#o-${uid})`} />
        <circle cx="200" cy="150" r="48" fill="none" stroke="rgb(var(--accent) / 0.4)" />
        <circle cx="280" cy="110" r="8" fill="rgb(var(--ok))" />
        <circle cx="140" cy="190" r="6" fill="rgb(var(--accent-soft))" />
      </svg>
    );
  }
  // book default
  return (
    <svg className="h-full w-full" viewBox="0 0 400 320" preserveAspectRatio="xMidYMid slice">
      <rect width="400" height="320" fill="rgb(var(--surface))" />
      <path d="M80 80 C140 60 180 60 200 80 L200 240 C150 210 110 210 80 240 Z" fill="rgb(var(--accent) / 0.22)" stroke="rgb(var(--accent-soft) / 0.5)" />
      <path d="M200 80 C220 60 260 60 320 80 L320 240 C280 210 240 210 200 240 Z" fill="rgb(var(--accent-soft) / 0.16)" stroke="rgb(var(--accent) / 0.4)" />
      <line x1="200" y1="80" x2="200" y2="240" stroke="rgb(var(--accent) / 0.35)" />
    </svg>
  );
}
