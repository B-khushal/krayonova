"use client";

import { useCollection } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState } from "react";
import { Star, Trash2, Edit, Save, Plus, X } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminTestimonials() {
  const { data: testimonials, loading, error } = useCollection<any>("testimonials", { orderBy: { field: "clientName" }});
  const { success, error: showError, warning } = useToast();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const startEdit = (item: any) => {
    setEditingId(item.id);
    setClientName(item.clientName || "");
    setCompany(item.company || "");
    setReview(item.review || "");
    setRating(item.rating || 5);
    setAvatarUrl(item.avatarUrl || "");
    setIsFeatured(item.isFeatured || false);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null); setClientName(""); setCompany(""); setReview("");
    setRating(5); setAvatarUrl(""); setIsFeatured(false); setShowForm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !review) { warning("Name and Review are required."); return; }

    setSaving(true);
    const data = { clientName, company, review, rating: Number(rating), avatarUrl, isFeatured, createdAt: new Date() };

    try {
      if (editingId) { await cms.update("testimonials", editingId, data); }
      else { await cms.create("testimonials", data); }
      success(editingId ? "Testimonial updated!" : "Testimonial created!");
      cancelEdit();
    } catch (err) {
      console.error(err);
      showError("Failed to save testimonial.");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this testimonial?")) {
      try { await cms.delete("testimonials", id); success("Testimonial deleted."); }
      catch (err) { console.error(err); showError("Failed to delete."); }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Testimonials"
        description="Manage client reviews and social proof."
        icon={<Star className="w-5 h-5" />}
        actions={
          !showForm ? (
            <button onClick={() => setShowForm(true)} className="admin-btn-primary text-sm">
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          ) : undefined
        }
      />

      {showForm && (
        <form onSubmit={handleSave} className="admin-card p-6 space-y-4 max-w-2xl">
          <h2 className="text-sm font-display font-semibold text-text-primary">
            {editingId ? "Edit Testimonial" : "New Testimonial"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Client Name</label>
              <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} required className="admin-input" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Company</label>
              <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} className="admin-input" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Avatar URL</label>
              <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="admin-input text-xs" placeholder="https://..." />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Rating (1-5)</label>
              <input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} className="admin-input" />
            </div>
            <div className="flex items-center pt-5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded border-border-medium bg-bg-primary text-primary focus:ring-primary w-4 h-4" />
                <span className="text-xs text-text-secondary font-medium">Featured</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-1.5">Review</label>
            <textarea rows={3} value={review} onChange={(e) => setReview(e.target.value)} required className="admin-textarea" />
          </div>
          <div className="flex gap-3">
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
        ) : testimonials.length === 0 ? (
          <EmptyState icon={Star} title="No testimonials yet" description="Add client reviews to build social proof." />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item: any) => (
                <tr key={item.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                        {item.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={item.avatarUrl} alt={item.clientName} className="object-cover w-full h-full" />
                        ) : (
                          <span className="text-primary font-bold text-xs">{item.clientName?.[0]?.toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-text-primary text-sm">{item.clientName}</p>
                        <p className="text-[11px] text-text-tertiary">{item.company || "Company"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="max-w-sm truncate text-xs text-text-secondary">{item.review}</td>
                  <td>
                    <div className="flex items-center gap-0.5 text-warning">
                      {Array.from({ length: item.rating || 5 }).map((_, idx) => (
                        <Star key={idx} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </td>
                  <td>
                    <Badge variant={item.isFeatured ? "primary" : "neutral"}>
                      {item.isFeatured ? "Featured" : "Standard"}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => startEdit(item)} className="admin-btn-ghost p-2"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id)} className="admin-btn-danger p-2"><Trash2 className="w-4 h-4" /></button>
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
