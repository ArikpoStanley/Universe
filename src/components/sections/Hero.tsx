'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Section } from '@/lib/types';

function GoldCanvas() {
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
          ? `rgba(212,175,55,${a})`
          : `rgba(158,116,22,${a})`;
        ctx.shadowColor = dark ? 'rgba(240,215,123,0.9)' : 'rgba(197,152,44,0.8)';
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
  'Mortgage',
  'Loan',
  'Savings',
  'Investment',
  'Commodity',
  'AG Mortgage Bank',
  'Charis MFB',
  'Fortress Capital',
];

export function Hero({ section }: { section: Section }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const words = (section.heading || '').split(' ');

  return (
    <section ref={ref} className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-grid-gold" />
      <div className="orb left-[-10%] top-[-15%] h-[32rem] w-[32rem] bg-gold/25 dark:bg-gold/15" />
      <div className="orb bottom-[5%] right-[-8%] h-[26rem] w-[26rem] bg-gold-deep/25 dark:bg-gold-deep/20" />
      <GoldCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-36 text-center md:px-8"
      >
        {section.kicker && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mb-7 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold md:text-xs">
              {section.kicker}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>
        )}

        <h1 className="max-w-5xl font-display text-[2.6rem] font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.2rem]">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className={`inline-block ${
                  /mortgage|future|africa|spring/i.test(word) ? 'text-gold-gradient animate-shimmer' : ''
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

        {section.subheading && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
          >
            {section.subheading}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          {section.cta && (
            <Link href={section.cta.href} className="btn-gold group">
              {section.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
          {section.secondaryCta && (
            <Link href={section.secondaryCta.href} className="btn-ghost">
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
                <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
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
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/40"
        >
          <ArrowDown className="h-4 w-4 text-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}
