"use client";

import { Download, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const barRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pendingSection = useRef<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const bar = barRef.current;
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.location.pathname !== "/") return;
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible[0]) return;
        visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const y = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  useEffect(() => {
    if (open) return;
    const id = pendingSection.current;
    if (!id) return;
    pendingSection.current = null;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open, reduce]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function navigate(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const section = document.getElementById(id);
    const menuWasOpen = open;
    setOpen(false);
    if (!section || window.location.pathname !== "/") return;
    event.preventDefault();
    window.history.pushState(null, "", `/#${id}`);
    if (menuWasOpen) {
      pendingSection.current = id;
      return;
    }
    section.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <>
    <header className={cn("fixed inset-x-0 top-0 z-50", scrolled || open ? "nav-solid" : "nav-clear")}>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
      <div className="shell relative z-50 flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <Link href="/#home" className="font-display text-lg tracking-tight" aria-label="Govind Gupta, home" onClick={(event) => navigate(event, "home")}>
          {site.monogram}
        </Link>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.id}
              href={`/#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              onClick={(event) => navigate(event, item.id)}
              className={cn(
                "relative px-3 py-2 text-sm transition-colors",
                active === item.id ? "text-text" : "text-muted hover:text-text",
              )}
            >
              {item.label}
              {active === item.id ? (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan"
                  transition={{ duration: reduce ? 0 : 0.35 }}
                />
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a className="button-nav hidden sm:inline-flex" href={site.resume.href} download={site.resume.fileName}>
            <Download size={15} aria-hidden="true" />
            Resume
          </a>
          <a className="button-nav px-2.5 sm:hidden" href={site.resume.href} download={site.resume.fileName} aria-label="Download resume">
            <Download size={16} aria-hidden="true" />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            className="button-nav px-2.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
    </header>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="mobile-nav fixed inset-0 z-40 px-6 pt-24 md:hidden"
            style={{ backgroundColor: "#07080d" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {nav.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={(event) => navigate(event, item.id)}
                  className="flex items-baseline gap-4 border-b border-white/10 py-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : index * 0.04 }}
                >
                  <span className="font-mono text-xs text-cyan">{item.index}</span>
                  <span className="font-display text-4xl tracking-tight">{item.label}</span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
