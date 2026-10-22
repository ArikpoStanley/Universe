import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Universe is the operating system for modern schools — academics, attendance, results, finance, and family messaging.',
};

export default function AboutPage() {
  return <CmsPage slug="about" />;
}
