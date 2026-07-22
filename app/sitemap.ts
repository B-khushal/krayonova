import type { MetadataRoute } from "next";
import { env } from "@/lib/env";
import { fetchCollectionServer } from "@/lib/actions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = env.siteUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/blog",
    "/careers",
    "/pricing",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    const [services, portfolio, blog] = await Promise.all([
      fetchCollectionServer("services"),
      fetchCollectionServer("projects"),
      fetchCollectionServer("posts"),
    ]);

    const serviceRoutes: MetadataRoute.Sitemap = (services || []).map((s: any) => ({
      url: `${baseUrl}/services/${s.slug || s.id}`,
      lastModified: s.updated_at || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const portfolioRoutes: MetadataRoute.Sitemap = (portfolio || []).map((p: any) => ({
      url: `${baseUrl}/portfolio/${p.slug || p.id}`,
      lastModified: p.updated_at || new Date().toISOString(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = (blog || []).map((b: any) => ({
      url: `${baseUrl}/blog/${b.slug || b.id}`,
      lastModified: b.updated_at || new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.6,
    }));

    return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
