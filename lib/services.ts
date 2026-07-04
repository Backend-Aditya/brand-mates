export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServiceProcessStep {
  title: string;
  desc: string;
}

export interface Service {
  slug: string;
  eyebrow: string;
  headingLines: [string, string];
  metaTitle: string;
  metaDescription: string;
  intro: string;
  body: string[];
  includes: string[];
  process: ServiceProcessStep[];
  faqs: ServiceFaq[];
  result: string;
  relatedWorkSlug: string;
  ctaLabel: string;
  navLabel: string;
}

export const services: Service[] = [
  {
    slug: "web-design-development",
    eyebrow: "Web Design & Development",
    navLabel: "Web Design & Development",
    headingLines: ["Sites that convert,", "not just impress."],
    metaTitle: "Web Design & Development Sydney - BrandMates",
    metaDescription:
      "Sydney web design and development for founders and CMOs: Next.js, React, Webflow or Framer, built to load fast, convert, and hand over clean.",
    intro:
      "From Figma concept to live code, we design and build websites that load fast, convert well, and your team can actually maintain without calling us every month. Australian hosting options are available if your lawyers care about data residency.",
    body: [
      "Most agency websites are built to win the pitch, not the search result. We build the other way round: a fast, structured, semantically correct site is the foundation, and the visual design sits on top of it, not instead of it. That means a Core Web Vitals score your dev team won't be embarrassed by, an information architecture built around how an Australian buyer actually searches, and on-page SEO (headings, schema, internal linking, image alt text) treated as part of the design brief, not an afterthought handed to a freelancer six weeks later.",
      "We build in Next.js and React for teams who want full control and a codebase they can hire against, or Webflow and Framer for teams who want their marketing team editing pages without a developer on retainer. Either way, you get the source files, not a black box. If you're a Series A to C startup rebuilding your site around a raise, or an established Australian retailer replatforming off a legacy CMS, the discovery process is the same: audit what's broken, agree what the site needs to do commercially, then design and build against that brief.",
      "Web design and web development are usually sold as separate line items by separate teams who don't talk to each other. We run both under one roof, with the same senior people from wireframe to production deploy, so nothing gets lost in a handover between a design agency and a dev shop.",
    ],
    includes: [
      "Custom Figma design, desktop, tablet & mobile",
      "Next.js / React, Webflow, or Framer, you choose",
      "On-page SEO foundation baked in from day one",
      "Core Web Vitals optimised, 90+ Lighthouse score",
      "CMS setup & training (no ongoing dev dependency)",
      "30-day post-launch support included",
    ],
    process: [
      { title: "Audit & brief", desc: "We review your current site's analytics, Search Console data, and conversion paths to find out what's actually broken before we design anything." },
      { title: "Wireframe & design", desc: "Low-fidelity structure first, agreed with you, then full Figma design across breakpoints once the information architecture is signed off." },
      { title: "Build & QA", desc: "Component-by-component build with real content (not lorem ipsum), tested against Core Web Vitals and cross-browser before it goes near a client review." },
      { title: "Launch & handover", desc: "DNS cutover, redirects mapped so you keep your search rankings, and a recorded CMS walkthrough so your team can publish without us." },
    ],
    faqs: [
      { q: "How long does a website project take?", a: "A marketing site typically runs 4 to 6 weeks from signed brief to launch. A larger site with a custom CMS, e-commerce, or a content migration usually runs 8 to 12 weeks. We give you a real date in the proposal, not a range." },
      { q: "Do you build in Next.js, Webflow, or WordPress?", a: "We build in whichever platform fits how your team actually operates. Next.js or React if you have (or plan to hire) an in-house dev team and want full control. Webflow or Framer if your marketing team needs to publish pages without a developer. We don't build in WordPress; happy to say why on a call if that's your default." },
      { q: "Will you improve our SEO, not just our design?", a: "Yes. On-page SEO, structured data, redirect mapping, and Core Web Vitals are part of every build, not an add-on. If your current site is losing organic traffic, we'll tell you why in the audit before we design a single screen." },
      { q: "What happens after launch?", a: "You get 30 days of post-launch support included, plus a recorded walkthrough of your CMS so your team isn't calling us to change a headline. Ongoing work after that is scoped separately, only if you want it." },
    ],
    result: "Tallow & Co saw a 340% increase in organic sessions in 6 months after launch.",
    relatedWorkSlug: "tallow-co",
    ctaLabel: "Start a web project",
  },
  {
    slug: "social-media",
    eyebrow: "Social Media",
    navLabel: "Social Media",
    headingLines: ["Feeds that build", "community, not noise."],
    metaTitle: "Social Media Management Australia - BrandMates",
    metaDescription:
      "Australian social media management for founders and CMOs: Instagram, TikTok, LinkedIn and Facebook run by senior local creatives, not offshore juniors.",
    intro:
      "We manage your social presence end-to-end: strategy, content, scheduling, and community. No juniors, no offshore teams. Your account is handled by experienced Australian creatives who understand local culture, slang, and the moments that matter to your audience.",
    body: [
      "Most social media management in Australia is run by an offshore team on a template calendar, posting the same generic content format across every client account regardless of category. It shows: engagement flatlines, comments go unanswered for days, and the brand voice reads like nobody in particular wrote it. We do the opposite: one senior Australian creative owns your account, understands what your specific audience responds to, and adjusts the plan monthly based on what's actually working, not what was planned three months ago.",
      "Instagram, TikTok, LinkedIn, and Facebook each reward different content and different posting cadence, and what works for a hospitality brand doesn't work for a B2B SaaS company. We build a platform-specific plan rather than repurposing one asset four ways, and we track the metrics that matter for your goal (saves and shares for awareness, link clicks and DMs for commercial intent), not just follower count.",
      "Community management is part of the service, not an upsell. Comments and DMs get answered same-day, in your brand voice, by someone who knows your product, not a script.",
    ],
    includes: [
      "Profile audit & strategy document",
      "Monthly content calendar (30+ posts)",
      "Instagram, TikTok, LinkedIn & Facebook",
      "Community management & DM responses",
      "AEST-timezone scheduling & posting",
      "Monthly analytics & insight report",
    ],
    process: [
      { title: "Profile audit", desc: "We review your last 12 months of posts and analytics to see what's actually driving saves, shares, and DMs versus what's just filling the calendar." },
      { title: "Strategy & content pillars", desc: "We agree 3 to 5 content pillars specific to your brand and audience, not a generic template reused across every client." },
      { title: "Monthly production", desc: "A full month's content calendar produced and scheduled in advance, reviewed and approved by you before anything goes live." },
      { title: "Report & adjust", desc: "A plain-English monthly report on what worked, and the plan adjusts accordingly. No format runs unchanged for six months out of habit." },
    ],
    faqs: [
      { q: "Do you outsource content creation or community management?", a: "No. One senior Australian creative is assigned to your account for strategy, content, and community management. We don't run an offshore content farm, and we tell you upfront if that's what you're comparing us against." },
      { q: "Which platforms do you manage?", a: "Instagram, TikTok, LinkedIn, and Facebook, tailored per platform rather than one asset posted four times. If a platform isn't right for your audience, we'll tell you not to bother with it." },
      { q: "How is content approved before it goes live?", a: "You get a monthly calendar to review and approve before anything is scheduled. Nothing goes live without sign-off, and urgent reactive posts (a trending moment, a customer callout) are flagged to you same-day." },
      { q: "What does a typical result look like?", a: "It depends on the starting point and category, but Harbour Co grew from 4,000 to 31,000 Instagram followers in 9 months with zero paid follower spend, purely from content and community work." },
    ],
    result: "Harbour Co grew from 4K to 31K Instagram followers in 9 months with zero paid follower spend.",
    relatedWorkSlug: "harbour-co",
    ctaLabel: "Grow my social",
  },
  {
    slug: "paid-ads",
    eyebrow: "Paid Ads",
    navLabel: "Paid Ads",
    headingLines: ["Ad spend that", "actually pays back."],
    metaTitle: "Paid Ads Agency Australia (Meta, Google, TikTok) - BrandMates",
    metaDescription:
      "Performance marketing for Australian brands across Meta, Google and TikTok Ads, with fortnightly reporting tied to revenue, not reach.",
    intro:
      "We run performance campaigns on Meta, Google, and TikTok. Every dollar is tracked, every creative is tested, and every fortnightly report tells you exactly what's driving revenue, and what to cut. Attributed to actual purchases, not reach numbers.",
    body: [
      "Paid media in Australia is a smaller, more expensive auction than the US case studies most agencies quote from. CPMs behave differently across Sydney, Melbourne, and regional Australia, and a media plan built on US benchmarks routinely overspends here. We plan and buy against the Australian market specifically, with pixel and conversion tracking set up correctly before a single dollar is spent, so attribution is based on actual purchases and leads, not last-click vanity metrics.",
      "We run structured creative testing, typically three formats a month (static, short-form video, carousel) tested against each other rather than one creative run unchanged until performance decays. Every campaign gets a fortnightly report written in plain English: what worked, what didn't, and what changes next, not a screenshot of a dashboard with no interpretation attached.",
      "This covers Meta Ads (Facebook and Instagram), Google Ads (Search, Shopping, and Display), and TikTok Ads for brands whose audience skews younger. We manage the full account, not just creative or just media buying, so there's one team accountable for the number at the end of the month.",
    ],
    includes: [
      "Meta Ads (Facebook & Instagram) management",
      "Google Ads, Search, Shopping & Display",
      "TikTok Ads for Aussie audiences",
      "Creative testing & iteration (A/B at scale)",
      "Pixel setup, conversion tracking & attribution",
      "Fortnightly reporting with plain-English insights",
    ],
    process: [
      { title: "Account & tracking audit", desc: "We check pixel setup, conversion tracking, and attribution before touching budget. Most accounts we inherit are misreporting results before we start." },
      { title: "Campaign structure", desc: "Prospecting, retargeting, and retention campaigns built as separate structures with separate budgets, not one campaign trying to do all three jobs." },
      { title: "Creative testing", desc: "Three formats tested per month against a fixed budget and minimum run time, so we're comparing real performance, not gut feel." },
      { title: "Fortnightly reporting", desc: "A plain-English report every two weeks: what's working, what's being cut, and what changes next. No dashboard screenshots without interpretation." },
    ],
    faqs: [
      { q: "Which platforms do you run ads on?", a: "Meta (Facebook and Instagram), Google (Search, Shopping, and Display), and TikTok. We recommend platforms based on where your audience actually is, not run all three by default to pad the invoice." },
      { q: "How do you measure results?", a: "Attribution is tied to actual purchases and qualified leads via correctly configured pixel and conversion tracking, not reach or impressions. If your existing tracking is broken, we'll flag it and fix it before spending budget." },
      { q: "What's the minimum ad spend you'll manage?", a: "We typically work with brands spending $10K or more per month across paid channels. Below that, media management fees eat too much of the budget to make sense, and we'll say so." },
      { q: "How often do you report on performance?", a: "Fortnightly, in plain English: what's working, what's being cut, and what changes next. You're not waiting a month to find out a campaign underperformed." },
    ],
    result: "Koorang achieved 4.2× ROAS on $820K media spend across Meta & Google in 12 months.",
    relatedWorkSlug: "koorang",
    ctaLabel: "Audit my ad account",
  },
  {
    slug: "content-creation",
    eyebrow: "Content Creation",
    navLabel: "Content Creation",
    headingLines: ["Content made for", "your specific audience."],
    metaTitle: "Content Creation Australia (Photo, Video, Copy) - BrandMates",
    metaDescription:
      "Brand photography, short-form video, and copywriting shot on location across Australia and delivered ready to publish, no stock photos, no AI filler.",
    intro:
      "Photo, video, and copy shot on location across Australia, edited in-house, and delivered ready to publish. No stock photos, no AI-generated filler, everything is specific to your brand, your product, and your audience.",
    body: [
      "Stock photography and generic AI-generated imagery are easy to spot, and Australian customers notice when a brand's visuals don't match its actual product, store, or people. We shoot on location, either at your premises or on a dedicated shoot day we plan around your product and calendar, so every asset is genuinely yours: your staff, your space, your product, not a stand-in.",
      "A single shoot day typically produces a deliverable bundle covering several months of content: brand and product photography, short-form video cut for Reels, TikTok, and YouTube Shorts, and copy written for the specific channel it's going on (a product page reads differently to an Instagram caption, and we write it that way rather than repurposing one block of text everywhere).",
      "Usage rights are included in every deliverable bundle, so you're not paying licensing fees per placement later. Retainers are available monthly or quarterly for brands that need a consistent content pipeline rather than a one-off shoot.",
    ],
    includes: [
      "Brand & product photography",
      "Short-form video (Reels, TikTok, YouTube Shorts)",
      "Copywriting, web, ads, email, socials",
      "On-location shoots across Sydney & Melbourne",
      "Deliverable bundles, monthly or quarterly retainers",
      "Usage rights included, no licensing headaches",
    ],
    process: [
      { title: "Shoot brief", desc: "We plan the shot list against your actual channel needs (web, social, ads) so nothing gets shot that has nowhere to go." },
      { title: "On-location production", desc: "Photography and video shot at your premises or a location relevant to your product, with your team and product, not stock talent." },
      { title: "Edit & copywriting", desc: "In-house editing and channel-specific copy, written for where each asset will actually run rather than one generic block of text." },
      { title: "Delivery & rights", desc: "A ready-to-publish bundle delivered with usage rights included, sized and cropped for every platform it's going on." },
    ],
    faqs: [
      { q: "Do you use stock photography or AI-generated images?", a: "No. Every image and video is shot on location, either at your premises or a relevant location, using your actual product, people, and space. If we can't get real assets, we'll tell you rather than substitute stock." },
      { q: "How much content comes from one shoot day?", a: "A typical shoot day produces enough photography, short-form video, and supporting copy to run 2 to 3 months of content across web, social, and ads, depending on the brief." },
      { q: "Do we own the content afterward?", a: "Yes, usage rights are included in every deliverable bundle. There are no separate licensing fees for using the assets across your own channels." },
      { q: "Can you write copy as well as shoot content?", a: "Yes. Copywriting for web, ads, email, and social is part of the service, written specifically for each channel rather than one piece of text repurposed everywhere." },
    ],
    result: "Saltbush's content suite generated 2.8M organic impressions in its first quarter across platforms.",
    relatedWorkSlug: "saltbush-co",
    ctaLabel: "Book a content shoot",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
