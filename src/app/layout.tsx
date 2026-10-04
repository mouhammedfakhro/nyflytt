import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { organisationSchema, webbplatsSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/** Sora för rubriker – geometrisk och tydlig. Inter för brödtext. */
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} – ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // Telefonnummer ska inte autolänkas av iOS – vi styr det själva.
  formatDetection: { telephone: false, address: false, email: false },
  // Google Search Console-verifiering. Sätts via NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION.
  verification: siteConfig.verifiering.google
    ? { google: siteConfig.verifiering.google }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#fdfcfa",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={siteConfig.lang} className={`${sora.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col bg-background text-foreground antialiased">
        {/* Organisation och WebSite ligger i layouten så de finns på varje sida */}
        <JsonLd data={[organisationSchema(), webbplatsSchema()]} />

        <a
          href="#innehall"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-korall-600 focus:px-5 focus:py-3 focus:font-semibold focus:text-white focus:shadow-lyft"
        >
          Hoppa till innehållet
        </a>

        <Header />
        <main id="innehall" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
