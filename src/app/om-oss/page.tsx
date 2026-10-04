import type { Metadata } from "next";
import Link from "next/link";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { OffertCta } from "@/components/OffertCta";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { ortPath, storstader } from "@/lib/orter";
import { brodsmulaSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Om Nyflytt – så arbetar vi",
  description:
    "Nyflytt förmedlar flytthjälp och flyttstädning i Skåne och Halland. Vi tar emot förfrågan och tar fram offerten – uppdraget utförs av en samarbetspartner.",
  path: "/om-oss",
});

/** Principer – formulerade som åtaganden vi faktiskt kan hålla. */
const principer = [
  {
    ikon: "check",
    rubrik: "Vi säger som det är",
    text: "Nyflytt utför inte flyttarna själva. Uppdragen utförs av samarbetspartners, och det står vi för öppet – inte i det finstilta. Du får veta vilken partner som utför ditt uppdrag innan du bokar.",
  },
  {
    ikon: "epost",
    rubrik: "Tydlig omfattning framför lockpris",
    text: "En offert som ser billig ut men saknar hälften av momenten hjälper ingen. Vi skriver hellre ut vad som ingår och vad som inte gör det, så att du kan jämföra på riktigt.",
  },
  {
    ikon: "kombo",
    rubrik: "En kontaktväg",
    text: "Bokar du både flytt och städ ska du inte behöva agera projektledare mellan två företag. Vi håller ihop datumen och kontakten även om två olika partners utför momenten.",
  },
  {
    ikon: "klocka",
    rubrik: "Inget köptryck",
    text: "Att begära offert kostar ingenting och binder dig inte. Passar inte offerten tackar du nej, och då är det inte mer med det.",
  },
] as const;

export default function OmOssSida() {
  const brodsmulor = [
    { namn: "Start", path: "/" },
    { namn: "Om oss", path: "/om-oss" },
  ];

  return (
    <>
      <JsonLd data={brodsmulaSchema(brodsmulor)} />
      <Brodsmulor items={brodsmulor} />

      <header className="behallare pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
            Om Nyflytt
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-700 sm:text-xl">
            Vi gör det enklare att boka flytt och flyttstädning. I stället för
            att du ringer runt till flera firmor beskriver du ditt behov en
            gång, och får tillbaka en offert med tydlig omfattning.
          </p>
        </div>
      </header>

      {/* Vad vi gör */}
      <Sektion bakgrund="ljus" labelledBy="modell-rubrik">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SektionsRubrik
              id="modell-rubrik"
              rubrik="Vi förmedlar – partnern utför"
            />
            <div className="mt-8 max-w-[68ch] space-y-5 text-[1.0625rem] leading-relaxed text-sand-700">
              <p>
                En flytt innehåller fler beslut än man tänker på. Ska städningen
                bokas hos samma firma? Hur mycket kostar det egentligen när
                våningen ligger på fjärde utan hiss? Vad räknas som
                flyttstädning och vad räknas inte?
              </p>
              <p>
                Nyflytt finns för att göra de besluten färre. Du fyller i en
                förfrågan där vi frågar efter det som faktiskt påverkar
                bedömningen, och slipper jämföra offerter som inte är
                jämförbara.
              </p>
              <p>
                Själva arbetet utförs av våra samarbetspartners. Det är en
                medveten modell: den som lastar bilen i Helsingborg ska vara en
                utförare som kan orten och har utrustningen. Vår uppgift är att
                ta emot förfrågan, ta fram offerten, matcha uppdraget med rätt
                partner och vara din kontaktväg om något behöver ändras.
              </p>
              <p>
                Det betyder också att vi inte lovar saker vi inte kan hålla. Vi
                skriver inte att vi har personal i varje ort, för det har vi
                inte. Vi anger inte hur snabbt en bil kan vara på plats, för det
                avgörs av vilken partner som tar uppdraget. Det du läser här ska
                gå att lita på.
              </p>
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-sand-100/70 p-6">
              <h2 className="font-sans text-lg font-bold text-sand-950">
                Det här gör vi
              </h2>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Tar emot och går igenom förfrågningar",
                  "Tar fram offerter",
                  "Matchar uppdrag med samarbetspartners",
                  "Samordnar flytt och städ",
                  "Är din kontaktväg",
                ].map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Ikon
                      namn="check"
                      className="mt-0.5 size-[1.125rem] shrink-0 text-korall-600"
                    />
                    <span className="text-[0.9375rem] leading-relaxed text-sand-700">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-sand-100/70 p-6">
              <h2 className="font-sans text-lg font-bold text-sand-950">
                Var vi arbetar
              </h2>
              <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-sand-700">
                Nio orter i Skåne och Halland.
              </p>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {storstader.map((ort) => (
                  <li key={ort.slug}>
                    <Link
                      href={ortPath(ort)}
                      className="inline-flex min-h-8 items-center rounded-full bg-white px-3 text-sm font-medium text-sand-700 ring-1 ring-sand-200 transition-colors hover:text-korall-700"
                    >
                      {ort.namn}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </Sektion>

      {/* Principer */}
      <Sektion labelledBy="principer-rubrik">
        <SektionsRubrik
          id="principer-rubrik"
          rubrik="Fyra saker vi håller fast vid"
        />
        <ul className="mt-12 grid gap-6 sm:grid-cols-2">
          {principer.map((p) => (
            <li
              key={p.rubrik}
              className="rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-7"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-korall-600 text-white">
                <Ikon namn={p.ikon} className="size-5" />
              </span>
              <h3 className="mt-4 font-sans text-lg font-bold text-sand-950">
                {p.rubrik}
              </h3>
              <p className="mt-2 leading-relaxed text-sand-600">{p.text}</p>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Företagsuppgifter – platshållare */}
      <Sektion bakgrund="ljus" labelledBy="uppgifter-rubrik">
        <SektionsRubrik
          id="uppgifter-rubrik"
          rubrik="Om företaget bakom Nyflytt"
        />
        <div className="mt-10 max-w-3xl rounded-3xl border border-dashed border-sand-300 bg-sand-100/60 p-6 sm:p-8">
          <p className="font-sans font-semibold text-sand-900">
            Platshållare: fylls i före publicering
          </p>
          <p className="mt-2 leading-relaxed text-sand-700">
            Här ska företagets juridiska namn, organisationsnummer, säte och
            eventuell historik stå. Uppgifterna fylls i på ett ställe, i{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.875em] text-sand-800">
              src/lib/site.ts
            </code>
            , och används då även i sidfoten och i den strukturerade datan.
          </p>
          <ul className="mt-4 space-y-2 text-[0.9375rem] text-sand-700">
            {[
              "Juridiskt namn och organisationsnummer",
              "Adress och säte",
              "Telefonnummer och öppettider för kundservice",
              "Eventuella tillstånd och försäkringar",
              "Krav som ställs på samarbetspartners",
            ].map((p) => (
              <li key={p} className="flex gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-korall-600"
                />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </Sektion>

      <OffertCta />
    </>
  );
}
