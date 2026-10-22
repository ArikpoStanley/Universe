import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div className="orb left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 bg-accent/10" />
      <p className="text-accent-gradient font-display text-[8rem] font-bold leading-none md:text-[12rem]">
        404
      </p>
      <p className="mt-4 max-w-md text-muted">
        This page isn’t here. Head back to Universe and keep setting up your school.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to Home
      </Link>
    </div>
  );
}
