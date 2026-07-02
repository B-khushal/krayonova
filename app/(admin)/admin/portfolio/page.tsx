"use client";

import { useCollection } from "@/hooks/use-content";
import { CopyPlus, Edit, Trash2, FolderKanban } from "lucide-react";
import Link from "next/link";
import { cms } from "@/lib/cms";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";
import { displayText } from "@/lib/utils";

export default function AdminPortfolio() {
  const { data: projects, loading, error } = useCollection<any>("projects", { orderBy: { field: "order" } });
  const { success, error: showError } = useToast();

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await cms.delete("projects", id);
        success("Project deleted.");
      } catch (err) {
        console.error(err);
        showError("Failed to delete project.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Portfolio Management"
        description="Manage your project showcase and case studies."
        icon={<FolderKanban className="w-5 h-5" />}
        actions={
          <Link href="/admin/portfolio/new" className="admin-btn-primary text-sm">
            <CopyPlus className="w-4 h-4" />
            Add Project
          </Link>
        }
      />

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={4} />
        ) : projects.length === 0 ? (
          <EmptyState
            icon={FolderKanban}
            title="No projects yet"
            description="Add your first portfolio project to showcase your work."
            action={{ label: "Add Project", href: "/admin/portfolio/new" }}
          />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Project Name</th>
                <th>Client</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project: any) => (
                <tr key={project.id}>
                  <td className="font-mono text-xs text-text-tertiary">{displayText(project.order, "0")}</td>
                  <td className="font-semibold text-text-primary">{displayText(project.name, "Project")}</td>
                  <td className="text-text-secondary">{displayText(project.clientName, "Unassigned")}</td>
                  <td>
                    <Badge variant={displayText(project.status, "Draft") === "Published" ? "success" : "warning"} dot>
                      {displayText(project.status, "Draft")}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <div className="flex justify-end gap-1">
                      <Link href={`/admin/portfolio/${project.id}`} className="admin-btn-ghost p-2">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button onClick={(e) => handleDelete(project.id, e)} className="admin-btn-danger p-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
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
