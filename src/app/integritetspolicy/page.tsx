import type { Metadata } from "next";
import { JuridiskSida } from "@/components/JuridiskSida";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Integritetspolicy",
  description:
    "Information om hur Nyflytt behandlar personuppgifter. Utkast som ska granskas juridiskt före publicering.",
  path: "/integritetspolicy",
  // noindex tills texten är juridiskt granskad och komplett.
  noIndex: true,
});

const avsnitt = [
  {
    rubrik: "Personuppgiftsansvarig",
    stycken: [
      "PLATSHÅLLARE: ange företagets juridiska namn, organisationsnummer, adress och kontaktuppgifter för dataskyddsfrågor. Uppgifterna fylls i under organisation i src/lib/site.ts.",
      "Om ni utser ett dataskyddsombud ska kontaktvägen till ombudet anges här.",
    ],
  },
  {
    rubrik: "Vilka uppgifter vi samlar in",
    stycken: [
      "När du skickar en offertförfrågan samlar vi in de uppgifter du själv fyller i formuläret. I dagsläget är det följande:",
    ],
    punkter: [
      "Namn, e-postadress och telefonnummer",
      "Företagsnamn, om förfrågan gäller företagsflytt",
      "Adresser eller orter för flytten",
      "Uppgifter om bostaden: typ, ungefärlig storlek, antal rum, våning och hiss",
      "Önskat datum och om du är flexibel med det",
      "Uppgifter om särskilda föremål, packhjälp och övriga önskemål du anger",
    ],
  },
  {
    rubrik: "Varför vi behandlar uppgifterna",
    stycken: [
      "Uppgifterna används för att kunna bedöma din förfrågan, ta fram en offert och kontakta dig om förfrågan. Utan dem kan vi inte lämna en offert.",
      "PLATSHÅLLARE: ange rättslig grund för varje ändamål. Vanligen är det fullgörande av avtal eller åtgärder inför avtal för själva offerthanteringen, och samtycke för eventuell marknadsföring. Detta behöver bekräftas av juridisk granskare.",
    ],
  },
  {
    rubrik: "Vilka vi delar uppgifterna med",
    stycken: [
      "För att uppdraget ska kunna utföras delas relevanta uppgifter med den samarbetspartner som ska utföra flytten eller städningen.",
      "PLATSHÅLLARE: ange vilka kategorier av mottagare som förekommer, om personuppgiftsbiträdesavtal finns, vilket CRM-system som används och var uppgifterna lagras geografiskt. Ange även om någon överföring sker till tredjeland.",
    ],
  },
  {
    rubrik: "Hur länge vi sparar uppgifterna",
    stycken: [
      "PLATSHÅLLARE: ange faktiska lagringstider, exempelvis hur länge en förfrågan som inte leder till bokning sparas, och hur länge uppgifter om genomförda uppdrag behålls av bokförings- eller garantiskäl.",
    ],
  },
  {
    rubrik: "Dina rättigheter",
    stycken: [
      "Enligt dataskyddsförordningen (GDPR) har du ett antal rättigheter i förhållande till dina personuppgifter:",
    ],
    punkter: [
      "Rätt till tillgång – få veta vilka uppgifter vi behandlar om dig",
      "Rätt till rättelse av felaktiga uppgifter",
      "Rätt till radering under vissa förutsättningar",
      "Rätt att begära begränsning av behandlingen",
      "Rätt att invända mot behandling som sker med stöd av intresseavvägning",
      "Rätt till dataportabilitet",
      "Rätt att återkalla samtycke, där behandlingen bygger på samtycke",
      "Rätt att lämna klagomål till Integritetsskyddsmyndigheten (IMY)",
    ],
  },
  {
    rubrik: "Uppgifter i din webbläsare",
    stycken: [
      "Offertformuläret sparar inte dina uppgifter i webbläsarens localStorage eller sessionStorage. Uppgifterna finns i sidans minne medan du fyller i formuläret och skickas till oss när du klickar på skicka. Stänger du fliken innan dess försvinner de.",
    ],
  },
  {
    rubrik: "Ändringar i denna policy",
    stycken: [
      "PLATSHÅLLARE: ange hur ändringar kommuniceras och datera policyn. Ett datum för senaste uppdatering bör visas här.",
    ],
  },
];

export default function Sida() {
  return (
    <JuridiskSida
      rubrik="Integritetspolicy"
      path="/integritetspolicy"
      ingress="Den här sidan beskriver hur Nyflytt behandlar personuppgifter när du använder webbplatsen och skickar en offertförfrågan."
      avsnitt={avsnitt}
    />
  );
}
