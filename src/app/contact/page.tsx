import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Talk to us about creating a school, pricing, or partnership with Universe.',
};

export default function ContactPage() {
  return <CmsPage slug="contact" />;
}
