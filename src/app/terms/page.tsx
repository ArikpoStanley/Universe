import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms of use for the Universe platform and marketing site.',
};

export default function TermsPage() {
  return <CmsPage slug="terms" />;
}
