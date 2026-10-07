"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || reduced) return;
    let disposed = false;
    let stop: (() => void) | undefined;
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      // Keep the animation runtime out of the initial page load.
      // Content remains visible even before it loads or if it fails.
      import("framer-motion").then(({ animate }) => {
        if (disposed) return;
        const controls = animate(element, { opacity: [0.75, 1], y: [12, 0] }, { duration: 0.5, delay });
        stop = () => controls.stop();
      }).catch(() => { /* The already-visible content is the fallback. */ });
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => { disposed = true; observer.disconnect(); stop?.(); };
  }, [reduced, delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
