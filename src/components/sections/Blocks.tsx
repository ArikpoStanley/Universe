'use client';

import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CmsIcon } from '../Icon';
import { Reveal, Stagger, StaggerItem } from '../Reveal';
import { WaveBackdrop } from '../WaveBackdrop';
import type { Section } from '@/lib/types';
import { resolveCtaHref } from '@/lib/portal';

export function Kicker({ text }: { text: string }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-accent/70" />
      <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft">
        {text}
      </span>
    </div>
  );
}

/* ---------------- Stats ---------------- */

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  const match = value.match(/^([<>~]?)(\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? `${match[1]}0${match[3]}` : value);

  useEffect(() => {
    if (!inView || !match || reduce) {
      if (inView) setDisplay(value);
      return;
    }
    const target = parseFloat(match[2]);
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) =>
        setDisplay(`${match[1]}${Number.isInteger(target) ? Math.round(v) : v.toFixed(1)}${match[3]}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="text-accent-soft-gradient font-display text-4xl font-bold md:text-5xl">
      {display}
    </span>
  );
}

export function StatsSection({ section }: { section: Section }) {
  return (
    <section className="relative overflow-hidden bg-transparent backdrop-blur-md">
      <WaveBackdrop intensity="subtle" />
      <div className="relative mx-auto grid max-w-site grid-cols-2 divide-line/50 px-5 md:grid-cols-4 md:divide-x md:px-10 lg:px-14">
        {(section.items || []).map((item, i) => (
          <Reveal key={i} delay={i * 0.1} className="px-4 py-10 text-center md:py-14">
            <Counter value={item.value || ''} />
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-muted md:text-xs">
              {item.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Pillars ---------------- */

export function PillarsSection({ section }: { section: Section }) {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-10 lg:px-14 md:py-32">
      <WaveBackdrop intensity="subtle" />
      <div className="relative mx-auto max-w-site">
      <Reveal>
        {section.kicker && <Kicker text={section.kicker} />}
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
          {section.heading}
        </h2>
        {section.subheading && (
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">{section.subheading}</p>
        )}
      </Reveal>
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" delay={0.1}>
        {(section.items || []).map((item, i) => (
          <StaggerItem key={i}>
            <div className="glass-card group relative h-full overflow-hidden p-6">
              <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition-all duration-500 group-hover:bg-accent/25" />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/40 bg-accent/10 text-accent-soft transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                <CmsIcon name={item.icon} className="h-5 w-5" />
              </div>
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-accent-soft/15">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Features / Cards ---------------- */

export function FeaturesSection({ section }: { section: Section }) {
  return (
    <section className="relative overflow-hidden bg-surface/20 py-24 backdrop-blur-sm md:py-32">
      <WaveBackdrop intensity="default" />
      <div className="relative mx-auto max-w-site px-5 md:px-10 lg:px-14">
        <Reveal className="text-center">
          {section.kicker && (
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-accent/70" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-accent-soft">
                {section.kicker}
              </span>
              <span className="h-px w-8 bg-accent/70" />
            </div>
          )}
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
            {section.heading}
          </h2>
          {section.subheading && (
            <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted">{section.subheading}</p>
          )}
        </Reveal>
        <Stagger
          className={`mt-14 grid gap-5 md:grid-cols-2 ${
            (section.items || []).length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
          }`}
        >
          {(section.items || []).map((item, i) => (
            <StaggerItem key={i}>
              <div className="glass-card group h-full p-7">
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 text-accent-soft transition-all duration-500 group-hover:bg-accent group-hover:text-black">
                  <CmsIcon name={item.icon} className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export const CardsSection = FeaturesSection;

/* ---------------- Steps ---------------- */

export function StepsSection({ section }: { section: Section }) {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-10 lg:px-14 md:py-32">
      <WaveBackdrop intensity="subtle" />
      <div className="relative mx-auto max-w-site">
      <Reveal>
        {section.kicker && <Kicker text={section.kicker} />}
        <h2 className="max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
          {section.heading}
        </h2>
        {section.subheading && (
          <p className="mt-5 max-w-2xl leading-relaxed text-muted">{section.subheading}</p>
        )}
      </Reveal>
      <div className="relative mt-16">
        <motion.div
          className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-accent via-accent/50 to-transparent md:left-1/2"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="space-y-12">
          {(section.items || []).map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div
                className={`relative flex gap-6 pl-14 md:w-1/2 md:pl-0 ${
                  i % 2 === 0
                    ? 'md:pr-14 md:text-right'
                    : 'md:ml-auto md:pl-14'
                }`}
              >
                <div
                  className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-accent bg-background font-display text-sm font-bold text-accent-soft shadow-[0_0_24px_-4px_rgb(var(--accent)/0.6)] md:left-auto ${
                    i % 2 === 0 ? 'md:-right-5' : 'md:-left-5'
                  }`}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold md:text-2xl">{item.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted md:text-[15px]">
                    {item.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}

/* ---------------- Split ---------------- */

export function SplitSection({ section }: { section: Section }) {
  return (
    <section className="relative overflow-hidden bg-surface/20 py-24 backdrop-blur-sm md:py-32">
      <WaveBackdrop intensity="default" />
      <div className="relative mx-auto grid max-w-site items-center gap-14 px-5 md:px-10 lg:px-14 lg:grid-cols-2">
        <Reveal>
          {section.kicker && <Kicker text={section.kicker} />}
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            {section.heading}
          </h2>
          {section.body &&
            section.body.split('\n\n').map((p, i) => (
              <p key={i} className="mt-5 leading-relaxed text-muted">
                {p}
              </p>
            ))}
        </Reveal>
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {(section.items || []).map((item, i) => (
            <StaggerItem key={i}>
              <div className="glass-card h-full p-6">
                <div className="mb-3 h-1 w-10 rounded-full bg-gradient-to-r from-accent to-accent-soft" />
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Quote ---------------- */

export function QuoteSection({ section }: { section: Section }) {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <WaveBackdrop intensity="subtle" />
      <Reveal className="relative mx-auto max-w-4xl px-5 text-center md:px-10 lg:px-14">
        {section.kicker && (
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-accent/70" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              {section.kicker}
            </span>
            <span className="h-px w-10 bg-accent/70" />
          </div>
        )}
        <span className="font-display text-7xl leading-none text-accent-soft/40">“</span>
        <h2 className="text-accent-soft-gradient -mt-6 font-display text-3xl font-bold leading-snug md:text-5xl">
          {section.heading}
        </h2>
        {section.body && (
          <p className="mx-auto mt-7 max-w-2xl leading-relaxed text-muted md:text-lg">
            {section.body}
          </p>
        )}
      </Reveal>
    </section>
  );
}

/* ---------------- Rich (prose) ---------------- */

export function RichSection({ section }: { section: Section }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-10 lg:px-14 md:py-20">
      <Reveal>
        {section.kicker && <Kicker text={section.kicker} />}
        {section.heading && (
          <h2 className="font-display text-2xl font-bold leading-tight md:text-4xl">
            {section.heading}
          </h2>
        )}
        <div className="prose-universe mt-6">
          {(section.body || '').split('\n\n').map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- CTA ---------------- */

export function CtaSection({ section }: { section: Section }) {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-10 lg:px-14 md:py-32">
      <WaveBackdrop intensity="strong" />
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-accent/30 bg-card/55 px-6 py-16 text-center shadow-[0_30px_80px_-40px_rgb(var(--accent)/0.55)] backdrop-blur-xl md:px-16 md:py-24">
        <div className="absolute inset-0 bg-grid-accent opacity-40" />
        <div className="orb left-[-10%] top-[-40%] h-80 w-80 bg-accent/25" />
        <div className="orb bottom-[-50%] right-[-5%] h-80 w-80 bg-accent-deep/25" />
        <div className="relative">
          <motion.div
            className="mx-auto mb-8 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <h2 className="mx-auto max-w-3xl font-display text-3xl font-bold leading-tight md:text-5xl">
            {section.heading}
          </h2>
          {section.body && (
            <p className="mx-auto mt-6 max-w-xl leading-relaxed text-muted md:text-lg">
              {section.body}
            </p>
          )}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {section.cta && (
              <Link href={resolveCtaHref(section.cta.href, section.cta.label)} className="btn-primary group">
                {section.cta.label}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
            {section.secondaryCta && (
              <Link href={resolveCtaHref(section.secondaryCta.href, section.secondaryCta.label)} className="btn-ghost">
                {section.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
