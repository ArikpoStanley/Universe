export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-line border-t-gold" />
        <p className="text-[11px] uppercase tracking-[0.35em] text-gold">Loading</p>
      </div>
    </div>
  );
}
