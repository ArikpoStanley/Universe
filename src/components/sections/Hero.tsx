'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Section } from '@/lib/types';
import { resolveCtaHref } from '@/lib/portal';
import { useSkin } from '@/components/SkinProvider';
import { WaveBackdrop } from '@/components/WaveBackdrop';

function AccentCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = canvas.offsetWidth * devicePixelRatio);
    let h = (canvas.height = canvas.offsetHeight * devicePixelRatio);
    let raf = 0;

    const N = Math.min(70, Math.floor(w / 28));
    const parts = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.6 + 0.5) * devicePixelRatio,
      vx: (Math.random() - 0.5) * 0.18 * devicePixelRatio,
      vy: (Math.random() - 0.5) * 0.14 * devicePixelRatio - 0.06 * devicePixelRatio,
      p: Math.random() * Math.PI * 2,
      s: Math.random() * 0.02 + 0.008,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.classList.contains('dark');
      for (const pt of parts) {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.p += pt.s;
        if (pt.x < -10) pt.x = w + 10;
        if (pt.x > w + 10) pt.x = -10;
        if (pt.y < -10) pt.y = h + 10;
        if (pt.y > h + 10) pt.y = -10;
        const a = (Math.sin(pt.p) * 0.5 + 0.5) * (dark ? 0.75 : 0.45);
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(96,165,250,${a})`
          : `rgba(37,99,235,${a})`;
        ctx.shadowColor = dark ? 'rgba(147,197,253,0.85)' : 'rgba(59,130,246,0.7)';
        ctx.shadowBlur = 8 * devicePixelRatio;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

const MARQUEE = [
  'Attendance',
  'Assessment',
  'Results',
  'Finance',
  'Nursery',
  'Primary',
  'Secondary',
  'Tertiary',
];

export function Hero({ section }: { section: Section }) {
  const reduce = useReducedMotion();
  const { skinConfig } = useSkin();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const heading = `${skinConfig.headline} ${skinConfig.headlineAccent}`;
  const words = heading.split(' ');
  const subheading = skinConfig.subheadline || section.subheading;

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* Full-bleed modern classroom / campus photo */}
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center transition-[background-image] duration-700"
        style={{ backgroundImage: `url(${skinConfig.heroImage})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/55 to-background/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30" />
      <WaveBackdrop intensity="strong" />
      <AccentCanvas />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex w-full max-w-site flex-1 flex-col items-center justify-center px-5 pb-24 pt-36 text-center md:px-10 lg:px-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft md:text-xs">
            {skinConfig.motif} {skinConfig.family} · Universe
          </span>
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent" />
        </motion.div>

        <h1 className="max-w-5xl font-display text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          {words.map((word, i) => (
            <span key={`${skinConfig.id}-${i}`} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={`inline-block ${
                  i >= words.length - 2 ? 'text-accent-gradient' : ''
                }`}
                initial={{ y: '110%', rotate: 4 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.055,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>

        {subheading && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {subheading}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link href="/schools" className="btn-primary group">
            {skinConfig.ctaLabel}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          {section.secondaryCta && (
            <Link href={resolveCtaHref(section.secondaryCta.href, section.secondaryCta.label)} className="btn-ghost">
              {section.secondaryCta.label}
            </Link>
          )}
        </motion.div>
      </motion.div>

      {/* marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="relative border-t border-line/50 py-5"
      >
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <span key={i} className="flex items-center gap-10 whitespace-nowrap">
                <span className="text-sm font-medium uppercase tracking-[0.3em] text-muted">
                  {m}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-accent/70" />
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="pointer-events-none absolute bottom-24 left-1/2 hidden -translate-x-1/2 md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-accent/40"
        >
          <ArrowDown className="h-4 w-4 text-accent-soft" />
        </motion.div>
      </motion.div>
    </section>
  );
}
