'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import {
  BookOpen,
  ClipboardCheck,
  GraduationCap,
  Laptop,
  LineChart,
  MessageSquare,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { useSkin } from '@/components/SkinProvider';
import { DesignBand, IllustrationCard } from '@/components/DesignBand';

const MODULES = [
  {
    icon: ClipboardCheck,
    title: 'Attendance & pastoral',
    body: 'Roll call that reaches parents before the bell — with pastoral notes that stay with the learner, not in a lost notebook.',
  },
  {
    icon: BookOpen,
    title: 'Assessment & results',
    body: 'Markbooks, broadsheets, and transcripts that stay consistent across classes, terms, and campuses.',
  },
  {
    icon: LineChart,
    title: 'Progress analytics',
    body: 'See cohorts climb class by class and term by term — so interventions happen before the report card lands.',
  },
  {
    icon: MessageSquare,
    title: 'Family messaging',
    body: 'Diary notes, fees, and alerts in one trusted thread scoped to your institution and the right guardians.',
  },
  {
    icon: Users,
    title: 'Admissions OS',
    body: 'Full biodata applications, entrance tests, and enrolment that copy cleanly into the student record.',
  },
  {
    icon: ShieldCheck,
    title: 'Tenant-safe ops',
    body: 'Every school runs on its own secure Universe space — no cross-tenant bleed, ever.',
  },
];

/**
 * Shared mid-page story: academics × technology with in-card photography.
 */
export function AcademicsTechBridge() {
  const { skin, skinConfig } = useSkin();
  const reduce = useReducedMotion();
  const imgs = skinConfig.cardImages;

  const story =
    skin === 'nursery'
      ? {
          kicker: 'Academics × technology',
          title: 'Circle time stays human. The OS stays invisible.',
          body: 'Carers teach, comfort, and play — Universe quietly handles pickup verification, diaries, and parent updates so nothing falls through the cracks. The goal isn’t more screens in the room; it’s fewer interruptions to care.',
          left: {
            title: 'Warm rooms. Soft starts.',
            body: 'Real educators lead the day — technology never interrupts the circle.',
            image: imgs.life,
          },
          right: {
            title: 'Live desk & family alerts',
            body: 'Pickup, diary, and attendance hum in the background while families stay informed.',
            image: imgs.family,
          },
        }
      : skin === 'primary'
        ? {
            kicker: 'Academics × technology',
            title: 'Whiteboards for learning. Dashboards for growth.',
            body: 'Literacy and numeracy happen in the room. Progress, fees, and parent partnership live on the platform — so teachers teach and families stay in the loop without chasing paper or WhatsApp forwards.',
            left: {
              title: 'Boards & foundations',
              body: 'Interactive lessons that build confident readers and curious mathematicians.',
              image: imgs.life,
            },
            right: {
              title: 'Progress that parents see',
              body: 'Attendance, fees, and growth synced for every class — one coherent story.',
              image: imgs.fusion,
            },
          }
        : skin === 'secondary'
          ? {
              kicker: 'Academics × technology',
              title: 'Labs and lectures. Results that move in real time.',
              body: 'Subjects, clubs, and board exams stay rigorous. Marking, broadsheets, and messaging run on Universe so performance is visible the moment it happens — not weeks later in a binder.',
              left: {
                title: 'STEM & exam readiness',
                body: 'Benches, debate floors, and structured prep that match ambitious schools.',
                image: imgs.life,
              },
              right: {
                title: 'Results engines',
                body: 'Scripts marked. Broadsheets published. Clubs online — all on one tenant.',
                image: imgs.campus,
              },
            }
          : {
              kicker: 'Academics × technology',
              title: 'Lecture halls meet a governed campus OS.',
              body: 'Programmes, research, and careers stay academic. Registry, fees, transcripts, and GPA live on Universe — precision without paperwork chaos, from matriculation through graduation.',
              left: {
                title: 'Accredited pathways',
                body: 'Research, profession, and clear outcomes with searchable student journeys.',
                image: imgs.life,
              },
              right: {
                title: 'Sealed records',
                body: 'Transcripts, GPA, and campus ops in one place — ready for audits and alumni.',
                image: imgs.campus,
              },
            };

  return (
    <>
      <DesignBand className="py-24 md:py-32" waves trails>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              <GraduationCap className="h-3.5 w-3.5" />
              <Laptop className="h-3.5 w-3.5" />
              {story.kicker}
            </p>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight md:text-5xl">
              {story.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">{story.body}</p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
              Switch Nursery, Primary, Secondary, or Tertiary in the nav — the story, modules, and campus
              moments reshape for that institution type while the OS stays the same.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-primary">
                See the product →
              </Link>
              <Link href="/schools" className="btn-ghost">
                Browse institutions
              </Link>
            </div>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            <IllustrationCard
              title={story.left.title}
              body={story.left.body}
              image={story.left.image}
              radius={skin === 'nursery' ? 'rounded-[2rem]' : skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
            />
            <IllustrationCard
              title={story.right.title}
              body={story.right.body}
              image={story.right.image}
              className="sm:mt-10"
              radius={skin === 'nursery' ? 'rounded-[2rem]' : skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
            />
          </div>
        </div>
      </DesignBand>

      <DesignBand variant="aurora" className="border-y border-line/40 py-20 md:py-28" waves={false}>
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            {skinConfig.motif} Platform modules
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Everything a modern school runs — in one OS.
          </h2>
          <p className="mt-4 text-muted md:text-lg">
            Not a pile of apps. A coherent operating system for teaching, families, and administration —
            tenant-scoped, role-aware, and ready for {skinConfig.label.toLowerCase()} institutions.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODULES.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <motion.div
                key={mod.title}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-line/70 bg-card/70 p-5 backdrop-blur-xl md:p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/30 bg-accent/15 text-accent-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{mod.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{mod.body}</p>
              </motion.div>
            );
          })}
        </div>
      </DesignBand>
    </>
  );
}
