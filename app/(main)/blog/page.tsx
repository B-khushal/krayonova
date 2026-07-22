import { fetchCollectionServer } from "@/lib/actions";
import BlogList from "@/components/BlogList";
import CTA from "@/components/CTA";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Insights & Technical Blog",
  description: "Read technical essays, engineering insights, and AI product architecture guides from the KrayoNova team.",
  path: "/blog",
});

export const revalidate = 3600;

export default async function BlogPage() {
  const dbPosts = await fetchCollectionServer("posts");

  const fallbackPosts = [
    { title: "The Future of AI Agents in Enterprise Software", category: "AI & ML", createdAt: { toDate: () => new Date("2026-10-12") }, slug: "future-of-ai-agents", description: "A deep dive into how modern enterprises are leveraging these technologies to stay ahead of the curve." },
    { title: "Building Scalable Architecture for SaaS Products", category: "Engineering", createdAt: { toDate: () => new Date("2026-09-28") }, slug: "scalable-saas-architecture", description: "Learn key architectural choices to handle scaling requirements without sacrificing velocity." },
    { title: "Glassmorphism: The Design Trend That Won't Go Away", category: "Design", createdAt: { toDate: () => new Date("2026-09-15") }, slug: "glassmorphism-design-trends", description: "Understanding how glassmorphic design enhances interface depth and premium branding." },
    { title: "Optimizing React Applications for Peak Performance", category: "Web Development", createdAt: { toDate: () => new Date("2026-08-30") }, slug: "optimizing-react-apps", description: "A technical guide on component tuning, bundle splitting, and rendering optimization." },
  ];

  const posts = dbPosts && dbPosts.length > 0 ? dbPosts : fallbackPosts;

  return (
    <>
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-[70vh]">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h1 className="text-5xl font-display font-medium text-text-main mb-6">
            Insights & <span className="text-primary">News</span>
          </h1>
          <p className="text-xl text-text-muted font-light leading-relaxed">
            Thoughts, learnings, and announcements from the KrayoNova engineering team.
          </p>
        </div>

        <BlogList posts={posts} />
      </section>
      <CTA />
    </>
  );
}
