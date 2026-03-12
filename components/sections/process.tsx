"use client";

import { motion } from "framer-motion";
import { Lightbulb, PenTool, Code, Rocket, TrendingUp } from "lucide-react";

const steps = [
    { title: "Idea", description: "Strategic planning and concept formulation.", icon: Lightbulb },
    { title: "Design", description: "UI/UX design and prototyping.", icon: PenTool },
    { title: "Development", description: "Agile engineering and coding.", icon: Code },
    { title: "Deployment", description: "Secure cloud launch and testing.", icon: Rocket },
    { title: "Growth", description: "Scaling and continuous optimization.", icon: TrendingUp },
];

export function ProcessSection() {
    return (
        <section id="process" className="relative z-20 py-24 bg-background">
            <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our Process</h2>
                        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                            A streamlined workflow designed to deliver high-quality digital products from concept to scale.
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="absolute left-1/2 -ml-0.5 w-[1px] h-full bg-border/50 hidden md:block" />
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                            >
                                <div className="flex-1 w-full text-center md:text-left px-8 py-4">
                                    <div className={`md:flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}>
                                        <div className="max-w-sm mx-auto md:mx-0">
                                            <h3 className="text-2xl font-semibold mb-2 text-primary">{step.title}</h3>
                                            <p className="text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 -ml-6 hidden md:flex h-12 w-12 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                                    <step.icon className="h-5 w-5" />
                                </div>
                                <div className="flex-1 w-full flex justify-center md:hidden mb-4">
                                    <div className="h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 flex">
                                        <step.icon className="h-5 w-5" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
