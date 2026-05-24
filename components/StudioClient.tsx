"use client";

import { useEffect } from "react";
import Link from "next/link";

const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" className="transition-transform group-hover/btn:translate-x-1">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface TeamMember {
  initials: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  badge: string;
  gradient: string;
}

const teamMembers: TeamMember[] = [
  { initials: "NA", name: "Noa Akerman", role: "Founder & Strategy Lead", bio: "Built positioning for two ASX-listed unicorns before 30. Ex-Atlassian. Thinks in narratives, not decks.", location: "Sydney", badge: "Founder", gradient: "from-brand-400 via-brand-500 to-brand-700" },
  { initials: "JR", name: "Jamie Russo", role: "Creative Director", bio: "AGDA-awarded designer with roots in print and a portfolio that spans fintech to food. Based in Fitzroy, always at the coffee shop.", location: "Melbourne", badge: "Design", gradient: "from-violet-900 via-brand-700 to-brand-500" },
  { initials: "SK", name: "Sam Kowalczyk", role: "Head of Engineering", bio: "Next.js specialist. Obsessed with performance, accessibility, and making designers' wildest ideas actually ship.", location: "Sydney", badge: "Dev", gradient: "from-zinc-800 via-brand-600 to-zinc-900" },
  { initials: "ML", name: "Maya Linh", role: "Head of Paid Media", bio: "$15M+ in media spend managed across Meta and Google. Former agency media director. Lives for a good ROAS story.", location: "Sydney", badge: "Ads", gradient: "from-brand-300 via-brand-400 to-brand-600" },
  { initials: "TO", name: "Theo O'Brien", role: "Content Director", bio: "Documentary filmmaker turned brand content lead. Shot campaigns from Bondi to the Kimberley. Dislikes stock photography with a passion.", location: "Melbourne", badge: "Content", gradient: "from-orange-900 via-amber-800 to-brand-700" },
  { initials: "CP", name: "Clara Park", role: "Social Media Lead", bio: "Grew three brand accounts to 100K+ before 25. Knows every algorithm update before it hits your feed and writes copy that sounds like a human wrote it.", location: "Sydney", badge: "Social", gradient: "from-slate-800 via-brand-700 to-slate-900" },
];

