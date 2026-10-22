'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useSkin } from '@/components/SkinProvider';
import { WaveDivider } from '@/components/WaveBackdrop';
import { TechInAction } from '@/components/TechInAction';
import { PhotoBand } from '@/components/PhotoBand';

export function PortalShowcase() {
  const { skin, skinConfig } = useSkin();
  const reduce = useReducedMotion();

  const copy =
    skin === 'nursery'
      ? {
          kicker: 'Inside the early-years OS',
          title: 'The same calm tools carers already use.',
          body: 'Pickup desk, diary, attendance, and parent messaging — soft workflows for busy nurseries, photographed in the rooms where learning happens.',
        }
      : skin === 'primary'
        ? {
            kicker: 'Inside the foundation OS',
            title: 'Classrooms, progress, and parents — connected.',
            body: 'Literacy boards in the room. Fees and family updates on the tenant. One coherent primary operating system.',
          }
        : skin === 'secondary'
          ? {
              kicker: 'Inside the secondary OS',
              title: 'Exams, clubs, and performance — one cockpit.',
              body: 'STEM labs stay physical. Broadsheets, messaging, and analytics stay live — so ambition has an operating system.',
            }
          : {
              kicker: 'Inside the tertiary OS',
              title: 'Registry to graduation — governed.',
              body: 'Lecture halls and study floors stay academic. Faculties, fees, transcripts, and GPA stay precise on Universe.',
            };

  return (
    <PhotoBand
      image={skinConfig.fusionImage}
      overlay="strong"
      waves
      className="border-y border-line/50 py-20 md:py-28"
    >
      <WaveDivider />
      <div
        className={`relative grid max-w-site items-center gap-12 md:grid-cols-2 ${
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
              skin === 'secondary'
                ? 'text-3xl md:text-5xl'
                : skin === 'tertiary'
                  ? 'text-3xl italic md:text-5xl'
                  : 'text-3xl md:text-4xl'
            }`}
          >
            {copy.title}
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted">{copy.body}</p>
          <ul className="mt-6 space-y-2 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-ok" /> Academic life stays in the room
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-soft" /> Operations stay on the OS
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Families stay informed in real time
            </li>
          </ul>
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
    </PhotoBand>
  );
}
