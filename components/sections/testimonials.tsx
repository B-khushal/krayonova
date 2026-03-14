"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Mehta",
    role: "Founder, NovaKart",
    quote:
      "KrayoNova transformed our product from idea to launch with clean execution, clear communication, and impressive speed.",
  },
  {
    name: "Sneha Reddy",
    role: "Operations Head, MedAxis",
    quote:
      "Their team built a dashboard our staff actually enjoys using. Performance and usability improved from day one.",
  },
  {
    name: "Rohan Bansal",
    role: "Director, Crestline Logistics",
    quote:
      "The new platform is fast, reliable, and easy to scale. KrayoNova delivered with a premium engineering mindset.",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5200);

    return () => window.clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="relative z-20 py-24 bg-gradient-to-br from-primary/8 via-background/60 to-primary/6 dark:from-purple-950/30 dark:via-background/45 dark:to-purple-900/28">
      <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Client Reviews</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by teams that need modern, reliable, and scalable digital products.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeTestimonial.name}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="relative rounded-3xl border border-primary/20 bg-background/70 p-8 shadow-[0_24px_62px_-34px_rgba(147,51,234,0.45)] backdrop-blur-md md:p-10"
            >
              <Quote className="h-8 w-8 text-primary/70" />
              <p className="mt-5 text-lg leading-8 text-foreground/90">{activeTestimonial.quote}</p>

              <div className="mt-8 flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{activeTestimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{activeTestimonial.role}</p>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-center gap-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 rounded-full transition-all duration-500 ease-in-out ${
                  index === activeIndex ? "w-8 bg-primary shadow-[0_0_24px_rgba(147,51,234,0.45)]" : "w-2.5 bg-primary/35 hover:bg-primary/60"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={index === activeIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
