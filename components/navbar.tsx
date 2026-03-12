"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { GetQuoteModal } from "@/components/get-quote-modal";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import logoImage from "../public/KrayoNova-Logo.png";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Hosting", href: "#hosting" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
];

export function Navbar() {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [isQuoteOpen, setIsQuoteOpen] = useState(false);

    return (
        <>
            <header className="premium-nav-shell sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto">
                    <div className="flex md:flex-1">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src={logoImage}
                                alt="KrayoNova Logo"
                                width={logoImage.width}
                                height={logoImage.height}
                                sizes="168px"
                                unoptimized
                                priority
                                className="h-16 w-auto object-contain dark:invert"
                            />
                        </Link>
                    </div>

                    <div className="hidden md:flex md:flex-1 md:justify-center">
                        <nav className="premium-nav-pill flex items-center space-x-2 rounded-full px-3 py-2 text-base md:text-lg font-medium">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="premium-nav-link text-foreground/70 transition-colors hover:text-purple-800 dark:hover:text-purple-400"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className="flex flex-1 items-center justify-end space-x-3 md:space-x-4">
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            <ThemeToggle />
                            <Button
                                onClick={() => setIsQuoteOpen(true)}
                                className="rounded-full font-semibold"
                            >
                                Get Quote
                            </Button>
                        </div>

                        <div className="flex items-center gap-2 md:hidden">
                            <ThemeToggle />

                            <Dialog open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
                                <DialogTrigger asChild>
                                    <Button variant="outline" size="icon" className="rounded-full">
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">Open navigation menu</span>
                                    </Button>
                                </DialogTrigger>

                                <DialogContent className="!left-auto !right-0 !top-0 !h-dvh !max-w-[86vw] !translate-x-0 !translate-y-0 !rounded-none border-l border-border/60 p-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:!max-w-sm">
                                    <DialogTitle className="sr-only">Mobile navigation</DialogTitle>

                                    <div className="flex h-full flex-col bg-background/95 backdrop-blur-xl">
                                        <div className="border-b border-border/50 px-6 py-5 pr-14">
                                            <Image
                                                src={logoImage}
                                                alt="KrayoNova Logo"
                                                width={logoImage.width}
                                                height={logoImage.height}
                                                sizes="140px"
                                                unoptimized
                                                className="h-12 w-auto object-contain dark:invert"
                                            />
                                        </div>

                                        <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
                                            {navLinks.map((link) => (
                                                <Link
                                                    key={link.name}
                                                    href={link.href}
                                                    className="premium-nav-link justify-start px-4 py-3 text-base font-medium text-foreground/80"
                                                    onClick={() => setIsMobileNavOpen(false)}
                                                >
                                                    {link.name}
                                                </Link>
                                            ))}
                                        </nav>

                                        <div className="border-t border-border/50 px-4 py-5">
                                            <Button
                                                onClick={() => {
                                                    setIsMobileNavOpen(false);
                                                    setIsQuoteOpen(true);
                                                }}
                                                className="w-full rounded-full font-semibold"
                                            >
                                                Get Quote
                                            </Button>
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            </header>

            <GetQuoteModal open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
        </>
    );
}
