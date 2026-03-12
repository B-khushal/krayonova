"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { GetQuoteModal } from "@/components/get-quote-modal";

export function CTASection() {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <>
            <section className="relative z-20 py-24 bg-gradient-to-br from-primary/10 via-background to-primary/5">
                <div className="container px-4 md:px-6 mx-auto max-w-screen-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center space-y-8"
                    >
                        <div className="space-y-4">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60"
                            >
                                Ready to Build Your Next Project?
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                            >
                                Let&apos;s turn your idea into a powerful website or application that drives results.
                            </motion.p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    onClick={() => setIsQuoteOpen(true)}
                                    className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 rounded-full group"
                                >
                                    Get a Quote
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => {
                                        window.open('https://calendly.com', '_blank', 'noopener,noreferrer');
                                    }}
                                    className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary text-lg px-8 py-6 rounded-full group"
                                >
                                    <Calendar className="mr-2 h-5 w-5" />
                                    Schedule a Call
                                </Button>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="pt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span>Free Consultation</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span>24hr Response Time</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">✓</span>
                                <span>No Obligation Quote</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
            <GetQuoteModal open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
        </>
    );
}
