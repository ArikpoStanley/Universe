/** Mirrors Universe Backend `plan-catalog` defaults for marketing fallback. */

export type BillingCycle =
  | 'monthly'
  | 'quarterly'
  | 'tri_annual'
  | 'bi_annual'
  | 'term'
  | 'annual';

export type PlanKey = 'trial' | 'standard' | 'campus' | 'enterprise';

export type PublicPlan = {
  key: PlanKey;
  name: string;
  description: string;
  features: string[];
  seatLimit: number;
  amountMonthly?: number;
  amountQuarterly?: number;
  amountTriAnnual?: number;
  amountBiAnnual?: number;
  amountTerm?: number;
  amountTermMonths?: number;
  amountAnnual?: number;
};

export type PlansResponse = {
  signupEnabled: boolean;
  signupRequiresPayment: boolean;
  trialDays: number;
  currency: string;
  minMonthlyAmount: number;
  cycleDiscounts: Record<BillingCycle, number>;
  fullYearDiscount: number;
  plans: PublicPlan[];
};

export const CYCLE_ORDER: BillingCycle[] = [
  'monthly',
  'quarterly',
  'tri_annual',
  'bi_annual',
  'term',
  'annual',
];

export const CYCLE_LABEL: Record<BillingCycle, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  tri_annual: 'Tri-annual',
  bi_annual: 'Bi-annual',
  term: 'Per term',
  annual: 'Annual',
};

export const CYCLE_PERIOD: Record<BillingCycle, string> = {
  monthly: 'month',
  quarterly: 'quarter',
  tri_annual: '4 months',
  bi_annual: '6 months',
  term: 'term (≈3 mo)',
  annual: 'year',
};

const FEATURES: Record<PlanKey, string[]> = {
  trial: [
    'Full platform access for 14 days',
    'Up to 50 users',
    'Admissions, classes & subjects',
    'Fee billing & payment collection',
    'Staff & payroll basics',
    'Email support',
  ],
  standard: [
    'Up to 500 users',
    'Full academics (admissions, classes, subjects, grading)',
    'Finance: fee billing, invoicing & payment collection',
    'HR & payroll',
    'Transport, messaging & notifications',
    'Email support',
  ],
  campus: [
    'Up to 2,000 users',
    'Everything in Standard',
    'Term & quarterly billing flexibility',
    'Advanced analytics & reporting',
    'Custom domain',
    'Priority support',
  ],
  enterprise: [
    'Up to 10,000 users',
    'Everything in Campus',
    'Unlimited scale',
    'Custom domain & SSO',
    'API access & integrations',
    'Dedicated account manager',
  ],
};

/** Static fallback matching backend DEFAULT_PLAN_PRICES + CYCLE_DISCOUNT. */
export function fallbackPlansResponse(): PlansResponse {
  const standard = 50_000;
  const campus = 90_000;
  const enterprise = 150_000;
  const quote = (monthly: number, months: number, discount: number) =>
    Math.max(monthly, Math.round(monthly * months * (1 - discount)));

  const paid = (
    key: Exclude<PlanKey, 'trial'>,
    name: string,
    description: string,
    monthly: number,
    seats: number,
  ): PublicPlan => ({
    key,
    name,
    description,
    features: FEATURES[key],
    seatLimit: seats,
    amountMonthly: monthly,
    amountQuarterly: quote(monthly, 3, 0.05),
    amountTriAnnual: quote(monthly, 4, 0.06),
    amountBiAnnual: quote(monthly, 6, 0.07),
    amountTerm: quote(monthly, 3, 0.05),
    amountTermMonths: 3,
    amountAnnual: quote(monthly, 12, 0.08),
  });

  return {
    signupEnabled: true,
    signupRequiresPayment: true,
    trialDays: 14,
    currency: 'NGN',
    minMonthlyAmount: 50_000,
    cycleDiscounts: {
      monthly: 0,
      quarterly: 5,
      tri_annual: 6,
      bi_annual: 7,
      term: 5,
      annual: 8,
    },
    fullYearDiscount: 8,
    plans: [
      {
        key: 'trial',
        name: 'Free Trial',
        description: '14-day trial with full platform access.',
        features: FEATURES.trial,
        seatLimit: 50,
      },
      paid(
        'standard',
        'Standard',
        'For growing schools with up to 500 users. From ₦50,000/month.',
        standard,
        500,
      ),
      paid(
        'campus',
        'Campus',
        'For large secondary and small tertiary schools up to 2,000 users.',
        campus,
        2000,
      ),
      paid(
        'enterprise',
        'Enterprise',
        'Unlimited scale, custom domain, and priority support.',
        enterprise,
        10000,
      ),
    ],
  };
}

export function planAmountForCycle(plan: PublicPlan, cycle: BillingCycle): number | null {
  switch (cycle) {
    case 'monthly':
      return plan.amountMonthly ?? null;
    case 'quarterly':
      return plan.amountQuarterly ?? null;
    case 'tri_annual':
      return plan.amountTriAnnual ?? null;
    case 'bi_annual':
      return plan.amountBiAnnual ?? null;
    case 'term':
      return plan.amountTerm ?? null;
    case 'annual':
      return plan.amountAnnual ?? null;
    default:
      return plan.amountMonthly ?? null;
  }
}

export function formatNgn(currency: string, amount: number | null | undefined) {
  if (amount == null) return '—';
  const symbol = currency === 'NGN' || currency === '₦' ? '₦' : `${currency} `;
  return `${symbol}${amount.toLocaleString()}`;
}

export async function fetchPublicPlans(): Promise<PlansResponse> {
  try {
    const res = await fetch('/api/v1/subscriptions/plans', { cache: 'no-store' });
    if (!res.ok) return fallbackPlansResponse();
    const data = (await res.json()) as PlansResponse;
    if (!data?.plans?.length) return fallbackPlansResponse();
    return {
      ...fallbackPlansResponse(),
      ...data,
      currency: data.currency || 'NGN',
      cycleDiscounts: data.cycleDiscounts ?? fallbackPlansResponse().cycleDiscounts,
      plans: data.plans.map((p) => ({
        ...p,
        features: p.features?.length ? p.features : FEATURES[p.key] ?? [],
      })),
    };
  } catch {
    return fallbackPlansResponse();
  }
}
