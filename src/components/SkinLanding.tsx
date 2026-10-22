'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform, type MotionProps } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useSkin } from '@/components/SkinProvider';
import { skins, type SkinId, type WebsiteSkin } from '@/lib/skins';
import { WaveBackdrop } from '@/components/WaveBackdrop';
import { EnergyTrails } from '@/components/EnergyTrails';
import { TechInAction } from '@/components/TechInAction';

function springy(reduce: boolean | null): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y: 40, scale: 0.92 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { type: 'spring', stiffness: 120, damping: 14 },
  };
}

function slideUp(reduce: boolean | null, delay = 0): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0, y: 48 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function slideX(reduce: boolean | null, from: 'left' | 'right', delay = 0): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0, x: from === 'left' ? -56 : 56 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

function fade(reduce: boolean | null, delay = 0): MotionProps {
  if (reduce) return {};
  return {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 1.1, delay },
  };
}

function CtaPair({ skin, primaryHref = '/schools' }: { skin: WebsiteSkin; primaryHref?: string }) {
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      <Link href={primaryHref} className="btn-primary">
        {skin.ctaLabel} →
      </Link>
      <Link href="/products" className="btn-ghost">
        Explore the platform
      </Link>
    </div>
  );
}

/* ───────────────── NURSERY: playful, soft, bouncing ───────────────── */

