'use client';

import { useReducedMotion } from 'framer-motion';

/**
 * Soft animated wave layers — academic OS atmosphere without cluttering content.
 */
export function WaveBackdrop({
  className = '',
  intensity = 'default',
}: {
  className?: string;
  intensity?: 'subtle' | 'default' | 'strong';
}) {
  const reduce = useReducedMotion();
  const opacity =
    intensity === 'subtle' ? 'opacity-40' : intensity === 'strong' ? 'opacity-90' : 'opacity-70';

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* soft academic wash */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgb(var(--accent)/0.18),transparent_55%),radial-gradient(ellipse_at_80%_20%,rgb(var(--accent-soft)/0.12),transparent_50%)]" />

      <svg
        className={`absolute -bottom-8 left-0 h-[42%] w-[200%] ${opacity} ${reduce ? '' : 'animate-wave-drift'}`}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgb(var(--accent) / 0.16)"
          d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,229.3C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>

      <svg
        className={`absolute -bottom-4 left-0 h-[34%] w-[200%] ${opacity} ${reduce ? '' : 'animate-wave-drift-slow'}`}
        style={reduce ? undefined : { animationDirection: 'reverse' }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgb(var(--accent-soft) / 0.14)"
          d="M0,160L60,170.7C120,181,240,203,360,197.3C480,192,600,160,720,154.7C840,149,960,171,1080,186.7C1200,203,1320,213,1380,218.7L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </svg>

      <svg
        className={`absolute bottom-0 left-0 h-[22%] w-[200%] ${opacity} ${reduce ? '' : 'animate-wave-bob'}`}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="rgb(var(--accent-deep) / 0.22)"
          d="M0,256L80,240C160,224,320,192,480,186.7C640,181,800,203,960,213.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>

      {/* floating accent orbs */}
      <div className={`orb -left-16 top-24 h-64 w-64 bg-accent/25 ${reduce ? '' : 'animate-floaty'}`} />
      <div
        className={`orb -right-10 bottom-32 h-72 w-72 bg-accent-soft/20 ${reduce ? '' : 'animate-floaty'}`}
        style={reduce ? undefined : { animationDelay: '1.6s' }}
      />
    </div>
  );
}

/** Thin wavy divider used between page sections. */
export function WaveDivider({ flip = false }: { flip?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <div className={`relative h-16 w-full overflow-hidden ${flip ? 'rotate-180' : ''}`} aria-hidden>
      <svg
        className={`absolute inset-0 h-full w-[200%] ${reduce ? '' : 'animate-wave-drift'}`}
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
      >
        <path
          fill="rgb(var(--surface))"
          d="M0,40L60,45C120,50,240,60,360,55C480,50,600,30,720,28C840,26,960,42,1080,48C1200,54,1320,50,1380,48L1440,46L1440,80L0,80Z"
        />
      </svg>
    </div>
  );
}
