'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.has('nointro')) {
      setDone(true);
      return;
    }
    const seen = sessionStorage.getItem('universe-loaded');
    const duration = seen ? 450 : 2000;
    const t = setTimeout(() => {
      setDone(true);
      sessionStorage.setItem('universe-loaded', '1');
    }, duration);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B1220]"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute h-40 w-40 rounded-full border border-[#3B82F6]/25"
              initial={{ scale: 0.4, opacity: 0.8 }}
              animate={{ scale: 3.2, opacity: 0 }}
              transition={{ duration: 2.1, delay: 0.25 + i * 0.4, repeat: Infinity, ease: 'easeOut' }}
            />
          ))}

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/universe-logo-stacked-dark.png" alt="Universe" className="h-36 w-auto object-contain md:h-44" />
            </motion.div>

            <motion.div
              className="mt-4 h-px w-52 origin-left bg-gradient-to-r from-transparent via-sky-400 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.1, delay: 0.55, ease: 'easeInOut' }}
            />
            <motion.p
              className="mt-4 text-[11px] uppercase tracking-[0.32em] text-sky-300/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.7 }}
            >
              One platform. Every institution.
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
