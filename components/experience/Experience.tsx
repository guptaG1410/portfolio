"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { experience } from "@/lib/site";

export function Experience() {
  const [open, setOpen] = useState<number[]>([0]);
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const line = lineRef.current;
    const root = rootRef.current;
    if (!line || !root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      line.style.transform = "scaleY(1)";
      return;
    }

    let revert: (() => void) | undefined;
    let cancelled = false;

    void (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const context = gsap.context(() => {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "bottom 65%",
              scrub: 0.4,
            },
          },
        );
      });
      revert = () => context.revert();
    })();

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  function toggle(index: number) {
    setOpen((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]));
  }

  return (
    <section id="experience" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="04" eyebrow="Experience" title="Professional experience">
          Three roles, from interface work to API platforms, cloud infrastructure, and applied AI.
        </SectionHeader>
        <div ref={rootRef} className="relative">
          <div className="absolute top-0 bottom-0 left-[7px] w-px bg-white/10 md:left-[148px]" aria-hidden="true" />
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-[7px] w-px origin-top scale-y-0 bg-gradient-to-b from-violet via-cyan to-transparent md:left-[148px]"
            aria-hidden="true"
          />
          <ol className="space-y-6">
            {experience.map((role, index) => {
              const expanded = open.includes(index);
              const panelId = `experience-panel-${index}`;
              return (
                <li key={role.company} className="relative grid gap-3 md:grid-cols-[140px_minmax(0,1fr)] md:gap-12">
                  <p className="pl-8 font-mono text-xs tracking-wide text-faint md:pt-7 md:pr-6 md:pl-0 md:text-right">
                    {role.dates}
                  </p>
                  <span className="absolute top-7 left-0 h-3.5 w-3.5 rounded-full border border-cyan bg-ink md:left-[142px]" aria-hidden="true" />
                  <article className="glass ml-8 rounded-3xl p-5 md:ml-0 md:p-7">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl tracking-tight">{role.role}</h3>
                        <p className="mt-1 text-muted">{role.company}</p>
                        <p className="mt-1 text-sm text-faint">{role.location}</p>
                      </div>
                      <button
                        type="button"
                        className="button-nav"
                        aria-expanded={expanded}
                        aria-controls={panelId}
                        onClick={() => toggle(index)}
                      >
                        {expanded ? "Hide work" : "View work"}
                        <ChevronDown size={15} className={`transition-transform ${expanded ? "rotate-180" : ""}`} aria-hidden="true" />
                      </button>
                    </div>
                    <div id={panelId} className="expand grid transition-[grid-template-rows] duration-500" style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}>
                      <div className="overflow-hidden">
                        <ul className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm leading-relaxed text-muted">
                          {role.points.map((point) => (
                            <li key={point} className="grid grid-cols-[auto_1fr] gap-3">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan" aria-hidden="true" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
