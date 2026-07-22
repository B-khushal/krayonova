import { generateSEO } from "@/lib/seo";
import CTA from "@/components/CTA";
import Image from "next/image";

export const metadata = generateSEO({
  title: "About Us | Engineering the Digital Future",
  description: "Learn about KrayoNova, our mission, leadership, and how we engineer category-defining AI solutions and digital experiences for the world's most ambitious brands.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-display font-medium text-text-main mb-6 leading-tight">
              Engineering the <br/> <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Digital Future</span>
            </h1>
            <p className="text-xl text-text-muted mb-8 font-light leading-relaxed">
              We are a team of visionaries, engineers, and designers obsessed with crafting category-defining AI solutions and digital experiences for the world&apos;s most ambitious brands.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-4xl font-display font-bold text-primary mb-2">50+</p>
                <p className="text-sm text-text-muted">Enterprise Clients</p>
              </div>
              <div>
                <p className="text-4xl font-display font-bold text-primary mb-2">10M+</p>
                <p className="text-sm text-text-muted">Users Impacted</p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 relative h-[500px] rounded-3xl overflow-hidden glass-card glass-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 z-0" />
            <Image
              src="https://picsum.photos/seed/agency/1000/1200"
              alt="Our Agency"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-80 mix-blend-overlay"
              priority
            />
          </div>
        </div>
      </section>
      
      <CTA />
    </>
  );
}
