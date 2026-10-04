import type { Metadata } from "next";
import Link from "next/link";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Fragor } from "@/components/Fragor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { KnappLank } from "@/components/Knapp";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { vanligaFragor } from "@/lib/faq";
import { brodsmulaSchema, faqSchema, kontaktsidaSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Kontakta Nyflytt",
  description:
    "Kontakta Nyflytt om flytt, flyttstädning eller en förfrågan du redan skickat. Skicka e-post eller begär offert direkt via formuläret.",
  path: "/kontakt",
});

export default function KontaktSida() {
  const brodsmulor = [
    { namn: "Start", path: "/" },
    { namn: "Kontakt", path: "/kontakt" },
  ];

  // Kontaktsidan visar de frågor som oftast gör att folk hör av sig.
  const fragor = vanligaFragor.slice(0, 5);

  return (
    <>
      <JsonLd
        data={[
          kontaktsidaSchema(),
          brodsmulaSchema(brodsmulor),
          faqSchema(fragor),
        ]}
      />
      <Brodsmulor items={brodsmulor} />

      <header className="behallare pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
            Kontakta oss
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-700 sm:text-xl">
            Ska du boka flytt eller städ går det snabbast via offertformuläret –
            då har vi uppgifterna vi behöver direkt. Har du en annan fråga är du
            välkommen att mejla.
          </p>
        </div>
      </header>

      <Sektion bakgrund="ljus" labelledBy="kontaktvagar">
        <SektionsRubrik
          id="kontaktvagar"
          rubrik="Hur vill du höra av dig?"
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Offert – primär väg */}
          <div className="rounded-3xl bg-korall-600 p-6 text-white sm:p-7">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/15">
              <Ikon namn="lada" className="size-5" />
            </span>
            <h3 className="mt-4 font-sans text-xl font-bold">
              Begär offert
            </h3>
            <p className="mt-2 leading-relaxed text-korall-50">
              Snabbaste vägen om du ska boka. Fem steg, och du ser en
              sammanfattning innan du skickar.
            </p>
            <div className="mt-6">
              <KnappLank href="/offert" variant="sekundar" medPil>
                Till formuläret
              </KnappLank>
            </div>
          </div>

          {/* E-post */}
          <div className="rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-7">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-korall-50 text-korall-700">
              <Ikon namn="epost" className="size-5" />
            </span>
            <h3 className="mt-4 font-sans text-xl font-bold text-sand-950">
              E-post
            </h3>
            <p className="mt-2 leading-relaxed text-sand-600">
              För frågor, ändringar eller om du redan skickat en förfrågan. Ange
              gärna ditt referensnummer.
            </p>
            <p className="mt-5">
              <a
                href={`mailto:${siteConfig.kontakt.epost}`}
                className="font-sans font-semibold text-korall-700 underline underline-offset-2 hover:text-korall-800"
              >
                {siteConfig.kontakt.epost}
              </a>
            </p>
          </div>

          {/* Telefon – platshållare */}
          <div className="rounded-3xl border border-dashed border-sand-300 bg-sand-100/60 p-6 sm:p-7">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white text-sand-500 ring-1 ring-sand-200">
              <Ikon namn="telefon" className="size-5" />
            </span>
            <h3 className="mt-4 font-sans text-xl font-bold text-sand-950">
              Telefon
            </h3>
            <p className="mt-2 leading-relaxed text-sand-700">
              <strong className="font-semibold">Platshållare.</strong> Riktigt
              telefonnummer och öppettider fylls i{" "}
              <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.875em] text-sand-800">
                src/lib/site.ts
              </code>
              . Vill ni inte erbjuda telefonkontakt tas kortet bort.
            </p>
            <p className="mt-4 text-[0.9375rem] text-sand-600">
              {siteConfig.kontakt.oppettider}
            </p>
          </div>
        </div>

        {/* Adressuppgifter – platshållare */}
        <div className="mt-10 max-w-3xl rounded-3xl border border-dashed border-sand-300 bg-sand-100/60 p-6">
          <p className="font-sans font-semibold text-sand-900">
            Platshållare: postadress och organisationsuppgifter
          </p>
          <p className="mt-2 leading-relaxed text-sand-700">
            Adress, postnummer, postort och organisationsnummer fylls i under{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.875em] text-sand-800">
              organisation
            </code>{" "}
            i{" "}
            <code className="rounded bg-white px-1.5 py-0.5 font-mono text-[0.875em] text-sand-800">
              src/lib/site.ts
            </code>
            . Uppgifterna visas då här och i sidfoten, och tas automatiskt med i
            den strukturerade datan. Tomma fält utesluts helt, så inget halvfärdigt
            publiceras.
          </p>
        </div>
      </Sektion>

      {/* Frågor */}
      <Sektion labelledBy="fragor-rubrik">
        <SektionsRubrik
          id="fragor-rubrik"
          rubrik="Svaret kan stå här"
        />
        <div className="mt-10 max-w-3xl">
          <Fragor fragor={fragor} />
          <p className="mt-6 text-[0.9375rem] text-sand-600">
            Fler frågor och svar finns på{" "}
            <Link
              href="/sa-fungerar-det"
              className="font-medium text-korall-700 underline underline-offset-2 hover:text-korall-800"
            >
              Så fungerar det
            </Link>
            .
          </p>
        </div>
      </Sektion>
    </>
  );
}
