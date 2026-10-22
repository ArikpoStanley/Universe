'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Content card with a real photo in the card (not a section background).
 */
export function MediaCard({
  image,
  alt,
  eyebrow,
  title,
  body,
  className = '',
  radius = 'rounded-3xl',
  delay = 0,
}: {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  body: string;
  className?: string;
  radius?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex h-full flex-col overflow-hidden border border-line/70 bg-card/70 shadow-[0_24px_60px_-36px_rgb(var(--accent)/0.45)] backdrop-blur-xl ${radius} ${className}`}
    >
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-surface">
        <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {eyebrow ? (
          <p className="text-[10px] font-black uppercase tracking-[0.22em] text-accent-soft">{eyebrow}</p>
        ) : null}
        <h3 className={`font-display text-lg font-bold leading-snug md:text-xl ${eyebrow ? 'mt-2' : ''}`}>
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{body}</p>
      </div>
    </motion.article>
  );
}

/** Wider editorial row: image beside longer copy. */
export function MediaSplit({
  image,
  alt,
  kicker,
  title,
  body,
  bullets,
  reverse = false,
  radius = 'rounded-3xl',
}: {
  image: string;
  alt: string;
  kicker: string;
  title: string;
  body: string;
  bullets?: string[];
  reverse?: boolean;
  radius?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      <div className={`relative aspect-[4/3] overflow-hidden border border-line/60 ${radius}`}>
        <Image src={image} alt={alt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
      </div>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">{kicker}</p>
        <h3 className="mt-3 font-display text-2xl font-bold md:text-3xl">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{body}</p>
        {bullets?.length ? (
          <ul className="mt-6 space-y-3">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted md:text-[15px]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.div>
  );
}