export default function StudioClient() {
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
        tl.fromTo(".st-eyebrow", from, to, 0.3);
        tl.fromTo(".st-heading", from, to, 0.4);
        tl.fromTo(".st-intro",   from, to, 0.5);

        gsap.fromTo(".st-values-head", from, { ...to, scrollTrigger: { trigger: ".st-values-head", ...ST } });
        ScrollTrigger.batch(".st-value", {
          onEnter: (els) => gsap.fromTo(els, from, { ...to, stagger: 0.07 }),
          ...ST,
        });

        gsap.fromTo(".st-team-head", from, { ...to, scrollTrigger: { trigger: ".st-team-head", ...ST } });
        ScrollTrigger.batch(".st-card", {
          onEnter: (els) => gsap.fromTo(els, from, { ...to, stagger: 0.07 }),
          ...ST,
        });

        gsap.fromTo(".st-careers-head", from, { ...to, scrollTrigger: { trigger: ".st-careers-head", ...ST } });
        ScrollTrigger.batch(".st-role", {
          onEnter: (els) => gsap.fromTo(els, from, { ...to, stagger: 0.07 }),
          ...ST,
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
      <section className="relative w-full pt-36 md:pt-44 pb-20 md:pb-28 px-6 sm:px-10 md:px-16 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="st-eyebrow opacity-0 translate-y-4 flex items-center gap-2.5 mb-6">
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">The Studio · Est. Sydney 2017</span>
          </div>
          <h1 className="st-heading opacity-0 translate-y-6 text-[1.875rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white max-w-3xl mb-8">
            We&apos;re BrandMates.<br />
            <span className="bg-linear-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent">We give a damn.</span>
          </h1>
          <p className="st-intro opacity-0 translate-y-6 text-white/55 text-base md:text-xl leading-relaxed max-w-2xl">
            Founded in Surry Hills in 2017, BrandMates is the studio Australian founders and CMOs call when the brief is too important for a junior account manager. We&apos;re six senior creatives who left big-agency land because we believed smaller teams do better work, and after 150+ projects, we still believe it.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 sm:px-10 md:px-16 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="st-values-head opacity-0 translate-y-4 mb-12">
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">How we work</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
            <div className="st-value opacity-0 translate-y-6 bg-brand-ink p-8 md:p-10">
              <div className="w-10 h-10 rounded-lg bg-brand-400/10 border border-brand-400/20 flex items-center justify-center text-brand-400 mb-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Honest first</h3>
              <p className="text-white/55 text-sm leading-relaxed">We&apos;ll tell you when an idea won&apos;t work, even if it costs us the job. Our reputation outlasts any single project.</p>
            </div>
            <div className="st-value opacity-0 translate-y-6 bg-brand-ink p-8 md:p-10">
              <div className="w-10 h-10 rounded-lg bg-brand-400/10 border border-brand-400/20 flex items-center justify-center text-brand-400 mb-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10" />
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Restlessly curious</h3>
              <p className="text-white/55 text-sm leading-relaxed">The Australian market moves fast. We stay ahead of platform changes, cultural shifts, and what&apos;s working in market, not in a New York case study.</p>
            </div>
            <div className="st-value opacity-0 translate-y-6 bg-brand-ink p-8 md:p-10">
              <div className="w-10 h-10 rounded-lg bg-brand-400/10 border border-brand-400/20 flex items-center justify-center text-brand-400 mb-6">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Genuinely local</h3>
              <p className="text-white/55 text-sm leading-relaxed">We live, eat, and commute in the same cities as your customers. That local understanding isn&apos;t a differentiator, it&apos;s a prerequisite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="px-6 sm:px-10 md:px-16 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="st-team-head opacity-0 translate-y-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-6 h-px bg-brand-400"></span>
                <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">The Mates</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Six humans.<br />Zero hand-offs.</h2>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-sm">Every client has a dedicated point of contact and a team that actually does the work, no account managers passing briefs to juniors.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
            {teamMembers.map((member) => (
              <div key={member.name} className="st-card opacity-0 translate-y-6 group bg-brand-700 p-8 hover:bg-brand-ink/80 transition-colors duration-500">
                <div className={`relative aspect-square w-full mb-6 rounded-2xl overflow-hidden bg-linear-to-br ${member.gradient}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/95 font-black text-7xl tracking-tighter drop-shadow-lg">{member.initials}</span>
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm border border-white/20 text-white text-[10px] font-semibold uppercase tracking-wider">
                    {member.badge}
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl">{member.name}</h3>
                <p className="text-brand-300 text-sm font-medium mt-1">{member.role}</p>
                <p className="text-white/50 text-sm leading-relaxed mt-4">{member.bio}</p>
                <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-white/50 uppercase tracking-wider">{member.location}</span>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-400 hover:text-brand-700 text-white/60 flex items-center justify-center transition-all duration-300">
                    <LinkedInIcon />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS */}
      <section id="careers" className="px-6 sm:px-10 md:px-16 py-16 md:py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="st-careers-head opacity-0 translate-y-4 mb-12">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-6 h-px bg-brand-400"></span>
              <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Open Roles · 2 positions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">Come work with us.</h2>
            <p className="text-white/50 text-base leading-relaxed mt-4 max-w-xl">We hire experienced people who are tired of big-agency politics and want to work on fewer, more considered Australian brands.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="st-role opacity-0 translate-y-6 group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-400/30 hover:bg-brand-400/5 transition-all duration-300">
              <div>
                <h3 className="text-white font-bold text-lg">Senior Web Developer</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-full bg-brand-400/10 text-brand-400 text-xs font-medium">Full-time</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium">Sydney or Remote (AU)</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium">Next.js / React</span>
                </div>
              </div>
              <Link href="/contact" className="group/btn shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-brand-400 transition-colors">
                Apply now <ArrowRight />
              </Link>
            </div>
            <div className="st-role opacity-0 translate-y-6 group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-400/30 hover:bg-brand-400/5 transition-all duration-300">
              <div>
                <h3 className="text-white font-bold text-lg">Social Media Manager</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-full bg-brand-400/10 text-brand-400 text-xs font-medium">Full-time</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium">Melbourne or Sydney</span>
                  <span className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium">2+ years exp.</span>
                </div>
              </div>
              <Link href="/contact" className="group/btn shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-brand-400 transition-colors">
                Apply now <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
