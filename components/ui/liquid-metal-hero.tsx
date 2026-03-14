"use client";

import { LiquidMetal, liquidMetalPresets } from '@paper-design/shaders-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

interface LiquidMetalHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick?: () => void;
  features?: string[];
}

export default function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
}: LiquidMetalHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.35], [0, 28]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/8 via-background/60 to-primary/6 dark:from-purple-950/30 dark:via-background/45 dark:to-purple-900/28">
      <LiquidMetal
        {...liquidMetalPresets[2]}
        style={{ 
          position: "fixed", 
          inset: 0, 
          zIndex: -10,
          backgroundColor: "hsl(var(--background))"
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div 
          className="text-center space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ y: prefersReducedMotion ? 0 : heroParallaxY }}
        >
          {badge && (
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeInOut" }}
            >
              <Badge 
                variant="secondary" 
                className="bg-foreground/10 text-foreground border-foreground/20 hover:bg-foreground/20 transition-colors duration-300 backdrop-blur-sm"
              >
                {badge}
              </Badge>
            </motion.div>
          )}
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
          >
            <motion.h1 
              role="heading" 
              aria-level={1}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight text-primary dark:bg-gradient-to-r dark:from-white dark:via-purple-100 dark:to-purple-300 dark:bg-clip-text dark:text-transparent dark:drop-shadow-[0_0_28px_rgba(168,85,247,0.35)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeInOut" }}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              className="max-w-3xl mx-auto text-xl sm:text-2xl text-foreground/90 leading-relaxed font-bold text-left sm:text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="flex flex-row gap-3 sm:gap-4 justify-start sm:justify-center items-center"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onPrimaryCtaClick}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-2xl text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 font-semibold"
              >
                {primaryCtaLabel}
              </Button>
            </motion.div>
            
            {secondaryCtaLabel && onSecondaryCtaClick && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={onSecondaryCtaClick}
                  variant="outline"
                  size="lg"
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-all duration-300 backdrop-blur-sm text-base sm:text-lg px-6 py-4 sm:px-8 sm:py-6 font-semibold"
                >
                  {secondaryCtaLabel}
                </Button>
              </motion.div>
            )}
          </motion.div>
          
          {features.length > 0 && (
            <motion.div 
              className="pt-12"
              initial={{ opacity: 0, y: 18 }}
              animate={
                prefersReducedMotion
                  ? { opacity: 1, y: 0 }
                  : {
                      opacity: 1,
                      y: [0, -8, 0],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0.6, delay: 0.35, ease: "easeInOut" }
                  : {
                      opacity: { duration: 0.6, delay: 0.35, ease: "easeInOut" },
                      y: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                    }
              }
            >
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-foreground/10 border-foreground/20 backdrop-blur-md shadow-2xl">
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {features.map((feature, index) => (
                        <motion.div 
                          key={index}
                          className="flex items-center justify-center text-center"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ 
                            duration: 0.6, 
                            delay: 0.8 + (index * 0.1)
                          }}
                        >
                          <p className="text-foreground/90 font-medium text-lg">
                            {feature}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
