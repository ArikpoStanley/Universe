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
import { PhotoBand, PhotoFrame } from '@/components/PhotoBand';

const MODULES = [
  { icon: ClipboardCheck, title: 'Attendance & pastoral', body: 'Roll call that reaches parents before the bell.' },
  { icon: BookOpen, title: 'Assessment & results', body: 'Markbooks, broadsheets, and transcripts that stay consistent.' },
  { icon: LineChart, title: 'Progress analytics', body: 'See cohorts climb — class by class, term by term.' },
  { icon: MessageSquare, title: 'Family messaging', body: 'Diary notes, fees, and alerts in one trusted thread.' },
  { icon: Users, title: 'Admissions OS', body: 'Full biodata applications, entrance tests, enrolment.' },
  { icon: ShieldCheck, title: 'Tenant-safe ops', body: 'Every school runs on its own secure Universe space.' },
];

/**
 * Shared mid-page story: academics on the left of the brand promise,
 * technology on the right — photo-backed so the message feels real.
 */
export function AcademicsTechBridge() {
  const { skin, skinConfig } = useSkin();
  const reduce = useReducedMotion();

  const story =
    skin === 'nursery'
      ? {
          kicker: 'Academics × technology',
          title: 'Circle time stays human. The OS stays invisible.',
          body: 'Carers teach, comfort, and play — Universe quietly handles pickup verification, diaries, and parent updates so nothing falls through the cracks.',
          leftCaption: 'Warm rooms. Soft starts. Real educators.',
          rightCaption: 'Live desk, diary, and family alerts — running now.',
        }
      : skin === 'primary'
        ? {
            kicker: 'Academics × technology',
            title: 'Whiteboards for learning. Dashboards for growth.',
            body: 'Literacy and numeracy happen in the room. Progress, fees, and parent partnership live on the platform — so teachers teach and families stay in the loop.',
            leftCaption: 'Interactive boards. Curious minds. Clear foundations.',
            rightCaption: 'Attendance, fees, and progress synced for every class.',
          }
        : skin === 'secondary'
          ? {
              kicker: 'Academics × technology',
              title: 'Labs and lectures. Results that move in real time.',
              body: 'Subjects, clubs, and board exams stay rigorous. Marking, broadsheets, and messaging run on Universe so performance is visible the moment it happens.',
              leftCaption: 'STEM benches. Debate floors. Exam readiness.',
              rightCaption: 'Scripts marked. Results published. Clubs online.',
            }
          : {
              kicker: 'Academics × technology',
              title: 'Lecture halls meet a governed campus OS.',
              body: 'Programmes, research, and careers stay academic. Registry, fees, transcripts, and GPA live on Universe — precision without paperwork chaos.',
              leftCaption: 'Accredited pathways. Research. Real outcomes.',
              rightCaption: 'Sealed transcripts. Live GPA. Campus ops in one place.',
            };

  return (
    <>
      <PhotoBand
        image={skinConfig.fusionImage}
        overlay="strong"
        waves
        className="py-24 md:py-32"
        innerClassName="py-4"
      >
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
            <PhotoFrame
              image={skinConfig.lifeImage}
              caption={story.leftCaption}
              radius={skin === 'nursery' ? 'rounded-[2rem]' : skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
            />
            <PhotoFrame
              image={skinConfig.campusImage}
              caption={story.rightCaption}
              className="sm:mt-10"
              radius={skin === 'nursery' ? 'rounded-[2rem]' : skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
            />
          </div>
        </div>
      </PhotoBand>

      <PhotoBand
        image={skinConfig.familyImage}
        overlay="split-left"
        className="border-y border-line/40 py-20 md:py-28"
      >
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            {skinConfig.motif} Platform modules
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            Everything a modern school runs — in one OS.
          </h2>
          <p className="mt-4 text-muted">
            Not a pile of apps. A coherent operating system for teaching, families, and administration.
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
                className="rounded-2xl border border-line/70 bg-card/70 p-5 backdrop-blur-xl"
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
      </PhotoBand>
    </>
  );
}
