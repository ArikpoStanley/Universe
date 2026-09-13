'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LETTERS = ['S', 'P', 'R', 'I', 'N', 'G'];

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('nointro')) {
      setDone(true);
      return;
    }
    const seen = sessionStorage.getItem('spring-loaded');
    const duration = seen ? 500 : 2300;
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('spring-loaded', '1');
    }, duration);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#070709]"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* radiating gold rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute h-40 w-40 rounded-full border border-[#d4af37]/30"
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 2.2, delay: 0.3 + i * 0.45, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          <div className="relative flex flex-col items-center">
            {/* coil draw */}
            <motion.svg
              viewBox="0 0 48 48"
              className="mb-6 h-16 w-16"
              initial={{ rotate: -8 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <motion.path
                d="M10 34c6 3 24 3 28-3 3.4-5.1-1-9-8-9.6-8.2-.7-16-2.4-16-8 0-5.4 7.4-7.4 13-6 3.6.9 6.6 2.8 9 5.4"
                fill="none"
                stroke="#d4af37"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.4, ease: 'easeInOut' }}
              />
            </motion.svg>

            <div className="flex overflow-hidden">
              {LETTERS.map((l, i) => (
                <motion.span
                  key={l}
                  className="font-display text-4xl font-bold tracking-[0.3em] text-transparent md:text-5xl"
                  style={{
                    backgroundImage:
                      'linear-gradient(120deg,#8b6914,#f0d77b 45%,#d4af37 65%,#8b6914)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                  }}
                  initial={{ y: 64, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.35 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="mt-4 h-px w-48 origin-left bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.3, delay: 0.7, ease: 'easeInOut' }}
            />
            <motion.p
              className="mt-4 text-[11px] uppercase tracking-[0.4em] text-[#d4af37]/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              Powering the future of mortgages
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
