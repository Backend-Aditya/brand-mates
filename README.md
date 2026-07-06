# BrandMates — Australia's Brand Studio

> **We build belief.**
> The studio ambitious Australian founders and CMOs trust to build brands that earn loyalty and drive real growth.

---

## The Company

**BrandMates** is a Sydney-founded brand studio (est. 2017) built on a single conviction: smaller, senior teams do better work. We partner with Blackbird-backed Series A–C companies, pre-ASX-IPO rebrands, and the occasional seed-stage brand that genuinely excites us.

Six senior creatives. Six Australian cities. Zero offshore hand-offs. Every project runs AEST/AEDT — no time-zone lag, no junior account managers passing briefs down a chain.

### What We Do

| Discipline | What it means in practice |
|---|---|
| **Web Design & Development** | Fast, considered sites built in Next.js, Webflow, or Framer — 90+ Lighthouse scores, CMS training included |
| **Social Media** | End-to-end management across Instagram, TikTok, LinkedIn & Facebook — strategy through scheduling |
| **Paid Ads** | Meta, Google & TikTok campaigns where every dollar is tracked and every creative is A/B tested |
| **Content Creation** | Photo, video & copy shot on location across Australia — no stock, no AI filler |

### By the numbers

- **150+** Australian brands transformed since 2017
- **8+** years across ANZ
- **98%** client retention rate
- **40+** AGDA & AWARD wins
- **A$3.2B** combined client valuations

### The Mates

| Name | Role | City |
|---|---|---|
| Noa Akerman | Founder & Strategy Lead | Sydney |
| Jamie Russo | Creative Director | Melbourne |
| Sam Kowalczyk | Head of Engineering | Sydney |
| Maya Linh | Head of Paid Media | Sydney |
| Theo O'Brien | Content Director | Melbourne |
| Clara Park | Social Media Lead | Sydney |

---

## The Website

This repository is the BrandMates marketing site — a high-fidelity, animated Next.js application that demonstrates our craft as much as it describes our services.

### Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16** (App Router) | Static generation, streaming, file-system routing |
| Language | **TypeScript 5** | End-to-end type safety |
| Styling | **Tailwind CSS v4** | Utility-first, lightning-fast JIT, v4 canonical classes |
| Animation | **GSAP 3** + SplitText + ScrollTrigger | Production-grade motion, no layout jank |
| Scroll | **Lenis** | Smooth, physics-based scroll momentum |
| Font | **Onest** (Google Fonts) | Variable weight, high legibility at display sizes |
| Runtime | **React 19** | Concurrent rendering, `use` hook, server components |

### Pages & Routes

```
/                   — Home (hero, services, work, testimonials, process, team, FAQ, contact)
/work               — Full project archive with GSAP scroll reveals
/work/[slug]        — Individual case study pages (statically generated)
/services           — Service deep-dives with deliverable breakdowns
/studio             — Team profiles, values, open roles
/journal            — Editorial index with featured article
/journal/[slug]     — Article detail pages (statically generated)
/contact            — Enquiry form + booking sidebar
```

### Project Structure

```
brand-mates/
├── app/
│   ├── layout.tsx              # Root layout — font, metadata, Nav, SmoothScroll
│   ├── page.tsx                # Home page (server component)
│   ├── sitemap.ts              # Auto-generated XML sitemap
│   ├── globals.css             # Tailwind v4 config + custom animations
│   ├── work/
│   │   ├── page.tsx            # Work index
│   │   └── [slug]/page.tsx     # Case study detail (generateStaticParams)
│   ├── journal/
│   │   ├── page.tsx            # Journal index
│   │   └── [slug]/page.tsx     # Article detail (generateStaticParams)
│   ├── services/page.tsx
│   ├── studio/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Nav.tsx                 # Animated fullscreen nav (GSAP + SplitText)
│   ├── Footer.tsx              # Footer with newsletter form
│   ├── SmoothScroll.tsx        # Lenis scroll wrapper
│   ├── HomeClient.tsx          # Full home page animations + interactions
│   ├── WorkClient.tsx          # Work archive with scroll-triggered reveals
│   ├── ServicesClient.tsx      # Service sections with GSAP entrance
│   ├── StudioClient.tsx        # Team cards + careers
│   ├── JournalClient.tsx       # Article grid + featured post
│   └── ContactClient.tsx       # Form + booking sidebar
├── lib/
│   ├── work.ts                 # Case study data + getWorkProject()
│   └── journal.ts              # Article data + getJournalArticle()
└── public/
    ├── logo.png
    ├── hero.jpg
    └── robots.txt
```

### Animation Philosophy

Every transition earns its existence. We use GSAP for three categories of motion:

1. **Entrance animations** — `fromTo` with `power4.out` / `expo.out` easing, staggered per section
2. **Scroll-triggered reveals** — `ScrollTrigger.batch()` for grid items, individual triggers for hero sections
3. **Navigation** — fullscreen overlay with `scaleY` cover layers + `SplitText` line masks on links

All GSAP imports are dynamic (`await import("gsap")`) to keep the initial JS bundle lean.

### Design Tokens (Tailwind v4)

The brand palette lives in `globals.css` as CSS custom properties:

```css
--color-brand-ink   /* #0c1a14  — near-black green base */
--color-brand-300   /* #57cea5  — light mint */
--color-brand-400   /* #21ba80  — primary green */
--color-brand-500   /* #1a9e6d  — mid green */
--color-brand-600   /* #155c3f  — deep green */
--color-brand-700   /* #0f3d2a  — darkest green */
```

Used throughout as `bg-brand-400`, `text-brand-300`, `border-brand-400/30`, etc.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server (Turbopack)
npm run dev

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).

### Environment

No environment variables required for local development. The site is fully static — no external API calls at runtime.

---

## Offices

**Sydney HQ**
Level 3, 56 Foveaux St, Surry Hills NSW 2010
+61 2 8234 5678

**Melbourne Studio**
Suite 12, 112 Brunswick St, Fitzroy VIC 3065
+61 3 9432 1234

studio@brandmates.au — Mon–Fri · 9am–6pm AEST/AEDT

---

## Acknowledgment of Country

BrandMates acknowledges the Gadigal people of the Eora Nation and the Wurundjeri people of the Kulin Nation — the Traditional Custodians of the lands on which our studios sit. We pay our respects to Elders past, present, and emerging.

---

*© 2017–2025 BrandMates Pty Ltd · ABN 88 612 334 901 · Proudly Australian*
