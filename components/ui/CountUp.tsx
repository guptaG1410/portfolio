"use client";

import { useEffect, useRef } from "react";

function format(value: number, decimals: number, suffix: string) {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  return `${rounded}${suffix}`;
}

export function CountUp({
  value,
  suffix = "",
  decimals = 0,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const finalText = format(value, decimals, suffix);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || cancelled) return;
        observer.disconnect();
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) {
          node.textContent = finalText;
          return;
        }

        const start = performance.now();
        const tick = (now: number) => {
          if (cancelled) return;
          const progress = Math.min(1, (now - start) / 1100);
          const eased = 1 - (1 - progress) ** 3;
          node.textContent = format(value * eased, decimals, suffix);
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [decimals, finalText, suffix, value]);

  return (
    <span ref={ref} className={className}>
      {finalText}
    </span>
  );
}
