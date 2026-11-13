import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tilt } from "@/components/ui/Tilt";
import { projects } from "@/lib/site";
import { ProjectVisual } from "./ProjectVisual";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="05" eyebrow="Projects" title="Featured projects">
          Two personal builds. Visuals are conceptual studies of the described work, not screenshots. Live and repository links stay empty until they are added.
        </SectionHeader>
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <Tilt key={project.slug}>
              <article className="glass flex h-full flex-col overflow-hidden rounded-[1.8rem]">
                <ProjectVisual slug={project.slug} />
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">{project.title}</p>
                  <h3 className="mt-3 font-display text-3xl tracking-tight">{project.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li key={tech} className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] tracking-wide text-faint">
                        {tech}
                      </li>
                    ))}
                  </ul>
                  <Link href={`/projects/${project.slug}`} className="button-ghost mt-6 w-fit px-0">
                    View project
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
