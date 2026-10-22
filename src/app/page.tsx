import type { Metadata } from 'next';
import { SkinLanding } from '@/components/SkinLanding';
import { AcademicsTechBridge } from '@/components/AcademicsTechBridge';
import { PortalShowcase } from '@/components/PortalShowcase';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Universe — one platform for nursery, primary, secondary, and tertiary institutions. Academics in the room. Technology that runs the school.',
};

export default function HomePage() {
  return (
    <>
      <SkinLanding />
      <AcademicsTechBridge />
      <PortalShowcase />
    </>
  );
}
