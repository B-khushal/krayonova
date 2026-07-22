"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useDocument } from "@/hooks/use-content";
import { cms } from "@/lib/cms";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, PenTool } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/admin/ui/Toast";

export const dynamic = "force-dynamic";

export default function EditBlogPost(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const isNew = params.id === "new";
  const { data: post, loading, error } = useDocument<any>("posts", isNew ? "" : params.id);
  const { success, error: showError, warning } = useToast();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("Draft");
  const [coverImage, setCoverImage] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setSlug(post.slug || "");
      setContent(post.content || "");
      setAuthor(post.author || "");
      setCategory(post.category || "");
      setStatus(post.status || "Draft");
      setCoverImage(post.coverImage || "");
      setMetaTitle(post.metaTitle || "");
      setMetaDescription(post.metaDescription || "");
    }
  }, [post]);

  const generateSlug = (val: string) => {
    setTitle(val);
    if (isNew) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleSave = async () => {
    if (!title || !slug || !content) {
      warning("Title, slug, and content are required.");
      return;
    }

    setSaving(true);
    const data = {
      title,
      slug,
      content,
      author: author || "KrayoNova Team",
      category: category || "General",
      status,
      coverImage,
      metaTitle,
      metaDescription,
      updatedAt: new Date()
    };

    try {
      if (isNew) {
        await cms.create("posts", { ...data, createdAt: new Date() });
      } else {
        await cms.update("posts", params.id, data);
      }
      success("Blog post saved successfully!");
      router.push("/admin/blog");
    } catch (err) {
      console.error(err);
      showError("Failed to save blog post.");
    } finally {
      setSaving(false);
    }
  };

  if (error) {
    return <div className="admin-card p-6 text-danger bg-danger-muted border-danger/20">{error}</div>;
  }

  if (!isNew && loading) return <div className="text-text-secondary p-8 text-center">Loading post details...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/blog" className="admin-btn-ghost p-2"><ArrowLeft className="w-5 h-5" /></Link>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center">
            <PenTool className="w-4 h-4 text-primary" />
          </div>
          <h1 className="text-xl font-display font-bold text-text-primary">
            {isNew ? "Create Blog Post" : "Edit Blog Post"}
          </h1>
        </div>
      </div>

      <div className="admin-card p-8 space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Post Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => generateSlug(e.target.value)}
              className="admin-input"
              placeholder="The Future of Web Engineering"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Post Slug</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="admin-input font-mono text-xs"
              placeholder="future-of-web-engineering"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="admin-input"
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="admin-input"
              placeholder="Engineering"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-secondary mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="admin-select"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">Cover Image URL</label>
          <input
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="admin-input font-mono text-xs"
            placeholder="https://images.unsplash.com/photo-..."
          />
          {coverImage && (
            <div className="mt-3 w-48 h-28 relative rounded-xl overflow-hidden border border-border-soft">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverImage} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-text-secondary mb-2">HTML Content</label>
          <textarea
            rows={12}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="admin-textarea font-mono text-xs"
            placeholder="<p>Write your HTML content here...</p>"
          />
        </div>

        <div className="border-t border-border-soft pt-6 space-y-4">
          <h3 className="text-sm font-display font-semibold text-text-primary">SEO & Metadata</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-2">Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className="admin-input"
                placeholder="Meta title (if different from title)"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-text-secondary mb-2">Meta Description</label>
              <input
                type="text"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className="admin-input"
                placeholder="Short meta description..."
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary mt-4"
        >
          <Save className="w-4 h-4" />
          {saving ? "Saving..." : "Save Post"}
        </button>
      </div>
    </div>
  );
}
