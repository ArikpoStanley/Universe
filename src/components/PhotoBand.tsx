'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { EnergyTrails } from '@/components/EnergyTrails';
import { WaveBackdrop } from '@/components/WaveBackdrop';

type Overlay = 'soft' | 'strong' | 'split-left' | 'split-right' | 'bottom';

const OVERLAY: Record<Overlay, string> = {
  soft: 'bg-gradient-to-b from-background/45 via-background/70 to-background/90',
  strong: 'bg-gradient-to-br from-background/70 via-background/80 to-background/95',
  'split-left':
    'bg-gradient-to-r from-background via-background/85 to-background/25 md:to-transparent',
  'split-right':
    'bg-gradient-to-l from-background via-background/85 to-background/25 md:to-transparent',
  bottom: 'bg-gradient-to-t from-background via-background/75 to-background/35',
};

/**
 * Full-bleed academic photography with tech-atmosphere overlays.
 * Keeps classroom imagery readable while content stays legible.
 */
export function PhotoBand({
  image,
  overlay = 'soft',
  trails = true,
  waves = false,
  parallax = true,
  className = '',
  innerClassName = '',
  children,
}: {
  image: string;
  overlay?: Overlay;
  trails?: boolean;
  waves?: boolean;
  parallax?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax && !reduce ? ['-6%', '6%'] : ['0%', '0%']);

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{ y, backgroundImage: `url(${image})` }}
        className="absolute inset-[-8%] bg-cover bg-center will-change-transform"
        aria-hidden
      />
      <div className={`absolute inset-0 ${OVERLAY[overlay]}`} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgb(var(--background)/0.55)_100%)]" />
      {trails ? <EnergyTrails intensity="page" /> : null}
      {waves ? <WaveBackdrop intensity="subtle" /> : null}
      <div className={`relative mx-auto max-w-site px-5 md:px-10 lg:px-14 ${innerClassName}`}>{children}</div>
    </section>
  );
}

/** Inset photo panel used beside copy — academics visible, tech chrome on the frame. */
export function PhotoFrame({
  image,
  caption,
  className = '',
  radius = 'rounded-3xl',
}: {
  image: string;
  caption?: string;
  className?: string;
  radius?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={`relative overflow-hidden border border-line/70 bg-card/40 shadow-[0_40px_100px_-40px_rgb(var(--accent)/0.55)] backdrop-blur-sm ${radius} ${className}`}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      <div className="relative flex min-h-[16rem] items-end p-5 md:min-h-[22rem] md:p-7">
        {caption ? (
          <figcaption className="max-w-sm rounded-2xl border border-line/60 bg-background/75 px-4 py-3 text-sm backdrop-blur-xl">
            <span className="mb-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-accent-soft">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ok" />
              Live campus
            </span>
            <p className="font-medium leading-snug text-foreground">{caption}</p>
          </figcaption>
        ) : null}
      </div>
    </motion.figure>
  );
}
