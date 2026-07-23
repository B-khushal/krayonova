"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "motion/react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDocument } from "@/hooks/use-content";
import BrandLogo from "@/components/BrandLogo";


export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const { data: navData } = useDocument<any>("settings", "navigation");
  
  const links = navData?.links || [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 inset-x-2 sm:inset-x-4 md:inset-x-0 z-50 transition-all duration-300 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mt-2 sm:mt-4 rounded-2xl sm:rounded-full transform-gpu",
          isScrolled
            ? "glass-panel py-2.5 sm:py-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white/80"
            : "bg-transparent py-3 sm:py-5"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between">
          <BrandLogo href="/" className="gap-2" />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link: any) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-text-muted hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute inset-x-4 bottom-1 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/sign-in"
              className="text-sm font-medium text-text-muted hover:text-text-main transition-colors px-2"
            >
              Sign In
            </Link>
            <Link href="/contact" className="group relative px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white rounded-full text-sm font-medium shadow-[0_4px_14px_0_rgba(109,40,217,0.39)] hover:shadow-[0_6px_20px_rgba(109,40,217,0.23)] hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex items-center justify-center">
              <span className="relative z-10 flex items-center gap-2">
                Start Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-text-muted hover:text-text-main transition-colors rounded-lg focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl px-6 pt-28 pb-12 flex flex-col justify-between overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 text-center my-auto">
              {links.map((link: any) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-display font-medium text-text-main hover:text-primary transition-colors py-1"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-gray-200 w-16 mx-auto my-3"></div>
              <Link
                href="/sign-in"
                className="text-lg font-medium text-text-muted hover:text-text-main transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
              <Link
                href="/contact" 
                className="w-full py-3.5 mt-2 bg-gradient-to-r from-primary to-accent text-white rounded-full font-medium inline-block text-center shadow-lg"
                onClick={() => setIsOpen(false)}
              >
                Start Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
