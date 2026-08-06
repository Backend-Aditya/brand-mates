export interface WorkProject {
  slug: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  metaDescription: string;
  tags: string[];
  challenge: string;
  approach: string;
  outcome: string;
  metrics: { value: string; label: string }[];
  initials: string;
  bgClass?: string;
  bgStyle?: React.CSSProperties;
  accentClass: string;
}

import type React from "react";

export const workProjects: WorkProject[] = [
  {
    slug: "saltbush-co",
    client: "Saltbush Co",
    category: "Sustainable Fashion",
    year: "2024",
    tagline: "Full rebrand: web, social & ads",
    metaDescription: "How BrandMates rebranded Saltbush Co across web, social and Meta ads, lifting conversion 0.8% to 3.4% and ROAS to 4.1×.",
    tags: ["Web Design", "Social Media", "Paid Ads"],
    challenge:
      "Saltbush Co had a compelling sustainable story but a fragmented digital presence. Their DTC site was converting below 1%, social felt inconsistent across channels, and Meta ads were burning $40K/month at a ROAS of 1.2×. Stockists were asking why the online brand didn't match the in-store experience.",
    approach:
      "We started with a full brand audit and qualitative research across their Sydney and Melbourne customer base. A unified visual identity - earthy, confident, premium - rolled out across a rebuilt Shopify storefront, a new editorial social content calendar, and a Meta creative framework built around three proven formats. Every channel shared the same voice for the first time.",
    outcome:
      "Six months after launch: site conversion improved from 0.8% to 3.4%, Meta ROAS rose from 1.2× to 4.1×, and Instagram following grew from 8K to 34K organically. The rebrand became the foundation for a $2.3M Meta spend managed in year two.",
    metrics: [
      { value: "4.1×", label: "Meta ROAS" },
      { value: "3.4%", label: "Site Conversion" },
      { value: "34K", label: "Instagram Followers" },
      { value: "$2.3M", label: "Revenue Generated" },
    ],
    initials: "SB",
    bgClass: "from-brand-700 via-brand-500 to-brand-400",
    accentClass: "text-brand-300",
  },
  {
    slug: "koorang",
    client: "Koorang",
    category: "Outdoor Apparel",
    year: "2024",
    tagline: "Performance paid ads: $820K ROAS 4.2×",
    metaDescription: "How BrandMates built Koorang's Meta and Google ad framework, driving $820K in attributed revenue at a 4.2× ROAS in one quarter.",
    tags: ["Paid Ads", "Content Creation"],
    challenge:
      "Koorang had award-winning technical outdoor apparel and no paid media infrastructure to match. Their internal team was spending time producing creative rather than strategising, every campaign started from scratch, and there was no data architecture to build on.",
    approach:
      "We built a full Meta and Google campaign framework - structured creative library, audience segmentation by terrain and activity type, and a 12-month testing calendar aligned with the Australian outdoor season. The handover included a documented playbook their team could run independently.",
    outcome:
      "$820K in attributed revenue in a single quarter. ROAS of 4.2× across combined channels. Creative testing surfaced three hero ad formats that are still running year-round. The client's internal team took full ownership within 90 days of handover.",
    metrics: [
      { value: "$820K", label: "Attributed Revenue" },
      { value: "4.2×", label: "ROAS" },
      { value: "3", label: "Hero Ad Formats" },
      { value: "90 days", label: "To Full Handover" },
    ],
    initials: "KR",
    bgClass: "from-zinc-900 via-brand-700 to-zinc-800",
    accentClass: "text-brand-300",
  },
  {
    slug: "harbour-co",
    client: "Harbour Co",
    category: "Restaurant Group",
    year: "2023",
    tagline: "Social presence that fills tables",
    metaDescription: "How BrandMates built a five-venue social strategy for Harbour Co, lifting reservation enquiries 240% in six months.",
    tags: ["Social Media", "Content Creation"],
    challenge:
      "A five-venue Sydney restaurant group with no unified social strategy. Each venue had its own account managed ad hoc by floor staff, posting inconsistently, getting low engagement, and running zero paid amplification. Competitor venues with inferior food were outperforming them online.",
    approach:
      "We consolidated strategy under one framework while preserving each venue's distinct character - Harbour Co as the group umbrella, each restaurant with its own content pillars. Monthly on-location content shoots, a UGC programme with staff and regulars, and geo-targeted Meta ads turned the social accounts into a live reservations engine.",
    outcome:
      "Average 12% week-on-week follower growth across all five venues over six months. Reservation enquiries from social up 240%. Two venues reached waiting-list status within four months. The campaign was shortlisted in the 2024 Mumbrella Marketing Awards.",
    metrics: [
      { value: "240%", label: "Reservation Enquiries" },
      { value: "12%", label: "Avg Weekly Growth" },
      { value: "5", label: "Venues Managed" },
      { value: "4 months", label: "To Waiting List" },
    ],
    initials: "HC",
    bgClass: "from-brand-50 via-brand-100 to-brand-200",
    accentClass: "text-brand-600",
  },
  {
    slug: "tallow-co",
    client: "Tallow & Co",
    category: "Artisan Candles",
    year: "2023",
    tagline: "E-commerce site + content suite",
    metaDescription: "How BrandMates redesigned Tallow & Co's Shopify store and shot a content suite that grew online revenue 380% in one quarter.",
    tags: ["Web Design", "Content Creation"],
    challenge:
      "Tallow & Co were selling primarily through Sydney weekend markets and a basic Shopify template that had never been designed. Great product and a loyal repeat customer base, but no brand photography, no digital story, and no infrastructure to scale DTC.",
    approach:
      "A full Shopify redesign anchored in warmth, craft, and the texture of the candle-making process. We paired the build with a two-day Sydney content shoot - product flat lays, lifestyle scenes, and behind-the-scenes studio footage - that gave every channel six months of ready-to-publish assets without another reshoot.",
    outcome:
      "Online revenue grew 380% in the first quarter post-launch. Average order value increased from $42 to $89 with better bundling and product story. The content library lasted eight months. Tallow & Co moved from markets-first to DTC-first within a year.",
    metrics: [
      { value: "380%", label: "Revenue Growth" },
      { value: "$89", label: "Avg Order Value" },
      { value: "8 months", label: "Content Longevity" },
      { value: "2 days", label: "Content Shoot" },
    ],
    initials: "TC",
    bgStyle: { background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%)" },
    accentClass: "text-brand-300",
  },
  {
    slug: "bushline",
    client: "Bushline",
    category: "Outdoor Retail",
    year: "2022",
    tagline: "National paid media scale-up",
    metaDescription: "How BrandMates scaled Bushline's paid media nationally, growing digital revenue from $380K to $2.1M in 12 months.",
    tags: ["Paid Ads", "Social Media"],
    challenge:
      "Bushline had 12 stores across Australia but negligible digital revenue - less than $380K annually online. They'd never invested in performance media and were losing market share to two well-capitalised e-commerce competitors with national digital budgets.",
    approach:
      "A 90-day launch sprint: Google Shopping campaigns structured by category and margin, Meta prospecting and retargeting funnels, and a social content calendar timed around the Australian outdoor calendar - summer camping season, winter ski runs, and the shoulder-season adventure travel surge.",
    outcome:
      "Digital revenue grew from $380K to $2.1M in 12 months. Google Shopping alone accounted for $900K. Social following grew from 4.2K to 28K. Bushline's digital channel is now their second highest-revenue store nationally.",
    metrics: [
      { value: "$2.1M", label: "Digital Revenue" },
      { value: "5.5×", label: "Revenue Growth" },
      { value: "28K", label: "Social Following" },
      { value: "90 days", label: "Launch Sprint" },
    ],
    initials: "BL",
    bgClass: "from-orange-950 via-amber-900 to-orange-950",
    accentClass: "text-amber-300",
  },
  {
    slug: "aura",
    client: "Aura",
    category: "Sydney Fintech · ASX",
    year: "2024",
    tagline: "Full identity system for an Aussie digital bank",
    metaDescription: "How BrandMates built Aura's brand identity ahead of ASX listing, lifting NPS 18 points and signups 340% in one quarter.",
    tags: ["Strategy", "Identity", "Product"],
    challenge:
      "A digital bank preparing for ASX listing needed an identity that could reassure nervous first-time investors and pass APRA compliance review - while feeling modern enough to attract under-35s in a market dominated by the Big Four. The rebrand had to work across five capital cities from day one.",
    approach:
      "Eighteen months of deep brand strategy, including competitive positioning across five Australian banks and a full customer research programme with 400 participants. A 60-page brand guidelines document, a complete product design system covering every screen and APRA-required touchpoint, and a launch film handled by our motion team.",
    outcome:
      "Brand launched ahead of ASX listing with no delays. Consumer NPS improved +18 points versus pre-rebrand benchmarks. A$58M Series B closed within 90 days of the rebrand launch. Aussie new account signups grew 340% in the first quarter.",
    metrics: [
      { value: "+340%", label: "Aussie Signups" },
      { value: "+18pts", label: "NPS Improvement" },
      { value: "A$58M", label: "Series B Raised" },
      { value: "90 days", label: "Time to Series B" },
    ],
    initials: "AU",
    bgClass: "from-brand-700 via-brand-500 to-brand-400",
    accentClass: "text-brand-300",
  },
  {
    slug: "meridian",
    client: "Meridian",
    category: "Hospitality · Byron Bay & Hobart",
    year: "2024",
    tagline: "Launch identity for a boutique hotel group",
    metaDescription: "How BrandMates launched Meridian's twin hotels in Byron Bay and Hobart with one flexible identity system and 68% direct bookings.",
    tags: ["Branding", "Print", "Web"],
    challenge:
      "Meridian was launching two boutique hotels simultaneously - one in Byron Bay, one in Hobart - markets with fundamentally different aesthetics and guest profiles. A single brand identity needed to feel native to both locations without feeling generic to either.",
    approach:
      "A flexible identity system built on timeless serif typography and a shared structural language, with two venue-specific colour palettes that reflect each location's character. Print collateral designed to Australian luxury standards. A single website that lets each property breathe independently.",
    outcome:
      "Both hotels opened to full occupancy in their launch month. Meridian was featured in Broadsheet and Australian Traveller within the first four weeks. Direct bookings held at 68%, above the 50% industry benchmark, reducing OTA commission spend.",
    metrics: [
      { value: "100%", label: "Opening Occupancy" },
      { value: "68%", label: "Direct Bookings" },
      { value: "2", label: "Venues Launched" },
      { value: "4 weeks", label: "To Media Coverage" },
    ],
    initials: "ME",
    bgClass: "from-zinc-900 via-brand-700 to-zinc-800",
    accentClass: "text-amber-200",
  },
  {
    slug: "forge",
    client: "Forge",
    category: "Melbourne Dev Tools",
    year: "2023",
    tagline: "From Blackbird Series A to category leader",
    metaDescription: "How BrandMates repositioned Forge's dev tools brand, lifting trial signup conversion from 0.4% to 2.1% in six months.",
    tags: ["Positioning", "Web", "Motion"],
    challenge:
      "A Melbourne-based developer tools company (Blackbird-backed, Series A) had exceptional product but no clear category position. Engineers loved it; the sales team couldn't explain it in under a minute. The marketing site was a technical spec sheet that converted at 0.4%.",
    approach:
      "Three weeks of positioning workshops with founders, early customers, and churned trials identified a 'category of one' narrative built around developer trust. We rebuilt the marketing site, created an explainer motion piece, and designed a docs system that converted as well as it informed.",
    outcome:
      "Site conversion to free trial signup grew from 0.4% to 2.1%. US enterprise pipeline grew 3× in the first six months. Site traffic grew 5× organically. The founder was invited to keynote a major US developer conference within a year.",
    metrics: [
      { value: "2.1%", label: "Signup Conversion" },
      { value: "3×", label: "US Pipeline Growth" },
      { value: "5×", label: "Organic Traffic" },
      { value: "6 months", label: "Time to Results" },
    ],
    initials: "FG",
    bgClass: "from-brand-ink via-brand-700 to-brand-ink",
    accentClass: "text-brand-400",
  },
  {
    slug: "clarity",
    client: "Clarity",
    category: "Medicare Telehealth",
    year: "2023",
    tagline: "Rebrand for a bulk-billed telehealth platform",
    metaDescription: "How BrandMates rebranded Clarity's Medicare telehealth platform, lifting GP referrals 180% and patient trust 28 points.",
    tags: ["Strategy", "Identity", "Campaign"],
    challenge:
      "A Medicare-integrated telehealth platform serving patients from Cairns to Perth needed a brand that felt trustworthy enough for anxious patients, efficient enough to win GP referrals, and clear enough to work across every waiting room pamphlet, follow-up SMS, and outdoor health campaign.",
    approach:
      "Deep qualitative research with patients and GPs across Queensland, NSW, and WA shaped a gentle-yet-clinical visual language. The identity was stress-tested at the smallest scale (SMS confirmation, 48px app icon) and the largest (10×5m clinic signage). A national launch campaign ran across outdoor and digital simultaneously.",
    outcome:
      "Post-consult patient trust scores grew +28 points. GP referral rate increased 180% in six months. Clarity was named a finalist at the 2023 Australian Health Technology Awards. The GP app achieved a 4.7-star rating on the App Store within three months of redesign.",
    metrics: [
      { value: "+28pts", label: "Patient Trust Score" },
      { value: "+180%", label: "GP Referral Rate" },
      { value: "4.7★", label: "App Store Rating" },
      { value: "6 months", label: "Time to Results" },
    ],
    initials: "CL",
    bgClass: "from-brand-50 via-brand-100 to-brand-200",
    accentClass: "text-brand-600",
  },
];

export function getWorkProject(slug: string): WorkProject | undefined {
  return workProjects.find((p) => p.slug === slug);
}
