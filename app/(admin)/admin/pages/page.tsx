"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect } from "react";
import { Save, FileText } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useToast } from "@/components/admin/ui/Toast";

export default function PagesAdmin() {
  const { data: homeContent, loading, error } = useDocument<any>("settings", "home_page");
  const [heroHeading, setHeroHeading] = useState("");
  const [heroSubheading, setHeroSubheading] = useState("");
  const [saving, setSaving] = useState(false);
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (homeContent) {
      setHeroHeading(homeContent.heroHeading || "");
      setHeroSubheading(homeContent.heroSubheading || "");
    }
  }, [homeContent]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await cms.createWithId("settings", "home_page", {
        type: "page_settings",
        heroHeading,
        heroSubheading,
      });
      success("Page settings saved!");
    } catch (err) {
      console.error(err);
      showError("Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  if (error) return <div className="admin-card p-6 text-danger bg-danger-muted">{error}</div>;
  if (loading) return <div className="text-text-secondary p-8 text-center">Loading page settings...</div>;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pages Management"
        description="Edit homepage content and page-level settings."
        icon={<FileText className="w-5 h-5" />}
        actions={
          <button onClick={handleSave} disabled={saving} className="admin-btn-primary text-sm">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Changes"}
          </button>
        }
      />

      <div className="admin-card p-8 max-w-3xl space-y-6">
        <h2 className="text-sm font-display font-semibold text-text-primary">Home Page Settings</h2>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Hero Heading</label>
          <input
            type="text"
            value={heroHeading}
            onChange={(e) => setHeroHeading(e.target.value)}
            className="admin-input"
            placeholder="Engineering the Digital Future"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Hero Subheading</label>
          <textarea
            rows={3}
            value={heroSubheading}
            onChange={(e) => setHeroSubheading(e.target.value)}
            className="admin-textarea"
            placeholder="We engineer intelligent software systems..."
          />
        </div>
      </div>
    </div>
  );
}
