'use client';

import { motion } from 'framer-motion';
import type { Section } from '@/lib/types';

export function PageHero({ section }: { section: Section }) {
  const words = (section.heading || '').split(' ');
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-40 md:px-8 md:pb-24 md:pt-48">
      <div className="absolute inset-0 bg-grid-gold opacity-70" />
      <div className="orb left-[-8%] top-[-20%] h-96 w-96 bg-gold/20" />
      <div className="orb bottom-[-30%] right-[-6%] h-72 w-72 bg-gold-deep/20" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background" />

      <div className="relative mx-auto max-w-4xl text-center">
        {section.kicker && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold">
              {section.kicker}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </motion.div>
        )}
        <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight md:text-6xl">
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.045, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
                {i < words.length - 1 ? ' ' : ''}
              </motion.span>
            </span>
          ))}
        </h1>
        {section.subheading && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted md:text-lg"
          >
            {section.subheading}
          </motion.p>
        )}
        <motion.div
          className="mx-auto mt-10 h-px w-28 bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}
