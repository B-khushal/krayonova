"use client";

import { Database, Flag, Shield, Key, HardDrive, RefreshCw, Activity } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";

export default function SystemCenterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="System Center"
        description="Monitor system health, feature flags, security, and platform infrastructure."
        icon={<Database className="w-5 h-5" />}
      />

      {/* System Health */}
      <div className="admin-card p-6 space-y-4">
        <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
          <Activity className="w-4 h-4 text-success" /> System Health
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Supabase Database", status: "Operational" },
            { label: "Supabase Auth", status: "Operational" },
            { label: "Supabase Storage", status: "Operational" },
            { label: "Next.js Runtime", status: "Operational" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between p-4 bg-bg-primary rounded-xl border border-border-soft">
              <span className="text-sm text-text-secondary">{item.label}</span>
              <Badge variant="success" dot>{item.status}</Badge>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Feature Flags */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
            <Flag className="w-4 h-4 text-primary" /> Feature Flags
          </h3>
          <div className="space-y-3">
            {[
              { flag: "AI Assistant", enabled: false, desc: "Enable the AI chat panel" },
              { flag: "Analytics Tracking", enabled: true, desc: "Server-side page view tracking" },
              { flag: "CRM Kanban View", enabled: false, desc: "Drag-and-drop lead pipeline" },
              { flag: "Dark Mode Toggle", enabled: false, desc: "Allow theme switching" },
            ].map((item) => (
              <div key={item.flag} className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-border-soft">
                <div>
                  <p className="text-sm font-medium text-text-primary">{item.flag}</p>
                  <p className="text-[10px] text-text-tertiary">{item.desc}</p>
                </div>
                <div className={`admin-toggle ${item.enabled ? "active" : ""}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Security & Keys */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Security & Integrations
          </h3>
          <div className="space-y-3">
            {[
              { label: "Supabase URL", value: "••••••••.supabase.co", icon: Database },
              { label: "Supabase Anon Key", value: "eyJ••••••••••", icon: Key },
              { label: "Google AI API", value: "AI••••••••••", icon: Key },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-border-soft">
                <div className="flex items-center gap-2.5">
                  <item.icon className="w-3.5 h-3.5 text-text-tertiary" />
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </div>
                <span className="text-xs font-mono text-text-tertiary">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Storage & Cache */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-primary" /> Storage Buckets
          </h3>
          <div className="space-y-2">
            {["general", "portfolio", "blog", "careers", "testimonials"].map((bucket) => (
              <div key={bucket} className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-border-soft">
                <span className="text-sm text-text-secondary font-mono">{bucket}</span>
                <Badge variant="neutral">Active</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance */}
        <div className="admin-card p-6 space-y-4">
          <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-primary" /> Maintenance
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-bg-primary rounded-xl border border-border-soft">
              <div>
                <p className="text-sm font-medium text-text-primary">Maintenance Mode</p>
                <p className="text-[10px] text-text-tertiary">Show maintenance page to visitors</p>
              </div>
              <div className="admin-toggle" />
            </div>
            <button className="admin-btn-secondary w-full justify-center text-sm">
              <RefreshCw className="w-4 h-4" /> Clear Application Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
