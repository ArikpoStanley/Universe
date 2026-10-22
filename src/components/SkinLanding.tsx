'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform, type MotionProps } from 'framer-motion';
import { useRef, type ReactNode } from 'react';
import { useSkin } from '@/components/SkinProvider';
import { skins, type SkinId, type WebsiteSkin } from '@/lib/skins';
import { WaveBackdrop } from '@/components/WaveBackdrop';
import { EnergyTrails } from '@/components/EnergyTrails';
import { TechInAction } from '@/components/TechInAction';
import { DesignBand, IllustrationCard } from '@/components/DesignBand';
import { MediaCard } from '@/components/MediaCard';

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

function ClosingCta({
  skin,
  title,
  body,
  reduce,
  rounded = 'rounded-[2.5rem]',
}: {
  skin: WebsiteSkin;
  title: string;
  body: string;
  reduce: boolean | null;
  rounded?: string;
}) {
  return (
    <DesignBand className="px-5 py-20 md:px-10 md:py-28 lg:px-14" trails waves>
      <motion.div
        {...slideUp(reduce)}
        className={`relative mx-auto max-w-site overflow-hidden border border-accent/35 bg-card/55 px-8 py-14 text-center backdrop-blur-2xl md:px-16 ${rounded}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-ok/10" />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            {skin.motif} Next step
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-5xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">{body}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/schools" className="btn-primary">
              {skin.ctaLabel}
            </Link>
            <Link href="/contact" className="btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </motion.div>
    </DesignBand>
  );
}

/* ───────────────── NURSERY ───────────────── */

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
        <div className="absolute inset-0 bg-gradient-to-br from-background/55 via-background/70 to-background" />
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

      <DesignBand variant="playful" className="py-24 md:py-28">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <motion.h2 {...slideUp(reduce)} className="font-display text-3xl font-bold md:text-5xl">
              {skin.story.dayTitle}
            </motion.h2>
            <motion.p {...slideUp(reduce, 0.1)} className="mt-5 max-w-md text-muted md:text-lg">
              {skin.story.dayBody}
            </motion.p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:col-span-7">
            {skin.story.moments.map((row, i) => (
              <motion.div
                key={row.title}
                {...springy(reduce)}
                transition={{ type: 'spring', stiffness: 110, damping: 14, delay: i * 0.12 }}
                className="rounded-[2rem] border border-accent/25 bg-card/60 p-6 backdrop-blur-xl"
                style={{ rotate: reduce ? 0 : i % 2 === 0 ? -1.5 : 1.5 }}
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent-soft">Moment 0{i + 1}</p>
                <h3 className="mt-2 font-display text-xl font-bold">{row.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{row.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <MediaCard
            image={skin.cardImages.life}
            alt="Nursery learning corner"
            eyebrow="Rooms"
            title="Cosy spaces for little minds"
            body="Sensory corners and soft starts — the atmosphere families expect from early years."
            radius="rounded-[2rem]"
          />
          <MediaCard
            image={skin.cardImages.campus}
            alt="Nursery classroom"
            eyebrow="Care"
            title="Low ratios, high attention"
            body="Carers stay present while Universe handles the desk work behind the scenes."
            delay={0.08}
            radius="rounded-[2rem]"
          />
          <MediaCard
            image={skin.cardImages.family}
            alt="Parent at school gate"
            eyebrow="Families"
            title="Handoffs parents can trust"
            body="Verified pickup and diary notes so every child goes home with the right adult."
            delay={0.16}
            radius="rounded-[2rem]"
          />
        </div>
      </DesignBand>

      <DesignBand variant="playful" className="py-20 md:py-24" trails={false}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <IllustrationCard
            title="Smart boards stay gentle"
            body="The OS never interrupts circle time — carers stay present with the children."
            image={skin.cardImages.fusion}
            radius="rounded-[2rem]"
          />
          <div>
            <motion.h2 {...slideUp(reduce)} className="font-display text-3xl font-bold md:text-4xl">
              {skin.story.promiseTitle}
            </motion.h2>
            <motion.p {...slideUp(reduce, 0.08)} className="mt-4 text-muted md:text-lg">
              {skin.story.promiseBody}
            </motion.p>
            <div className="mt-8 space-y-4">
              {skin.features.map((f, i) => (
                <motion.div
                  key={f.title}
                  {...slideUp(reduce, 0.08 * i)}
                  className="rounded-2xl border border-line/60 bg-card/65 px-5 py-4 backdrop-blur-xl"
                >
                  <h3 className="font-display text-lg font-bold">
                    {f.icon} {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </DesignBand>

      <ClosingCta
        skin={skin}
        reduce={reduce}
        title="Ready for a gentle start?"
        body="Browse nurseries on Universe and apply with the full pupil + guardian form."
        rounded="rounded-[3rem]"
      />
    </div>
  );
}

/* ───────────────── PRIMARY ───────────────── */

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
        <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/75 to-background" />
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

      <DesignBand variant="mesh" className="py-24">
        <motion.h2 {...slideUp(reduce)} className="font-display text-3xl font-bold md:text-5xl">
          {skin.story.dayTitle}
        </motion.h2>
        <p className="mt-4 max-w-2xl text-muted md:text-lg">{skin.story.dayBody}</p>
        <div className="mt-14 space-y-5">
          {skin.story.moments.map((row, i) => (
            <motion.div
              key={row.title}
              {...slideUp(reduce, i * 0.1)}
              className="grid items-center gap-6 rounded-3xl border border-line/70 bg-card/55 p-6 backdrop-blur-xl md:grid-cols-[1fr]"
              style={{ marginLeft: reduce ? 0 : `${i * 3}%` }}
            >
              <div>
                <h3 className="font-display text-xl font-bold">{row.title}</h3>
                <p className="mt-1 leading-relaxed text-muted">{row.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <MediaCard
            image={skin.cardImages.life}
            alt="Primary outdoor learning"
            eyebrow="Yard & board"
            title="Learning that looks like childhood"
            body="Outdoor collaboration and interactive classrooms feed the same progress story."
          />
          <MediaCard
            image={skin.cardImages.campus}
            alt="Primary campus"
            eyebrow="Campus"
            title="Spaces built for foundations"
            body="Playgrounds and classrooms that match how primary schools actually feel."
            delay={0.08}
          />
          <MediaCard
            image={skin.cardImages.family}
            alt="Parent partnership"
            eyebrow="Parents"
            title="Partnership without the chase"
            body="Fees, attendance, and updates in one place — no more lost notes."
            delay={0.16}
          />
        </div>
      </DesignBand>

      <DesignBand variant="mesh" className="py-20" trails={false}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.h2 {...slideUp(reduce)} className="font-display text-3xl font-bold md:text-4xl">
              {skin.story.promiseTitle}
            </motion.h2>
            <motion.p {...slideUp(reduce, 0.08)} className="mt-4 text-muted md:text-lg">
              {skin.story.promiseBody}
            </motion.p>
            <div className="mt-8 grid gap-4">
              {skin.features.map((f, i) => (
                <motion.div key={f.title} {...slideUp(reduce, 0.08 * i)} className="glass-card p-5">
                  <h3 className="font-display text-lg font-bold">
                    {f.icon} {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <IllustrationCard
            title="Interactive board for literacy"
            body="Dashboard for growth — same child, one coherent story."
            image={skin.cardImages.fusion}
          />
        </div>
      </DesignBand>

      <ClosingCta
        skin={skin}
        reduce={reduce}
        title="Find a primary that fits your child."
        body="Clear progress and parents in sync — apply online on Universe."
      />
    </div>
  );
}

/* ───────────────── SECONDARY ───────────────── */

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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
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

      <DesignBand variant="grid" className="-mt-4 py-24">
        <motion.h2 {...slideX(reduce, 'right')} className="font-display text-3xl font-black md:text-5xl">
          {skin.story.dayTitle}
        </motion.h2>
        <p className="mt-4 max-w-2xl text-muted md:text-lg">{skin.story.dayBody}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skin.story.moments.map((row, i) => (
            <motion.div
              key={row.title}
              {...slideX(reduce, i % 2 === 0 ? 'left' : 'right', i * 0.08)}
              className="relative overflow-hidden rounded-2xl border border-line bg-card/55 p-6 backdrop-blur-xl"
            >
              <span className="font-display text-4xl font-black text-accent/40">0{i + 1}</span>
              <p className="mt-4 text-lg font-bold">{row.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{row.body}</p>
              <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-accent to-transparent" />
            </motion.div>
          ))}
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <MediaCard
            image={skin.cardImages.life}
            alt="Secondary STEM lab"
            eyebrow="STEM"
            title="Labs that stay serious"
            body="Science benches and screens for charts — academics first, ops second."
            radius="rounded-xl"
          />
          <MediaCard
            image={skin.cardImages.campus}
            alt="Secondary campus"
            eyebrow="Campus"
            title="Ambition has a place"
            body="Secondary campuses where clubs, exams, and leadership share one OS."
            delay={0.08}
            radius="rounded-xl"
          />
          <MediaCard
            image={skin.cardImages.fusion}
            alt="Classroom technology"
            eyebrow="Results"
            title="Performance in motion"
            body="When scripts are marked, broadsheets move — parents and principals see it live."
            delay={0.16}
            radius="rounded-xl"
          />
        </div>
      </DesignBand>

      <DesignBand variant="grid" className="py-20" trails={false}>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <motion.h2 {...slideX(reduce, 'left')} className="font-display text-3xl font-black md:text-4xl">
              {skin.story.promiseTitle}
            </motion.h2>
            <motion.p {...slideX(reduce, 'left', 0.06)} className="text-muted md:text-lg">
              {skin.story.promiseBody}
            </motion.p>
            {skin.features.map((f, i) => (
              <motion.div
                key={f.title}
                {...slideX(reduce, 'left', 0.1 * i)}
                className="border-l-4 border-accent bg-card/55 py-6 pl-5 pr-4 backdrop-blur-md"
              >
                <h3 className="font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.body}</p>
              </motion.div>
            ))}
          </div>
          <IllustrationCard
            title="Science benches meet live results"
            body="STEM stays physical. Performance stays visible the moment it happens."
            image={skin.cardImages.life}
            radius="rounded-xl"
          />
        </div>
      </DesignBand>

      <ClosingCta
        skin={skin}
        reduce={reduce}
        title="Own the next chapter."
        body="Secondary schools on Universe — apply online, sit entrance tests, track admission."
        rounded="rounded-2xl"
      />
    </div>
  );
}

/* ───────────────── TERTIARY ───────────────── */

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
          <div>
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

      <DesignBand variant="editorial" className="py-28">
        <div className="grid gap-16 lg:grid-cols-12">
          <motion.div {...fade(reduce)} className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">Pathways</p>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">{skin.story.dayTitle}</h2>
            <p className="mt-4 leading-relaxed text-muted">{skin.story.dayBody}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{skin.story.promiseBody}</p>
          </motion.div>
          <div className="space-y-8 lg:col-span-8">
            {skin.story.moments.map((row, i) => (
              <motion.article key={row.title} {...fade(reduce, 0.12 * i)} className="border-t border-line pt-8">
                <h3 className="font-display text-2xl font-bold">{row.title}</h3>
                <p className="mt-3 max-w-xl leading-relaxed text-muted">{row.body}</p>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <MediaCard
            image={skin.cardImages.life}
            alt="Tertiary study"
            eyebrow="Scholarship"
            title="Study floors that stay serious"
            body="Lecture halls and mezzanines for learning — records stay searchable on the OS."
            radius="rounded-md"
          />
          <MediaCard
            image={skin.cardImages.campus}
            alt="Tertiary campus"
            eyebrow="Campus"
            title="Architecture for ambition"
            body="Campuses where faculties, hostels, and careers share one governed tenant."
            delay={0.08}
            radius="rounded-md"
          />
          <MediaCard
            image={skin.cardImages.fusion}
            alt="Academics and technology"
            eyebrow="Governed OS"
            title="Precision without paperwork chaos"
            body="Transcripts, GPA, and registry sealed — ready for senate and alumni."
            delay={0.16}
            radius="rounded-md"
          />
        </div>

        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {skin.features.map((f, i) => (
            <motion.div
              key={f.title}
              {...fade(reduce, 0.1 * i)}
              className="border border-line bg-card/50 p-8 backdrop-blur-md"
            >
              <p className="font-display text-sm uppercase tracking-[0.2em] text-accent-soft">
                {f.icon} {f.title}
              </p>
              <p className="mt-4 text-muted">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </DesignBand>

      <ClosingCta
        skin={skin}
        reduce={reduce}
        title="Choose your institution."
        body="Apply through Universe — the same admissions OS campuses already run."
        rounded="rounded-none"
      />
    </div>
  );
}

const LANDINGS: Record<SkinId, (props: { skin: WebsiteSkin }) => ReactNode> = {
  nursery: NurseryLanding,
  primary: PrimaryLanding,
  secondary: SecondaryLanding,
  tertiary: TertiaryLanding,
};

export function SkinLanding() {
  const { skin, skinConfig } = useSkin();
  const Landing = LANDINGS[skin] ?? PrimaryLanding;

  return (
    <div key={skin} className="relative">
      <Landing skin={skinConfig ?? skins[skin]} />
    </div>
  );
}
