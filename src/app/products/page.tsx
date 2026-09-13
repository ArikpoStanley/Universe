import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Mortgage Infrastructure-as-a-Service: white-label solutions, mortgage widgets, community platforms, and data-driven analytics.',
};

export default function ProductsPage() {
  return <CmsPage slug="products" />;
}
