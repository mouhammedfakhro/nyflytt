/**
 * Central plats för företagsuppgifter och globala inställningar.
 *
 * VIKTIGT: Fält markerade med PLATSHÅLLARE måste fyllas i med verkliga uppgifter
 * innan publicering. De används i strukturerad data (schema.org) och får därför
 * inte innehålla påhittade värden – Google kan betrakta det som vilseledande.
 * Se även `docs/UPPGIFTER-ATT-FYLLA-I.md`.
 */
export const siteConfig = {
  name: "Nyflytt",
  shortName: "Nyflytt",
  // Byt till den skarpa domänen innan lansering – används för canonical, OG och sitemap.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://nyflytt.se",
  locale: "sv_SE",
  lang: "sv",
  description:
    "Nyflytt hjälper privatpersoner och företag att boka flytt och flyttstädning. Beskriv ditt behov och få en tydlig offert – utan att binda dig.",

  /** Kortversion som används i navigation, footer och OG-bild. */
  tagline: "Flytt och flyttstädning – bokat på ett ställe",

  kontakt: {
    // PLATSHÅLLARE – ersätt med riktig e-post.
    epost: "hej@nyflytt.se",
    // PLATSHÅLLARE – ersätt med riktigt telefonnummer, eller ta bort telefon helt
    // om ni bara vill ha kontakt via formulär.
    telefon: "+46 000 00 00 00",
    telefonVisning: "000-00 00 00",
    // PLATSHÅLLARE – öppettider för kundservice.
    oppettider: "Vardagar 08–17",
  },

  /**
   * PLATSHÅLLARE – organisationsuppgifter.
   * Lämna tomma strängar tills uppgifterna är bekräftade. Tomma fält utesluts
   * automatiskt från strukturerad data (se `lib/schema.ts`).
   */
  organisation: {
    juridisktNamn: "", // t.ex. "Nyflytt Sverige AB"
    organisationsnummer: "", // t.ex. "559XXX-XXXX"
    adress: "",
    postnummer: "",
    postort: "",
    land: "SE",
  },

  /** Sociala profiler. Tomma värden utesluts från schema `sameAs`. */
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
  },

  /** Verifieringstoken för Google Search Console. Sätts via miljövariabel. */
  verifiering: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
  },
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

/** Samlar ihop ifyllda sociala länkar till schema.org `sameAs`. */
export function sameAsLankar(): string[] {
  return Object.values<string>(siteConfig.social).filter((v) => v.length > 0);
}
