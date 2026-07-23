"use client";

import { motion } from "motion/react";
import { Network, Database, Layers, BrainCircuit } from "lucide-react";

export default function TechEcosystem() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-text-main mb-6 tracking-tight">
          AI Innovation Ecosystem
        </h2>
        <p className="text-lg text-text-muted">
          Our technology stack represents the bleeding edge of software engineering, combining robust enterprise reliability with futuristic generative capabilities.
        </p>
      </div>

      <div className="relative h-[450px] sm:h-[600px] w-full flex items-center justify-center">
        {/* Core Nexus */}
        <motion.div 
          className="absolute z-30 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_80px_rgba(109,40,217,0.5)] flex items-center justify-center transform-gpu will-change-transform"
          animate={{ scale: [1, 1.05, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <BrainCircuit className="w-9 h-9 sm:w-12 sm:h-12 text-white" />
        </motion.div>

        {/* Orbit Rings */}
        <div className="absolute w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] rounded-full border border-black/5 z-0"></div>
        <div className="absolute w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full border border-black/5 z-0"></div>
        <div className="absolute w-[480px] sm:w-[800px] h-[480px] sm:h-[800px] rounded-full border border-black/5 z-0 opacity-50"></div>

        {/* Orbit Node 1 */}
        <motion.div 
          className="absolute z-20 transform-gpu will-change-transform"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[220px] sm:w-[300px] h-[220px] sm:h-[300px] relative">
            <div className="absolute top-0 left-1/2 -ml-6 sm:-ml-8 -mt-6 sm:-mt-8 w-12 h-12 sm:w-16 sm:h-16 glass-panel rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 border-white/80 shadow-lg">
              <Network className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
              <span className="text-[9px] sm:text-[10px] font-bold">LLMs</span>
            </div>
          </div>
        </motion.div>

        {/* Orbit Node 2 */}
        <motion.div 
          className="absolute z-20 transform-gpu will-change-transform"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] relative">
            <div className="absolute bottom-1/4 right-0 w-12 h-12 sm:w-16 sm:h-16 glass-panel rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 border-white/80 shadow-lg" style={{ transform: "rotate(360deg)" }}>
              <Database className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
              <span className="text-[9px] sm:text-[10px] font-bold">Vector</span>
            </div>
            <div className="absolute top-1/4 left-0 w-12 h-12 sm:w-16 sm:h-16 glass-panel rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 border-white/80 shadow-lg" style={{ transform: "rotate(360deg)" }}>
              <Layers className="w-4 h-4 sm:w-6 sm:h-6 text-blue-500" />
              <span className="text-[9px] sm:text-[10px] font-bold">Cloud</span>
            </div>
          </div>
        </motion.div>

        {/* Floating tech tags */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
           <div className="absolute top-20 right-32 px-4 py-2 glass-panel rounded-full text-xs font-mono font-medium">React / Next.js</div>
           <div className="absolute bottom-32 left-32 px-4 py-2 glass-panel rounded-full text-xs font-mono font-medium">PostgreSQL</div>
           <div className="absolute top-1/3 left-20 px-4 py-2 glass-panel rounded-full text-xs font-mono font-medium">PyTorch</div>
           <div className="absolute bottom-1/4 right-24 px-4 py-2 glass-panel rounded-full text-xs font-mono font-medium">AWS / GCP</div>
        </div>
      </div>
    </section>
  );
}
