"use client";

import { useCollection } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState } from "react";
import { Search, Image as ImageIcon, Video, FileText, Plus, Trash2, Globe, Folder } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminMedia() {
  const { data: mediaFiles, loading, error } = useCollection<any>("media", { orderBy: { field: "createdAt", direction: "desc" }});
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const { success, error: showError } = useToast();

  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"upload" | "link">("upload");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [type, setType] = useState("image/png");
  const [folder, setFolder] = useState("/");
  const [saving, setSaving] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [bucket, setBucket] = useState("general");
  const [uploading, setUploading] = useState(false);
  const [uploadToStorage, setUploadToStorage] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setName(selected.name.split(".").slice(0, -1).join("."));
      setType(selected.type || "application/octet-stream");
    }
  };

  const handleRegisterMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) { showError("Name and URL are required."); return; }

    setSaving(true);
    try {
      if (uploadToStorage) {
        const { uploadImageFromUrl } = await import("@/lib/actions");
        const result = await uploadImageFromUrl(url, bucket, folder);
        if (!result.success || !result.url) throw new Error(result.error || "Failed to upload from URL");

        await cms.create("media", {
          name, url: result.url, type: result.type || "image/png",
          folder: folder || "/", size: result.size || 0, createdAt: new Date()
        });
        success("Media uploaded and registered!");
      } else {
        await cms.create("media", {
          name, url, type, folder: folder || "/",
          size: Math.floor(Math.random() * 2000000) + 50000, createdAt: new Date()
        });
        success("Media registered!");
      }
      setName(""); setUrl(""); setShowAddForm(false);
    } catch (err: any) {
      console.error(err);
      showError(err.message || "Failed to register media.");
    } finally { setSaving(false); }
  };

  const handleUploadMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !name) { showError("File and name are required."); return; }

    setUploading(true);
    try {
      const { supabase } = await import("@/lib/supabase/client");
      const fileExt = file.name.split(".").pop();
      const cleanFileName = `${Date.now()}.${fileExt}`;
      const filePath = folder === "/" ? cleanFileName : `${folder.replace(/(^\/|\/)/g, "")}/${cleanFileName}`;

      const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file, { cacheControl: "3600", upsert: true });
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(filePath);

      await cms.create("media", {
        name, url: urlData.publicUrl, type: file.type || "application/octet-stream",
        folder: folder || "/", size: file.size, createdAt: new Date()
      });

      setFile(null); setName(""); setShowAddForm(false);
      success("Media uploaded and registered!");
    } catch (err: any) {
      console.error(err);
      showError(err.message || "Failed to upload file.");
    } finally { setUploading(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this media asset?")) {
      try { await cms.delete("media", id); success("Asset deleted."); }
      catch (err) { console.error(err); showError("Failed to delete."); }
    }
  };

  const filteredMedia = mediaFiles.filter((item: any) => {
    const matchesSearch = (item.name || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" ||
      (typeFilter === "Images" && item.type?.startsWith("image/")) ||
      (typeFilter === "Videos" && item.type?.startsWith("video/")) ||
      (typeFilter === "Documents" && !item.type?.startsWith("image/") && !item.type?.startsWith("video/"));
    return matchesSearch && matchesType;
  });

  const getFileIcon = (mime: string) => {
    if (mime?.startsWith("image/")) return <ImageIcon className="w-5 h-5 text-primary" />;
    if (mime?.startsWith("video/")) return <Video className="w-5 h-5 text-info" />;
    return <FileText className="w-5 h-5 text-success" />;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Media Library"
        description="Upload, organize, and manage your media assets."
        icon={<ImageIcon className="w-5 h-5" />}
        actions={
          !showAddForm ? (
            <button onClick={() => setShowAddForm(true)} className="admin-btn-primary text-sm">
              <Plus className="w-4 h-4" /> Upload / Add Asset
            </button>
          ) : undefined
        }
      />

      {/* Upload Form */}
      {showAddForm && (
        <div className="admin-card p-6 max-w-xl space-y-5">
          <div className="flex gap-4 border-b border-border-soft pb-3">
            <button type="button" onClick={() => setActiveTab("upload")}
              className={`pb-1 text-sm font-semibold transition-all cursor-pointer ${activeTab === "upload" ? "border-b-2 border-primary text-primary" : "text-text-tertiary hover:text-text-primary"}`}>
              Upload File
            </button>
            <button type="button" onClick={() => setActiveTab("link")}
              className={`pb-1 text-sm font-semibold transition-all cursor-pointer ${activeTab === "link" ? "border-b-2 border-primary text-primary" : "text-text-tertiary hover:text-text-primary"}`}>
              Link URL
            </button>
          </div>

          {activeTab === "upload" ? (
            <form onSubmit={handleUploadMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Select File</label>
                <input type="file" onChange={handleFileChange} required className="admin-input text-xs" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Asset Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="admin-input" placeholder="Asset Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Bucket</label>
                  <select value={bucket} onChange={(e) => setBucket(e.target.value)} className="admin-select text-sm">
                    {["general", "portfolio", "blog", "careers", "testimonials"].map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Folder</label>
                  <input type="text" value={folder} onChange={(e) => setFolder(e.target.value)} className="admin-input" placeholder="/" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={uploading} className="admin-btn-primary text-xs">
                  <Plus className="w-3.5 h-3.5" /> {uploading ? "Uploading..." : "Upload & Register"}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="admin-btn-secondary text-xs">Cancel</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterMedia} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Asset Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="admin-input" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-1.5">Public URL</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required className="admin-input font-mono text-xs" placeholder="https://..." />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="uploadToStorage" checked={uploadToStorage} onChange={(e) => setUploadToStorage(e.target.checked)} className="rounded border-border-medium bg-bg-primary text-primary focus:ring-primary h-4 w-4" />
                <label htmlFor="uploadToStorage" className="text-xs text-text-secondary font-medium cursor-pointer">
                  Download & upload to Supabase Storage
                </label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">{uploadToStorage ? "Bucket" : "Type"}</label>
                  {uploadToStorage ? (
                    <select value={bucket} onChange={(e) => setBucket(e.target.value)} className="admin-select text-sm">
                      {["general", "portfolio", "blog", "careers", "testimonials"].map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  ) : (
                    <select value={type} onChange={(e) => setType(e.target.value)} className="admin-select text-sm">
                      <option value="image/png">PNG</option>
                      <option value="image/jpeg">JPEG</option>
                      <option value="video/mp4">MP4</option>
                      <option value="application/pdf">PDF</option>
                    </select>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Folder</label>
                  <input type="text" value={folder} onChange={(e) => setFolder(e.target.value)} className="admin-input" placeholder="/" />
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="admin-btn-primary text-xs">
                  <Plus className="w-3.5 h-3.5" /> {saving ? "Processing..." : uploadToStorage ? "Upload & Register" : "Register Link"}
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="admin-btn-secondary text-xs">Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-72">
          <input type="text" placeholder="Search assets..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="admin-input pl-10 text-xs" />
          <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
        <div className="flex gap-2">
          {["All", "Images", "Videos", "Documents"].map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                typeFilter === f ? "bg-primary text-white border-primary" : "bg-surface border-border-soft text-text-tertiary hover:text-text-primary"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {error ? (
        <div className="admin-card p-8 text-danger bg-danger-muted text-center">{error}</div>
      ) : loading ? (
        <LoadingSkeleton variant="card" count={8} />
      ) : filteredMedia.length === 0 ? (
        <div className="admin-card">
          <EmptyState icon={ImageIcon} title="No media found" description="Upload or link assets to build your media library." />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredMedia.map((f: any) => {
            const formattedSize = f.size ? `${(f.size / 1024 / 1024).toFixed(2)} MB` : "—";
            return (
              <div key={f.id} className="admin-card admin-card-interactive overflow-hidden group flex flex-col">
                <div className="relative aspect-video bg-bg-secondary flex items-center justify-center overflow-hidden">
                  {f.type?.startsWith("image/") ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={f.url} alt={f.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      {getFileIcon(f.type || "")}
                      <span className="text-[10px] text-text-tertiary font-mono">{f.type}</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-white/80 backdrop-blur-sm rounded text-[9px] text-text-secondary flex items-center gap-1 font-mono">
                    <Folder className="w-2.5 h-2.5" /> {f.folder || "/"}
                  </div>
                </div>
                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <p className="font-semibold text-xs text-text-primary truncate" title={f.name}>{f.name}</p>
                  <div className="flex justify-between items-center text-[10px] text-text-tertiary pt-1.5 border-t border-border-soft mt-auto">
                    <span>{formattedSize}</span>
                    <div className="flex gap-2">
                      <a href={f.url} target="_blank" rel="noreferrer" className="text-text-tertiary hover:text-primary transition-colors">
                        <Globe className="w-3.5 h-3.5" />
                      </a>
                      <button onClick={() => handleDelete(f.id)} className="text-text-tertiary hover:text-danger transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
