export function LogoMark({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/brand/universe-mark.png" alt="" aria-hidden="true" className={`object-contain ${className ?? ''}`} />
  );
}

/** Stacked Universe logo (mark, wordmark, tagline); `className` sets the height. */
export function Logo({ compact = false, className = 'h-14' }: { compact?: boolean; className?: string }) {
  if (compact) return <LogoMark className="h-9 w-9" />;
  return (
    <span className="flex items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/universe-logo-stacked.png" alt="Universe" className={`w-auto object-contain dark:hidden ${className}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/universe-logo-stacked-dark.png"
        alt="Universe"
        className={`hidden w-auto object-contain dark:block ${className}`}
      />
    </span>
  );
}
