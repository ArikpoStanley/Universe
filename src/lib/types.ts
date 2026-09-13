export interface SectionCta {
  label: string;
  href: string;
}

export interface SectionItem {
  icon?: string;
  title?: string;
  text?: string;
  value?: string;
  label?: string;
}

export interface Section {
  type:
    | 'hero'
    | 'stats'
    | 'pillars'
    | 'features'
    | 'steps'
    | 'split'
    | 'cards'
    | 'quote'
    | 'rich'
    | 'cta'
    | 'pricing'
    | 'faq'
    | 'contact';
  kicker?: string;
  heading?: string;
  subheading?: string;
  body?: string;
  items?: SectionItem[];
  cta?: SectionCta;
  secondaryCta?: SectionCta;
}

export interface PageData {
  slug: string;
  title: string;
  description: string;
  sections: Section[];
}

export interface PostData {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  tag: string;
  createdAt: string;
}

export interface PricingPlanData {
  id: number;
  name: string;
  audience: string;
  price: string;
  unit: string;
  features: string[];
  highlighted: boolean;
}

export interface FaqData {
  id: number;
  question: string;
  answer: string;
}

export interface BootstrapData {
  pages: PageData[];
  posts: PostData[];
  pricing: PricingPlanData[];
  faqs: FaqData[];
}
