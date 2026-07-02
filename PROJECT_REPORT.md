# KrayoNova Project Report

## Overview
KrayoNova is a Next.js App Router project for a digital agency site with three main surfaces:

- Public marketing pages under `app/(main)`
- Auth pages under `app/(auth)`
- A protected admin experience under `app/(admin)`

The site is built around a shared content layer. Most frontend pages read from the same collections and settings records that the admin pages edit. That means the admin panel is not a separate app; it is the control surface for the public site.

## Tech Stack
- Next.js 15 with React 19
- TypeScript
- Tailwind CSS 4
- Supabase for authentication, database access, and storage
- Motion for animations
- Lucide React for icons
- Vitest for tests

## App Structure
The root layout is defined in `app/layout.tsx`. It sets the document shell, loads the Google fonts, and wraps the app in `AuthProvider`.

Route groups separate the experience by purpose:

- `app/(main)` renders the public site shell with background, navbar, footer, and analytics tracking.
- `app/(auth)` renders centered authentication pages.
- `app/(dashboard)` renders the client dashboard shell.
- `app/(admin)` renders the admin shell with sidebar, role checks, and a dark dashboard UI.

## Global Runtime Flow
1. The browser loads the root layout from `app/layout.tsx`.
2. `AuthProvider` listens to Supabase auth state on the client and syncs the session cookie.
3. Public pages render inside the main layout, which adds the background, navbar, footer, and analytics tracker.
4. Protected admin and dashboard layouts call `getServerUser()` on the server.
5. If there is no valid user, or the role is not allowed, the user is redirected to `/sign-in`.

## Authentication And Access Control
Authentication is split between client and server:

- Client-side auth state lives in `hooks/use-auth.tsx`.
- The client listens to Supabase auth changes, fetches the user profile from the `users` table, and keeps the session cookie in sync.
- Server-side auth lives in `lib/supabase/server.ts`.
- `getServerUser()` verifies the `supabase-token` cookie, checks the Supabase user, and loads the matching profile row.

Admin access is restricted in `app/(admin)/layout.tsx`.

- Allowed roles are `super_admin`, `admin`, `content_manager`, and `sales_manager`.
- Everyone else gets redirected to `/sign-in`.

The dashboard layout in `app/(dashboard)/layout.tsx` also requires a signed-in user.

## Content Architecture
The main content layer is in `lib/actions.ts`, `lib/cms.ts`, and `hooks/use-content.ts`.

- `hooks/use-content.ts` exposes `useDocument()` and `useCollection()`.
- Those hooks fetch data through server actions such as `fetchDocumentServer()` and `fetchCollectionServer()`.
- Writes go through `cms` in `lib/cms.ts`, which is just a thin wrapper over create, update, and delete server actions.
- `lib/actions.ts` translates between frontend shapes and database row shapes.

This is the main reason the public site and admin panel stay connected: the frontend reads the same data model that the admin writes.

## Core Data Model
The app consistently uses a small set of collections and settings records:

- `settings/home_page` for the hero copy on the home page
- `settings/navigation` for navbar links
- `settings/footer` for footer content and social links
- `settings/pricing` for pricing plans
- `services` for service cards and service detail pages
- `projects` for portfolio cards and portfolio detail pages
- `posts` and `blog_posts` for blog content, depending on read path
- `testimonials` for testimonials shown publicly
- `leads` for contact submissions, CTA captures, and job applications
- `users` for auth profiles and role checks
- `media` for the media library
- `careers` for job listings
- `audit_logs` for admin activity history
- `analytics` for traffic and page-view tracking

The naming is a mix of frontend collection names and database table names. `lib/actions.ts` handles the mapping between them.

## Public Site Layout
The public experience is assembled in `app/(main)/layout.tsx`.

- `components/Background.tsx` provides the ambient backdrop.
- `components/Navbar.tsx` renders the top navigation.
- `components/Footer.tsx` renders the footer.
- `components/AnalyticsTracker.tsx` runs after the main content to capture traffic.

The navbar and footer are not static. They read from CMS settings so the admin can change links and brand data without touching code.

## Public Page Connections
### Home page `app/(main)/page.tsx`
The homepage is a composition of reusable blocks:

- `components/Hero.tsx`
- `components/Services.tsx`
- `components/TechEcosystem.tsx`
- `components/Portfolio.tsx`
- `components/CTA.tsx`

