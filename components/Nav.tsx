"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const isMenuOpen = useRef(false);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Hide on scroll down, show on scroll up or when stopped
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const SHOW_THRESHOLD = 80;  // px from top - always visible above this
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

      // scrollbar-gutter: stable (globals) keeps the gutter reserved, so
      // toggling overflow never reflows the page - no width compensation needed.
      const lockScroll = () => { document.documentElement.style.overflow = "hidden"; };
      const unlockScroll = () => { document.documentElement.style.overflow = ""; };

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const tl = gsap.timeline({ paused: true });

      if (reducedMotion) {
        tl.set(navBgs, { scaleY: 1 });
        tl.set(".nav-items", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" });
        tl.set(linkEls, { y: "0%" });
      } else {
        tl.to(navBgs, { scaleY: 1, duration: 0.75, stagger: 0.1, ease: "power3.inOut" });
        tl.to(".nav-items", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.75, ease: "power3.inOut" }, "-=0.6");
        tl.fromTo(linkEls, { y: "100%" }, {
          y: "0%", duration: 0.6, stagger: 0.05, ease: "power3.out",
          onComplete: () => { if (isMenuOpen.current) linkEls[0]?.focus({ preventScroll: true }); },
        }, "-=0.35");
      }

      tlRef.current = tl;

      const mainContent = document.getElementById("main-content");

      function closeMenu() {
        tl.reverse();
        unlockScroll();
        isMenuOpen.current = false;
        navToggler!.classList.remove("open");
        navToggler!.setAttribute("aria-expanded", "false");
        document.getElementById("nav-menu")?.setAttribute("aria-hidden", "true");
        if (mainContent) mainContent.removeAttribute("inert");
        navToggler!.focus();
      }

      function handleClick() {
        if (!isMenuOpen.current) {
          tl.play();
          lockScroll();
          isMenuOpen.current = true;
          navToggler!.classList.add("open");
          navToggler!.setAttribute("aria-expanded", "true");
          document.getElementById("nav-menu")?.setAttribute("aria-hidden", "false");
          if (mainContent) mainContent.setAttribute("inert", "");
          if (reducedMotion) linkEls[0]?.focus({ preventScroll: true });
        } else {
          closeMenu();
        }
      }

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape" && isMenuOpen.current) closeMenu();
      };

      document.addEventListener("keydown", handleKeydown);
      navToggler.addEventListener("click", handleClick);

      cleanup = () => {
        navToggler.removeEventListener("click", handleClick);
        document.removeEventListener("keydown", handleKeydown);
        tl.kill();
      };
    }

    init();
    return () => cleanup?.();
  }, []);

  // Route landed: drop the optimistic click state, pathname is now the source of truth
  useEffect(() => {
    setActiveHref(null);
  }, [pathname]);

  // Close menu on route change
  useEffect(() => {
    if (isMenuOpen.current && tlRef.current) {
      tlRef.current.reverse();
      isMenuOpen.current = false;
      document.documentElement.style.overflow = "";
      const toggler = document.querySelector<HTMLButtonElement>(".nav-toggler");
      toggler?.classList.remove("open");
      toggler?.setAttribute("aria-expanded", "false");
      document.getElementById("nav-menu")?.setAttribute("aria-hidden", "true");
      document.getElementById("main-content")?.removeAttribute("inert");
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
                  onClick={() => setActiveHref(href)}
                  className={`link-underline relative block text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-2 transition-colors duration-200 ease-out ${(activeHref ?? pathname) === href ? "text-brand-400" : "text-white"}`}
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
