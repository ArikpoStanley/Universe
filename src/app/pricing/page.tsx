import type { Metadata } from 'next';
import Link from 'next/link';
import { DesignBand } from '@/components/DesignBand';
import { PricingPlans } from '@/components/PricingPlans';
import { portalHref } from '@/lib/portal';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Universe plans — Free Trial, Standard, Campus, and Enterprise. Same catalog as your school admin dashboard, from ₦50,000/month.',
};

export default function PricingPage() {
  return (
    <>
      <DesignBand className="pb-10 pt-16 md:pb-14 md:pt-20" trails waves>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
            Pricing
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            Plans that grow with your school.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-muted md:text-lg">
            Start on a free trial. Scale seats and billing cycles as enrolment grows — without changing
            platforms. Live prices match Plans &amp; Pricing in the admin dashboard.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={portalHref('create')} className="btn-primary">
              Create school →
            </a>
            <Link href="/contact" className="btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
      </DesignBand>

      <PricingPlans />

      <DesignBand variant="aurora" className="py-20" waves={false}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">Not sure which plan fits?</h2>
          <p className="mt-4 text-muted">
            Tell us your institution type, campuses, and enrolment — we’ll map seats and engines to a
            clear package.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Contact us
            </Link>
            <a href={portalHref('signin')} className="btn-ghost">
              Sign in to manage billing
            </a>
          </div>
        </div>
      </DesignBand>
    </>
  );
}
