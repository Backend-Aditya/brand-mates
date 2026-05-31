"use client";

import Link from "next/link";
import Image from "next/image";

const AussieFlag = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="rounded-sm overflow-hidden">
    <rect width="14" height="10" fill="#012169" />
    <path d="M0 0l14 10M14 0L0 10" stroke="#fff" strokeWidth="1.2" />
    <path d="M0 0l14 10M14 0L0 10" stroke="#C8102E" strokeWidth="0.7" />
    <path d="M7 0v10M0 5h14" stroke="#fff" strokeWidth="2" />
    <path d="M7 0v10M0 5h14" stroke="#C8102E" strokeWidth="1.2" />
  </svg>
);

const ArrowIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SocialIcon = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <a href="#" aria-label={label} className="w-10 h-10 rounded-full border border-white/10 bg-white/2 text-white/60 hover:text-brand-700 hover:bg-brand-400 hover:border-brand-400 flex items-center justify-center transition-all duration-300">
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer id="footer" className="relative w-full overflow-hidden bg-brand-ink border-t border-white/5">
      {/* Giant wordmark */}
      <div className="relative border-b border-white/5 overflow-hidden">
        <div className="ft-mark opacity-0 translate-y-10 py-10 md:py-14 px-6 sm:px-10 md:px-16 max-w-400 mx-auto">
          <div className="flex items-center gap-4 md:gap-8">
            <span
              className="font-black leading-none tracking-[-0.06em] text-white whitespace-nowrap pr-[0.08em]"
              style={{ fontSize: "clamp(3.5rem, 12vw, 12rem)" }}
            >
              BrandMates
            </span>
            <div className="hidden md:flex flex-1 items-center justify-end gap-6">
              <div className="h-px bg-white/10 flex-1 max-w-60"></div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-brand-300">Est. 2017</span>
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/40 mt-1">Sydney · Melbourne</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Columns */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand + newsletter */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="BrandMates" width={40} height={40} className="w-10 h-10" />
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-base">BrandMates</span>
                <span className="text-white/65 text-xs">We build belief.</span>
              </div>
            </div>
            <p className="text-white/72 text-sm leading-relaxed max-w-xs">
              An Australian brand studio for founders and CMOs who need the work to actually hold up. Strategy, identity, and launch, end to end, in your timezone.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-300">Studio dispatch</label>
              <div className="flex items-center gap-0 rounded-full border border-white/10 bg-white/2 focus-within:border-brand-400/60 transition-colors overflow-hidden pl-5 pr-1 py-1">
                <input type="email" placeholder="you@company.com.au" className="flex-1 bg-transparent border-0 outline-none text-white placeholder:text-white/55 text-sm py-2" />
                <button type="submit" className="shrink-0 w-9 h-9 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 flex items-center justify-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
              <span className="text-white/60 text-[0.7rem]">One email a month. What&apos;s working in AU digital marketing right now.</span>
            </form>
          </div>

          {/* Studio */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-5">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60">Studio</span>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { href: "/work", label: "Selected Work" },
                { href: "/services", label: "Services" },
                { href: "/#process", label: "Process" },
                { href: "/studio", label: "Meet the Mates" },
                { href: "/journal", label: "Journal" },
                { href: "/studio#careers", label: "Careers", badge: "+2" },
              ].map(({ href, label, badge }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center min-h-11 sm:min-h-0 text-white/75 hover:text-brand-300 transition-colors">
                    {label}{badge && <span className="ml-1 text-[0.6rem] text-brand-400">{badge}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-5">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60">Services</span>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { href: "/services#web", label: "Web Design & Development" },
                { href: "/services#social", label: "Social Media" },
                { href: "/services#ads", label: "Paid Ads" },
                { href: "/services#content", label: "Content Creation" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="flex items-center min-h-11 sm:min-h-0 text-white/75 hover:text-brand-300 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/60">Say g&apos;day</span>
            <div className="flex flex-col gap-4 text-sm">
              <a href="mailto:studio@brandmates.com.au" className="group inline-flex items-center gap-2 text-white font-semibold text-base md:text-lg hover:text-brand-300 transition-colors">
                <span>studio@brandmates.com.au</span>
                <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                  <ArrowIcon />
                </span>
              </a>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300 mb-1">Sydney</div>
                  <address className="not-italic text-white/72 text-xs leading-relaxed">
                    Level 3, 56 Foveaux St<br />Surry Hills NSW 2010<br />
                    <a href="tel:+61282345678" className="text-white/75 hover:text-brand-300 transition-colors">+61 2 8234 5678</a>
                  </address>
                </div>
                <div>
                  <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300 mb-1">Melbourne</div>
                  <address className="not-italic text-white/72 text-xs leading-relaxed">
                    Suite 12, 112 Brunswick St<br />Fitzroy VIC 3065<br />
                    <a href="tel:+61394321234" className="text-white/75 hover:text-brand-300 transition-colors">+61 3 9432 1234</a>
                  </address>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2" aria-hidden="true">
              <SocialIcon label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Dribbble">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm9.568 7.375c.55 1.25.863 2.63.938 4.075-.3-.063-3.325-.675-6.363-.3-.063-.163-.137-.325-.212-.488a31.8 31.8 0 0 0-.625-1.337c3.363-1.375 4.9-3.35 5.062-3.55a9.93 9.93 0 0 1 1.2 1.6zm-2.55-2.738c-.138.2-1.525 2.05-4.75 3.275-1.5-2.75-3.137-5-3.375-5.325a9.945 9.945 0 0 1 1.263-.1c3.025 0 5.725 1.4 6.862 2.15zM7.7 1.675c.225.3 1.825 2.563 3.35 5.25-4.275 1.138-8.05 1.113-8.463 1.113a10 10 0 0 1 5.113-6.363zM2.15 12.013v-.313c.4.013 4.85.075 9.425-1.3.263.513.513 1.037.75 1.563-.125.037-.25.075-.363.113-4.725 1.525-7.225 5.7-7.437 6.05a9.955 9.955 0 0 1-2.375-6.113zm3.738 7.525c.138-.225 1.675-3.237 6.837-5.037l.063-.025c1.288 3.35 1.825 6.162 1.963 6.975a9.91 9.91 0 0 1-8.863-1.913zm10.95 1.138c-.1-.588-.587-3.275-1.775-6.575 2.862-.45 5.362.288 5.675.388a9.94 9.94 0 0 1-3.9 6.188z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>

      {/* Acknowledgment of Country */}
      <div className="relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-8">
          <div className="ft-ack opacity-0 flex items-start gap-4 text-white/72 text-xs md:text-sm leading-relaxed max-w-3xl">
            <span className="shrink-0 mt-0.5 w-1 h-10 bg-linear-to-b from-yellow-400 via-orange-500 to-red-600 rounded-full"></span>
            <p>
              BrandMates acknowledges the Gadigal people of the Eora Nation and the Wurundjeri people of the Kulin Nation, the Traditional Custodians of the lands on which our studios are built. We pay our respects to Elders past, present, and emerging, and extend that respect to all Aboriginal and Torres Strait Islander peoples.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-5 text-white/60">
            <span>© 2017–2025 BrandMates Pty Ltd</span>
            <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20"></span>
            <span>ABN 88 612 334 901</span>
            <span className="hidden md:inline w-1 h-1 rounded-full bg-white/20"></span>
            <span className="inline-flex items-center gap-1.5">
              <AussieFlag />
              Proudly Australian
            </span>
          </div>
          <div className="flex items-center gap-5 text-white/50">
            <span className="cursor-default">Privacy</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="cursor-default">Terms</span>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <span className="cursor-default">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