Connections:

- Hero copy comes from `settings/home_page`.
- Services come from `services`.
- Portfolio items come from `projects`.
- CTA submissions create new rows in `leads`.

### Services page `app/(main)/services/page.tsx`
This page reuses `components/Services.tsx` and `components/CTA.tsx`.

Connections:

- Public service cards are driven by the `services` collection.
- If the collection is empty, the component falls back to built-in placeholder services.

### Portfolio page `app/(main)/portfolio/page.tsx`
This page reuses `components/Portfolio.tsx` and `components/CTA.tsx`.

Connections:

- Public portfolio cards come from the `projects` collection.
- Each item can optionally link to an external project URL managed in admin.

### Pricing page `app/(main)/pricing/page.tsx`
This page uses `useDocument("settings", "pricing")`.

Connections:

- Pricing plans are editable from the `settings/pricing` record in admin.
- The contact form can receive the plan name through the query string.

### Blog index `app/(main)/blog/page.tsx`
This page uses `useCollection("posts")`.

Connections:

- The blog list is read from the posts collection.
- Published posts are shown publicly.
- Search and category filtering are client-side only.

### Blog detail `app/(main)/blog/[slug]/page.tsx`
This page reads directly from the blog content table through Supabase admin access.

Connections:

- Admin blog content saved through the CMS becomes the data rendered here.
- Slugs are resolved first, then the ID is used as a fallback.
- Meta title, meta description, cover image, and HTML content all come from the stored post row.

### Careers page `app/(main)/careers/page.tsx`
This page uses `useCollection("careers")`.

Connections:

- Admin job posts appear here.
- Job applications are not stored in a separate applications table; they are written into `leads` with status `Applied`.

### Contact page `app/(main)/contact/page.tsx`
This page has a form that writes into `leads`.

Connections:

- Contact submissions are saved as lead records.
- The page can prefill the details field from `?plan=...` coming from the pricing page.

### About page `app/(main)/about/page.tsx`
This is currently static content.

Connections:

- No CMS dependency is used here yet.
- It is part of the public navigation, but not admin-managed at the moment.

## Reusable Public Components
### Navbar
`components/Navbar.tsx` reads `settings/navigation`.

- The admin settings page can change the top navigation links.
- On mobile, the same links are used in the slide-out menu.

### Footer
`components/Footer.tsx` reads `settings/footer`.

- The admin settings page can change the description, social links, status label, and footer link groups.

### Hero
`components/Hero.tsx` reads `settings/home_page`.

- The admin pages management screen edits the homepage hero heading and subheading.

### Services
`components/Services.tsx` reads `services`.

- Admin services CRUD changes the cards shown on the public services section and services page.

### Portfolio
`components/Portfolio.tsx` reads `projects`.

- Admin portfolio CRUD changes the public case studies grid.

### CTA
`components/CTA.tsx` creates new `leads` rows.

- Any email submitted through the CTA becomes a lead visible in admin CRM and leads pages.

## Admin Shell
The admin experience lives under `app/(admin)`.

Important behavior:

- It is server-rendered and dynamic.
- It redirects unauthenticated users to `/sign-in`.
- It only allows the approved roles.
- The sidebar links are hardcoded, so the menu structure is controlled in code rather than by CMS.

## Admin Page Map
### `app/(admin)/admin/page.tsx`
Admin dashboard overview.

Data sources:

- `leads`
- `portfolio`
- `users` filtered to clients
- `analytics`

What it shows:

- Lead counts
- Client counts
- Project counts
- Page-view totals
- Recent CRM leads
- Traffic distribution by path

### `app/(admin)/admin/pages/page.tsx`
Homepage copy editor.

Data source:

- `settings/home_page`

Frontend connection:

- Updates the Hero component on the public homepage.

### `app/(admin)/admin/settings/page.tsx`
Global settings editor.

Data sources:

- `settings/navigation`
- `settings/footer`

Frontend connections:

- Updates the public navbar links.
- Updates the public footer copy, social links, and system status banner.

### `app/(admin)/admin/services/page.tsx`
Services list management.

Data source:

- `services`

Frontend connection:

- Feeds `components/Services.tsx` and the public services page.

### `app/(admin)/admin/services/[id]/page.tsx`
Create/edit a single service.

Data source:

