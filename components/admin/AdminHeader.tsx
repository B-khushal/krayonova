"use client";

import { Search, Bell, Plus, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

type AdminHeaderProps = {
  userName?: string;
  userRole?: string;
  onSearchOpen?: () => void;
  onQuickCreate?: () => void;
  onMobileMenuToggle?: () => void;
};

const routeTitles: Record<string, string> = {
  "/admin": "Executive Dashboard",
  "/admin/users": "Users & Roles",
  "/admin/pages": "Page Management",
  "/admin/services": "Service Management",
  "/admin/portfolio": "Portfolio Management",
  "/admin/blog": "Blog CMS",
  "/admin/testimonials": "Testimonials",
  "/admin/careers": "Careers",
  "/admin/pricing": "Pricing",
  "/admin/crm": "CRM Pipeline",
  "/admin/media": "Media Library",
  "/admin/audit-logs": "Audit Logs",
  "/admin/notifications": "Notifications",
  "/admin/settings": "Settings",
  "/admin/website-builder": "Website Builder",
  "/admin/seo": "SEO Center",
  "/admin/analytics": "Analytics Center",
  "/admin/marketing": "Marketing Center",
  "/admin/automation": "Automation Center",
  "/admin/system": "System Center",
};

function getBreadcrumbs(pathname: string): { label: string; href: string }[] {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href: string }[] = [];
  let path = "";
  for (const seg of segments) {
    path += `/${seg}`;
    const label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, " ");
    crumbs.push({ label, href: path });
  }
  return crumbs;
}

export default function AdminHeader({
  userName = "Admin",
  userRole = "Super Admin",
  onSearchOpen,
  onQuickCreate,
  onMobileMenuToggle,
}: AdminHeaderProps) {
  const pathname = usePathname() || "/admin";

  // Find the best matching title
  let pageTitle = "Admin";
  const sortedRoutes = Object.keys(routeTitles).sort((a, b) => b.length - a.length);
  for (const route of sortedRoutes) {
    if (pathname === route || (route !== "/admin" && pathname.startsWith(route))) {
      pageTitle = routeTitles[route];
      break;
    }
  }

  const breadcrumbs = getBreadcrumbs(pathname);
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-16 flex items-center justify-between px-4 sm:px-8 bg-white/80 backdrop-blur-md border-b border-border-soft sticky top-0 z-30">
      {/* Left: Mobile Toggle + Breadcrumbs + Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 text-text-secondary hover:text-text-primary rounded-lg border border-border-soft hover:bg-bg-secondary transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex flex-col justify-center">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-text-tertiary">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {index > 0 && <span className="text-border-medium">/</span>}
                <span className={index === breadcrumbs.length - 1 ? "text-text-secondary font-medium" : ""}>
                  {crumb.label}
                </span>
              </span>
            ))}
          </div>
          <h1 className="text-base sm:text-lg font-display font-semibold text-text-primary -mt-0.5">{pageTitle}</h1>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search Trigger */}
        <button
          onClick={onSearchOpen}
          className="admin-btn-ghost gap-2 sm:gap-3 text-xs text-text-tertiary hover:text-text-primary rounded-xl border border-border-soft px-2.5 sm:px-3 py-1.5"
          title="Search (⌘K)"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Search...</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 px-1.5 py-0.5 bg-bg-secondary rounded text-[10px] font-mono text-text-tertiary border border-border-soft">
            ⌘K
          </kbd>
        </button>

        {/* Quick Create */}
        <button
          onClick={onQuickCreate}
          className="admin-btn-primary py-1.5 px-2.5 sm:px-3 text-xs"
          title="Quick Create"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Create</span>
        </button>

        {/* Notifications */}
        <button className="admin-btn-ghost p-2 relative" title="Notifications">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full ring-2 ring-white"></span>
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-border-soft mx-0.5 sm:mx-1"></div>

        {/* User Avatar */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xs font-bold shadow-sm">
            {initials}
          </div>
          <div className="hidden md:block">
            <p className="text-xs font-semibold text-text-primary leading-tight">{userName}</p>
            <p className="text-[10px] text-text-tertiary leading-tight">{userRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
