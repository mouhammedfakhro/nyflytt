import type { MetadataRoute } from "next";
import { orter, orterMedStad, ortPath, stadPath } from "@/lib/orter";
import { absoluteUrl } from "@/lib/site";
import { aktivaTjanster } from "@/lib/tjanster";

/**
 * XML-sitemap.
 *
 * Innehåller bara indexerbara sidor. Juridiska platshållarsidor
 * (/integritetspolicy, /cookies) är satta till noindex och ska därför inte
 * ligga här – de läggs till när texterna är granskade och indexerbara.
 *
 * Tjänster och orter hämtas från datalagren, så nya sidor hamnar automatiskt
 * i sitemapen. Avaktiverade tjänster (aktiv: false) utesluts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const nu = new Date();

  const statiska: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/offert"), changeFrequency: "monthly", priority: 0.9 },
    {
      url: absoluteUrl("/sa-fungerar-det"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Översikt över alla orter – riktig sida sedan 307-redirecten togs bort.
    { url: absoluteUrl("/flyttfirma"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/om-oss"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/kontakt"), changeFrequency: "yearly", priority: 0.5 },
  ];

  const tjanstSidor: MetadataRoute.Sitemap = aktivaTjanster.map((t) => ({
    url: absoluteUrl(`/${t.slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const ortSidor: MetadataRoute.Sitemap = orter.map((o) => ({
    url: absoluteUrl(ortPath(o)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Flyttstädningssidor per ort. Bara orter med städinnehåll – övriga
  // har ingen sida att indexera.
  const stadOrtSidor: MetadataRoute.Sitemap = orterMedStad.map((o) => ({
    url: absoluteUrl(stadPath(o)),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...statiska, ...tjanstSidor, ...ortSidor, ...stadOrtSidor].map((post) => ({
    ...post,
    lastModified: nu,
  }));
}
