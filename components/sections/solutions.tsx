"use client";

import { motion } from "framer-motion";
import { 
    LayoutDashboard, 
    ShoppingCart, 
    GraduationCap, 
    Users, 
    BarChart3, 
    Smartphone, 
    PackageCheck,
    Layers 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InteractiveCardGrid } from "@/components/ui/interactive-card-grid";

const solutions = [
    {
        title: "Admin Dashboards",
        tagline: "Control operations with clarity and speed",
        details: "Powerful control panels that centralize business workflows, user actions, and high-impact reporting in one secure workspace.",
        icon: LayoutDashboard,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/20",
        technologies: ["Next.js", "TypeScript", "PostgreSQL"]
    },
    {
        title: "POS Billing Systems",
        tagline: "Fast checkout experiences for modern counters",
        details: "Point-of-sale systems for retail and restaurants with resilient billing, product sync, and smooth front-desk operations.",
        icon: ShoppingCart,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        technologies: ["React", "Node.js", "SQLite"]
    },
    {
        title: "School Management",
        tagline: "Digitize academics, fees, and attendance",
        details: "Complete school and college management platforms that streamline administration, communication, and academic records.",
        icon: GraduationCap,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/20",
        technologies: ["React", "Express", "MongoDB"]
    },
    {
        title: "Business CRMs",
        tagline: "Track leads and move pipelines confidently",
        details: "CRM platforms designed for growth-stage teams to capture leads, automate follow-ups, and keep sales pipelines accurate.",
        icon: Users,
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/20",
        technologies: ["Next.js", "GraphQL", "Redis"]
    },
    {
        title: "Analytics Dashboards",
        tagline: "Transform raw metrics into strategic insight",
        details: "Business intelligence dashboards that convert data into decision-ready insights through live charts and custom reporting layers.",
        icon: BarChart3,
        color: "text-pink-600 dark:text-pink-400",
        bgColor: "bg-pink-100 dark:bg-pink-900/20",
        technologies: ["D3.js", "Next.js", "FastAPI"]
    },
    {
        title: "Mobile Applications",
        tagline: "Cross-platform apps users actually keep",
        details: "Native and cross-platform mobile experiences optimized for smooth performance, strong retention, and offline-first reliability.",
        icon: Smartphone,
        color: "text-cyan-600 dark:text-cyan-400",
        bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
        technologies: ["React Native", "Firebase", "TypeScript"]
    },
    {
        title: "Inventory Systems",
        tagline: "Maintain stock accuracy in real time",
        details: "Inventory and warehouse systems with real-time stock movement, alerting, and purchase-order synchronization.",
        icon: PackageCheck,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
        technologies: ["Vue", "Laravel", "MySQL"]
    },
    {
        title: "SaaS Platforms",
        tagline: "Ship multi-tenant products with confidence",
        details: "Scalable SaaS platforms with tenant isolation, subscription workflows, and robust backend APIs built for growth.",
        icon: Layers,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
        technologies: ["Next.js", "Prisma", "PostgreSQL"]
    },
];

export function SolutionsSection() {
    return (
        <section id="solutions" className="relative z-20 py-24 bg-gradient-to-br from-primary/8 via-background/60 to-primary/6 dark:from-purple-950/30 dark:via-background/45 dark:to-purple-900/28">
            <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                            Solutions We Build
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            From concept to deployment, we create custom solutions tailored to your business needs.
                        </p>
                    </motion.div>
                </div>

                <InteractiveCardGrid
                    items={solutions}
                    getItemKey={(solution) => solution.title}
                    getTitle={(solution) => solution.title}
                    getTagline={(solution) => solution.tagline}
                    gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    renderFrontVisual={(solution, isFlipped) => (
                        <div className="px-6 pt-6">
                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 ${solution.bgColor} ${solution.color} transition-transform duration-500 ${isFlipped ? "scale-110" : "scale-100"}`}>
                                <solution.icon className="h-8 w-8" />
                            </div>
                        </div>
                    )}
                    renderFrontEyebrow={() => (
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/70">
                            Tailored systems
                        </p>
                    )}
                    renderBack={(solution) => (
                        <div className="space-y-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
                                Build Focus
                            </p>
                            <p className="text-sm leading-6 text-muted-foreground">
                                {solution.details}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {solution.technologies.map((technology) => (
                                    <Badge
                                        key={technology}
                                        variant="secondary"
                                        className="border-primary/15 bg-primary/10 text-primary"
                                    >
                                        {technology}
                                    </Badge>
                                ))}
                            </div>

                            <Button asChild size="sm" variant="outline" className="rounded-full border-primary/20 bg-background/60 px-4">
                                <a href="#contact">Plan This Solution</a>
                            </Button>
                        </div>
                    )}
                />
            </div>
        </section>
    );
}
