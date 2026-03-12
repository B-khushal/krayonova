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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const solutions = [
    {
        title: "Admin Dashboards",
        description: "Powerful control panels for managing your business operations",
        icon: LayoutDashboard,
        color: "text-purple-600 dark:text-purple-400",
        bgColor: "bg-purple-100 dark:bg-purple-900/20"
    },
    {
        title: "POS Billing Systems",
        description: "Point-of-sale solutions for retail and restaurant businesses",
        icon: ShoppingCart,
        color: "text-blue-600 dark:text-blue-400",
        bgColor: "bg-blue-100 dark:bg-blue-900/20"
    },
    {
        title: "School Management",
        description: "Complete educational institution management platforms",
        icon: GraduationCap,
        color: "text-green-600 dark:text-green-400",
        bgColor: "bg-green-100 dark:bg-green-900/20"
    },
    {
        title: "Business CRMs",
        description: "Customer relationship management for growing teams",
        icon: Users,
        color: "text-orange-600 dark:text-orange-400",
        bgColor: "bg-orange-100 dark:bg-orange-900/20"
    },
    {
        title: "Analytics Dashboards",
        description: "Data visualization and business intelligence tools",
        icon: BarChart3,
        color: "text-pink-600 dark:text-pink-400",
        bgColor: "bg-pink-100 dark:bg-pink-900/20"
    },
    {
        title: "Mobile Applications",
        description: "Native and cross-platform mobile app development",
        icon: Smartphone,
        color: "text-cyan-600 dark:text-cyan-400",
        bgColor: "bg-cyan-100 dark:bg-cyan-900/20"
    },
    {
        title: "Inventory Systems",
        description: "Real-time inventory tracking and warehouse management",
        icon: PackageCheck,
        color: "text-yellow-600 dark:text-yellow-400",
        bgColor: "bg-yellow-100 dark:bg-yellow-900/20"
    },
    {
        title: "SaaS Platforms",
        description: "Scalable software-as-a-service solutions for any industry",
        icon: Layers,
        color: "text-indigo-600 dark:text-indigo-400",
        bgColor: "bg-indigo-100 dark:bg-indigo-900/20"
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {solutions.map((solution, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -8, scale: 1.05 }}
                            className="h-full"
                        >
                            <Card className="h-full border-border/50 bg-background backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
                                <CardHeader>
                                    <div className={`h-14 w-14 rounded-xl ${solution.bgColor} flex items-center justify-center mb-4 ${solution.color}`}>
                                        <solution.icon className="h-7 w-7" />
                                    </div>
                                    <CardTitle className="text-lg">{solution.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        {solution.description}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
