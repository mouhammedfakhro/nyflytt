import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StadOrtSida } from "@/components/StadOrtSida";
import { hittaOrt, mindreOrterMedStad } from "@/lib/orter";
import { buildMetadata } from "@/lib/seo";

/**
 * Flyttstädningssidor för MINDRE orter: /flyttstadning/<slug>
 *
 * Storstäderna ligger i stället i rooten som /flyttstadning-<slug>,
 * se `src/app/[flyttstadningStad]/page.tsx`.
 */
export function generateStaticParams() {
  return mindreOrterMedStad.map((ort) => ({ stad: ort.slug }));
}

/** Bara de mindre orterna finns här – övrigt ska ge 404. */
export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/flyttstadning/[stad]">,
): Promise<Metadata> {
  const { stad } = await props.params;
  const ort = hittaOrt(stad);

  if (!ort?.stad || ort.typ !== "mindre") return {};

  return buildMetadata({
    title: `Flyttstädning ${ort.iOrt} – inför överlämning`,
    description: ort.stad.metaBeskrivning,
    path: `/flyttstadning/${ort.slug}`,
  });
}

export default async function Sida(props: PageProps<"/flyttstadning/[stad]">) {
  const { stad } = await props.params;
  const ort = hittaOrt(stad);

  // Skyddar mot att en storstad råkar nås via fel URL-mönster.
  if (!ort?.stad || ort.typ !== "mindre") notFound();

  return <StadOrtSida ort={ort} />;
}
