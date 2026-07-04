"use client";

import { useEffect, type ReactNode } from "react";

export interface FaqItem {
  q: string;
  a: ReactNode;
}

export default function FaqAccordion({
  heading,
  intro,
  items,
}: {
  heading: ReactNode;
  intro?: string;
  items: FaqItem[];
}) {
  // Toggle .is-open (CSS animates grid-rows), keep content mounted through
  // the close so the collapse animates both ways.
  useEffect(() => {
    const details = document.querySelectorAll<HTMLDetailsElement>("#faq details.faq-item");
    const cleanups: Array<() => void> = [];
    details.forEach((d) => {
      const summary = d.querySelector("summary");
      const grid = d.querySelector<HTMLElement>(".faq-grid");
      if (!summary || !grid) return;
      const onClick = (e: Event) => {
        e.preventDefault();
        if (d.open) {
          d.classList.remove("is-open");
          const done = (ev: TransitionEvent) => {
            if (ev.propertyName !== "grid-template-rows") return;
            d.open = false;
            grid.removeEventListener("transitionend", done);
          };
          grid.addEventListener("transitionend", done);
        } else {
          d.open = true;
          requestAnimationFrame(() => d.classList.add("is-open"));
        }
      };
      summary.addEventListener("click", onClick);
      cleanups.push(() => summary.removeEventListener("click", onClick));
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section id="faq" className="relative w-full py-(--space-section) px-6 sm:px-10 md:px-16 border-t border-white/5">
      <div className="relative z-10 max-w-3xl mx-auto">
        {heading}
        {intro && (
          <p className="text-white/70 text-base md:text-lg leading-relaxed mb-(--space-head) max-w-xl">
            {intro}
          </p>
        )}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {items.map(({ q, a }, i) => (
            <details key={q} className="faq-item group py-6 md:py-7">
              <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                <div className="flex items-start gap-5">
                  <span className="text-brand-400 font-bold text-sm mt-0.5 shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-white font-semibold text-lg md:text-xl leading-snug group-hover:text-brand-300 transition-colors">{q}</h3>
                </div>
                <span className="faq-chip shrink-0 w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 transition-all duration-300">
                  <span className="relative block w-3.5 h-3.5">
                    <span className="absolute top-1/2 left-0 right-0 h-[1.75px] bg-current -translate-y-1/2 rounded-full"></span>
                    <span className="faq-chip-bar absolute left-1/2 top-0 bottom-0 w-[1.75px] bg-current -translate-x-1/2 rounded-full transition-transform duration-300 ease-out"></span>
                  </span>
                </span>
              </summary>
              <div className="faq-grid">
                <div>
                  <div className="pl-10 pr-4 sm:pr-12 pt-4 text-white/80 text-sm md:text-base leading-relaxed">{a}</div>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
