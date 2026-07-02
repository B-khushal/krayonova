"use client";

import { motion } from "motion/react";
import { Cpu, Globe, Smartphone, Palette, Cloud, ArrowUpRight } from "lucide-react";
import { useCollection } from "@/hooks/use-content";

export default function ServicesConfig() {
  const { data: dynamicServices, loading } = useCollection<any>("services", { orderBy: { field: "order" }});

  const baseServices = [
    {
      title: "AI & LLM Solutions",
      description: "Custom models, generative agents, and predictive engines integrated securely into your enterprise workflow.",
      icon: <Cpu className="w-6 h-6 text-primary" />,
      tags: ["OpenAI", "PyTorch", "LangChain"],
      span: "md:col-span-2 lg:col-span-8",
      featured: true,
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable, resilient AWS and GCP architectures designed to handle millions of requests.",
      icon: <Cloud className="w-6 h-6 text-accent" />,
      tags: ["AWS", "Docker", "Terraform"],
      span: "md:col-span-1 lg:col-span-4",
      featured: false,
    },
    {
      title: "Web Engineering",
      description: "Blazingly fast, SEO-optimized web applications with modern edge infrastructure.",
      icon: <Globe className="w-6 h-6 text-[#10B981]" />,
      tags: ["Next.js", "React", "Node.js"],
      span: "md:col-span-1 lg:col-span-4",
      featured: false,
    },
    {
      title: "UI/UX Design",
      description: "Award-winning interfaces prioritizing usability, conversion, and luxury aesthetics.",
      icon: <Palette className="w-6 h-6 text-[#F59E0B]" />,
      tags: ["Figma", "Framer", "Prototyping"],
      span: "md:col-span-1 lg:col-span-4",
      featured: false,
    },
    {
      title: "Mobile Platforms",
      description: "Fluid, native-feeling iOS and Android applications from a single unified codebase.",
      icon: <Smartphone className="w-6 h-6 text-[#3B82F6]" />,
      tags: ["React Native", "Swift", "Kotlin"],
      span: "md:col-span-1 lg:col-span-4",
      featured: false,
    },
  ];

  const servicesMap = dynamicServices.length > 0 ? dynamicServices.map((ds, index) => ({
      title: ds.title,
      description: ds.description,
      icon: <Cpu className="w-6 h-6 text-primary" />,
      tags: [],
      span: index === 0 ? "md:col-span-2 lg:col-span-8" : "md:col-span-1 lg:col-span-4",
      featured: index === 0,
  })) : baseServices;

  return (
    <section id="services" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-4 tracking-tight">
            Mastery in Every Stack
          </h2>
          <p className="text-lg text-text-muted leading-relaxed">
            Comprehensive technical capabilities delivered with uncompromising aesthetic precision. We build systems that scale effortlessly.
          </p>
        </div>
        <button className="px-6 py-3 rounded-full border border-black/10 hover:border-primary hover:text-primary transition-colors font-medium self-start md:self-auto text-sm flex items-center gap-2">
          View All Capabilities
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[300px]">
          {servicesMap.map((service, index) => (
            <motion.div
              key={index}
              className={`nova-card p-8 flex flex-col justify-between group relative overflow-hidden ${service.span}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Background Glow on Hover */}
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-primary/5 rounded-full blur-[40px] group-hover:bg-primary/10 transition-colors duration-500 z-0"></div>

              <div className="relative z-10 flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-bg-gray border border-white flex items-center justify-center shadow-inner mb-6 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-primary transition-colors" />
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold text-text-main mb-3">{service.title}</h3>
                <p className="text-text-muted mb-6 line-clamp-2 md:line-clamp-none">{service.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag: any, i: any) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-bg-gray border border-black/5 text-xs font-medium text-text-muted font-mono tracking-tight">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
