import { heroLabels } from "@/lib/site";

const details = ["Interface", "Services", "Runtime", "Access", "Data", "Intelligence"];

export function SystemMap() {
  return (
    <div className="relative hidden min-w-0 lg:block" aria-hidden="true">
      <div className="absolute bottom-4 left-[1.15rem] top-4 w-px bg-gradient-to-b from-transparent via-cyan/60 to-transparent" />
      <ul className="space-y-3">
        {heroLabels.map((label, index) => (
          <li
            key={label}
            className="float-y relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur-md"
            style={{
              animationDelay: `${index * 0.28}s`,
              marginLeft: index % 2 === 0 ? "1.6rem" : "2.8rem",
            }}
          >
            <span className="absolute top-1/2 -left-[1.55rem] h-2 w-2 -translate-y-1/2 rounded-full bg-cyan" />
            <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{details[index]}</span>
            <span className="font-display text-sm">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
