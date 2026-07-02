"use client";

import { Zap, Workflow, Send, Clock, Webhook } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import EmptyState from "@/components/admin/ui/EmptyState";

export default function AutomationCenterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Automation Center"
        description="Build workflows, schedule actions, and connect external services."
        icon={<Zap className="w-5 h-5" />}
      />

      <div className="grid md:grid-cols-3 gap-5 admin-stagger">
        {[
          { label: "Active Workflows", value: "0", icon: Workflow, color: "bg-primary-light text-primary" },
          { label: "Scheduled Jobs", value: "0", icon: Clock, color: "bg-warning-muted text-warning" },
          { label: "Webhook Endpoints", value: "0", icon: Webhook, color: "bg-info-muted text-info" },
        ].map((stat) => (
          <div key={stat.label} className="admin-card p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">{stat.label}</p>
              <div className={`w-8 h-8 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-display font-bold text-text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="admin-card">
          <EmptyState
            icon={Workflow}
            title="Workflow Builder"
            description="Create automated workflows triggered by CRM events, form submissions, or schedules. Coming soon."
          />
        </div>
        <div className="admin-card">
          <EmptyState
            icon={Send}
            title="Email Automation"
            description="Set up automated email sequences for leads and clients. Coming soon."
          />
        </div>
      </div>
    </div>
  );
}
