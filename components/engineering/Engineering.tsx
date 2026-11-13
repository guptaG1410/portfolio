import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tilt } from "@/components/ui/Tilt";
import { engineering } from "@/lib/site";
import { Diagram } from "./Diagrams";

export function Engineering() {
  return (
    <section id="engineering" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="06" eyebrow="Practice" title="Engineering Beyond the Interface">
          The interface is the surface. These are the systems behind the work.
        </SectionHeader>
        <div className="grid gap-4 md:grid-cols-2">
          {engineering.map((item) => (
            <Tilt key={item.id}>
              <article className="glass h-full rounded-[1.7rem] p-5 sm:p-6">
                <Diagram id={item.id} />
                <h3 className="mt-2 font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.copy}</p>
              </article>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
