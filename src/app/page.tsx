import type { Metadata } from 'next';
import { SkinLanding } from '@/components/SkinLanding';
import { AcademicsTechBridge } from '@/components/AcademicsTechBridge';
import { SiteDepthSections } from '@/components/SiteDepthSections';
import { PortalShowcase } from '@/components/PortalShowcase';
import { Directory } from '@/components/Directory';
import { fetchInstitutions } from '@/lib/institutions';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Universe — one platform for nursery, primary, secondary, and tertiary institutions. Academics in the room. Technology that runs the school.',
};

export default async function HomePage() {
  const schools = await fetchInstitutions();

  return (
    <>
      <SkinLanding />
      <AcademicsTechBridge />
      <Directory
        schools={schools}
        heading={{
          kicker: 'Institutions directory',
          title: 'Find a school near you.',
          body: 'Search every active institution by name, city, state, or country — then filter by type to find the right fit for your child or family.',
        }}
      />
      <SiteDepthSections />
      <PortalShowcase />
    </>
  );
}
