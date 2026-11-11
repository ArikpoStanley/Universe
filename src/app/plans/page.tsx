import type { Metadata } from 'next';
import Link from 'next/link';
import { DesignBand } from '@/components/DesignBand';
import { PlansExplorer } from '@/components/PlansExplorer';
import { fetchPlans } from '@/lib/plans';

export const metadata: Metadata = {
  title: 'Plans & Pricing',
  description:
    'Compare Universe plans for nursery & primary, secondary, and tertiary institutions — features, support, storage, and add-ons side by side.',
};

export default async function PlansPage() {
  const data = await fetchPlans();

  return (
    <div>
      <DesignBand className="pb-12 pt-16 md:pb-16 md:pt-20" trails waves>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
              Plans &amp; pricing
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent" />
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight md:text-6xl">
            One platform, a plan for every school.
          </h1>
          <p className="mt-5 text-base text-muted md:text-lg">
            Choose your institution type, compare what each plan includes, and pick the one that fits. Prices are per
            school, billed per term or per session.
          </p>
        </div>
      </DesignBand>

      <section className="mx-auto w-full max-w-6xl px-5 pb-24 md:px-8">
        {data && data.catalogs.length > 0 ? (
          <PlansExplorer data={data} />
        ) : (
          <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-line bg-surface p-8 text-center">
            <h2 className="font-display text-2xl font-bold">Plans are loading soon</h2>
            <p className="mt-3 text-muted">
              We couldn&apos;t load the latest plans right now. Contact us and we&apos;ll send you current pricing for your
              institution.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-deep"
            >
              Contact sales
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
