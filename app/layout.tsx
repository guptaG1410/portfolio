import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Outfit, Syne } from "next/font/google";
import Script from "next/script";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { Loader } from "@/components/layout/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { site } from "@/lib/site";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-outfit",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const description = site.heroSupport;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Govind Gupta",
    "Software Engineer",
    "Full-Stack Engineer",
    "Backend Systems",
    "Cloud",
    "DevOps",
    "AI Engineering",
    "New Delhi",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description,
  },
  alternates: {
    canonical: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#07080d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const sameAs = [site.github, site.linkedin, site.leetcodeUrl].filter(Boolean);

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  telephone: "+91-9643099218",
  url: site.url,
  address: {
    "@type": "PostalAddress",
    addressLocality: "New Delhi",
    addressCountry: "IN",
  },
  sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${syne.variable} ${outfit.variable} ${instrument.variable} ${jetbrains.variable} h-full`}
    >
      <body className="min-h-full bg-ink font-sans text-text antialiased">
        <Script id="skip-loader" strategy="beforeInteractive">
          {`try{if(sessionStorage.getItem("gg-loaded")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.skipLoader="1"}}catch(e){}`}
        </Script>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Loader />
        <CustomCursor />
        <Navbar />
        <main id="main" className="relative z-[1]">
          {children}
        </main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
