'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Building2, School, Sparkles, University, Users2 } from 'lucide-react';
import { useSkin } from '@/components/SkinProvider';
import { DesignBand } from '@/components/DesignBand';
import { MediaCard, MediaSplit } from '@/components/MediaCard';
import { portalHref } from '@/lib/portal';

const JOURNEY = [
  {
    step: '01',
    title: 'Create your school',
    body: 'Pick nursery, primary, secondary, or tertiary. Set your name, slug, and first admin — email verification gets you into a live tenant.',
  },
  {
    step: '02',
    title: 'Configure the year',
    body: 'Classes, subjects, fee structures, and term dates. Universe scopes every record to your institution so nothing leaks across schools.',
  },
  {
    step: '03',
    title: 'Invite people',
    body: 'Teachers, parents, and learners join with role-aware access. Admissions can also arrive from the public apply form on your school profile.',
  },
  {
    step: '04',
    title: 'Run the day',
    body: 'Attendance, assessment, results, messaging, and finance move in one OS — the same engines families and staff already expect.',
  },
];

const AUDIENCE = [
  {
    icon: School,
    title: 'Proprietors & admins',
    body: 'One tenant for academics, fees, HR, and family messaging — free for schools, with a simple per-student portal levy.',
  },
  {
    icon: Users2,
    title: 'Teachers & carers',
    body: 'Markbooks, pastoral notes, and parent updates without juggling spreadsheets or WhatsApp threads that vanish.',
  },
  {
    icon: Building2,
    title: 'Families',
    body: 'Transparent fees, attendance, and progress — so the school gate and the phone tell the same story.',
  },
  {
    icon: University,
    title: 'Campus leaders',
    body: 'Secondary and tertiary operators get results engines, registry, and analytics that match the ambition of their programmes.',
  },
];

/**
 * Extra home sections — denser copy + in-card photography so the page
 * never feels like a thin hero and a few empty tiles.
 */
