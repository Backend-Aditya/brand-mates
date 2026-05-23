"use client";

import { useEffect } from "react";

const ReadMoreArrow = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface Article {
  initials: string;
  gradient: string;
  tag: string;
  date: string;
  title: string;
  excerpt: string;
}

const articles: Article[] = [
  {
    initials: "WD",
    gradient: "from-zinc-800 via-brand-700 to-zinc-900",
    tag: "Web Design",
    date: "7 Apr 2025",
    title: "Why your website is leaking leads in 2025 — and the 5-minute fix",
    excerpt: "Most conversion problems come from one of three places. Here's how to find yours in under an afternoon.",
  },
  {
    initials: "SM",
    gradient: "from-violet-900 via-brand-700 to-slate-900",
    tag: "Social Media",
    date: "1 Apr 2025",
    title: "Instagram Reels vs TikTok in Australia: 2025 data breakdown",
    excerpt: "We analysed 18 months of data across 12 Australian brand accounts. Here's what the numbers actually say.",
  },
  {
    initials: "CC",
    gradient: "from-orange-950 via-amber-900 to-brand-700",
    tag: "Content",
    date: "25 Mar 2025",
    title: "What we learned from 50 on-location content shoots across Australia",
    excerpt: "From Bondi to Broome — the logistical, creative, and cultural lessons that changed how we approach every shoot.",
  },
  {
    initials: "EF",
    gradient: "from-brand-600 via-brand-500 to-brand-400",
    tag: "Strategy",
    date: "18 Mar 2025",
    title: "EOFY marketing: how Australian brands should spend their leftover budget",
    excerpt: "The end of financial year is the most misunderstood opportunity in the AU marketing calendar. Here's how to use it.",
  },
  {
    initials: "PA",
    gradient: "from-slate-800 via-zinc-700 to-brand-700",
    tag: "Paid Ads",
    date: "10 Mar 2025",
    title: "The Meta creative framework we use for every Australian DTC brand",
    excerpt: "Three ad formats, two testing methodologies, and one rule we never break — regardless of budget or category.",
  },
  {
    initials: "BM",
    gradient: "from-brand-700 via-brand-600 to-zinc-900",
    tag: "Studio",
    date: "3 Mar 2025",
    title: "The BrandMates onboarding process: what happens after you say yes",
    excerpt: "Week by week, what clients can expect in our first 30 days — and why we front-load the hard conversations.",
  },
];

export default function JournalClient() {
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const ease = "power4.out";

        // Hero entrance
        const tl = gsap.timeline({ defaults: { ease } });
        tl.fromTo(".jn-eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.3);
        tl.fromTo(".jn-heading", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.45);
        tl.fromTo(".jn-intro",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.65);

        gsap.fromTo(".jn-featured", { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, ease,
          scrollTrigger: { trigger: ".jn-featured", start: "top bottom", once: true },
        });

        ScrollTrigger.batch(".jn-article", {
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.65, stagger: 0.06, ease }),
          start: "top bottom", once: true,
        });

        gsap.fromTo(".jn-more", { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: 0.5, ease,
          scrollTrigger: { trigger: ".jn-more", start: "top bottom", once: true },
        });

        gsap.fromTo(".jn-newsletter", { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.7, ease,
          scrollTrigger: { trigger: ".jn-newsletter", start: "top bottom", once: true },
        });

        ScrollTrigger.refresh();
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative w-full pt-36 md:pt-44 pb-16 md:pb-20 px-6 sm:px-10 md:px-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-60 right-0 w-[600px] h-[600px] rounded-full bg-brand-400/5 blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="jn-eyebrow opacity-0 translate-y-4 flex items-center gap-2.5 mb-6">
            <span className="w-8 h-px bg-brand-400"></span>
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Studio Dispatch · Insights &amp; Ideas</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="jn-heading opacity-0 translate-y-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
              From the<br />
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">studio desk.</span>
            </h1>
            <p className="jn-intro opacity-0 translate-y-6 text-white/55 text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              What we&apos;re reading, building, and learning — practical insights from a studio that actually runs campaigns in the Australian market.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="px-6 sm:px-10 md:px-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <a href="#" className="jn-featured opacity-0 translate-y-8 group relative block rounded-3xl overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500">
            <div className="aspect-[16/7] md:aspect-[16/6] relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,255,255,0.08),transparent_50%)]"></div>
              <div className="absolute inset-0 flex items-end p-8 md:p-14">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full bg-brand-400/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider">Paid Ads</span>
                    <span className="text-white/45 text-xs">14 April 2025 · 8 min read</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    How we ran $2.3M in Meta ads for Saltbush — and what actually worked
                  </h2>
                  <p className="text-white/65 text-base leading-relaxed hidden md:block">
                    A frank look at our creative testing framework, our biggest mistakes, and the three campaign types that drove 80% of the revenue.
                  </p>
                </div>
              </div>
              <span className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a key={article.title} href="#" className="jn-article opacity-0 translate-y-8 group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/[0.02] hover:border-brand-400/25 hover:bg-brand-400/5 transition-all duration-300">
              <div className={`aspect-video bg-gradient-to-br ${article.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/10 font-black text-7xl tracking-tighter">{article.initials}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 p-6 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-white/55 text-[0.65rem] font-bold uppercase tracking-wider">{article.tag}</span>
                  <span className="text-white/30 text-xs">{article.date}</span>
                </div>
                <h3 className="text-white font-bold text-lg leading-snug group-hover:text-brand-300 transition-colors">{article.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 mt-2">
                  Read more <ReadMoreArrow />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-12 flex justify-center">
          <button className="jn-more opacity-0 translate-y-4 group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-400/40 hover:bg-brand-400/8 text-white/70 hover:text-white font-medium text-sm px-8 py-3.5 transition-all duration-300">
            Load more articles
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-y-0.5">
              <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto">
          <div className="jn-newsletter opacity-0 translate-y-6 relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 p-10 md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(33,186,128,0.2),transparent_60%)]"></div>
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-lg">
                <p className="text-brand-300 text-sm font-bold uppercase tracking-[0.15em] mb-3">Studio dispatch</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">One thoughtful email a month.</h2>
                <p className="text-white/55 text-base">What&apos;s working in AU digital marketing right now — no filler, no agency self-promotion. Just the stuff worth knowing.</p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="you@company.com.au"
                  className="flex-1 md:w-64 rounded-full border border-white/15 bg-white/10 text-white placeholder:text-white/40 text-sm px-6 py-3.5 outline-none focus:border-brand-400/60 transition-colors"
                />
                <button type="submit" className="shrink-0 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
