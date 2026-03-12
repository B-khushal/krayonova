"use client";

import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { GetQuoteModal } from "@/components/get-quote-modal";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Hosting", href: "#hosting" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
                <div className="flex md:flex-1">
                    <Link href="/" className="flex items-center space-x-2">
                        <img 
                            src="/KrayoNova-Logo.png" 
                            alt="KrayoNova Logo" 
                            className="h-18 w-auto object-contain dark:invert"
                            />
                    </Link>
                </div>

                <div className="hidden md:flex md:flex-1 md:justify-center">
                    <nav className="flex items-center space-x-6 text-base md:text-lg font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="transition-colors hover:text-purple-800 dark:hover:text-purple-400 text-foreground/70"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-4">
                        <ThemeToggle />
                        <GetQuoteModal
                            trigger={
                                <Button className="hidden md:inline-flex rounded-full font-semibold">
                                    Get Quote
                                </Button>
                            }
                        />
                    </nav>
                </div>
            </div>
        </header>
    );
}
