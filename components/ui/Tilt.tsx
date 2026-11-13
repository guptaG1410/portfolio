"use client";

import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Tilt({ children, className }: { children: ReactNode; className?: string }) {
  function onMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = event.currentTarget;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transition = "transform 80ms linear";
    node.style.transform = `perspective(900px) rotateX(${(-py * 5.5).toFixed(2)}deg) rotateY(${(px * 6.5).toFixed(2)}deg)`;
  }

  function onLeave(event: PointerEvent<HTMLDivElement>) {
    event.currentTarget.style.transition = "transform 600ms cubic-bezier(0.16, 1, 0.3, 1)";
    event.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  }

  return (
    <div className={cn(className)} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
