import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Spring collects, protects, and respects your data — NDPR compliant.',
};

export default function PrivacyPage() {
  return <CmsPage slug="privacy" />;
}
