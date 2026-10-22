import { getApiOrigin } from './portal';

export type InstitutionType =
  | 'nursery'
  | 'primary'
  | 'secondary'
  | 'college'
  | 'university'
  | 'polytechnic'
  | 'training';

export type PublicInstitution = {
  id: string;
  name: string;
  slug: string;
  type: InstitutionType;
  status?: string | null;
  logoUrl?: string | null;
  primaryColor?: string | null;
  secondaryColor?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  physicalAddress?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
};

export type PublicClass = { id: string; name: string; level?: string | null };

export type PublicInstitutionDetail = {
  institution: PublicInstitution;
  classes: PublicClass[];
  entranceTest: unknown;
};

function apiBase() {
  return getApiOrigin();
}

/** List active institutions for the public directory, optionally filtered by type. */
export async function fetchInstitutions(types?: string[]): Promise<PublicInstitution[]> {
  const query = types && types.length ? `?types=${encodeURIComponent(types.join(','))}` : '';
  const res = await fetch(`${apiBase()}/api/v1/public/institutions${query}`, {
    cache: 'no-store',
  });
  if (!res.ok) return [];
  return (await res.json()) as PublicInstitution[];
}

/** Fetch a single school profile (classes + entrance test included). */
export async function fetchInstitution(slug: string): Promise<PublicInstitutionDetail | null> {
  const res = await fetch(
    `${apiBase()}/api/v1/public/institutions/${encodeURIComponent(slug)}`,
    { cache: 'no-store' },
  );
  if (!res.ok) return null;
  return (await res.json()) as PublicInstitutionDetail;
}
