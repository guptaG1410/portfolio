import { CountUp } from "@/components/ui/CountUp";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { achievements } from "@/lib/site";

export function Achievements() {
  return (
    <section id="outcomes" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="07" eyebrow="Outcomes" title="Measured where the work happened.">
          Each figure belongs to the project named with it. These are not career-wide averages.
        </SectionHeader>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item) => (
            <li key={item.label} className="reveal glass rounded-[1.7rem] p-6">
              <CountUp value={item.value} suffix={item.suffix} className="font-display text-6xl tracking-tight tabular-nums" />
              <p className="mt-3 text-lg text-text">{item.label}</p>
              <p className="mt-3 text-sm leading-relaxed text-faint">{item.context}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
