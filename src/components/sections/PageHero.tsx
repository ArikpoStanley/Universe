'use client';

import { motion } from 'framer-motion';
import type { Section } from '@/lib/types';
import { useSkin } from '@/components/SkinProvider';
import { PhotoBand } from '@/components/PhotoBand';

export function PageHero({ section }: { section: Section }) {
  const { skinConfig } = useSkin();
  const words = (section.heading || '').split(' ');
  return (
    <PhotoBand
      image={skinConfig.lifeImage || skinConfig.heroImage}
      overlay="strong"
      waves
      className="pb-16 pt-16 md:pb-24 md:pt-20"
    >
      <div className="text-center">
        {section.kicker && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 flex items-center justify-center gap-3"
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              {section.kicker}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent" />
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
          className="mx-auto mt-10 h-px w-28 bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </PhotoBand>
  );
}
