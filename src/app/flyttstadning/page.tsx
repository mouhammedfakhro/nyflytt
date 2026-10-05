import type { Metadata } from "next";
import Link from "next/link";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { TjanstSida } from "@/components/TjanstSida";
import { stadOrterPerStorstad, stadPath } from "@/lib/orter";
import { buildMetadata } from "@/lib/seo";
import { hittaTjanst } from "@/lib/tjanster";

const tjanst = hittaTjanst("flyttstadning")!;

export const metadata: Metadata = buildMetadata({
  title: "Flyttstädning – städning inför överlämning",
  description: tjanst.metaBeskrivning,
  path: "/flyttstadning",
});

const egnaFragor = [
  {
    fraga: "Måste bostaden vara tömd innan städningen?",
    svar: "Ja. Står möbler och kartonger kvar kan inte alla ytor kommas åt, och städningen håller då inte för en besiktning. Planera flytten så att bostaden är tömd innan städningen börjar.",
  },
  {
    fraga: "Ingår fönsterputs?",
    svar: "Ja, fönsterputs in- och utvändigt samt mellan rutorna ingår där konstruktionen tillåter att fönstret öppnas. Fasta fönster och sådana som inte går att komma åt säkert putsas på insidan.",
  },
  {
    fraga: "Vad händer om besiktningen inte godkänns?",
    // KRÄVER UPPGIFT: villkor för omstädning behöver bekräftas innan publicering.
    svar: "Vilka villkor som gäller för omstädning framgår av offerten från den samarbetspartner som utför uppdraget. Läs igenom villkoren innan du tackar ja, och hör av dig till oss om något är oklart.",
  },
  {
    fraga: "Behöver jag tillhandahålla städmaterial?",
    svar: "Nej, samarbetspartnern tar med det som behövs. Behöver du städningen utförd med särskilda produkter, till exempel av allergiskäl, ange det i förfrågan.",
  },
];

/**
 * Ortslänkar grupperade per storstad.
 *
 * Städsidorna per ort (/flyttstadning-<ort> och /flyttstadning/<ort>) nås
 * annars bara via headerns meny, som bara listar storstäderna – de mindre
 * orternas sidor skulle då sakna inlänkar helt.
 */
function Ortslankar() {
  return (
    <Sektion bakgrund="ljus" labelledBy="stad-orter-rubrik">
      <SektionsRubrik
        id="stad-orter-rubrik"
        rubrik="Flyttstädning i din ort"
        ingress="Läs om vad som är bra att veta inför en flyttstädning där du bor. Orterna är grupperade efter närmaste större stad."
      />

      <div className="mt-12 space-y-10">
        {stadOrterPerStorstad().map(({ storstad, mindre }) => (
          <div key={storstad.slug}>
            <h3 className="border-b border-sand-200 pb-3 font-sans text-xl font-bold tracking-[-0.02em] text-sand-950">
              <Link
                href={stadPath(storstad)}
                className="transition-colors hover:text-korall-700"
              >
                Flyttstädning {storstad.namn}
              </Link>
            </h3>

            {mindre.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {mindre.map((ort) => (
                  <li key={ort.slug}>
                    <Link
                      href={stadPath(ort)}
                      className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-[0.9375rem] font-medium text-sand-700 ring-1 ring-sand-200 transition-all hover:text-korall-700 hover:ring-korall-400"
                    >
                      {ort.namn}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </div>
    </Sektion>
  );
}

export default function Sida() {
  return (
    <TjanstSida
      tjanst={tjanst}
      egnaFragor={egnaFragor}
      extra={<Ortslankar />}
    />
  );
}
