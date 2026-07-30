import type { MetadataRoute } from "next";

const BASE = "https://www.brandmates.au";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio/"],
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