function NurseryLanding({ skin }: { skin: WebsiteSkin }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bob = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const swirl = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 12]);

  return (
    <div className="overflow-hidden">
      <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${skin.heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/55 via-background/70 to-background/92" />
        <EnergyTrails intensity="hero" />
        <WaveBackdrop intensity="strong" />

        {!reduce &&
          [0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-accent/30 bg-accent/15 blur-[1px]"
              style={{
                width: 72 + i * 28,
                height: 72 + i * 28,
                left: `${8 + i * 18}%`,
                top: `${14 + (i % 3) * 16}%`,
              }}
              animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 4.5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
            />
          ))}

        <div className="relative mx-auto grid min-h-[calc(100svh-7rem)] max-w-site items-center gap-10 px-5 pb-16 pt-8 md:grid-cols-2 md:px-10 lg:px-14">
          <motion.div style={{ y: bob, rotate: swirl }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              {skin.motif} Early years · Universe
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.6rem]">
              {skin.headline}{' '}
              <span className="text-accent-gradient">{skin.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{skin.subheadline}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted/80">
              Free to explore · Live admissions · Parent-ready
            </p>
            <CtaPair skin={skin} />
          </motion.div>
          <TechInAction showTrails={false} />
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-10 lg:px-14">
        <EnergyTrails intensity="page" />
        <WaveBackdrop intensity="subtle" />
        <div className="relative mx-auto max-w-site">
          <motion.h2 {...slideUp(reduce)} className="font-display text-3xl font-bold md:text-5xl">
            A day that feels like play — and learning.
          </motion.h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { t: 'Morning circle', d: 'Songs, stories, and soft starts that settle little hearts.' },
              { t: 'Discovery time', d: 'Blocks, paint, outdoor play — curiosity leads the schedule.' },
              { t: 'Family handoff', d: 'Pickup desk, diary notes, and carers in the loop.' },
            ].map((row, i) => (
              <motion.div
                key={row.t}
                {...springy(reduce)}
                transition={{ type: 'spring', stiffness: 110, damping: 14, delay: i * 0.12 }}
                className="rounded-[2.5rem] border border-accent/25 bg-accent/10 p-8 backdrop-blur-md"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-soft">Moment 0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl font-bold">{row.t}</h3>
                <p className="mt-3 text-muted">{row.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <NurseryCta skin={skin} reduce={reduce} />
    </div>
  );
}

function NurseryCta({ skin, reduce }: { skin: WebsiteSkin; reduce: boolean | null }) {
  return (
    <section className="relative px-5 pb-28 md:px-10 lg:px-14">
      <motion.div
        {...springy(reduce)}
        className="relative mx-auto max-w-site overflow-hidden rounded-[3rem] border border-accent/30 px-8 py-16 text-center md:px-16"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${skin.applyImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="relative">
          <p className="text-4xl">{skin.motif}</p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">Ready for a gentle start?</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">Browse nurseries on Universe and apply with the full pupil + guardian form.</p>
          <div className="mt-8 flex justify-center">
            <Link href="/schools" className="btn-primary">
              {skin.ctaLabel}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ───────────────── PRIMARY: growth, sticky split, ascending steps ───────────────── */

function PrimaryLanding({ skin }: { skin: WebsiteSkin }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-8%']);

  return (
    <div>
      <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-8">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${skin.heroImage})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/75 to-background/92" />
        <EnergyTrails intensity="hero" />
        <WaveBackdrop intensity="subtle" />
        <div className="relative mx-auto grid min-h-[calc(100svh-6rem)] max-w-site items-center gap-10 px-5 py-12 md:grid-cols-2 md:px-10 lg:px-14">
          <motion.div style={{ y: textY }} className="relative z-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              {skin.motif} Foundation · Universe
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] md:text-6xl lg:text-7xl">
              {skin.headline}
              <br />
              <span className="text-accent-gradient">{skin.headlineAccent}</span>
            </h1>
            <p className="mt-6 max-w-md text-muted md:text-lg">{skin.subheadline}</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted/80">
              Whiteboards · progress · parents in sync
            </p>
            <CtaPair skin={skin} />
          </motion.div>
          <motion.div style={{ y: photoY }} className="relative">
            <TechInAction showTrails={false} />
          </motion.div>
        </div>
      </section>

      <section className="relative px-5 py-24 md:px-10 lg:px-14">
        <EnergyTrails intensity="page" />
        <WaveBackdrop intensity="default" />
        <div className="relative mx-auto max-w-site">
          <motion.h2 {...slideUp(reduce)} className="font-display text-3xl font-bold md:text-5xl">
            Growing year by year
          </motion.h2>
          <div className="mt-14 space-y-6">
            {[
              { year: 'P1–P2', title: 'Roots', body: 'Phonics, number sense, and settling into school rhythm.' },
              { year: 'P3–P4', title: 'Stem', body: 'Projects, clubs, and confidence in reading aloud.' },
              { year: 'P5–P6', title: 'Canopy', body: 'Leadership roles, exams readiness, secondary transition.' },
            ].map((row, i) => (
              <motion.div
                key={row.year}
                {...slideUp(reduce, i * 0.1)}
                className="grid items-center gap-6 rounded-3xl border border-line/70 bg-card/50 p-6 backdrop-blur-xl md:grid-cols-[8rem_1fr]"
                style={{ marginLeft: reduce ? 0 : `${i * 4}%` }}
              >
                <span className="font-display text-2xl font-bold text-accent-soft">{row.year}</span>
                <div>
                  <h3 className="font-display text-xl font-bold">{row.title}</h3>
                  <p className="mt-1 text-muted">{row.body}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-3">
            {skin.features.map((f, i) => (
              <motion.div key={f.title} {...slideUp(reduce, 0.08 * i)} className="glass-card p-6">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-28 md:px-10 lg:px-14">
        <motion.div {...slideUp(reduce)} className="relative mx-auto max-w-site overflow-hidden rounded-3xl border border-line">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${skin.heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
          <div className="relative px-8 py-16 md:px-14 md:py-20">
            <h2 className="max-w-xl font-display text-3xl font-bold md:text-5xl">Find a primary that fits your child.</h2>
            <CtaPair skin={skin} />
          </div>
        </motion.div>
      </section>
    </div>
  );
}

/* ───────────────── SECONDARY: kinetic, diagonal, sharp ───────────────── */

function SecondaryLanding({ skin }: { skin: WebsiteSkin }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const skew = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -4]);
  const shift = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);

  return (
    <div>
      <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-6">
        <motion.div style={{ y: shift }} className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${skin.heroImage})` }} />
          <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/75 to-background/40" />
        </motion.div>
        <EnergyTrails intensity="hero" />
        <WaveBackdrop intensity="strong" />

        <motion.div
          style={{ skewY: skew }}
          className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-site items-center gap-10 px-5 py-24 md:grid-cols-2 md:px-10 lg:px-14"
        >
          <div>
            <motion.p {...slideX(reduce, 'left')} className="text-[11px] font-semibold uppercase tracking-[0.4em] text-accent-soft">
              {skin.motif} Development · Universe
            </motion.p>
            <motion.h1
              {...slideX(reduce, 'left', 0.08)}
              className="mt-4 font-display text-4xl font-black leading-[0.95] tracking-tight md:text-6xl lg:text-[4.8rem]"
            >
              {skin.headline}{' '}
              <span className="text-accent-gradient">{skin.headlineAccent}</span>
            </motion.h1>
            <motion.p {...slideX(reduce, 'left', 0.16)} className="mt-6 max-w-xl border-l-2 border-accent pl-5 text-muted md:text-lg">
              {skin.subheadline}
            </motion.p>
            <motion.p {...slideX(reduce, 'left', 0.18)} className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted/80">
              Exams · clubs · results — verified live
            </motion.p>
            <motion.div {...slideX(reduce, 'left', 0.22)}>
              <CtaPair skin={skin} />
            </motion.div>
          </div>
          <TechInAction showTrails={false} />
        </motion.div>

        <div
          className="pointer-events-none absolute -bottom-10 left-0 right-0 h-24 origin-bottom-left -skew-y-2 bg-accent/20"
          aria-hidden
        />
      </section>

      <section className="relative -mt-8 px-5 py-24 md:px-10 lg:px-14">
        <EnergyTrails intensity="page" />
        <div className="relative mx-auto max-w-site">
          <motion.h2 {...slideX(reduce, 'right')} className="font-display text-3xl font-black md:text-5xl">
            From classroom to certificate
          </motion.h2>
          <div className="mt-12 grid gap-4 md:grid-cols-4">
            {['Master subjects', 'Sit board exams', 'Lead clubs', 'Launch careers'].map((label, i) => (
              <motion.div
                key={label}
                {...slideX(reduce, i % 2 === 0 ? 'left' : 'right', i * 0.08)}
                className="relative overflow-hidden rounded-2xl border border-line bg-card/55 p-6 backdrop-blur-xl"
              >
                <span className="font-display text-4xl font-black text-accent/40">0{i + 1}</span>
                <p className="mt-4 text-lg font-bold">{label}</p>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent to-transparent" />
              </motion.div>
            ))}
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {skin.features.map((f, i) => (
              <motion.div
                key={f.title}
                {...slideX(reduce, 'left', 0.1 * i)}
                className="border-l-4 border-accent bg-card/40 py-6 pl-5 pr-4 backdrop-blur-md"
              >
                <h3 className="font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-5 pb-28 md:px-10 lg:px-14">
        <motion.div
          {...slideUp(reduce)}
          className="relative mx-auto flex max-w-site flex-col items-start justify-between gap-8 overflow-hidden rounded-2xl border border-accent/40 bg-accent/10 px-8 py-14 backdrop-blur-xl md:flex-row md:items-center md:px-12"
        >
          <div>
            <h2 className="font-display text-3xl font-black md:text-4xl">Own the next chapter.</h2>
            <p className="mt-2 max-w-md text-muted">Secondary schools on Universe — apply online, sit entrance tests, track admission.</p>
          </div>
          <Link href="/schools" className="btn-primary shrink-0">
            {skin.ctaLabel}
          </Link>
        </motion.div>
      </section>
    </div>
  );
}

/* ───────────────── TERTIARY: editorial, slow, monumental ───────────────── */

function TertiaryLanding({ skin }: { skin: WebsiteSkin }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const veil = useTransform(scrollYProgress, [0, 1], [0.35, reduce ? 0.35 : 0.75]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <div>
      <section ref={ref} className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${skin.heroImage})` }} />
        <motion.div className="absolute inset-0 bg-background" style={{ opacity: veil }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

        <EnergyTrails intensity="hero" />
        <div className="relative mx-auto grid min-h-[calc(100svh-3rem)] max-w-site items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-10 lg:px-14">
          <div className="text-left md:text-left">
            <motion.p {...fade(reduce)} className="text-[11px] font-semibold uppercase tracking-[0.45em] text-accent-soft">
              Excellence · Universe
            </motion.p>
            <motion.h1
              style={{ y: titleY }}
              className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-[4.6rem]"
            >
              {skin.headline}
              <br />
              <span className="italic text-accent-soft">{skin.headlineAccent}</span>
            </motion.h1>
            <motion.div {...fade(reduce, 0.25)} className="mt-8 h-px w-24 bg-accent" />
            <motion.p {...fade(reduce, 0.35)} className="mt-8 max-w-xl text-muted md:text-lg">
              {skin.subheadline}
            </motion.p>
            <motion.p {...fade(reduce, 0.4)} className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted/80">
              Registry · transcripts · GPA — in motion
            </motion.p>
            <motion.div {...fade(reduce, 0.45)} className="mt-10">
              <CtaPair skin={skin} />
            </motion.div>
          </div>
          <TechInAction showTrails={false} />
        </div>
      </section>

      <section className="relative px-5 py-28 md:px-10 lg:px-14">
        <EnergyTrails intensity="page" />
        <WaveBackdrop intensity="subtle" />
        <div className="relative mx-auto grid max-w-site gap-16 lg:grid-cols-12">
          <motion.div {...fade(reduce)} className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">Pathways</p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              Research. Profession. Impact.
            </h2>
          </motion.div>
          <div className="space-y-10 lg:col-span-8">
            {[
              { t: 'Accredited programmes', d: 'Degrees, HNDs, and professional tracks with clear outcomes.' },
              { t: 'Industry bridges', d: 'SIWES, internships, and employer-ready portfolios.' },
              { t: 'Campus life, managed', d: 'Hostels, fees, transcripts, and senate records — one OS.' },
            ].map((row, i) => (
              <motion.article
                key={row.t}
                {...fade(reduce, 0.12 * i)}
                className="border-t border-line pt-8"
              >
                <h3 className="font-display text-2xl font-bold">{row.t}</h3>
                <p className="mt-3 max-w-xl text-muted">{row.d}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="relative mx-auto mt-20 grid max-w-site gap-6 md:grid-cols-3">
          {skin.features.map((f, i) => (
            <motion.div key={f.title} {...fade(reduce, 0.1 * i)} className="rounded-none border border-line bg-card/40 p-8 backdrop-blur-md">
              <p className="font-display text-sm uppercase tracking-[0.2em] text-accent-soft">{f.icon} {f.title}</p>
              <p className="mt-4 text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="relative px-5 pb-32 md:px-10 lg:px-14">
        <motion.div {...fade(reduce)} className="relative mx-auto max-w-site overflow-hidden border border-accent/30">
          <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: `url(${skin.heroImage})` }} />
          <div className="absolute inset-0 bg-background/75" />
          <div className="relative px-8 py-20 text-center md:px-16">
            <h2 className="font-display text-3xl font-bold md:text-5xl">Choose your institution.</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">Apply through Universe — the same admissions OS campuses already run.</p>
            <div className="mt-8 flex justify-center">
              <Link href="/schools" className="btn-primary">
                {skin.ctaLabel}
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

const LANDINGS: Record<SkinId, (props: { skin: WebsiteSkin }) => ReactNode> = {
  nursery: NurseryLanding,
  primary: PrimaryLanding,
  secondary: SecondaryLanding,
  tertiary: TertiaryLanding,
};

/**
 * Skin-aware landing — structure, scroll motion, and composition change completely
 * when the top nav switches Nursery / Primary / Secondary / Tertiary.
 */
export function SkinLanding() {
  const { skin, skinConfig } = useSkin();
  const Landing = LANDINGS[skin] ?? PrimaryLanding;

  return (
    <div key={skin} className="relative">
      {/* Remount on skin change so entrance animations replay */}
      <Landing skin={skinConfig ?? skins[skin]} />
    </div>
  );
}
