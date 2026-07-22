"use client";

import { useCollection } from "@/hooks/use-content";
import { Trash2, MessageCircle, Plus, X, Send } from "lucide-react";
import { cms } from "@/lib/cms";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";
import { useState } from "react";

export default function AdminLeads() {
  const { data: leads, loading, error } = useCollection<any>("leads", { orderBy: { field: "createdAt", direction: "desc" }});
  const { success, error: showError } = useToast();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("New");
  const [submitting, setSubmitting] = useState(false);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Delete this lead inquiry?")) {
      try {
        await cms.delete("leads", id);
        success("Lead deleted successfully.");
      } catch (err) {
        console.error(err);
        showError("Failed to delete lead.");
      }
    }
  };

  const handleCreateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubmitting(true);
    try {
      await cms.create("leads", {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`.trim() || email,
        email,
        details,
        status,
        source: "Manual Entry (Admin)",
        createdAt: new Date(),
      });
      success("New lead created.");
      setShowCreateModal(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setDetails("");
      setStatus("New");
    } catch {
      showError("Failed to create lead.");
    } finally {
      setSubmitting(false);
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
        description="View and manage all incoming website inquiries and leads."
        icon={<MessageCircle className="w-5 h-5" />}
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="admin-btn-primary text-xs flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Add Lead
          </button>
        }
      />

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={5} />
        ) : leads.length === 0 ? (
          <EmptyState icon={MessageCircle} title="No leads yet" description="Leads will appear here as website visitors send messages or submit emails." />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Contact Name & Email</th>
                <th>Inquiry Details</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead: any) => {
                const dateStr = lead.createdAt?.toDate 
                  ? lead.createdAt.toDate().toLocaleDateString() 
                  : (lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : "Just now");

                const nameDisplay = `${lead.firstName || ""} ${lead.lastName || ""}`.trim() || lead.name || "Inquiry";

                return (
                  <tr key={lead.id}>
                    <td>
                      <div>
                        <p className="font-semibold text-text-primary text-sm">{nameDisplay}</p>
                        <p className="text-xs text-text-tertiary font-mono">{lead.email}</p>
                      </div>
                    </td>
                    <td>
                      <p className="text-xs text-text-secondary line-clamp-2 max-w-xs leading-relaxed">
                        {lead.details || lead.notes || "Inquiry submitted via website form."}
                      </p>
                    </td>
                    <td>
                      <span className="text-xs font-mono text-text-tertiary px-2 py-0.5 rounded bg-bg-secondary border border-border-soft">
                        {lead.source || "Website Form"}
                      </span>
                    </td>
                    <td>
                      <Badge variant={statusVariant(lead.status || "New")} dot>
                        {lead.status || "New"}
                      </Badge>
                    </td>
                    <td className="font-mono text-xs text-text-tertiary">
                      {dateStr}
                    </td>
                    <td className="text-right">
                      <button onClick={(e) => handleDelete(lead.id, e)} className="admin-btn-danger p-2 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Manual Create Lead Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-50 animate-fade-in">
          <div className="admin-card p-6 max-w-md w-full relative space-y-4 bg-white">
            <div className="flex items-center justify-between border-b border-border-soft pb-3">
              <h3 className="font-display font-semibold text-text-primary text-base">Add New Lead</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-text-tertiary hover:text-text-primary cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    className="admin-input text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Doe"
                    className="admin-input text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="admin-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Inquiry Details / Message</label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Client inquiry details..."
                  className="admin-textarea text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Initial Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-select text-xs">
                  <option value="New">New</option>
                  <option value="In Discussion">In Discussion</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowCreateModal(false)} className="admin-btn-secondary text-xs cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="admin-btn-primary text-xs cursor-pointer">
                  <Send className="w-3.5 h-3.5" />
                  {submitting ? "Saving..." : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
