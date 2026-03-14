"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GetQuoteModal } from "@/components/get-quote-modal";

export function Footer() {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <>
            <motion.footer
                className="border-t border-border/40 py-12 bg-gradient-to-br from-primary/8 via-background/60 to-primary/6 dark:from-purple-950/35 dark:via-purple-900/28 dark:to-purple-800/34"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, ease: "easeInOut" }}
            >
                <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <motion.div
                            className="md:col-span-2"
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.08, ease: "easeInOut" }}
                        >
                            <span className="font-bold text-xl tracking-tight text-purple-800 dark:text-purple-400 mb-4 block">KrayoNova</span>
                            <p className="text-muted-foreground mb-6 max-w-xs">
                                We design powerful websites, build scalable applications, and host them on secure cloud infrastructure.
                            </p>
                            <Button 
                                onClick={() => setIsQuoteOpen(true)}
                                className="mb-6 bg-primary hover:bg-primary/90 rounded-full"
                            >
                                Get a Quote
                            </Button>
                            <div className="flex space-x-4 text-muted-foreground">
                                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.45, ease: "easeInOut" }}>
                                    <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-all duration-500 ease-in-out hover:shadow-[0_0_26px_rgba(147,51,234,0.45)]"><Twitter className="h-5 w-5" /></Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.45, ease: "easeInOut" }}>
                                    <Link href="https://instagram.com/krayonova" target="_blank" rel="noopener noreferrer" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-all duration-500 ease-in-out hover:shadow-[0_0_26px_rgba(147,51,234,0.45)]"><Instagram className="h-5 w-5" /></Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.45, ease: "easeInOut" }}>
                                    <Link href="https://github.com/B-khushal" target="_blank" rel="noopener noreferrer" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-all duration-500 ease-in-out hover:shadow-[0_0_26px_rgba(147,51,234,0.45)]"><Github className="h-5 w-5" /></Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.45, ease: "easeInOut" }}>
                                    <Link href="https://www.linkedin.com/in/badodhe-khushal-prasad-b00b51284" target="_blank" rel="noopener noreferrer" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-all duration-500 ease-in-out hover:shadow-[0_0_26px_rgba(147,51,234,0.45)]"><Linkedin className="h-5 w-5" /></Link>
                                </motion.div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.16, ease: "easeInOut" }}
                        >
                            <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li><Link href="#home" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Home</Link></li>
                                <li><Link href="#services" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Services</Link></li>
                                <li><Link href="#portfolio" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Portfolio</Link></li>
                                <li><Link href="#hosting" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Hosting</Link></li>
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.24, ease: "easeInOut" }}
                        >
                            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li><Link href="#about" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">About Us</Link></li>
                                <li><Link href="#contact" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Contact</Link></li>
                                <li><Link href="#" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                            </ul>
                        </motion.div>
                    </div>
                    <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                        © 2026 KrayoNova — Build. Launch. Scale.
                    </div>
                </div>
            </motion.footer>
            <GetQuoteModal open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
        </>
    );
}
