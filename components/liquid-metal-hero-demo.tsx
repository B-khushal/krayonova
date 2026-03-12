"use client";

import LiquidMetalHero from '@/components/ui/liquid-metal-hero';
import { GetQuoteModal } from '@/components/get-quote-modal';
import { useState } from 'react';

export default function LiquidMetalHeroDemo() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  return (
    <>
      <LiquidMetalHero
        title="Build. Launch. Scale with KrayoNova"
        subtitle="We design powerful websites, build scalable applications, and host them on secure cloud infrastructure."
        primaryCtaLabel="Get a Quote"
        secondaryCtaLabel="View Our Work"
        onPrimaryCtaClick={() => {
          setIsQuoteOpen(true);
        }}
        onSecondaryCtaClick={() => {
          document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        }}
        features={[
          "Custom Web Development",
          "Mobile App Development", 
          "Cloud Hosting & Deployment"
        ]}
      />
      <GetQuoteModal open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
    </>
  );
}
