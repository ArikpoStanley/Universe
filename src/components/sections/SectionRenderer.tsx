import type { BootstrapData, Section } from '@/lib/types';
import { Hero } from './Hero';
import {
  CardsSection,
  CtaSection,
  FeaturesSection,
  PillarsSection,
  QuoteSection,
  RichSection,
  SplitSection,
  StatsSection,
  StepsSection,
} from './Blocks';
import { ContactBlock, FaqAccordion } from './Interactive';
import { PricingPlans } from '@/components/PricingPlans';
import { PageHero } from './PageHero';

interface Props {
  sections: Section[];
  data?: BootstrapData;
  compactHero?: boolean;
}

export function SectionRenderer({ sections, data, compactHero = false }: Props) {
  return (
    <>
      {sections.map((section, i) => {
        switch (section.type) {
          case 'hero':
            return compactHero ? (
              <PageHero key={i} section={section} />
            ) : (
              <Hero key={i} section={section} />
            );
          case 'stats':
            return <StatsSection key={i} section={section} />;
          case 'pillars':
            return <PillarsSection key={i} section={section} />;
          case 'features':
            return <FeaturesSection key={i} section={section} />;
          case 'cards':
            return <CardsSection key={i} section={section} />;
          case 'steps':
            return <StepsSection key={i} section={section} />;
          case 'split':
            return <SplitSection key={i} section={section} />;
          case 'quote':
            return <QuoteSection key={i} section={section} />;
          case 'rich':
            return <RichSection key={i} section={section} />;
          case 'cta':
            return <CtaSection key={i} section={section} />;
          case 'pricing':
            return <PricingPlans key={i} />;
          case 'faq':
            return <FaqAccordion key={i} faqs={data?.faqs || []} />;
          case 'contact':
            return <ContactBlock key={i} />;
          default:
            return null;
        }
      })}
    </>
  );
}
