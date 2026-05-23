"use client";

import { useEffect } from "react";

export default function FooterReveal() {
  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      gsap.to(".ft-mark", {
        opacity: 1, y: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".ft-mark", start: "top 85%" },
      });
      gsap.to(".ft-ack", {
        opacity: 1, duration: 0.9, ease: "power2.out",
        scrollTrigger: { trigger: ".ft-ack", start: "top 90%" },
      });
    }
    init();
  }, []);

  return null;
}
