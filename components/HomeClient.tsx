"use client";

import { useEffect } from "react";
import Link from "next/link";

const ArrowRight = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const StarIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z" />
  </svg>
);

const FiveStars = ({ size = 14 }: { size?: number }) => (
  <div className="flex gap-0.5 text-brand-400">
    {Array.from({ length: 5 }).map((_, i) => <StarIcon key={i} size={size} />)}
  </div>
);

export default function HomeClient() {
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(SplitText, ScrollTrigger);

      ctx = gsap.context(() => {
        // ── Hero entrance ──────────────────────────────────────
        const heroTl = gsap.timeline({ defaults: { ease: "power4.out" } });
        heroTl.fromTo(".hero-badge",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65 }, 0.25);
        heroTl.fromTo(".h-inner",      { y: "110%" },          { y: "0%",  duration: 1,    stagger: 0.1, ease: "expo.out" }, 0.45);
        heroTl.fromTo(".hero-subtext", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.75 }, 0.85);
        heroTl.fromTo(".hero-cta",     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65 }, 1.0);
        heroTl.fromTo(".hero-trust",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6  }, 1.1);
        heroTl.fromTo(".hero-form",    { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 1,    ease: "power4.out" }, 0.95);
        heroTl.fromTo(".hero-stats",   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, 1.05);

        // Counter animation (fires with hero)
        heroTl.add(() => {
          document.querySelectorAll<HTMLElement>(".stat-number").forEach((el) => {
            const target = parseInt(el.dataset.target ?? "0", 10);
            const counter = { val: 0 };
            gsap.to(counter, {
              val: target, duration: 2, ease: "power2.out",
              onUpdate() { el.textContent = String(Math.round(counter.val)); },
            });
          });
        }, 1.2);

        const ease = "power4.out";

        // ── Services ────────────────────────────────────────────
        if (document.querySelector(".services-eyebrow")) {
          const svTl = gsap.timeline({ scrollTrigger: { trigger: ".services-eyebrow", start: "top bottom", once: true } });
          svTl.fromTo(".services-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease });
          svTl.fromTo(".services-heading", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.3");
          svTl.fromTo(".services-intro",   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease }, "-=0.4");
        }
        ScrollTrigger.batch(".service-card", {
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease }),
          start: "top bottom", once: true,
        });
        gsap.fromTo(".services-cta", { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: 0.5, ease,
          scrollTrigger: { trigger: ".services-cta", start: "top bottom", once: true },
        });

        // ── Work ────────────────────────────────────────────────
        if (document.querySelector(".work-eyebrow")) {
          const wTl = gsap.timeline({ scrollTrigger: { trigger: ".work-eyebrow", start: "top bottom", once: true } });
          wTl.fromTo(".work-eyebrow",  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease });
          wTl.fromTo(".work-heading",  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.3");
          wTl.fromTo(".work-viewall",  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease }, "-=0.4");
        }
        gsap.utils.toArray<HTMLElement>(".project").forEach((row) => {
          gsap.fromTo(row, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.8, ease: "power4.out",
            scrollTrigger: { trigger: row, start: "top bottom", once: true },
          });
        });
        gsap.fromTo(".work-footer", { opacity: 0, y: 12 }, {
          opacity: 1, y: 0, duration: 0.55, ease,
          scrollTrigger: { trigger: ".work-footer", start: "top bottom", once: true },
        });

        // ── Testimonials ────────────────────────────────────────
        if (document.querySelector(".tm-eyebrow")) {
          const tmTl = gsap.timeline({ scrollTrigger: { trigger: ".tm-eyebrow", start: "top bottom", once: true } });
          tmTl.fromTo(".tm-eyebrow",  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease });
          tmTl.fromTo(".tm-heading",  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.3");
        }
        gsap.fromTo(".tm-featured", { opacity: 0, y: 22 }, {
          opacity: 1, y: 0, duration: 0.85, ease: "power4.out",
          scrollTrigger: { trigger: ".tm-featured", start: "top bottom", once: true },
        });
        ScrollTrigger.batch(".tm-card", {
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.06, ease }),
          start: "top bottom", once: true,
        });
        gsap.fromTo(".tm-stats", { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.6, ease,
          scrollTrigger: { trigger: ".tm-stats", start: "top bottom", once: true },
        });

        // ── Process ─────────────────────────────────────────────
        if (document.querySelector(".pr-eyebrow")) {
          const prTl = gsap.timeline({ scrollTrigger: { trigger: ".pr-eyebrow", start: "top bottom", once: true } });
          prTl.fromTo(".pr-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease });
          prTl.fromTo(".pr-heading", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.3");
          prTl.fromTo(".pr-intro",   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease }, "-=0.4");
        }
        ScrollTrigger.batch(".pr-step", {
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease }),
          start: "top bottom", once: true,
        });
        gsap.fromTo(".pr-footer", { opacity: 0, y: 14 }, {
          opacity: 1, y: 0, duration: 0.6, ease,
          scrollTrigger: { trigger: ".pr-footer", start: "top bottom", once: true },
        });

        // ── Team ────────────────────────────────────────────────
        if (document.querySelector(".team-eyebrow")) {
          const tTl = gsap.timeline({ scrollTrigger: { trigger: ".team-eyebrow", start: "top bottom", once: true } });
          tTl.fromTo(".team-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease });
          tTl.fromTo(".team-heading", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.3");
          tTl.fromTo(".team-intro",   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease }, "-=0.4");
        }
        ScrollTrigger.batch(".team-card", {
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 20, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.06, ease }),
          start: "top bottom", once: true,
        });
        gsap.fromTo(".team-principles", { opacity: 0, y: 18 }, {
          opacity: 1, y: 0, duration: 0.7, ease,
          scrollTrigger: { trigger: ".team-principles", start: "top bottom", once: true },
        });

        // ── FAQ ─────────────────────────────────────────────────
        if (document.querySelector(".faq-eyebrow")) {
          const fTl = gsap.timeline({ scrollTrigger: { trigger: ".faq-eyebrow", start: "top bottom", once: true } });
          fTl.fromTo(".faq-eyebrow", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease });
          fTl.fromTo(".faq-heading", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.3");
          fTl.fromTo(".faq-intro",   { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, stagger: 0.06, ease }, "-=0.4");
        }
        ScrollTrigger.batch(".faq-item", {
          onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease }),
          start: "top bottom", once: true,
        });

        // ── FAQ accordion ───────────────────────────────────────
        document.querySelectorAll<HTMLDetailsElement>("#faq details.faq-item").forEach((el) => {
          const summary = el.querySelector("summary");
          const content = summary?.nextElementSibling as HTMLElement | null;
          if (!summary || !content) return;
          content.style.overflow = "hidden";
          summary.addEventListener("click", (e) => {
            e.preventDefault();
            if (el.open) {
              gsap.to(content, {
                height: 0, opacity: 0, duration: 0.35, ease: "power3.inOut", overwrite: true,
                onComplete: () => { el.open = false; gsap.set(content, { height: "auto", opacity: 1 }); },
              });
            } else {
              gsap.set(content, { height: 0, opacity: 0 });
              el.open = true;
              gsap.to(content, {
                height: "auto", opacity: 1, duration: 0.5, ease: "power3.out", overwrite: true,
                onComplete: () => gsap.set(content, { clearProps: "height" }),
              });
            }
          });
        });

        // ── Contact ─────────────────────────────────────────────
        if (document.querySelector(".contact-eyebrow")) {
          const ctTl = gsap.timeline({ scrollTrigger: { trigger: ".contact-eyebrow", start: "top bottom", once: true } });
          ctTl.fromTo(".contact-eyebrow",  { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease });
          ctTl.fromTo(".contact-heading",  { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7, ease }, "-=0.3");
          ctTl.fromTo(".contact-intro",    { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.55, ease }, "-=0.4");
          ctTl.fromTo(".contact-card",     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease }, "-=0.3");
          ctTl.fromTo(".contact-offices",  { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.55, ease }, "-=0.25");
        }

        ScrollTrigger.refresh();
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero grain relative z-0 w-full min-h-svh flex flex-col justify-center overflow-hidden bg-[url('/hero.jpg')] bg-cover bg-center pt-24 md:pt-28 pb-[200px] sm:pb-[185px] md:pb-[170px] lg:pb-[160px]">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,rgba(6,49,36,0.82)_0%,rgba(20,20,20,0.75)_50%,rgba(20,20,20,0.55)_100%)]"></div>

        <div className="relative z-[2] w-full px-6 sm:px-10 md:px-16 flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
          {/* Content */}
          <div className="hero-content flex flex-col lg:flex-1 gap-5 md:gap-6">
            {/* Badge */}
            <div className="hero-badge inline-flex items-center gap-2.5 w-fit px-4 py-1.5 rounded-full bg-brand-400/10 border border-brand-400/30 opacity-0 translate-y-3">
              <span className="relative w-2 h-2 shrink-0 rounded-full bg-brand-400">
                <span className="absolute -inset-1 rounded-full bg-brand-400 opacity-30 animate-pulse-ring"></span>
              </span>
              <span className="text-[0.72rem] sm:text-[0.78rem] font-medium tracking-[0.08em] uppercase text-brand-400">
                Australia&apos;s Brand Studio · Est. Sydney
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline flex flex-col font-extrabold leading-[1.15] tracking-[-0.035em] text-white text-[2.15rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[3rem] xl:text-[3.75rem] 2xl:text-[4.5rem]">
              <span className="h-line block overflow-hidden"><span className="h-inner block translate-y-[110%] will-change-transform">Australia&apos;s best</span></span>
              <span className="h-line block overflow-hidden"><span className="h-inner block translate-y-[110%] will-change-transform">don&apos;t just build brands.</span></span>
              <span className="h-line block overflow-hidden">
                <span className="h-inner block translate-y-[110%] will-change-transform bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">
                  They build belief.
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-subtext max-w-[560px] text-sm sm:text-base md:text-lg font-normal leading-relaxed text-white/65 opacity-0 translate-y-4">
              From Surry Hills seed rounds to ASX-listed rebrands — the Australian studio ambitious founders and CMOs trust to build brands that earn loyalty and drive real growth.
            </p>

            {/* CTA */}
            <div className="hero-cta flex items-center flex-wrap gap-4 md:gap-5 opacity-0 translate-y-4">
              <a href="#services" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 text-brand-700 font-bold text-sm tracking-tight px-6 md:px-7 py-3 md:py-3.5 transition-all duration-300 hover:bg-brand-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(33,186,128,0.3)]">
                <span>Book an Aussie Discovery Call</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#work" className="relative inline-flex items-center text-white/75 hover:text-white font-medium text-sm py-3 md:py-3.5 transition-colors duration-300 border-b border-white/35 hover:border-white/75">
                View Our Work
              </a>
            </div>

            {/* Trust bar */}
            <div className="hero-trust flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-5 opacity-0 translate-y-4">
              <span className="text-[0.7rem] sm:text-xs font-medium tracking-wider uppercase text-white/40 whitespace-nowrap shrink-0">Trusted by teams at</span>
              <div className="flex items-center flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
                {["Saltbush", "Koorang", "Harbour Co"].map((name) => (
                  <span key={name} className="text-[0.78rem] sm:text-[0.82rem] font-bold tracking-[0.1em] uppercase text-white/35 hover:text-white/65 transition-colors cursor-default">{name}</span>
                ))}
                <span className="hidden sm:inline-block text-[0.78rem] sm:text-[0.82rem] font-bold tracking-[0.1em] uppercase text-white/35 hover:text-white/65 transition-colors cursor-default">Tallow&nbsp;&amp;&nbsp;Co</span>
                <span className="hidden md:inline-block text-[0.78rem] sm:text-[0.82rem] font-bold tracking-[0.1em] uppercase text-white/35 hover:text-white/65 transition-colors cursor-default">Bushline</span>
              </div>
            </div>
          </div>

          {/* Floating contact form */}
          <div className="hero-form mt-2 lg:mt-0 flex flex-col w-full lg:w-[320px] xl:w-[360px] lg:shrink-0 rounded-2xl border border-white/10 bg-brand-ink/60 backdrop-blur-xl p-5 sm:p-6 gap-4 sm:gap-5 opacity-0 translate-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="relative w-2 h-2 rounded-full bg-brand-400 shrink-0">
                  <span className="absolute -inset-1 rounded-full bg-brand-400 opacity-30 animate-pulse-ring"></span>
                </span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400">2 slots left this quarter</span>
              </div>
              <h3 className="text-white font-bold text-xl tracking-tight mt-2">Start a project</h3>
              <p className="text-white/45 text-xs leading-relaxed mt-1">We&apos;ll reply within 1 business day, AEST.</p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/35">Name</label>
                  <input type="text" placeholder="Alex Chen" className="rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 text-sm px-3.5 py-2.5 outline-none focus:border-brand-400/50 focus:bg-brand-400/5 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/35">Email</label>
                  <input type="email" placeholder="you@co.com.au" className="rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 text-sm px-3.5 py-2.5 outline-none focus:border-brand-400/50 focus:bg-brand-400/5 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/35">I need help with</label>
                <div className="relative">
                  <select className="w-full rounded-lg border border-white/10 bg-brand-ink text-white/60 text-sm px-3.5 py-2.5 pr-9 outline-none focus:border-brand-400/50 transition-all appearance-none cursor-pointer">
                    <option value="">Select a service...</option>
                    <option value="web">Web Design &amp; Development</option>
                    <option value="social">Social Media</option>
                    <option value="ads">Paid Ads</option>
                    <option value="content">Content Creation</option>
                    <option value="multiple">Multiple services</option>
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/35">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/35">Message</label>
                <textarea rows={3} placeholder="Tell us about your project…" className="rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/20 text-sm px-3.5 py-2.5 outline-none focus:border-brand-400/50 focus:bg-brand-400/5 transition-all resize-none leading-relaxed"></textarea>
              </div>
              <button type="submit" className="group w-full flex items-center justify-center gap-2 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(33,186,128,0.35)] mt-1">
                Send enquiry
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-white/8"></div>
              <Link href="/contact" className="text-white/35 hover:text-white/65 text-[0.7rem] transition-colors shrink-0">or book a call instead →</Link>
              <div className="flex-1 h-px bg-white/8"></div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="hero-stats absolute left-0 right-0 bottom-0 z-[2] flex items-center px-6 sm:px-10 md:px-16 py-5 md:py-6 bg-gradient-to-t from-brand-600/90 to-transparent backdrop-blur-sm opacity-0 translate-y-5 max-sm:grid max-sm:grid-cols-2 max-sm:gap-4 max-sm:bg-brand-600/90">
          {[
            { target: "150", suffix: "+", label: "Aussie Brands Built" },
            { target: "8", suffix: "+", label: "Years Across ANZ" },
            { target: "98", suffix: "%", label: "Client Retention" },
            { target: "40", suffix: "+", label: "AGDA & AWARD Wins" },
          ].map(({ target, suffix, label }, i) => (
            <div key={label} className={`stat flex-1 flex flex-col gap-1 max-sm:px-3${i > 0 ? " max-sm:border-l max-sm:border-white/10" : ""}${i >= 2 ? " max-sm:border-t max-sm:border-white/10 max-sm:pt-4" : ""}`}>
              {i > 0 && <div className="stat-divider w-px h-10 bg-white/10 mx-4 md:mx-10 max-sm:hidden hidden sm:block"></div>}
              <div className="flex items-baseline gap-[2px] leading-none">
                <span className="stat-number text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-none" data-target={target}>0</span>
                <span className="text-xl md:text-2xl font-extrabold text-brand-400 tracking-tight leading-none">{suffix}</span>
              </div>
              <span className="text-[0.65rem] md:text-xs font-medium tracking-wide uppercase text-white/45 mt-1">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative w-full py-24 md:py-36 px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden">
        <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-400/5 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-500/10 blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="services-eyebrow flex items-center gap-2.5 mb-6 opacity-0 translate-y-3">
                <span className="w-8 h-px bg-brand-400"></span>
                <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">What We Do · For Aussie Teams</span>
              </div>
              <h2 className="services-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white opacity-0 translate-y-4">
                Four disciplines.<br />
                <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">One growth engine.</span>
              </h2>
            </div>
            <p className="services-intro max-w-md text-white/60 text-base md:text-lg leading-relaxed opacity-0 translate-y-4">
              Design, content, and media that actually compound — built for the Australian market and delivered in your timezone, no offshore hand-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {[
              {
                href: "/services#web", num: "01",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 9h20" /><path d="m9 14 2 2 4-4" /></svg>,
                title: "Web Design & Development",
                desc: "Fast, considered sites and product experiences that turn visitors into customers.",
              },
              {
                href: "/services#social", num: "02",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
                title: "Social Media",
                desc: "Feeds, stories, and community that build real followings — not vanity metrics.",
              },
              {
                href: "/services#ads", num: "03",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
                title: "Paid Ads",
                desc: "Meta, Google, TikTok — performance campaigns where every dollar is accountable.",
              },
              {
                href: "/services#content", num: "04",
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 7 16 12l7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" /></svg>,
                title: "Content Creation",
                desc: "Photo, video, and copy your audience stops scrolling for — shot on location across AU.",
              },
            ].map(({ href, num, icon, title, desc }) => (
              <Link key={num} href={href} className="service-card group relative flex flex-col gap-6 p-8 md:p-10 bg-brand-ink transition-colors duration-500 hover:bg-brand-700/40 opacity-0 translate-y-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-400/10 border border-brand-400/20 text-brand-400 transition-all duration-500 group-hover:bg-brand-400 group-hover:text-brand-700 group-hover:-translate-y-1">
                  {icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
                  <p className="text-white/55 leading-relaxed text-[0.95rem]">{desc}</p>
                </div>
                <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-brand-400 mt-auto opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-2 group-hover:translate-x-0">
                  Learn more <ArrowRight size={14} />
                </span>
                <span className="absolute top-8 right-8 text-xs font-mono text-white/20">{num}</span>
              </Link>
            ))}
          </div>

          <div className="services-cta mt-16 md:mt-20 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-10 border-t border-white/5 opacity-0 translate-y-4">
            <p className="text-white/60 text-base md:text-lg max-w-md">Not sure which service you need? Let&apos;s figure it out together.</p>
            <a href="#contact" className="group inline-flex items-center gap-2.5 rounded-full bg-white/5 hover:bg-brand-400 border border-white/10 hover:border-brand-400 text-white hover:text-brand-700 font-semibold text-sm px-7 py-3.5 transition-all duration-300 w-fit">
              <span>Book a discovery call</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section id="work" className="relative w-full py-24 md:py-36 px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
            <div className="max-w-3xl">
              <div className="work-eyebrow flex items-center gap-2.5 mb-6 opacity-0 translate-y-3">
                <span className="w-8 h-px bg-brand-400"></span>
                <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Selected Work</span>
              </div>
              <h2 className="work-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white opacity-0 translate-y-4">
                Aussie brands we&apos;ve helped<br className="hidden md:block" />
                <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">build belief in.</span>
              </h2>
            </div>
            <Link href="/work" className="work-viewall group inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-brand-400 transition-colors opacity-0 translate-y-4">
              <span>View all work</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-20 md:gap-28">
            {/* Project 01 — Aura */}
            <article className="project group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <Link href="/work" className="block md:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-700 via-brand-500 to-brand-400 cursor-pointer">
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/15"></div>
                <div className="absolute -top-10 -right-10 w-60 h-60 rounded-full border border-white/10"></div>
                <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-brand-300/30 blur-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[18vw] md:text-[11rem] font-black tracking-tighter text-white/90 leading-none select-none">Aura</span>
                </div>
                <div className="absolute inset-0 bg-brand-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View case study <ArrowRight size={14} /></span>
                </div>
              </Link>
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                  <span>01</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Sydney Fintech · ASX · 2024</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Aura</h3>
                <p className="text-white/60 leading-relaxed text-base md:text-lg">Rebuilding trust in Aussie digital banking through a calm, human-first identity system that scaled across every mainland capital and APRA-licensed touchpoint.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Strategy", "Identity", "Product"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/60">{tag}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* Project 02 — Meridian */}
            <article className="project group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <div className="md:col-span-5 md:order-1 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                  <span>02</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Hospitality · Byron &amp; Hobart · 2024</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Meridian</h3>
                <p className="text-white/60 leading-relaxed text-base md:text-lg">A launch identity for a boutique hotel group across Byron Bay and Hobart, pairing timeless typography with warm, coastal art direction.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Branding", "Print", "Web"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/60">{tag}</span>
                  ))}
                </div>
              </div>
              <Link href="/work" className="block md:col-span-7 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-zinc-900 via-brand-700 to-zinc-800 cursor-pointer">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(245,158,11,0.35)_0%,transparent_45%)]"></div>
                <div className="absolute left-8 top-8 flex flex-col gap-1 text-amber-200/50 text-[0.65rem] tracking-[0.2em] uppercase">
                  <span>— Est. 2024</span><span>— 14 Suites</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[18vw] md:text-[11rem] font-black italic tracking-tighter text-amber-100/95 leading-none select-none">M</span>
                </div>
                <div className="absolute bottom-8 right-8 w-16 h-px bg-amber-200/40"></div>
                <div className="absolute inset-0 bg-brand-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View case study <ArrowRight size={14} /></span>
                </div>
              </Link>
            </article>

            {/* Project 03 — Forge */}
            <article className="project group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <Link href="/work" className="block md:col-span-7 relative aspect-[4/3] rounded-2xl overflow-hidden bg-brand-ink cursor-pointer">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(33,186,128,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(33,186,128,0.12)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_40%,rgba(33,186,128,0.2)_40%,rgba(33,186,128,0.2)_50%,transparent_50%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[18vw] md:text-[11rem] font-black tracking-tighter text-brand-400 leading-none select-none">F<span className="text-white">:</span></span>
                </div>
                <div className="absolute bottom-8 left-8 text-brand-400/70 text-[0.65rem] tracking-[0.2em] uppercase font-mono">&lt;forge/&gt; v2.0</div>
                <div className="absolute inset-0 bg-brand-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View case study <ArrowRight size={14} /></span>
                </div>
              </Link>
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                  <span>03</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Melbourne Dev Tools · 2023</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Forge</h3>
                <p className="text-white/60 leading-relaxed text-base md:text-lg">Positioning a Melbourne dev-tools startup from Blackbird-backed Series A to category leader — voice, site, and a docs system built to convert Aussie and US engineers alike.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Positioning", "Web", "Motion"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/60">{tag}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* Project 04 — Clarity */}
            <article className="project group grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <div className="md:col-span-5 md:order-1 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-mono text-white/40">
                  <span>04</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Medicare Telehealth · 2023</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Clarity</h3>
                <p className="text-white/60 leading-relaxed text-base md:text-lg">A patient-first rebrand for a Medicare-integrated telehealth platform — trading clinical coldness for warmth across every bulk-billed consult, pamphlet, and phone call from Cairns to Perth.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Strategy", "Identity", "Campaign"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/60">{tag}</span>
                  ))}
                </div>
              </div>
              <Link href="/work" className="block md:col-span-7 md:order-2 relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-50 via-brand-100 to-brand-200 cursor-pointer">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square rounded-full border-[12px] border-brand-500/25"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] aspect-square rounded-full bg-brand-500/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[16vw] md:text-[9rem] font-black tracking-tighter text-brand-700 leading-none select-none">clarity.</span>
                </div>
                <div className="absolute top-8 left-8 text-brand-700/70 text-[0.65rem] tracking-[0.2em] uppercase font-semibold">Care, clearly.</div>
                <div className="absolute inset-0 bg-brand-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View case study <ArrowRight size={14} /></span>
                </div>
              </Link>
            </article>
          </div>

          <div className="work-footer mt-20 md:mt-28 flex flex-col md:flex-row md:items-center md:justify-between gap-6 pt-10 border-t border-white/5 opacity-0 translate-y-4">
            <p className="text-white/40 text-sm"><span className="text-white font-semibold">150+</span> Australian brands transformed since 2017. ABN 88 612 334 901.</p>
            <Link href="/work" className="group inline-flex items-center gap-2.5 text-sm font-semibold text-white hover:text-brand-400 transition-colors">
              <span>Explore the full archive</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="relative w-full py-24 md:py-36 px-6 sm:px-10 md:px-16 bg-brand-700 overflow-hidden border-t border-white/5">
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-brand-400/5 blur-3xl"></div>
        <div className="pointer-events-none absolute top-20 right-8 md:right-24 select-none">
          <svg width="240" height="240" viewBox="0 0 240 240" fill="none" className="text-brand-400/8">
            <path d="M60 140 Q60 80 120 80 L120 100 Q80 100 80 140 L100 140 L100 180 L60 180 Z M140 140 Q140 80 200 80 L200 100 Q160 100 160 140 L180 140 L180 180 L140 180 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16 md:mb-20">
            <div className="tm-eyebrow flex items-center gap-2.5 mb-6 opacity-0 translate-y-3">
              <span className="w-8 h-px bg-brand-400"></span>
              <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Client Voices</span>
            </div>
            <h2 className="tm-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white opacity-0 translate-y-4">
              Aussie founders,<br className="hidden md:block" />
              <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">in their own words.</span>
            </h2>
          </div>

          {/* Featured testimonial */}
          <div className="tm-featured relative rounded-3xl border border-white/10 bg-gradient-to-br from-brand-600/60 to-brand-700 backdrop-blur-sm p-8 md:p-14 mb-16 md:mb-20 overflow-hidden opacity-0 translate-y-6">
            <div className="absolute top-6 left-8 md:top-10 md:left-12 text-brand-400/50 text-7xl md:text-8xl font-serif leading-none select-none">&ldquo;</div>
            <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-12 md:pt-8">
              <blockquote className="md:col-span-8 text-xl sm:text-2xl md:text-3xl lg:text-[2.15rem] font-semibold leading-[1.3] tracking-tight text-white">
                BrandMates didn&apos;t just rebrand us — they rebuilt how we show up across Australia. Our whole team thinks differently now, and the market noticed the week we relaunched.
              </blockquote>
              <div className="md:col-span-4 flex flex-col gap-8 justify-between">
                <div className="flex items-center gap-4">
                  <div className="shrink-0 w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-brand-300 flex items-center justify-center font-bold text-brand-700 text-lg">SM</div>
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-base">Sarah Mitchell</span>
                    <span className="text-white/50 text-sm">Head of Brand, Aura Financial · Sydney</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  {[{ val: "+340%", label: "Aussie Signups" }, { val: "+12pts", label: "NPS" }, { val: "A$58M", label: "Series B" }].map(({ val, label }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="text-2xl md:text-3xl font-extrabold text-brand-400 tracking-tight leading-none">{val}</span>
                      <span className="text-[0.65rem] text-white/50 tracking-wider uppercase">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Smaller testimonial grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            {[
              { initials: "MH", gradient: "from-brand-500 to-brand-400", quote: '"The most strategic brand partner we\'ve worked with — Aussie or international. Full stop. They treated our Melbourne launch like it was their own."', name: "Mitch Harrington", role: "CEO, Forge · Melbourne" },
              { initials: "EP", gradient: "from-amber-400 to-amber-200", quote: '"They get it. They really get the Aussie market. Rare in this industry — and worth every dollar we invested in the partnership."', name: "Erin Patel", role: "VP Marketing, Meridian · Byron Bay" },
              { initials: "JW", gradient: "from-brand-300 to-brand-100", quote: '"Our brand equity doubled in 18 months across every Aussie state we operate in. That\'s not marketing talk — that\'s what Roy Morgan research said."', name: "Jemma Wakefield", role: "CMO, Clarity · Brisbane" },
            ].map(({ initials, gradient, quote, name, role }) => (
              <figure key={initials} className="tm-card group relative flex flex-col gap-6 p-8 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-500 opacity-0 translate-y-6">
                <FiveStars />
                <blockquote className="text-white/85 leading-relaxed text-base md:text-[1.05rem]">{quote}</blockquote>
                <figcaption className="flex items-center gap-3 mt-auto pt-6 border-t border-white/5">
                  <div className={`shrink-0 w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-brand-700 text-sm`}>{initials}</div>
                  <div className="flex flex-col">
                    <span className="text-white font-semibold text-sm">{name}</span>
                    <span className="text-white/45 text-xs">{role}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Trust strip */}
          <div className="tm-stats flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-4 p-8 md:p-10 rounded-2xl border border-white/10 bg-gradient-to-r from-brand-600/40 via-transparent to-brand-600/40 opacity-0 translate-y-4">
            <div className="flex items-center gap-4">
              <FiveStars size={18} />
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">4.9 out of 5</span>
                <span className="text-white/50 text-xs">Average rating across 120+ Aussie reviews</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-12 bg-white/10"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
              {[{ val: "98%", label: "Referral rate" }, { val: "12yr", label: "Avg. retention" }, { val: "A$3.2B", label: "Client valuations" }].map(({ val, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-white font-extrabold text-2xl">{val}</span>
                  <span className="text-white/50 text-xs tracking-wider uppercase">{label}</span>
                </div>
              ))}
            </div>
            <a href="#testimonials" className="group hidden lg:inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-6 py-3 transition-all">
              <span>Read all reviews</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="relative w-full py-24 md:py-36 px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden border-t border-white/5">
        <div className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-400/5 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <div className="pr-eyebrow flex items-center gap-2.5 mb-6 opacity-0 translate-y-3">
                <span className="w-8 h-px bg-brand-400"></span>
                <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">How We Work</span>
              </div>
              <h2 className="pr-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white opacity-0 translate-y-4">
                From g&apos;day to market <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">in 12 weeks.</span>
              </h2>
            </div>
            <p className="pr-intro max-w-md text-white/60 text-base md:text-lg leading-relaxed opacity-0 translate-y-4">
              A proven four-phase process honed on 150+ Australian brands — so you always know what&apos;s next, who&apos;s doing what, and when to expect it, in your timezone.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"></div>
            <div className="md:hidden absolute top-0 bottom-0 left-8 w-px bg-white/10"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {[
                { num: "01", week: "Week 1–2", title: "Discover", desc: "We immerse ourselves in your business, audience, and market. Strategy starts with listening — hard.", items: ["Stakeholder interviews", "Competitive audit", "Customer research"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>, highlight: false },
                { num: "02", week: "Week 3–4", title: "Define", desc: "We distill everything into a clear strategic foundation — the why before the what, the story before the style.", items: ["Positioning & story", "Voice & tone", "Brand architecture"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z" /></svg>, highlight: false },
                { num: "03", week: "Week 5–9", title: "Design", desc: "Every visual decision reinforces the strategy. Nothing is decorative. No stray pixels.", items: ["Identity system", "Typography & color", "Touchpoint design"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><path d="M15.5 3.5l5 5M3 21v-4.5L17 2.5l4.5 4.5L7.5 21z" /></svg>, highlight: false },
                { num: "04", week: "Week 10–12", title: "Deploy", desc: "We hand over a brand your team can run with — tools, templates, and the tribal knowledge to keep it alive.", items: ["Rollout & launch", "Team training", "Governance & ongoing care"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><path d="M5 12l5 5L20 7" /></svg>, highlight: true },
              ].map(({ num, week, title, desc, items, icon, highlight }) => (
                <div key={num} className="pr-step relative pl-24 md:pl-0 opacity-0 translate-y-6">
                  <div className={`absolute md:static left-0 top-0 w-16 h-16 rounded-full flex items-center justify-center ${highlight ? "bg-brand-400 border border-brand-400 shadow-[0_0_24px_rgba(33,186,128,0.4)]" : "bg-brand-ink border border-brand-400/30"}`}>
                    <span className={`font-mono font-bold text-sm tracking-wider ${highlight ? "text-brand-700" : "text-brand-400"}`}>{num}</span>
                  </div>
                  <div className="md:mt-10 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-1">
                      {icon}
                      <span className="text-[0.7rem] font-medium tracking-[0.08em] uppercase text-white/40">{week}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">{title}</h3>
                    <p className="text-white/55 leading-relaxed text-[0.95rem]">{desc}</p>
                    <ul className="flex flex-col gap-1.5 mt-2 text-xs text-white/40">
                      {items.map((item) => (
                        <li key={item} className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-brand-400"></span>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pr-footer mt-20 md:mt-28 flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.02] opacity-0 translate-y-4">
            <div className="flex items-start gap-4 max-w-xl">
              <div className="shrink-0 w-10 h-10 rounded-full bg-brand-400/10 border border-brand-400/30 flex items-center justify-center text-brand-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-white font-bold text-base">Not every Aussie brand fits a 12-week box.</h4>
                <p className="text-white/55 text-sm leading-relaxed">ASX-listed transformations and trans-Tasman rebrands can run 3–6 months. We scope every engagement in AUD before we quote it — no surprises, no offshore sticker shock.</p>
              </div>
            </div>
            <a href="#contact" className="group shrink-0 inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(33,186,128,0.3)] w-fit">
              <span>Book a discovery call</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="team" className="relative w-full py-24 md:py-36 px-6 sm:px-10 md:px-16 bg-brand-700 overflow-hidden border-t border-white/5">
        <div className="pointer-events-none absolute -top-40 -right-20 w-[420px] h-[420px] rounded-full bg-brand-400/5 blur-[120px]"></div>
        <div className="pointer-events-none absolute -bottom-40 -left-20 w-[420px] h-[420px] rounded-full bg-brand-300/5 blur-[120px]"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-16 md:mb-20">
            <div className="lg:col-span-7">
              <div className="team-eyebrow opacity-0 translate-y-4 flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-brand-400"></span>
                <span className="text-brand-300 text-xs font-semibold uppercase tracking-[0.2em]">Meet the Mates</span>
              </div>
              <h2 className="team-heading opacity-0 translate-y-6 text-white font-bold leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
                Small team.<br />
                <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300 bg-clip-text text-transparent">Six capital cities.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 lg:pt-6">
              <p className="team-intro opacity-0 translate-y-6 text-white/60 text-base md:text-lg leading-relaxed max-w-md">
                Six senior Aussies (plus two Aussie-by-choice). No juniors thrown at your account, no offshore hand-offs. Every project runs AEST/AEDT with the mates whose names you read below.
              </p>
              <div className="team-intro opacity-0 translate-y-6 flex gap-6 mt-8 pt-8 border-t border-white/10">
                {[{ val: "6", label: "Senior leads" }, { val: "14yrs", label: "Avg. experience" }, { val: "0", label: "Account managers" }].map(({ val, label }, i) => (
                  <div key={label} className={`flex flex-col${i > 0 ? " pl-6 border-l border-white/10" : ""}`}>
                    <div className="text-2xl font-bold text-white">{val}</div>
                    <div className="text-xs text-white/50 uppercase tracking-wider mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
            {[
              { initials: "NA", gradient: "from-brand-400 via-brand-500 to-brand-700", radial: "circle_at_30%_20%", badge: "Founder", name: "Noa Akerman", role: "Brand Strategy · Founder", bio: "Built positioning for two ASX-listed unicorns before 30. Ex-Atlassian. Thinks in narratives, not decks.", city: "Sydney", socials: ["li", "tw"] },
              { initials: "RC", gradient: "from-orange-400 via-rose-500 to-purple-700", radial: "circle_at_70%_30%", badge: "Creative", name: "Rio Castellanos", role: "Creative Director", bio: "Ex-Interbrand Sydney. The reason our work ends up in Desktop magazine and Brand New twice a year.", city: "Melbourne", socials: ["li", "ig"] },
              { initials: "YT", gradient: "from-sky-300 via-indigo-500 to-slate-900", radial: "circle_at_20%_80%", badge: "Design", name: "Yuki Takamura", role: "Design Principal", bio: "Typography obsessive. A decade at The Saturday Paper before trading print for product.", city: "Brisbane", socials: ["li", "pi"] },
              { initials: "DM", gradient: "from-emerald-300 via-teal-600 to-gray-900", radial: "circle_at_50%_10%", badge: "Engineering", name: "Dev Malhotra", role: "Head of Engineering", bio: "Ex-Canva engineer. Ships design systems Aussie devs actually use. Will fight you about animation curves over a long black.", city: "Gold Coast", socials: ["li", "gh"] },
              { initials: "SL", gradient: "from-amber-300 via-red-500 to-black", radial: "circle_at_80%_70%", badge: "Motion", name: "Simone Laurent", role: "Motion & Film Director", bio: "AACTA winner, Cannes Lion twice. Turns Aussie brand launches into films people actually screenshot.", city: "Perth", socials: ["li", "yt"] },
              { initials: "PI", gradient: "from-pink-300 via-fuchsia-500 to-brand-600", radial: "circle_at_40%_40%", badge: "Partnership", name: "Priya Iyer", role: "Client Partner", bio: "Your single point of contact. Operated in-house at two ASX-IPO'd Aussie scale-ups — speaks founder fluently.", city: "Adelaide", socials: ["li", "tw"] },
            ].map(({ initials, gradient, radial, badge, name, role, bio, city }) => (
              <div key={initials} className="team-card opacity-0 translate-y-6 group relative bg-brand-700 p-8 md:p-10 hover:bg-brand-ink/60 transition-colors duration-500">
                <div className={`relative aspect-square w-full mb-6 rounded-2xl overflow-hidden bg-gradient-to-br ${gradient}`}>
                  <div className={`absolute inset-0 bg-[radial-gradient(${radial},rgba(255,255,255,0.25),transparent_50%)]`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/95 font-black text-7xl md:text-8xl tracking-tighter drop-shadow-lg">{initials}</span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold uppercase tracking-wider">{badge}</div>
                </div>
                <h3 className="text-white font-bold text-xl md:text-2xl">{name}</h3>
                <p className="text-brand-300 text-sm font-medium mt-1">{role}</p>
                <p className="text-white/50 text-sm leading-relaxed mt-4">{bio}</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white/40 uppercase tracking-wider">{city}</span>
                  <div className="flex gap-2">
                    <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-400 hover:text-brand-700 text-white/60 flex items-center justify-center transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>
                    </a>
                    <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-400 hover:text-brand-700 text-white/60 flex items-center justify-center transition-all duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" /></svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Principles strip */}
          <div className="team-principles opacity-0 translate-y-6 mt-16 md:mt-20 rounded-3xl border border-white/10 bg-brand-ink/40 backdrop-blur-sm p-8 md:p-12">
            <div className="grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-start">
              <div className="flex items-center gap-3">
                <span className="w-8 h-px bg-brand-400"></span>
                <span className="text-brand-300 text-xs font-semibold uppercase tracking-[0.2em] whitespace-nowrap">How we operate</span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { num: "01", title: "Senior-only, Aussie-only", desc: "No juniors, no offshore studios. The people who pitch you do the work from Sydney and Melbourne." },
                  { num: "02", title: "Two projects a quarter", desc: "Max two engagements per quarter. You get focus, not a queue of 40 other accounts." },
                  { num: "03", title: "Fixed scope, fixed AUD fee", desc: "Projects quoted in AUD, ex-GST. Your CFO will appreciate zero USD surprises." },
                  { num: "04", title: "Open by default", desc: "Shared Figma, shared Linear, shared Slack on AEST hours. You see the work as it's made." },
                ].map(({ num, title, desc }) => (
                  <div key={num}>
                    <div className="text-brand-400 font-bold text-2xl mb-2">{num}</div>
                    <h4 className="text-white font-semibold text-base mb-1.5">{title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative w-full py-24 md:py-36 px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden border-t border-white/5">
        <div className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-brand-400/5 blur-[140px]"></div>
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 md:mb-20">
            <div className="lg:col-span-5">
              <div className="faq-eyebrow opacity-0 translate-y-4 flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-brand-400"></span>
                <span className="text-brand-300 text-xs font-semibold uppercase tracking-[0.2em]">Questions, answered</span>
              </div>
              <h2 className="faq-heading opacity-0 translate-y-6 text-white font-bold leading-[1.02] tracking-tight" style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}>
                Before you<br />
                <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300 bg-clip-text text-transparent">shoot us a DM.</span>
              </h2>
              <p className="faq-intro opacity-0 translate-y-6 text-white/55 text-base md:text-lg leading-relaxed mt-8 max-w-sm">
                The questions we get most often from Aussie founders and CMOs in your exact seat.
              </p>
              <div className="faq-intro opacity-0 translate-y-6 mt-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs text-brand-300 uppercase tracking-wider font-semibold mb-3">Still unsure? Give us a bell.</div>
                <p className="text-white/70 text-sm leading-relaxed mb-4">Book a 20-minute no-pitch call on AEST hours. We&apos;ll tell you honestly whether we&apos;re the right fit — and point you to another Aussie studio if we aren&apos;t.</p>
                <a href="#contact" className="group inline-flex items-center gap-2 text-white hover:text-brand-300 font-semibold text-sm transition-colors">
                  <span>Book the call</span>
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-white/10 border-y border-white/10">
                {[
                  { num: "01", q: "How much does a project cost?", a: <>Most full brand engagements fall between <span className="text-white font-medium">A$95k and A$320k ex-GST</span>, scoped as a fixed fee in AUD. Visual identity–only projects start around A$55k; full platform work (brand + site + launch film) can go higher. We quote after a 30-minute discovery call — no obligation, no overseas pricing games.</> },
                  { num: "02", q: "What's a typical timeline from kickoff to launch?", a: <>Our default rhythm is <span className="text-white font-medium">12 weeks</span> across Discover → Define → Design → Deploy — planned around EOFY, Christmas shutdown and AFL/NRL season pressures if relevant. Faster sprints (6–8 weeks) are possible; ASX-listed rebrands and APAC rollouts stretch to 4–6 months. We lock the schedule before you sign.</> },
                  { num: "03", q: "Do you work with early-stage startups or only enterprise?", a: <>Both. Our sweet spot is <span className="text-white font-medium">Blackbird / Square Peg / AirTree-backed Series A–C companies</span> and pre-ASX-IPO rebrands, but we take on a small number of seed-stage Aussie founders each year when the category excites us. We don&apos;t work with pre-product startups or personal brands.</> },
                  { num: "04", q: "We already have an in-house design team. How does that work?", a: <>Most of our Aussie clients have great in-house teams. We partner on the <span className="text-white font-medium">heavy-lift moments</span> — repositioning, new-state or trans-Tasman launches, rebrands — and build systems your team can run afterward from the Domain or Atlassian office. Shared Figma and Linear from day one; no black boxes.</> },
                  { num: "05", q: "Do you offer retainers or ongoing work?", a: <>Not in the traditional "X hours a month" sense. After launch we offer a <span className="text-white font-medium">quarterly partnership</span> — scoped around campaigns, new launches, or system expansion — for clients who want us on deck without a full re-engagement. Flat fee, defined deliverables.</> },
                  { num: "06", q: "Who actually owns the work — us or you?", a: <><span className="text-white font-medium">You own everything.</span> IP transfers on final invoice — files, fonts (where licensing permits), source code, the lot. We keep the right to showcase the work in our portfolio unless you ask us not to, which some clients do and we respect.</> },
                  { num: "07", q: "How do you handle NDAs and confidentiality?", a: <>Happy to sign a mutual NDA before the first call. We have a <span className="text-white font-medium">standard Australian-law NDA ready</span> (governed by NSW or VIC) that most legal teams approve without edits, or we can redline yours. Most of our work is under wraps until launch.</> },
                ].map(({ num, q, a }) => (
                  <details key={num} className="faq-item opacity-0 translate-y-4 group py-6 md:py-7">
                    <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                      <div className="flex items-start gap-5">
                        <span className="text-brand-400 font-bold text-sm mt-0.5 shrink-0 tabular-nums">{num}</span>
                        <h3 className="text-white font-semibold text-lg md:text-xl leading-snug group-hover:text-brand-300 transition-colors">{q}</h3>
                      </div>
                      <span className="shrink-0 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 transition-all duration-300 group-open:bg-brand-400 group-open:border-brand-400 group-open:text-brand-700">
                        <span className="relative block w-3.5 h-3.5">
                          <span className="absolute top-1/2 left-0 right-0 h-[1.75px] bg-current -translate-y-1/2 rounded-full"></span>
                          <span className="absolute left-1/2 top-0 bottom-0 w-[1.75px] bg-current -translate-x-1/2 rounded-full transition-transform duration-300 ease-out group-open:scale-y-0"></span>
                        </span>
                      </span>
                    </summary>
                    <div className="pl-10 pr-12 pt-4 text-white/60 text-sm md:text-base leading-relaxed">{a}</div>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative w-full py-28 md:py-40 px-6 sm:px-10 md:px-16 overflow-hidden bg-brand-700 border-t border-white/5">
        <div className="pointer-events-none absolute -top-40 -left-20 w-[600px] h-[600px] rounded-full bg-brand-400/10 blur-[140px]"></div>
        <div className="pointer-events-none absolute -bottom-40 -right-20 w-[600px] h-[600px] rounded-full bg-brand-300/5 blur-[140px]"></div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-black tracking-tighter text-white/[0.025] whitespace-nowrap" style={{ fontSize: "clamp(10rem, 22vw, 22rem)" }}>hello.</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
            <div className="contact-eyebrow opacity-0 translate-y-4 inline-flex items-center gap-3 mb-8 px-4 py-1.5 rounded-full border border-brand-400/40 bg-brand-400/10">
              <span className="relative flex w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-brand-400 animate-pulse-ring"></span>
                <span className="relative rounded-full w-2 h-2 bg-brand-400"></span>
              </span>
              <span className="text-brand-300 text-[0.7rem] font-semibold uppercase tracking-[0.2em]">Booking Q2 · 2 slots left</span>
            </div>
            <h2 className="contact-heading opacity-0 translate-y-6 text-white font-bold leading-[0.98] tracking-[-0.03em]" style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}>
              Let&apos;s build something<br />
              <span className="bg-gradient-to-r from-brand-300 via-brand-400 to-brand-300 bg-clip-text text-transparent italic">the market remembers.</span>
            </h2>
            <p className="contact-intro opacity-0 translate-y-6 text-white/60 text-base md:text-xl leading-relaxed mt-8 max-w-2xl mx-auto">
              A 20-minute chat. No pitch deck, no sales pressure — just an honest read on whether we&apos;re the right Aussie studio for your next brand move.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-14 md:mb-20">
            <Link href="/contact" className="contact-card opacity-0 translate-y-6 group relative overflow-hidden rounded-3xl p-8 md:p-10 bg-gradient-to-br from-brand-400 to-brand-300 text-brand-700 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_80px_-20px_rgba(33,186,128,0.5)]">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-8 h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-brand-700/15 text-brand-700 text-[0.65rem] font-bold uppercase tracking-[0.15em]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    <span>Recommended</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-700 text-brand-400 flex items-center justify-center transition-transform duration-500 group-hover:rotate-[-45deg]">
                    <ArrowRight size={18} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05] mb-3">Book a discovery call</h3>
                  <p className="text-brand-700/75 text-base leading-relaxed max-w-sm">20 min · with Priya, our client partner. Zoom or at our Surry Hills studio — your call.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-brand-700/15 grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-700/55 mb-1">Next Slot</div>
                    <div className="text-brand-700 font-bold text-sm">Wed 23 Apr · 10:00 AEST</div>
                  </div>
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-700/55 mb-1">Response Time</div>
                    <div className="text-brand-700 font-bold text-sm">&lt; 4 business hours</div>
                  </div>
                </div>
              </div>
            </Link>

            <a href="mailto:studio@brandmates.com.au" className="contact-card opacity-0 translate-y-6 group relative overflow-hidden rounded-3xl p-8 md:p-10 bg-brand-ink/70 border border-white/10 hover:border-brand-400/40 transition-all duration-500 hover:-translate-y-1 hover:bg-brand-ink">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-brand-400/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-8 h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-white/5 text-white/55 text-[0.65rem] font-bold uppercase tracking-[0.15em] border border-white/10">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16v16H4z" /><path d="m4 4 8 8 8-8" /></svg>
                    <span>Old-school email</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 flex items-center justify-center transition-all duration-500 group-hover:bg-brand-400 group-hover:border-brand-400 group-hover:text-brand-700 group-hover:rotate-[-45deg]">
                    <ArrowRight size={18} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05] mb-3 text-white">Send us a brief</h3>
                  <p className="text-white/55 text-base leading-relaxed max-w-sm">Already know what you need? Drop us a line with timing, scope, and budget range.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-white/10">
                  <div className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-white/40 mb-2">Direct line</div>
                  <div className="flex items-center gap-2 text-brand-300 group-hover:text-brand-400 font-bold text-lg md:text-xl transition-colors">
                    <span>studio@brandmates.com.au</span>
                    <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </a>
          </div>

          <div className="contact-offices opacity-0 translate-y-6 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            {[
              { label: "Sydney HQ", addr: "Level 3, 56 Foveaux St\nSurry Hills NSW 2010", phone: "+61 2 8234 5678", tel: "+61282345678" },
              { label: "Melbourne Studio", addr: "Suite 12, 112 Brunswick St\nFitzroy VIC 3065", phone: "+61 3 9432 1234", tel: "+61394321234" },
            ].map(({ label, addr, phone, tel }) => (
              <div key={label} className="bg-brand-700/70 p-6 md:p-8">
                <div className="flex flex-col xs:flex-row items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-300 mb-2">{label}</div>
                    <div className="text-white font-bold text-lg leading-snug whitespace-pre-line">{addr}</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-400/15 text-brand-300 text-[0.6rem] font-bold uppercase tracking-wider self-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400"></span>
                    <span>Open now</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <a href={`tel:${tel}`} className="text-white/70 hover:text-brand-300 transition-colors">{phone}</a>
                  <span className="hidden sm:block w-px h-4 bg-white/10"></span>
                  <span className="text-white/45">Mon–Fri · 9–6 AEST</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
