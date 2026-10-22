'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useSkin } from '@/components/SkinProvider';
import { EnergyTrails, LIVE_MOMENTS, type LiveCard } from '@/components/EnergyTrails';
import type { SkinId } from '@/lib/skins';

function LiveCardView({ card, index }: { card: LiveCard; index: number }) {
  const reduce = useReducedMotion();
  const tone =
    card.tone === 'ok'
      ? 'border-ok/40 bg-ok/10 text-ok'
      : card.tone === 'muted'
        ? 'border-line bg-card/70 text-muted'
        : 'border-accent/40 bg-accent/10 text-accent-soft';

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.4 + index * 0.14, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-[min(100%,17.5rem)] rounded-2xl border border-line/80 bg-card/85 p-3.5 shadow-[0_20px_50px_-20px_rgb(var(--accent)/0.55)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-foreground">{card.title}</p>
        {card.badge ? (
          <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wide ${tone}`}>
            {card.badge}
          </span>
        ) : null}
      </div>
      <p className="mt-1.5 text-xs leading-relaxed text-muted">{card.body}</p>
    </motion.div>
  );
}

/**
 * Cursor-style product stage + Termii-style live status cards.
 * Remounts per skin so the “tech in action” story matches the institution type.
 */
export function TechInAction({
  className = '',
  compact = false,
  showTrails = true,
}: {
  className?: string;
  compact?: boolean;
  /** Set false when the parent section already mounts EnergyTrails. */
  showTrails?: boolean;
}) {
  const { skin, skinConfig } = useSkin();
  const reduce = useReducedMotion();
  const cards = LIVE_MOMENTS[skin as SkinId] ?? LIVE_MOMENTS.primary;

  const positions =
    skin === 'nursery'
      ? [
          'left-2 top-4 md:-left-8 md:top-8',
          'right-2 top-24 md:-right-6 md:top-20',
          'left-6 bottom-6 md:left-8 md:bottom-10',
        ]
      : skin === 'secondary'
        ? [
            'right-0 top-2 md:-right-10 md:top-6',
            'left-0 top-[30%] md:-left-12',
            'right-2 bottom-8 md:-right-4 md:bottom-12',
          ]
        : skin === 'tertiary'
          ? [
              'left-2 top-6 md:left-0 md:top-10',
              'right-2 top-20 md:right-0',
              'left-1/2 bottom-6 -translate-x-1/2 md:bottom-10',
            ]
          : [
              'right-2 top-6 md:-right-8 md:top-10',
              'left-2 top-[28%] md:-left-10',
              'right-4 bottom-8 md:right-2 md:bottom-12',
            ];

  const frameRadius =
    skin === 'nursery'
      ? 'rounded-[2rem]'
      : skin === 'primary'
        ? 'rounded-3xl'
        : skin === 'secondary'
          ? 'rounded-xl'
          : 'rounded-md';

  return (
    <div
      key={skin}
      className={`relative ${compact ? 'min-h-[22rem]' : 'min-h-[26rem] md:min-h-[32rem]'} ${className}`}
    >
      {showTrails ? <EnergyTrails intensity="hero" /> : null}

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto h-full max-w-3xl px-2"
      >
        <div
          className={`absolute -inset-2 bg-cover bg-center opacity-40 blur-[1px] ${frameRadius}`}
          style={{ backgroundImage: `url(${skinConfig.heroImage})` }}
          aria-hidden
        />
        <div
          className={`relative overflow-hidden border border-line/70 bg-card/45 shadow-[0_40px_100px_-40px_rgb(var(--accent)/0.65)] backdrop-blur-md ${frameRadius}`}
        >
          <div className="flex items-center gap-2 border-b border-line/60 bg-background/55 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-accent/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent-soft/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-line" />
            <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Universe · {skinConfig.label} OS
            </span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-ok">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
              Live
            </span>
          </div>
          <div className="relative">
            <Image
              src="/images/portal-nursery-dashboard.png"
              alt={`Universe ${skinConfig.label} dashboard in action`}
              width={1400}
              height={900}
              className="h-auto w-full opacity-95"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 hidden gap-2 sm:flex">
            {cards.slice(0, 2).map((card) => (
              <div
                key={card.title}
                className="flex flex-1 items-center gap-2 rounded-xl border border-line/70 bg-background/80 px-3 py-2 backdrop-blur-xl"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ok/20 text-ok">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold">{card.title}</p>
                  <p className="truncate text-[10px] text-muted">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {cards.map((card, index) => (
          <motion.div
            key={`${skin}-${card.title}`}
            className={`absolute z-20 ${positions[index] ?? positions[0]}`}
            animate={
              reduce
                ? undefined
                : { y: [0, index % 2 === 0 ? -12 : 12, 0] }
            }
            transition={{ duration: 5.5 + index, repeat: Infinity, ease: 'easeInOut', delay: index * 0.35 }}
          >
            <LiveCardView card={card} index={index} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

/** Compact strip for non-home pages — tech in action on every route. */
export function TechPulseBar() {
  const { skin, skinConfig } = useSkin();
  const cards = LIVE_MOMENTS[skin as SkinId] ?? LIVE_MOMENTS.primary;
  const reduce = useReducedMotion();

  return (
    <div
      key={skin}
      className="sticky top-[72px] z-40 overflow-hidden border-b border-line/40 bg-background/70 backdrop-blur-xl"
    >
      <EnergyTrails intensity="page" />
      <div className="relative mx-auto flex max-w-site items-center gap-3 overflow-x-auto px-5 py-2.5 md:px-10 lg:px-14">
        <span className="shrink-0 text-[10px] font-black uppercase tracking-[0.25em] text-accent-soft">
          {skinConfig.motif} Live
        </span>
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            className="flex shrink-0 items-center gap-2 rounded-full border border-line/70 bg-card/65 px-3 py-1.5 text-xs backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
            <span className="font-semibold">{card.title}</span>
            <span className="max-w-[14rem] truncate text-muted">{card.body}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
