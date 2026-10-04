import type { Metadata } from "next";
import { TjanstSida } from "@/components/TjanstSida";
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

export default function Sida() {
  return <TjanstSida tjanst={tjanst} egnaFragor={egnaFragor} />;
}
