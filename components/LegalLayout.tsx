import type { ReactNode } from "react";

export default function LegalLayout({
  eyebrow,
  title,
  updated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="relative w-full pt-(--hero-top) pb-12 md:pb-16 px-6 sm:px-10 md:px-16">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-medium tracking-[0.14em] uppercase text-brand-400/75">{eyebrow}</span>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.05]">{title}</h1>
          <p className="mt-4 text-sm text-white/50">Last updated {updated}</p>
          {intro && <p className="mt-6 text-white/75 text-base md:text-lg leading-relaxed">{intro}</p>}
        </div>
      </section>

      <section className="px-6 sm:px-10 md:px-16 pb-(--space-section)">
        <div
          className="max-w-3xl mx-auto flex flex-col gap-10 text-white/75 text-[0.95rem] md:text-base leading-relaxed
          [&_h2]:text-white [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:mb-3
          [&_p]:mb-4 [&_p:last-child]:mb-0
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:marker:text-brand-400
          [&_a]:text-brand-400 [&_a:hover]:text-brand-300 [&_a]:underline [&_a]:underline-offset-2
          [&_strong]:text-white [&_strong]:font-semibold"
        >
          {children}
        </div>
      </section>
    </>
  );
}
