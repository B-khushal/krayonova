import { fetchCollectionServer } from "@/lib/actions";
import CareersList from "@/components/CareersList";
import CTA from "@/components/CTA";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Careers & Open Positions",
  description: "Join KrayoNova's elite team of software engineers, AI architects, and UI/UX designers building the digital future.",
  path: "/careers",
});

export const revalidate = 3600;

export default async function CareersPage() {
  const dbJobs = await fetchCollectionServer("careers");

  const fallbackJobs = [
    { id: "1", title: "Senior AI Engineer", department: "Engineering", location: "San Francisco, CA / Remote", type: "Full-time", description: "Design, build, and deploy custom agentic workflows and LLM pipelines for enterprise systems.", requirements: ["5+ years experience in software engineering", "Expertise with PyTorch, OpenAI, and LangChain", "Strong mathematical foundation in deep learning"] },
    { id: "2", title: "Lead UI/UX Architect", department: "Design", location: "New York, NY / Hybrid", type: "Full-time", description: "Shape the aesthetic future of KrayoNova's products, emphasizing premium typography and luxury layouts.", requirements: ["6+ years UX experience in premium/agency digital spaces", "Mastery of Figma, Framer, and web animation principles", "Excellent storytelling and communication skills"] },
    { id: "3", title: "Cloud Platform Lead", department: "Engineering", location: "Remote", type: "Full-time", description: "Scale global AWS and GCP clusters to handle multi-million request loads with zero downtime.", requirements: ["5+ years of production DevOps/SRE operations", "Expertise with Terraform, Docker, Kubernetes", "Profound understanding of system security"] },
  ];

  const jobs = dbJobs && dbJobs.length > 0 ? dbJobs : fallbackJobs;

  return (
    <>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full mb-6 inline-block">
            We are hiring
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-medium text-text-main mb-6 leading-tight">
            Build the <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">intelligent systems</span> of tomorrow
          </h1>
          <p className="text-xl text-text-muted font-light leading-relaxed">
            Join a small, hyper-focused team of engineers and designers crafting premium software and AI solutions for industry leaders.
          </p>
        </div>

        <CareersList jobs={jobs} />
      </section>
      
      <CTA />
    </>
  );
}
