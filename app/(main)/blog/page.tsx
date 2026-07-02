"use client";

import Link from "next/link";
import { useState } from "react";
import { useCollection } from "@/hooks/use-content";
import { Search } from "lucide-react";
import CTA from "@/components/CTA";

export default function BlogPage() {
  const { data: dbPosts, loading } = useCollection<any>("posts", { orderBy: { field: "createdAt", direction: "desc" }});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fallbackPosts = [
    { title: "The Future of AI Agents in Enterprise Software", category: "AI & ML", createdAt: { toDate: () => new Date("2026-10-12") }, slug: "future-of-ai-agents", description: "A deep dive into how modern enterprises are leveraging these technologies to stay ahead of the curve." },
    { title: "Building Scalable Architecture for SaaS Products", category: "Engineering", createdAt: { toDate: () => new Date("2026-09-28") }, slug: "scalable-saas-architecture", description: "Learn key architectural choices to handle scaling requirements without sacrificing velocity." },
    { title: "Glassmorphism: The Design Trend That Won't Go Away", category: "Design", createdAt: { toDate: () => new Date("2026-09-15") }, slug: "glassmorphism-design-trends", description: "Understanding how glassmorphic design enhances interface depth and premium branding." },
    { title: "Optimizing React Applications for Peak Performance", category: "Web Development", createdAt: { toDate: () => new Date("2026-08-30") }, slug: "optimizing-react-apps", description: "A technical guide on component tuning, bundle splitting, and rendering optimization." }
  ];

  const posts = dbPosts.length > 0 ? dbPosts : fallbackPosts;

  const publishedPosts = posts.filter(post => post.status === undefined || post.status === "Published");

  const categories = ["All", ...Array.from(new Set(publishedPosts.map(post => post.category).filter(Boolean)))];

  const filteredPosts = publishedPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (post.description && post.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl font-display font-medium text-text-main mb-6">
            Insights & <span className="text-primary">News</span>
          </h1>
          <p className="text-xl text-text-muted font-light">
            Thoughts, learnings, and announcements from the KrayoNova engineering team.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-5xl mx-auto mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/50 border border-gray-200 rounded-full px-5 py-2.5 pl-12 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-text-main"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-4 top-3" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category: any) => (
              <button 
                key={category} 
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
                  selectedCategory === category 
                    ? "bg-primary text-white border-primary shadow-sm" 
                    : "bg-white/50 border-gray-200 text-text-muted hover:border-primary/50 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-text-muted py-12">Loading posts...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {filteredPosts.length === 0 ? (
              <div className="col-span-2 text-center text-text-muted py-12">No posts match your search or filter.</div>
            ) : (
              filteredPosts.map((post, i) => {
                const dateString = post.createdAt?.toDate 
                  ? post.createdAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) 
                  : "Recently";

                return (
                  <Link 
                    key={i} 
                    href={`/blog/${post.slug || post.id}`} 
                    className="glass-card glass-border p-8 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 block group"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider rounded-full">
                        {post.category || "General"}
                      </span>
                      <span className="text-sm text-text-muted">{dateString}</span>
                    </div>
                    <h2 className="text-2xl font-display font-medium text-text-main mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-text-muted line-clamp-2">
                      {post.description || "A deep dive into how modern enterprises are leveraging these technologies to stay ahead of the curve."}
                    </p>
                  </Link>
                );
              })
            )}
          </div>
        )}
      </section>
      <CTA />
    </>
  );
}
