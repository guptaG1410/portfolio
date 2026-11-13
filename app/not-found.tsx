import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="shell flex min-h-[100svh] flex-col justify-center py-32">
      <p className="font-mono text-xs tracking-[0.22em] text-cyan">404</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-7xl">This page is not on the map.</h1>
      <p className="mt-5 max-w-xl text-lg text-muted">The link does not match a section of this portfolio.</p>
      <Link href="/" className="button-primary mt-8 w-fit">
        Back home
      </Link>
    </section>
  );
}
