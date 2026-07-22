import Portfolio from "@/components/Portfolio";
import CTA from "@/components/CTA";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Featured Client Work & Case Studies",
  description: "Explore our portfolio of AI applications, high-performance web platforms, and enterprise digital transformations.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <div className="pt-12">
        <div className="text-center max-w-3xl mx-auto px-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-medium text-text-main mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Portfolio</span>
          </h1>
          <p className="text-xl text-text-muted font-light leading-relaxed">
            Explore our successful partnerships and case studies across multiple industries.
          </p>
        </div>
        <Portfolio />
      </div>
      <CTA />
    </>
  );
}
