'use client';

import { useId } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { SkinId } from '@/lib/skins';

/**
 * Termii-inspired kinetic light trails — accent-colored energy arcs.
 */
export function EnergyTrails({
  className = '',
  intensity = 'hero',
}: {
  className?: string;
  intensity?: 'hero' | 'page';
}) {
  const reduce = useReducedMotion();
  const uid = useId().replace(/:/g, '');
  const opacity = intensity === 'hero' ? 'opacity-90' : 'opacity-45';
  const a = `trail-a-${uid}`;
  const b = `trail-b-${uid}`;
  const glow = `trail-glow-${uid}`;

  if (reduce) {
    return (
      <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgb(var(--accent)/0.2),transparent_55%)]" />
      </div>
    );
  }

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      <svg className={`absolute inset-0 h-full w-full ${opacity}`} viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={a} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0" />
            <stop offset="35%" stopColor="rgb(var(--accent-soft))" stopOpacity="0.95" />
            <stop offset="70%" stopColor="rgb(var(--accent))" stopOpacity="0.7" />
            <stop offset="100%" stopColor="rgb(var(--accent-deep))" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={b} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(var(--accent-soft))" stopOpacity="0" />
            <stop offset="40%" stopColor="rgb(var(--ok))" stopOpacity="0.55" />
            <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
          </linearGradient>
          <filter id={glow} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <path
          d="M-40,520 C180,420 320,680 520,480 C720,280 880,560 1100,360 C1180,300 1240,280 1300,240"
          fill="none"
          stroke={`url(#${a})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          filter={`url(#${glow})`}
          className="animate-trail-dash"
          strokeDasharray="12 18"
        />
        <path
          d="M-20,600 C220,500 380,720 580,520 C780,320 920,600 1140,400"
          fill="none"
          stroke={`url(#${a})`}
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.7"
          className="animate-trail-dash-slow"
          strokeDasharray="8 22"
        />
        <path
          d="M50,180 C280,260 420,80 640,200 C860,320 980,120 1220,220"
          fill="none"
          stroke={`url(#${b})`}
          strokeWidth="1.6"
          strokeLinecap="round"
          filter={`url(#${glow})`}
          className="animate-trail-dash-rev"
          strokeDasharray="10 16"
        />
        <path
          d="M100,720 C300,620 500,780 700,640 C900,500 1050,700 1250,580"
          fill="none"
          stroke={`url(#${b})`}
          strokeWidth="1.2"
          opacity="0.55"
          className="animate-trail-dash-slow"
          strokeDasharray="6 20"
        />
      </svg>
      <div className="absolute right-[8%] top-[22%] h-40 w-40 rounded-full bg-accent/25 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-[18%] left-[12%] h-48 w-48 rounded-full bg-accent-soft/15 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}

export type LiveCard = {
  title: string;
  body: string;
  badge?: string;
  tone?: 'ok' | 'accent' | 'muted';
};

export const LIVE_MOMENTS: Record<SkinId, LiveCard[]> = {
  nursery: [
    { title: 'Pickup desk', body: 'Ada checked out · Auntie Chioma verified', badge: 'Live', tone: 'ok' },
    { title: 'Morning circle', body: '12 / 14 present · sensory play next', badge: 'Now', tone: 'accent' },
    { title: 'Parent diary', body: 'Photo + note sent to Mrs Okoro', badge: 'Sent', tone: 'ok' },
  ],
  primary: [
    { title: 'Literacy board', body: 'P3A · phonics drill synced to tablets', badge: 'Live', tone: 'ok' },
    { title: 'Attendance', body: '94% present · 2 late · 1 absent', badge: 'Today', tone: 'accent' },
    { title: 'Fee receipt', body: '₦45,000 · Term 2 levy confirmed', badge: 'Paid', tone: 'ok' },
  ],
  secondary: [
    { title: 'Mock WAEC', body: 'Chemistry · 38 scripts marked', badge: 'Syncing', tone: 'accent' },
    { title: 'Results engine', body: 'SS2 broadsheet published', badge: 'Live', tone: 'ok' },
    { title: 'Club check-in', body: 'Debate society · 24 members online', badge: 'Active', tone: 'ok' },
  ],
  tertiary: [
    { title: 'Course registration', body: 'CSC 301 · 186 seats confirmed', badge: 'Open', tone: 'accent' },
    { title: 'Transcript queue', body: 'Verified · QR sealed · emailed', badge: 'Done', tone: 'ok' },
    { title: 'GPA dashboard', body: 'Faculty average 3.42 this term', badge: 'Live', tone: 'ok' },
  ],
};
