'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useSkin } from '@/components/SkinProvider';
import { WaveDivider } from '@/components/WaveBackdrop';
import { TechInAction } from '@/components/TechInAction';
import { DesignBand } from '@/components/DesignBand';
import { MediaCard } from '@/components/MediaCard';

export function PortalShowcase() {
  const { skin, skinConfig } = useSkin();
  const reduce = useReducedMotion();
  const imgs = skinConfig.cardImages;

  const copy =
    skin === 'nursery'
      ? {
          kicker: 'Inside the early-years OS',
          title: 'The same calm tools carers already use.',
          body: 'Pickup desk, diary, attendance, and parent messaging — soft workflows for busy nurseries. Universe doesn’t ask carers to become IT admins; it asks the OS to stay quiet and reliable.',
          extra:
            'From the public apply form to the first morning circle, every record stays on your school’s tenant — ready for parents, proprietors, and carers alike.',
        }
      : skin === 'primary'
        ? {
            kicker: 'Inside the foundation OS',
            title: 'Classrooms, progress, and parents — connected.',
            body: 'Literacy in the room. Fees and family updates on the tenant. One coherent primary OS so teachers stop juggling tools and families stop chasing paper.',
            extra:
              'Progress from P1 to P6 stays visible — attendance, assessment, and messaging feeding the same learner story.',
          }
        : skin === 'secondary'
          ? {
              kicker: 'Inside the secondary OS',
              title: 'Exams, clubs, and performance — one cockpit.',
              body: 'STEM stays rigorous. Broadsheets, messaging, and analytics stay live — so ambition has an operating system instead of a trail of spreadsheets.',
              extra:
                'Mocks, clubs, and results engines share one tenant. Principals see performance while there’s still time to act.',
            }
          : {
              kicker: 'Inside the tertiary OS',
              title: 'Registry to graduation — governed.',
              body: 'Programmes stay academic. Faculties, fees, transcripts, and GPA stay precise — a campus OS that respects both scholarship and accountability.',
              extra:
                'From course registration to sealed transcripts, Universe keeps the paperwork precise so the lecture hall can stay scholarly.',
            };

  return (
    <DesignBand className="border-y border-line/50 py-20 md:py-28" trails waves>
      <WaveDivider />
      <div
        className={`relative grid items-center gap-12 md:grid-cols-2 ${
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
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{copy.extra}</p>
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

      <div className="mt-16 grid gap-5 sm:grid-cols-3">
        <MediaCard
          image={imgs.life}
          alt="School life"
          eyebrow="In the room"
          title="Teaching stays teaching"
          body="Photos live in cards — proof of real school environments — while the product stage shows the OS in motion."
          radius={skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
        />
        <MediaCard
          image={imgs.campus}
          alt="Campus"
          eyebrow="On campus"
          title="Atmosphere that matches the tier"
          body={`${skinConfig.label} institutions deserve visuals that feel like their world — not generic stock emptiness.`}
          delay={0.08}
          radius={skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
        />
        <MediaCard
          image={imgs.family}
          alt="Families"
          eyebrow="At the gate"
          title="Parents stay in the story"
          body="The same OS families meet on the phone is the one staff run after the bell."
          delay={0.16}
          radius={skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
        />
      </div>
    </DesignBand>
  );
}
