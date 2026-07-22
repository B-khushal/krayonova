<div align="center">

# ✦ KrayoNova

### Digital Agency Operating System

**A premium, full-stack digital agency platform built with Next.js 15, Supabase, and AI — featuring a luxury admin panel with complete website control, CRM, analytics, and content management.**

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%2B%20Auth-3FCF8E?logo=supabase&logoColor=white)](https://supabase.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Private-red)](#)

</div>

---

## Overview

KrayoNova is a **full-stack digital agency platform** that serves as both a public-facing agency website and a powerful enterprise-grade admin operating system. It goes beyond a traditional CMS — providing CRM pipelines, analytics tracking, media management, SEO controls, content editing, website builder features, and AI-powered tools all in one unified platform.

### Key Highlights

- 🏢 **Public Agency Website** — Fully responsive marketing site with 8 pages
- ⚡ **Agency Operating System** — 28-route admin panel with premium light theme
- 🎯 **CRM Pipeline** — Lead tracking, status management, and interaction history
- 📊 **Server-Side Analytics** — Page view tracking, device breakdown, traffic sources
- 🖼️ **Media Library** — Upload, organize, and manage assets via Supabase Storage
- 🔍 **SEO Center** — Meta tags, OpenGraph, SERP preview, robots.txt editor
- 🧱 **Website Builder** — Drag-to-reorder homepage sections with visibility toggles
- 🤖 **AI Integration** — Google Gemini AI via `@google/genai`
- 🔐 **Role-Based Access** — Super Admin, Admin, Content Manager, Sales Manager, Client
- 📝 **Audit Logging** — Full trail of all admin actions

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.9 |
| **UI** | React 19 |
| **Styling** | Tailwind CSS v4 + Custom Design System |
| **Animation** | Framer Motion (`motion`) |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth (JWT-based) |
| **Storage** | Supabase Storage |
| **AI** | Google Gemini (`@google/genai`) |
| **Icons** | Lucide React |
| **Testing** | Vitest |

---

## Project Structure

```
KrayoNova/
├── app/
│   ├── (main)/                    # Public website
│   │   ├── page.tsx               # Homepage
│   │   ├── about/                 # About page
│   │   ├── blog/                  # Blog listing + [slug]
│   │   ├── careers/               # Careers page
│   │   ├── contact/               # Contact form
│   │   ├── portfolio/             # Portfolio showcase
│   │   ├── pricing/               # Pricing page
│   │   └── services/              # Services page
│   │
│   ├── (admin)/                   # Admin Operating System
│   │   ├── layout.tsx             # Server layout (auth guard)
│   │   └── admin/
│   │       ├── page.tsx           # Executive Dashboard
│   │       ├── analytics/         # Analytics Center
│   │       ├── audit-logs/        # Security Audit Logs
│   │       ├── automation/        # Automation Center
│   │       ├── blog/              # Blog CMS + [id] editor
│   │       ├── careers/           # Careers CMS
│   │       ├── crm/               # CRM Lead Pipeline
│   │       ├── leads/             # Leads list
│   │       ├── marketing/         # Marketing Center
│   │       ├── media/             # Media Library
│   │       ├── notifications/     # Notifications Center
│   │       ├── pages/             # Page settings
│   │       ├── portfolio/         # Portfolio CMS + [id] editor
│   │       ├── pricing/           # Pricing configurator
│   │       ├── seo/               # SEO Center
│   │       ├── services/          # Services CMS + [id] editor
│   │       ├── settings/          # Navigation & footer settings
│   │       ├── system/            # System Center
│   │       ├── testimonials/      # Testimonials CMS
│   │       ├── users/             # Users & Roles
│   │       └── website-builder/   # Homepage Builder + section controls
│   │
│   ├── (auth)/                    # Auth pages (sign-in, sign-up, etc.)
│   └── globals.css                # Design system & theme tokens
│
├── components/
│   ├── admin/
│   │   ├── AdminShell.tsx         # Master admin layout (sidebar + header)
│   │   ├── AdminHeader.tsx        # Top header bar
│   │   ├── SidebarGroup.tsx       # Collapsible sidebar groups
│   │   └── ui/                    # Shared UI components
│   │       ├── Badge.tsx
│   │       ├── EmptyState.tsx
│   │       ├── LoadingSkeleton.tsx
│   │       ├── Modal.tsx
│   │       ├── PageHeader.tsx
│   │       ├── StatCard.tsx
│   │       └── Toast.tsx
│   └── ...                        # Public site components
│
├── hooks/
│   ├── use-auth.ts                # Auth context + JWT management
│   └── use-content.ts             # Supabase realtime data hooks
│
├── lib/
│   ├── actions.ts                 # Server actions + data translation layer
│   ├── agency-os.ts               # Website config types & section library
│   ├── cms.ts                     # CMS CRUD operations
│   └── supabase/
│       ├── admin.ts               # Supabase admin client
│       ├── auth.ts                # Auth utilities
│       ├── client.ts              # Browser client
│       ├── database.ts            # Database types
│       ├── realtime.ts            # Realtime channel config
│       ├── server.ts              # Server-side client + getServerUser
│       └── storage.ts             # Storage utilities
│
└── middleware.ts                   # Route protection middleware
```

---

## Admin Panel — Workspace Categories

The admin panel is organized into **12 categorized workspace groups**:

| Workspace | Pages |
|-----------|-------|
| **Overview** | Dashboard, Activity Feed, Notifications |
| **Website Builder** | Homepage Builder, Section Controls, Navigation, SEO Builder |
| **Content** | Pages, Blog Posts, Testimonials, Careers, Pricing |
| **Portfolio** | Projects |
| **Services** | Service Cards |
| **CRM** | Lead Pipeline, Leads |
| **Marketing** | Campaigns |
| **Media** | Media Library |
| **Analytics** | Analytics Overview |
| **Automation** | Workflows |
| **Users** | Users & Roles |
| **System** | Settings, System Center |

---

## Getting Started

### Prerequisites

- **Node.js** 18+
- **Supabase** project (free tier works)
- **Google AI API Key** (for Gemini integration)

### Installation

```bash
# Clone the repository
git clone https://github.com/B-khushal/krayonova.git
cd krayonova

# Install dependencies
npm install
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google AI
GEMINI_API_KEY=your_gemini_api_key
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) for the public site and [http://localhost:3002/admin](http://localhost:3002/admin) for the admin panel.

### Build for Production

```bash
npm run build
npm start
```

---

## Design System

The admin panel uses a custom **premium light theme design system** built on Tailwind CSS v4:

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-bg-primary` | `#FAFAF8` | Main background (warm ivory) |
| `--color-surface` | `#FFFFFF` | Card surfaces |
| `--color-primary` | `#6D28D9` | Brand accent (deep purple) |
| `--color-text-primary` | `#1A1A1A` | Primary text |
| `--color-border-soft` | `#E8E6E1` | Subtle borders |

### Utility Classes

- `admin-card` / `admin-card-interactive` — Premium cards with soft shadows
- `admin-btn-primary` / `admin-btn-secondary` / `admin-btn-ghost` — Button variants
- `admin-input` / `admin-select` / `admin-textarea` — Form controls
- `admin-badge-{variant}` — Status badges (success/warning/danger/info/primary/neutral)
- `admin-table` — Premium table styling
- `admin-toggle` — CSS toggle switches
- `admin-glass` — Glassmorphism panels
- `admin-shimmer` — Loading skeleton shimmer
- `admin-stagger` — Staggered fade-in animation for child elements

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests with Vitest |
| `npm run test:coverage` | Run tests with coverage |

---

## Role-Based Access

| Role | Access Level |
|------|-------------|
| **Super Admin** | Full access to all workspaces |
| **Admin** | Full access to all workspaces |
| **Content Manager** | Content, Blog, Portfolio, Media |
| **Sales Manager** | CRM, Leads, Notifications |
| **Client** | Dashboard only (client portal) |

---

## License

This project is private and proprietary.

---

<div align="center">

**Built with ❤️ by [KrayoNova](https://github.com/B-khushal/krayonova)**

*Premium Digital Agency Operating System*

</div>