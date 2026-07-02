"use client";

import { useCollection } from "@/hooks/use-content";
import { Trash2, MessageCircle } from "lucide-react";
import { cms } from "@/lib/cms";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminLeads() {
  const { data: leads, loading, error } = useCollection<any>("leads", { orderBy: { field: "createdAt", direction: "desc" }});
  const { success, error: showError } = useToast();

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Delete this lead?")) {
      try {
        await cms.delete("leads", id);
        success("Lead deleted.");
      } catch (err) {
        console.error(err);
        showError("Failed to delete lead.");
      }
    }
  };

  const statusVariant = (s: string): "info" | "warning" | "success" | "danger" | "neutral" => {
    switch (s) {
      case "New": return "info";
      case "In Discussion": return "warning";
      case "Won": return "success";
      case "Lost": return "danger";
      default: return "neutral";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Leads (${leads.length})`}
        description="View and manage all incoming lead inquiries."
        icon={<MessageCircle className="w-5 h-5" />}
      />

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={5} />
        ) : leads.length === 0 ? (
          <EmptyState icon={MessageCircle} title="No leads yet" description="Leads will appear here as they come in." />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Email</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => (
                <tr key={lead.id}>
                  <td className="font-mono text-xs text-text-tertiary">
                    {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : "N/A"}
                  </td>
                  <td className="font-semibold text-text-primary text-sm">{lead.email}</td>
                  <td>
                    <Badge variant={statusVariant(lead.status || "New")} dot>
                      {lead.status || "New"}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <button onClick={(e) => handleDelete(lead.id, e)} className="admin-btn-danger p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
