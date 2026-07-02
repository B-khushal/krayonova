"use client";

import { useCollection } from "@/hooks/use-content";
import { CopyPlus, Edit, Trash2, Briefcase } from "lucide-react";
import Link from "next/link";
import { cms } from "@/lib/cms";
import PageHeader from "@/components/admin/ui/PageHeader";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminServices() {
  const { data: services, loading, error } = useCollection<any>("services", { orderBy: { field: "order" }});
  const { success, error: showError } = useToast();

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this service?")) {
      try {
        await cms.delete("services", id);
        success("Service deleted.");
      } catch (err) {
        console.error(err);
        showError("Failed to delete service.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Services Management"
        description="Manage your service offerings and capabilities."
        icon={<Briefcase className="w-5 h-5" />}
        actions={
          <Link href="/admin/services/new" className="admin-btn-primary text-sm">
            <CopyPlus className="w-4 h-4" /> Add Service
          </Link>
        }
      />

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={4} />
        ) : services.length === 0 ? (
          <EmptyState icon={Briefcase} title="No services yet" description="Add services to showcase your capabilities." action={{ label: "Add Service", href: "/admin/services/new" }} />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Service Name</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service: any) => (
                <tr key={service.id}>
                  <td className="font-mono text-xs text-text-tertiary">{service.order || 0}</td>
                  <td className="font-semibold text-text-primary">{service.title}</td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/services/${service.id}`} className="admin-btn-ghost p-2"><Edit className="w-4 h-4" /></Link>
                      <button onClick={(e) => handleDelete(service.id, e)} className="admin-btn-danger p-2"><Trash2 className="w-4 h-4" /></button>
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
