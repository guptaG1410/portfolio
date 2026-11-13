import { SectionHeader } from "@/components/ui/SectionHeader";
import { education } from "@/lib/site";

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="08" eyebrow="Education" title="Information Technology." />
        <article className="reveal glass rounded-[1.8rem] p-6 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs tracking-[0.18em] text-cyan uppercase">{education.dates}</p>
              <h3 className="mt-3 font-display text-3xl tracking-tight sm:text-4xl">
                {education.degree}
                <span className="mt-1 block text-2xl text-muted sm:text-3xl">{education.field}</span>
              </h3>
              <p className="mt-4 text-muted">
                {education.school}, {education.location}
              </p>
            </div>
            <p className="font-display text-5xl tracking-tight tabular-nums">
              {education.cgpa}
              <span className="ml-2 font-sans text-base tracking-normal text-faint">CGPA</span>
            </p>
          </div>
          <p className="mt-6 text-sm text-faint">{education.note}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {education.coursework.map((course) => (
              <li key={course} className="rounded-full border border-white/10 px-3 py-1 text-sm text-muted">
                {course}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}
