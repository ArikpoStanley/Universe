import type { BootstrapData, PageData } from './types';
import fallback from '@/content/defaults.json';

const API =
  process.env.API_INTERNAL_URL || process.env.API_ORIGIN || 'http://localhost:4000';

const fallbackData = fallback as unknown as BootstrapData;

/**
 * Fetches the full public content payload from the NestJS CMS.
 * Falls back to the bundled seed content if the API is unreachable,
 * so the site always renders.
 */
export async function getBootstrap(): Promise<BootstrapData> {
  try {
    const res = await fetch(`${API}/api/public/bootstrap`, {
      next: { revalidate: 20 },
    });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    return (await res.json()) as BootstrapData;
  } catch {
    return fallbackData;
  }
}

export async function getPage(slug: string): Promise<PageData> {
  try {
    const res = await fetch(`${API}/api/public/pages/${slug}`, {
      next: { revalidate: 20 },
    });
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    return (await res.json()) as PageData;
  } catch {
    const page = fallbackData.pages.find((p) => p.slug === slug);
    if (page) return page;
    return { slug, title: 'Spring', description: '', sections: [] };
  }
}
