import Link from "next/link";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Fragor } from "@/components/Fragor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { KnappLank } from "@/components/Knapp";
import { OffertCta } from "@/components/OffertCta";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { vanligaFragor } from "@/lib/faq";
import { ortPath, orter, storstader } from "@/lib/orter";
import { brodsmulaSchema, faqSchema, tjanstSchema } from "@/lib/schema";
import { aktivaTjanster, type Tjanst } from "@/lib/tjanster";

/**
 * Gemensam layout för tjänstesidorna.
 * Innehållet kommer från tjänstekatalogen så texterna redigeras på ett ställe.
 */
export function TjanstSida({
  tjanst,
  /** Tjänstespecifika frågor som läggs före de generella. */
  egnaFragor = [],
  /**
   * Extra innehåll som läggs in före CTA:n, t.ex. ortslänkar.
   * Används av flyttstädningssidan för att länka till ortssidorna.
   */
  extra,
}: {
  tjanst: Tjanst;
  egnaFragor?: { fraga: string; svar: string }[];
  extra?: React.ReactNode;
}) {
  const path = `/${tjanst.slug}`;
  // Ett urval generella frågor + tjänstens egna. Samma lista går till schemat.
  const fragor = [...egnaFragor, ...vanligaFragor.slice(0, 4)];

  const andraTjanster = aktivaTjanster.filter((t) => t.slug !== tjanst.slug);

  return (
    <>
      <JsonLd
        data={[
          tjanstSchema({
            namn: tjanst.namn,
            beskrivning: tjanst.metaBeskrivning,
            path,
            omraden: orter.map((o) => o.namn),
          }),
          brodsmulaSchema([
            { namn: "Start", path: "/" },
            { namn: tjanst.kortNamn, path },
          ]),
          faqSchema(fragor),
        ]}
      />

      <Brodsmulor
        items={[
          { namn: "Start", path: "/" },
          { namn: tjanst.kortNamn, path },
        ]}
      />

      {/* Sidhuvud */}
      <header className="behallare pt-8 pb-14 sm:pt-12 sm:pb-16">
        <div className="max-w-3xl">
          <span className="flex size-14 items-center justify-center rounded-2xl bg-korall-100 text-korall-700">
            <Ikon namn={tjanst.ikon} className="size-7" />
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
            {tjanst.rubrik}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-700 sm:text-xl">
            {tjanst.ingress}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <KnappLank
              href={`/offert?tjanst=${tjanst.offertTyp}`}
              storlek="lg"
              medPil
            >
              Begär offert
            </KnappLank>
            <KnappLank href="/sa-fungerar-det" storlek="lg" variant="sekundar">
              Så fungerar det
            </KnappLank>
          </div>
        </div>
      </header>

      {/* Vad ingår + bra att veta */}
      <Sektion bakgrund="ljus" labelledBy="ingar-rubrik">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SektionsRubrik
              id="ingar-rubrik"
              rubrik="Det här ingår"
            />
            <ul className="mt-8 space-y-3.5">
              {tjanst.ingar.map((punkt) => (
                <li key={punkt} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-korall-100 text-korall-700">
                    <Ikon namn="check" className="size-4" />
                  </span>
                  <span className="text-[1.0625rem] leading-relaxed text-sand-700">
                    {punkt}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-sand-500">
              Exakt omfattning framgår av offerten. Den kan variera något mellan
              samarbetspartners.
            </p>
          </div>

          {/* Bra att veta – ärligt om gränserna */}
          <div className="rounded-3xl bg-sand-100/70 p-6 sm:p-8">
            <h2 className="font-sans text-xl font-bold text-sand-950">
              Bra att veta
            </h2>
            <ul className="mt-5 space-y-4">
              {tjanst.braAttVeta.map((punkt) => (
                <li key={punkt} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-korall-600"
                  />
                  <span className="leading-relaxed text-sand-700">{punkt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Sektion>

      {/* Ortslänkar */}
      <Sektion labelledBy="ort-rubrik">
        <SektionsRubrik
          id="ort-rubrik"
          rubrik={`${tjanst.kortNamn} där du bor`}
          ingress="Läs vad som är bra att veta inför en flytt i din ort."
        />
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {storstader.map((ort) => (
            <li key={ort.slug}>
              <Link
                href={ortPath(ort)}
                className="inline-flex min-h-10 items-center rounded-full bg-white px-4 font-medium text-sand-700 ring-1 ring-sand-200 transition-all hover:text-korall-700 hover:ring-korall-400"
              >
                {tjanst.kortNamn} {ort.iOrt}
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Frågor */}
      <Sektion bakgrund="varm" labelledBy="fragor-rubrik">
        <SektionsRubrik
          id="fragor-rubrik"
          rubrik={`Frågor om ${tjanst.kortNamn.toLowerCase()}`}
        />
        <div className="mt-10 max-w-3xl">
          <Fragor fragor={fragor} />
        </div>
      </Sektion>

      {/* Andra tjänster */}
      <Sektion bakgrund="ljus" labelledBy="andra-rubrik">
        <SektionsRubrik
          id="andra-rubrik"
          rubrik="Behöver du något mer?"
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-3">
          {andraTjanster.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="group flex h-full flex-col rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200 transition-all hover:bg-white hover:ring-korall-300"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-korall-50 text-korall-700">
                  <Ikon namn={t.ikon} className="size-5" />
                </span>
                <span className="mt-4 font-sans font-bold text-sand-950">
                  {t.kortNamn}
                </span>
                <span className="mt-1.5 flex-1 text-[0.9375rem] leading-relaxed text-sand-600">
                  {t.sammanfattning}
                </span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-korall-700">
                  Läs mer
                  <Ikon
                    namn="pil"
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      {extra}

      <OffertCta href={`/offert?tjanst=${tjanst.offertTyp}`} />
    </>
  );
}
