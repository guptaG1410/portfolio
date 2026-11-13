"use client";

import { useEffect, useRef } from "react";

export function Year() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (node) node.textContent = String(new Date().getFullYear());
  }, []);

  return <span ref={ref}>2026</span>;
}
