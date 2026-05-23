"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isMenuOpen = useRef(false);
  const isAnimating = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    let gsap: typeof import("gsap").gsap;
    let SplitText: typeof import("gsap/SplitText").SplitText;
    let cleanup: (() => void) | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const splitModule = await import("gsap/SplitText");
      const scrollModule = await import("gsap/ScrollTrigger");

      gsap = gsapModule.gsap;
      SplitText = splitModule.SplitText;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(SplitText, ScrollTrigger);

      const navToggler = document.querySelector<HTMLButtonElement>(".nav-toggler");
      const navBgs = document.querySelectorAll<HTMLElement>(".nav-bg");
      if (!navToggler || !navBgs.length) return;

      const splitLinks = SplitText.create(".nav-items a", {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });

      const linkBlocks = [".nav-primary-links .line"];

      const tl = gsap.timeline({
        paused: true,
        onStart: () => { isAnimating.current = true; },
        onComplete: () => { isAnimating.current = false; },
        onReverseComplete: () => {
          gsap.set(linkBlocks.join(", "), { y: "100%" });
          isAnimating.current = false;
        },
      });

      tl.to(navBgs, { scaleY: 1, duration: 0.75, stagger: 0.1, ease: "power3.inOut" });
      tl.to(".nav-items", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.75, ease: "power3.inOut" }, "-=0.6");

      tlRef.current = tl;

      function animateLinksIn() {
        linkBlocks.forEach((selector) => {
          gsap.fromTo(selector, { y: "100%" }, { y: "0%", duration: 0.75, stagger: 0.05, ease: "power3.out", delay: 0.85 });
        });
      }

      function handleClick() {
        if (isAnimating.current) return;
        if (!isMenuOpen.current) {
          tl.play();
          animateLinksIn();
        } else {
          tl.reverse();
        }
        isMenuOpen.current = !isMenuOpen.current;
        navToggler!.classList.toggle("open", isMenuOpen.current);
        document.body.classList.toggle("overflow-hidden", isMenuOpen.current);
      }

      navToggler.addEventListener("click", handleClick);

      cleanup = () => {
        navToggler.removeEventListener("click", handleClick);
        splitLinks.revert();
        tl.kill();
      };
    }

    init();
    return () => cleanup?.();
  }, []);

  // Close menu on route change
  useEffect(() => {
    if (isMenuOpen.current && tlRef.current) {
      tlRef.current.reverse();
      isMenuOpen.current = false;
      document.body.classList.remove("overflow-hidden");
      const toggler = document.querySelector<HTMLButtonElement>(".nav-toggler");
      toggler?.classList.remove("open");
    }
  }, [pathname]);

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/studio", label: "Studio" },
    { href: "/journal", label: "Journal" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full flex items-center justify-between p-4 z-[100]">
        <Link href="/" className="block">
          <Image src="/logo.png" alt="BrandMates" width={40} height={40} className="w-10 h-10" />
        </Link>
        <button className="nav-toggler flex flex-col items-center justify-center gap-[5px] bg-transparent border-0 cursor-pointer">
          <span className="block w-10 h-[2px] bg-white"></span>
          <span className="block w-10 h-[2px] bg-white"></span>
        </button>
      </nav>

      <div className="nav-content fixed inset-0 w-full h-svh pointer-events-none z-[90]">
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-300"></div>
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-700"></div>
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-500"></div>
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-400"></div>

        <div className="nav-items h-full flex flex-col justify-center pointer-events-auto bg-brand-600 p-8 md:p-32 md:flex-row md:items-center md:gap-8">
          <div className="nav-primary-links flex flex-col">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`link-underline relative block text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-2 ${pathname === href ? "text-brand-400" : "text-white"}`}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
