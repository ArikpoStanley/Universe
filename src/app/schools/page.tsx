import type { Metadata } from 'next';
import { fetchInstitutions } from '@/lib/institutions';
import { Directory } from '@/components/Directory';
import { DirectoryHero } from '@/components/DirectoryHero';

export const metadata: Metadata = {
  title: 'Institutions',
  description: 'Browse every active school on Universe — nursery, primary, secondary and tertiary — and apply for admission online.',
};

export default async function SchoolsPage() {
  const schools = await fetchInstitutions();

  return (
    <div>
      <DirectoryHero />
      <Directory schools={schools} />
    </div>
  );
}
