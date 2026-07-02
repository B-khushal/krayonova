"use client";

import { motion } from "motion/react";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-bg-gray">
      {/* Noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(rgba(17, 17, 17, 0.22) 0.55px, transparent 0.55px), radial-gradient(rgba(17, 17, 17, 0.12) 0.55px, transparent 0.55px)",
          backgroundSize: "7px 7px, 11px 11px",
          backgroundPosition: "0 0, 3px 4px",
        }}
      ></div>
      
      {/* Mesh Gradients / Floating Orbs */}
      <motion.div 
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 blur-[120px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 40, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-accent/10 to-primary/5 blur-[100px]"
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-[40%] left-[20%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-white/40 to-surface-dim/40 blur-[80px]"
        animate={{
          y: [0, -20, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Grid line overlay for technical feel */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{ 
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, #111111 1px, transparent 1px), linear-gradient(to bottom, #111111 1px, transparent 1px)' 
        }}
      ></div>
    </div>
  );
}
