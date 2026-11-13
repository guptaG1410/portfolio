import type { ReactNode } from "react";

export function SectionHeader({
  index,
  eyebrow,
  title,
  children,
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="reveal mb-12 max-w-2xl md:mb-16">
      <p className="font-mono text-xs tracking-[0.22em] text-cyan">
        {index} / {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-4xl tracking-tight text-balance sm:text-5xl">{title}</h2>
      {children ? <div className="mt-5 text-lg leading-relaxed text-muted">{children}</div> : null}
    </header>
  );
}
