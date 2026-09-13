import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Partner with us. Ask questions. Let’s build together.',
};

export default function ContactPage() {
  return <CmsPage slug="contact" />;
}
