import type { MetadataRoute } from "next";

const BASE = "https://brandmates.com.au";

const workSlugs = [
  "saltbush-co", "koorang", "harbour-co", "tallow-co", "bushline",
  "aura", "meridian", "forge", "clarity",
];

const journalSlugs = [
  "website-leaking-leads-2025",
  "instagram-reels-vs-tiktok-australia-2025",
  "50-on-location-content-shoots",
  "eofy-marketing-leftover-budget",
  "meta-creative-framework-australian-dtc",
  "brandmates-onboarding-process",
  "2-3m-meta-ads-saltbush",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: `${BASE}/work`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 },
    { url: `${BASE}/studio`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${BASE}/journal`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.9 },
  ];

  const work = workSlugs.map((slug) => ({
    url: `${BASE}/work/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const journal = journalSlugs.map((slug) => ({
    url: `${BASE}/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...static_pages, ...work, ...journal];
}
