"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowDown } from "lucide-react";
import { journalArticles } from "@/lib/journal";

const ReadMoreArrow = () => (
  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
);

const featuredArticle = journalArticles[0];
const gridArticles = journalArticles.slice(1);

export default function JournalClient() {
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        document.querySelectorAll<HTMLElement>(".opacity-0").forEach((el) => {
          el.style.opacity = "1";
          el.style.translate = "none";
          el.style.transform = "none";
        });
        return;
      }

      const mobile = ScrollTrigger.isTouch === 1;

      document.querySelectorAll<HTMLElement>(".opacity-0").forEach((el) => {
        [...el.classList].filter(c => c.startsWith("translate-y-") || c.startsWith("-translate-y-")).forEach(c => el.classList.remove(c));
        el.style.transition = "none";
      });

      ctx = gsap.context(() => {
        const ease = "power4.out";
        const y    = mobile ? 10 : 20;
        const dur  = mobile ? 0.45 : 0.65;
        const ST   = { start: "top bottom+=150" as const, once: true };
        const from = { opacity: 0, y };
        const to   = { opacity: 1, y: 0, duration: dur, ease, force3D: true, clearProps: "translate,transition" };

        const tl = gsap.timeline({ defaults: { ease } });
        tl.fromTo(".jn-eyebrow", from, to, 0.3);
        tl.fromTo(".jn-heading", from, to, 0.4);
        tl.fromTo(".jn-intro",   from, to, 0.5);

        gsap.fromTo(".jn-featured", from, { ...to, scrollTrigger: { trigger: ".jn-featured", ...ST } });

        ScrollTrigger.batch(".jn-article", {
          onEnter: (els) => gsap.fromTo(els, from, { ...to, stagger: 0.07 }),
          ...ST,
        });

        gsap.fromTo(".jn-more", from, { ...to, scrollTrigger: { trigger: ".jn-more", ...ST } });
        gsap.fromTo(".jn-newsletter", from, { ...to, scrollTrigger: { trigger: ".jn-newsletter", ...ST } });

        ScrollTrigger.refresh();
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative w-full pt-(--hero-top) pb-(--space-section) px-6 sm:px-10 md:px-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="jn-eyebrow opacity-0 translate-y-4 flex items-center gap-2.5 mb-6">
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Studio Dispatch · Insights &amp; Ideas</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="jn-heading opacity-0 translate-y-6 text-[1.875rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white">
              From the<br />
              <span className="bg-linear-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">studio desk.</span>
            </h1>
            <p className="jn-intro opacity-0 translate-y-6 text-white/55 text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              What we&apos;re reading, building, and learning, practical insights from a studio that actually runs campaigns in the Australian market.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLE */}
      <section className="px-6 sm:px-10 md:px-16 pb-12">
        <div className="max-w-7xl mx-auto">
          <Link href={`/journal/${featuredArticle.slug}`} className={`jn-featured opacity-0 translate-y-8 group relative block rounded-3xl overflow-hidden bg-linear-to-br ${featuredArticle.gradient}`}>
            {/* Gradient image area */}
            <div className="aspect-video sm:aspect-16/7 md:aspect-16/6 relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_80%,rgba(255,255,255,0.08),transparent_50%)]"></div>
              {/* Centered initials watermark */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/10 font-black text-8xl tracking-tighter select-none">{featuredArticle.initials}</span>
              </div>
              {/* Overlay text - tablet+ only */}
              <div className="absolute inset-0 hidden sm:flex items-end p-8 md:p-14">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-5">
                    <span className="px-3 py-1 rounded-full bg-brand-400/20 border border-brand-400/30 text-brand-300 text-xs font-bold uppercase tracking-wider">{featuredArticle.tag}</span>
                    <span className="text-white/45 text-xs">{featuredArticle.date} · {featuredArticle.readTime}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-white/65 text-base leading-relaxed hidden md:block">
                    {featuredArticle.excerpt}
                  </p>
                </div>
              </div>
              <span className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </div>
            {/* Card body - mobile only, matches grid article style */}
            <div className="sm:hidden flex flex-col gap-3 p-5 bg-brand-700/70">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-400/20 text-brand-300 text-[0.65rem] font-bold uppercase tracking-wider">{featuredArticle.tag}</span>
                <span className="text-white/30 text-xs">{featuredArticle.date}</span>
              </div>
              <h2 className="text-white font-bold text-lg leading-snug group-hover:text-brand-300 transition-colors">{featuredArticle.title}</h2>
              <p className="text-white/50 text-sm leading-relaxed">{featuredArticle.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-400 mt-1">
                Read article <ReadMoreArrow />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ARTICLE GRID */}
      <section className="px-6 sm:px-10 md:px-16 pb-(--space-section)">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {gridArticles.map((article) => (
            <Link key={article.slug} href={`/journal/${article.slug}`} className="jn-article opacity-0 translate-y-8 group flex flex-col rounded-2xl overflow-hidden border border-white/5 bg-white/2 hover:border-brand-400/25 hover:bg-brand-400/5 transition-all duration-300">
              <div className={`aspect-video bg-linear-to-br ${article.gradient} relative overflow-hidden`}>
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
            </Link>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-12 flex justify-center">
          <button className="jn-more opacity-0 translate-y-4 group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/3 hover:border-brand-400/40 hover:bg-brand-400/8 text-white/70 hover:text-white font-medium text-sm px-8 py-3.5 transition-all duration-300">
            Load more articles
            <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="px-6 sm:px-10 md:px-16 pb-(--space-section)">
        <div className="max-w-7xl mx-auto">
          <div className="jn-newsletter opacity-0 translate-y-6 relative rounded-3xl overflow-hidden bg-linear-to-br from-brand-600 to-brand-700 p-10 md:p-16">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgb(var(--accent-rgb)/0.2),transparent_60%)]"></div>
            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div className="max-w-lg">
                <p className="text-brand-300 text-sm font-bold uppercase tracking-[0.15em] mb-3">Studio dispatch</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-snug mb-3">One thoughtful email a month.</h2>
                <p className="text-white/55 text-base">What&apos;s working in AU digital marketing right now, no filler, no agency self-promotion. Just the stuff worth knowing.</p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  name="email"
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
