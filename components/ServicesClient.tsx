"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight as ArrowRightIcon } from "lucide-react";
import { services } from "@/lib/services";

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <ArrowRightIcon size={size} className="transition-transform duration-300 group-hover:translate-x-1" />
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

        ScrollTrigger.batch(".sv-row", {
          onEnter: (els) => gsap.fromTo(els, from, { ...to, stagger: 0.07 }),
          ...ST,
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
      <section className="relative w-full pt-(--hero-top) pb-(--space-section) px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1 className="sv-heading opacity-0 translate-y-6 text-[1.875rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white max-w-2xl text-balance">
              Four ways<br />
              <span className="text-brand-400">we work.</span>
            </h1>
            <p className="sv-intro opacity-0 translate-y-6 text-white/75 text-base md:text-lg leading-relaxed max-w-sm md:text-right">
              Focused disciplines, tight execution, everything your brand needs to compete in the Australian market, and nothing you don&apos;t.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES INDEX */}
      <section className="px-6 sm:px-10 md:px-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          {services.map((service, i) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="sv-row opacity-0 translate-y-6 group grid md:grid-cols-12 gap-4 md:gap-8 py-10 md:py-14 border-b border-white/10 items-center"
            >
              <div className="md:col-span-5 flex items-start gap-4 md:gap-6">
                <span className="font-mono text-sm text-white/35 pt-1.5 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-none text-white group-hover:text-brand-400 transition-colors">
                  {service.eyebrow}
                </h2>
              </div>
              <p className="md:col-span-6 text-white/65 text-base leading-relaxed">
                {service.intro}
              </p>
              <div className="md:col-span-1 flex md:justify-end">
                <span className="shrink-0 w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 transition-all duration-300 group-hover:bg-brand-400 group-hover:border-brand-400 group-hover:text-brand-700">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
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
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
