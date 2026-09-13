import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers about Spring, our licensing model, data safety, and how to get started.',
};

export default function FaqPage() {
  return <CmsPage slug="faq" />;
}
