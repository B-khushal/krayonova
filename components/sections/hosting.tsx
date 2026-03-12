"use client";

import { motion } from "framer-motion";
import { Server, Shield, Clock, Zap, Cpu } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
    { text: "Global Cloud Infrastructure", icon: Server },
    { text: "SSL Security", icon: Shield },
    { text: "99.9% Uptime", icon: Clock },
    { text: "Fast Deployment", icon: Zap },
    { text: "Managed Servers", icon: Cpu },
];

export function HostingSection() {
    return (
        <section id="hosting" className="relative z-20 py-24 bg-purple-200 dark:bg-purple-600 border-t border-b border-border/40">
            <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                            Lightning Fast Cloud Hosting
                        </h2>
                        <p className="text-lg text-muted-foreground mb-8 text-balance">
                            Deploy your applications on KrayoNova&apos;s premium cloud infrastructure. We provide secure, scalable, and ultra-fast hosting environments optimized for modern web applications. Focus on your business while we manage the servers.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature, i) => (
                                <div key={i} className="flex items-center space-x-3">
                                    <div className="p-2 rounded-full bg-primary/10 text-primary">
                                        <feature.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-medium">{feature.text}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border border-border/50 bg-background flex items-center justify-center dashboard-mockup"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-purple-500/10" />

                        {/* Abstract Hosting Visual */}
                        <div className="relative z-10 w-full max-w-sm space-y-4 p-8">
                            {[{ id: 1, load: 12 }, { id: 2, load: 24 }, { id: 3, load: 18 }].map((server) => (
                                <Card key={server.id} className="p-4 bg-background/80 backdrop-blur-md border-primary/20 shadow-lg flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <Server className="text-primary w-6 h-6" />
                                        <div>
                                            <div className="font-semibold text-sm">us-east-{server.id} Node</div>
                                            <div className="text-xs text-green-500 flex items-center">
                                                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" /> Operational
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-xs text-muted-foreground font-mono">
                                        {server.load}% Load
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
