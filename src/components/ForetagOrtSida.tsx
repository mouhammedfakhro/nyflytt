import Link from "next/link";
import { Bild } from "@/components/Bild";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Fragor } from "@/components/Fragor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { KnappLank } from "@/components/Knapp";
import { OffertCta } from "@/components/OffertCta";
import { Processteg } from "@/components/Processteg";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { vanligaFragor } from "@/lib/faq";
import {
  foretagPath,
  type Ort,
  ortPath,
  storstaderMedForetag,
} from "@/lib/orter";
import { brodsmulaSchema, faqSchema, tjanstSchema } from "@/lib/schema";
import { hittaTjanst } from "@/lib/tjanster";

/**
 * Ortssida för FÖRETAGSFLYTT (/foretag-<ort>).
 *
 * Finns bara för storstäderna – se `storstaderMedForetag`. Innehållet
 * kommer från `ort.foretag` och handlar om verksamheter: kontorslägen,
 * lastzoner, tillträde utanför kontorstid. Medvetet skilt från både
 * flytt- och städsidan för samma ort.
 */
export function ForetagOrtSida({ ort }: { ort: Ort }) {
  // Anropande route har redan kontrollerat att fältet finns.
  const foretag = ort.foretag!;
  const path = foretagPath(ort);
  const tjanst = hittaTjanst("foretagsflytt")!;

  const fragor = [...foretag.fragor, ...vanligaFragor.slice(0, 4)];

  const brodsmulor = [
    { namn: "Start", path: "/" },
    { namn: "Företagsflytt", path: "/foretagsflytt" },
    { namn: ort.namn, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          tjanstSchema({
            namn: `Företagsflytt ${ort.iOrt}`,
            beskrivning: foretag.metaBeskrivning,
            path,
            omraden: [ort.namn],
          }),
          brodsmulaSchema(brodsmulor),
          faqSchema(fragor),
        ]}
      />

      <Brodsmulor items={brodsmulor} />

      <header className="behallare pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
              Företagsflytt {ort.namn}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-sand-700 sm:text-xl">
              {foretag.ingress}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <KnappLank
                href={`/offert?tjanst=foretag&ort=${encodeURIComponent(ort.namn)}`}
                storlek="lg"
                medPil
              >
                Begär offert
              </KnappLank>
              <KnappLank href="/foretagsflytt" storlek="lg" variant="sekundar">
                Om företagsflytt
              </KnappLank>
            </div>
          </div>

          <Bild
            src="/bilder/foretagsflytt-kartonger-i-tom-lokal.webp"
            alt="Flyttkartonger staplade i en tom kontorslokal"
            format="liggande"
            prioritet
            className="shadow-mjuk"
          />
        </div>
      </header>

      <Sektion bakgrund="ljus" labelledBy="om-foretag-rubrik">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SektionsRubrik
              id="om-foretag-rubrik"
              rubrik={`Så ser en företagsflytt i ${ort.namn} ut`}
            />
            <div className="mt-8 max-w-[68ch] space-y-5 text-[1.0625rem] leading-relaxed text-sand-700">
              {foretag.omFlytten.map((stycke, i) => (
                <p key={i}>{stycke}</p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-7">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
              Detta ingår normalt
            </h3>
            <ul className="mt-3 space-y-2.5">
              {tjanst.ingar.slice(0, 4).map((rad) => (
                <li
                  key={rad}
                  className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-sand-700"
                >
                  <Ikon
                    namn="check"
                    className="mt-0.5 size-[1.125rem] shrink-0 text-korall-600"
                  />
                  {rad}
                </li>
              ))}
            </ul>
            <Link
              href="/foretagsflytt"
              className="mt-4 inline-flex items-center gap-1.5 font-sans text-[0.9375rem] font-semibold text-korall-700 underline decoration-korall-300 underline-offset-4 transition-colors hover:text-korall-800"
            >
              Se hela omfattningen
              <Ikon namn="pil" className="size-4 shrink-0" />
            </Link>
          </aside>
        </div>
      </Sektion>

      <Sektion labelledBy="praktiskt-rubrik">
        <SektionsRubrik
          id="praktiskt-rubrik"
          rubrik={`Bra att veta inför flytten i ${ort.namn}`}
          ingress="Sådant som påverkar upplägget och tidsplanen just här."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {foretag.praktiskt.map((p) => (
            <li
              key={p.rubrik}
              className="rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-7"
            >
              <h3 className="font-sans text-lg font-bold text-sand-950">
                {p.rubrik}
              </h3>
              <p className="mt-2.5 leading-relaxed text-sand-600">{p.text}</p>
            </li>
          ))}
        </ul>
      </Sektion>

      <Sektion bakgrund="ljus" labelledBy="process-rubrik">
        <SektionsRubrik
          id="process-rubrik"
          rubrik="Från förfrågan till inflyttad verksamhet"
        />
        <div className="mt-12">
          <Processteg />
        </div>
      </Sektion>

      <Sektion labelledBy="fragor-rubrik">
        <SektionsRubrik
          id="fragor-rubrik"
          rubrik={`Frågor om företagsflytt i ${ort.namn}`}
        />
        <div className="mt-10 max-w-3xl">
          <Fragor fragor={fragor} />
        </div>
      </Sektion>

      <Sektion bakgrund="ljus" labelledBy="andra-orter-rubrik">
        <SektionsRubrik
          id="andra-orter-rubrik"
          rubrik="Flyttar ni privat också?"
          ingress="Ortssidorna för bohagsflytt och flyttstädning täcker privatflytten."
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <KnappLank href={ortPath(ort)} variant="sekundar" medPil>
            Flyttfirma {ort.namn}
          </KnappLank>
        </div>

        <div className="mt-10 border-t border-sand-200 pt-8">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
            Företagsflytt i andra orter
          </h3>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {storstaderMedForetag
              .filter((o) => o.slug !== ort.slug)
              .map((o) => (
                <li key={o.slug}>
                  <Link
                    href={foretagPath(o)}
                    className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-[0.9375rem] font-medium text-sand-700 ring-1 ring-sand-200 transition-all hover:text-korall-700 hover:ring-korall-400"
                  >
                    {o.namn}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </Sektion>

      <OffertCta
        rubrik={`Begär offert för företagsflytt i ${ort.namn}`}
        text="Beskriv verksamheten, antal arbetsplatser och vilka tider ni kan stå still. Du binder dig inte till något."
        href={`/offert?tjanst=foretag&ort=${encodeURIComponent(ort.namn)}`}
      />
    </>
  );
}