- `services`

Frontend connection:

- Changes appear on the public services section and services page.

### `app/(admin)/admin/portfolio/page.tsx`
Portfolio list management.

Data source:

- `projects`

Frontend connection:

- Feeds `components/Portfolio.tsx` and the public portfolio page.

### `app/(admin)/admin/portfolio/[id]/page.tsx`
Create/edit a single portfolio project.

Data source:

- `projects`

Extra capability:

- Supports cover-image upload to Supabase Storage.
- Can also download an image from a public URL and re-upload it to storage.

Frontend connection:

- Controls the public case-study cards and project links.

### `app/(admin)/admin/blog/page.tsx`
Blog post list management.

Data source:

- `posts`

Frontend connection:

- Controls the public blog index and blog detail pages.

### `app/(admin)/admin/blog/[id]/page.tsx`
Create/edit a single blog post.

Data source:

- `posts`

Frontend connection:

- Controls blog titles, slugs, content, cover images, SEO metadata, and publish state.

### `app/(admin)/admin/careers/page.tsx`
Job post management.

Data source:

- `careers`

Frontend connection:

- Controls the public careers page job list.

### `app/(admin)/admin/testimonials/page.tsx`
Testimonials CMS.

Data source:

- `testimonials`

Frontend connection:

- Controls any public testimonial section that reads from the testimonials collection.

### `app/(admin)/admin/leads/page.tsx`
Lead list management.

Data source:

- `leads`

Frontend connection:

- Shows leads created from the contact form, CTA form, and job applications.

### `app/(admin)/admin/crm/page.tsx`
Lead pipeline workspace.

Data source:

- `leads`

Frontend connection:

- Same underlying lead records as the contact and CTA forms.
- Adds sales workflow metadata like status, assigned owner, and notes.

### `app/(admin)/admin/media/page.tsx`
Media library.

Data source:

- `media`

Storage connection:

- Can upload files to Supabase Storage buckets.
- Can also register external URLs as media assets.

Frontend connection:

- Provides reusable public asset URLs for the rest of the site.

### `app/(admin)/admin/audit-logs/page.tsx`
Audit log viewer.

Data source:

- `audit_logs`

Frontend connection:

- Administrative history only; no public page depends on it directly.

### `app/(admin)/admin/notifications/page.tsx`
Lead notification workspace.

Data source:

- `leads`

Frontend connection:

- Uses the same lead records generated by public forms.

### `app/(admin)/admin/users/page.tsx`
User management.

Data source:

- `users`

Frontend connection:

- Supports role-based access control and client profile data.

### `app/(admin)/admin/pricing/page.tsx`
Pricing CMS.

Data source:

- `settings/pricing`

Frontend connection:

- Drives the public pricing page plans.

## Frontend To Admin Connection Summary
Here is the simplest way to understand the system:

- Public pages read from `useDocument()` and `useCollection()`.
- Admin pages write with `cms.create()`, `cms.createWithId()`, `cms.update()`, and `cms.delete()`.
- Both sides talk to the same underlying Supabase tables.
- Shared collections like `settings`, `services`, `projects`, `posts`, `careers`, `testimonials`, and `leads` are the bridge between admin and public UI.

## Important Behavior Notes
- `use-content.ts` enables realtime refresh in production only.
- The admin shell marks the route tree as dynamic so auth is checked on each request.
- The homepage, services page, portfolio page, pricing page, blog, careers page, CTA, and contact form all participate in the same CMS-backed content flow.
- `leads` is the central inbound-record table for contacts, CTA submissions, and job applications.

## Tests And Scripts
Scripts in `package.json`:

- `npm run dev` starts the Next.js dev server.
- `npm run build` builds the app.
- `npm run start` runs the standalone production server.
- `npm run lint` runs ESLint.
- `npm run test` runs Vitest.

Existing tests currently cover:

- `tests/actions.test.ts`
- `tests/auth-session.test.ts`
- `tests/middleware.test.ts`

## Overall Assessment
This project is a CMS-driven agency site where the admin panel is responsible for nearly all editable public content. The main implementation pattern is consistent:

- Read on the frontend with content hooks.
- Edit in admin with CMS actions.
- Persist in Supabase.
- Reuse the same data across the public site and the admin tools.

That gives the project a clean separation between presentation and content management while keeping the actual content model shared.