"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll() {
  const pathname = usePathname();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const LenisModule = await import("lenis" as any);
      const Lenis = LenisModule.default ?? LenisModule;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      const tickerFn = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(tickerFn);
        lenis.destroy();
        lenisRef.current = null;
      };
    }

    init();
    return () => cleanup?.();
  }, []);

  useEffect(() => {
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target ?? 0, { immediate: true });
    } else if (target) {
      target.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [pathname]);

  // Same-page #hash links need manual handling for two reasons:
  // 1. Next's <Link> only pushes a new URL when the pathname is unchanged
  //    - it doesn't scroll and doesn't fire "hashchange".
  // 2. Plain <a href="#id"> anchors DO jump natively, but that instant
  //    jump fights Lenis's virtual scroll position and looks broken.
  // So: intercept every #hash click ourselves and drive it through Lenis.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!(e.target instanceof Element)) return;
      const anchor = e.target.closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      if (window.location.hash !== url.hash) {
        history.pushState(null, "", url.hash);
      }

      if (lenisRef.current) {
        lenisRef.current.scrollTo(target);
      } else {
        target.scrollIntoView({ behavior: "smooth" });
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
