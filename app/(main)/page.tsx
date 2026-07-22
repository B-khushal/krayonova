import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TechEcosystem from "@/components/TechEcosystem";
import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "KrayoNova | Premium Digital Experience & AI Product Agency",
  description: "We engineer AI-powered products, high-performance web applications, mobile platforms, and bespoke digital experiences for global leaders.",
  path: "/",
});

export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <TechEcosystem />
      <Portfolio />
      <CTA />
    </>
  );
}
