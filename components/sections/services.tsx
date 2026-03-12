"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor, Smartphone, Cloud } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GetQuoteModal } from "@/components/get-quote-modal";

const services = [
    {
        title: "Web Development",
        description: "Modern responsive websites built using cutting-edge frameworks.",
        icon: Monitor,
    },
    {
        title: "App Development",
        description: "Custom mobile and web applications tailored to your business.",
        icon: Smartphone,
    },
    {
        title: "Cloud Hosting",
        description: "Fast, scalable, and secure hosting for apps and websites.",
        icon: Cloud,
    },
];

export function ServicesSection() {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <>
            <section id="services" className="relative z-20 py-24 bg-purple-200 dark:bg-black">
                <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Expertise & Services</h2>
                            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                                We provide end-to-end digital solutions to help your business thrive in the modern web era.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -10 }}
                                className="h-full"
                            >
                                <Card className="h-full border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20">
                                    <CardHeader>
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                                            <service.icon className="h-6 w-6" />
                                        </div>
                                        <CardTitle className="text-xl">{service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base text-muted-foreground">
                                            {service.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex justify-center mt-12"
                    >
                        <Button
                            size="lg"
                            onClick={() => setIsQuoteOpen(true)}
                            className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full"
                        >
                            Get a Custom Quote
                        </Button>
                    </motion.div>
                </div>
            </section>
            <GetQuoteModal open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
        </>
    );
}
