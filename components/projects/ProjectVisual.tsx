export function ProjectVisual({ slug, large = false }: { slug: string; large?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0c0e16] ${large ? "h-80 sm:h-96" : "h-56"}`} aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(141,123,255,0.18),transparent_42%),radial-gradient(circle_at_80%_70%,rgba(110,162,255,0.14),transparent_40%)]" />
      {slug === "geniai" ? <GeniaiArt large={large} /> : <SocioArt large={large} />}
    </div>
  );
}

function GeniaiArt({ large }: { large: boolean }) {
  return (
    <div className={`relative grid h-full gap-3 p-4 ${large ? "sm:grid-cols-[1.1fr_0.9fr]" : "grid-cols-[1.1fr_0.9fr]"}`}>
      <div className="flex flex-col justify-end gap-2 rounded-2xl border border-white/10 bg-black/30 p-3">
        <span className="h-2 w-2/3 rounded-full bg-white/15" />
        <span className="ml-auto h-2 w-1/2 rounded-full bg-cyan/50" />
        <span className="h-2 w-3/4 rounded-full bg-white/10" />
        <span className="h-8 rounded-xl border border-white/10" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
          <span className="block h-2 w-1/2 rounded-full bg-white/20" />
          <span className="mt-3 block h-1.5 w-full rounded-full bg-white/10" />
          <span className="mt-2 block h-1.5 w-5/6 rounded-full bg-white/10" />
          <span className="mt-2 block h-1.5 w-2/3 rounded-full bg-violet/50" />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <span className="h-8 rounded-lg bg-white/10" />
          <span className="h-8 rounded-lg bg-cyan/20" />
          <span className="h-8 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function SocioArt({ large }: { large: boolean }) {
  return (
    <div className="relative flex h-full flex-col gap-3 p-4">
      <div className="flex gap-2">
        {["Account", "Session", "Upload"].map((step, index) => (
          <span key={step} className={`rounded-full px-3 py-1 font-mono text-[10px] tracking-wide ${index === 1 ? "bg-cyan/20 text-cyan" : "bg-white/5 text-faint"}`}>
            {large ? step : index + 1}
          </span>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-[1.3fr_0.7fr] gap-3">
        <div className="space-y-2 rounded-2xl border border-white/10 bg-black/25 p-3">
          <span className="block h-2 w-1/3 rounded-full bg-white/20" />
          <span className="block h-12 rounded-xl bg-white/[0.04]" />
          <span className="block h-2 w-2/3 rounded-full bg-white/10" />
        </div>
        <div className="rounded-2xl border border-dashed border-cyan/30 bg-cyan/5" />
      </div>
    </div>
  );
}
