"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { FaLinkedin as LinkedInIcon } from "react-icons/fa6";

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <ArrowRightIcon size={size} className="transition-transform group-hover/btn:translate-x-1" />
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
          <div className="st-eyebrow opacity-0 translate-y-4 flex items-center gap-2.5 mb-6">
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">The Studio · Est. Sydney 2017</span>
          </div>
          <h1 className="st-heading opacity-0 translate-y-6 text-[1.875rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white max-w-3xl mb-8">
            We&apos;re BrandMates.<br />
            <span className="text-brand-400">We give a damn.</span>
          </h1>
          <p className="st-intro opacity-0 translate-y-6 text-white/75 text-base md:text-xl leading-relaxed max-w-2xl">
            Founded in Merrylands in 2017, BrandMates is the studio Australian founders and CMOs call when the brief is too important for a junior account manager. We&apos;re six senior creatives who left big-agency land because we believed smaller teams do better work, and after 150+ projects, we still believe it.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="st-values-head opacity-0 translate-y-4 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-(--space-head) max-w-lg text-balance">
            Three things that don&apos;t change project to project.
          </h2>
          <div className="grid sm:grid-cols-3 divide-y divide-white/10 sm:divide-y-0 sm:divide-x">
            <div className="st-value opacity-0 translate-y-6 py-8 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <h3 className="text-white font-bold text-xl mb-3">Honest first</h3>
              <p className="text-white/55 text-sm leading-relaxed">We&apos;ll tell you when an idea won&apos;t work, even if it costs us the job. Our reputation outlasts any single project.</p>
            </div>
            <div className="st-value opacity-0 translate-y-6 py-8 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <h3 className="text-white font-bold text-xl mb-3">Restlessly curious</h3>
              <p className="text-white/55 text-sm leading-relaxed">The Australian market moves fast. We stay ahead of platform changes, cultural shifts, and what&apos;s working in market, not in a New York case study.</p>
            </div>
            <div className="st-value opacity-0 translate-y-6 py-8 sm:py-0 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <h3 className="text-white font-bold text-xl mb-3">Genuinely local</h3>
              <p className="text-white/55 text-sm leading-relaxed">We live, eat, and commute in the same cities as your customers. That local understanding isn&apos;t a differentiator, it&apos;s a prerequisite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="st-team-head opacity-0 translate-y-4 flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-(--space-head)">
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
                  <a
                    href={`https://www.linkedin.com/in/${member.name.toLowerCase().replace(/[^a-z\s]/g, "").trim().replace(/\s+/g, "-")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name} on LinkedIn`}
                    className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-400 hover:text-brand-700 text-white/60 flex items-center justify-center transition-all duration-300"
                  >
                    <LinkedInIcon size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAREERS TEASER */}
      <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="st-careers-head opacity-0 translate-y-4 relative rounded-3xl overflow-hidden bg-brand-700 border border-white/10 p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="relative">
              <div className="flex items-center gap-2.5 mb-4">
                <span className="w-6 h-px bg-brand-400"></span>
                <span className="text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Open Roles · 2 positions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">Come work with us.</h2>
              <p className="text-white/60 text-base leading-relaxed mt-3 max-w-md">We hire experienced people who are tired of big-agency politics and want to work on fewer, more considered Australian brands.</p>
            </div>
            <Link
              href="/careers"
              className="relative group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-lg) shrink-0"
            >
              View open roles
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
