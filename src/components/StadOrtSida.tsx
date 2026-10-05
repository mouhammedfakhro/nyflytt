import Link from "next/link";
import { Bild } from "@/components/Bild";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Fragor } from "@/components/Fragor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { KnappLank } from "@/components/Knapp";
import { OffertCta } from "@/components/OffertCta";
import { Processteg } from "@/components/Processteg";
import { RutSektion } from "@/components/RutSektion";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { vanligaFragor } from "@/lib/faq";
import {
  mindreOrterNara,
  type Ort,
  ortPath,
  stadPath,
  storstaderMedStad,
} from "@/lib/orter";
import { brodsmulaSchema, faqSchema, tjanstSchema } from "@/lib/schema";
import { hittaTjanst } from "@/lib/tjanster";

/**
 * Gemensam layout för ortssidor om FLYTTSTÄDNING (/flyttstadning-<ort>).
 *
 * Skild från `OrtSida`, som handlar om flytten. Innehållet kommer från
 * `ort.stad` och är städspecifikt – bostadsbestånd som påverkar städningen,
 * besiktningspraxis, fönsterkonstruktioner. Att återanvända flyttsidans
 * text här hade gett near-duplicate content.
 *
 * Sidan renderas bara för orter som har `stad` ifyllt; routerna filtrerar
 * på `orterMedStad` i generateStaticParams.
 */
