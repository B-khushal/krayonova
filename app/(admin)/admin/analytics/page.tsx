import { BarChart3, Eye, Monitor, Globe, TrendingUp } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function AnalyticsCenterPage() {
  const { data: analyticsData } = await supabaseAdmin.from("analytics").select("*");
  const totalViews = analyticsData?.length || 0;

  // Group by path
  const pathViews: Record<string, number> = {};
  const deviceCounts: Record<string, number> = {};
  const referrerCounts: Record<string, number> = {};

  (analyticsData || []).forEach((item: any) => {
    const p = item.path || "/";
    pathViews[p] = (pathViews[p] || 0) + 1;

    const device = item.device || "Desktop";
    deviceCounts[device] = (deviceCounts[device] || 0) + 1;

    const ref = item.referrer || "Direct";
    referrerCounts[ref] = (referrerCounts[ref] || 0) + 1;
  });

  const topPaths = Object.entries(pathViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

  const topDevices = Object.entries(deviceCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const topReferrers = Object.entries(referrerCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const uniquePaths = Object.keys(pathViews).length;

  return (
    <div className="space-y-6 admin-page">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-text-primary">Analytics Center</h1>
            <p className="text-sm text-text-tertiary mt-0.5">Server-side page view tracking and visitor insights.</p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 admin-stagger">
        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Total Views</p>
            <div className="w-8 h-8 rounded-xl bg-info-muted flex items-center justify-center"><Eye className="w-4 h-4 text-info" /></div>
          </div>
          <p className="text-2xl font-display font-bold text-text-primary">{totalViews.toLocaleString()}</p>
        </div>

        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Pages Tracked</p>
            <div className="w-8 h-8 rounded-xl bg-success-muted flex items-center justify-center"><Globe className="w-4 h-4 text-success" /></div>
          </div>
          <p className="text-2xl font-display font-bold text-text-primary">{uniquePaths}</p>
        </div>

        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Devices</p>
            <div className="w-8 h-8 rounded-xl bg-warning-muted flex items-center justify-center"><Monitor className="w-4 h-4 text-warning" /></div>
          </div>
          <p className="text-2xl font-display font-bold text-text-primary">{Object.keys(deviceCounts).length}</p>
        </div>

        <div className="admin-card p-5 flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Sources</p>
            <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center"><TrendingUp className="w-4 h-4 text-primary" /></div>
          </div>
          <p className="text-2xl font-display font-bold text-text-primary">{Object.keys(referrerCounts).length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold text-text-primary">Top Pages</h3>
          <div className="space-y-3">
            {topPaths.length === 0 ? (
              <p className="text-text-tertiary text-xs text-center py-4">No page views tracked yet.</p>
            ) : (
              topPaths.map(([path, count]) => {
                const pct = Math.round((count / totalViews) * 100) || 0;
                return (
                  <div key={path} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-mono text-text-secondary truncate max-w-[200px]">{path}</span>
                      <span className="text-text-tertiary font-medium">{count} <span className="opacity-60">({pct}%)</span></span>
                    </div>
                    <div className="w-full bg-bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-accent h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold text-text-primary">Device Breakdown</h3>
          <div className="space-y-3">
            {topDevices.map(([device, count]) => {
              const pct = Math.round((count / totalViews) * 100) || 0;
              return (
                <div key={device} className="flex items-center justify-between py-2 border-b border-border-soft last:border-0">
                  <span className="text-sm text-text-secondary">{device}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-bg-secondary h-1.5 rounded-full overflow-hidden">
                      <div className="bg-info h-full rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-mono text-text-tertiary w-12 text-right">{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="admin-card p-6 space-y-4 lg:col-span-2">
          <h3 className="text-sm font-display font-semibold text-text-primary">Traffic Sources</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {topReferrers.map(([ref, count]) => (
              <div key={ref} className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-border-soft">
                <span className="text-sm text-text-secondary truncate">{ref}</span>
                <span className="text-sm font-display font-bold text-text-primary">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
