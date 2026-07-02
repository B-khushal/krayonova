"use client";

import { useCollection } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { Bell, Mail, FileText, CheckCircle, Clock, ArrowRight } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminNotifications() {
  const { data: leads, loading, error } = useCollection<any>("leads", { orderBy: { field: "createdAt", direction: "desc" }});
  const { success, error: showError } = useToast();

  const alerts = leads.filter((l: any) => l.status === "New" || l.status === "Applied" || !l.status);
  const totalUnread = alerts.length;

  const handleMarkAsRead = async (id: string, currentStatus: string) => {
    try {
      const nextStatus = currentStatus === "Applied" ? "Applicant Reviewed" : "In Discussion";
      await cms.update("leads", id, { status: nextStatus, updatedAt: new Date() });
      success("Alert marked as read!");
    } catch (err) {
      console.error(err);
      showError("Failed to update status.");
    }
  };

  const handleMarkAllAsRead = async () => {
    if (alerts.length === 0) return;
    if (confirm("Mark all active alerts as read?")) {
      try {
        const promises = alerts.map((alertItem: any) => {
          const nextStatus = alertItem.status === "Applied" ? "Applicant Reviewed" : "In Discussion";
          return cms.update("leads", alertItem.id, { status: nextStatus, updatedAt: new Date() });
        });
        await Promise.all(promises);
        success("All alerts marked as read!");
      } catch (err) {
        console.error(err);
        showError("Failed to mark all as read.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications Center"
        description="Review new leads, applications, and system alerts."
        icon={<Bell className="w-5 h-5" />}
        actions={
          totalUnread > 0 ? (
            <button onClick={handleMarkAllAsRead} className="admin-btn-secondary text-sm">
              <CheckCircle className="w-4 h-4 text-success" /> Mark All as Read
            </button>
          ) : undefined
        }
      />

      {/* Unread Counter */}
      <div className="admin-card p-5 flex items-center gap-4 max-w-md">
        <div className="w-11 h-11 rounded-xl bg-primary-light flex items-center justify-center text-primary">
          <Bell className="w-5 h-5" />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary">Active Alerts</p>
          <p className="text-xl font-display font-bold text-text-primary">
            {totalUnread} Unread {totalUnread === 1 ? "Notification" : "Notifications"}
          </p>
        </div>
      </div>

      {/* Alert List */}
      <div className="admin-card overflow-hidden max-w-4xl">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={4} />
        ) : alerts.length === 0 ? (
          <EmptyState
            icon={CheckCircle}
            title="Inbox Clean!"
            description="No pending or unread CRM leads or candidate applications."
          />
        ) : (
          <div className="divide-y divide-border-soft">
            {alerts.map((item: any) => {
              const date = item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : "Recently";
              const isApplication = item.status === "Applied";

              return (
                <div key={item.id} className="p-5 hover:bg-surface-hover transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex gap-4 items-start">
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isApplication ? "bg-primary-light text-primary" : "bg-info-muted text-info"
                    }`}>
                      {isApplication ? <FileText className="w-5 h-5" /> : <Mail className="w-5 h-5" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-text-primary">{item.firstName} {item.lastName}</span>
                        <Badge variant={isApplication ? "primary" : "info"}>
                          {isApplication ? "Career Applicant" : "New Lead"}
                        </Badge>
                      </div>
                      <p className="text-xs text-text-tertiary font-mono">{item.email}</p>
                      <p className="text-xs text-text-secondary pt-0.5 leading-relaxed line-clamp-2">{item.details}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-text-tertiary pt-0.5">
                        <Clock className="w-3 h-3" /> {date}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleMarkAsRead(item.id, item.status || "New")}
                    className="admin-btn-primary text-xs py-2 shrink-0"
                  >
                    Accept & Read <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
