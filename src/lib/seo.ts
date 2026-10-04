import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/lib/site";

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  /**
   * Sätt true för att hoppa över titelmallen "%s | Nyflytt".
   * Används på startsidan där varumärket redan finns i titeln.
   */
  absolutTitel?: boolean;
};

/**
 * Bygger konsekvent metadata per sida: canonical, OG och Twitter-kort.
 * Sidor anropar denna i stället för att handskriva metadata-objekt.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = "/opengraph-image",
  noIndex = false,
  type = "website",
  absolutTitel = false,
}: SeoInput = {}): Metadata {
  const url = absoluteUrl(path);
  // OG- och Twitter-titlar ska alltid vara kompletta, oavsett titelmall.
  const delningsTitel = title ?? siteConfig.name;

  return {
    title: title
      ? absolutTitel
        ? { absolute: title }
        : title
      : undefined,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title: delningsTitel,
      description,
      locale: siteConfig.locale,
      images: [
        {
          url: absoluteUrl(image),
          width: 1200,
          height: 630,
          alt: delningsTitel,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: delningsTitel,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
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
  };
}
