import type { Metadata } from "next";
import { TjanstSida } from "@/components/TjanstSida";
import { buildMetadata } from "@/lib/seo";
import { hittaTjanst } from "@/lib/tjanster";

const tjanst = hittaTjanst("bohagsflytt")!;

export const metadata: Metadata = buildMetadata({
  title: "Bohagsflytt – boka flytthjälp för hela hemmet",
  description: tjanst.metaBeskrivning,
  path: "/bohagsflytt",
});

/** Frågor som är specifika för bohagsflytt. */
const egnaFragor = [
  {
    fraga: "Hur många flyttgubbar behövs?",
    svar: "Det beror på bohagets storlek, våning och hiss. Bemanningen framgår av offerten – du behöver inte räkna ut det själv, men uppgifter om våning och hiss gör bedömningen mer träffsäker.",
  },
  {
    fraga: "Ingår flyttkartonger?",
    svar: "Flyttfiltar och spännband för lastsäkring ingår. Kartonger ingår inte som standard. Ange i förfrågan om du vill att kartonger tas med, så tar vi med det i offerten.",
  },
  {
    fraga: "Kan ni flytta piano eller andra tunga föremål?",
    svar: "Ange föremålet i fältet för särskilda föremål i förfrågan. Tunga eller ömtåliga saker som piano, kassaskåp och akvarium kräver extra utrustning och ibland fler personer, så det måste bedömas separat.",
  },
  {
    fraga: "Måste jag vara hemma under flytten?",
    svar: "Någon behöver kunna visa vad som ska flyttas och vart det ska placeras, samt lämna och ta emot nycklar. Kan du inte själv vara på plats behöver du utse någon annan – meddela det i förväg.",
  },
];

export default function Sida() {
  return <TjanstSida tjanst={tjanst} egnaFragor={egnaFragor} />;
}
