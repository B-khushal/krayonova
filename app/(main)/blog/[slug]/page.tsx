import { supabaseAdmin } from "@/lib/supabase/admin";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User } from "lucide-react";
import CTA from "@/components/CTA";
import type { Metadata } from "next";
import { generateSEO } from "@/lib/seo";

export const revalidate = 3600;

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug;

  let postData = null;
  if (supabaseAdmin && typeof supabaseAdmin.from === "function") {
    const { data: posts } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", slug);

    if (posts && posts.length > 0) {
      postData = posts[0];
    } else {
      const { data: post } = await supabaseAdmin
        .from("blog_posts")
        .select("*")
        .eq("id", slug)
        .maybeSingle();
      if (post) {
        postData = post;
      }
    }
  }

  if (!postData) {
    return generateSEO({
      title: "Article | KrayoNova Blog",
      path: `/blog/${slug}`,
    });
  }

  return generateSEO({
    title: postData.meta_title || postData.title,
    description: postData.meta_description || postData.description || "Insight article by KrayoNova.",
    path: `/blog/${slug}`,
    image: postData.cover_image || "/og-image.png",
    type: "article",
    publishedTime: postData.created_at,
    authors: [postData.author || "KrayoNova Team"],
  });
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const slug = params.slug;

  let rawPost = null;
  if (supabaseAdmin && typeof supabaseAdmin.from === "function") {
    const { data: posts } = await supabaseAdmin
      .from("blog_posts")
      .select("*")
      .eq("slug", slug);

    if (posts && posts.length > 0) {
      rawPost = posts[0];
    } else {
      const { data: post } = await supabaseAdmin
        .from("blog_posts")
        .select("*")
        .eq("id", slug)
        .maybeSingle();
      if (post) {
        rawPost = post;
      }
    }
  }

  if (!rawPost) {
    notFound();
  }

  const postData = {
    ...rawPost,
    coverImage: rawPost.cover_image,
    createdAt: rawPost.created_at ? {
      toDate: () => new Date(rawPost.created_at)
    } : null
  };

  const dateString = postData.createdAt?.toDate 
    ? postData.createdAt.toDate().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) 
    : "Recently";

  return (
    <>
      <article className="py-24 px-6 md:px-12 max-w-4xl mx-auto min-h-[70vh]">
        <Link href="/blog" className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
              {postData.category || "General"}
            </span>
            <div className="flex items-center gap-1.5 text-sm text-text-muted">
              <Calendar className="w-4 h-4" />
              {dateString}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-text-muted">
              <User className="w-4 h-4" />
              {postData.author || "KrayoNova Team"}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-text-main leading-tight mb-8">
            {postData.title}
          </h1>

          {postData.coverImage && (
            <div className="w-full h-[400px] relative rounded-3xl overflow-hidden glass-card glass-border mb-12">
              <Image 
                src={postData.coverImage} 
                alt={postData.title}
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>
          )}
        </div>

        <div 
          className="prose prose-lg max-w-none text-text-muted leading-relaxed font-light space-y-6"
          dangerouslySetInnerHTML={{ __html: postData.content }}
        />
      </article>
      <CTA />
    </>
  );
}
