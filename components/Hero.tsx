"use client";

import { motion } from "motion/react";
import { ArrowRight, Play, Sparkles, BarChart3, Fingerprint, Layers } from "lucide-react";
import { useDocument } from "@/hooks/use-content";

export default function Hero() {
  const { data: homeContent } = useDocument<any>("settings", "home_page");

  const heading = homeContent?.heroHeading || "Transforming Ideas Into Digital Excellence";
  const subheading = homeContent?.heroSubheading || "We create AI-powered products, premium web architectures, and digital experiences that help visionary founders scale faster.";

  // Function to wrap the last two words in the gradient span
  const formatHeading = (text: string) => {
    const words = text.split(" ");
    if (words.length <= 2) return <>{text}</>;
    const lastTwo = words.splice(-2).join(" ");
    return (
      <>
        {words.join(" ")} <br />
        <span className="text-gradient inline-block pb-2">{lastTwo}</span>
      </>
    );
  };

  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left Content */}
        <motion.div 
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/20 bg-white/40">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">Enterprise Digital Agency</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-text-main leading-[1.1] tracking-tight mb-6 text-balance">
            {formatHeading(heading)}
          </h1>
          
          <p className="text-lg sm:text-xl text-text-muted mb-10 leading-relaxed max-w-xl">
            {subheading}
          </p>

          
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-medium shadow-[0_8px_25px_rgba(109,40,217,0.3)] hover:shadow-[0_12px_30px_rgba(109,40,217,0.4)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2 text-lg">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </button>
            <button className="flex items-center gap-3 px-8 py-4 rounded-full font-medium text-text-main hover:bg-black/5 transition-colors border border-black/10 hover:border-black/20">
              <Play className="w-5 h-5 text-primary" />
              View Showreel
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-8 border-t border-black/5">
            <div>
              <div className="text-3xl font-display font-bold text-text-main mb-1">100+</div>
              <div className="text-xs font-medium text-text-muted uppercase tracking-wider">Projects Shipped</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-text-main mb-1">50+</div>
              <div className="text-xs font-medium text-text-muted uppercase tracking-wider">Enterprise Clients</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-text-main mb-1">99%</div>
              <div className="text-xs font-medium text-text-muted uppercase tracking-wider">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Right Content - 3D Composition Simulation */}
        <motion.div 
          className="relative h-[600px] w-full hidden lg:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          {/* Main Dashboard Panel */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[340px] glass-panel rounded-3xl p-6 z-20 flex flex-col gap-4 shadow-2xl"
            animate={{ y: ["-50%", "-52%", "-50%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="text-xs font-medium text-text-muted">Aura AI Agent</div>
            </div>
            <div className="flex gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Fingerprint className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 space-y-2 py-1">
                <div className="h-2 w-1/3 bg-gray-200 rounded-full"></div>
                <div className="h-2 w-2/3 bg-gray-100 rounded-full"></div>
              </div>
            </div>
            {/* Chart Simulation */}
            <div className="flex-1 w-full bg-gray-50/50 rounded-xl border border-white/50 p-4 flex items-end gap-2 relative overflow-hidden">
                {[40, 70, 45, 90, 65, 80, 100, 75].map((height, i) => (
                  <motion.div 
                    key={i}
                    className="flex-1 bg-gradient-to-t from-primary/80 to-accent/80 rounded-t-sm"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                  />
                ))}
            </div>
          </motion.div>

          {/* Floating Element 1 - Top Right */}
          <motion.div 
            className="absolute top-10 right-0 w-64 glass-panel rounded-2xl p-5 z-30 flex items-center gap-4"
            animate={{ y: [0, -15, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <BarChart3 className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-sm font-semibold text-text-main mb-1">Growth Index</div>
              <div className="text-2xl font-bold text-accent">+124%</div>
            </div>
          </motion.div>

          {/* Floating Element 2 - Bottom Left */}
          <motion.div 
            className="absolute bottom-10 left-0 glass-panel rounded-full px-6 py-4 z-30 flex items-center gap-3 backdrop-blur-xl bg-white/70 shadow-xl border-white"
            animate={{ y: [0, 15, 0], x: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)] animate-pulse"></div>
            <span className="text-sm font-medium text-text-main block">Systems Online</span>
          </motion.div>

          {/* Floating Element 3 - Background Tech Layers */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] rounded-3xl border border-primary/10 bg-white/10 backdrop-blur-sm z-10 rotate-[-4deg]"
            animate={{ rotate: [-4, -2, -4] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] rounded-3xl border border-secondary/5 bg-transparent z-0 rotate-[3deg]"
            animate={{ rotate: [3, 5, 3] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </section>
  );
}
