# Project Rules & Reference Information

* The live production domain for the web application is `sankalp.jklu.edu.in`. Always use this URL when configuring cron jobs, webhooks, callback targets, or referencing production resources.

## 🌐 UNIVERSAL SEO & NEXT.JS ARCHITECTURE RULES (FOR ALL FUTURE PROJECTS)

* **Server Component Metadata Separation**:
  * Every page route (`app/**/page.tsx`) MUST be a Server Component that exports page-level `Metadata` (`title`, `description`, `keywords`, `openGraph`, `twitter`, `alternates.canonical`) and renders JSON-LD structured data.
  * Never place `'use client'` directly at the top of a `page.tsx` route file if interactive state is needed. Always isolate interactive UI, hooks, and browser state into dedicated Client View components (e.g., `HomeClient.tsx`, `AboutClient.tsx`).

* **Structured Data (JSON-LD Schemas)**:
  * Always include a reusable `JsonLd` helper component (`<script type="application/ld+json">`) for safely injecting `schema.org` structured data.
  * Implement relevant schemas (`Organization` / `EducationalOrganization`, `Event` / `AcademicEvent`, `Product`, `Article`, `BreadcrumbList`, `FAQPage`, `Place`, `ContactPage`) on appropriate routes to qualify for Google Rich Snippets and interactive SERP accordions.

* **Dynamic XML Sitemap & Robots Directive**:
  * Always create a complete dynamic `sitemap.ts` covering 100% of public page routes with explicit `priority` ratings (1.0 for Home, 0.9 for Primary Landing, 0.8 for Subpages, 0.5 for Legal), `changeFrequency`, and `lastModified` timestamps.
  * Always maintain a `robots.ts` file configured for search crawlers (`Googlebot`, `Bingbot`), disallowing private/admin/auth/API endpoints (`/admin`, `/login`, `/api`), and referencing the official `sitemap.xml` URL.

* **Canonical Links & OpenGraph Social Cards**:
  * Configure `metadataBase` in root layout to the live production domain URL.
  * Provide explicit per-route `alternates: { canonical: '...' }` tags and high-resolution OpenGraph (`og:image`) and Twitter card metadata for sharing previews on social media and messaging platforms.
