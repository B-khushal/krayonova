"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect } from "react";
import { Search, Globe, FileCode, Save, Eye } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useToast } from "@/components/admin/ui/Toast";

export default function SEOCenterPage() {
  const { data: seoConfig, loading } = useDocument<any>("settings", "seo");
  const { success, error: showError } = useToast();

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [robotsTxt, setRobotsTxt] = useState("User-agent: *\nAllow: /\nSitemap: https://krayonova.com/sitemap.xml");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (seoConfig) {
      setMetaTitle(seoConfig.metaTitle || "");
      setMetaDescription(seoConfig.metaDescription || "");
      setOgTitle(seoConfig.ogTitle || "");
      setOgDescription(seoConfig.ogDescription || "");
      setOgImage(seoConfig.ogImage || "");
      setRobotsTxt(seoConfig.robotsTxt || robotsTxt);
    }
  }, [seoConfig]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await cms.createWithId("settings", "seo", {
        type: "seo_settings",
        metaTitle, metaDescription, ogTitle, ogDescription, ogImage, robotsTxt,
        updatedAt: new Date(),
      });
      success("SEO settings saved!");
    } catch (err) {
      console.error(err);
      showError("Failed to save SEO settings.");
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="SEO Center"
        description="Optimize your site for search engines and social sharing."
        icon={<Search className="w-5 h-5" />}
        actions={
          <button onClick={handleSave} disabled={saving || loading} className="admin-btn-primary text-sm">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save SEO Settings"}
          </button>
        }
      />

      {loading ? (
        <div className="text-text-secondary text-center p-8">Loading SEO config...</div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Meta Tags */}
          <div className="admin-card p-6 space-y-5">
            <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> Meta Tags
            </h3>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Meta Title</label>
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="admin-input" placeholder="KrayoNova — Digital Agency" />
              <p className="text-[10px] text-text-tertiary mt-1">{metaTitle.length}/60 characters</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">Meta Description</label>
              <textarea rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} className="admin-textarea" placeholder="Premium digital experiences..." />
              <p className="text-[10px] text-text-tertiary mt-1">{metaDescription.length}/160 characters</p>
            </div>
          </div>

          {/* OpenGraph */}
          <div className="admin-card p-6 space-y-5">
            <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" /> OpenGraph (Social Sharing)
            </h3>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">OG Title</label>
              <input type="text" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} className="admin-input" placeholder="Same as meta title if empty" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">OG Description</label>
              <textarea rows={2} value={ogDescription} onChange={(e) => setOgDescription(e.target.value)} className="admin-textarea" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-1.5">OG Image URL</label>
              <input type="text" value={ogImage} onChange={(e) => setOgImage(e.target.value)} className="admin-input font-mono text-xs" placeholder="https://..." />
              {ogImage && (
                <div className="mt-2 w-full max-w-xs aspect-video rounded-xl overflow-hidden border border-border-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ogImage} alt="OG Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Google SERP Preview */}
          <div className="admin-card p-6 space-y-3">
            <h3 className="text-sm font-display font-semibold text-text-primary">Google SERP Preview</h3>
            <div className="bg-bg-primary p-4 rounded-xl border border-border-soft">
              <p className="text-info text-sm font-medium truncate">{metaTitle || "KrayoNova — Digital Agency"}</p>
              <p className="text-success text-xs font-mono">https://krayonova.com</p>
              <p className="text-text-secondary text-xs mt-1 line-clamp-2">{metaDescription || "Premium digital experiences crafted for modern businesses."}</p>
            </div>
          </div>

          {/* Robots.txt */}
          <div className="admin-card p-6 space-y-3">
            <h3 className="text-sm font-display font-semibold text-text-primary flex items-center gap-2">
              <FileCode className="w-4 h-4 text-primary" /> Robots.txt
            </h3>
            <textarea
              rows={5}
              value={robotsTxt}
              onChange={(e) => setRobotsTxt(e.target.value)}
              className="admin-textarea font-mono text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
}
