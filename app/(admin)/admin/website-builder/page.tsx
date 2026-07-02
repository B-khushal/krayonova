"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect } from "react";
import {
  Layers, GripVertical, Eye, EyeOff, Save, Sparkles,
  Home, Briefcase, FolderKanban, Star, PenTool, DollarSign,
  Users, MessageSquare, Megaphone, Layout
} from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useToast } from "@/components/admin/ui/Toast";

type SectionConfig = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
  description: string;
};

const defaultSections: SectionConfig[] = [
  { key: "hero", label: "Hero Section", icon: Home, enabled: true, description: "Main banner with headline, subheading, and CTA." },
  { key: "services", label: "Services", icon: Briefcase, enabled: true, description: "Service offering cards." },
  { key: "portfolio", label: "Portfolio", icon: FolderKanban, enabled: true, description: "Project showcase grid." },
  { key: "testimonials", label: "Testimonials", icon: Star, enabled: true, description: "Client reviews carousel." },
  { key: "blog", label: "Blog Preview", icon: PenTool, enabled: true, description: "Latest blog posts preview." },
  { key: "pricing", label: "Pricing", icon: DollarSign, enabled: true, description: "Pricing tier cards." },
  { key: "careers", label: "Careers", icon: Users, enabled: true, description: "Open positions listing." },
  { key: "cta", label: "Call to Action", icon: Megaphone, enabled: true, description: "Contact/conversion CTA block." },
  { key: "contact", label: "Contact Form", icon: MessageSquare, enabled: true, description: "Inquiry form section." },
];

export default function WebsiteBuilderPage() {
  const { data: config, loading } = useDocument<any>("settings", "website_sections");
  const [sections, setSections] = useState<SectionConfig[]>(defaultSections);
  const [saving, setSaving] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (config && config.sections) {
      const merged = defaultSections.map((def) => {
        const saved = config.sections.find((s: any) => s.key === def.key);
        return saved ? { ...def, enabled: saved.enabled } : def;
      });
      // Preserve saved order
      const savedOrder = config.sections.map((s: any) => s.key);
      merged.sort((a, b) => {
        const ai = savedOrder.indexOf(a.key);
        const bi = savedOrder.indexOf(b.key);
        if (ai === -1) return 1;
        if (bi === -1) return -1;
        return ai - bi;
      });
      setSections(merged);
    }
  }, [config]);

  const toggleSection = (key: string) => {
    setSections((prev) =>
      prev.map((s) => (s.key === key ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleDragStart = (index: number) => setDragIndex(index);
  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === index) return;
    const updated = [...sections];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);
    setSections(updated);
    setDragIndex(index);
  };
  const handleDragEnd = () => setDragIndex(null);

  const handleSave = async () => {
    setSaving(true);
    try {
      await cms.createWithId("settings", "website_sections", {
        type: "website_section_settings",
        sections: sections.map((s) => ({ key: s.key, enabled: s.enabled })),
        updatedAt: new Date(),
      });
      success("Section layout saved!");
    } catch (err) {
      console.error(err);
      showError("Failed to save section layout.");
    } finally {
      setSaving(false);
    }
  };

  const enabledCount = sections.filter((s) => s.enabled).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Homepage Builder"
        description="Drag to reorder and toggle sections to customize your homepage layout."
        icon={<Layers className="w-5 h-5" />}
        actions={
          <button onClick={handleSave} disabled={saving || loading} className="admin-btn-primary text-sm">
            <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Layout"}
          </button>
        }
      />

      {/* Summary bar */}
      <div className="admin-card p-4 flex items-center justify-between max-w-3xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-success-muted flex items-center justify-center">
            <Layout className="w-4 h-4 text-success" />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{enabledCount} of {sections.length} sections active</p>
            <p className="text-[11px] text-text-tertiary">Drag the grip handles to reorder sections</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-text-tertiary">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Changes apply on save
        </div>
      </div>

      {/* Section List */}
      <div className="max-w-3xl space-y-2">
        {loading ? (
          <div className="text-text-secondary text-center p-8">Loading section config...</div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.key}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`admin-card p-4 flex items-center gap-4 transition-all cursor-grab active:cursor-grabbing ${
                dragIndex === index ? "opacity-50 scale-[0.98]" : ""
              } ${!section.enabled ? "opacity-60" : ""}`}
            >
              <GripVertical className="w-4 h-4 text-text-tertiary shrink-0" />

              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                section.enabled ? "bg-primary-light text-primary" : "bg-bg-secondary text-text-tertiary"
              }`}>
                <section.icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${section.enabled ? "text-text-primary" : "text-text-tertiary"}`}>
                  {section.label}
                </p>
                <p className="text-[11px] text-text-tertiary truncate">{section.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[10px] font-semibold uppercase tracking-wider ${
                  section.enabled ? "text-success" : "text-text-tertiary"
                }`}>
                  {section.enabled ? "Visible" : "Hidden"}
                </span>
                <button
                  onClick={() => toggleSection(section.key)}
                  className={`admin-toggle ${section.enabled ? "active" : ""}`}
                  aria-label={`Toggle ${section.label}`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
