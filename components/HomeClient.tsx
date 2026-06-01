"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const ArrowRight = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className={className}>
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function HomeClient() {
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { SplitText } = await import("gsap/SplitText");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(SplitText, ScrollTrigger);

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

        // Hero entrance
        const heroTl = gsap.timeline({ defaults: { ease } });
        heroTl.fromTo(".hero-badge",   from, to, 0.2);
        heroTl.fromTo(".h-inner",      { y: "110%" }, { y: "0%", duration: dur, stagger: 0.08, ease }, 0.3);
        heroTl.fromTo(".hero-subtext", from, to, 0.5);
        heroTl.fromTo(".hero-cta",     from, to, 0.6);
        heroTl.fromTo(".hero-trust",   from, to, 0.7);
        heroTl.fromTo(".hero-form",    from, to, 0.5);
        heroTl.fromTo(".hero-stats",   from, to, 0.6);

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

        // Section headers
        ([
          [".services-heading", ".services-intro"],
          [".work-heading",     ".work-viewall"  ],
          [".pr-heading",       ".pr-intro"      ],
          [".contact-heading",  ".contact-intro" ],
        ] as (string | null)[][]).forEach(([hd, extra]) => {
          if (!hd || !document.querySelector(hd)) return;
          const tl = gsap.timeline({ scrollTrigger: { trigger: hd, ...ST } });
          tl.fromTo(hd,  from, to);
          if (extra) tl.fromTo(extra, from, to, "-=0.25");
        });

        // Batched cards
        [".service-card", ".pr-step", ".contact-card"].forEach((sel) => {
          ScrollTrigger.batch(sel, {
            onEnter: (els) => gsap.fromTo(els, from, { ...to, stagger: 0.07 }),
            ...ST,
          });
        });

        // Individual blocks
        [".services-cta", ".work-footer", ".pr-footer", ".contact-offices", ".contact-badge"].forEach((sel) => {
          gsap.fromTo(sel, from, { ...to, scrollTrigger: { trigger: sel, ...ST } });
        });

        gsap.utils.toArray<HTMLElement>(".project").forEach((row) => {
          gsap.fromTo(row, from, { ...to, scrollTrigger: { trigger: row, ...ST } });
        });

        ScrollTrigger.refresh();
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero grain relative z-0 w-full min-h-svh flex flex-col justify-center overflow-hidden pt-24 md:pt-28 pb-24 md:pb-32">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(135deg,rgb(var(--surface-rgb)/0.85)_0%,rgb(var(--ink-rgb)/0.78)_50%,rgb(var(--ink-rgb)/0.55)_100%)]"></div>

        <div className="relative z-2 w-full px-6 sm:px-10 md:px-16 flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-14">
          {/* Content */}
          <div className="hero-content flex flex-col lg:flex-1 gap-5 md:gap-6">
            {/* Badge */}
            <div className="hero-badge opacity-0 translate-y-3">
              <span className="text-[0.72rem] sm:text-[0.78rem] font-medium tracking-[0.14em] uppercase text-brand-400/75">
                Australia&apos;s Brand Studio · Est. Sydney
              </span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline flex flex-col font-extrabold leading-[1.15] tracking-[-0.035em] text-white text-[2.15rem] sm:text-[2.75rem] md:text-[3.5rem] lg:text-[3rem] xl:text-[3.75rem] 2xl:text-[4.5rem]">
              <span className="h-line block overflow-hidden"><span className="h-inner block translate-y-[110%] will-change-transform">Australia&apos;s best</span></span>
              <span className="h-line block overflow-hidden"><span className="h-inner block translate-y-[110%] will-change-transform">don&apos;t just build brands.</span></span>
              <span className="h-line block overflow-hidden">
                <span className="h-inner block translate-y-[110%] will-change-transform text-brand-400">
                  They build belief.
                </span>
              </span>
            </h1>

            {/* Subtext */}
            <p className="hero-subtext max-w-140 text-sm sm:text-base md:text-lg font-normal leading-relaxed text-white/80 opacity-0 translate-y-4">
              From Surry Hills seed rounds to ASX-listed rebrands, the studio Australian founders and CMOs call when the brand needs to work harder than it does.
            </p>

            {/* CTA */}
            <div className="hero-cta flex items-center flex-wrap gap-4 md:gap-5 opacity-0 translate-y-4">
              <a href="#services" className="group inline-flex items-center gap-2.5 rounded-full bg-brand-400 text-brand-700 font-bold text-sm tracking-tight px-6 md:px-7 py-3 md:py-3.5 transition-all duration-300 hover:bg-brand-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
                <span>Book an Aussie Discovery Call</span>
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href="#work" className="relative inline-flex items-center text-white/75 hover:text-white font-medium text-sm py-3 md:py-3.5 transition-colors duration-300 border-b border-white/35 hover:border-white/75">
                View Our Work
              </a>
            </div>

            {/* Trust bar */}
            <div className="hero-trust flex flex-col gap-2.5 opacity-0 translate-y-4">
              <span className="text-[0.6rem] font-medium tracking-[0.2em] uppercase text-white/65">Trusted by Australian brands</span>
              <div className="flex flex-wrap items-center gap-y-2">
                {["Saltbush", "Koorang", "Harbour Co", "Tallow & Co", "Bushline"].map((name, i) => (
                  <span key={name} className="flex items-center">
                    {i > 0 && <span className="mx-3 text-white/15 text-[0.55rem] select-none">&#9679;</span>}
                    <span className="text-[0.73rem] font-semibold tracking-widest uppercase text-white/65 hover:text-white/85 transition-colors cursor-default">{name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Floating contact form */}
          <div className="hero-form mt-10 lg:mt-0 flex flex-col w-full lg:w-[320px] xl:w-90 lg:shrink-0 rounded-2xl border border-white/10 bg-brand-ink p-5 sm:p-6 gap-4 sm:gap-5 opacity-0 translate-y-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-brand-400 shrink-0"></span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-brand-400">2 slots left this quarter</span>
              </div>
              <h3 className="text-white font-bold text-xl tracking-tight mt-2">Start a project</h3>
              <p className="text-white/65 text-xs leading-relaxed mt-1">We&apos;ll reply within 1 business day, AEST.</p>
            </div>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="hero-name" className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/65">Name</label>
                  <input id="hero-name" type="text" placeholder="Alex Chen" className="rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/55 text-sm px-3.5 py-2.5 outline-none focus:border-brand-400/50 focus:bg-brand-400/5 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="hero-email" className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/65">Email</label>
                  <input id="hero-email" type="email" placeholder="you@co.com.au" className="rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/55 text-sm px-3.5 py-2.5 outline-none focus:border-brand-400/50 focus:bg-brand-400/5 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="hero-service" className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/65">I need help with</label>
                <div className="relative">
                  <select id="hero-service" className="w-full rounded-lg border border-white/10 bg-white/5 text-white/60 text-sm px-3.5 py-2.5 pr-9 outline-none focus:border-brand-400/50 focus:bg-brand-400/5 transition-all appearance-none cursor-pointer [&>option]:bg-zinc-900 [&>option]:text-white">
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
                <label htmlFor="hero-message" className="text-[0.6rem] font-bold uppercase tracking-[0.15em] text-white/65">Message</label>
                <textarea id="hero-message" rows={3} placeholder="Tell us about your project…" className="rounded-lg border border-white/10 bg-white/5 text-white placeholder:text-white/55 text-sm px-3.5 py-2.5 outline-none focus:border-brand-400/50 focus:bg-brand-400/5 transition-all resize-none leading-relaxed"></textarea>
              </div>
              <button type="submit" className="group w-full flex items-center justify-center gap-2 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md) mt-1">
                Send enquiry
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
            <div className="flex items-center gap-3 pt-1">
              <div className="flex-1 h-px bg-white/8"></div>
              <Link href="/contact" className="inline-flex items-center min-h-11 sm:min-h-0 text-white/55 hover:text-white/80 text-[0.7rem] transition-colors shrink-0">or book a call instead →</Link>
              <div className="flex-1 h-px bg-white/8"></div>
            </div>
          </div>
        </div>

      </section>

      {/* ── STATS ── */}
      <section className="hero-stats opacity-0 translate-y-5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 grid grid-cols-2 md:grid-cols-4">
          {[
            { target: "150", suffix: "+", label: "Aussie Brands Built" },
            { target: "8",   suffix: "+", label: "Years Across ANZ"   },
            { target: "98",  suffix: "%", label: "Client Retention"   },
            { target: "40",  suffix: "+", label: "AGDA & Award Wins"  },
          ].map(({ target, suffix, label }, i) => (
            <div key={label} className={`stat flex flex-col items-center text-center gap-2 py-8 md:py-10 px-6 md:px-10${i % 2 !== 0 ? " border-l border-white/5" : i >= 2 ? " md:border-l" : ""}${i >= 2 ? " border-t border-white/5 md:border-t-0" : ""}`}>
              <div className="flex items-end justify-center gap-0.5 leading-none">
                <span className="stat-number text-[2.5rem] md:text-5xl font-black text-white tracking-tight leading-none" data-target={target}>0</span>
                <span className="text-2xl md:text-3xl font-black text-brand-400 tracking-tight leading-none pb-1">{suffix}</span>
              </div>
              <span className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-white/65">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="relative w-full py-(--space-section) px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-(--space-head)">
            <div className="max-w-2xl">
              <h2 className="services-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white opacity-0 translate-y-4">
                Four disciplines.<br />
                <span className="text-brand-400">One studio.</span>
              </h2>
            </div>
            <p className="services-intro max-w-md text-white/75 text-base md:text-lg leading-relaxed opacity-0 translate-y-4">
              Design, content, and media built for the Australian market, delivered in your timezone by the same senior team you brief.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden">
            {[
              {
                href: "/services#web", num: "01",
                title: "Web Design & Development",
                desc: "Fast, considered sites and product experiences built to load, convert, and hold up under real Aussie traffic.",
              },
              {
                href: "/services#social", num: "02",
                title: "Social Media",
                desc: "Feeds, stories, and community that grow genuine audiences, run by Aussies who know the local calendar.",
              },
              {
                href: "/services#ads", num: "03",
                title: "Paid Ads",
                desc: "Meta, Google, TikTok, fortnightly reporting, nothing left untracked, no offshore bidding teams.",
              },
              {
                href: "/services#content", num: "04",
                title: "Content Creation",
                desc: "Photo, video, and copy shot on location across Australia, delivered ready to publish, no stock photos.",
              },
            ].map(({ href, num, title, desc }) => (
              <Link key={num} href={href} className="service-card group relative flex flex-col justify-between gap-8 p-8 md:p-10 bg-brand-ink transition-colors duration-500 hover:bg-brand-700/40 opacity-0 translate-y-6">
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl sm:text-2xl md:text-[1.7rem] font-bold text-white tracking-tight leading-snug">{title}</h3>
                  <p className="text-white/70 leading-relaxed text-[0.95rem]">{desc}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-brand-400 font-semibold text-sm opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:gap-3">
                    <span>Explore</span>
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                  <span className="text-[0.65rem] font-medium text-white/25">{num}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="services-cta mt-12 md:mt-16 opacity-0 translate-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-brand-400/20 bg-linear-to-br from-brand-400/8 via-transparent to-transparent p-8 md:p-12">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_0%_50%,rgb(var(--accent-rgb)/0.12),transparent_60%)]"></div>
              <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="max-w-xl">
                  <p className="text-brand-400 text-xs font-bold uppercase tracking-[0.15em] mb-3">Not sure where to start?</p>
                  <h3 className="text-white font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-[1.1] mb-4">
                    20 minutes. We&apos;ll tell you exactly<br className="hidden sm:block" /> which service fits.
                  </h3>
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 mt-5">
                    {["No pitch deck", "AEST hours", "Honest advice", "Free of charge"].map((pill) => (
                      <span key={pill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 shrink-0"></span>
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <a href="#contact" className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
                    <span>Book a discovery call</span>
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <p className="text-white/30 text-xs text-center">Reply within 1 business day · AEST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section id="work" className="relative w-full py-(--space-section) px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-(--space-head)">
            <div className="max-w-3xl">
              <h2 className="work-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white opacity-0 translate-y-4">
                Work we&apos;re proud<span className="text-white">&nbsp;to</span><br className="hidden md:block" />
                <span className="text-white">put our name on.</span>
              </h2>
            </div>
            <Link href="/work" className="work-viewall group inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-brand-400 transition-colors opacity-0 translate-y-4">
              <span>View all work</span>
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-12 md:gap-24">
            {/* Project 01, Aura */}
            <article className="project grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <Link href="/work/aura" className="group block md:col-span-7 relative aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-brand-700 via-brand-500 to-brand-400 cursor-pointer">
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
                <div className="flex items-center gap-3 text-xs font-medium text-white/55">
                  <span>01</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Sydney Fintech · ASX · 2024</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Aura</h3>
                <p className="text-white/75 leading-relaxed text-base md:text-lg">A full identity system for an Aussie digital bank, built calm enough to reassure nervous first-time investors, robust enough for every APRA-licensed touchpoint across five capitals.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Strategy", "Identity", "Product"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/75">{tag}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* Project 02, Meridian */}
            <article className="project grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <div className="order-2 md:col-span-5 md:order-1 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-medium text-white/55">
                  <span>02</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Hospitality · Byron &amp; Hobart · 2024</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Meridian</h3>
                <p className="text-white/75 leading-relaxed text-base md:text-lg">A launch identity for a boutique hotel group across Byron Bay and Hobart, pairing timeless typography with warm, coastal art direction.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Branding", "Print", "Web"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/75">{tag}</span>
                  ))}
                </div>
              </div>
              <Link href="/work/meridian" className="group order-1 block md:col-span-7 md:order-2 relative aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-zinc-900 via-brand-700 to-zinc-800 cursor-pointer">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(245,158,11,0.35)_0%,transparent_45%)]"></div>
                <div className="absolute left-8 top-8 flex flex-col gap-1 text-amber-200/50 text-[0.65rem] tracking-[0.2em] uppercase">
                  <span>Est. 2024</span><span>14 Suites</span>
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

            {/* Project 03, Forge */}
            <article className="project grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <Link href="/work/forge" className="group block md:col-span-7 relative aspect-4/3 rounded-2xl overflow-hidden bg-brand-ink cursor-pointer">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(var(--accent-rgb)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--accent-rgb)/0.12)_1px,transparent_1px)] bg-size-[40px_40px]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,transparent_40%,rgb(var(--accent-rgb)/0.2)_40%,rgb(var(--accent-rgb)/0.2)_50%,transparent_50%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[18vw] md:text-[11rem] font-black tracking-tighter text-brand-400 leading-none select-none">F<span className="text-white">:</span></span>
                </div>
                <div className="absolute bottom-8 left-8 text-brand-400/70 text-[0.65rem] tracking-[0.2em] uppercase font-mono">&lt;forge/&gt; v2.0</div>
                <div className="absolute inset-0 bg-brand-ink/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">View case study <ArrowRight size={14} /></span>
                </div>
              </Link>
              <div className="md:col-span-5 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-medium text-white/55">
                  <span>03</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Melbourne Dev Tools · 2023</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Forge</h3>
                <p className="text-white/75 leading-relaxed text-base md:text-lg">Positioning a Melbourne dev-tools startup from Blackbird-backed Series A to category leader, voice, site, and a docs system built to convert Aussie and US engineers alike.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Positioning", "Web", "Motion"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/75">{tag}</span>
                  ))}
                </div>
              </div>
            </article>

            {/* Project 04, Clarity */}
            <article className="project grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center opacity-0 translate-y-8">
              <div className="order-2 md:col-span-5 md:order-1 flex flex-col gap-3">
                <div className="flex items-center gap-3 text-xs font-medium text-white/55">
                  <span>04</span><span className="w-4 h-px bg-white/20"></span>
                  <span className="uppercase tracking-wider">Medicare Telehealth · 2023</span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Clarity</h3>
                <p className="text-white/75 leading-relaxed text-base md:text-lg">A full rebrand for a Medicare-integrated telehealth platform, making bulk-billed consultations feel less like a waiting room across every consult, pamphlet, and follow-up call from Cairns to Perth.</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {["Strategy", "Identity", "Campaign"].map((tag) => (
                    <span key={tag} className="px-3 py-1 text-[0.7rem] font-medium tracking-wider uppercase rounded-full bg-white/5 border border-white/10 text-white/75">{tag}</span>
                  ))}
                </div>
              </div>
              <Link href="/work/clarity" className="group order-1 block md:col-span-7 md:order-2 relative aspect-4/3 rounded-2xl overflow-hidden bg-linear-to-br from-brand-50 via-brand-100 to-brand-200 cursor-pointer">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] aspect-square rounded-full border-12 border-brand-500/25"></div>
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

          <div className="work-footer mt-12 md:mt-16 opacity-0 translate-y-4">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-white/10 bg-brand-700/40 p-8 md:p-10">
              <div className="flex flex-col gap-1.5">
                <p className="text-white font-semibold text-lg md:text-xl tracking-tight"><span className="text-brand-400">150+</span> Australian brands transformed since 2017.</p>
                <p className="text-white/55 text-xs tracking-wider uppercase">ABN 88 612 334 901</p>
              </div>
              <Link href="/work" className="group shrink-0 inline-flex items-center justify-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
                <span>Explore the full archive</span>
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="relative w-full py-(--space-section) px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden border-t border-white/5">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-(--space-head)">
            <div className="max-w-2xl">
              <h2 className="pr-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white opacity-0 translate-y-4">
                From g&apos;day to market <br className="hidden md:block" />
                <span className="text-brand-400">in 12 weeks.</span>
              </h2>
            </div>
            <p className="pr-intro max-w-md text-white/75 text-base md:text-lg leading-relaxed opacity-0 translate-y-4">
              Four phases, built across 150+ Australian brands, so you always know what&apos;s happening, who&apos;s responsible, and when it&apos;s landing in your inbox.
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-8">
              {[
                { num: "01", week: "Week 1–2", title: "Discover", desc: "We immerse ourselves in your business, audience, and market. Strategy starts with hard listening.", items: ["Stakeholder interviews", "Competitive audit", "Customer research"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>, highlight: false },
                { num: "02", week: "Week 3–4", title: "Define", desc: "We distill everything into a clear strategic foundation: the why before the what, the story before the style.", items: ["Positioning & story", "Voice & tone", "Brand architecture"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><path d="M12 2l3 7h7l-5.5 4.5L18 22l-6-4-6 4 1.5-8.5L2 9h7z" /></svg>, highlight: false },
                { num: "03", week: "Week 5–9", title: "Design", desc: "Every visual decision reinforces the strategy. Nothing is decorative. No stray pixels.", items: ["Identity system", "Typography & color", "Touchpoint design"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><path d="M15.5 3.5l5 5M3 21v-4.5L17 2.5l4.5 4.5L7.5 21z" /></svg>, highlight: false },
                { num: "04", week: "Week 10–12", title: "Deploy", desc: "We hand over a brand your team can run without us: files, templates, and a training session so nothing goes dark after we leave.", items: ["Rollout & launch", "Team training", "Governance & ongoing care"], icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-brand-400"><path d="M5 12l5 5L20 7" /></svg>, highlight: true },
              ].map(({ num, week, title, desc, items, icon, highlight }) => (
                <div key={num} className="pr-step relative md:pl-0 opacity-0 translate-y-6">
                  <div className={`mb-5 md:mb-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center ${highlight ? "bg-brand-400 border border-brand-400 shadow-(--shadow-brand-glow)" : "bg-brand-ink border border-brand-400/30"}`}>
                    <span className={`font-mono font-bold text-sm tracking-wider ${highlight ? "text-brand-700" : "text-brand-400"}`}>{num}</span>
                  </div>
                  <div className="md:mt-10 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mb-1">
                      {icon}
                      <span className="text-[0.7rem] font-medium tracking-[0.08em] uppercase text-white/40">{week}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">{title}</h3>
                    <p className="text-white/70 leading-relaxed text-[0.95rem]">{desc}</p>
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

          <div className="pr-footer mt-20 md:mt-28 flex flex-col md:flex-row md:items-center md:justify-between gap-8 p-8 md:p-10 rounded-2xl border border-white/10 bg-brand-700/40 opacity-0 translate-y-4">
            <div className="flex items-start gap-4 max-w-xl">
              <div className="shrink-0 w-10 h-10 rounded-full bg-brand-400/10 border border-brand-400/30 flex items-center justify-center text-brand-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-white font-bold text-base">Not every Aussie brand fits a 12-week box.</h4>
                <p className="text-white/55 text-sm leading-relaxed">ASX-listed transformations and trans-Tasman rebrands can run 3–6 months. We scope every engagement in AUD before we quote it, no surprises, no offshore sticker shock.</p>
              </div>
            </div>
            <a href="#contact" className="group shrink-0 inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md) w-fit">
              <span>Book a discovery call</span>
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="relative w-full py-(--space-section) px-6 sm:px-10 md:px-16 overflow-hidden bg-brand-700 border-t border-white/5">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="select-none font-black tracking-tighter text-white/2.5 whitespace-nowrap" style={{ fontSize: "clamp(10rem, 22vw, 22rem)" }}>hello.</span>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center max-w-4xl mx-auto mb-(--space-head)">
            <div className="contact-badge opacity-0 translate-y-4 flex justify-center mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/15 border border-brand-400/25 text-brand-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse shrink-0"></span>
                Booking Q2 2025 · 2 spots remain
              </span>
            </div>
            <h2 className="contact-heading opacity-0 translate-y-6 text-white font-bold leading-[1.1] tracking-[-0.03em]" style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}>
              Let&apos;s build something<br />
              <span className="text-brand-400 italic inline-block pb-2">your competitors notice.</span>
            </h2>
            <p className="contact-intro opacity-0 translate-y-6 text-white/75 text-base md:text-xl leading-relaxed mt-8 max-w-2xl mx-auto">
              A 20-minute call. We&apos;ll tell you honestly whether we&apos;re the right studio for the job, and point you to someone better if we&apos;re not.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 md:gap-6 mb-14 md:mb-20">
            <Link href="/contact" className="contact-card opacity-0 translate-y-6 group relative overflow-hidden rounded-3xl p-8 md:p-10 bg-linear-to-br from-brand-400 to-brand-300 text-brand-700 transition-all duration-500 hover:-translate-y-1 hover:shadow-(--shadow-brand-xl)">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/20 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="relative flex flex-col gap-8 h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-brand-700/15 text-brand-700 text-[0.65rem] font-bold uppercase tracking-[0.15em]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                    <span>Recommended</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brand-700 text-brand-400 flex items-center justify-center transition-transform duration-500 group-hover:-rotate-45">
                    <ArrowRight size={18} />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.05] mb-3">Book a discovery call</h3>
                  <p className="text-brand-700/75 text-base leading-relaxed max-w-sm">20 min · with Priya, our client partner. Zoom or at our Surry Hills studio, your call.</p>
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
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white/70 flex items-center justify-center transition-all duration-500 group-hover:bg-brand-400 group-hover:border-brand-400 group-hover:text-brand-700 group-hover:-rotate-45">
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
                  <span className="text-white/65">Mon–Fri · 9–6 AEST</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
