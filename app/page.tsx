import LiquidMetalHeroDemo from "@/components/liquid-metal-hero-demo";
import { ServicesSection } from "@/components/sections/services";
import { PortfolioSection } from "@/components/sections/portfolio";
import { SolutionsSection } from "@/components/sections/solutions";
import { HostingSection } from "@/components/sections/hosting";
import { ProcessSection } from "@/components/sections/process";
import { AboutSection } from "@/components/sections/about";
import { CTASection } from "@/components/sections/cta";
import { ContactSection } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <LiquidMetalHeroDemo />
      <ServicesSection />
      <PortfolioSection />
      <SolutionsSection />
      <HostingSection />
      <ProcessSection />
      <AboutSection />
      <CTASection />
      <ContactSection />
    </>
  );
}
