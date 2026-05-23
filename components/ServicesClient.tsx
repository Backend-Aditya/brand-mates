"use client";

import { useEffect } from "react";
import Link from "next/link";

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 w-4 h-4 shrink-0 rounded-full bg-brand-400/15 border border-brand-400/30 flex items-center justify-center">
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2.5 2.5L8 3" stroke="#21ba80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <span>{children}</span>
  </li>
);

const BoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#21ba80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ServicesClient() {
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
        tl.fromTo(".sv-eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.3);
        tl.fromTo(".sv-heading", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.45);
        tl.fromTo(".sv-intro",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.65);
        tl.fromTo(".sv-anchors", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, 0.8);

        // Service blocks
        gsap.utils.toArray<HTMLElement>(".sv-block").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.8, ease,
            scrollTrigger: { trigger: el, start: "top bottom", once: true },
          });
        });

        gsap.fromTo(".sv-cta", { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.6, ease,
          scrollTrigger: { trigger: ".sv-cta", start: "top bottom", once: true },
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
      <section className="relative w-full pt-36 md:pt-44 pb-20 md:pb-28 px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden">
        <div className="pointer-events-none absolute -top-60 left-1/3 w-[600px] h-[600px] rounded-full bg-brand-400/6 blur-[100px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="sv-eyebrow opacity-0 translate-y-4 flex items-center gap-2.5 mb-6">
            <span className="w-8 h-px bg-brand-400"></span>
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">What We Do</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="sv-heading opacity-0 translate-y-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white max-w-2xl">
              Four ways we<br />
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">grow your brand.</span>
            </h1>
            <p className="sv-intro opacity-0 translate-y-6 text-white/55 text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              Focused disciplines, tight execution — everything your brand needs to compete in the Australian market, and nothing you don&apos;t.
            </p>
          </div>
          <div className="sv-anchors opacity-0 translate-y-6 mt-14 flex flex-wrap gap-3">
            <a href="#web" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Web Design &amp; Dev</a>
            <a href="#social" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Social Media</a>
            <a href="#ads" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Paid Ads</a>
            <a href="#content" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Content Creation</a>
          </div>
        </div>
      </section>

      {/* SERVICE 1 — WEB */}
      <section id="web" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/25">01</span>
              <span className="w-8 h-px bg-white/15"></span>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">Web Design &amp; Development</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Sites that convert,<br />not just impress.</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
              From Figma concept to live code — we design and build websites that work as hard as your sales team. Every BrandMates site is fast, accessible, and built with Australian hosting options so your customers get a snappy experience wherever they are.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(33,186,128,0.3)]">
              Start a web project <ArrowRight />
            </Link>
          </div>
          <div className="sv-block opacity-0 translate-y-8 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/65 text-sm">
                <CheckItem>Custom Figma design — desktop, tablet &amp; mobile</CheckItem>
                <CheckItem>Next.js / React, Webflow, or Framer — you choose</CheckItem>
                <CheckItem>On-page SEO foundation baked in from day one</CheckItem>
                <CheckItem>Core Web Vitals optimised — 90+ Lighthouse score</CheckItem>
                <CheckItem>CMS setup &amp; training (no ongoing dev dependency)</CheckItem>
                <CheckItem>30-day post-launch support included</CheckItem>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-6 flex items-start gap-4">
              <BoltIcon />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Typical result</p>
                <p className="text-white/60 text-sm leading-relaxed">Tallow &amp; Co saw a 340% increase in organic sessions in 6 months after launch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE 2 — SOCIAL */}
      <section id="social" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8 order-2 md:order-1 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-brand-ink p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/65 text-sm">
                <CheckItem>Profile audit &amp; strategy document</CheckItem>
                <CheckItem>Monthly content calendar (30+ posts)</CheckItem>
                <CheckItem>Instagram, TikTok, LinkedIn &amp; Facebook</CheckItem>
                <CheckItem>Community management &amp; DM responses</CheckItem>
                <CheckItem>AEST-timezone scheduling &amp; posting</CheckItem>
                <CheckItem>Monthly analytics &amp; insight report</CheckItem>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-6 flex items-start gap-4">
              <BoltIcon />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Typical result</p>
                <p className="text-white/60 text-sm leading-relaxed">Harbour Co grew from 4K to 31K Instagram followers in 9 months with zero paid follower spend.</p>
              </div>
            </div>
          </div>
          <div className="sv-block opacity-0 translate-y-8 order-1 md:order-2">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/25">02</span>
              <span className="w-8 h-px bg-white/15"></span>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">Social Media</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Feeds that build<br />community, not noise.</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
              We manage your social presence end-to-end — strategy, content, scheduling, and community. No juniors, no offshore teams. Your account is handled by experienced Australian creatives who understand local culture, slang, and the moments that matter to your audience.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(33,186,128,0.3)]">
              Grow my social <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE 3 — ADS */}
      <section id="ads" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/25">03</span>
              <span className="w-8 h-px bg-white/15"></span>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">Paid Ads</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Ad spend that<br />actually pays back.</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
              We run performance campaigns on Meta, Google, and TikTok with one obsession: ROAS. Every dollar is tracked, every creative is tested, and every report tells you exactly what&apos;s working. No fluff, no vanity metrics — just revenue you can point to.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(33,186,128,0.3)]">
              Audit my ad account <ArrowRight />
            </Link>
          </div>
          <div className="sv-block opacity-0 translate-y-8 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/65 text-sm">
                <CheckItem>Meta Ads (Facebook &amp; Instagram) management</CheckItem>
                <CheckItem>Google Ads — Search, Shopping &amp; Display</CheckItem>
                <CheckItem>TikTok Ads for Aussie audiences</CheckItem>
                <CheckItem>Creative testing &amp; iteration (A/B at scale)</CheckItem>
                <CheckItem>Pixel setup, conversion tracking &amp; attribution</CheckItem>
                <CheckItem>Fortnightly reporting with plain-English insights</CheckItem>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-6 flex items-start gap-4">
              <BoltIcon />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Typical result</p>
                <p className="text-white/60 text-sm leading-relaxed">Koorang achieved 4.2× ROAS on $820K media spend across Meta &amp; Google in 12 months.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE 4 — CONTENT */}
      <section id="content" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8 order-2 md:order-1 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-brand-ink p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/65 text-sm">
                <CheckItem>Brand &amp; product photography</CheckItem>
                <CheckItem>Short-form video (Reels, TikTok, YouTube Shorts)</CheckItem>
                <CheckItem>Copywriting — web, ads, email, socials</CheckItem>
                <CheckItem>On-location shoots across Sydney &amp; Melbourne</CheckItem>
                <CheckItem>Deliverable bundles — monthly or quarterly retainers</CheckItem>
                <CheckItem>Usage rights included — no licensing headaches</CheckItem>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-6 flex items-start gap-4">
              <BoltIcon />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Typical result</p>
                <p className="text-white/60 text-sm leading-relaxed">Saltbush&apos;s content suite generated 2.8M organic impressions in its first quarter across platforms.</p>
              </div>
            </div>
          </div>
          <div className="sv-block opacity-0 translate-y-8 order-1 md:order-2">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/25">04</span>
              <span className="w-8 h-px bg-white/15"></span>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-brand-400">Content Creation</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Content your audience<br />stops scrolling for.</h2>
            <p className="text-white/60 text-base md:text-lg leading-relaxed mb-8">
              Photo, video, and copy that actually represents your brand — shot on location across Australia, edited in-house, and delivered ready to publish. We don&apos;t do stock-photo filler or AI-generated fluff. We create the real thing.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(33,186,128,0.3)]">
              Book a content shoot <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sv-cta opacity-0 translate-y-6 relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_100%,rgba(33,186,128,0.15),transparent_60%)]"></div>
            <div className="relative">
              <p className="text-brand-300 text-sm font-bold uppercase tracking-[0.15em] mb-3">Not sure which service fits?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">Let&apos;s figure it out together.</h2>
              <p className="text-white/55 text-base mt-3 max-w-md">Book a free 30-minute discovery call. No pitch, no pressure — just an honest conversation about where your brand is and where it should be.</p>
            </div>
            <Link
              href="/contact"
              className="relative group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(33,186,128,0.35)] shrink-0"
            >
              Book a discovery call
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
