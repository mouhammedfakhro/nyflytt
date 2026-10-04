import type { Metadata } from "next";
import Link from "next/link";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Fragor } from "@/components/Fragor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { OffertCta } from "@/components/OffertCta";
import { Processteg } from "@/components/Processteg";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { vanligaFragor } from "@/lib/faq";
import { brodsmulaSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Så fungerar det – från förfrågan till utförd flytt",
  description:
    "Så går det till när du bokar flytt eller flyttstädning via Nyflytt: du beskriver behovet, vi tar fram en offert och en samarbetspartner utför uppdraget.",
  path: "/sa-fungerar-det",
});

/** Rollfördelningen – det här måste vara tydligt och ärligt. */
const roller = [
  {
    rubrik: "Det Nyflytt gör",
    punkter: [
      "Tar emot din förfrågan och går igenom uppgifterna",
      "Tar fram en offert med tydlig omfattning",
      "Matchar uppdraget med en lämplig samarbetspartner",
      "Håller ihop kontakten om du bokar både flytt och städ",
      "Är din kontaktväg om något behöver ändras",
    ],
  },
  {
    rubrik: "Det samarbetspartnern gör",
    punkter: [
      "Utför själva flytten eller städningen",
      "Tillhandahåller personal, fordon och utrustning",
      "Ansvarar för utförandet enligt villkoren i offerten",
      "Bekräftar tider direkt med dig inför uppdraget",
    ],
  },
];

/** Vad du behöver ha klart – konkret nytta för besökaren. */
const forberedelser = [
  {
    ikon: "plats",
    rubrik: "Adresser eller orter",
    text: "Ort räcker för att vi ska kunna räkna. Har du gatuadressen klar blir bedömningen mer träffsäker.",
  },
  {
    ikon: "lada",
    rubrik: "Bostadens storlek",
    text: "Ungefärlig boyta och antal rum. Gå igenom förråd, garage och vind – de gör ofta bohaget större än man tror.",
  },
  {
    ikon: "klocka",
    rubrik: "Önskat datum",
    text: "Ungefärligt datum går bra. Är du flexibel kan du kryssa i det, vilket ofta ger fler möjliga tider.",
  },
  {
    ikon: "kontor",
    rubrik: "Våning och hiss",
    text: "Det här påverkar tidsåtgången mest av allt. Vet du inte om det finns hiss kan du ange det.",
  },
] as const;

export default function SaFungerarDetSida() {
  const brodsmulor = [
    { namn: "Start", path: "/" },
    { namn: "Så fungerar det", path: "/sa-fungerar-det" },
  ];

  return (
    <>
      <JsonLd data={[brodsmulaSchema(brodsmulor), faqSchema(vanligaFragor)]} />
      <Brodsmulor items={brodsmulor} />

      <header className="behallare pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
            Så fungerar det
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-700 sm:text-xl">
            Nyflytt är länken mellan dig och den som utför jobbet. Du gör en
            förfrågan, vi tar fram en offert, och en av våra samarbetspartners
            utför uppdraget. Här är hela kedjan.
          </p>
        </div>
      </header>

      {/* Processen i fyra steg */}
      <Sektion bakgrund="ljus" labelledBy="process-rubrik">
        <SektionsRubrik
          id="process-rubrik"
          rubrik="Fyra steg"
        />
        <div className="mt-12 max-w-4xl">
          <Processteg />
        </div>
      </Sektion>

      {/* Rollfördelning */}
      <Sektion labelledBy="roller-rubrik">
        <SektionsRubrik
          id="roller-rubrik"
          rubrik="Vem gör vad?"
          ingress="Vi tycker det ska vara tydligt från början vem som ansvarar för vad. Nyflytt utför inte uppdragen själva."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {roller.map((roll) => (
            <div
              key={roll.rubrik}
              className="rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-8"
            >
              <h3 className="font-sans text-xl font-bold text-sand-950">
                {roll.rubrik}
              </h3>
              <ul className="mt-5 space-y-3">
                {roll.punkter.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-korall-100 text-korall-700">
                      <Ikon namn="check" className="size-4" />
                    </span>
                    <span className="leading-relaxed text-sand-700">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* PLATSHÅLLARE: krav på samarbetspartners behöver bekräftas */}
        <div className="mt-8 max-w-3xl rounded-3xl border border-dashed border-sand-300 bg-sand-100/60 p-6">
          <p className="font-sans font-semibold text-sand-900">
            Platshållare: krav på våra samarbetspartners
          </p>
          <p className="mt-2 leading-relaxed text-sand-700">
            Här ska det stå vilka krav Nyflytt ställer på sina
            samarbetspartners – exempelvis F-skatt, ansvarsförsäkring,
            kollektivavtal eller andra kontroller. Texten är medvetet tom tills
            uppgifterna är bekräftade, eftersom det inte får påstås något som
            inte stämmer.
          </p>
        </div>
      </Sektion>

      {/* Förberedelser */}
      <Sektion bakgrund="varm" labelledBy="forbered-rubrik">
        <SektionsRubrik
          id="forbered-rubrik"
          rubrik="Det här är bra att ha klart"
          ingress="Du behöver inte ha allt exakt – ungefärliga uppgifter räcker för en offert."
        />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {forberedelser.map((f) => (
            <li
              key={f.rubrik}
              className="flex gap-4 rounded-3xl bg-white p-6 ring-1 ring-sand-200"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-korall-50 text-korall-700">
                <Ikon namn={f.ikon} className="size-5" />
              </span>
              <span>
                <span className="block font-sans text-lg font-bold text-sand-950">
                  {f.rubrik}
                </span>
                <span className="mt-1.5 block leading-relaxed text-sand-600">
                  {f.text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Frågor */}
      <Sektion bakgrund="ljus" labelledBy="fragor-rubrik">
        <SektionsRubrik
          id="fragor-rubrik"
          rubrik="Allt du kanske undrar"
        />
        <div className="mt-10 max-w-3xl">
          <Fragor fragor={vanligaFragor} />
          <p className="mt-6 text-[0.9375rem] text-sand-600">
            Har du en fråga som inte står här?{" "}
            <Link
              href="/kontakt"
              className="font-medium text-korall-700 underline underline-offset-2 hover:text-korall-800"
            >
              Kontakta oss
            </Link>
            .
          </p>
        </div>
      </Sektion>

      <OffertCta />
    </>
  );
}
