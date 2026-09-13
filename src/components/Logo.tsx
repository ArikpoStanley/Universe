export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 34c6 3 24 3 28-3 3.4-5.1-1-9-8-9.6-8.2-.7-16-2.4-16-8 0-5.4 7.4-7.4 13-6 3.6.9 6.6 2.8 9 5.4"
        stroke="url(#goldStroke)"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="38" cy="33" r="2.6" fill="url(#goldStroke)" />
      <defs>
        <linearGradient id="goldStroke" x1="8" y1="6" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="rgb(var(--gold-soft))" />
          <stop offset="0.55" stopColor="rgb(var(--gold))" />
          <stop offset="1" stopColor="rgb(var(--gold-deep))" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-8 w-8" />
      {!compact && (
        <span className="font-display text-xl font-bold tracking-[0.22em] text-foreground">
          SPRING
        </span>
      )}
    </span>
  );
}
