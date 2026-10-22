'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { DesignBand } from '@/components/DesignBand';
import { portalHref } from '@/lib/portal';
import {
  CYCLE_LABEL,
  CYCLE_ORDER,
  CYCLE_PERIOD,
  fetchPublicPlans,
  formatNgn,
  planAmountForCycle,
  type BillingCycle,
  type PlansResponse,
  type PublicPlan,
} from '@/lib/plans';

function PlanCard({
  plan,
  cycle,
  currency,
  highlighted,
  reduce,
}: {
  plan: PublicPlan;
  cycle: BillingCycle;
  currency: string;
  highlighted: boolean;
  reduce: boolean | null;
}) {
  const isTrial = plan.key === 'trial';
  const amount = isTrial ? null : planAmountForCycle(plan, cycle);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex h-full flex-col rounded-3xl border p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 ${
        highlighted
          ? 'border-accent bg-gradient-to-b from-accent/20 to-card/70 shadow-[0_24px_70px_-24px_rgb(var(--accent)/0.5)]'
          : 'border-line bg-card/55 hover:border-accent/50'
      }`}
    >
      {highlighted ? (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-accent-deep via-accent to-accent-soft px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
          Most popular
        </span>
      ) : null}

      <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-accent-soft">
        Up to {plan.seatLimit.toLocaleString()} users
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold">{plan.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{plan.description}</p>

      <div className="mt-6 border-t border-line/60 pt-5">
        {isTrial ? (
          <>
            <span className="font-display text-3xl font-bold text-accent-soft">Free</span>
            <p className="mt-1 text-xs text-muted">Full access during trial</p>
          </>
        ) : (
          <>
            <span className="font-display text-3xl font-bold text-accent-soft">
              {formatNgn(currency, amount)}
            </span>
            <p className="mt-1 text-xs text-muted">/ {CYCLE_PERIOD[cycle]}</p>
          </>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft" />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        {isTrial || plan.key === 'standard' || plan.key === 'campus' ? (
          <a href={portalHref('create')} className="btn-primary w-full">
            {isTrial ? 'Start free trial' : 'Create school'}
          </a>
        ) : (
          <Link href="/contact" className="btn-ghost w-full">
            Talk to sales
          </Link>
        )}
      </div>
    </motion.div>
  );
}

/**
 * Live plans & pricing from `/api/v1/subscriptions/plans` —
 * same catalog as the admin Plans & Pricing dashboard.
 */
export function PricingPlans() {
  const reduce = useReducedMotion();
  const [data, setData] = useState<PlansResponse | null>(null);
  const [cycle, setCycle] = useState<BillingCycle>('monthly');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const plans = await fetchPublicPlans();
      if (!cancelled) {
        setData(plans);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const paidAndTrial = useMemo(() => data?.plans ?? [], [data]);
  const discount = data?.cycleDiscounts?.[cycle] ?? 0;
  const currency = data?.currency ?? 'NGN';

  return (
    <DesignBand className="py-16 md:py-20" trails waves>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.35em] text-accent-soft">
          Same plans as your admin dashboard
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
          Standard, Campus, and Enterprise
        </h2>
        <p className="mt-4 text-muted md:text-lg">
          From ₦{(data?.minMonthlyAmount ?? 50_000).toLocaleString()}/month. Prepaid cycles save vs
          paying month-to-month
          {data?.fullYearDiscount ? ` — up to ${data.fullYearDiscount}% on annual` : ''}.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {CYCLE_ORDER.map((c) => {
          const active = c === cycle;
          const pct = data?.cycleDiscounts?.[c] ?? 0;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCycle(c)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                active
                  ? 'border-accent bg-accent text-white'
                  : 'border-line bg-card/60 text-muted hover:border-accent/50 hover:text-foreground'
              }`}
            >
              {CYCLE_LABEL[c]}
              {pct > 0 ? (
                <span className={`ml-1 ${active ? 'opacity-90' : 'text-ok'}`}>−{pct}%</span>
              ) : null}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-muted">
        {cycle === 'monthly'
          ? 'Pay month-to-month at full price.'
          : cycle === 'term'
            ? `Per-term billing saves ${discount}% — exact charge follows your school’s term dates (example shown for 3 months).`
            : `${CYCLE_LABEL[cycle]} billing saves ${discount}% vs paying monthly.`}
      </p>

      {loading && !data ? (
        <p className="mt-16 text-center text-sm text-muted">Loading plans…</p>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {paidAndTrial.map((plan) => (
            <PlanCard
              key={plan.key}
              plan={plan}
              cycle={cycle}
              currency={currency}
              highlighted={plan.key === 'campus'}
              reduce={reduce}
            />
          ))}
        </div>
      )}

      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">
        Prices shown in {currency}. Seat add-ons and term dates are configured in your school’s Plans
        &amp; Pricing settings after you create a tenant.
      </p>
    </DesignBand>
  );
}
