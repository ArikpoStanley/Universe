'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { studentCapacityLabel, type PlanFeatureState, type PublicPlan, type PublicPlanCatalog } from '@/lib/plans';

const STATE_CELL: Record<PlanFeatureState, { symbol: string; label: string; className: string }> = {
  included: { symbol: '✓', label: 'Included', className: 'text-ok' },
  not_included: { symbol: '—', label: 'Not included', className: 'text-muted' },
  addon: { symbol: '+', label: 'Available as add-on', className: 'text-accent' },
  custom: { symbol: '★', label: 'Custom / on request', className: 'text-accent-soft' },
};

function money(amount: number | null, currency: string) {
  if (amount == null) return null;
  try {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

const periodWord = (billingPeriod: string) => (billingPeriod === 'semester' ? 'semester' : 'term');

/** A session = 3 terms (2 semesters), less the plan's annual discount. */
function sessionPrice(plan: PublicPlan) {
  const base = plan.effectivePrice ?? plan.price;
  if (base == null) return null;
  const periods = plan.billingPeriod === 'semester' ? 2 : 3;
  return Math.round(base * periods * (1 - plan.annualDiscountPercent / 100));
}

export function PlansExplorer({ data }: { data: PublicPlanCatalog }) {
  const [catalog, setCatalog] = useState(data.catalogs[0]?.catalog ?? '');
  const [cycle, setCycle] = useState<'term' | 'session'>('term');
  const current = data.catalogs.find((entry) => entry.catalog === catalog) ?? data.catalogs[0];
  const plans = current?.plans ?? [];
  const maxDiscount = Math.max(0, ...plans.map((plan) => plan.annualDiscountPercent));

  /** Feature rows grouped by section, in the order they first appear across plans. */
  const groups = useMemo(() => {
    const order: string[] = [];
    const rows = new Map<string, Map<string, string>>();
    for (const plan of plans) {
      for (const feature of plan.features) {
        if (!rows.has(feature.group)) {
          rows.set(feature.group, new Map());
          order.push(feature.group);
        }
        rows.get(feature.group)!.set(feature.key, feature.label);
      }
    }
    return order.map((group) => ({ group, features: Array.from(rows.get(group)!.entries()) }));
  }, [plans]);

  const addons = data.addons.filter((addon) => !addon.catalogs.length || addon.catalogs.includes(catalog));
  const featured = plans.length >= 3 ? 1 : -1;

  return (
    <div className="-mt-4 space-y-14">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Institution type">
          {data.catalogs.map((entry) => (
            <button
              key={entry.catalog}
              type="button"
              role="tab"
              aria-selected={entry.catalog === current?.catalog}
              onClick={() => setCatalog(entry.catalog)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                entry.catalog === current?.catalog
                  ? 'border-accent bg-accent text-white'
                  : 'border-line bg-surface text-muted hover:text-foreground'
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <div className="inline-flex rounded-full border border-line bg-surface p-1 text-sm" role="radiogroup" aria-label="Billing">
          {(['term', 'session'] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={cycle === value}
              onClick={() => setCycle(value)}
              className={`rounded-full px-4 py-1.5 font-medium transition ${
                cycle === value ? 'bg-foreground text-background' : 'text-muted hover:text-foreground'
              }`}
            >
              {value === 'term' ? 'Per term' : `Per session${maxDiscount ? ` · save up to ${maxDiscount}%` : ''}`}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-5 sm:grid-cols-2 ${plans.length >= 4 ? 'lg:grid-cols-4' : plans.length === 3 ? 'lg:grid-cols-3' : ''}`}>
        {plans.map((plan, index) => {
          const termPrice = plan.effectivePrice ?? plan.price;
          const shown = cycle === 'term' ? termPrice : sessionPrice(plan);
          const formatted = money(shown, plan.currency);
          const highlights = plan.features.filter((feature) => feature.state === 'included').slice(0, 6);
          return (
            <article
              key={plan.level}
              className={`relative flex min-w-0 flex-col rounded-3xl border bg-surface p-6 shadow-sm ${
                index === featured ? 'border-accent ring-2 ring-accent/30' : 'border-line'
              }`}
            >
              {index === featured ? (
                <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Most popular
                </span>
              ) : null}
              <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
              {plan.tagline ? <p className="mt-1 text-sm text-muted">{plan.tagline}</p> : null}
              <div className="mt-6">
                {formatted ? (
                  <>
                    <span className="text-3xl font-bold tracking-tight xl:text-4xl">{formatted}</span>
                    <span className="ml-1 text-sm text-muted">
                      / {cycle === 'term' ? periodWord(plan.billingPeriod) : 'session'}
                    </span>
                    {plan.promo && cycle === 'term' && plan.price != null && plan.effectivePrice !== plan.price ? (
                      <p className="mt-1 text-sm">
                        <span className="text-muted line-through">{money(plan.price, plan.currency)}</span>{' '}
                        <span className="font-semibold text-ok">{plan.promo.label ?? `${plan.promo.percentOff}% off`}</span>
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <span className="text-3xl font-bold tracking-tight">Custom</span>
                    <p className="mt-1 text-sm text-muted">Contact Universe for a quote</p>
                  </>
                )}
                <p className="mt-3 inline-flex rounded-full bg-accent/10 px-3 py-1 text-sm font-semibold text-accent-soft">
                  {studentCapacityLabel(plan.maxStudents ?? null, plans)}
                </p>
              </div>
              {plan.description ? <p className="mt-4 text-sm text-muted">{plan.description}</p> : null}
              <ul className="mt-6 flex-1 space-y-2 text-sm">
                {highlights.map((feature) => (
                  <li key={feature.key} className="flex gap-2">
                    <span className="text-ok">✓</span>
                    <span>{feature.label}</span>
                  </li>
                ))}
                <li className="flex gap-2 text-muted">
                  <span>•</span>
                  <span>
                    {plan.supportLevel} support{plan.storageGb ? ` · ${plan.storageGb} GB storage` : ''}
                  </span>
                </li>
              </ul>
              <Link
                href="/contact"
                className={`mt-8 inline-flex justify-center rounded-full px-5 py-3 text-sm font-semibold transition ${
                  index === featured
                    ? 'bg-accent text-white hover:bg-accent-deep'
                    : 'border border-line hover:border-accent hover:text-accent'
                }`}
              >
                {formatted ? `Choose ${plan.name}` : 'Talk to us'}
              </Link>
            </article>
          );
        })}
      </div>

      {data.portalLevy ? (
        <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-line bg-surface p-7 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Separate student portal levy</p>
          <p className="mt-2 font-display text-3xl font-bold">
            {money(data.portalLevy.amount, data.portalLevy.currency)}{' '}
            <span className="text-base font-medium text-muted">/ active student / term</span>
          </p>
          <p className="mt-2 text-sm text-muted">
            Charged separately from the institutional subscription and collected through the school&apos;s fee structure.
            Your plan sets how many active students you can have; it never includes or replaces the levy.
          </p>
        </div>
      ) : null}

      {groups.length ? (
        <div>
          <h2 className="mb-2 text-center font-display text-3xl font-bold">Compare plans</h2>
          <p className="mb-8 text-center text-sm text-muted">
            ✓ included · + available as an add-on · ★ custom / on request · — not included
          </p>
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th className="sticky left-0 bg-surface px-5 py-4 font-semibold">Feature</th>
                  {plans.map((plan) => (
                    <th key={plan.level} className="px-5 py-4 text-center font-semibold">
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className="sticky left-0 bg-surface px-5 py-3 text-muted">Price per {cycle === 'term' ? 'term' : 'session'}</td>
                  {plans.map((plan) => (
                    <td key={plan.level} className="px-5 py-3 text-center font-semibold">
                      {money(cycle === 'term' ? plan.effectivePrice ?? plan.price : sessionPrice(plan), plan.currency) ?? 'Custom'}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-line">
                  <td className="sticky left-0 bg-surface px-5 py-3 text-muted">Active students</td>
                  {plans.map((plan) => (
                    <td key={plan.level} className="px-5 py-3 text-center font-semibold">
                      {studentCapacityLabel(plan.maxStudents ?? null, plans)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-line">
                  <td className="sticky left-0 bg-surface px-5 py-3 text-muted">Support</td>
                  {plans.map((plan) => (
                    <td key={plan.level} className="px-5 py-3 text-center capitalize">
                      {plan.supportLevel}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-line">
                  <td className="sticky left-0 bg-surface px-5 py-3 text-muted">Storage</td>
                  {plans.map((plan) => (
                    <td key={plan.level} className="px-5 py-3 text-center">
                      {plan.storageGb ? `${plan.storageGb} GB` : 'Custom'}
                    </td>
                  ))}
                </tr>
                {groups.map(({ group, features }) => (
                  <GroupRows key={group} group={group} features={features} plans={plans} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {addons.length ? (
        <div>
          <h2 className="mb-8 text-center font-display text-3xl font-bold">Add-ons</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {addons.map((addon) => (
              <div key={addon.name} className="rounded-2xl border border-line bg-surface p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-semibold">{addon.name}</h3>
                  <span className="whitespace-nowrap text-sm font-semibold text-accent">
                    {money(addon.price, addon.currency) ?? 'On request'}
                    {addon.price != null && addon.unit ? <span className="font-normal text-muted"> / {addon.unit}</span> : null}
                  </span>
                </div>
                {addon.description ? <p className="mt-2 text-sm text-muted">{addon.description}</p> : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="rounded-3xl border border-line bg-card p-8 text-center">
        <h2 className="font-display text-2xl font-bold">Not sure which plan fits?</h2>
        <p className="mx-auto mt-2 max-w-xl text-muted">
          Tell us about your institution and we&apos;ll recommend a plan — including custom pricing for groups of schools.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-deep"
        >
          Contact sales
        </Link>
      </div>
    </div>
  );
}

function GroupRows({
  group,
  features,
  plans,
}: {
  group: string;
  features: Array<[string, string]>;
  plans: PublicPlan[];
}) {
  return (
    <>
      <tr className="border-b border-line bg-card/60">
        <td colSpan={plans.length + 1} className="px-5 py-2 text-xs font-semibold uppercase tracking-wider text-muted">
          {group}
        </td>
      </tr>
      {features.map(([key, label]) => (
        <tr key={key} className="border-b border-line last:border-0">
          <td className="sticky left-0 bg-surface px-5 py-3">{label}</td>
          {plans.map((plan) => {
            const feature = plan.features.find((entry) => entry.key === key);
            const cell = STATE_CELL[feature?.state ?? 'not_included'];
            return (
              <td key={plan.level} className="px-5 py-3 text-center" title={feature?.note ?? cell.label}>
                <span className={`text-base font-semibold ${cell.className}`} aria-label={cell.label}>
                  {cell.symbol}
                </span>
                {feature?.note ? <span className="block text-xs text-muted">{feature.note}</span> : null}
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
