import { ArrowUpRight, Download } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { heroLabels, site } from "@/lib/site";
import { HeroBackground } from "./HeroBackground";
import { ScrollParallax } from "./ScrollParallax";
import { SystemMap } from "./SystemMap";

export function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      <HeroBackground />
      <div className="orb orb-violet orb-drift" aria-hidden="true" />
      <ScrollParallax className="orb orb-blue" speed={90}>
        <span />
      </ScrollParallax>
      <div className="pointer-events-none absolute inset-4 hidden border border-white/10 md:block lg:inset-6" aria-hidden="true">
        <span className="frame-corner top-0 left-0 border-t border-l" />
        <span className="frame-corner top-0 right-0 border-t border-r" />
        <span className="frame-corner bottom-0 left-0 border-b border-l" />
        <span className="frame-corner right-0 bottom-0 border-r border-b" />
      </div>

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center pt-16 pb-16 sm:pt-20 sm:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]">
          <div>
            <p className="hero-line font-mono text-xs tracking-[0.24em] text-cyan uppercase" style={{ animationDelay: "0.05s" }}>
              {site.role} · {site.location}
            </p>
            <h1 className="mt-6">
              <span className="hero-line block font-mono text-sm tracking-[0.08em] text-faint" style={{ animationDelay: "0.14s" }}>
                HEY, I&apos;M
              </span>
              <span className="hero-title hero-line mt-3 block font-display" style={{ animationDelay: "0.24s" }}>
                GOVIND GUPTA
              </span>
            </h1>
            <p className="hero-line mt-5 max-w-xl font-serif text-[1.7rem] leading-[1.15] text-white/90 italic sm:mt-8 sm:text-4xl sm:leading-tight md:text-5xl" style={{ animationDelay: "0.38s" }}>
              {site.tagline[0]}
              <br />
              {site.tagline[1]}
            </p>
            <p className="hero-line mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-6 sm:text-lg" style={{ animationDelay: "0.5s" }}>
              {site.heroSupport}
            </p>
            <p className="hero-line mt-5 font-mono text-[11px] tracking-[0.14em] text-faint uppercase" style={{ animationDelay: "0.58s" }}>
              {site.positioning.join("  ·  ")}
            </p>
            <div className="hero-line mt-6 flex flex-col items-start gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center" style={{ animationDelay: "0.66s" }}>
              <Magnetic>
                <a className="button-primary" href="#projects">
                  Explore My Work
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Magnetic>
              <Magnetic>
                <a className="button-secondary" href={site.resume.href} download={site.resume.fileName}>
                  <Download size={16} aria-hidden="true" />
                  Download Resume
                </a>
              </Magnetic>
              <Magnetic>
                <a className="button-ghost" href="#contact">
                  Let&apos;s Connect
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Magnetic>
            </div>
            {site.availability.show ? (
              <p className="hero-line mt-8 inline-flex items-center gap-2 text-sm text-muted" style={{ animationDelay: "0.76s" }}>
                <span className="pulse-dot inline-block h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
                {site.availability.label}
              </p>
            ) : null}
            <ul className="mt-8 flex flex-wrap gap-2 md:hidden">
              {heroLabels.map((label) => (
                <li key={label} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] tracking-wide text-muted">
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <SystemMap />
        </div>
      </div>

      <a href="#about" className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] tracking-[0.24em] text-faint uppercase">
        Scroll
        <span className="scroll-mouse" aria-hidden="true" />
        <span className="sr-only">to about</span>
      </a>
    </section>
  );
}
