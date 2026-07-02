import Services from "@/components/Services";
import CTA from "@/components/CTA";

export default function ServicesPage() {
  return (
    <>
      <div className="pt-12">
        <div className="text-center max-w-3xl mx-auto px-6 mb-12">
            <h1 className="text-5xl md:text-6xl font-display font-medium text-text-main mb-6 leading-tight">
                Premium <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Services</span>
            </h1>
            <p className="text-xl text-text-muted mb-8 font-light">
                Comprehensive enterprise solutions leveraging cutting-edge AI and advanced engineering.
            </p>
        </div>
        <Services />
      </div>
      <CTA />
    </>
  );
}
