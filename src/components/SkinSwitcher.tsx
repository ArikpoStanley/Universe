'use client';

import { SKIN_ORDER, skins } from '@/lib/skins';
import { useSkin } from './SkinProvider';

export function SkinSwitcher() {
  const { skin, setSkin } = useSkin();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-line bg-card p-1"
      role="tablist"
      aria-label="Institution type"
    >
      {SKIN_ORDER.map((id) => {
        const active = skin === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setSkin(id)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
              active ? 'text-white' : 'text-muted hover:text-foreground'
            }`}
            style={active ? { background: 'rgb(var(--accent))', color: '#fff' } : undefined}
          >
            {skins[id].label}
          </button>
        );
      })}
    </div>
  );
}
