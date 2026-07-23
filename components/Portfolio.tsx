"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ExternalLink, Globe, Shield, Sparkles } from "lucide-react";
import { useCollection } from "@/hooks/use-content";
import { displayText } from "@/lib/utils";

interface ProjectItem {
  id?: string;
  title: string;
  category: string;
  description: string;
  image: string;
  projectUrl: string;
  stats: { label: string; value: string };
  techStack: string[];
  featured?: boolean;
}

export default function Portfolio() {
  const { data: dynamicProjects, loading } = useCollection<any>("projects", { orderBy: { field: "order" } });
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const baseProjects: ProjectItem[] = [
    {
      id: "nexus-banking",
      title: "Nexus Institutional Wealth Hub",
      category: "FinTech & Banking",
      description: "Next-generation institutional wealth management and real-time portfolio analytics web platform.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
      projectUrl: "https://nexus-banking.krayonova.com",
      stats: { label: "Engagement Lift", value: "+42%" },
      techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "WebSockets"],
      featured: true,
    },
    {
      id: "aura-ai",
      title: "Aura Creative AI Suite",
      category: "AI & SaaS",
      description: "Browser-based generative AI workflow engine empowering 1.2M+ enterprise visual creators worldwide.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1600",
      projectUrl: "https://aura-ai.krayonova.com",
      stats: { label: "Active Creators", value: "1.2M+" },
      techStack: ["React 19", "Python AI", "WebGPU", "FastAPI"],
      featured: true,
    },
    {
      id: "logichain-platform",
      title: "LogiChain Global Logistics OS",
      category: "Enterprise Cloud",
      description: "Enterprise SaaS control tower for real-time global supply chain tracking and predictive dispatch.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1600",
      projectUrl: "https://logichain.krayonova.com",
      stats: { label: "Fulfillment Velocity", value: "3.5x" },
      techStack: ["Next.js", "Node.js", "PostgreSQL", "Mapbox GL"],
      featured: true,
    },
    {
      id: "echo-commerce",
      title: "Echo Ultra-Fast Commerce Engine",
      category: "E-Commerce",
      description: "Headless e-commerce web platform engineered for sub-second page loads and zero-downtime scaling.",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1600",
      projectUrl: "https://echo-shop.krayonova.com",
      stats: { label: "System Reliability", value: "99.99%" },
      techStack: ["Next.js", "Stripe API", "GraphQL", "Redis"],
      featured: true,
    },
    {
      id: "vortex-cloud",
      title: "Vortex DevOps Cloud Console",
      category: "Enterprise Cloud",
      description: "Multi-cloud infrastructure web management portal with automated Kubernetes cluster orchestration.",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1600",
      projectUrl: "https://vortex-cloud.krayonova.com",
      stats: { label: "Cost Efficiency", value: "-65%" },
      techStack: ["Vue 3", "Go", "Docker", "Kubernetes"],
      featured: false,
    },
    {
      id: "pulse-healthtech",
      title: "Pulse Telemedicine Portal",
      category: "AI & SaaS",
      description: "HIPAA-compliant web platform for instant video consultations, EHR sync, and AI patient triage.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1600",
      projectUrl: "https://pulse-health.krayonova.com",
      stats: { label: "Patient Rating", value: "4.95/5" },
      techStack: ["Next.js", "WebRTC", "Supabase", "Tailwind CSS"],
      featured: false,
    },
  ];

  const projectsMap: ProjectItem[] = dynamicProjects.length > 0
    ? dynamicProjects.map((dp: any, index: number) => {
        const rawUrl = displayText(dp.projectUrl, "");
        const formattedUrl = rawUrl
          ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`)
          : `https://${(dp.name || "project").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.krayonova.com`;
        
        return {
          id: dp.id || `dyn-${index}`,
          title: displayText(dp.name, `Digital Platform ${index + 1}`),
          category: displayText(dp.category || dp.industry, "Web Application"),
          description: displayText(
            dp.description || dp.summary,
            "High-performance website application engineered with modern web technologies and luxury design aesthetics."
          ),
          image: displayText(dp.coverImage, baseProjects[index % baseProjects.length].image),
          projectUrl: formattedUrl,
          stats: {
            label: displayText(dp.metricLabel, "Performance Impact"),
            value: displayText(dp.metricValue, "+50%"),
          },
          techStack: Array.isArray(dp.techStack) && dp.techStack.length > 0
            ? dp.techStack
            : ["Next.js", "TypeScript", "Tailwind CSS"],
          featured: Boolean(dp.isFeatured),
        };
      })
    : baseProjects;

  const categories = ["All", ...Array.from(new Set(projectsMap.map((p) => p.category)))];

  const filteredProjects = activeCategory === "All"
    ? projectsMap
    : projectsMap.filter((p) => p.category === activeCategory);

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Web Applications & Platforms</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-display font-bold text-text-main mb-6 tracking-tight leading-tight"
        >
          Crafted for the Browser. <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Engineered for Market Leadership.
          </span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg text-text-muted font-light leading-relaxed"
        >
          Every project we deliver is a responsive, high-performance website application built to captivate users and drive enterprise outcomes.
        </motion.p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-nowrap sm:flex-wrap overflow-x-auto justify-start sm:justify-center items-center gap-2 sm:gap-2.5 mb-10 sm:mb-14 pb-2 sm:pb-0 px-2 sm:px-0 scrollbar-none">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 shrink-0 cursor-pointer ${
                isActive
                  ? "bg-primary text-white shadow-md shadow-primary/25 scale-105"
                  : "bg-white/80 text-text-secondary hover:text-text-main hover:bg-white border border-border-soft hover:border-border-medium shadow-xs"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-text-muted gap-3">
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span>Loading client platforms...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const displayDomain = project.projectUrl
                ? project.projectUrl.replace(/^https?:\/\//, "").replace(/\/.*$/, "")
                : "preview.krayonova.com";

              return (
                <motion.div
                  key={project.id || i}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group relative flex flex-col rounded-2xl bg-white border border-border-soft hover:border-primary/40 overflow-hidden shadow-md hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform-gpu"
                >
                  {/* Modern Browser Window Chrome Bar (Landscape Header) */}
                  <div className="w-full bg-slate-100/90 border-b border-border-soft/80 px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between z-10 backdrop-blur-sm gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FF5F56] opacity-90 inline-block shadow-xs"></span>
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFBD2E] opacity-90 inline-block shadow-xs"></span>
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#27C93F] opacity-90 inline-block shadow-xs"></span>
                    </div>

                    {/* URL Bar Pill */}
                    <div className="flex items-center gap-1.5 bg-white px-2.5 sm:px-3.5 py-1 rounded-lg border border-border-soft text-[10px] sm:text-[11px] font-mono text-text-secondary shadow-2xs max-w-[130px] min-[400px]:max-w-[180px] sm:max-w-[320px] truncate">
                      <Shield className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="truncate text-text-primary font-medium">https://{displayDomain}</span>
                    </div>

                    {/* Live Indicator */}
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-200/80 shadow-2xs shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Live Site</span>
                    </div>
                  </div>

                  {/* Landscape Aspect Ratio Image Showcase Frame (16:10 Widescreen) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 border-b border-border-soft/60">
                    {/* Website Mockup Image */}
                    <div
                      className="absolute inset-0 bg-cover bg-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${project.image})` }}
                    ></div>

                    {/* Gradient & Glass Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/10 opacity-70 group-hover:opacity-60 transition-opacity duration-300"></div>

                    {/* Category & Stat Badge Floating Pills */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10 pointer-events-none">
                      <span className="px-3 py-1 rounded-full bg-white/90 border border-border-soft text-text-primary text-xs font-semibold backdrop-blur-md shadow-md">
                        {project.category}
                      </span>

                      {project.stats?.value && (
                        <div className="px-3.5 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/25 backdrop-blur-md flex items-center gap-1">
                          <span>{project.stats.value}</span>
                          <span className="text-[10px] opacity-80 font-normal">{project.stats.label}</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Quick Visit Overlay Button */}
                    {project.projectUrl && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/30 backdrop-blur-[3px]">
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold flex items-center gap-2 shadow-xl shadow-primary/30 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300 hover:bg-primary-hover"
                        >
                          <Globe className="w-4 h-4" />
                          <span>Visit Live Website</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Project Details Footer */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 bg-white border-t border-border-soft/60">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-text-main mb-2.5 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-sm text-text-muted leading-relaxed line-clamp-2 mb-5 font-normal">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Stack Pills & External Link Button */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-soft/80">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-2.5 py-0.5 rounded-md bg-bg-secondary border border-border-soft text-[11px] font-medium text-text-secondary hover:bg-bg-tertiary hover:text-text-main transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-hover transition-colors duration-200"
                        >
                          <span>Preview</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

      {/* CTA Button */}
      <div className="mt-16 text-center">
        <a
          href="/contact"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold text-sm transition-all duration-300 shadow-xl shadow-primary/20 hover:scale-105"
        >
          <span>Request Custom Web Architecture</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
