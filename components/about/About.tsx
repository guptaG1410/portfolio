import { SectionHeader } from "@/components/ui/SectionHeader";
import { aboutParagraphs, aboutStats, site } from "@/lib/site";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="02" eyebrow="About" title="Engineering that stays reliable after the demo.">
          <p className="font-serif text-2xl leading-snug text-text/90 italic sm:text-3xl">{site.intro}</p>
        </SectionHeader>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:gap-16">
          <div className="reveal space-y-5 text-lg leading-relaxed text-muted">
            {aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {aboutStats.map((stat) => (
              <li key={stat.label} className="reveal glass rounded-3xl p-5">
                <p className="font-display text-4xl tracking-tight tabular-nums">{stat.value}</p>
                <p className="mt-1 text-sm text-text">{stat.label}</p>
                <p className="mt-3 text-sm leading-relaxed text-faint">{stat.context}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
