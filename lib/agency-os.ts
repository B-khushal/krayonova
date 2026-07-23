export type HomepageSectionType =
  | "hero"
  | "stats"
  | "services"
  | "portfolio"
  | "testimonials"
  | "caseStudies"
  | "process"
  | "team"
  | "faq"
  | "videoShowcase"
  | "clientLogos"
  | "awards"
  | "cta"
  | "custom";

export type WebsiteVisibilityKey =
  | "hero"
  | "portfolio"
  | "testimonials"
  | "blog"
  | "careers"
  | "pricing"
  | "cta"
  | "footer"
  | "announcementBar"
  | "popup";

export type ManagedLink = {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
};

export type HomepageSection = {
  id: string;
  type: HomepageSectionType;
  label: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  schedule?: {
    startAt?: string;
    endAt?: string;
  };
  content: Record<string, any>;
};

export type WebsiteControlConfig = {
  brand: {
    agencyName: string;
    adminSuiteName: string;
    tagline: string;
    supportEmail: string;
    accentLabel: string;
  };
  visibility: Record<WebsiteVisibilityKey, boolean>;
  navigation: {
    links: ManagedLink[];
  };
  footer: {
    description: string;
    statusLabel: string;
    statusColor: string;
    companyLinks: ManagedLink[];
    expertiseLinks: ManagedLink[];
    legalLinks: ManagedLink[];
    socials: {
      twitter: string;
      linkedin: string;
      github: string;
      mail: string;
    };
  };
  announcementBar: {
    enabled: boolean;
    eyebrow: string;
    text: string;
    ctaLabel: string;
    ctaHref: string;
  };
  popup: {
    enabled: boolean;
    title: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  homepage: {
    sections: HomepageSection[];
  };
  seo: {
    titleTemplate: string;
    defaultDescription: string;
  };
};

const SECTION_LABELS: Record<HomepageSectionType, string> = {
  hero: "Hero",
  stats: "Stats",
  services: "Services",
  portfolio: "Portfolio",
  testimonials: "Testimonials",
  caseStudies: "Case Studies",
  process: "Process",
  team: "Team",
  faq: "FAQ",
  videoShowcase: "Video Showcase",
  clientLogos: "Client Logos",
  awards: "Awards",
  cta: "CTA",
  custom: "Custom Section",
};

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function createManagedLink(label: string, href: string, enabled = true): ManagedLink {
  return {
    id: createId(label.toLowerCase().replace(/[^a-z0-9]+/g, "-")),
    label,
    href,
    enabled,
  };
}

export function createSectionTemplate(type: HomepageSectionType): HomepageSection {
  switch (type) {
    case "hero":
      return {
        id: createId("hero"),
        type,
        label: SECTION_LABELS[type],
        description: "Primary brand statement with premium CTAs and performance proof.",
        enabled: true,
        locked: true,
        content: {
          eyebrow: "Enterprise Digital Agency",
          title: "Transforming Ideas Into Digital Excellence",
          subtitle:
            "We create AI-powered products, premium web architectures, and digital experiences that help visionary founders scale faster.",
          primaryCtaLabel: "Start Your Project",
          primaryCtaHref: "/contact",
          secondaryCtaLabel: "View Showreel",
          secondaryCtaHref: "/portfolio",
          stats: [
            { value: "100+", label: "Projects Shipped" },
            { value: "50+", label: "Enterprise Clients" },
            { value: "99%", label: "Satisfaction Rate" },
          ],
        },
      };
    case "stats":
      return {
        id: createId("stats"),
        type,
        label: SECTION_LABELS[type],
        description: "Executive performance counters and social proof.",
        enabled: true,
        content: {
          eyebrow: "Executive Snapshot",
          title: "Momentum you can measure at a glance",
          items: [
            { value: "14d", label: "Average launch cycle" },
            { value: "4.9/5", label: "Client satisfaction" },
            { value: "32%", label: "Average conversion lift" },
            { value: "24/7", label: "Monitoring coverage" },
          ],
        },
      };
    case "services":
      return {
        id: createId("services"),
        type,
        label: SECTION_LABELS[type],
        description: "High-value service cards and delivery positioning.",
        enabled: true,
        content: {
          title: "Mastery in Every Stack",
          description:
            "Comprehensive technical capabilities delivered with uncompromising aesthetic precision. We build systems that scale effortlessly.",
          ctaLabel: "View All Capabilities",
          ctaHref: "/services",
        },
      };
    case "portfolio":
      return {
        id: createId("portfolio"),
        type,
        label: SECTION_LABELS[type],
        description: "Featured delivery stories and proof of execution.",
        enabled: true,
        content: {
          eyebrow: "Featured Work",
          title: "A Selection of Digital Products Engineered for Market Leaders",
          description:
            "Category-defining launches, enterprise modernization programs, and AI-powered experiences delivered with measurable impact.",
          ctaLabel: "View Complete Portfolio",
          ctaHref: "/portfolio",
        },
      };
    case "testimonials":
      return {
        id: createId("testimonials"),
        type,
        label: SECTION_LABELS[type],
        description: "Reputation and social proof from strategic accounts.",
        enabled: true,
        content: {
          eyebrow: "Client Confidence",
          title: "Trusted by executive teams that expect outcomes",
          items: [
            {
              quote: "KrayoNova gave us a sharper product, a faster pipeline, and far more confidence in launch execution.",
              author: "Aarav Mehta",
              role: "Chief Growth Officer, Northstar Capital",
            },
            {
              quote: "The team brought agency creativity and enterprise operating discipline into one partner.",
              author: "Nina Romero",
              role: "VP Digital, Axiom Health",
            },
            {
              quote: "We replaced scattered vendors with one operating partner and our velocity climbed immediately.",
              author: "David Chen",
              role: "Founder, Orbit Labs",
            },
          ],
        },
      };
    case "caseStudies":
      return {
        id: createId("case-studies"),
        type,
        label: SECTION_LABELS[type],
        description: "Narrative case study highlights and results.",
        enabled: true,
        content: {
          eyebrow: "Case Studies",
          title: "Execution stories from strategy through scale",
          items: [
            {
              title: "Private equity portfolio redesign",
              result: "43% lift in demo requests after a complete positioning and UX overhaul.",
            },
            {
              title: "AI lead qualification engine",
              result: "72% faster response handling with richer enrichment and routing.",
            },
            {
              title: "Luxury services replatform",
              result: "Launched a new CMS and analytics stack without disrupting inbound demand.",
            },
          ],
        },
      };
    case "process":
      return {
        id: createId("process"),
        type,
        label: SECTION_LABELS[type],
        description: "Delivery methodology and executive workflow visibility.",
        enabled: true,
        content: {
          eyebrow: "Operating Model",
          title: "A calm, structured system for ambitious digital work",
          steps: [
            "Position the opportunity and define the measurable business objective.",
            "Prototype the experience, messaging, and conversion system.",
            "Ship on a hardened production stack with analytics and controls.",
            "Optimize through retained experimentation, reporting, and automation.",
          ],
        },
      };
    case "team":
      return {
        id: createId("team"),
        type,
        label: SECTION_LABELS[type],
        description: "Team credibility, leadership, and specialist coverage.",
        enabled: true,
        content: {
          eyebrow: "Leadership",
          title: "Specialists across product, growth, creative, and engineering",
          members: [
            { name: "Maya Kapoor", role: "Strategy Director" },
            { name: "Rohan D'Souza", role: "Lead Product Engineer" },
            { name: "Elena Brooks", role: "Creative Systems Lead" },
            { name: "Jordan Ellis", role: "CRM & Automation Architect" },
          ],
        },
      };
    case "faq":
      return {
        id: createId("faq"),
        type,
        label: SECTION_LABELS[type],
        description: "Decision support for prospects and inbound leads.",
        enabled: true,
        content: {
          eyebrow: "FAQ",
          title: "Questions executive teams usually ask before engaging",
          items: [
            {
              question: "Can we control content without developer support?",
              answer: "Yes. The Agency OS is designed so content, visibility, scheduling, and messaging changes are handled from the admin experience.",
            },
            {
              question: "Do you support retainers and one-off launches?",
              answer: "Yes. The operating model supports strategic retainers, delivery sprints, and long-term product partnerships.",
            },
            {
              question: "Can this connect with our CRM and internal tools?",
              answer: "Yes. Supabase, webhooks, and API integrations make it straightforward to connect your existing workflow.",
            },
          ],
        },
      };
    case "videoShowcase":
      return {
        id: createId("video"),
        type,
        label: SECTION_LABELS[type],
        description: "Showreel or motion-first proof section.",
        enabled: true,
        content: {
          eyebrow: "Showreel",
          title: "See the product experience before we ever book the meeting",
          description:
            "Use this block for a launch reel, embedded Loom walkthrough, or product flythrough that makes the offer feel premium immediately.",
          mediaLabel: "Replace with your product reel or embedded player URL",
        },
      };
    case "clientLogos":
      return {
        id: createId("logos"),
        type,
        label: SECTION_LABELS[type],
        description: "Brand trust strip for enterprise credibility.",
        enabled: true,
        content: {
          eyebrow: "Selected Clients",
          logos: ["Northstar", "Axiom", "Helios", "Atlas", "Monarch", "Orbit"],
        },
      };
    case "awards":
      return {
        id: createId("awards"),
        type,
        label: SECTION_LABELS[type],
        description: "Awards, certifications, and strategic credentials.",
        enabled: true,
        content: {
          eyebrow: "Recognition",
          title: "Credentials that reinforce trust at enterprise buying moments",
          items: ["Top B2B Product Studio", "ISO-aligned Delivery", "Accessibility-Aware Design", "AI Workflow Specialists"],
        },
      };
    case "cta":
      return {
        id: createId("cta"),
        type,
        label: SECTION_LABELS[type],
        description: "Primary conversion block for direct inbound capture.",
        enabled: true,
        locked: true,
        content: {
          title: "Ready to Build Something Extraordinary?",
          description:
            "Partner with KrayoNova to engineer digital products that define categories and captivate users.",
          placeholder: "Enter your email address",
          buttonLabel: "Start",
        },
      };
    case "custom":
    default:
      return {
        id: createId("custom"),
        type: "custom",
        label: SECTION_LABELS.custom,
        description: "Flexible narrative block for launches, promos, or niche content.",
        enabled: true,
        content: {
          eyebrow: "Custom Block",
          title: "Create a new premium section without touching code",
          description:
            "Use this area for campaign messaging, partner launches, event announcements, or tailored landing-page narratives.",
          ctaLabel: "Learn More",
          ctaHref: "/contact",
        },
      };
  }
}

export function createDefaultWebsiteControlConfig(): WebsiteControlConfig {
  return {
    brand: {
      agencyName: "KrayoNova",
      adminSuiteName: "Digital Agency OS",
      tagline: "Luxury operating system for growth, delivery, and website control.",
      supportEmail: "krayonova@gmail.com",
      accentLabel: "Enterprise Edition",
    },
    visibility: {
      hero: true,
      portfolio: true,
      testimonials: true,
      blog: true,
      careers: true,
      pricing: true,
      cta: true,
      footer: true,
      announcementBar: false,
      popup: false,
    },
    navigation: {
      links: [
        createManagedLink("Home", "/"),
        createManagedLink("About", "/about"),
        createManagedLink("Services", "/services"),
        createManagedLink("Portfolio", "/portfolio"),
        createManagedLink("Pricing", "/pricing"),
        createManagedLink("Blog", "/blog"),
        createManagedLink("Careers", "/careers"),
        createManagedLink("Contact", "/contact"),
      ],
    },
    footer: {
      description:
        "Engineering the Future. A premium digital studio crafting world-class software, websites, and AI systems for visionary enterprises.",
      statusLabel: "All Systems Operational",
      statusColor: "bg-emerald-500",
      companyLinks: [
        createManagedLink("About Us", "/about"),
        createManagedLink("Careers", "/careers"),
        createManagedLink("Services", "/services"),
        createManagedLink("Contact", "/contact"),
      ],
      expertiseLinks: [
        createManagedLink("AI Solutions", "/services"),
        createManagedLink("Web Engineering", "/services"),
        createManagedLink("Mobile Apps", "/services"),
        createManagedLink("Cloud Architecture", "/services"),
      ],
      legalLinks: [
        createManagedLink("Privacy Policy", "#"),
        createManagedLink("Terms of Service", "#"),
        createManagedLink("Cookie Policy", "#"),
      ],
      socials: {
        twitter: "#",
        linkedin: "#",
        github: "#",
        mail: "mailto:krayonova@gmail.com",
      },
    },
    announcementBar: {
      enabled: false,
      eyebrow: "New",
      text: "Launch faster with the new Digital Agency OS command center.",
      ctaLabel: "Explore admin",
      ctaHref: "/sign-in",
    },
    popup: {
      enabled: false,
      title: "Get the Agency Operating System overview",
      description: "Capture leads with a premium announcement, download gate, or launch invitation.",
      ctaLabel: "Book a walkthrough",
      ctaHref: "/contact",
    },
    homepage: {
      sections: [
        createSectionTemplate("hero"),
        createSectionTemplate("stats"),
        createSectionTemplate("services"),
        createSectionTemplate("portfolio"),
        createSectionTemplate("testimonials"),
        createSectionTemplate("caseStudies"),
        createSectionTemplate("process"),
        createSectionTemplate("team"),
        createSectionTemplate("faq"),
        createSectionTemplate("videoShowcase"),
        createSectionTemplate("clientLogos"),
        createSectionTemplate("awards"),
        createSectionTemplate("cta"),
      ],
    },
    seo: {
      titleTemplate: "KrayoNova | Premium Digital Agency OS",
      defaultDescription:
        "Luxury digital agency operating system powered by Next.js and Supabase.",
    },
  };
}

function normalizeLinks(source: any, fallback: ManagedLink[]) {
  if (!Array.isArray(source) || source.length === 0) {
    return fallback;
  }

  return source.map((link: any, index: number) => ({
    id: link?.id || createId(`link-${index + 1}`),
    label: link?.label || link?.name || `Link ${index + 1}`,
    href: link?.href || "#",
    enabled: link?.enabled !== false,
  }));
}

function normalizeSections(source: any, fallback: HomepageSection[]) {
  if (!Array.isArray(source) || source.length === 0) {
    return fallback;
  }

  return source.map((section: any) => {
    const template = createSectionTemplate((section?.type as HomepageSectionType) || "custom");
    return {
      ...template,
      ...section,
      id: section?.id || template.id,
      label: section?.label || template.label,
      description: section?.description || template.description,
      enabled: section?.enabled !== false,
      content: {
        ...template.content,
        ...(section?.content || {}),
      },
    };
  });
}

export function mergeWebsiteControlConfig(input: any): WebsiteControlConfig {
  const base = createDefaultWebsiteControlConfig();
  const source = input?.data ? { ...input.data, ...input } : input || {};

  const merged: WebsiteControlConfig = {
    ...base,
    brand: {
      ...base.brand,
      ...(source.brand || {}),
    },
    visibility: {
      ...base.visibility,
      ...(source.visibility || {}),
    },
    navigation: {
      links: normalizeLinks(source.navigation?.links || source.links, base.navigation.links),
    },
    footer: {
      ...base.footer,
      ...(source.footer || {}),
      description: source.footer?.description || source.description || base.footer.description,
      statusLabel: source.footer?.statusLabel || source.statusLabel || base.footer.statusLabel,
      statusColor: source.footer?.statusColor || source.statusColor || base.footer.statusColor,
      companyLinks: normalizeLinks(source.footer?.companyLinks, base.footer.companyLinks),
      expertiseLinks: normalizeLinks(source.footer?.expertiseLinks, base.footer.expertiseLinks),
      legalLinks: normalizeLinks(source.footer?.legalLinks, base.footer.legalLinks),
      socials: {
        ...base.footer.socials,
        ...(source.footer?.socials || {}),
        twitter: source.footer?.socials?.twitter || source.twitterUrl || base.footer.socials.twitter,
        linkedin: source.footer?.socials?.linkedin || source.linkedinUrl || base.footer.socials.linkedin,
        github: source.footer?.socials?.github || source.githubUrl || base.footer.socials.github,
        mail: source.footer?.socials?.mail || source.mailUrl || base.footer.socials.mail,
      },
    },
    announcementBar: {
      ...base.announcementBar,
      ...(source.announcementBar || {}),
    },
    popup: {
      ...base.popup,
      ...(source.popup || {}),
    },
    homepage: {
      sections: normalizeSections(source.homepage?.sections || source.sections, base.homepage.sections),
    },
    seo: {
      ...base.seo,
      ...(source.seo || {}),
    },
  };

  if (source.heroHeading || source.heroSubheading) {
    merged.homepage.sections = merged.homepage.sections.map((section) =>
      section.type === "hero"
        ? {
            ...section,
            content: {
              ...section.content,
              title: source.heroHeading || section.content.title,
              subtitle: source.heroSubheading || section.content.subtitle,
            },
          }
        : section,
    );
  }

  return merged;
}

export function isSectionScheduled(section: HomepageSection, now = new Date()) {
  const startAt = section.schedule?.startAt ? new Date(section.schedule.startAt) : null;
  const endAt = section.schedule?.endAt ? new Date(section.schedule.endAt) : null;

  if (startAt && now < startAt) {
    return false;
  }

  if (endAt && now > endAt) {
    return false;
  }

  return true;
}

export function getSectionLabel(type: HomepageSectionType) {
  return SECTION_LABELS[type];
}

export const homepageSectionLibrary = ([
  "hero",
  "stats",
  "services",
  "portfolio",
  "testimonials",
  "caseStudies",
  "process",
  "team",
  "faq",
  "videoShowcase",
  "clientLogos",
  "awards",
  "cta",
  "custom",
] as HomepageSectionType[]).map((type) => ({
  type,
  label: getSectionLabel(type),
  template: createSectionTemplate(type),
}));
