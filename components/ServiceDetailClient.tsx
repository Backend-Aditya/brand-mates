"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Check, Zap, ArrowRight as ArrowRightIcon } from "lucide-react";
import type { Service } from "@/lib/services";
import type { WorkProject } from "@/lib/work";
import FaqAccordion from "@/components/FaqAccordion";

const CheckItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span className="mt-1 w-4 h-4 shrink-0 rounded-full bg-brand-400/15 border border-brand-400/30 flex items-center justify-center text-brand-400">
      <Check size={8} strokeWidth={2.5} />
    </span>
    <span>{children}</span>
  </li>
);

const BoltIcon = () => (
  <Zap size={20} strokeWidth={1.8} className="shrink-0 mt-0.5 text-brand-400" />
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <ArrowRightIcon size={size} className="transition-transform duration-300 group-hover:translate-x-1" />
);

export default function ServiceDetailClient({
  service,
  otherServices,
  relatedWork,
}: {
  service: Service;
  otherServices: Service[];
  relatedWork?: WorkProject;
}) {
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

      const ST = { start: "top bottom+=150" as const, once: true };

      ctx = gsap.context(() => {
        const ease = "power4.out";
        const from = { opacity: 0, y: 20 };
        const to = { opacity: 1, y: 0, duration: 0.65, ease, force3D: true, clearProps: "translate,transition" };

        const tl = gsap.timeline({ defaults: { ease } });
        tl.fromTo(".sd-crumb", from, to, 0.1);
        tl.fromTo(".sd-eyebrow", from, to, 0.2);
        tl.fromTo(".sd-heading", from, to, 0.3);
        tl.fromTo(".sd-desc", from, to, 0.4);
        tl.fromTo(".sd-cta", from, to, 0.5);
        tl.fromTo(".sd-panel", from, to, 0.5);

        [".sd-body", ".sd-process-step", ".sd-related", ".sd-other", ".sd-final-cta"].forEach((sel) => {
          gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
            gsap.fromTo(el, from, { ...to, scrollTrigger: { trigger: el, ...ST } });
          });
        });

        ScrollTrigger.refresh();
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative w-full pt-(--hero-top) pb-(--space-section) px-6 sm:px-10 md:px-16 bg-brand-ink overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <nav className="sd-crumb opacity-0 translate-y-4 flex items-center gap-2 text-sm text-white/40 mb-10" aria-label="Breadcrumb">
            <Link href="/services" className="hover:text-brand-300 transition-colors">Services</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/65">{service.eyebrow}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
            <div>
              <span className="sd-eyebrow opacity-0 translate-y-6 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-400 mb-8">{service.eyebrow}</span>
              <h1 className="sd-heading opacity-0 translate-y-6 text-3xl sm:text-[2.5rem] md:text-5xl lg:text-[3.25rem] font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-6 text-balance">
                {service.headingLines[0]}<br />{service.headingLines[1]}
              </h1>
              <p className="sd-desc opacity-0 translate-y-6 text-white/75 text-base md:text-lg leading-relaxed mb-8">{service.intro}</p>
              <Link href="/contact" className="sd-cta opacity-0 translate-y-6 group inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-7 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-md)">
                {service.ctaLabel} <ArrowRight />
              </Link>
            </div>
            <div className="sd-panel opacity-0 translate-y-8 flex flex-col gap-4">
              <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
                <h2 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">What&apos;s included</h2>
                <ul className="flex flex-col gap-3 text-white/75 text-sm">
                  {service.includes.map((item) => <CheckItem key={item}>{item}</CheckItem>)}
                </ul>
              </div>
              <div className="rounded-2xl border border-brand-400/20 bg-brand-400/5 p-6 flex items-start gap-4">
                <BoltIcon />
                <div>
                  <p className="text-white font-semibold text-sm mb-1">Typical result</p>
                  <p className="text-white/75 text-sm leading-relaxed">{service.result}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IN-DEPTH BODY COPY */}
      <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
        <div className="max-w-3xl mx-auto flex flex-col gap-6">
          {service.body.map((para, i) => (
            <p key={i} className="sd-body opacity-0 translate-y-6 text-white/70 text-base md:text-lg leading-relaxed text-pretty">{para}</p>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5 bg-white/1">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-12 max-w-xl text-balance">How we run a {service.eyebrow.toLowerCase()} engagement.</h2>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, i) => (
              <li key={step.title} className="sd-process-step opacity-0 translate-y-6 flex flex-col gap-3">
                <span className="font-mono text-sm text-brand-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-white font-bold text-lg">{step.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RELATED CASE STUDY */}
      {relatedWork && (
        <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <span className="text-xs font-medium tracking-[0.08em] uppercase text-white/40 mb-6 block">Related work</span>
            <Link
              href={`/work/${relatedWork.slug}`}
              className={`sd-related opacity-0 translate-y-6 group relative block rounded-3xl overflow-hidden bg-linear-to-br ${relatedWork.bgClass ?? "from-brand-700 via-brand-500 to-brand-400"}`}
              style={relatedWork.bgStyle}
            >
              <div className="aspect-4/3 sm:aspect-16/7 relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(255,255,255,0.1),transparent_55%)]"></div>
                <div className="absolute inset-0 flex items-center justify-center select-none">
                  <span className="text-white/10 font-black leading-none tracking-tighter" style={{ fontSize: "clamp(5rem, 16vw, 14rem)" }}>
                    {relatedWork.initials}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 bg-linear-to-t from-black/60 to-transparent">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                      <p className="text-brand-300 text-xs font-bold uppercase tracking-[0.15em] mb-2">{relatedWork.client} · {relatedWork.category}</p>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight max-w-xl text-balance">{relatedWork.tagline}</h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 shrink-0 text-sm text-white/80">
                      {relatedWork.metrics.slice(0, 2).map(({ value, label }) => (
                        <span key={label}><span className="text-white font-extrabold">{value}</span> {label.toLowerCase()}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 group-hover:bg-brand-400 group-hover:text-brand-700 text-white flex items-center justify-center transition-all duration-300">
                  <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* FAQ */}
      <FaqAccordion
        heading={
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-3">
            {service.eyebrow}, <span className="text-brand-400">answered.</span>
          </h2>
        }
        intro="The questions we get most often about this service before the first call."
        items={service.faqs.map(({ q, a }) => ({ q, a }))}
      />

      {/* OTHER SERVICES */}
      <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-medium tracking-[0.08em] uppercase text-white/40 mb-6 block">Other services</span>
          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {otherServices.map((s) => (
              <li key={s.slug} className="sd-other opacity-0 translate-y-4">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 py-5 hover:text-brand-300 transition-colors"
                >
                  <span className="text-white group-hover:text-brand-300 font-semibold text-lg transition-colors">{s.eyebrow}</span>
                  <ArrowRight size={16} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 sm:px-10 md:px-16 py-(--space-section) border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="sd-final-cta opacity-0 translate-y-6 relative rounded-3xl overflow-hidden bg-brand-700 border border-white/10 p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
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
