"use client";

import { useEffect } from "react";

export function Loader() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      try {
        sessionStorage.setItem("gg-loaded", "1");
      } catch {
        /* Storage can be blocked. The loader still hides via CSS. */
      }
    }, 1200);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="loader-mark" aria-hidden="true">
      <div className="text-center">
        <p className="font-display text-5xl tracking-tight">GG</p>
        <p className="mt-3 font-mono text-[10px] tracking-[0.28em] text-faint">GOVIND GUPTA</p>
      </div>
    </div>
  );
}
