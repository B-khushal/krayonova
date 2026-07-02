"use client";

import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";
import { useDocument } from "@/hooks/use-content";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const { data: footerData } = useDocument<any>("settings", "footer");

  const description = footerData?.description || "Engineering the Future. A premium digital studio crafting world-class software, websites, and AI solutions for visionary enterprises.";
  
  const socials = [
    { Icon: Twitter, url: footerData?.twitterUrl || "#" },
    { Icon: Linkedin, url: footerData?.linkedinUrl || "#" },
    { Icon: Github, url: footerData?.githubUrl || "#" },
    { Icon: Mail, url: footerData?.mailUrl || "mailto:hello@krayonova.com" }
  ];

  const companyLinks = footerData?.companyLinks || [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' }
  ];

  const expertiseLinks = footerData?.expertiseLinks || [
    { name: 'AI Solutions', href: '/services' },
    { name: 'Web Engineering', href: '/services' },
    { name: 'Mobile Apps', href: '/services' },
    { name: 'Cloud Architecture', href: '/services' }
  ];

  const legalLinks = footerData?.legalLinks || [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' }
  ];

  const statusLabel = footerData?.statusLabel || "All Systems Operational";
  const statusColor = footerData?.statusColor || "bg-green-500";

  return (
    <footer className="bg-white border-t border-black/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-2">
            <BrandLogo href="/" className="mb-6" />
            <p className="text-text-muted max-w-sm mb-8 leading-relaxed">
              {description}
            </p>
            <div className="flex items-center gap-4">
              {socials.map((social, i) => (
                <a 
                  key={i} 
                  href={social.url} 
                  target={social.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-bg-gray flex items-center justify-center text-text-muted hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <social.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-main mb-6">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link href={link.href} className="text-text-muted hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-main mb-6">Expertise</h4>
            <ul className="space-y-4">
              {expertiseLinks.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link href={link.href} className="text-text-muted hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-main mb-6">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map((link: any, idx: number) => (
                <li key={idx}>
                  <Link href={link.href} className="text-text-muted hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} KrayoNova Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${statusColor} mt-0.5`}></span>
            <span className="text-sm font-medium text-text-muted">{statusLabel}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
