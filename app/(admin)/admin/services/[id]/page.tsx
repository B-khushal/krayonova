"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Briefcase } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/admin/ui/Toast";

export const dynamic = "force-dynamic";

export default function EditService(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const isNew = params.id === "new";
  const { data: service, loading, error } = useDocument<any>("services", isNew ? "" : params.id);
  const { success, error: showError } = useToast();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [order, setOrder] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (service) {
      setTitle(service.title || "");
      setDescription(service.description || "");
      setOrder(service.order || 0);
    }
  }, [service]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { title, description, order: Number(order) };
      if (isNew) { await cms.create("services", data); }
      else { await cms.update("services", params.id, data); }
      success("Service saved!");
      router.push("/admin/services");
    } catch (err) {
      showError("Failed to save service.");
    } finally { setSaving(false); }
  };

  if (error) return <div className="admin-card p-6 text-danger bg-danger-muted">{error}</div>;
  if (!isNew && loading) return <div className="text-text-secondary p-8 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/services" className="admin-btn-ghost p-2"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center"><Briefcase className="w-4 h-4 text-primary" /></div>
          <h1 className="text-xl font-display font-bold text-text-primary">{isNew ? "New Service" : "Edit Service"}</h1>
        </div>
      </div>
      <div className="admin-card p-8 space-y-6 max-w-3xl">
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Service Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="admin-input" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Description</label>
          <textarea rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="admin-textarea" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Order</label>
          <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="admin-input" />
        </div>
        <button onClick={handleSave} disabled={saving} className="admin-btn-primary mt-4">
          <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Service"}
        </button>
      </div>
    </div>
  );
}
