"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";

type SidebarLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SidebarGroupProps = {
  label: string;
  icon: ReactNode;
  links: SidebarLink[];
  collapsed?: boolean;
  defaultOpen?: boolean;
};

export default function SidebarGroup({
  label,
  icon,
  links,
  collapsed = false,
  defaultOpen = false,
}: SidebarGroupProps) {
  const pathname = usePathname();
  const hasActiveChild = links.some((link) => pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href)));
  const [open, setOpen] = useState(defaultOpen || hasActiveChild);

  if (collapsed) {
    return (
      <div className="relative group/sidebar-group">
        <div className="flex items-center justify-center p-2 rounded-xl text-text-secondary hover:bg-sidebar-hover transition-colors cursor-pointer">
          {icon}
        </div>
        {/* Tooltip flyout */}
        <div className="absolute left-full top-0 ml-2 hidden group-hover/sidebar-group:block z-50">
          <div className="admin-glass rounded-xl py-2 px-1 min-w-[180px] shadow-lg border border-border-soft">
            <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-tertiary">{label}</p>
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors ${
                    isActive
                      ? "bg-primary-light text-primary font-semibold"
                      : "text-text-secondary hover:bg-sidebar-hover hover:text-text-primary"
                  }`}
                >
                  <link.icon className="w-3.5 h-3.5 shrink-0" />
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer rounded-lg hover:bg-surface-hover"
      >
        <span className="shrink-0 opacity-70">{icon}</span>
        <span className="flex-1 text-left">{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${
            open ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-1 mt-0.5 space-y-0.5 pb-2">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`admin-sidebar-item ${isActive ? "admin-sidebar-item-active" : ""}`}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
