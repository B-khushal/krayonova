"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const projects = [
    {
        title: "E-Commerce Website",
        category: "Website",
        description: "Modern online store with payment integration and inventory management.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
        tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    },
    {
        title: "Restaurant Ordering App",
        category: "Mobile App",
        description: "Mobile app for restaurant ordering with real-time order tracking.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800",
        tech: ["React Native", "Firebase", "Node.js"],
    },
    {
        title: "School Management System",
        category: "Management System",
        description: "Complete school administration system with student, teacher, and class management.",
        image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "Node.js", "MongoDB", "Express"],
    },
    {
        title: "Inventory Management System",
        category: "Management System",
        description: "Real-time inventory tracking and analytics for retail businesses.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        tech: ["Vue.js", "Laravel", "MySQL", "Chart.js"],
    },
    {
        title: "CRM Dashboard",
        category: "Dashboard",
        description: "Customer relationship management dashboard with analytics and reporting.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "TypeScript", "GraphQL", "PostgreSQL"],
    },
    {
        title: "Analytics Dashboard",
        category: "Dashboard",
        description: "Business intelligence dashboard with real-time data visualization.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tech: ["Next.js", "D3.js", "Python", "FastAPI"],
    },
    {
        title: "POS Billing Software",
        category: "Web App",
        description: "Point-of-sale system for retail stores with inventory and sales tracking.",
        image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "Node.js", "SQLite", "Electron"],
    },
    {
        title: "Appointment Booking App",
        category: "Web App",
        description: "Online booking platform for healthcare professionals and clinics.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
        tech: ["Next.js", "Prisma", "PostgreSQL", "Twilio"],
    },
    {
        title: "Fitness Tracking App",
        category: "Mobile App",
        description: "Mobile fitness tracker with workout plans and progress monitoring.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800",
        tech: ["React Native", "Firebase", "TensorFlow"],
    },
    {
        title: "AI Chatbot Web App",
        category: "Web App",
        description: "Intelligent chatbot platform powered by AI for customer support.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "OpenAI", "Node.js", "Redis"],
    },
    {
        title: "Real Estate Website",
        category: "Website",
        description: "Property listing platform with advanced search and virtual tours.",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800",
        tech: ["Next.js", "Mapbox", "MongoDB", "Tailwind"],
    },
    {
        title: "Food Delivery Platform",
        category: "Web App",
        description: "Multi-restaurant food delivery platform with order tracking.",
        image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    },
    {
        title: "Startup Landing Page",
        category: "Website",
        description: "Modern landing page with animations and lead capture forms.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        tech: ["Next.js", "Framer Motion", "Tailwind"],
    },
    {
        title: "Admin Dashboard UI",
        category: "Dashboard",
        description: "Comprehensive admin panel with user management and analytics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        tech: ["React", "TypeScript", "Material-UI", "Redux"],
    },
    {
        title: "Vendor Management System",
        category: "Management System",
        description: "B2B platform for managing vendors, orders, and supply chain.",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
        tech: ["Angular", "Spring Boot", "PostgreSQL"],
    },
];

const categories = ["All", "Website", "Web App", "Mobile App", "Dashboard", "Management System"];

export function PortfolioSection() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProjects = selectedCategory === "All" 
        ? projects 
        : projects.filter(project => project.category === selectedCategory);

    return (
        <section id="portfolio" className="relative z-20 py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Portfolio</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            Explore our diverse range of projects showcasing websites, applications, dashboards, and management systems.
                        </p>
                    </motion.div>
                </div>

                {/* Filter Tabs */}
                <motion.div 
                    className="flex flex-wrap justify-center gap-3 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <Button
                            key={category}
                            variant={selectedCategory === category ? "default" : "outline"}
                            onClick={() => setSelectedCategory(category)}
                            className={`rounded-full ${
                                selectedCategory === category 
                                    ? "bg-primary text-primary-foreground" 
                                    : "border-primary/50 text-primary hover:bg-primary/10"
                            }`}
                        >
                            {category}
                        </Button>
                    ))}
                </motion.div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={`${project.title}-${index}`}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group cursor-pointer"
                        >
                            <Card className="overflow-hidden border-border/50 bg-background shadow-sm transition-all hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col">
                                <div className="relative aspect-video overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute top-4 right-4">
                                        <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                                            {project.category}
                                        </Badge>
                                    </div>
                                </div>
                                <CardContent className="p-6 flex-grow">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {project.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="px-6 pb-6 pt-0 flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <Badge 
                                            key={t} 
                                            variant="secondary" 
                                            className="bg-primary/5 text-primary hover:bg-primary/10 text-xs"
                                        >
                                            {t}
                                        </Badge>
                                    ))}
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
