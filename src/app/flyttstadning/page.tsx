import type { Metadata } from "next";
import { TjanstSida } from "@/components/TjanstSida";
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

export default function Sida() {
  return <TjanstSida tjanst={tjanst} egnaFragor={egnaFragor} />;
}
