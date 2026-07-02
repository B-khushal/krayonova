"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, FolderKanban } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/admin/ui/Toast";

export default function EditProject(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const isNew = params.id === "new";
  const { data: project, loading, error } = useDocument<any>("projects", isNew ? "" : params.id);
  const { success, error: showError, warning } = useToast();

  const [name, setName] = useState("");
  const [clientName, setClientName] = useState("");
  const [industry, setIndustry] = useState("");
  const [category, setCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [status, setStatus] = useState("Draft");
  const [order, setOrder] = useState(0);
  const [projectUrl, setProjectUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (project) {
      setName(project.name || "");
      setClientName(project.clientName || "");
      setIndustry(project.industry || "");
      setCategory(project.category || "");
      setCoverImage(project.coverImage || "");
      setIsFeatured(project.isFeatured || false);
      setStatus(project.status || "Draft");
      setOrder(project.order || 0);
      setProjectUrl(project.projectUrl || "");
    }
  }, [project]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const { supabase } = await import("@/lib/supabase/client");
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `project-covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, { cacheControl: "3600", upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("portfolio").getPublicUrl(filePath);
      setCoverImage(urlData.publicUrl);
      success("Image uploaded successfully!");
    } catch (err: any) {
      console.error("Upload error:", err);
      showError(err.message || "Failed to upload cover image");
    } finally {
      setUploading(false);
    }
  };

  const handleUploadFromUrl = async () => {
    if (!coverImage || !coverImage.startsWith("http")) {
      warning("Please enter a valid image URL first.");
      return;
    }

    setUploading(true);
    try {
      const { uploadImageFromUrl } = await import("@/lib/actions");
      const result = await uploadImageFromUrl(coverImage, "portfolio", "project-covers");
      if (!result.success || !result.url) {
        throw new Error(result.error || "Failed to upload image from URL");
      }
      setCoverImage(result.url);
      success("Image uploaded to storage successfully!");
    } catch (err: any) {
      console.error("URL upload error:", err);
      showError(err.message || "Failed to upload image from URL");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const data = {
      name, clientName, industry, category, coverImage,
      isFeatured, status, order: Number(order), projectUrl
    };
    try {
      if (isNew) {
        await cms.create("projects", data);
      } else {
        await cms.update("projects", params.id, data);
      }
      success("Project saved successfully!");
      router.push("/admin/portfolio");
    } catch (err) {
      console.error(err);
      showError("Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return <div className="admin-card p-6 text-danger bg-danger-muted">{error}</div>;
  }
  if (!isNew && loading) return <div className="text-text-secondary p-8 text-center">Loading project details...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/portfolio" className="admin-btn-ghost p-2"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center">
            <FolderKanban className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl font-display font-bold text-text-primary">
            {isNew ? "New Project" : "Edit Project"}
          </h1>
        </div>
      </div>

      <div className="admin-card p-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Project Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="admin-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Client Name</label>
            <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="admin-input" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Industry</label>
            <input type="text" value={industry} onChange={(e) => setIndustry(e.target.value)} className="admin-input" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="admin-input" placeholder="FinTech, E-Commerce, etc." />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="admin-select">
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Order</label>
            <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} className="admin-input" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Cover Image URL</label>
          <div className="flex gap-3 items-center">
            <input type="text" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="admin-input font-mono text-xs flex-1" placeholder="https://..." />
            {coverImage && !coverImage.includes("supabase.co") && coverImage.startsWith("http") && (
              <button type="button" onClick={handleUploadFromUrl} disabled={uploading} className="admin-btn-primary text-xs py-2.5 whitespace-nowrap">
                {uploading ? "Uploading..." : "Upload URL"}
              </button>
            )}
            <label className="admin-btn-secondary text-xs py-2.5 whitespace-nowrap cursor-pointer">
              <input type="file" onChange={handleImageUpload} accept="image/*" className="hidden" />
              {uploading ? "Uploading..." : "Upload File"}
            </label>
          </div>
          {coverImage && (
            <div className="mt-3 w-48 h-28 relative rounded-xl overflow-hidden border border-border-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Project Link</label>
          <input type="text" value={projectUrl} onChange={(e) => setProjectUrl(e.target.value)} className="admin-input font-mono text-xs" placeholder="https://github.com/username/project" />
        </div>

        <div className="flex items-center">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="rounded border-border-medium bg-bg-primary text-primary focus:ring-primary w-4 h-4" />
            <span className="text-sm text-text-secondary font-medium">Featured Project</span>
          </label>
        </div>

        <button onClick={handleSave} disabled={saving} className="admin-btn-primary mt-4">
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Project"}
        </button>
      </div>
    </div>
  );
}
