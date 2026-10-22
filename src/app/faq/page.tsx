import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about creating a school, engines, roles, and signing in on Universe.',
};

export default function FaqPage() {
  return <CmsPage slug="faq" />;
}
