"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect } from "react";
import { Settings, Save, Plus, Trash2, Menu, Share2, Info } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminSettings() {
  const { data: navData, loading: loadingNav, error: navError } = useDocument<any>("settings", "navigation");
  const { data: footerData, loading: loadingFooter, error: footerError } = useDocument<any>("settings", "footer");
  const { success, error: showError } = useToast();

  const [activeTab, setActiveTab] = useState<"nav" | "footer">("nav");
  const [navLinks, setNavLinks] = useState<any[]>([]);
  const [footerDesc, setFooterDesc] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [mailUrl, setMailUrl] = useState("");
  const [statusLabel, setStatusLabel] = useState("");
  const [statusColor, setStatusColor] = useState("bg-green-500");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (navData && navData.links) {
      setNavLinks(navData.links);
    }
  }, [navData]);

  useEffect(() => {
    if (footerData) {
      setFooterDesc(footerData.description || "");
      setTwitterUrl(footerData.twitterUrl || "");
      setLinkedinUrl(footerData.linkedinUrl || "");
      setGithubUrl(footerData.githubUrl || "");
      setMailUrl(footerData.mailUrl || "");
      setStatusLabel(footerData.statusLabel || "");
      setStatusColor(footerData.statusColor || "bg-green-500");
    }
  }, [footerData]);

  const handleAddNavLink = () => {
    setNavLinks([...navLinks, { name: "New Link", href: "/" }]);
  };

  const handleRemoveNavLink = (index: number) => {
    setNavLinks(navLinks.filter((_, idx) => idx !== index));
  };

  const handleNavLinkChange = (index: number, field: string, value: string) => {
    const updated = [...navLinks];
    updated[index] = { ...updated[index], [field]: value };
    setNavLinks(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeTab === "nav") {
        await cms.createWithId("settings", "navigation", {
          type: "navigation_settings",
          links: navLinks,
          updatedAt: new Date()
        });
        success("Navigation links saved!");
      } else {
        await cms.createWithId("settings", "footer", {
          type: "footer_settings",
          description: footerDesc,
          twitterUrl, linkedinUrl, githubUrl, mailUrl,
          statusLabel, statusColor,
          updatedAt: new Date()
        });
        success("Footer settings saved!");
      }
    } catch (err) {
      console.error(err);
      showError("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const loading = loadingNav || loadingFooter;
  const error = navError || footerError;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Configure navigation, footer, and brand settings."
        icon={<Settings className="w-5 h-5" />}
        actions={
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="admin-btn-primary text-sm"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Settings"}
          </button>
        }
      />

      <div className="flex gap-1 border-b border-border-soft">
        <button
          onClick={() => setActiveTab("nav")}
          className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === "nav"
              ? "border-primary text-primary"
              : "border-transparent text-text-tertiary hover:text-text-primary"
          }`}
        >
          <Menu className="w-4 h-4" /> Navigation Menu
        </button>
        <button
          onClick={() => setActiveTab("footer")}
          className={`flex items-center gap-2 px-5 py-3 font-medium text-sm transition-all border-b-2 cursor-pointer ${
            activeTab === "footer"
              ? "border-primary text-primary"
              : "border-transparent text-text-tertiary hover:text-text-primary"
          }`}
        >
          <Share2 className="w-4 h-4" /> Footer & Socials
        </button>
      </div>

      {error ? (
        <div className="admin-card p-6 text-danger bg-danger-muted">{error}</div>
      ) : loading ? (
        <div className="text-text-secondary text-center p-8">Loading configuration...</div>
      ) : (
        <div className="admin-card p-8 max-w-3xl space-y-6">
          {activeTab === "nav" && (
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-display font-semibold text-text-primary">Header Navigation Links</h3>
                <button
                  onClick={handleAddNavLink}
                  className="admin-btn-secondary text-xs py-1.5 px-3"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Link
                </button>
              </div>

              <div className="space-y-2">
                {navLinks.map((link, index) => (
                  <div key={index} className="flex gap-4 items-center bg-bg-primary p-4 rounded-xl border border-border-soft">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-semibold text-text-tertiary mb-1">Link Name</label>
                        <input
                          type="text"
                          value={link.name}
                          onChange={(e) => handleNavLinkChange(index, "name", e.target.value)}
                          className="admin-input text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-text-tertiary mb-1">Path (href)</label>
                        <input
                          type="text"
                          value={link.href}
                          onChange={(e) => handleNavLinkChange(index, "href", e.target.value)}
                          className="admin-input text-xs font-mono"
                        />
                      </div>
                    </div>
                    <button onClick={() => handleRemoveNavLink(index)} className="admin-btn-danger p-2 mt-4">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "footer" && (
            <div className="space-y-5">
              <h3 className="text-sm font-display font-semibold text-text-primary">Footer & Brand Configuration</h3>

              <div>
                <label className="block text-xs font-semibold text-text-secondary mb-2">Footer Description</label>
                <textarea
                  rows={3}
                  value={footerDesc}
                  onChange={(e) => setFooterDesc(e.target.value)}
                  className="admin-textarea text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">Twitter Link</label>
                  <input type="text" value={twitterUrl} onChange={(e) => setTwitterUrl(e.target.value)} className="admin-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">LinkedIn Link</label>
                  <input type="text" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="admin-input" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">GitHub Link</label>
                  <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} className="admin-input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-2">Mail Link</label>
                  <input type="text" value={mailUrl} onChange={(e) => setMailUrl(e.target.value)} className="admin-input" />
                </div>
              </div>

              <div className="border-t border-border-soft pt-5 space-y-4">
                <h4 className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" /> System Status Banner
                </h4>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-2">Status Label</label>
                    <input type="text" value={statusLabel} onChange={(e) => setStatusLabel(e.target.value)} className="admin-input" placeholder="All Systems Operational" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text-secondary mb-2">Status Color</label>
                    <select value={statusColor} onChange={(e) => setStatusColor(e.target.value)} className="admin-select">
                      <option value="bg-green-500">Green (Operational)</option>
                      <option value="bg-yellow-500">Yellow (Degraded)</option>
                      <option value="bg-red-500">Red (Outage)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
