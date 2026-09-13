import { notFound } from 'next/navigation';
import { getBootstrap } from '@/lib/api';
import { SectionRenderer } from './sections/SectionRenderer';

export async function CmsPage({
  slug,
  compactHero = true,
}: {
  slug: string;
  compactHero?: boolean;
}) {
  const data = await getBootstrap();
  const page = data.pages.find((p) => p.slug === slug);
  if (!page) notFound();
  return <SectionRenderer sections={page.sections} data={data} compactHero={compactHero} />;
}
