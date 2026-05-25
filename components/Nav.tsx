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
  const navRef = useRef<HTMLElement>(null);

  // Hide on scroll down, show on scroll up or when stopped
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const SHOW_THRESHOLD = 80;  // px from top — always visible above this
    const DELTA = 6;            // px accumulated before direction triggers hide/show

    let lastY = window.scrollY;
    let direction: "up" | "down" | null = null;
    let accumulated = 0;
    let isHidden = false;
    let rafId: number;
    let stopTimer: ReturnType<typeof setTimeout>;

    const show = () => {
      if (isHidden) {
        isHidden = false;
        nav.style.transform = "translateY(0)";
      }
    };

    const hide = () => {
      if (!isHidden) {
        isHidden = true;
        nav.style.transform = "translateY(-110%)";
      }
    };

    const onScroll = () => {
      if (isMenuOpen.current) return;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY;
        const diff = y - lastY;

        if (Math.abs(diff) < 1) return; // ignore sub-pixel noise

        const newDir = diff > 0 ? "down" : "up";

        // Reset accumulator on direction flip
        if (newDir !== direction) {
          direction = newDir;
          accumulated = 0;
        }
        accumulated += Math.abs(diff);
        lastY = y;

        if (y <= SHOW_THRESHOLD) {
          show();
        } else if (direction === "down" && accumulated >= DELTA) {
          hide();
        } else if (direction === "up" && accumulated >= DELTA) {
          show();
        }

        // Show after scroll fully stops
        clearTimeout(stopTimer);
        stopTimer = setTimeout(() => {
          show();
          direction = null;
          accumulated = 0;
        }, 350);
      });
    };

    // Always show nav when tab regains focus
    const onVisibility = () => {
      if (document.visibilityState === "visible") show();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(rafId);
      clearTimeout(stopTimer);
    };
  }, []);

  useEffect(() => {
    let gsap: typeof import("gsap").gsap;
    let cleanup: (() => void) | undefined;

    async function init() {
      const gsapModule = await import("gsap");
      const scrollModule = await import("gsap/ScrollTrigger");

      gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const navToggler = document.querySelector<HTMLButtonElement>(".nav-toggler");
      const navBgs = document.querySelectorAll<HTMLElement>(".nav-bg");
      if (!navToggler || !navBgs.length) return;

      const linkEls = document.querySelectorAll<HTMLElement>(".nav-primary-links a");

      const tl = gsap.timeline({
        paused: true,
        onStart: () => { isAnimating.current = true; },
        onComplete: () => { isAnimating.current = false; },
        onReverseComplete: () => {
          isAnimating.current = false;
        },
      });

      tl.to(navBgs, { scaleY: 1, duration: 0.75, stagger: 0.1, ease: "power3.inOut" });
      tl.to(".nav-items", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.75, ease: "power3.inOut" }, "-=0.6");
      tl.fromTo(linkEls, { y: "100%" }, { y: "0%", duration: 0.6, stagger: 0.05, ease: "power3.out" }, "-=0.35");

      tlRef.current = tl;

      function handleClick() {
        if (isAnimating.current) return;
        if (!isMenuOpen.current) {
          tl.play();
          document.body.style.overflow = "hidden";
        } else {
          tl.reverse();
          document.body.style.overflow = "";
        }
        isMenuOpen.current = !isMenuOpen.current;
        navToggler!.classList.toggle("open", isMenuOpen.current);
        navToggler!.setAttribute("aria-expanded", String(isMenuOpen.current));
        const navMenu = document.getElementById("nav-menu");
        if (navMenu) navMenu.setAttribute("aria-hidden", String(!isMenuOpen.current));
      }

      navToggler.addEventListener("click", handleClick);

      cleanup = () => {
        navToggler.removeEventListener("click", handleClick);
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
      document.body.style.overflow = "";
      const toggler = document.querySelector<HTMLButtonElement>(".nav-toggler");
      toggler?.classList.remove("open");
      toggler?.setAttribute("aria-expanded", "false");
      document.getElementById("nav-menu")?.setAttribute("aria-hidden", "true");
    }
  }, [pathname]);

  const navLinks = [
    { href: "/work", label: "Work" },
    { href: "/services", label: "Services" },
    { href: "/studio", label: "Studio" },
    { href: "/journal", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav ref={navRef} className="nav-autohide fixed top-0 w-full flex items-center justify-between p-4 z-100" aria-label="Main navigation">
        <Link href="/" className="block">
          <Image src="/logo.png" alt="BrandMates" width={40} height={40} className="w-10 h-10" priority loading="eager" />
        </Link>
        <button className="nav-toggler bg-transparent border-0 cursor-pointer p-4 -mr-4" aria-label="Toggle navigation menu" aria-expanded="false" aria-controls="nav-menu">
          <svg className="block" width="40" height="12" viewBox="0 0 40 12" fill="none" overflow="visible" aria-hidden="true">
            <rect className="bar-top" x="0" y="0" width="40" height="2" fill="white" />
            <rect className="bar-bottom" x="0" y="10" width="40" height="2" fill="white" />
          </svg>
        </button>
      </nav>

      <div id="nav-menu" aria-hidden="true" className="nav-content fixed inset-0 w-full h-svh pointer-events-none z-90 overflow-hidden">
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-300"></div>
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-700"></div>
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-500"></div>
        <div className="nav-bg absolute inset-0 -z-10 origin-top scale-y-0 will-change-transform bg-brand-400"></div>

        <div className="nav-items h-full flex flex-col justify-center pointer-events-auto bg-brand-600 p-8 md:p-32 md:flex-row md:items-center md:gap-8 [clip-path:polygon(0%_0%,100%_0%,100%_0%,0%_0%)]">
          <div className="nav-primary-links flex flex-col">
            {navLinks.map(({ href, label }) => (
              <div key={href} className="overflow-hidden">
                <Link
                  href={href}
                  className={`link-underline relative block text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-2 ${pathname === href ? "text-brand-400" : "text-white"}`}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
