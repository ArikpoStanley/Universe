import {
  Banknote,
  BarChart3,
  Blocks,
  Building2,
  Code2,
  Compass,
  Handshake,
  Home,
  Landmark,
  Lock,
  Network,
  Package,
  Palette,
  PiggyBank,
  Scale,
  ShieldCheck,
  Smartphone,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  LucideIcon,
} from 'lucide-react';

const MAP: Record<string, LucideIcon> = {
  Home,
  Banknote,
  PiggyBank,
  TrendingUp,
  Package,
  Building2,
  Landmark,
  Users,
  Wrench,
  Network,
  Smartphone,
  Palette,
  Blocks,
  BarChart3,
  ShieldCheck,
  Lock,
  Scale,
  Code2,
  Compass,
  Handshake,
};

export function CmsIcon({ name, className }: { name?: string; className?: string }) {
  const Icon = (name && MAP[name]) || Sparkles;
  return <Icon className={className} strokeWidth={1.6} />;
}
