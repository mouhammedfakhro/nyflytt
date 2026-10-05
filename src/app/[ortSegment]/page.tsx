import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrtSida } from "@/components/OrtSida";
import { StadOrtSida } from "@/components/StadOrtSida";
import { hittaOrt, type Ort, storstader, storstaderMedStad } from "@/lib/orter";
import { buildMetadata } from "@/lib/seo";

/**
 * Ortssidor för STORSTÄDER, båda tjänsterna:
 *
 *   /flyttfirma-<slug>     flytt       (OrtSida)
 *   /flyttstadning-<slug>  flyttstädning (StadOrtSida)
 *
 * Båda mönstren ligger i samma route eftersom Next.js bara tillåter ETT
 * dynamiskt segment direkt i rooten – två separata mappar ger
 * "Ambiguous app routes". Prefixet i segmentet avgör vilken sida som
 * renderas.
 *
 * URL:erna saknar snedstreck (/flyttfirma-helsingborg, inte
 * /flyttfirma/helsingborg), vilket är varför de ligger i rooten alls.
 * Eftersom routen i teorin matchar vad som helst på första nivån:
 *
 *   - `generateStaticParams` returnerar bara de faktiska kombinationerna
 *   - `dynamicParams = false` gör att inget annat ens når sidan
 *
 * Tillsammans betyder det att /nagot-annat ger 404 från not-found.tsx som
 * vanligt, och att routen aldrig "slukar" andra sidors adresser.
 */

const FLYTT = "flyttfirma-";
const STAD = "flyttstadning-";

export function generateStaticParams() {
  return [
    ...storstader.map((ort) => ({ ortSegment: `${FLYTT}${ort.slug}` })),
    ...storstaderMedStad.map((ort) => ({ ortSegment: `${STAD}${ort.slug}` })),
  ];
}

export const dynamicParams = false;

type Traff =
  | { sort: "flytt"; ort: Ort }
  | { sort: "stad"; ort: Ort }
  | null;

/**
 * Tolkar segmentet till tjänst + ort.
 *
 * Städprefixet prövas först: "flyttstadning-" och "flyttfirma-" kan inte
 * förväxlas, men ordningen gör avsikten tydlig om fler prefix tillkommer.
 */
function tolka(segment: string): Traff {
  if (segment.startsWith(STAD)) {
    const ort = hittaOrt(segment.slice(STAD.length));
    // Städsida kräver att ortens städinnehåll faktiskt är ifyllt.
    return ort?.typ === "storstad" && ort.stad ? { sort: "stad", ort } : null;
  }

  if (segment.startsWith(FLYTT)) {
    const ort = hittaOrt(segment.slice(FLYTT.length));
    return ort?.typ === "storstad" ? { sort: "flytt", ort } : null;
  }

  return null;
}

export async function generateMetadata(
  props: PageProps<"/[ortSegment]">,
): Promise<Metadata> {
  const { ortSegment } = await props.params;
  const traff = tolka(ortSegment);

  if (!traff) return {};
  const { ort } = traff;

  if (traff.sort === "stad") {
    return buildMetadata({
      title: `Flyttstädning ${ort.iOrt} – inför överlämning`,
      description: ort.stad!.metaBeskrivning,
      path: `/${STAD}${ort.slug}`,
    });
  }

  return buildMetadata({
    title: `Flyttfirma ${ort.iOrt} – flytt och flyttstädning`,
    description: ort.metaBeskrivning,
    path: `/${FLYTT}${ort.slug}`,
  });
}

export default async function Sida(props: PageProps<"/[ortSegment]">) {
  const { ortSegment } = await props.params;
  const traff = tolka(ortSegment);

  if (!traff) notFound();

  return traff.sort === "stad" ? (
    <StadOrtSida ort={traff.ort} />
  ) : (
    <OrtSida ort={traff.ort} />
  );
}
