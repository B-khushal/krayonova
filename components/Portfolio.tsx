"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useCollection } from "@/hooks/use-content";

export default function Portfolio() {
  const { data: dynamicProjects, loading } = useCollection<any>("projects", { orderBy: { field: "order" } });

  const baseProjects = [
    {
      title: "Nexus Banking Hub",
      category: "FinTech & UI",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2000",
      stats: { label: "Engagement", value: "+40%" },
      span: "lg:col-span-8",
      height: "h-[500px]",
    },
    {
      title: "Aura AI Generator",
      category: "Generative AI App",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
      stats: { label: "Downloads", value: "1.2M" },
      span: "lg:col-span-4",
      height: "h-[500px]",
    },
    {
      title: "LogiChain Platform",
      category: "Enterprise Software",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000",
      stats: { label: "Efficiency", value: "3x" },
      span: "lg:col-span-4",
      height: "h-[400px]",
    },
    {
      title: "Echo Commerce Engine",
      category: "E-Commerce",
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=2000",
      stats: { label: "Zero Downtime", value: "100%" },
      span: "lg:col-span-8",
      height: "h-[400px]",
    },
  ];

  const projectsMap = dynamicProjects.length > 0 ? dynamicProjects.map((dp, index) => ({
      title: dp.name,
      category: dp.category || dp.industry || "Digital Product",
      image: dp.coverImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
      stats: { label: "Impact", value: "10x" },
      span: index % 4 === 0 || index % 4 === 3 ? "lg:col-span-8" : "lg:col-span-4",
      height: index < 2 ? "h-[500px]" : "h-[400px]",
      projectUrl: dp.projectUrl || "",
  })) : baseProjects.map(bp => ({ ...bp, projectUrl: "" }));

  return (
    <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 mb-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">Featured Work</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-6 tracking-tight">
          A Selection of Digital Products <br/>Engineered for Market Leaders
        </h2>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {projectsMap.map((project, i) => (
            <motion.div
              key={i}
              className={`group relative rounded-3xl overflow-hidden ${project.projectUrl ? "cursor-pointer" : "cursor-default"} ${project.span} ${project.height}`}
              onClick={() => {
                if (project.projectUrl) {
                  window.open(project.projectUrl, "_blank", "noopener,noreferrer");
                }
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Background Image Setup */}
              <div 
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                style={{ backgroundImage: `url(${project.image})` }}
              ></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 rounded-full glass-panel !bg-white/10 !border-white/20 text-white text-xs font-medium backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-3xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all duration-300">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Stats sliding in on hover */}
                  <div className="translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block text-right">
                    <div className="text-2xl font-bold text-white">{project.stats?.value || "10x"}</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest">{project.stats?.label || "Impact"}</div>
                  </div>

                  {project.projectUrl && (
                    <div className="w-12 h-12 rounded-full glass-panel !bg-white/10 flex items-center justify-center group-hover:bg-primary transition-all duration-300 transform group-hover:rotate-45 group-hover:scale-110 shadow-lg shadow-primary/20">
                      <ArrowUpRight className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      <div className="mt-16 text-center">
        <button className="px-8 py-4 rounded-full border-2 border-black/10 hover:border-primary hover:text-primary text-text-main font-medium transition-all duration-300">
          View Complete Portfolio
        </button>
      </div>
    </section>
  );
}
