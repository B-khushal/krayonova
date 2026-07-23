"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  FileText,
  Briefcase,
  MessageSquare,
  Settings,
  BarChart3,
  Star,
  Image as ImageIcon,
  Bell,
  Globe,
  Search as SearchIcon,
  Sparkles,
  PenTool,
  Megaphone,
  Shield,
  Zap,
  Database,
  Activity,
  TrendingUp,
  Target,
  Mail,
  Folder,
  Link as LinkIcon,
  Hash,
  Map,
  Monitor,
  Lock,
  Webhook,
  Key,
  Flag,
  HardDrive,
  RefreshCw,
  FileCode,
  UserCheck,
  Clock,
  BookOpen,
  Award,
  Heart,
  MessageCircle,
  Calendar,
  DollarSign,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  LayoutList,
  Layers,
  Tag,
  Palette,
  Columns3,
  Eye,
  ListChecks,
  Bot,
  Workflow,
  Send,
  BarChart2,
  ChevronRight,
} from "lucide-react";
import SidebarGroup from "./SidebarGroup";
import AdminHeader from "./AdminHeader";
import LogoutButton from "@/components/LogoutButton";
import { ToastProvider } from "@/components/admin/ui/Toast";
import BrandLogo from "@/components/BrandLogo";

type AdminShellProps = {
  children: React.ReactNode;
  userName: string;
  userRole: string;
};

