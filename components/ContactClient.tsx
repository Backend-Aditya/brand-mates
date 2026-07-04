"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Calendar, Clock, ArrowRight } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffffff60' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 1.25rem center",
};

const EmailIcon = () => <Mail size={14} strokeWidth={1.8} />;

const PhoneIcon = () => <Phone size={14} strokeWidth={1.8} />;

const CalendarIcon = () => <Calendar size={14} strokeWidth={2} className="shrink-0 opacity-60" />;

const ClockIcon = () => <Clock size={14} strokeWidth={2} className="shrink-0 opacity-60" />;

export default function ContactClient() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    await new Promise(r => setTimeout(r, 900));
    setFormStatus("sent");
  }

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
        const from = { opacity: 0, y };
        const to   = { opacity: 1, y: 0, duration: dur, ease, force3D: true, clearProps: "translate,transition" };

        const tl = gsap.timeline({ defaults: { ease } });
        tl.fromTo(".ct-badge",   from, to, 0.3);
        tl.fromTo(".ct-heading", from, to, 0.4);
        tl.fromTo(".ct-intro",   from, to, 0.5);
        tl.fromTo(".ct-form",    from, to, 0.6);
        tl.fromTo(".ct-sidebar", from, to, 0.7);
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative w-full pt-(--hero-top) pb-(--space-section) px-6 sm:px-10 md:px-16 overflow-x-hidden">
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="ct-badge opacity-0 translate-y-4 flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-400/15 border border-brand-400/25 text-brand-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse shrink-0"></span>
              Booking Q3 2026 · 2 spots remain
            </span>
          </div>
          <h1 className="ct-heading opacity-0 translate-y-6 text-[1.875rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white mb-6">
            Let&apos;s build something<br />
            <span className="inline-block pb-1 text-brand-400 italic">the market remembers.</span>
          </h1>
          <p className="ct-intro opacity-0 translate-y-6 text-white/75 text-base md:text-xl leading-relaxed max-w-xl mx-auto">
            Fill in the form below or jump straight to booking a discovery call. We respond to every inquiry within one business day, AEST.
          </p>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="px-6 sm:px-10 md:px-16 pb-(--space-section)">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10 md:gap-16 items-start">

          {/* FORM */}
          <div className="ct-form opacity-0 translate-y-8">
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
              {formStatus === "sending" && "Sending your enquiry..."}
              {formStatus === "sent" && "Enquiry sent. We will reply within 1 business day, AEST."}
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="ct-name" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/65">Your name</label>
                  <input id="ct-name" type="text" placeholder="Alex Chen" className="w-full rounded-xl border border-white/10 bg-white/3 text-white placeholder:text-white/55 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="ct-email" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/65">Work email</label>
                  <input id="ct-email" type="email" placeholder="alex@company.com.au" className="w-full rounded-xl border border-white/10 bg-white/3 text-white placeholder:text-white/55 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label htmlFor="ct-company" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/65">Company</label>
                  <input id="ct-company" type="text" placeholder="Your company name" className="w-full rounded-xl border border-white/10 bg-white/3 text-white placeholder:text-white/55 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="ct-website" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/65">Website (optional)</label>
                  <input id="ct-website" type="url" placeholder="yoursite.com.au" className="w-full rounded-xl border border-white/10 bg-white/3 text-white placeholder:text-white/55 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ct-service" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/65">Service you&apos;re interested in <span aria-hidden="true" className="text-brand-400">*</span></label>
                <select id="ct-service" required className="w-full rounded-xl border border-white/10 bg-white/3 text-white text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all appearance-none cursor-pointer" style={selectStyle}>
                  <option value="" className="bg-brand-ink">Select a service...</option>
                  <option value="web" className="bg-brand-ink">Web Design &amp; Development</option>
                  <option value="social" className="bg-brand-ink">Social Media</option>
                  <option value="ads" className="bg-brand-ink">Paid Ads</option>
                  <option value="content" className="bg-brand-ink">Content Creation</option>
                  <option value="multiple" className="bg-brand-ink">Multiple services</option>
                  <option value="unsure" className="bg-brand-ink">Not sure yet</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ct-budget" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/65">Monthly budget (AUD, ex-GST) <span aria-hidden="true" className="text-brand-400">*</span></label>
                <select id="ct-budget" required className="w-full rounded-xl border border-white/10 bg-white/3 text-white text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all appearance-none cursor-pointer" style={selectStyle}>
                  <option value="" className="bg-brand-ink">Select budget range...</option>
                  <option value="2-5" className="bg-brand-ink">$2,000 – $5,000 / month</option>
                  <option value="5-10" className="bg-brand-ink">$5,000 – $10,000 / month</option>
                  <option value="10-20" className="bg-brand-ink">$10,000 – $20,000 / month</option>
                  <option value="20-50" className="bg-brand-ink">$20,000 – $50,000 / month</option>
                  <option value="50+" className="bg-brand-ink">$50,000+ / month</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="ct-message" className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/65">Tell us about your project</label>
                <textarea id="ct-message" rows={5} placeholder="What are you trying to achieve? Where are you now, and where do you want to be? The more context you share, the better our first conversation will be." className="w-full rounded-xl border border-white/10 bg-white/3 text-white placeholder:text-white/55 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all resize-none leading-relaxed"></textarea>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-white/55 text-xs"><span aria-hidden="true" className="text-brand-400">*</span> Required fields</p>
                <button
                  type="submit"
                  disabled={formStatus === "sending" || formStatus === "sent"}
                  className="group self-start inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-brand-400 disabled:hover:translate-y-0 text-brand-700 font-bold text-sm px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-(--shadow-brand-lg)"
                >
                  {formStatus === "sending" && "Sending..."}
                  {formStatus === "sent" && "Enquiry sent"}
                  {formStatus === "idle" && (
                    <>
                      Send enquiry
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>
              </div>
              <p className="text-white/60 text-xs">We respond within 1 business day (AEST). Your details are never shared with third parties.</p>
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="ct-sidebar opacity-0 translate-y-8 flex flex-col gap-5 lg:sticky lg:top-24">

            {/* Book a call */}
            <div className="relative rounded-2xl overflow-hidden p-6 bg-linear-to-br from-brand-400 to-brand-300 text-brand-700">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_100%_0%,rgba(255,255,255,0.2),transparent_60%)]"></div>
              <div className="relative">
                <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] opacity-60 mb-3">Skip the form</p>
                <h3 className="text-xl font-extrabold tracking-tight mb-2">Book a discovery call</h3>
                <p className="text-brand-700/70 text-sm leading-relaxed mb-5">30 minutes. No pitch deck, no pressure. Just a real conversation about your brand.</p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-brand-700/20 flex items-center justify-center font-black text-sm">P</div>
                  <div>
                    <p className="font-bold text-sm">Priya Nair</p>
                    <p className="text-brand-700/65 text-xs">Client Partner · Sydney</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 mb-5 text-sm">
                  <div className="flex items-center gap-2"><CalendarIcon /><span>Next available: Wed 8 Jul 10:00 AEST</span></div>
                  <div className="flex items-center gap-2"><ClockIcon /><span>30 minutes via Google Meet</span></div>
                </div>
                <a href="mailto:studio@brandmates.com.au?subject=Discovery%20call%20booking" className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-brand-700 text-brand-300 hover:bg-brand-ink font-bold text-sm py-3 w-full transition-colors">
                  Book this slot
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Direct contact */}
            <div className="rounded-2xl border border-white/5 bg-white/2 p-6 flex flex-col gap-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">Or reach us directly</p>
              <a href="mailto:studio@brandmates.com.au" className="group flex items-center gap-3 text-white/70 hover:text-brand-400 transition-colors text-sm">
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand-400/10 flex items-center justify-center transition-colors shrink-0"><EmailIcon /></span>
                studio@brandmates.com.au
              </a>
              <a href="tel:+61426525614" className="group flex items-center gap-3 text-white/70 hover:text-brand-400 transition-colors text-sm">
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand-400/10 flex items-center justify-center transition-colors shrink-0"><PhoneIcon /></span>
                +61 426 525 614
              </a>
              <div className="pt-3 mt-1 border-t border-white/5 text-white/60 text-xs">Mon – Fri · 9am – 6pm AEST/AEDT</div>
            </div>

            {/* Office */}
            <div className="rounded-2xl border border-white/5 bg-white/2 p-6">
              <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300 mb-2">Sydney HQ</p>
              <address className="not-italic text-white/70 text-xs leading-relaxed">Merrylands NSW 2160</address>
            </div>
          </div>

        </div>
      </section>

      <FaqAccordion
        heading={
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] leading-[1.05] text-white mb-3">
            Questions, <span className="text-brand-400">answered.</span>
          </h2>
        }
        intro="The ones we get most often from Aussie founders and CMOs before the first call."
        items={[
          { q: "How much does a project cost?", a: <>Most full brand engagements fall between <span className="text-white font-medium">A$95k and A$320k ex-GST</span>, scoped as a fixed fee in AUD. Visual identity&ndash;only projects start around A$55k; full platform work (brand + site + launch film) can go higher. We quote after a 30-minute discovery call, no obligation.</> },
          { q: "What's a typical timeline from kickoff to launch?", a: <>Our default rhythm is <span className="text-white font-medium">12 weeks</span> across Discover &rarr; Define &rarr; Design &rarr; Deploy, planned around EOFY and Christmas shutdown if relevant. Faster sprints (6&ndash;8 weeks) are possible; ASX-listed rebrands and APAC rollouts stretch to 4&ndash;6 months. We lock the schedule before you sign.</> },
          { q: "Do you work with early-stage startups or only enterprise?", a: <>Both. Our sweet spot is <span className="text-white font-medium">Blackbird / Square Peg / AirTree-backed Series A&ndash;C companies</span> and pre-ASX-IPO rebrands, but we take on a small number of seed-stage Aussie founders each year when the category excites us. We don&apos;t work with pre-product startups or personal brands.</> },
          { q: "We already have an in-house design team. How does that work?", a: <>Most of our clients do. We partner on the <span className="text-white font-medium">heavy-lift moments</span>, repositioning, new-state or trans-Tasman launches, rebrands, and build systems your team can run afterward. Shared Figma and Linear from day one; no black boxes.</> },
          { q: "Do you offer retainers or ongoing work?", a: <>Not in the traditional &ldquo;X hours a month&rdquo; sense. After launch we offer a <span className="text-white font-medium">quarterly partnership</span>, scoped around campaigns, new launches, or system expansion. Flat fee, defined deliverables.</> },
          { q: "Who actually owns the work, us or you?", a: <><span className="text-white font-medium">You own everything.</span> IP transfers on final invoice, files, fonts (where licensing permits), source code, the lot. We keep the right to showcase the work in our portfolio unless you ask us not to.</> },
          { q: "How do you handle NDAs and confidentiality?", a: <>Happy to sign a mutual NDA before the first call. We have a <span className="text-white font-medium">standard Australian-law NDA ready</span> (governed by NSW or VIC) that most legal teams approve without edits, or we can redline yours.</> },
        ]}
      />
    </>
  );
}
