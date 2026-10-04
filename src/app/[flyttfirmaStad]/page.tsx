import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrtSida } from "@/components/OrtSida";
import { hittaOrt, storstader } from "@/lib/orter";
import { buildMetadata } from "@/lib/seo";

/**
 * Ortssidor för STORSTÄDER: /flyttfirma-<slug>
 *
 * Segmentet ligger i rooten eftersom URL:en inte har något snedstreck
 * (/flyttfirma-helsingborg, inte /flyttfirma/helsingborg). Det gör att
 * routen i teorin matchar vad som helst på första nivån – därför:
 *
 *   - `generateStaticParams` returnerar bara de faktiska storstäderna
 *   - `dynamicParams = false` gör att inget annat ens når sidan
 *
 * Tillsammans betyder det att /nagot-annat ger 404 från not-found.tsx som
 * vanligt, och att den här routen aldrig "slukar" andra sidors adresser.
 */
export function generateStaticParams() {
  return storstader.map((ort) => ({ flyttfirmaStad: `flyttfirma-${ort.slug}` }));
}

export const dynamicParams = false;

/** Plockar ut ortens slug ur segmentet, eller null om mönstret inte matchar. */
function slugFranSegment(segment: string): string | null {
  const prefix = "flyttfirma-";
  return segment.startsWith(prefix) ? segment.slice(prefix.length) : null;
}

export async function generateMetadata(
  props: PageProps<"/[flyttfirmaStad]">,
): Promise<Metadata> {
  const { flyttfirmaStad } = await props.params;
  const slug = slugFranSegment(flyttfirmaStad);
  const ort = slug ? hittaOrt(slug) : undefined;

  if (!ort || ort.typ !== "storstad") return {};

  return buildMetadata({
    title: `Flyttfirma ${ort.iOrt} – bohagsflytt och flyttstädning`,
    description: ort.metaBeskrivning,
    path: `/flyttfirma-${ort.slug}`,
  });
}

export default async function Sida(props: PageProps<"/[flyttfirmaStad]">) {
  const { flyttfirmaStad } = await props.params;
  const slug = slugFranSegment(flyttfirmaStad);
  const ort = slug ? hittaOrt(slug) : undefined;

  if (!ort || ort.typ !== "storstad") notFound();

  return <OrtSida ort={ort} />;
}
