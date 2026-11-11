import type { BootstrapData } from './types';
import fallback from '@/content/defaults.json';

function apiBase() {
  return (
    process.env.API_INTERNAL_URL ||
    process.env.API_ORIGIN ||
    process.env.NEXT_PUBLIC_API_URL ||
    'http://localhost:4000'
  ).replace(/\/$/, '');
}

const fallbackData = fallback as unknown as BootstrapData;

/**
 * Fetches marketing site content from the Universe API.
 * Falls back to bundled defaults when the API is unreachable.
 */
export async function getBootstrap(): Promise<BootstrapData> {
  try {
    const res = await fetch(`${apiBase()}/api/v1/public/marketing/bootstrap`, {
      next: { revalidate: 20 },
    });
    if (!res.ok) throw new Error(`Marketing API responded ${res.status}`);
    return (await res.json()) as BootstrapData;
  } catch {
    return fallbackData;
  }
}
