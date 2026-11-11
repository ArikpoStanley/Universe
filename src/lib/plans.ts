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
};

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
