'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { skins, type SkinId, type WebsiteSkin } from '@/lib/skins';
import { SiteAtmosphere } from '@/components/SiteAtmosphere';

const STORAGE_KEY = 'universe_site_skin';

type SkinContextValue = {
  skin: SkinId;
  skinConfig: WebsiteSkin;
  setSkin: (skin: SkinId) => void;
  cycleSkin: () => void;
};

const SkinContext = createContext<SkinContextValue | null>(null);

function skinToVars(skin: WebsiteSkin): CSSProperties {
  return {
    '--accent': skin.vars.accent,
    '--accent-soft': skin.vars.accentSoft,
    '--accent-deep': skin.vars.accentDeep,
    '--ok': skin.vars.ok,
    '--background': skin.vars.background,
    '--surface': skin.vars.surface,
    '--card': skin.vars.card,
    '--line': skin.vars.line,
    '--muted': skin.vars.muted,
  } as CSSProperties;
}

export function SkinProvider({ children }: { children: ReactNode }) {
  const [skin, setSkinState] = useState<SkinId>('primary');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as SkinId | null;
      if (saved && skins[saved]) setSkinState(saved);
    } catch {
      // ignore storage failures
    }
  }, []);

  const setSkin = useCallback((next: SkinId) => {
    setSkinState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage failures
    }
  }, []);

  const cycleSkin = useCallback(() => {
    setSkinState((current) => {
      const order: SkinId[] = ['nursery', 'primary', 'secondary', 'tertiary'];
      const index = order.indexOf(current);
      return order[(index + 1) % order.length] ?? 'primary';
    });
  }, []);

  const value = useMemo<SkinContextValue>(
    () => ({ skin, skinConfig: skins[skin], setSkin, cycleSkin }),
    [cycleSkin, setSkin, skin],
  );

  return (
    <SkinContext.Provider value={value}>
      <div
        className="relative isolate min-h-screen bg-transparent"
        style={skinToVars(skins[skin])}
        data-skin={skin}
      >
        <SiteAtmosphere skinConfig={skins[skin]} />
        <div className="relative z-0">{children}</div>
      </div>
    </SkinContext.Provider>
  );
}

export function useSkin(): SkinContextValue {
  const context = useContext(SkinContext);
  if (!context) throw new Error('useSkin must be used within SkinProvider.');
  return context;
}
