"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tilt } from "@/components/ui/Tilt";
import { skillGroups, skills, type SkillGroup } from "@/lib/site";

type Filter = "All" | SkillGroup;

export function Skills() {
  const [filter, setFilter] = useState<Filter>("All");
  const groups = useMemo(
    () => (filter === "All" ? skillGroups : skillGroups.filter((group) => group === filter)),
    [filter],
  );

  return (
    <section id="skills" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <SectionHeader index="03" eyebrow="Skills" title="Technical expertise">
          Tools used in production work. No self-rated scores.
        </SectionHeader>
        <div role="tablist" aria-label="Technology categories" className="flex gap-2 overflow-x-auto pb-2">
          {(["All", ...skillGroups] as const).map((group) => {
            const selected = filter === group;
            return (
              <button
                key={group}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                  selected ? "border-cyan/50 bg-white/10 text-text" : "border-white/10 text-muted hover:text-text"
                }`}
                onClick={() => setFilter(group)}
              >
                {group}
              </button>
            );
          })}
        </div>
        <div className="mt-8 space-y-10">
          {groups.map((group) => {
            const items = skills.filter((skill) => skill.group === group);
            return (
              <div key={group}>
                <h3 className="font-mono text-xs tracking-[0.2em] text-faint uppercase">{group}</h3>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {items.map((skill) => (
                    <li key={skill.name}>
                      <Tilt>
                        <article className="glass h-full rounded-2xl p-4 transition-colors hover:border-cyan/30">
                          <p className="font-mono text-[10px] tracking-[0.16em] text-cyan uppercase">{skill.group}</p>
                          <h4 className="mt-4 font-display text-lg tracking-tight">{skill.name}</h4>
                        </article>
                      </Tilt>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
