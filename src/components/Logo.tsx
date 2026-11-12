/** Universe brand mark (public/brand/universe-mark.png). */
export function LogoMark({ className }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/brand/universe-mark.png" alt="" aria-hidden="true" className={`object-contain ${className ?? ''}`} />;
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
