import { getApiOrigin } from './portal';

export type PlanFeatureState = 'included' | 'not_included' | 'addon' | 'custom';

export type PublicPlan = {
  level: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price: number | null;
  effectivePrice: number | null;
  currency: string;
  billingPeriod: string;
  supportLevel: string;
  storageGb: number | null;
  /** Most active students allowed; null = no fixed cap (Enterprise). */
  maxStudents: number | null;
  annualDiscountPercent: number;
  promo: { label: string | null; percentOff: number; endsAt: string | null } | null;
  features: Array<{ key: string; label: string; group: string; state: PlanFeatureState; note: string | null }>;
};

export type PublicPlanCatalog = {
  catalogs: Array<{ catalog: string; label: string; plans: PublicPlan[] }>;
  addons: Array<{
    name: string;
    description: string | null;
    price: number | null;
    currency: string;
    unit: string;
    catalogs: string[];
  }>;
  portalLevy?: { amount: number; currency: string; per: string };
};

/** Pass the plan list so an uncapped plan reads "Above <largest cap> students". */
export function studentCapacityLabel(maxStudents: number | null, plans: Array<{ maxStudents: number | null }> = []) {
  if (maxStudents != null) return `Up to ${maxStudents.toLocaleString('en-NG')} students`;
  const largest = Math.max(0, ...plans.map((plan) => plan.maxStudents ?? 0));
  return largest ? `Above ${largest.toLocaleString('en-NG')} students` : 'No fixed student limit';
}

/** Live plans from the Universe API; null when the API is unreachable. */
export async function fetchPlans(): Promise<PublicPlanCatalog | null> {
  try {
    const res = await fetch(`${getApiOrigin()}/api/v1/public/plans`, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return (await res.json()) as PublicPlanCatalog;
  } catch {
    return null;
  }
}
