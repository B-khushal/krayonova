import type { Metadata } from "next";
import { env } from "@/lib/env";

export interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

const DEFAULT_TITLE = "KrayoNova | Premium Digital Experience & AI Product Agency";
const DEFAULT_DESCRIPTION = "We engineer AI-powered products, high-performance web applications, mobile platforms, and bespoke digital experiences for global leaders.";

export function generateSEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = "/og-image.png",
  type = "website",
  publishedTime,
  authors,
  noIndex = false,
}: SEOProps = {}): Metadata {
  const canonicalUrl = `${env.siteUrl}${path}`;
  const fullImageUrl = image.startsWith("http") ? image : `${env.siteUrl}${image}`;

  return {
    title: {
      default: title,
      template: "%s | KrayoNova",
    },
    description,
    metadataBase: new URL(env.siteUrl),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "KrayoNova",
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type,
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullImageUrl],
      creator: "@krayonova",
    },
    authors: [{ name: "KrayoNova Team", url: env.siteUrl }],
    creator: "KrayoNova",
    publisher: "KrayoNova",
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KrayoNova",
    url: env.siteUrl,
    logo: `${env.siteUrl}/KrayoNova-Logo.png`,
    sameAs: [
      "https://twitter.com/krayonova",
      "https://linkedin.com/company/krayonova",
      "https://github.com/krayonova",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-0199",
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "KrayoNova",
    url: env.siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${env.siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: crumb.name,
      item: `${env.siteUrl}${crumb.item}`,
    })),
  };
}
