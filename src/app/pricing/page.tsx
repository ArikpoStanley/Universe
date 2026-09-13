import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent, scalable pricing — integration fees and a fair commission model.',
};

export default function PricingPage() {
  return <CmsPage slug="pricing" />;
}
