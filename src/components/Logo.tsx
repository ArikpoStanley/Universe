export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="universe-logo-bg" x1="8" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F172A" />
          <stop offset="1" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id="universe-logo-accent" x1="14" y1="10" x2="35" y2="39" gradientUnits="userSpaceOnUse">
          <stop stopColor="#60A5FA" />
          <stop offset="0.48" stopColor="#22C55E" />
          <stop offset="1" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="14" fill="url(#universe-logo-bg)" />
      <path
        d="M14 14V27.4C14 34.3 18.6 38.8 24 38.8C29.4 38.8 34 34.3 34 27.4V14"
        stroke="#F8FAFC"
        strokeWidth="5.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 14V27.1C15 33.2 19 37.6 24 37.6C29 37.6 33 33.2 33 27.1V14"
        stroke="url(#universe-logo-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="14" r="4.2" fill="#60A5FA" />
      <circle cx="34" cy="14" r="4.2" fill="#22C55E" />
      <circle cx="24" cy="37" r="4.2" fill="#FBBF24" />
      <circle cx="24" cy="24" r="2.2" fill="#F8FAFC" opacity="0.92" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9" />
      {!compact && (
        <span className="text-xl font-black tracking-[-0.04em] text-foreground">Universe</span>
      )}
    </span>
  );
}
