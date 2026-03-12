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
        description: "Powerful control panels for managing your business operations",
        icon: LayoutDashboard,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/20",
        highlights: ["Reporting", "Permissions", "Workflow control"]
    },
    {
        title: "POS Billing Systems",
        description: "Point-of-sale solutions for retail and restaurant businesses",
        icon: ShoppingCart,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/20",
        highlights: ["Billing", "Receipts", "Realtime inventory"]
    },
    {
        title: "School Management",
        description: "Complete educational institution management platforms",
        icon: GraduationCap,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/20",
        highlights: ["Attendance", "Fees", "Academic records"]
    },
    {
        title: "Business CRMs",
        description: "Customer relationship management for growing teams",
        icon: Users,
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/20",
        highlights: ["Pipelines", "Lead tracking", "Automation"]
    },
    {
        title: "Analytics Dashboards",
        description: "Data visualization and business intelligence tools",
        icon: BarChart3,
        color: "text-pink-600 dark:text-pink-400",
        bgColor: "bg-pink-100 dark:bg-pink-900/20",
        highlights: ["KPIs", "Insights", "Custom reports"]
    },
    {
        title: "Mobile Applications",
        description: "Native and cross-platform mobile app development",
        icon: Smartphone,
        color: "text-cyan-600 dark:text-cyan-400",
        bgColor: "bg-cyan-100 dark:bg-cyan-900/20",
        highlights: ["iOS", "Android", "Offline-ready UX"]
    },
    {
        title: "Inventory Systems",
        description: "Real-time inventory tracking and warehouse management",
        icon: PackageCheck,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
        highlights: ["Stock alerts", "Warehousing", "Order sync"]
    },
    {
        title: "SaaS Platforms",
        description: "Scalable software-as-a-service solutions for any industry",
        icon: Layers,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-100 dark:bg-indigo-900/20",
        highlights: ["Subscriptions", "Tenant isolation", "Scalable APIs"]
    },
];

export function SolutionsSection() {
    return (
        <section id="solutions" className="relative z-20 py-24 bg-white dark:bg-black">
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
                    gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                    cardClassName="min-h-[20rem]"
                    renderVisual={(solution, isActive) => (
                        <div className="px-6 pt-6">
                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${solution.bgColor} ${solution.color} transition-transform duration-500 ${isActive ? "scale-110" : "scale-100"}`}>
                                <solution.icon className="h-8 w-8" />
                            </div>
                        </div>
                    )}
                    renderEyebrow={() => (
                        <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary/70">
                            Tailored systems
                        </p>
                    )}
                    renderDetails={(solution) => (
                        <div className="space-y-4">
                            <p className="text-sm leading-6 text-muted-foreground">
                                {solution.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {solution.highlights.map((highlight) => (
                                    <Badge
                                        key={highlight}
                                        variant="secondary"
                                        className="border-primary/10 bg-primary/8 text-primary"
                                    >
                                        {highlight}
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
