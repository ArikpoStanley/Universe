import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Universe handles school and personal data — tenant-scoped and role-aware.',
};

export default function PrivacyPage() {
  return <CmsPage slug="privacy" />;
}
