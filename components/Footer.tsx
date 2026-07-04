"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight as ArrowIcon } from "lucide-react";
import { FaInstagram, FaLinkedin, FaDribbble, FaXTwitter } from "react-icons/fa6";

const AussieFlag = () => (
  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="rounded-sm overflow-hidden">
    <rect width="14" height="10" fill="#012169" />
    <path d="M0 0l14 10M14 0L0 10" stroke="#fff" strokeWidth="1.2" />
    <path d="M0 0l14 10M14 0L0 10" stroke="#C8102E" strokeWidth="0.7" />
    <path d="M7 0v10M0 5h14" stroke="#fff" strokeWidth="2" />
    <path d="M7 0v10M0 5h14" stroke="#C8102E" strokeWidth="1.2" />
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
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/40 mt-1">Merrylands, Sydney</span>
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
                <button type="submit" aria-label="Subscribe to the studio dispatch" className="shrink-0 w-9 h-9 rounded-full bg-brand-400 hover:bg-brand-300 text-brand-700 flex items-center justify-center transition-colors">
                  <ArrowIcon size={14} strokeWidth={2.5} />
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
                { href: "/careers", label: "Careers", badge: "+2" },
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
                { href: "/services/web-design-development", label: "Web Design & Development" },
                { href: "/services/social-media", label: "Social Media" },
                { href: "/services/paid-ads", label: "Paid Ads" },
                { href: "/services/content-creation", label: "Content Creation" },
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
                  <ArrowIcon size={14} />
                </span>
              </a>
              <div className="pt-4 border-t border-white/10">
                <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300 mb-1">Sydney</div>
                <address className="not-italic text-white/72 text-xs leading-relaxed">
                  Merrylands NSW 2160<br />
                  <a href="tel:+61426525614" className="text-white/75 hover:text-brand-300 transition-colors">+61 426 525 614</a>
                </address>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2" aria-hidden="true">
              <SocialIcon label="Instagram">
                <FaInstagram size={15} />
              </SocialIcon>
              <SocialIcon label="LinkedIn">
                <FaLinkedin size={15} />
              </SocialIcon>
              <SocialIcon label="Dribbble">
                <FaDribbble size={15} />
              </SocialIcon>
              <SocialIcon label="Twitter">
                <FaXTwitter size={15} />
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
            <Link href="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <Link href="/terms" className="hover:text-white/80 transition-colors">Terms</Link>
            <span className="w-1 h-1 rounded-full bg-white/20"></span>
            <Link href="/accessibility" className="hover:text-white/80 transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
