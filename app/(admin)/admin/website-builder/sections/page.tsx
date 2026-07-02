"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect } from "react";
import { Eye, Save, Home, Briefcase, FolderKanban, Star, PenTool, DollarSign, Users, MessageSquare, Megaphone } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useToast } from "@/components/admin/ui/Toast";

type VisibilityKey = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

const visibilityKeys: VisibilityKey[] = [
  { key: "hero", label: "Hero Section", icon: Home, description: "Main landing banner with headline and CTA" },
  { key: "services", label: "Services Section", icon: Briefcase, description: "Service cards grid" },
  { key: "portfolio", label: "Portfolio Section", icon: FolderKanban, description: "Project showcase gallery" },
  { key: "testimonials", label: "Testimonials Section", icon: Star, description: "Client reviews and ratings" },
  { key: "blog", label: "Blog Preview", icon: PenTool, description: "Recent blog posts preview" },
  { key: "pricing", label: "Pricing Section", icon: DollarSign, description: "Pricing tier comparison" },
  { key: "careers", label: "Careers Section", icon: Users, description: "Open positions listing" },
  { key: "cta", label: "CTA Block", icon: Megaphone, description: "Call-to-action contact block" },
  { key: "contact", label: "Contact Form", icon: MessageSquare, description: "Inquiry submission form" },
];

export default function SectionControlsPage() {
  const { data: config, loading } = useDocument<any>("settings", "section_visibility");
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (config && config.sections) {
      setVisibility(config.sections);
    } else {
      // Default all to true
      const defaults: Record<string, boolean> = {};
      visibilityKeys.forEach((k) => { defaults[k.key] = true; });
      setVisibility(defaults);
    }
  }, [config]);

  const toggle = (key: string) => {
    setVisibility((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cms.createWithId("settings", "section_visibility", {
        type: "section_visibility",
        sections: visibility,
        updatedAt: new Date(),
      });
      success("Section visibility saved!");
    } catch (err) {
      console.error(err);
      showError("Failed to save visibility settings.");
    } finally { setSaving(false); }
  };

  const enabledCount = Object.values(visibility).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Section Visibility Controls"
        description="Enable or disable individual website sections from appearing on the public site."
        icon={<Eye className="w-5 h-5" />}
        actions={
          <button onClick={handleSave} disabled={saving || loading} className="admin-btn-primary text-sm">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Visibility"}
          </button>
        }
      />

      <div className="admin-card p-4 max-w-3xl flex items-center justify-between">
        <p className="text-sm text-text-secondary">
          <span className="font-semibold text-text-primary">{enabledCount}</span> of {visibilityKeys.length} sections visible
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const all: Record<string, boolean> = {};
              visibilityKeys.forEach((k) => { all[k.key] = true; });
              setVisibility(all);
            }}
            className="admin-btn-ghost text-xs"
          >
            Enable All
          </button>
          <button
            onClick={() => {
              const none: Record<string, boolean> = {};
              visibilityKeys.forEach((k) => { none[k.key] = false; });
              setVisibility(none);
            }}
            className="admin-btn-ghost text-xs"
          >
            Disable All
          </button>
        </div>
      </div>

      <div className="max-w-3xl space-y-2">
        {loading ? (
          <div className="text-text-secondary text-center p-8">Loading visibility config...</div>
        ) : (
          visibilityKeys.map((item) => {
            const enabled = visibility[item.key] !== false;
            return (
              <div
                key={item.key}
                className={`admin-card p-4 flex items-center gap-4 transition-opacity ${!enabled ? "opacity-50" : ""}`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  enabled ? "bg-primary-light text-primary" : "bg-bg-secondary text-text-tertiary"
                }`}>
                  <item.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold ${enabled ? "text-text-primary" : "text-text-tertiary"}`}>
                    {item.label}
                  </p>
                  <p className="text-[11px] text-text-tertiary">{item.description}</p>
                </div>
                <button
                  onClick={() => toggle(item.key)}
                  className={`admin-toggle ${enabled ? "active" : ""}`}
                  aria-label={`Toggle ${item.label}`}
                />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
