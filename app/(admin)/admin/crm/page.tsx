"use client";

import { useCollection } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState } from "react";
import { Search, Mail, Clock, Target, Save, Plus } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminCRM() {
  const { data: leads, loading, error } = useCollection<any>("leads", { orderBy: { field: "createdAt", direction: "desc" }});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const { success, error: showError } = useToast();

  // Form states for selected lead
  const [status, setStatus] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [newNote, setNewNote] = useState("");
  const [saving, setSaving] = useState(false);

  const selectLead = (lead: any) => {
    setSelectedLead(lead);
    setStatus(lead.status || "New");
    setAssignedTo(lead.assignedTo || "");
    setNewNote("");
  };

  const handleUpdateLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLead) return;

    setSaving(true);
    const notesList = selectedLead.notes || [];
    if (newNote.trim()) {
      notesList.push(`${new Date().toLocaleDateString()}: ${newNote.trim()}`);
    }

    try {
      await cms.update("leads", selectedLead.id, {
        status,
        assignedTo,
        notes: notesList,
        updatedAt: new Date()
      });
      setSelectedLead({
        ...selectedLead,
        status,
        assignedTo,
        notes: notesList
      });
      setNewNote("");
      success("Lead updated successfully!");
    } catch (err) {
      console.error(err);
      showError("Failed to update lead details.");
    } finally {
      setSaving(false);
    }
  };

  // Pipeline metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter((l: any) => l.status === "New" || !l.status).length;
  const inDiscussion = leads.filter((l: any) => l.status === "In Discussion").length;
  const wonLeads = leads.filter((l: any) => l.status === "Won").length;

  const filteredLeads = leads.filter((lead: any) => {
    const name = `${lead.firstName || ""} ${lead.lastName || ""}`.toLowerCase();
    const email = (lead.email || "").toLowerCase();
    const details = (lead.details || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = name.includes(query) || email.includes(query) || details.includes(query);
    const matchesFilter = statusFilter === "All" || lead.status === statusFilter || (statusFilter === "New" && !lead.status);

    return matchesSearch && matchesFilter;
  });

  const statusBadgeVariant = (s: string): "success" | "warning" | "info" | "primary" | "danger" | "neutral" => {
    switch (s) {
      case "Won": return "success";
      case "In Discussion": return "warning";
      case "Applied": return "primary";
      case "Lost": return "danger";
      default: return "info";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="CRM Lead Pipeline"
        description="Track, qualify, and convert incoming leads."
        icon={<Target className="w-5 h-5" />}
      />

      {/* Analytics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 admin-stagger">
        {[
          { label: "Total Inquiries", value: totalLeads, color: "bg-bg-secondary text-text-primary" },
          { label: "New Leads", value: newLeads, color: "bg-info-muted text-info" },
          { label: "In Discussion", value: inDiscussion, color: "bg-warning-muted text-warning" },
          { label: "Won Accounts", value: wonLeads, color: "bg-success-muted text-success" },
        ].map((stat) => (
          <div key={stat.label} className="admin-card p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-text-tertiary mb-2">{stat.label}</p>
            <p className={`text-2xl font-display font-bold ${stat.color.includes("text-") ? stat.color.split(" ").find(c => c.startsWith("text-")) : "text-text-primary"}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Pipeline List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="Search leads..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-input pl-10 text-xs"
              />
              <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
              {["All", "New", "In Discussion", "Won", "Lost", "Applied"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                    statusFilter === filter
                      ? "bg-primary text-white border-primary"
                      : "bg-surface border-border-soft text-text-tertiary hover:text-text-primary hover:border-border-medium"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="admin-card overflow-hidden">
            {error ? (
              <div className="p-8 text-danger bg-danger-muted text-center text-sm rounded-xl">{error}</div>
            ) : loading ? (
              <LoadingSkeleton variant="table" count={5} />
            ) : filteredLeads.length === 0 ? (
              <EmptyState
                icon={Target}
                title="No matching leads"
                description="Try adjusting your search or filter criteria."
              />
            ) : (
              <div className="divide-y divide-border-soft">
                {filteredLeads.map((lead: any) => {
                  const date = lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : "N/A";
                  return (
                    <div
                      key={lead.id}
                      onClick={() => selectLead(lead)}
                      className={`p-5 hover:bg-surface-hover transition-colors cursor-pointer flex justify-between items-center ${
                        selectedLead?.id === lead.id ? "bg-primary-light/30 border-l-4 border-l-primary" : ""
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm text-text-primary">{lead.firstName} {lead.lastName}</span>
                          <Badge variant={statusBadgeVariant(lead.status || "New")}>
                            {lead.status || "New"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-text-tertiary">
                          <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {lead.email}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {date}</span>
                        </div>
                        <p className="text-xs text-text-tertiary line-clamp-1 italic">{lead.details}</p>
                      </div>
                      <div className="text-right text-xs text-text-tertiary hidden sm:block">
                        <p className="font-medium text-text-secondary">{lead.assignedTo ? `Assigned: ${lead.assignedTo}` : "Unassigned"}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Action / Detail sidebar */}
        <div>
          {selectedLead ? (
            <div className="admin-card p-5 space-y-5 sticky top-24">
              <div>
                <h3 className="text-base font-display font-semibold text-text-primary">{selectedLead.firstName} {selectedLead.lastName}</h3>
                <p className="text-xs text-text-tertiary font-mono mt-1">{selectedLead.email}</p>
              </div>

              <div className="bg-bg-primary p-4 rounded-xl border border-border-soft text-xs text-text-secondary space-y-2">
                <span className="font-semibold text-text-primary block text-[10px] uppercase tracking-wider">Client Inquiry</span>
                <p className="whitespace-pre-line leading-relaxed">{selectedLead.details}</p>
              </div>

              <form onSubmit={handleUpdateLead} className="space-y-4 pt-4 border-t border-border-soft">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="admin-select text-xs"
                  >
                    <option value="New">New</option>
                    <option value="In Discussion">In Discussion</option>
                    <option value="Won">Won (Deal Closed)</option>
                    <option value="Lost">Lost</option>
                    <option value="Applied">Applied (Applicant)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Assign To</label>
                  <input
                    type="text"
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    placeholder="e.g. Mike Manager"
                    className="admin-input text-xs"
                  />
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="block text-xs font-medium text-text-secondary">Interaction History</label>
                  <div className="bg-bg-primary rounded-xl max-h-32 overflow-y-auto p-3 text-[11px] space-y-2 border border-border-soft text-text-secondary admin-scrollbar">
                    {!selectedLead.notes || selectedLead.notes.length === 0 ? (
                      <p className="text-text-tertiary italic">No notes yet.</p>
                    ) : (
                      selectedLead.notes.map((note: string, idx: number) => (
                        <p key={idx} className="border-b border-border-soft pb-1.5 last:border-b-0 leading-relaxed">{note}</p>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">Add Note</label>
                  <textarea
                    rows={2}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add follow-up notes..."
                    className="admin-textarea text-xs"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="admin-btn-primary w-full justify-center text-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  {saving ? "Saving..." : "Save Pipeline State"}
                </button>
              </form>
            </div>
          ) : (
            <div className="admin-card p-8 text-center">
              <EmptyState
                icon={Target}
                title="Select a Lead"
                description="Click on a lead from the pipeline to view details, update status, and add notes."
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
