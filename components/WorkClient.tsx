"use client";

import { useEffect } from "react";
import Link from "next/link";

const ExternalArrow = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRight = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function WorkClient() {
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
        tl.fromTo(".wk-eyebrow", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.3);
        tl.fromTo(".wk-heading", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, 0.45);
        tl.fromTo(".wk-intro",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.65);
        tl.fromTo(".wk-stats",   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.8);

        // Project reveals — each individually so they stagger as user scrolls
        gsap.utils.toArray<HTMLElement>(".wk-project").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.8, ease,
            scrollTrigger: { trigger: el, start: "top bottom", once: true },
          });
        });

        gsap.fromTo(".wk-cta", { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.6, ease,
          scrollTrigger: { trigger: ".wk-cta", start: "top bottom", once: true },
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
        <div className="pointer-events-none absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-brand-400/5 blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="wk-eyebrow opacity-0 translate-y-4 flex items-center gap-2.5 mb-6">
            <span className="w-8 h-px bg-brand-400"></span>
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Selected Work · 2019–2025</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="wk-heading opacity-0 translate-y-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white max-w-2xl">
              Work that<br />
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">earns trust.</span>
            </h1>
            <p className="wk-intro opacity-0 translate-y-6 text-white/55 text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              A selection of projects across web, social, ads, and content — built for Australian brands that refuse to blend in.
            </p>
          </div>

          <div className="wk-stats opacity-0 translate-y-6 mt-14 md:mt-20 grid grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 max-w-lg">
            <div className="px-6 py-5 bg-brand-ink flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-white tracking-tight">47+</span>
              <span className="text-xs text-white/45 uppercase tracking-wide">Projects</span>
            </div>
            <div className="px-6 py-5 bg-brand-ink flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-white tracking-tight">12</span>
              <span className="text-xs text-white/45 uppercase tracking-wide">Industries</span>
            </div>
            <div className="px-6 py-5 bg-brand-ink flex flex-col gap-1">
              <span className="text-3xl font-extrabold text-white tracking-tight">3</span>
              <span className="text-xs text-white/45 uppercase tracking-wide">AGDA Awards</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">

          {/* Project 1 — Saltbush (full width) */}
          <a href="#" className="wk-project group relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-700 via-brand-500 to-brand-400 opacity-0 translate-y-8">
            <div className="aspect-[16/7] relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(255,255,255,0.12),transparent_60%)]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/10 font-black text-[20vw] leading-none tracking-tighter select-none">SB</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <p className="text-brand-300 text-xs font-bold uppercase tracking-[0.15em] mb-2">Saltbush Co — Sustainable Fashion</p>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">Full rebrand: web, social & ads</h2>
                  </div>
                  <div className="flex flex-wrap gap-2 shrink-0">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Web Design</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Social Media</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Paid Ads</span>
                  </div>
                </div>
              </div>
            </div>
            <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
              <ExternalArrow size={16} />
            </span>
          </a>

          {/* Projects 2 + 3 */}
          <div className="grid md:grid-cols-2 gap-6">
            <a href="#" className="wk-project group relative rounded-3xl overflow-hidden bg-gradient-to-br from-zinc-900 via-brand-700 to-zinc-800 opacity-0 translate-y-8">
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(33,186,128,0.2),transparent_60%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/8 font-black text-[18vw] md:text-[10vw] leading-none tracking-tighter select-none">KR</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-brand-300 text-xs font-bold uppercase tracking-[0.15em] mb-1">Koorang — Outdoor Apparel</p>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white tracking-tight">Performance paid ads: $820K ROAS 4.2×</h2>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Paid Ads</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Content Creation</span>
                  </div>
                </div>
              </div>
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
                <ExternalArrow size={14} />
              </span>
            </a>

            <a href="#" className="wk-project group relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 opacity-0 translate-y-8">
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-brand-700/10 font-black text-[18vw] md:text-[10vw] leading-none tracking-tighter select-none">HC</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 bg-gradient-to-t from-brand-700/80 to-transparent">
                  <p className="text-brand-300 text-xs font-bold uppercase tracking-[0.15em] mb-1">Harbour Co — Restaurant Group</p>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white tracking-tight">Social presence that fills tables</h2>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Social Media</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Content Creation</span>
                  </div>
                </div>
              </div>
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
                <ExternalArrow size={14} />
              </span>
            </a>
          </div>

          {/* Projects 4 + 5 */}
          <div className="grid md:grid-cols-2 gap-6">
            <a href="#" className="wk-project group relative rounded-3xl overflow-hidden opacity-0 translate-y-8" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #1a0a2e 100%)" }}>
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(87,206,165,0.15),transparent_60%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/8 font-black text-[18vw] md:text-[10vw] leading-none tracking-tighter select-none">TC</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-brand-300 text-xs font-bold uppercase tracking-[0.15em] mb-1">Tallow &amp; Co — Artisan Candles</p>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white tracking-tight">E-commerce site + content suite</h2>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Web Design</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Content Creation</span>
                  </div>
                </div>
              </div>
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
                <ExternalArrow size={14} />
              </span>
            </a>

            <a href="#" className="wk-project group relative rounded-3xl overflow-hidden bg-gradient-to-br from-orange-950 via-amber-900 to-orange-950 opacity-0 translate-y-8">
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(251,146,60,0.2),transparent_60%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white/8 font-black text-[18vw] md:text-[10vw] leading-none tracking-tighter select-none">BL</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-brand-300 text-xs font-bold uppercase tracking-[0.15em] mb-1">Bushline — Outdoor Retail</p>
                  <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-extrabold text-white tracking-tight">National paid media scale-up</h2>
                  <div className="flex gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Paid Ads</span>
                    <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-medium">Social Media</span>
                  </div>
                </div>
              </div>
              <span className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
                <ExternalArrow size={14} />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto">
          <div className="wk-cta opacity-0 translate-y-6 relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-600 to-brand-700 p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,rgba(33,186,128,0.2),transparent_60%)]"></div>
            <div className="relative">
              <p className="text-brand-300 text-sm font-bold uppercase tracking-[0.15em] mb-3">Ready to be next?</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">Your project could live here.</h2>
            </div>
            <Link
              href="/contact"
              className="relative group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(33,186,128,0.35)] shrink-0"
            >
              Start a conversation
              <span className="transition-transform duration-300 group-hover:translate-x-1"><ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
