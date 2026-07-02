"use client";

import { useCollection } from "@/hooks/use-content";
import { CopyPlus, Edit, Trash2, Calendar, User, Tag, PenTool } from "lucide-react";
import Link from "next/link";
import { cms } from "@/lib/cms";
import PageHeader from "@/components/admin/ui/PageHeader";
import Badge from "@/components/admin/ui/Badge";
import EmptyState from "@/components/admin/ui/EmptyState";
import LoadingSkeleton from "@/components/admin/ui/LoadingSkeleton";
import { useToast } from "@/components/admin/ui/Toast";

export default function AdminBlogList() {
  const { data: posts, loading, error } = useCollection<any>("posts", { orderBy: { field: "createdAt", direction: "desc" }});
  const { success, error: showError } = useToast();

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        await cms.delete("posts", id);
        success("Blog post deleted.");
      } catch (err) {
        console.error("Failed to delete post:", err);
        showError("Error deleting post.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Blog CMS"
        description="Create, manage, and publish blog content."
        icon={<PenTool className="w-5 h-5" />}
        actions={
          <Link href="/admin/blog/new" className="admin-btn-primary text-sm">
            <CopyPlus className="w-4 h-4" />
            Create Post
          </Link>
        }
      />

      <div className="admin-card overflow-hidden">
        {error ? (
          <div className="p-8 text-danger bg-danger-muted text-center text-sm">{error}</div>
        ) : loading ? (
          <LoadingSkeleton variant="table" count={5} />
        ) : posts.length === 0 ? (
          <EmptyState
            icon={PenTool}
            title="No blog posts yet"
            description="Create your first blog post to start publishing content."
            action={{ label: "Create Post", href: "/admin/blog/new" }}
          />
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Post Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => {
                const dateString = post.createdAt?.toDate
                  ? post.createdAt.toDate().toLocaleDateString()
                  : "Recently";

                return (
                  <tr key={post.id}>
                    <td>
                      <p className="font-semibold text-text-primary text-sm">{post.title}</p>
                      <p className="text-xs text-text-tertiary flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" /> {dateString}
                      </p>
                    </td>
                    <td>
                      <span className="flex items-center gap-1 text-xs text-text-tertiary">
                        <Tag className="w-3 h-3" /> {post.category || "General"}
                      </span>
                    </td>
                    <td>
                      <span className="flex items-center gap-1 text-xs text-text-tertiary">
                        <User className="w-3 h-3" /> {post.author || "KrayoNova"}
                      </span>
                    </td>
                    <td>
                      <Badge variant={post.status === "Published" ? "success" : "warning"} dot>
                        {post.status || "Draft"}
                      </Badge>
                    </td>
                    <td className="text-right">
                      <div className="flex justify-end gap-1">
                        <Link href={`/admin/blog/${post.id}`} className="admin-btn-ghost p-2">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={(e) => handleDelete(post.id, e)} className="admin-btn-danger p-2">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
