"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GetQuoteModal } from "@/components/get-quote-modal";

export function Footer() {
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <>
            <footer className="border-t border-border/40 py-12 bg-gradient-to-br from-primary/10 via-background to-primary/5">
                <div className="container mx-auto px-4 md:px-8 max-w-screen-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-2">
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
                                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors"><Twitter className="h-5 w-5" /></Link>
                                <Link href="https://github.com/B-khushal" target="_blank" rel="noopener noreferrer" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors"><Github className="h-5 w-5" /></Link>
                                <Link href="https://www.linkedin.com/in/badodhe-khushal-prasad-b00b51284" target="_blank" rel="noopener noreferrer" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors"><Linkedin className="h-5 w-5" /></Link>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-foreground">Navigation</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li><Link href="#home" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Home</Link></li>
                                <li><Link href="#services" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Services</Link></li>
                                <li><Link href="#portfolio" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Portfolio</Link></li>
                                <li><Link href="#hosting" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Hosting</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                            <ul className="space-y-2 text-muted-foreground text-sm">
                                <li><Link href="#about" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">About Us</Link></li>
                                <li><Link href="#contact" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Contact</Link></li>
                                <li><Link href="#" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                                <li><Link href="#" className="premium-nav-link hover:text-purple-800 dark:hover:text-purple-400 transition-colors">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                        © 2026 KrayoNova — Build. Launch. Scale.
                    </div>
                </div>
            </footer>
            <GetQuoteModal open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
        </>
    );
}
