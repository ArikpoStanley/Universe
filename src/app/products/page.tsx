import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Product',
  description:
    'Attendance, assessment, results, finance, and messaging — one Universe platform for every institution tier.',
};

export default function ProductsPage() {
  return <CmsPage slug="products" />;
}
