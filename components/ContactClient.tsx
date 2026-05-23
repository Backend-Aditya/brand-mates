"use client";

import { useEffect } from "react";

const selectStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23ffffff60' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 1.25rem center",
};

const EmailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-60">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

export default function ContactClient() {
  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const ease = "power4.out";
        const tl = gsap.timeline({ defaults: { ease } });
        tl.fromTo(".ct-badge",   { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.55 }, 0.3);
        tl.fromTo(".ct-heading", { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.95, ease: "expo.out" }, 0.45);
        tl.fromTo(".ct-intro",   { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, 0.72);
        tl.fromTo(".ct-form",    { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1   }, 0.85);
        tl.fromTo(".ct-sidebar", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1   }, 1.0);
      });
    }

    init();
    return () => ctx?.revert();
  }, []);

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative w-full pt-36 md:pt-44 pb-16 px-6 sm:px-10 md:px-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-brand-400/8 blur-[120px]"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="ct-badge opacity-0 translate-y-4 inline-flex items-center gap-2.5 mb-8 px-4 py-1.5 rounded-full border border-brand-400/40 bg-brand-400/10">
            <span className="relative w-2 h-2 shrink-0 rounded-full bg-brand-400">
              <span className="absolute -inset-1 rounded-full bg-brand-400 opacity-30 animate-pulse-ring"></span>
            </span>
            <span className="text-[0.72rem] font-medium tracking-[0.08em] uppercase text-brand-400">Booking Q2 · 2 slots left</span>
          </div>
          <h1 className="ct-heading opacity-0 translate-y-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold tracking-[-0.03em] leading-[1.02] text-white mb-6">
            Let&apos;s build something<br />
            <span className="bg-gradient-to-r from-brand-400 to-brand-300 bg-clip-text text-transparent italic">the market remembers.</span>
          </h1>
          <p className="ct-intro opacity-0 translate-y-6 text-white/55 text-base md:text-xl leading-relaxed max-w-xl mx-auto">
            Fill in the form below or jump straight to booking a discovery call. We respond to every inquiry within one business day, AEST.
          </p>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="px-6 sm:px-10 md:px-16 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_380px] gap-10 md:gap-16 items-start">

          {/* FORM */}
          <div className="ct-form opacity-0 translate-y-8">
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Your name</label>
                  <input type="text" placeholder="Alex Chen" className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Work email</label>
                  <input type="email" placeholder="alex@company.com.au" className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Company</label>
                  <input type="text" placeholder="Your company name" className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Website (optional)</label>
                  <input type="url" placeholder="yoursite.com.au" className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Service you&apos;re interested in</label>
                <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white/70 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all appearance-none cursor-pointer" style={selectStyle}>
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
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Monthly budget (AUD, ex-GST)</label>
                <select className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white/70 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all appearance-none cursor-pointer" style={selectStyle}>
                  <option value="" className="bg-brand-ink">Select budget range...</option>
                  <option value="2-5" className="bg-brand-ink">$2,000 – $5,000 / month</option>
                  <option value="5-10" className="bg-brand-ink">$5,000 – $10,000 / month</option>
                  <option value="10-20" className="bg-brand-ink">$10,000 – $20,000 / month</option>
                  <option value="20-50" className="bg-brand-ink">$20,000 – $50,000 / month</option>
                  <option value="50+" className="bg-brand-ink">$50,000+ / month</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">Tell us about your project</label>
                <textarea rows={5} placeholder="What are you trying to achieve? Where are you now, and where do you want to be? The more context you share, the better our first conversation will be." className="w-full rounded-xl border border-white/10 bg-white/[0.03] text-white placeholder:text-white/25 text-sm px-5 py-3.5 outline-none focus:border-brand-400/60 focus:bg-brand-400/5 transition-all resize-none leading-relaxed"></textarea>
              </div>
              <button type="submit" className="group self-start inline-flex items-center gap-2.5 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 font-bold text-sm px-8 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(33,186,128,0.35)]">
                Send enquiry
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <p className="text-white/35 text-xs">We respond within 1 business day (AEST). Your details are never shared with third parties.</p>
            </form>
          </div>

          {/* SIDEBAR */}
          <div className="ct-sidebar opacity-0 translate-y-8 flex flex-col gap-5 lg:sticky lg:top-24">

            {/* Book a call */}
            <div className="relative rounded-2xl overflow-hidden p-6 bg-gradient-to-br from-brand-400 to-brand-300 text-brand-700">
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
                  <div className="flex items-center gap-2"><CalendarIcon /><span>Next available: Wed 23 Apr 10:00 AEST</span></div>
                  <div className="flex items-center gap-2"><ClockIcon /><span>30 minutes via Google Meet</span></div>
                </div>
                <a href="#" className="block text-center rounded-full bg-brand-700 text-brand-300 hover:bg-brand-ink font-bold text-sm py-3 transition-colors">Book this slot →</a>
              </div>
            </div>

            {/* Direct contact */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 flex flex-col gap-4">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/40">Or reach us directly</p>
              <a href="mailto:studio@brandmates.com.au" className="group flex items-center gap-3 text-white/70 hover:text-brand-400 transition-colors text-sm">
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand-400/10 flex items-center justify-center transition-colors shrink-0"><EmailIcon /></span>
                studio@brandmates.com.au
              </a>
              <a href="tel:+61282345678" className="group flex items-center gap-3 text-white/70 hover:text-brand-400 transition-colors text-sm">
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand-400/10 flex items-center justify-center transition-colors shrink-0"><PhoneIcon /></span>
                +61 2 8234 5678 (Sydney)
              </a>
              <a href="tel:+61394321234" className="group flex items-center gap-3 text-white/70 hover:text-brand-400 transition-colors text-sm">
                <span className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-brand-400/10 flex items-center justify-center transition-colors shrink-0"><PhoneIcon /></span>
                +61 3 9432 1234 (Melbourne)
              </a>
              <div className="pt-3 mt-1 border-t border-white/5 text-white/35 text-xs">Mon – Fri · 9am – 6pm AEST/AEDT</div>
            </div>

            {/* Offices */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300 mb-2">Sydney HQ</p>
                <address className="not-italic text-white/55 text-xs leading-relaxed">Level 3, 56 Foveaux St<br />Surry Hills NSW 2010</address>
              </div>
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300 mb-2">Melbourne Studio</p>
                <address className="not-italic text-white/55 text-xs leading-relaxed">Suite 12, 112 Brunswick St<br />Fitzroy VIC 3065</address>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
