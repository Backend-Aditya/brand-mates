"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { openRoles } from "@/lib/careers";

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <ArrowRightIcon size={size} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
);

export default function CareersClient() {
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

      document.querySelectorAll<HTMLElement>(".opacity-0").forEach((el) => {
        [...el.classList].filter(c => c.startsWith("translate-y-") || c.startsWith("-translate-y-")).forEach(c => el.classList.remove(c));
        el.style.transition = "none";
      });

      ctx = gsap.context(() => {
        const ease = "power4.out";
        const from = { opacity: 0, y: 20 };
        const to = { opacity: 1, y: 0, duration: 0.65, ease, force3D: true, clearProps: "translate,transition" };

        const tl = gsap.timeline({ defaults: { ease } });
        tl.fromTo(".cr-eyebrow", from, to, 0.2);
        tl.fromTo(".cr-heading", from, to, 0.3);
        tl.fromTo(".cr-intro", from, to, 0.4);

        gsap.utils.toArray<HTMLElement>(".cr-role").forEach((el, i) => {
          gsap.fromTo(el, from, { ...to, delay: i * 0.08 });
        });
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <section className="relative w-full pt-(--hero-top) pb-(--space-section) px-6 sm:px-10 md:px-16 bg-brand-ink">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2.5 mb-4">
          <span className="cr-eyebrow opacity-0 translate-y-4 w-6 h-px bg-brand-400"></span>
          <span className="cr-eyebrow opacity-0 translate-y-4 text-xs font-medium tracking-[0.08em] uppercase text-brand-400">Open Roles · {openRoles.length} positions</span>
        </div>
        <h1 className="cr-heading opacity-0 translate-y-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">Come work with us.</h1>
        <p className="cr-intro opacity-0 translate-y-6 text-white/60 text-base md:text-lg leading-relaxed mt-4 max-w-xl">
          We hire experienced people who are tired of big-agency politics and want to work on fewer, more considered Australian brands.
        </p>

        <div className="flex flex-col gap-4 mt-14">
          {openRoles.map(({ title, badges }) => (
            <div key={title} className="cr-role opacity-0 translate-y-6 group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 md:p-8 rounded-2xl border border-white/5 bg-white/2 hover:border-brand-400/30 hover:bg-brand-400/5 transition-all duration-300">
              <div>
                <h2 className="text-white font-bold text-lg">{title}</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2.5 py-1 rounded-full bg-brand-400/10 text-brand-400 text-xs font-medium">{badges[0]}</span>
                  {badges.slice(1).map((badge) => (
                    <span key={badge} className="px-2.5 py-1 rounded-full bg-white/5 text-white/60 text-xs font-medium">{badge}</span>
                  ))}
                </div>
              </div>
              <Link href="/contact" className="group/btn shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-brand-400 transition-colors">
                Apply now <ArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
