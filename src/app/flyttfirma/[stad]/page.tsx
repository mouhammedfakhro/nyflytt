import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrtSida } from "@/components/OrtSida";
import { hittaOrt, mindreOrter } from "@/lib/orter";
import { buildMetadata } from "@/lib/seo";

/**
 * Ortssidor för MINDRE orter: /flyttfirma/<slug>
 *
 * Storstäderna ligger i stället direkt i rooten som /flyttfirma-<slug>,
 * se `src/app/[flyttfirmaStad]/page.tsx`. Vilken typ en ort har styrs av
 * fältet `typ` i `src/lib/orter.ts`.
 */
export function generateStaticParams() {
  return mindreOrter.map((ort) => ({ stad: ort.slug }));
}

/** Bara de mindre orterna finns här – övrigt ska ge 404. */
export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/flyttfirma/[stad]">,
): Promise<Metadata> {
  const { stad } = await props.params;
  const ort = hittaOrt(stad);

  if (!ort || ort.typ !== "mindre") return {};

  return buildMetadata({
    title: `Flyttfirma ${ort.iOrt} – flytt och flyttstädning`,
    description: ort.metaBeskrivning,
    path: `/flyttfirma/${ort.slug}`,
  });
}

export default async function Sida(props: PageProps<"/flyttfirma/[stad]">) {
  const { stad } = await props.params;
  const ort = hittaOrt(stad);

  // Skyddar mot att en storstad råkar nås via fel URL-mönster.
  if (!ort || ort.typ !== "mindre") notFound();

  return <OrtSida ort={ort} />;
}
