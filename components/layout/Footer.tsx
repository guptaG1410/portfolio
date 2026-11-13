import Link from "next/link";
import { Year } from "@/components/layout/Year";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative z-[1]">
      <div className="footer-rule" />
      <div className="shell flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl tracking-tight">{site.monogram}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            {site.name} · {site.role} · {site.location}
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted" aria-label="Footer">
          {nav.map((item) => (
            <Link key={item.id} href={`/#${item.id}`} className="hover:text-text">
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-faint">
          © <Year /> {site.name}
        </p>
      </div>
    </footer>
  );
}
