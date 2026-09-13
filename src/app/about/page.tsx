import type { Metadata } from 'next';
import { CmsPage } from '@/components/CmsPage';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Spring is a fintech infrastructure company transforming mortgage banking in Nigeria, in partnership with AG Mortgage Bank.',
};

export default function AboutPage() {
  return <CmsPage slug="about" />;
}
