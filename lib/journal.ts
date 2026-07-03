export interface JournalArticle {
  slug: string;
  tag: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  gradient: string;
  initials: string;
  sections: { heading: string; body: string }[];
}

export const journalArticles: JournalArticle[] = [
  {
    slug: "2-3m-meta-ads-saltbush",
    tag: "Paid Ads",
    date: "14 Apr 2025",
    readTime: "8 min read",
    title: "How we ran $2.3M in Meta ads for Saltbush, and what actually worked",
    excerpt:
      "A frank look at our creative testing framework, our biggest mistakes, and the three campaign types that drove 80% of the revenue.",
    gradient: "from-brand-700 via-brand-600 to-brand-500",
    initials: "MA",
    sections: [
      {
        heading: "The brief",
        body: "When Saltbush Co came to us they were spending $40K/month on Meta with a 1.2× ROAS. Not catastrophically bad, but not a business anyone could scale. Their creative was beautiful - the problem was it was brand photography running as direct response. The two jobs needed to be separated.",
      },
      {
        heading: "How we structure Meta spend for DTC fashion",
        body: "We run three campaign types: a prospecting campaign targeting cold audiences by interest and lookalike, a retargeting campaign for engaged non-purchasers (14-day window), and a retention campaign for past customers. Each has different creative briefs, different success metrics, and different budget allocation rules. Cold audiences get the majority of budget because that's where the growth is - but retention pays for itself many times over on LTV.",
      },
      {
        heading: "The creative testing framework",
        body: "We test three variables per month: hook (first 3 seconds), format (static vs video vs carousel), and offer framing (price vs social proof vs urgency). We never test more than one variable at a time in a single ad set. Each test runs for a minimum of 7 days with a $50/day budget before we call it. The 'winning' creative from each month's test gets moved into the core campaign. We killed 63% of the formats we tested - that's not failure, that's data.",
      },
      {
        heading: "What we got wrong",
        body: "Our biggest early mistake was putting sustainability messaging in prospecting creative. It resonated with existing customers but performed poorly cold. Prospecting creative for Saltbush needed to lead with product and lifestyle - the brand story came in retargeting, once someone already knew the product. We also underweighted Advantage+ Shopping initially. Once we rebuilt the campaign structure around it, our prospecting ROAS improved 0.6× in six weeks.",
      },
      {
        heading: "The three formats that drove 80% of revenue",
        body: "Static images outperformed video in retargeting by a significant margin - probably because the audience already knew the product and just needed a clean reminder. In prospecting, short-form UGC (15–30 second) beat our polished brand video by 2×. And carousels, which we almost didn't include in the test matrix, drove the highest average order values when product diversity was shown. Those three formats now make up the core of every Saltbush campaign we run.",
      },
    ],
  },
  {
    slug: "website-leaking-leads-2025",
    tag: "Web Design",
    date: "7 Apr 2025",
    readTime: "5 min read",
    title: "Why your website is leaking leads in 2025, and the 5-minute fix",
    excerpt:
      "Most conversion problems come from one of three places. Here's how to find yours in under an afternoon.",
    gradient: "from-zinc-800 via-brand-700 to-zinc-900",
    initials: "WD",
    sections: [
      {
        heading: "The three places websites leak",
        body: "In our audits across 40+ Australian brand sites, conversion problems almost always originate in one of three places: the hero section (people aren't staying long enough to scroll), the product or service page (people aren't connecting value to price), or the contact or checkout flow (people are starting but not finishing). The fix for each is different. Running Google Analytics with scroll depth and session recording (Hotjar, Clarity, whatever) for 48 hours will tell you which bucket you're in.",
      },
      {
        heading: "If people aren't staying: the hero problem",
        body: "Your hero has one job - confirm the visitor is in the right place and give them a reason to scroll. Most hero sections fail because they lead with the company's self-description rather than the visitor's problem. 'Australia's leading brand studio' tells someone nothing useful. 'We build brands that make Australian founders' competitors nervous' is a reason to keep reading. Rewrite your hero headline as a one-sentence promise, not a category label.",
      },
      {
        heading: "If people aren't converting: the value gap",
        body: "When people land on a service or product page and leave without buying or enquiring, it usually means one of two things: they don't understand what they're getting, or they don't believe the price is worth it. Both are solved with specificity. Not 'comprehensive brand strategy' but 'four-week positioning workshop with your founder team, resulting in a positioning statement and 12-month messaging framework.' Not '$15,000' but '$15,000, which typically returns 6× in the first year for clients in your sector.' Specificity builds trust.",
      },
      {
        heading: "The 5-minute fix that always moves the needle",
        body: "If you want one immediate action: add a phone number or email address to your contact form page in plain text, alongside the form. Not buried in a footer - right next to the call to action. Every time we've added visible direct contact options to a page with only a form, conversion rate on that page improves. People who are serious about buying want to know there's a human they can reach. The form is for efficiency; the direct contact is for trust.",
      },
    ],
  },
  {
    slug: "instagram-reels-vs-tiktok-australia-2025",
    tag: "Social Media",
    date: "1 Apr 2025",
    readTime: "6 min read",
    title: "Instagram Reels vs TikTok in Australia: 2025 data breakdown",
    excerpt:
      "We analysed 18 months of data across 12 Australian brand accounts. Here's what the numbers actually say.",
    gradient: "from-violet-900 via-brand-700 to-slate-900",
    initials: "SM",
    sections: [
      {
        heading: "The sample",
        body: "Across 18 months we tracked performance across 12 Australian brand accounts - a mix of fashion, food & beverage, hospitality, and consumer tech - posting consistently on both Instagram Reels and TikTok. Account sizes ranged from 8K to 340K followers. All data is internal; we've anonymised clients but the patterns are consistent enough to publish.",
      },
      {
        heading: "Reach: TikTok wins, but it's complicated",
        body: "TikTok consistently drove higher organic reach on new content - in our sample, roughly 3.4× more unique views per post compared to equivalent Instagram Reels. But TikTok's reach is more volatile. A video that performed well one month gave no signal about the next. Instagram's algorithm was slower and smaller, but significantly more predictable. For brands that need consistent awareness, not viral spikes, Instagram was the more reliable channel.",
      },
      {
        heading: "Engagement: Instagram leads on intent",
        body: "TikTok drives comments and shares. Instagram drives saves, profile visits, and link taps. For Australian brands with a commercial goal - selling a product, driving bookings, building an email list - Instagram's engagement was more valuable because it reflected intent rather than entertainment. Our food and hospitality clients saw the starkest difference: a popular TikTok generated five times the comments but a fraction of the reservation enquiries.",
      },
      {
        heading: "The Australian audience difference",
        body: "One pattern we didn't expect: Australian audiences over 35 are on TikTok in larger numbers than most brand marketers assume - but they're passive viewers, not commenters or sharers. If your Australian customer is 35+, TikTok can still work for awareness, but you'll need to track it differently. Lean on view-through rate and site traffic from TikTok as your success metrics, not engagement rate.",
      },
      {
        heading: "Our recommendation for 2025",
        body: "Run both, but don't treat them the same. Use TikTok for native, low-production content that builds cultural familiarity - genuine product moments, behind the scenes, responses to comments. Use Instagram for higher-production brand content and for converting warm audiences. Repost strategically but don't just cross-post - content optimised for one platform performs poorly on the other because the aspect ratios, caption conventions, and pacing are different.",
      },
    ],
  },
  {
    slug: "50-on-location-content-shoots",
    tag: "Content",
    date: "25 Mar 2025",
    readTime: "7 min read",
    title: "What we learned from 50 on-location content shoots across Australia",
    excerpt:
      "From Bondi to Broome, the logistical, creative, and cultural lessons that changed how we approach every shoot.",
    gradient: "from-orange-950 via-amber-900 to-brand-700",
    initials: "CC",
    sections: [
      {
        heading: "Why location matters more than lighting",
        body: "The single biggest driver of content performance for our Australian clients is location authenticity. When a Bondi surf brand shot in a Sydney studio trying to look outdoorsy, the content underperformed. When we moved the same brief to an actual beach at 6am, using natural light and real water, the same product in the same campaign doubled its engagement rate. Australian audiences, particularly under 40, have a finely calibrated sensor for fake nature. If your brand is meant to live outdoors, it needs to be shot outdoors.",
      },
      {
        heading: "Logistics that actually work in Australia",
        body: "Australia's geography means a 'national' content shoot is a serious logistical undertaking. Sydney to Perth is a five-hour flight. We've learned to plan shoots in geographic clusters - Sydney-Melbourne in one trip, Queensland in another - and to build weather days into every coastal and rural schedule. The wet season in north Queensland is a real consideration for anyone shooting tourism or agricultural clients in Q1. We now have preferred suppliers in 8 cities who understand this.",
      },
      {
        heading: "The cultural nuances that agencies miss",
        body: "Australia has strong regional identities that global brand playbooks often flatten. A campaign that feels right in Sydney's inner east can feel performative in Brisbane or Adelaide. We've learned to brief talent locally - not just on look, but on the vernacular they use and the way they interact with product. The difference between Sydney-casual and Melbourne-cool is real and consumers notice. Authenticity is regional, not national.",
      },
      {
        heading: "The content-to-cost ratio lesson",
        body: "After 50 shoots, our clearest finding: the ratio of content pieces to shoot days has more impact on ROI than production budget. A $15K two-day shoot producing 60 usable assets outperforms a $50K half-day shoot producing 8. We've optimised our shoot briefs relentlessly - each location must produce assets for at least four channels (feed, story, paid, web), and talent must be briefed on multiple outfit and prop variations per setup. The brands getting the most value aren't necessarily spending the most.",
      },
    ],
  },
  {
    slug: "eofy-marketing-leftover-budget",
    tag: "Strategy",
    date: "18 Mar 2025",
    readTime: "5 min read",
    title: "EOFY marketing: how Australian brands should spend their leftover budget",
    excerpt:
      "The end of financial year is the most misunderstood opportunity in the AU marketing calendar. Here's how to use it.",
    gradient: "from-brand-600 via-brand-500 to-brand-400",
    initials: "EF",
    sections: [
      {
        heading: "Why EOFY is different to Christmas",
        body: "Christmas is a consumer holiday. EOFY is a business decision. The mindset of an Australian buyer at EOFY is fundamentally different - they're looking to justify spend before 30 June, which means price sensitivity is lower and the decision cycle is faster. B2B brands especially underweight EOFY. We've seen clients close deals in June that had been stalling since February simply because the prospect had budget to deploy.",
      },
      {
        heading: "The three best uses of end-of-financial-year budget",
        body: "First: invest in brand assets that have multi-year value - photography, video, a design system update. These are the things that get deprioritised during the year when direct response campaigns get the budget. EOFY is the right time to do them. Second: run a lead generation campaign. EOFY decision-makers are actively looking for solutions; the cost per lead in June is often lower than any other month because of that intent. Third: prepay for services you've already agreed to use. Many agencies and platforms allow prepayment against future work - this uses current-year budget and creates continuity.",
      },
      {
        heading: "What not to spend it on",
        body: "Discount-led sales campaigns in June are a trap for most non-retail Australian brands. They train your customer base to wait for EOFY sales and devalue your offer in the months before. If you have leftover budget in June, the answer is not to run a 20% off campaign - it's to invest in brand infrastructure and demand generation that builds the pipeline for FY26.",
      },
      {
        heading: "The timing window that most brands miss",
        body: "The decision window for EOFY spend is actually March to mid-May, not June. By the time you're in June, the procurement and finance approvals are done. If you're reading this in June hoping to take advantage of EOFY, you're a month late. Put a reminder in your calendar for February next year.",
      },
    ],
  },
  {
    slug: "meta-creative-framework-australian-dtc",
    tag: "Paid Ads",
    date: "10 Mar 2025",
    readTime: "6 min read",
    title: "The Meta creative framework we use for every Australian DTC brand",
    excerpt:
      "Three ad formats, two testing methodologies, and one rule we never break, regardless of budget or category.",
    gradient: "from-slate-800 via-zinc-700 to-brand-700",
    initials: "PA",
    sections: [
      {
        heading: "The three formats",
        body: "Every Meta account we manage runs three core creative formats: static single image (optimised for retargeting and low-funnel), short-form video 15–30 seconds (optimised for prospecting), and carousel (for AOV improvement and product range discovery). These aren't three options - they're three pillars. Every campaign that hits scale in our portfolio runs all three. Removing any one of them reliably reduces performance.",
      },
      {
        heading: "Testing methodology one: the hook test",
        body: "The hook is the first three seconds of a video ad. It has a disproportionate impact on performance because it determines whether the algorithm serves the ad at full volume or throttles it. We run hook tests monthly - same product, same offer, five different openings. We test a direct product statement, a problem statement, a social proof hook (number of customers, review quote), a surprise or pattern interrupt, and a question. The winner's format rolls into the core campaign. The other four are killed regardless of how they feel creatively.",
      },
      {
        heading: "Testing methodology two: the offer test",
        body: "We separate creative testing from offer testing deliberately. Once we have a strong creative format, we then test offer framing separately - the same ad with four different value propositions: price (save $X), urgency (limited time), social proof (most popular), and benefit clarity (what they actually get). This is where the biggest performance gaps appear. For Australian DTC brands we've found social proof hooks underperform in prospecting but overperform in retargeting - the inverse of what most people assume.",
      },
      {
        heading: "The one rule we never break",
        body: "We never run a campaign without a 7-day minimum data window before making optimisation decisions. We've had clients push us to cut ads after three days of poor performance. Every time we've held the line and waited for the full window, the data has been right and the impulse to cut has been wrong. Meta's algorithm needs time to learn. The instinct to act immediately costs Australian brands money every quarter.",
      },
    ],
  },
  {
    slug: "brandmates-onboarding-process",
    tag: "Studio",
    date: "3 Mar 2025",
    readTime: "4 min read",
    title: "The BrandMates onboarding process: what happens after you say yes",
    excerpt:
      "Week by week, what clients can expect in our first 30 days, and why we front-load the hard conversations.",
    gradient: "from-brand-700 via-brand-600 to-zinc-900",
    initials: "BM",
    sections: [
      {
        heading: "Why we front-load the hard conversations",
        body: "Most agency-client relationships deteriorate because of misaligned expectations that were never surfaced at the start. We've made the same mistake. Since 2021 we've deliberately moved every uncomfortable conversation to week one - budget constraints, internal politics, who actually has approval authority, what 'done' looks like. It's not always comfortable, but it means by week four everyone is building instead of negotiating.",
      },
      {
        heading: "Week one: intake and immersion",
        body: "Before we do any creative work, we spend the first week getting the full picture. This means a three-hour kickoff with the founding team (not just the marketing lead), access to all existing brand assets, analytics, and previous agency work, and a 30-minute call with your best customer (we arrange it). We also send an internal questionnaire to everyone who touches the brand - often the most revealing step. We want to know where the disagreements are before we start proposing solutions.",
      },
      {
        heading: "Week two: competitive and market context",
        body: "We run our own competitive audit independently, without client input. We've found that showing clients a fresh-eyes view of their competitive landscape - how they look relative to peers without the internal assumptions - is consistently the most productive moment in the engagement. It either validates the brief or reframes it. Either way, it's the foundation for strategy.",
      },
      {
        heading: "Week three and four: strategy before anything visual",
        body: "No logos, no colour palettes, no typography in the first four weeks. We don't move to visual work until the strategic foundation is agreed in writing. The positioning statement, the audience definition, the messaging framework. This delays the 'exciting' part of the process, but it means every visual decision that follows has a defensible rationale - and fewer revisions. Clients who've worked with us before now appreciate this more than any other part of how we work.",
      },
    ],
  },
];

export function getJournalArticle(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}
