import type { Metadata } from "next";
import { JuridiskSida } from "@/components/JuridiskSida";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Om cookies",
  description:
    "Information om cookies på nyflytt.se. Utkast som ska granskas juridiskt före publicering.",
  path: "/cookies",
  noIndex: true,
});

const avsnitt = [
  {
    rubrik: "Nuvarande läge: inga cookies sätts",
    stycken: [
      "Webbplatsen sätter i nuläget inga egna cookies och laddar inga tredjepartsskript för analys, annonsering eller sociala medier. Det finns därför ingen cookiebanner, eftersom det inte finns något att samtycka till.",
      "Offertformuläret sparar heller ingenting i webbläsarens localStorage eller sessionStorage.",
    ],
  },
  {
    rubrik: "Om analysverktyg aktiveras senare",
    stycken: [
      "Aktiveras webbanalys, konverteringsmätning eller annonsspårning i framtiden ändras förutsättningarna. Då krävs enligt lagen om elektronisk kommunikation samtycke innan icke-nödvändiga cookies får sättas.",
      "PLATSHÅLLARE: följande behöver då finnas på plats, och den här sidan behöver kompletteras med en fullständig cookietabell.",
    ],
    punkter: [
      "En samtyckeslösning som blockerar icke-nödvändiga skript till dess att samtycke lämnats",
      "Möjlighet att återkalla samtycke lika enkelt som att lämna det",
      "En tabell med varje cookie: namn, leverantör, ändamål, lagringstid och typ",
      "Uppdatering av integritetspolicyn så att den speglar behandlingen",
    ],
  },
  {
    rubrik: "Nödvändiga cookies",
    stycken: [
      "PLATSHÅLLARE: om webbplatsen framöver får funktioner som kräver tekniskt nödvändiga cookies – exempelvis inloggning, kundportal eller skydd mot formulärspam – ska de listas här med ändamål och lagringstid.",
    ],
  },
  {
    rubrik: "Så hanterar du cookies i din webbläsare",
    stycken: [
      "Du kan alltid blockera eller radera cookies i webbläsarens inställningar. Hur det görs skiljer sig mellan webbläsare, och inställningarna gäller per webbläsare och enhet.",
    ],
  },
];

export default function Sida() {
  return (
    <JuridiskSida
      rubrik="Om cookies"
      path="/cookies"
      ingress="Den här sidan beskriver hur cookies används på nyflytt.se, och vad som gäller om analysverktyg aktiveras i framtiden."
      avsnitt={avsnitt}
    />
  );
}
