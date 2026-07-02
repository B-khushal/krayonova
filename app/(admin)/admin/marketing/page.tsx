"use client";

import { Megaphone, Mail, MousePointer, Percent, TrendingUp, Zap, Globe } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import EmptyState from "@/components/admin/ui/EmptyState";

export default function MarketingCenterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Marketing Center"
        description="Manage campaigns, CTAs, announcements, and subscriber engagement."
        icon={<Megaphone className="w-5 h-5" />}
      />

      <div className="grid md:grid-cols-3 gap-5 admin-stagger">
        {[
          { label: "Campaigns", value: "0", icon: Megaphone, desc: "Active marketing campaigns", color: "bg-primary-light text-primary" },
          { label: "Subscribers", value: "0", icon: Mail, desc: "Newsletter subscribers", color: "bg-info-muted text-info" },
          { label: "CTAs Active", value: "0", icon: MousePointer, desc: "Live call-to-actions", color: "bg-success-muted text-success" },
        ].map((stat) => (
          <div key={stat.label} className="admin-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">{stat.label}</p>
              <div className={`w-8 h-8 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-text-primary">{stat.value}</p>
            <p className="text-[11px] text-text-tertiary">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="admin-card">
          <EmptyState
            icon={Megaphone}
            title="Campaign Manager"
            description="Create and track marketing campaigns with conversion analytics. Coming soon."
          />
        </div>
        <div className="admin-card">
          <EmptyState
            icon={Globe}
            title="Announcement Bar"
            description="Configure site-wide banners and promotional announcements. Coming soon."
          />
        </div>
      </div>
    </div>
  );
}
