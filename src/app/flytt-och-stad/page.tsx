import type { Metadata } from "next";
import { TjanstSida } from "@/components/TjanstSida";
import { buildMetadata } from "@/lib/seo";
import { hittaTjanst } from "@/lib/tjanster";

const tjanst = hittaTjanst("flytt-och-stad")!;

export const metadata: Metadata = buildMetadata({
  title: "Flytt och flyttstädning i samma bokning",
  description: tjanst.metaBeskrivning,
  path: "/flytt-och-stad",
});

const egnaFragor = [
  {
    fraga: "Utförs flytten och städningen av samma företag?",
    svar: "Inte nödvändigtvis. Flytt och städ kan utföras av två olika samarbetspartners. Du har ändå en offert och en kontaktväg – samordningen mellan dem sköter vi.",
  },
  {
    fraga: "Kan städningen ske samma dag som flytten?",
    svar: "Det går ofta, men det kräver att tidsplanen håller eftersom bostaden måste vara tömd innan städningen börjar. Ange i förfrågan om du vill ha båda samma dag, så planeras det från början.",
  },
  {
    fraga: "Blir det billigare att boka båda samtidigt?",
    // KRÄVER UPPGIFT: eventuell paketrabatt måste bekräftas innan den påstås.
    svar: "Priset framgår av offerten. Den största fördelen är praktisk: du gör en förfrågan i stället för två, och datumen planeras så att de hänger ihop.",
  },
];

export default function Sida() {
  return <TjanstSida tjanst={tjanst} egnaFragor={egnaFragor} />;
}
