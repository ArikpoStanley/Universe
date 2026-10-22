import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Plans that grow with your school — seats, campuses, and the engines you need.',
};

export default function PricingPage() {
  return <CmsPage slug="pricing" />;
}
