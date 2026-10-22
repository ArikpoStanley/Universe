import type { Metadata } from 'next';
import { SkinLanding } from '@/components/SkinLanding';
import { PortalShowcase } from '@/components/PortalShowcase';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Universe — one platform for nursery, primary, secondary, and tertiary institutions.',
};

export default function HomePage() {
  return (
    <>
      <SkinLanding />
      <PortalShowcase />
    </>
  );
}
