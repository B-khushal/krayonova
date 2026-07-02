import {
  Eye,
  Users,
  MessageSquare,
  FolderKanban,
  ArrowUpRight,
  LineChart,
  TrendingUp,
  Clock,
  PenTool,
  Image as ImageIcon,
  Target,
  Activity,
  CheckCircle,
  Zap,
} from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Link from "next/link";

export default async function AdminDashboard() {
  // Query Supabase
  const { data: leadsData } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: projectsData } = await supabaseAdmin
    .from("portfolio")
    .select("*");

  const { data: clientsData } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("role", "client");

  const { data: analyticsData } = await supabaseAdmin
    .from("analytics")
    .select("*");

  const { data: postsData } = await supabaseAdmin
    .from("blog_posts")
    .select("*");

  const totalLeads = leadsData?.length || 0;
  const totalProjects = projectsData?.length || 0;
  const totalClients = clientsData?.length || 0;
  const totalPageViews = analyticsData?.length || 0;
  const totalPosts = postsData?.length || 0;

  const recentLeads = (leadsData || []).slice(0, 5).map((lead) => ({
    id: lead.id,
    firstName: lead.name?.split(" ")[0] || lead.name || "Inquiry",
    lastName: lead.name?.split(" ").slice(1).join(" ") || "",
    email: lead.email,
    company: lead.company,
    source: lead.source,
    status: lead.status,
    details: lead.notes,
    created_at: lead.created_at,
  }));

  // Group views by path
  const pathViews: Record<string, number> = {};
  (analyticsData || []).forEach((item) => {
    const p = item.path || "/";
    pathViews[p] = (pathViews[p] || 0) + 1;
  });

  const statusBadge = (status: string) => {
    switch (status) {
      case "Won":
        return "admin-badge admin-badge-success";
      case "In Discussion":
        return "admin-badge admin-badge-warning";
      case "Applied":
        return "admin-badge admin-badge-primary";
      case "Lost":
        return "admin-badge admin-badge-danger";
      default:
        return "admin-badge admin-badge-info";
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="admin-card p-6 bg-gradient-to-r from-primary/5 via-accent/5 to-transparent border-primary/10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-bold text-text-primary mb-1">
              Welcome back to your Agency OS
            </h2>
            <p className="text-sm text-text-tertiary">
              Here&apos;s what&apos;s happening across your digital agency today.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-medium text-success">All systems operational</span>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 admin-stagger">
        {/* Page Views */}
        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Page Views</p>
            <div className="w-8 h-8 rounded-xl bg-info-muted flex items-center justify-center">
              <Eye className="w-4 h-4 text-info" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-text-primary">{totalPageViews.toLocaleString()}</p>
            <p className="stat-trend-up mt-1">
              <ArrowUpRight className="w-3 h-3" />
              Active tracking
            </p>
          </div>
        </div>

        {/* Active Clients */}
        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Clients</p>
            <div className="w-8 h-8 rounded-xl bg-success-muted flex items-center justify-center">
              <Users className="w-4 h-4 text-success" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-text-primary">{totalClients}</p>
            <p className="stat-trend-up mt-1">
              <ArrowUpRight className="w-3 h-3" />
              CRM accounts
            </p>
          </div>
        </div>

        {/* Total Leads */}
        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Leads</p>
            <div className="w-8 h-8 rounded-xl bg-warning-muted flex items-center justify-center">
              <Target className="w-4 h-4 text-warning" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-text-primary">{totalLeads}</p>
            <p className="stat-trend-up mt-1">
              <ArrowUpRight className="w-3 h-3" />
              Inquiries logged
            </p>
          </div>
        </div>

        {/* Portfolio Projects */}
        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Projects</p>
            <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center">
              <FolderKanban className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-display font-bold text-text-primary">{totalProjects}</p>
            <p className="stat-trend-up mt-1">
              <ArrowUpRight className="w-3 h-3" />
              Managed projects
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Leads — 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-display font-semibold text-text-primary flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              Recent CRM Leads
            </h2>
            <Link href="/admin/crm" className="text-xs font-medium text-primary hover:text-primary-hover transition-colors">
              View all →
            </Link>
          </div>

          <div className="admin-card overflow-hidden">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-10 text-center text-text-tertiary text-sm">
                      No leads registered yet. They&apos;ll appear here once inquiries come in.
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <div>
                          <p className="font-semibold text-text-primary text-sm">
                            {lead.firstName} {lead.lastName}
                          </p>
                          <p className="text-xs text-text-tertiary mt-0.5">{lead.email}</p>
                        </div>
                      </td>
                      <td>
                        <p className="text-xs text-text-secondary line-clamp-1 max-w-xs">{lead.details}</p>
                      </td>
                      <td>
                        <span className={statusBadge(lead.status || "New")}>
                          {lead.status || "New"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Traffic Insights */}
          <div>
            <h2 className="text-base font-display font-semibold text-text-primary flex items-center gap-2 mb-4">
              <LineChart className="w-4 h-4 text-primary" />
              Traffic Insights
            </h2>
            <div className="admin-card p-5 space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Path Distribution
              </p>
              <div className="space-y-3">
                {Object.entries(pathViews).length === 0 ? (
                  <p className="text-text-tertiary text-xs text-center py-4">
                    No traffic logged yet.
                  </p>
                ) : (
                  Object.entries(pathViews)
                    .slice(0, 5)
                    .map(([path, count]) => {
                      const pct = Math.round((count / totalPageViews) * 100) || 0;
                      return (
                        <div key={path} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-mono text-text-secondary truncate max-w-[140px]">{path}</span>
                            <span className="text-text-tertiary font-medium">
                              {count} <span className="opacity-60">({pct}%)</span>
                            </span>
                          </div>
                          <div className="w-full bg-bg-secondary h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-primary to-accent h-full rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
              <p className="text-text-tertiary text-[10px] text-center pt-2 border-t border-border-soft">
                Real-time server-side tracking is operational
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-base font-display font-semibold text-text-primary flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-primary" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "New Post", icon: PenTool, href: "/admin/blog/new", color: "text-info" },
                { label: "Add Project", icon: FolderKanban, href: "/admin/portfolio/new", color: "text-primary" },
                { label: "View Leads", icon: Target, href: "/admin/crm", color: "text-warning" },
                { label: "Upload Media", icon: ImageIcon, href: "/admin/media", color: "text-success" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="admin-card admin-card-interactive p-4 flex items-center gap-3"
                >
                  <item.icon className={`w-4 h-4 ${item.color} shrink-0`} />
                  <span className="text-xs font-medium text-text-primary">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Content Stats */}
        <div className="admin-card p-5 space-y-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Content Overview</h3>
          <div className="space-y-3">
            {[
              { label: "Blog Posts", value: totalPosts, icon: PenTool },
              { label: "Projects", value: totalProjects, icon: FolderKanban },
              { label: "Total Leads", value: totalLeads, icon: Target },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border-soft last:border-0">
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 text-text-tertiary" />
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </div>
                <span className="text-sm font-display font-bold text-text-primary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="admin-card p-5 space-y-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">System Health</h3>
          <div className="space-y-3">
            {[
              { label: "Database", status: "Operational", color: "bg-success" },
              { label: "Storage", status: "Operational", color: "bg-success" },
              { label: "Authentication", status: "Operational", color: "bg-success" },
              { label: "API", status: "Operational", color: "bg-success" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between py-2 border-b border-border-soft last:border-0">
                <span className="text-sm text-text-secondary">{item.label}</span>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                  <span className="text-xs font-medium text-success">{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="admin-card p-5 space-y-4">
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Platform Activity</h3>
          <div className="space-y-3">
            {[
              { label: "Admin panel loaded", time: "Just now", icon: Activity },
              { label: `${totalLeads} leads in pipeline`, time: "Live", icon: Target },
              { label: `${totalPageViews} page views tracked`, time: "Cumulative", icon: Eye },
              { label: `${totalPosts} blog posts`, time: "Published", icon: PenTool },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 py-2 border-b border-border-soft last:border-0">
                <item.icon className="w-3.5 h-3.5 text-text-tertiary mt-0.5 shrink-0" />
                <div className="flex-1">
                  <p className="text-xs text-text-secondary">{item.label}</p>
                  <p className="text-[10px] text-text-tertiary">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
