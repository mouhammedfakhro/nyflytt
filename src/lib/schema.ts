/**
 * Strukturerad data (schema.org / JSON-LD).
 *
 * REGEL: vi lägger bara in uppgifter som är verkliga, verifierade och synliga
 * på sidan. Tomma fält i `siteConfig` filtreras bort i stället för att fyllas
 * med gissningar. Därför saknas medvetet `aggregateRating`, `review`,
 * `priceRange` och `openingHours` – de kräver uppgifter vi inte har bekräftat.
 */
import { absoluteUrl, sameAsLankar, siteConfig } from "@/lib/site";
import type { Fraga } from "@/lib/faq";

type Json = Record<string, unknown>;

/** Tar bort nycklar med tomt värde så att inga halvtomma fält publiceras. */
function rensa(obj: Json): Json {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => {
      if (v === undefined || v === null || v === "") return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );
}

/** Stabil @id så att olika sidors noder pekar på samma organisation. */
export const ORGANISATION_ID = `${siteConfig.url}/#organisation`;
const WEBBPLATS_ID = `${siteConfig.url}/#webbplats`;

export function organisationSchema(): Json {
  const { organisation } = siteConfig;

  // Postadress läggs bara till om den faktiskt är ifylld.
  const adress = organisation.adress
    ? rensa({
        "@type": "PostalAddress",
        streetAddress: organisation.adress,
        postalCode: organisation.postnummer,
        addressLocality: organisation.postort,
        addressCountry: organisation.land,
      })
    : undefined;

  return rensa({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANISATION_ID,
    name: organisation.juridisktNamn || siteConfig.name,
    alternateName: organisation.juridisktNamn ? siteConfig.name : undefined,
    url: siteConfig.url,
    logo: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    // Organisationsnummer som identifierare – bara om ifyllt.
    identifier: organisation.organisationsnummer || undefined,
    address: adress,
    sameAs: sameAsLankar(),
    contactPoint: rensa({
      "@type": "ContactPoint",
      contactType: "customer service",
      email: siteConfig.kontakt.epost,
      availableLanguage: ["Swedish"],
    }),
    // Områden vi uttalat arbetar i – detta är bekräftat via tjänsteutbudet.
    areaServed: [
      "Helsingborg",
      "Malmö",
      "Landskrona",
      "Ängelholm",
      "Halmstad",
      "Kristianstad",
      "Hässleholm",
      "Lund",
      "Trelleborg",
    ].map((namn) => ({ "@type": "City", name: namn })),
  });
}

export function webbplatsSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBBPLATS_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.lang,
    publisher: { "@id": ORGANISATION_ID },
  };
}

/**
 * Service-schema för en tjänstesida.
 * Utan `offers`/pris eftersom priset sätts per förfrågan.
 */
export function tjanstSchema(args: {
  namn: string;
  beskrivning: string;
  path: string;
  omraden?: string[];
}): Json {
  return rensa({
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.namn,
    description: args.beskrivning,
    url: absoluteUrl(args.path),
    serviceType: args.namn,
    provider: { "@id": ORGANISATION_ID },
    areaServed: (args.omraden ?? []).map((namn) => ({
      "@type": "City",
      name: namn,
    })),
  });
}

export function faqSchema(fragor: Fraga[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: fragor.map((f) => ({
      "@type": "Question",
      name: f.fraga,
      acceptedAnswer: { "@type": "Answer", text: f.svar },
    })),
  };
}

/** Brödsmulor. `items` ska vara i ordning från startsidan och nedåt. */
export function brodsmulaSchema(items: { namn: string; path: string }[]): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.namn,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Kontaktsida. */
export function kontaktsidaSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Kontakta ${siteConfig.name}`,
    url: absoluteUrl("/kontakt"),
    about: { "@id": ORGANISATION_ID },
  };
}
