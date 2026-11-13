import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { getProject, projects } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <article className="shell pt-32 pb-24">
      <Link href="/#projects" className="font-mono text-xs tracking-[0.18em] text-cyan uppercase">
        Back to projects
      </Link>
      <p className="mt-8 font-mono text-xs tracking-[0.22em] text-faint uppercase">{project.title}</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-7xl">{project.name}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <li key={tech} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted">
            {tech}
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <ProjectVisual slug={project.slug} large />
        <p className="mt-3 text-sm text-faint">Conceptual preview of the described work. Not a product screenshot.</p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)]">
        <ul className="space-y-4">
          {project.highlights.map((highlight) => (
            <li key={highlight.title} className="glass rounded-3xl p-5">
              <h2 className="font-display text-2xl tracking-tight">{highlight.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{highlight.detail}</p>
            </li>
          ))}
        </ul>
        <aside className="glass h-fit rounded-3xl p-5">
          <h2 className="font-display text-xl">Links</h2>
          <p className="mt-2 text-sm leading-relaxed text-faint">
            No live URL or repository is published here yet. Add them in lib/site.ts when they exist.
          </p>
          <div className="mt-5 space-y-3">
            <ProjectLink label="Live site" href={project.liveUrl} />
            <ProjectLink label="Repository" href={project.repositoryUrl} />
          </div>
        </aside>
      </div>
    </article>
  );
}

function ProjectLink({ label, href }: { label: string; href: string | null }) {
  if (!href) {
    return (
      <p className="rounded-2xl border border-dashed border-white/15 px-4 py-3 text-sm text-faint">
        {label} — not added yet
      </p>
    );
  }

  return (
    <a className="button-secondary w-full" href={href} target="_blank" rel="noreferrer">
      {label}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