export function StadOrtSida({ ort }: { ort: Ort }) {
  // Anropande route har redan kontrollerat att fältet finns.
  const stad = ort.stad!;
  const path = stadPath(ort);
  const arStorstad = ort.typ === "storstad";
  const tjanst = hittaTjanst("flyttstadning")!;

  // Ortens egna städfrågor först, sedan generella. Storstadssidorna är
  // längre och får fler.
  const fragor = [
    ...stad.fragor,
    ...vanligaFragor.slice(0, arStorstad ? 5 : 3),
  ];

  // Storstadssidorna länkar nedåt till de mindre orternas städsidor, så
  // att de inte blir föräldralösa. Bara orter som faktiskt har städsida.
  const mindreNara = arStorstad
    ? mindreOrterNara(ort.slug).filter((o) => o.stad)
    : [];

  const brodsmulor = [
    { namn: "Start", path: "/" },
    { namn: "Flyttstädning", path: "/flyttstadning" },
    { namn: ort.namn, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          tjanstSchema({
            namn: `Flyttstädning ${ort.iOrt}`,
            beskrivning: stad.metaBeskrivning,
            path,
            omraden: [ort.namn],
          }),
          brodsmulaSchema(brodsmulor),
          faqSchema(fragor),
        ]}
      />

      <Brodsmulor items={brodsmulor} />

      {/* Sidhuvud med bild */}
      <header className="behallare pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
              Flyttstädning {ort.namn}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-sand-700 sm:text-xl">
              {stad.ingress}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <KnappLank
                href={`/offert?tjanst=stad&ort=${encodeURIComponent(ort.namn)}`}
                storlek="lg"
                medPil
              >
                Begär offert
              </KnappLank>
              <KnappLank href="/flyttstadning" storlek="lg" variant="sekundar">
                Vad ingår i flyttstädning?
              </KnappLank>
            </div>
          </div>

          <Bild
            src="/bilder/flyttstadning-rent-kok-efter-stadning.webp"
            alt="Rent kök med torkade bänkytor och vitvaror efter flyttstädning"
            format="liggande"
            prioritet
            className="shadow-mjuk"
          />
        </div>
      </header>

      {/* Unik brödtext om städningen i orten + faktaruta */}
      <Sektion bakgrund="ljus" labelledBy="om-stadningen-rubrik">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SektionsRubrik
              id="om-stadningen-rubrik"
              rubrik={`Så ser en flyttstädning i ${ort.namn} ut`}
            />
            <div className="mt-8 max-w-[68ch] space-y-5 text-[1.0625rem] leading-relaxed text-sand-700">
              {stad.omStadningen.map((stycke, i) => (
                <p key={i}>{stycke}</p>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-7">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
              Bostäder i {ort.namn}
            </h3>
            <p className="mt-3 text-[1.0625rem] leading-relaxed text-sand-700">
              {ort.bebyggelse}
            </p>

            <h3 className="mt-7 font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
              Detta ingår normalt
            </h3>
            <ul className="mt-3 space-y-2.5">
              {tjanst.ingar.slice(0, 4).map((rad) => (
                <li key={rad} className="flex gap-2.5 text-[0.9375rem] leading-relaxed text-sand-700">
                  <Ikon
                    namn="check"
                    className="mt-0.5 size-[1.125rem] shrink-0 text-korall-600"
                  />
                  {rad}
                </li>
              ))}
            </ul>
            <Link
              href="/flyttstadning"
              className="mt-4 inline-flex items-center gap-1.5 font-sans text-[0.9375rem] font-semibold text-korall-700 underline decoration-korall-300 underline-offset-4 transition-colors hover:text-korall-800"
            >
              Se hela omfattningen
              <Ikon namn="pil" className="size-4 shrink-0" />
            </Link>
          </aside>
        </div>
      </Sektion>

      {/* Praktiska förhållanden i orten */}
      <Sektion labelledBy="praktiskt-rubrik">
        <SektionsRubrik
          id="praktiskt-rubrik"
          rubrik={`Bra att veta inför städningen i ${ort.namn}`}
          ingress="Sådant som påverkar omfattningen och tidsplanen just här."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {stad.praktiskt.map((p) => (
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

      {/* Så fungerar det */}
      <Sektion bakgrund="ljus" labelledBy="process-rubrik">
        <SektionsRubrik
          id="process-rubrik"
          rubrik="Från förfrågan till städad bostad"
        />
        <div className="mt-12">
          <Processteg />
        </div>
      </Sektion>

      {/* RUT-avdrag – gäller flyttstädning */}
      <RutSektion />

      {/* Frågor */}
      <Sektion labelledBy="fragor-rubrik">
        <SektionsRubrik
          id="fragor-rubrik"
          rubrik={`Frågor om flyttstädning i ${ort.namn}`}
        />
        <div className="mt-10 max-w-3xl">
          <Fragor fragor={fragor} />
        </div>
      </Sektion>

      {/* Internlänkning: flyttsidan för samma ort + andra orters städsidor */}
      <Sektion bakgrund="ljus" labelledBy="andra-orter-rubrik">
        <SektionsRubrik
          id="andra-orter-rubrik"
          rubrik="Behöver du hjälp med flytten också?"
          ingress={`Ska du både flytta och städa kan du boka båda delarna i samma förfrågan.`}
        />

        <div className="mt-10 flex flex-wrap gap-3">
          <KnappLank href={ortPath(ort)} variant="sekundar" medPil>
            Flyttfirma {ort.namn}
          </KnappLank>
          <KnappLank href="/flytt-och-stad" variant="sekundar" medPil>
            Flytt och städ i ett
          </KnappLank>
        </div>

        {mindreNara.length > 0 ? (
          <div className="mt-10 border-t border-sand-200 pt-8">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
              Flyttstädning i närliggande orter
            </h3>
            <ul className="mt-3.5 flex flex-wrap gap-2">
              {mindreNara.map((o) => (
                <li key={o.slug}>
                  <Link
                    href={stadPath(o)}
                    className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-[0.9375rem] font-medium text-sand-700 ring-1 ring-sand-200 transition-all hover:text-korall-700 hover:ring-korall-400"
                  >
                    {o.namn}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 border-t border-sand-200 pt-8">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
            Flyttstädning i större orter
          </h3>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {storstaderMedStad
              .filter((o) => o.slug !== ort.slug)
              .map((o) => (
                <li key={o.slug}>
                  <Link
                    href={stadPath(o)}
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
        rubrik={`Begär offert för flyttstädning i ${ort.namn}`}
        text="Beskriv bostaden och ditt datum i formuläret. Du får en offert med tydlig omfattning och binder dig inte till något."
        href={`/offert?tjanst=stad&ort=${encodeURIComponent(ort.namn)}`}
      />
    </>
  );
}
