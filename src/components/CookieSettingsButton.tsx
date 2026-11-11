'use client';

import { openCookieSettings } from '@/lib/legal';

export function CookieSettingsButton({ variant = 'button' }: { variant?: 'button' | 'link' }) {
  if (variant === 'link') {
    return (
      <button type="button" onClick={openCookieSettings} className="text-sm text-muted transition-colors hover:text-accent-soft">
        Cookie settings
      </button>
    );
  }
  return (
    <button type="button" onClick={openCookieSettings} className="btn-ghost">
      Change cookie settings
    </button>
  );
}
