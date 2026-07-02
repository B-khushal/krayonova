"use client";

import { useCollection } from "@/hooks/use-content";
import { FileText, Search, User, Activity } from "lucide-react";
import { useState } from "react";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";

export default function AdminAuditLogs() {
  const { data: logs, loading, error } = useCollection<any>("audit_logs", { orderBy: { field: "createdAt", direction: "desc" }});
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("All");

  const filteredLogs = logs.filter((log: any) => {
    const actor = (log.userId || "").toLowerCase();
    const action = (log.action || "").toLowerCase();
    const moduleName = (log.module || "").toLowerCase();
    const query = searchQuery.toLowerCase();

    const matchesSearch = actor.includes(query) || action.includes(query) || moduleName.includes(query);
    const matchesFilter = moduleFilter === "All" || log.module === moduleFilter;

    return matchesSearch && matchesFilter;
  });

  const modules = ["All", ...Array.from(new Set(logs.map((log: any) => log.module).filter(Boolean)))];

  const getActionBadgeVariant = (action: string): "success" | "warning" | "danger" | "neutral" => {
    switch (action?.toUpperCase()) {
      case "CREATE":
      case "CREATE_WITH_ID":
        return "success";
      case "UPDATE":
        return "warning";
      case "DELETE":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Security Audit Logs"
        description="Track all administrative actions and changes across the platform."
        icon={<Activity className="w-5 h-5" />}
      />

      <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Search logs (actor, action)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-input pl-10 text-xs"
          />
          <Search className="w-4 h-4 text-text-tertiary absolute left-3 top-1/2 -translate-y-1/2" />
        </div>

        <div className="flex gap-2 overflow-x-auto w-full md:w-auto">
          {modules.slice(0, 6).map((mod) => (
            <button
              key={mod}
              onClick={() => setModuleFilter(mod)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all border shrink-0 cursor-pointer ${
                moduleFilter === mod
                  ? "bg-primary text-white border-primary"
                  : "bg-surface border-border-soft text-text-tertiary hover:text-text-primary hover:border-border-medium"
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={6} />
        ) : filteredLogs.length === 0 ? (
          <EmptyState icon={FileText} title="No audit logs found" description="Logs will appear here as actions are performed." />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Actor</th>
                <th>Action</th>
                <th>Module</th>
                <th>Changes</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log: any) => {
                const date = log.createdAt?.toDate
                  ? log.createdAt.toDate().toLocaleString()
                  : "Recently";

                let previewText = "";
                try {
                  const parsed = JSON.parse(log.changes || "{}");
                  previewText = Object.entries(parsed)
                    .map(([key, val]) => `${key}: ${typeof val === "object" ? JSON.stringify(val) : val}`)
                    .join(" | ");
                } catch {
                  previewText = log.changes || "";
                }

                return (
                  <tr key={log.id} className="text-xs">
                    <td className="font-mono text-text-tertiary">{date}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-text-tertiary" />
                        <span className="font-medium text-text-primary">{log.userId}</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={getActionBadgeVariant(log.action)}>
                        {log.action}
                      </Badge>
                    </td>
                    <td className="font-mono text-text-tertiary">{log.module}</td>
                    <td className="max-w-xs truncate text-[10px] text-text-tertiary font-mono" title={previewText}>
                      {previewText}
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
