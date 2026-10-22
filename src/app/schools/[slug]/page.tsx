import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchInstitution } from '@/lib/institutions';
import { SchoolProfile } from '@/components/SchoolProfile';

export const metadata: Metadata = {
  title: 'School profile',
  description: 'View school details and apply for admission.',
};

export default async function SchoolProfilePage({ params }: { params: { slug: string } }) {
  const data = await fetchInstitution(params.slug);
  if (!data) notFound();
  return <SchoolProfile data={data} />;
}
