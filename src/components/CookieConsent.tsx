'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  OPEN_COOKIE_SETTINGS_EVENT,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent as Choice,
} from '@/lib/legal';

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!readCookieConsent()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, reopen);
  }, []);

  const choose = (choice: Choice) => {
    writeCookieConsent(choice);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl md:bottom-6"
        >
          <div className="glass-panel flex flex-col gap-4 rounded-2xl border border-line/70 p-5 shadow-2xl md:flex-row md:items-center md:gap-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 rounded-xl bg-accent/15 p-2 text-accent-soft" aria-hidden>
                <Cookie className="h-5 w-5" />
              </span>
              <p className="text-sm leading-relaxed text-muted">
                We use essential cookies to run this site and remember your choices. With your permission we
                may also use optional cookies to understand how the site is used. Read our{' '}
                <Link href="/cookies" className="font-medium text-accent-soft underline underline-offset-4">
                  Cookie Policy
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button type="button" className="btn-ghost flex-1 whitespace-nowrap md:flex-none" onClick={() => choose('rejected')}>
                Reject optional
              </button>
              <button type="button" className="btn-primary flex-1 whitespace-nowrap md:flex-none" onClick={() => choose('accepted')}>
                Accept all
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
