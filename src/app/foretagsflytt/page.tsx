import type { Metadata } from "next";
import Link from "next/link";
import { Ikon } from "@/components/Ikon";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { TjanstSida } from "@/components/TjanstSida";
import { foretagPath, storstaderMedForetag } from "@/lib/orter";
import { buildMetadata } from "@/lib/seo";
import { hittaTjanst } from "@/lib/tjanster";

const tjanst = hittaTjanst("foretagsflytt")!;

export const metadata: Metadata = buildMetadata({
  title: "Företagsflytt – flytta kontor och verksamhet",
  description: tjanst.metaBeskrivning,
  path: "/foretagsflytt",
});

const egnaFragor = [
  {
    fraga: "Kan flytten ske utanför arbetstid?",
    svar: "Ja, tidsplanen kan läggas på kväll eller helg för att korta driftstoppet. Ange i förfrågan vilka tider verksamheten kan stå still, så tas det med i upplägget.",
  },
  {
    fraga: "Hanterar ni servrar och IT-utrustning?",
    svar: "Känslig IT-utrustning hanteras i samråd. Ange i förfrågan vilken utrustning som finns, så kan vi bedöma vad som krävs och vad som eventuellt behöver hanteras av er egen IT-funktion.",
  },
  {
    fraga: "Hur bedöms omfattningen av en kontorsflytt?",
    svar: "Inte främst i kvadratmeter, utan i antal arbetsplatser, mängden möbler och förvaring samt vilken utrustning som ska med. Därför frågar vi efter antal arbetsplatser i förfrågan.",
  },
  {
    fraga: "Får vi en genomgång innan offert?",
    svar: "För större verksamheter bokar vi en genomgång innan offert lämnas, eftersom förutsättningarna behöver ses på plats. Beskriv verksamheten i förfrågan så återkommer vi om vad som passar.",
  },
];

/**
 * Ortslänkar. Företagssidorna finns bara för storstäderna, så listan är
 * kort – men utan den vore sidorna nåbara enbart via headerns meny.
 */
function Ortslankar() {
  return (
    <Sektion bakgrund="ljus" labelledBy="foretag-orter-rubrik">
      <SektionsRubrik
        id="foretag-orter-rubrik"
        rubrik="Företagsflytt i din ort"
        ingress="Läs om vad som påverkar en kontorsflytt där verksamheten finns."
      />
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {storstaderMedForetag.map((ort) => (
          <li key={ort.slug}>
            <Link
              href={foretagPath(ort)}
              className="group flex items-center justify-between gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-200 transition-all hover:ring-korall-300"
            >
              <span>
                <span className="block font-sans font-bold text-sand-950">
                  {ort.namn}
                </span>
                <span className="mt-0.5 block text-sm text-sand-500">
                  {ort.lan}
                </span>
              </span>
              <Ikon
                namn="pil"
                className="size-5 shrink-0 text-korall-600 transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
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
