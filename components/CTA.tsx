"use client";

import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cms } from "@/lib/cms";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      await cms.create("leads", {
        name: email.split("@")[0],
        firstName: email.split("@")[0],
        lastName: "",
        email: email.trim(),
        status: "New",
        source: "Website CTA Banner",
        details: `Inquiry submitted via CTA email box (${email.trim()}).`,
        createdAt: new Date(),
      });
      setSuccess(true);
      setEmail("");
    } catch {
      setError("Failed to send inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="relative rounded-[3rem] overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent"></div>
        <div 
          className="absolute inset-0 opacity-20"
          style={{ 
            backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)", 
            backgroundSize: "24px 24px" 
          }}
        ></div>
        
        {/* Animated Orbs */}
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-[80px]"
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[80px]"
          animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 px-8 py-20 md:py-32 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 max-w-3xl tracking-tight leading-tight">
            Ready to Build Something Extraordinary?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light">
            Partner with KrayoNova to engineer digital products that define categories and captivate users. Let&apos;s engineer your future.
          </p>
          
          {success ? (
            <div className="bg-white/20 backdrop-blur text-white px-8 py-4 rounded-2xl border border-white/50 text-lg font-medium flex items-center gap-3 animate-fade-in">
              <CheckCircle2 className="w-6 h-6 text-green-300" />
              Thank you! We&apos;ll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                aria-label="Enter your email address"
                className="flex-1 rounded-full px-6 py-4 outline-none border-none text-gray-900 font-medium placeholder:text-gray-500 shadow-xl bg-white focus:ring-2 focus:ring-primary/50"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="group relative px-8 py-4 bg-gray-900 text-white rounded-full font-semibold shadow-2xl hover:bg-black transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer shrink-0"
              >
                {loading ? "Sending..." : "Start"}
                {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
              </button>
            </form>
          )}
          {error && (
            <p className="text-red-200 text-xs mt-3 bg-red-900/40 px-4 py-1.5 rounded-full border border-red-400/30">{error}</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
