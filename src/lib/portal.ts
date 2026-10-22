export function getPortalOrigin() {
  return (process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:3000').replace(/\/$/, '');
}

export function getApiOrigin() {
  return (
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_ORIGIN ||
    'http://localhost:4000'
  ).replace(/\/$/, '');
}

/** Deep-links into the Universe portal for create-school / sign-in flows. */
export function portalHref(intent: 'create' | 'signin' = 'signin') {
  const origin = getPortalOrigin();
  if (intent === 'create') return `${origin}/login?createSchool=1`;
  return `${origin}/login`;
}

/** Resolve CMS CTA hrefs — `portal:create` / `portal:signin` → live portal URLs. */
export function resolveCtaHref(href: string, label?: string) {
  if (href === 'portal:create' || /create school/i.test(label || '')) {
    return portalHref('create');
  }
  if (href === 'portal:signin' || /^sign[\s-]?in$/i.test(label || '')) {
    return portalHref('signin');
  }
  return href;
}
