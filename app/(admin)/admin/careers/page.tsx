"use client";

import { useCollection } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState } from "react";
import { Briefcase, Trash2, Edit, Save, Plus, X, MapPin, Clock } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminCareers() {
  const { data: jobs, loading, error } = useCollection<any>("careers", { orderBy: { field: "order" }});
  const { success, error: showError, warning } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [requirementsText, setRequirementsText] = useState("");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const startEdit = (job: any) => {
    setEditingId(job.id);
    setTitle(job.title || "");
    setDepartment(job.department || "");
    setLocation(job.location || "");
    setType(job.type || "Full-time");
    setDescription(job.description || "");
    setRequirementsText(job.requirements ? job.requirements.join(", ") : "");
    setOrder(job.order || 0);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null); setTitle(""); setDepartment(""); setLocation("");
    setType("Full-time"); setDescription(""); setRequirementsText(""); setOrder(0); setShowForm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !department || !location) { warning("Title, department, and location are required."); return; }

    setSaving(true);
    const requirements = requirementsText.split(",").map(r => r.trim()).filter(Boolean);
    const data = { title, department, location, type, description, requirements, order: Number(order), updatedAt: new Date() };

    try {
      if (editingId) { await cms.update("careers", editingId, data); }
      else { await cms.create("careers", { ...data, createdAt: new Date() }); }
      success(editingId ? "Position updated!" : "Position created!");
      cancelEdit();
    } catch (err) {
      console.error(err);
      showError("Failed to save career position.");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this job position?")) {
      try { await cms.delete("careers", id); success("Position deleted."); }
      catch (err) { console.error(err); showError("Failed to delete."); }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Careers CMS"
        description="Manage open positions and job listings."
        icon={<Briefcase className="w-5 h-5" />}
        actions={
          !showForm ? (
            <button onClick={() => setShowForm(true)} className="admin-btn-primary text-sm">
              <Plus className="w-4 h-4" /> Add Position
            </button>
          ) : undefined
        }
      />

      {showForm && (
        <form onSubmit={handleSave} className="admin-card p-6 space-y-4 max-w-2xl">
          <h2 className="text-sm font-display font-semibold text-text-primary">
            {editingId ? "Edit Position" : "New Position"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Job Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="admin-input" placeholder="Senior AI Engineer" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Department</label>
              <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required className="admin-input" placeholder="Engineering" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Location</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="admin-input" placeholder="Remote" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Job Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="admin-select">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Order</label>
              <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="admin-input" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1.5">Description</label>
            <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required className="admin-textarea" placeholder="Describe the role..." />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1.5">Requirements (Comma Separated)</label>
            <input type="text" value={requirementsText} onChange={(e) => setRequirementsText(e.target.value)} className="admin-input text-xs" placeholder="5+ years experience, Next.js, PyTorch" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="admin-btn-primary text-xs">
              <Save className="w-3.5 h-3.5" /> {saving ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={cancelEdit} className="admin-btn-secondary text-xs">
              <X className="w-3.5 h-3.5" /> Cancel
            </button>
          </div>
        </form>
      )}

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={4} />
        ) : jobs.length === 0 ? (
          <EmptyState icon={Briefcase} title="No positions listed" description="Add career opportunities to attract talent." />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Position</th>
                <th>Department</th>
                <th>Location</th>
                <th>Type</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job: any) => (
                <tr key={job.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-text-primary text-sm">{job.title}</span>
                    </div>
                  </td>
                  <td className="text-text-secondary text-sm">{job.department}</td>
                  <td>
                    <span className="flex items-center gap-1 text-xs text-text-tertiary">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                  </td>
                  <td>
                    <Badge variant="neutral">
                      <Clock className="w-3 h-3" /> {job.type}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => startEdit(job)} className="admin-btn-ghost p-2"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(job.id)} className="admin-btn-danger p-2"><Trash2 className="w-4 h-4" /></button>
                    </div>
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
