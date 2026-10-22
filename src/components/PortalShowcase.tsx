'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useSkin } from '@/components/SkinProvider';
import { WaveBackdrop, WaveDivider } from '@/components/WaveBackdrop';
import { EnergyTrails } from '@/components/EnergyTrails';
import { TechInAction } from '@/components/TechInAction';

export function PortalShowcase() {
  const { skin, skinConfig } = useSkin();
  const reduce = useReducedMotion();

  const copy =
    skin === 'nursery'
      ? {
          kicker: 'Inside the early-years OS',
          title: 'The same calm tools carers already use.',
          body: 'Pickup desk, diary, attendance, and parent messaging — soft workflows for busy nurseries.',
        }
      : skin === 'primary'
        ? {
            kicker: 'Inside the foundation OS',
            title: 'Classrooms, progress, and parents — connected.',
            body: 'Literacy, attendance, fees, and family updates on one tenant-scoped platform.',
          }
        : skin === 'secondary'
          ? {
              kicker: 'Inside the secondary OS',
              title: 'Exams, clubs, and performance — one cockpit.',
              body: 'Board prep, results, messaging, and analytics for ambitious schools.',
            }
          : {
              kicker: 'Inside the tertiary OS',
              title: 'Registry to graduation — governed.',
              body: 'Faculties, fees, transcripts, and campus operations on Universe.',
            };

  return (
    <section className="relative overflow-hidden border-y border-line/50 py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${skinConfig.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background/85" />
      <EnergyTrails intensity="page" />
      <WaveBackdrop intensity="default" />
      <WaveDivider />

      <div
        className={`relative mx-auto grid max-w-site items-center gap-12 px-5 md:grid-cols-2 md:px-10 lg:px-14 ${
          skin === 'tertiary' ? 'lg:gap-20' : ''
        }`}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: skin === 'secondary' ? 0 : 28, x: skin === 'secondary' ? -40 : 0 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: skin === 'tertiary' ? 1.1 : 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            {skinConfig.motif} {copy.kicker}
          </p>
          <h2
            className={`mt-4 font-display font-bold tracking-tight ${
              skin === 'secondary' ? 'text-3xl md:text-5xl' : skin === 'tertiary' ? 'text-3xl italic md:text-5xl' : 'text-3xl md:text-4xl'
            }`}
          >
            {copy.title}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{copy.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/schools" className="btn-primary">
              Browse schools
            </Link>
            <Link href="/products" className="btn-ghost">
              See the product
            </Link>
          </div>
        </motion.div>

        <TechInAction compact showTrails={false} />
      </div>
    </section>
  );
}
