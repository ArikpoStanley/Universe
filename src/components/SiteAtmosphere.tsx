'use client';

import { useReducedMotion } from 'framer-motion';
import type { WebsiteSkin } from '@/lib/skins';

function WaveBand({
  className,
  fill,
  path,
  reduce,
  reverse,
  speed = 'animate-wave-drift',
}: {
  className: string;
  fill: string;
  path: string;
  reduce: boolean | null;
  reverse?: boolean;
  speed?: string;
}) {
  return (
    <svg
      className={`absolute left-0 w-[200%] ${className} ${reduce ? '' : speed}`}
      style={reverse && !reduce ? { animationDirection: 'reverse' } : undefined}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill={fill} d={path} />
    </svg>
  );
}

const WAVE_A =
  'M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z';
const WAVE_B =
  'M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z';
const WAVE_C =
  'M0,256L80,240C160,224,320,192,480,186.7C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z';

/**
 * Site-wide designed atmosphere — gradients, waves, grid mesh.
 * No photography; heroes own the photos.
 */
export function SiteAtmosphere({ skinConfig }: { skinConfig: WebsiteSkin }) {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-background" />
      <div
        key={skinConfig.id}
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: `
            radial-gradient(ellipse at 15% 10%, rgb(var(--accent) / 0.22), transparent 50%),
            radial-gradient(ellipse at 85% 30%, rgb(var(--accent-soft) / 0.16), transparent 45%),
            radial-gradient(ellipse at 50% 90%, rgb(var(--accent-deep) / 0.18), transparent 55%)
          `,
        }}
      />

      <div className="absolute inset-0 bg-grid-accent opacity-[0.28]" />

      <WaveBand
        className="top-0 h-[28vh] -translate-y-1/3 rotate-180 opacity-70"
        fill="rgb(var(--accent) / 0.12)"
        path={WAVE_A}
        reduce={reduce}
        speed="animate-wave-drift-slow"
      />
      <WaveBand
        className="top-[8%] h-[22vh] opacity-60"
        fill="rgb(var(--accent-soft) / 0.10)"
        path={WAVE_B}
        reduce={reduce}
        reverse
      />
      <WaveBand
        className="top-[42%] h-[30vh] opacity-55"
        fill="rgb(var(--accent) / 0.11)"
        path={WAVE_C}
        reduce={reduce}
        speed="animate-wave-drift-slow"
      />
      <WaveBand
        className="bottom-0 h-[36vh] opacity-80"
        fill="rgb(var(--accent) / 0.14)"
        path={WAVE_A}
        reduce={reduce}
      />
      <WaveBand
        className="bottom-0 h-[28vh] opacity-70"
        fill="rgb(var(--accent-soft) / 0.12)"
        path={WAVE_B}
        reduce={reduce}
        reverse
        speed="animate-wave-drift-slow"
      />
      <WaveBand
        className="bottom-0 h-[18vh] opacity-75"
        fill="rgb(var(--accent-deep) / 0.18)"
        path={WAVE_C}
        reduce={reduce}
        speed="animate-wave-bob"
      />

      <div className={`orb -left-24 top-[12%] h-[28rem] w-[28rem] bg-accent/20 ${reduce ? '' : 'animate-floaty'}`} />
      <div
        className={`orb -right-20 top-[38%] h-[32rem] w-[32rem] bg-accent-soft/15 ${reduce ? '' : 'animate-floaty'}`}
        style={reduce ? undefined : { animationDelay: '1.8s' }}
      />
      <div
        className={`orb left-[30%] bottom-[8%] h-[24rem] w-[24rem] bg-accent-deep/18 ${reduce ? '' : 'animate-floaty'}`}
        style={reduce ? undefined : { animationDelay: '3.2s' }}
      />
    </div>
  );
}
