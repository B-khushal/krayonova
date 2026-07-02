"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect } from "react";
import { DollarSign, Save, Plus, Trash2, CheckCircle } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminPricing() {
  const { data: pricingData, loading, error } = useDocument<any>("settings", "pricing");
  const [plans, setPlans] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const { success, error: showError } = useToast();

  useEffect(() => {
    if (pricingData && pricingData.plans) {
      setPlans(pricingData.plans);
    }
  }, [pricingData]);

  const handleFieldChange = (index: number, field: string, value: any) => {
    const updated = [...plans];
    updated[index] = { ...updated[index], [field]: value };
    setPlans(updated);
  };

  const handleAddPlan = () => {
    setPlans([...plans, { name: "New Plan", price: "$0", description: "Plan description...", features: [], highlight: false }]);
  };

  const handleRemovePlan = (index: number) => {
    if (confirm("Remove this pricing plan?")) {
      setPlans(plans.filter((_, idx) => idx !== index));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await cms.createWithId("settings", "pricing", { type: "pricing_settings", plans, updatedAt: new Date() });
      success("Pricing plans saved!");
    } catch (err) {
      console.error(err);
      showError("Failed to save pricing plans.");
    } finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pricing Configuration"
        description="Configure your service pricing tiers."
        icon={<DollarSign className="w-5 h-5" />}
        actions={
          <div className="flex items-center gap-3">
            <button onClick={handleAddPlan} className="admin-btn-secondary text-sm">
              <Plus className="w-4 h-4" /> Add Plan
            </button>
            <button onClick={handleSave} disabled={saving} className="admin-btn-primary text-sm">
              <Save className="w-4 h-4" /> {saving ? "Saving..." : "Save Plans"}
            </button>
          </div>
        }
      />

      {error ? (
        <div className="admin-card p-6 text-danger bg-danger-muted">{error}</div>
      ) : loading ? (
        <div className="text-text-secondary text-center p-8">Loading pricing plans...</div>
      ) : plans.length === 0 ? (
        <div className="admin-card">
          <EmptyState icon={DollarSign} title="No pricing plans configured" description="Click 'Add Plan' to create your first pricing tier." />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`admin-card p-6 relative space-y-4 flex flex-col justify-between ${
                plan.highlight ? "ring-2 ring-primary border-primary" : ""
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">Plan #{index + 1}</span>
                  <button onClick={() => handleRemovePlan(index)} className="admin-btn-danger p-1" title="Remove Plan">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Plan Name</label>
                  <input type="text" value={plan.name} onChange={(e) => handleFieldChange(index, "name", e.target.value)} className="admin-input text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Price Label</label>
                  <input type="text" value={plan.price} onChange={(e) => handleFieldChange(index, "price", e.target.value)} className="admin-input text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Description</label>
                  <textarea rows={2} value={plan.description} onChange={(e) => handleFieldChange(index, "description", e.target.value)} className="admin-textarea text-sm" />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary mb-1.5">Features (Comma Separated)</label>
                  <input
                    type="text"
                    value={plan.features ? plan.features.join(", ") : ""}
                    onChange={(e) => handleFieldChange(index, "features", e.target.value.split(",").map((f: string) => f.trim()))}
                    className="admin-input font-mono text-xs"
                    placeholder="Feature A, Feature B"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border-soft pt-4 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={plan.highlight || false}
                    onChange={(e) => handleFieldChange(index, "highlight", e.target.checked)}
                    className="rounded border-border-medium bg-bg-primary text-primary focus:ring-primary w-4 h-4"
                  />
                  <span className="text-xs text-text-secondary font-medium">Highlight Plan</span>
                </label>
                {plan.highlight && (
                  <Badge variant="primary">Popular</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