export default function AdminShell({ children, userName, userRole }: AdminShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickCreateOpen, setQuickCreateOpen] = useState(false);

  // ⌘K keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSearchOpen = useCallback(() => setSearchOpen(true), []);
  const handleQuickCreate = useCallback(() => setQuickCreateOpen(true), []);
  const handleMobileMenuToggle = useCallback(() => setMobileMenuOpen((prev) => !prev), []);

  const sidebarWidth = sidebarCollapsed ? "md:w-[68px]" : "md:w-[260px]";
  const mainMargin = sidebarCollapsed ? "md:ml-[68px]" : "md:ml-[260px]";

  return (
    <div className="flex min-h-screen bg-bg-primary">
      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`w-[260px] ${sidebarWidth} fixed inset-y-0 left-0 bg-white border-r border-border-soft z-50 flex flex-col transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className={`h-16 flex items-center border-b border-border-soft shrink-0 ${sidebarCollapsed ? "justify-center px-2" : "px-5"}`}>
          {sidebarCollapsed ? (
            <BrandLogo href="/admin" showWordmark={false} className="justify-center" />
          ) : (
            <div className="flex items-center gap-2.5 group">
              <BrandLogo href="/" className="gap-2.5" />
              <div className="flex flex-col">
                <span className="text-[9px] font-semibold uppercase tracking-[0.15em] text-primary">Agency OS</span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 overflow-y-auto admin-scrollbar ${sidebarCollapsed ? "px-2 py-4" : "px-3 py-4"} space-y-1`}>
          {/* ── Overview ── */}
          <SidebarGroup
            label="Overview"
            icon={<LayoutDashboard className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            defaultOpen
            links={[
              { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
              { name: "Activity Feed", href: "/admin/audit-logs", icon: Activity },
              { name: "Notifications", href: "/admin/notifications", icon: Bell },
            ]}
          />

          {/* ── Website Builder ── */}
          <SidebarGroup
            label="Website Builder"
            icon={<Globe className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Homepage Builder", href: "/admin/website-builder", icon: Layers },
              { name: "Section Controls", href: "/admin/website-builder/sections", icon: Eye },
              { name: "Navigation", href: "/admin/settings", icon: LayoutList },
              { name: "SEO Builder", href: "/admin/seo", icon: SearchIcon },
            ]}
          />

          {/* ── Content Management ── */}
          <SidebarGroup
            label="Content"
            icon={<FileText className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Pages", href: "/admin/pages", icon: FileText },
              { name: "Blog Posts", href: "/admin/blog", icon: PenTool },
              { name: "Testimonials", href: "/admin/testimonials", icon: Star },
              { name: "Careers", href: "/admin/careers", icon: Briefcase },
              { name: "Pricing", href: "/admin/pricing", icon: DollarSign },
            ]}
          />

          {/* ── Portfolio ── */}
          <SidebarGroup
            label="Portfolio"
            icon={<FolderKanban className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Projects", href: "/admin/portfolio", icon: FolderKanban },
            ]}
          />

          {/* ── Services ── */}
          <SidebarGroup
            label="Services"
            icon={<Briefcase className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Service Cards", href: "/admin/services", icon: Briefcase },
            ]}
          />

          {/* ── CRM ── */}
          <SidebarGroup
            label="CRM"
            icon={<MessageSquare className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Lead Pipeline", href: "/admin/crm", icon: Target },
              { name: "Leads", href: "/admin/leads", icon: MessageCircle },
            ]}
          />

          {/* ── Marketing ── */}
          <SidebarGroup
            label="Marketing"
            icon={<Megaphone className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Campaigns", href: "/admin/marketing", icon: Megaphone },
            ]}
          />

          {/* ── Media ── */}
          <SidebarGroup
            label="Media"
            icon={<ImageIcon className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Media Library", href: "/admin/media", icon: ImageIcon },
            ]}
          />

          {/* ── Analytics ── */}
          <SidebarGroup
            label="Analytics"
            icon={<BarChart3 className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Overview", href: "/admin/analytics", icon: BarChart3 },
            ]}
          />

          {/* ── Automation ── */}
          <SidebarGroup
            label="Automation"
            icon={<Zap className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Workflows", href: "/admin/automation", icon: Workflow },
            ]}
          />

          {/* ── User Management ── */}
          <SidebarGroup
            label="Users"
            icon={<Users className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Users & Roles", href: "/admin/users", icon: Users },
            ]}
          />

          {/* ── System ── */}
          <SidebarGroup
            label="System"
            icon={<Settings className="w-4 h-4" />}
            collapsed={sidebarCollapsed}
            links={[
              { name: "Settings", href: "/admin/settings", icon: Settings },
              { name: "System Center", href: "/admin/system", icon: Database },
            ]}
          />
        </nav>

        {/* Footer */}
        <div className={`border-t border-border-soft p-3 space-y-1 shrink-0`}>
          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="admin-sidebar-item w-full hidden md:flex"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 shrink-0" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4 shrink-0" />
                <span className="truncate">Collapse</span>
              </>
            )}
          </button>

          {/* Logout */}
          <LogoutButton
            className={`admin-sidebar-item w-full text-left hover:!bg-danger-muted hover:!text-danger ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          />
        </div>
      </aside>

      {/* ── Main Content Area ── */}
      <div className={`ml-0 ${mainMargin} flex-1 flex flex-col min-h-screen transition-all duration-300 ease-out min-w-0`}>
        <AdminHeader
          userName={userName}
          userRole={userRole}
          onSearchOpen={handleSearchOpen}
          onQuickCreate={handleQuickCreate}
          onMobileMenuToggle={handleMobileMenuToggle}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto admin-page">
            <ToastProvider>
              {children}
            </ToastProvider>
          </div>
        </main>

        {/* Footer bar */}
        <footer className="h-10 flex items-center justify-between px-8 border-t border-border-soft text-[11px] text-text-tertiary">
          <span>KrayoNova Agency OS &middot; Enterprise Edition</span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-success"></span>
            All Systems Operational
          </span>
        </footer>
      </div>

      {/* ── Command Palette Overlay (placeholder) ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] admin-glass-overlay flex items-start justify-center pt-[15vh]"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="admin-glass rounded-2xl w-full max-w-lg p-4 animate-admin-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-3 py-2 border-b border-border-soft mb-3">
              <SearchIcon className="w-5 h-5 text-text-tertiary shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search pages, actions, content..."
                className="flex-1 bg-transparent text-text-primary text-sm outline-none placeholder:text-text-placeholder"
              />
              <kbd className="text-[10px] font-mono text-text-tertiary bg-bg-secondary px-1.5 py-0.5 rounded border border-border-soft">
                ESC
              </kbd>
            </div>
            <div className="px-3 py-6 text-center text-text-tertiary text-xs">
              <p>Start typing to search across all admin sections</p>
            </div>
          </div>
        </div>
      )}

      {/* ── Quick Create Modal (placeholder) ── */}
      {quickCreateOpen && (
        <div
          className="fixed inset-0 z-[100] admin-glass-overlay flex items-center justify-center"
          onClick={() => setQuickCreateOpen(false)}
        >
          <div
            className="admin-glass rounded-2xl w-full max-w-md p-6 animate-admin-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-display font-semibold text-text-primary mb-4">Quick Create</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Blog Post", icon: PenTool, href: "/admin/blog/new" },
                { label: "Project", icon: FolderKanban, href: "/admin/portfolio/new" },
                { label: "Service", icon: Briefcase, href: "/admin/services/new" },
                { label: "Upload Media", icon: ImageIcon, href: "/admin/media" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setQuickCreateOpen(false)}
                  className="admin-card admin-card-interactive p-4 flex flex-col items-center gap-2 text-center"
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-xs font-medium text-text-primary">{item.label}</span>
                </Link>
              ))}
            </div>
            <button
              onClick={() => setQuickCreateOpen(false)}
              className="w-full mt-4 admin-btn-secondary justify-center text-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
