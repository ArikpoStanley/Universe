import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'The terms governing use of the Spring platform.',
};

export default function TermsPage() {
  return <CmsPage slug="terms" />;
}
