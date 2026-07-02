"use client";

import { useCollection } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { Users } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import EmptyState from "@/components/admin/ui/EmptyState";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminUsers() {
  const { data: users, loading, error } = useCollection<any>("users", { orderBy: { field: "createdAt", direction: "desc" }});
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { success, error: showError } = useToast();

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      await cms.update("users", userId, {
        role: newRole,
        updatedAt: new Date()
      });
      success("User role updated.");
    } catch (err) {
      console.error("Failed to update role:", err);
      showError("Error updating user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  const roleBadge = (role: string): "primary" | "success" | "warning" | "info" | "neutral" => {
    switch (role) {
      case "super_admin": return "primary";
      case "admin": return "success";
      case "content_manager": return "info";
      case "sales_manager": return "warning";
      default: return "neutral";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users & Roles"
        description="Manage user accounts and their access permissions."
        icon={<Users className="w-5 h-5" />}
      />

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={5} />
        ) : users.length === 0 ? (
          <EmptyState icon={Users} title="No users registered" description="Users will appear here once they sign up." />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>User Profile</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => {
                const dateString = user.createdAt?.toDate
                  ? user.createdAt.toDate().toLocaleDateString()
                  : "Recently";
                return (
                  <tr key={user.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary font-bold text-sm">
                          {user.name ? user.name[0].toUpperCase() : "U"}
                        </div>
                        <div>
                          <p className="font-semibold text-text-primary text-sm">{user.name || "Unnamed User"}</p>
                          <p className="text-[11px] text-text-tertiary">{user.company || "No Company"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-xs text-text-secondary">{user.email}</td>
                    <td className="text-sm text-text-secondary">{dateString}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <select
                          disabled={updatingId === user.id}
                          value={user.role || "client"}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="admin-select text-xs py-1.5 w-auto"
                        >
                          <option value="client">Client</option>
                          <option value="sales_manager">Sales Manager</option>
                          <option value="content_manager">Content Manager</option>
                          <option value="admin">Admin</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                        {updatingId === user.id && (
                          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
