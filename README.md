# Groxdigital — Website

The marketing website for **Groxdigital**, a digital growth, AI and automation agency. Built with Next.js (App Router), React, TypeScript and Tailwind CSS. Every page is statically generated; the only server code is the contact/lead API.

## Getting started

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL (and optionally CONTACT_WEBHOOK_URL)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint && npm run typecheck
```

## Before launch: replace placeholders

Anything in `[SQUARE BRACKETS]` is a placeholder. On the site it shows up highlighted in amber so it's easy to spot.

| What | Where |
| --- | --- |
| Email, phone, WhatsApp number, hours, address, social links, legal entity, registration and tax numbers | `src/lib/site.ts` |
| Monthly budget ranges in the contact form | `src/lib/leads.ts` (`budgetOptions`) |
| Founder story / team background | `src/app/about/page.tsx` |
| Case studies (currently **demo** entries, marked as such and set to `noindex`) | `src/content/case-studies.ts` |
| Testimonials (empty; the section stays hidden until real ones are added) | `src/content/testimonials.ts` |
| Legal page placeholders (have them reviewed by a lawyer) | `src/app/{privacy-policy,terms,disclaimer,cookie-policy,refund-policy,data-processing}` |

Behaviour that depends on configuration:

- **WhatsApp buttons** link to `/contact` until a real number is set in `site.contact.whatsapp`.
- **Social icons** only appear for profiles that have a real URL.
- **LocalBusiness schema** is only emitted once a real street address is set.
- **Leads** from the contact form and the assistant are `POST`ed to `/api/contact`. Set `CONTACT_WEBHOOK_URL` to forward them as JSON to n8n, Make, Zapier or a CRM. If it isn't set, leads are only written to the server log.

## Project structure

```
src/
  app/                    Routes (one folder per page; /[service] renders all service pages)
  components/
    layout/               Header (mega menu + mobile nav), Footer, Logo, scroll-reveal observer
    sections/             Reusable sections: ServiceCard, Pillars, ProcessSteps, FlowDiagram, Faq, CtaSection, …
    templates/            ServicePageView (shared service-page layout), LegalPage
    chat/                 Growth Assistant (rule-based, lazy-loaded)
    forms/                ContactForm
    ui/                   PageHero, SectionHeader, Breadcrumbs, JsonLd, placeholders
  content/                All copy and data: services, industries, FAQs, blog, case studies
  lib/                    Site config, SEO/schema helpers, navigation, lead validation
```

### Adding or editing a service page

Service pages are data-driven. Edit the entries in `src/content/services/*.ts`. Each page has its own hero, problem, solution, services, benefits, how-it-works flow, use cases, FAQ, related services and metadata. To add a new one, create a `ServicePage` object, add it to `servicePages` in `src/content/services/index.ts`, and add it to a pillar and to the menus in `src/lib/navigation.ts`. The route, sitemap entry and schema are generated automatically.

### Blog posts

Add a post object to `src/content/blog.ts`. It's rendered at `/blog/<slug>` and added to the sitemap.

### The Growth Assistant

`src/components/chat/` is a keyword-based assistant. It does not use a language model. It recommends services, answers basic questions and collects lead details. Its intents live in `assistant-knowledge.ts`. The UI is separate from the matching logic, so an AI backend can be added later.

## SEO

- Unique title, description, canonical and Open Graph tags on every page (`src/lib/seo.ts`)
- Schema: Organization, WebSite, Service, FAQPage, BreadcrumbList, Article, plus LocalBusiness once an address is set
- `sitemap.xml`, `robots.txt` and a generated Open Graph image
- Semantic HTML with one `h1` per page
