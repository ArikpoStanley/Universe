/** Must match the portal/backend CURRENT_LEGAL_VERSION when Terms or Privacy change materially. */
export const LEGAL_VERSION = '2026-10-20';
export const COOKIE_POLICY_VERSION = '2026-11-11';
export const LEGAL_CONTACT_EMAIL = 'hello@universe.school';

export const LEGAL_LINKS = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/cookies' },
] as const;

export type CookieConsent = 'accepted' | 'rejected';

export const COOKIE_CONSENT_NAME = 'universe_cookie_consent';
export const OPEN_COOKIE_SETTINGS_EVENT = 'universe:open-cookie-settings';
export const COOKIE_CONSENT_CHANGED_EVENT = 'universe:cookie-consent';

/** The visitor's choice for the current cookie policy version, or null if they have not chosen yet. */
export function readCookieConsent(): CookieConsent | null {
  if (typeof document === 'undefined') return null;
  const raw = document.cookie
    .split('; ')
    .find((part) => part.startsWith(`${COOKIE_CONSENT_NAME}=`))
    ?.split('=')[1];
  if (!raw) return null;
  const [choice, version] = decodeURIComponent(raw).split(':');
  if (version !== COOKIE_POLICY_VERSION) return null;
  return choice === 'accepted' || choice === 'rejected' ? choice : null;
}

export function writeCookieConsent(choice: CookieConsent) {
  const value = encodeURIComponent(`${choice}:${COOKIE_POLICY_VERSION}`);
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${COOKIE_CONSENT_NAME}=${value}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_CHANGED_EVENT, { detail: choice }));
}

/** Analytics or marketing scripts must only load when this returns true. */
export function hasOptionalCookieConsent() {
  return readCookieConsent() === 'accepted';
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT));
}
