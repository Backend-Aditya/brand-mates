"use client";

import { useEffect } from "react";
import Link from "next/link";

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 w-4 h-4 shrink-0 rounded-full bg-brand-400/15 border border-brand-400/30 flex items-center justify-center text-brand-400">
      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
        <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
    <span>{children}</span>
  </li>
);

const BoltIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5 text-brand-400">
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
        tl.fromTo(".sv-heading", from, to, 0.3);
        tl.fromTo(".sv-intro",   from, to, 0.4);
        tl.fromTo(".sv-anchors", from, to, 0.5);

        gsap.utils.toArray<HTMLElement>(".sv-block").forEach((el) => {
          gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, ...ST } });
        });

        gsap.fromTo(".sv-cta", from, { ...to, scrollTrigger: { trigger: ".sv-cta", ...ST } });

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
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="sv-heading opacity-0 translate-y-6 text-[1.875rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white max-w-2xl">
              Four ways<br />
              <span className="text-brand-400">we work.</span>
            </h1>
            <p className="sv-intro opacity-0 translate-y-6 text-white/75 text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              Focused disciplines, tight execution, everything your brand needs to compete in the Australian market, and nothing you don&apos;t.
            </p>
          </div>
          <div className="sv-anchors opacity-0 translate-y-6 mt-14 flex flex-wrap gap-3">
            <a href="#web" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/3 hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Web Design &amp; Dev</a>
            <a href="#social" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/3 hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Social Media</a>
            <a href="#ads" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/3 hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Paid Ads</a>
            <a href="#content" className="px-5 py-2.5 rounded-full border border-white/10 bg-white/3 hover:border-brand-400/60 hover:bg-brand-400/10 hover:text-brand-400 text-white/70 text-sm font-medium transition-all duration-300">Content Creation</a>
          </div>
        </div>
      </section>

      {/* SERVICE 1, WEB */}
      <section id="web" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">Web Design &amp; Development</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Sites that convert,<br />not just impress.</h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
              From Figma concept to live code, we design and build websites that load fast, convert well, and your team can actually maintain without calling us every month. Australian hosting options available if your lawyers care about data residency.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
              Start a web project <ArrowRight />
            </Link>
          </div>
          <div className="sv-block opacity-0 translate-y-8 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/75 text-sm">
                <CheckItem>Custom Figma design, desktop, tablet &amp; mobile</CheckItem>
                <CheckItem>Next.js / React, Webflow, or Framer, you choose</CheckItem>
                <CheckItem>On-page SEO foundation baked in from day one</CheckItem>
                <CheckItem>Core Web Vitals optimised, 90+ Lighthouse score</CheckItem>
                <CheckItem>CMS setup &amp; training (no ongoing dev dependency)</CheckItem>
                <CheckItem>30-day post-launch support included</CheckItem>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-6 flex items-start gap-4">
              <BoltIcon />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Typical result</p>
                <p className="text-white/75 text-sm leading-relaxed">Tallow &amp; Co saw a 340% increase in organic sessions in 6 months after launch.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE 2, SOCIAL */}
      <section id="social" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5 bg-white/1">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8 order-2 md:order-1 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-brand-ink p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/75 text-sm">
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
                <p className="text-white/75 text-sm leading-relaxed">Harbour Co grew from 4K to 31K Instagram followers in 9 months with zero paid follower spend.</p>
              </div>
            </div>
          </div>
          <div className="sv-block opacity-0 translate-y-8 order-1 md:order-2">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">Social Media</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Feeds that build<br />community, not noise.</h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
              We manage your social presence end-to-end, strategy, content, scheduling, and community. No juniors, no offshore teams. Your account is handled by experienced Australian creatives who understand local culture, slang, and the moments that matter to your audience.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
              Grow my social <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE 3, ADS */}
      <section id="ads" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">Paid Ads</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Ad spend that<br />actually pays back.</h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
              We run performance campaigns on Meta, Google, and TikTok. Every dollar is tracked, every creative is tested, and every fortnightly report tells you exactly what&apos;s driving revenue, and what to cut. Attributed to actual purchases, not reach numbers.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
              Audit my ad account <ArrowRight />
            </Link>
          </div>
          <div className="sv-block opacity-0 translate-y-8 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/75 text-sm">
                <CheckItem>Meta Ads (Facebook &amp; Instagram) management</CheckItem>
                <CheckItem>Google Ads, Search, Shopping &amp; Display</CheckItem>
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
                <p className="text-white/75 text-sm leading-relaxed">Koorang achieved 4.2× ROAS on $820K media spend across Meta &amp; Google in 12 months.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE 4, CONTENT */}
      <section id="content" className="relative px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5 bg-white/1">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="sv-block opacity-0 translate-y-8 order-2 md:order-1 flex flex-col gap-4">
            <div className="rounded-2xl border border-white/5 bg-brand-ink p-6">
              <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h3>
              <ul className="flex flex-col gap-3 text-white/75 text-sm">
                <CheckItem>Brand &amp; product photography</CheckItem>
                <CheckItem>Short-form video (Reels, TikTok, YouTube Shorts)</CheckItem>
                <CheckItem>Copywriting, web, ads, email, socials</CheckItem>
                <CheckItem>On-location shoots across Sydney &amp; Melbourne</CheckItem>
                <CheckItem>Deliverable bundles, monthly or quarterly retainers</CheckItem>
                <CheckItem>Usage rights included, no licensing headaches</CheckItem>
              </ul>
            </div>
            <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-6 flex items-start gap-4">
              <BoltIcon />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Typical result</p>
                <p className="text-white/75 text-sm leading-relaxed">Saltbush&apos;s content suite generated 2.8M organic impressions in its first quarter across platforms.</p>
              </div>
            </div>
          </div>
          <div className="sv-block opacity-0 translate-y-8 order-1 md:order-2">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-400">Content Creation</span>
            </div>
            <h2 className="text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6">Content made for<br />your specific audience.</h2>
            <p className="text-white/75 text-base md:text-lg leading-relaxed mb-8">
              Photo, video, and copy shot on location across Australia, edited in-house, and delivered ready to publish. No stock photos, no AI-generated filler, everything is specific to your brand, your product, and your audience.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
              Book a content shoot <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 md:px-16 py-20 md:py-28 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sv-cta opacity-0 translate-y-6 relative rounded-3xl overflow-hidden bg-brand-700 border border-white/10 p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="relative">
              <p className="text-brand-300 text-sm font-bold uppercase tracking-[0.15em] mb-3">Still deciding?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">Not sure which service fits?</h2>
              <p className="text-white/75 text-base mt-3 max-w-md">Book a 30-minute call. We&apos;ll tell you what we think, including whether another studio would serve you better.</p>
            </div>
            <Link
              href="/contact"
              className="relative group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-lg) shrink-0"
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
