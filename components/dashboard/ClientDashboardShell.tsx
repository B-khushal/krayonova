"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutDashboard, FolderKanban, Receipt, MessageSquare, Settings, Bell, Menu, X } from "lucide-react";
import Background from "@/components/Background";
import LogoutButton from "@/components/LogoutButton";
import BrandLogo from "@/components/BrandLogo";

type ClientDashboardShellProps = {
  children: React.ReactNode;
  user: {
    name?: string | null;
    email?: string | null;
    company?: string | null;
  };
};

export default function ClientDashboardShell({ children, user }: ClientDashboardShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "#", icon: FolderKanban },
    { name: "Invoices", href: "#", icon: Receipt },
    { name: "Messages", href: "#", icon: MessageSquare },
    { name: "Settings", href: "#", icon: Settings },
  ];

  const initials = user.name
    ? user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "CL";

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Background />

      {/* Mobile Backdrop Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`w-64 fixed inset-y-0 left-0 bg-white/90 backdrop-blur-xl border-r border-gray-200/50 z-40 flex flex-col transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          <BrandLogo href="/" wordmarkExtra={<span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">Client</span>} />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden p-1 text-text-muted hover:text-text-main"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = link.name === "Dashboard";
            return (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-muted hover:bg-gray-100/50 hover:text-text-main'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            );
          })}
        </div>
        <div className="p-4 border-t border-gray-100">
          <LogoutButton className="flex items-center gap-3 px-4 py-3 rounded-xl text-text-muted hover:bg-red-50 hover:text-red-500 transition-all w-full text-left cursor-pointer" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-0 md:ml-64 flex-1 flex flex-col relative z-10 min-w-0">
        <header className="h-20 flex items-center justify-between px-4 sm:px-8 bg-white/50 backdrop-blur-md border-b border-gray-100 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-text-muted hover:text-text-main rounded-lg border border-gray-200"
              title="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg sm:text-xl font-medium text-text-main">Dashboard</h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button aria-label="Notifications" className="text-text-muted hover:text-primary transition-colors relative cursor-pointer p-1">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l border-gray-200">
              <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs sm:text-sm font-medium shrink-0">
                {initials}
              </div>
              <div className="text-sm hidden sm:block">
                <p className="font-medium text-text-main leading-tight">{user.name || "Client"}</p>
                <p className="text-text-muted text-xs leading-tight">{user.company || "Enterprise"}</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