export function SiteDepthSections() {
  const { skin, skinConfig } = useSkin();
  const reduce = useReducedMotion();
  const imgs = skinConfig.cardImages;

  const howCopy =
    skin === 'nursery'
      ? {
          kicker: 'How Universe fits early years',
          title: 'Soft workflows for busy rooms.',
          body: 'Nurseries need calm more than complexity. Universe keeps pickup desks, diaries, and parent alerts reliable while carers stay in the circle — not behind a laptop.',
          bullets: [
            'Verified pickup and diary notes that parents actually open',
            'Attendance that doesn’t interrupt morning songs',
            'Admissions biodata that matches how you enrol little ones',
          ],
        }
      : skin === 'primary'
        ? {
            kicker: 'How Universe fits primary',
            title: 'Literacy in the room. Progress on the OS.',
            body: 'Primary schools win when whiteboards stay for teaching and dashboards stay for growth. Universe connects both without forcing teachers into admin theatre.',
            bullets: [
              'Foundational literacy and numeracy with clear class progress',
              'Fees and family updates that stop chasing paper',
              'A path from P1 roots to P6 secondary transition',
            ],
          }
        : skin === 'secondary'
          ? {
              kicker: 'How Universe fits secondary',
              title: 'Exams, clubs, and performance — one cockpit.',
              body: 'Secondary ambition needs more than a timetable. Universe keeps subjects rigorous while results, messaging, and clubs stay visible in real time.',
              bullets: [
                'Mocks and broadsheets that stay consistent across classes',
                'Clubs and leadership tracked alongside academics',
                'Parents and principals who see performance as it happens',
              ],
            }
          : {
              kicker: 'How Universe fits tertiary',
              title: 'Registry to graduation — governed.',
              body: 'Campuses need scholarship and accountability together. Universe keeps programmes academic while registry, fees, transcripts, and GPA stay precise.',
              bullets: [
                'Sealed transcripts and searchable student journeys',
                'Faculties, hostels, and fees on one tenant',
                'Industry bridges that don’t live in disconnected folders',
              ],
            };

  return (
    <>
      <DesignBand className="py-20 md:py-28" trails waves>
        <MediaSplit
          image={imgs.life}
          alt={`${skinConfig.label} learning environment`}
          kicker={howCopy.kicker}
          title={howCopy.title}
          body={howCopy.body}
          bullets={howCopy.bullets}
          radius={skin === 'nursery' ? 'rounded-[2rem]' : skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
        />
        <div className="mt-16">
          <MediaSplit
            image={imgs.family}
            alt="Parent staying in sync with school"
            kicker="Families in the loop"
            title="The school gate and the phone should agree."
            body="Universe keeps attendance, fees, and progress in one trusted thread. Parents stop guessing; schools stop forwarding screenshots."
            bullets={[
              'Alerts and diary-style updates scoped to your institution',
              'Fee visibility without awkward desk conversations',
              'The same story teachers see in class and parents see at home',
            ]}
            reverse
            radius={skin === 'nursery' ? 'rounded-[2rem]' : skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
          />
        </div>
      </DesignBand>

      <DesignBand variant="aurora" className="py-20 md:py-28" waves={false}>
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            {skinConfig.motif} Built for every role
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            One platform. Different jobs. Shared truth.
          </h2>
          <p className="mt-4 text-muted md:text-lg">
            Universe isn’t a single app pretending to be everything. It’s a tenant-scoped operating system
            where proprietors, teachers, families, and campus leaders each get the tools their day requires —
            on the same records.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {AUDIENCE.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
                className="rounded-2xl border border-line/70 bg-card/65 p-6 backdrop-blur-xl"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/15 text-accent-soft">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </motion.div>
            );
          })}
        </div>
      </DesignBand>

      <DesignBand className="py-20 md:py-28" trails waves>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              Campus moments
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
              See the school — not another empty tile.
            </h2>
            <p className="mt-4 text-muted md:text-lg">
              These are real environments that match how {skinConfig.label.toLowerCase()} institutions look
              and feel. Use them as proof points while you explore the product and directory.
            </p>
          </div>
          <Link href="/schools" className="btn-ghost inline-flex shrink-0 items-center gap-2">
            Browse institutions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <MediaCard
            image={imgs.life}
            alt="Learning in action"
            eyebrow="Learning"
            title="Where teaching still looks like teaching"
            body="Rooms, yards, and labs stay human. Universe runs the ops layer so educators keep their attention on learners."
            delay={0}
            radius={skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
          />
          <MediaCard
            image={imgs.campus}
            alt="Campus life"
            eyebrow="Campus"
            title="Spaces that match your institution type"
            body={`From ${skinConfig.family.toLowerCase()} atmospheres to tertiary campuses — the directory and apply flow stay the same OS.`}
            delay={0.08}
            radius={skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
          />
          <MediaCard
            image={imgs.fusion}
            alt="Classroom technology"
            eyebrow="Academics × tech"
            title="Boards and dashboards, finally aligned"
            body="Interactive teaching tools in the room. Attendance, results, and messaging on the tenant — one coherent story."
            delay={0.16}
            className="sm:col-span-2 lg:col-span-1"
            radius={skin === 'tertiary' ? 'rounded-md' : 'rounded-3xl'}
          />
        </div>
      </DesignBand>

      <DesignBand variant="mesh" className="py-20 md:py-28" trails={false}>
        <div className="max-w-2xl">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            <Sparkles className="h-3.5 w-3.5" /> From signup to school day
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            A clear path — not a scavenger hunt.
          </h2>
          <p className="mt-4 text-muted md:text-lg">
            Creating a school on Universe is deliberate: pick your tier, verify your admin, configure the year,
            then invite people. Public admissions feed the same OS your staff already run.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {JOURNEY.map((row, i) => (
            <motion.div
              key={row.step}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="rounded-2xl border border-line/70 bg-card/65 p-6 backdrop-blur-xl"
            >
              <p className="font-display text-3xl font-black text-accent/40">{row.step}</p>
              <h3 className="mt-3 font-display text-lg font-bold">{row.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{row.body}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href={portalHref('create')} className="btn-primary">
            Create school →
          </a>
          <Link href="/schools" className="btn-ghost">
            Browse institutions
          </Link>
          <Link href="/faq" className="btn-ghost">
            Read the FAQ
          </Link>
        </div>
      </DesignBand>
    </>
  );
}
