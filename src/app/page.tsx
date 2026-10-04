import type { Metadata } from "next";
import Link from "next/link";
import { Fragor } from "@/components/Fragor";
import { Hero } from "@/components/Hero";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { KnappLank } from "@/components/Knapp";
import { OffertCta } from "@/components/OffertCta";
import { Bild } from "@/components/Bild";
import { Processteg } from "@/components/Processteg";
import { RutSektion } from "@/components/RutSektion";
import { Sektion, SektionsRubrik } from "@/components/Sektion";
import { TjanstBlock } from "@/components/TjanstBlock";
import { startsidansFragor } from "@/lib/faq";
import { ortPath, storstader } from "@/lib/orter";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { loften, tjanstBlock, varderingar } from "@/lib/startsida";
import { aktivaTjanster } from "@/lib/tjanster";

export const metadata: Metadata = buildMetadata({
  title: "Flytthjälp och flyttstädning – boka flytt och städ på ett ställe",
  description:
    "Nyflytt hjälper privatpersoner och företag att boka flytthjälp och flyttstädning. Beskriv ditt behov, få en tydlig offert och låt en samarbetspartner utföra jobbet. Verksam i Skåne och Halland.",
  path: "/",
  absolutTitel: true,
});

export default function Startsida() {
  return (
    <>
      <JsonLd data={faqSchema(startsidansFragor)} />

      <Hero />

      {/* Tre löften */}
      <Sektion bakgrund="ljus" labelledBy="loften-rubrik">
        <SektionsRubrik
          id="loften-rubrik"
          rubrik="Enkelt att boka, tydligt hela vägen"
          ingress="Du beskriver behovet en gång. Vi tar fram offerten och håller ihop kontakten."
          centrerad
        />
        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {loften.map((l) => (
            <li
              key={l.rubrik}
              className="rounded-3xl bg-sand-50 p-6 ring-1 ring-sand-200 sm:p-7"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-korall-600 text-white">
                <Ikon namn={l.ikon} className="size-6" />
              </span>
              <h3 className="mt-5 font-sans text-lg font-bold text-sand-950">
                {l.rubrik}
              </h3>
              <p className="mt-2 leading-relaxed text-sand-600">{l.text}</p>
              <Link
                href="/offert"
                className="mt-5 inline-flex items-center gap-1.5 font-sans text-[0.9375rem] font-semibold text-korall-700 hover:text-korall-800 hover:underline"
              >
                Få kostnadsfri offert
                <Ikon namn="pil" className="size-4" />
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Processen */}
      <Sektion labelledBy="process-rubrik">
        <SektionsRubrik
          id="process-rubrik"
          rubrik="Fyra steg från förfrågan till utfört jobb"
          ingress="Du gör en förfrågan. Vi räknar och återkommer. En samarbetspartner utför uppdraget."
        />
        <div className="mt-12">
          <Processteg kompakt />
        </div>
        <div className="mt-10">
          <KnappLank href="/sa-fungerar-det" variant="sekundar" medPil>
            Läs mer om processen
          </KnappLank>
        </div>
      </Sektion>

      {/* Tjänstesektioner med bild – alternerande layout */}
      {tjanstBlock.map((block, i) => (
        <TjanstBlock
          key={block.slug}
          data={block}
          vand={i % 2 === 1}
          bakgrund={i % 2 === 0 ? "ljus" : "ingen"}
        />
      ))}

      {/* Flytt och städ tillsammans – lyfts som eget erbjudande */}
      <Sektion bakgrund="varm" labelledBy="kombo-rubrik">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2
              id="kombo-rubrik"
              className="text-3xl font-bold text-sand-950 sm:text-4xl"
            >
              Ta båda i samma bokning
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sand-600">
              Det vanligaste krånglet vid en flytt är att flytten och städningen
              bokas var för sig och krockar. Beställer du båda hos oss planeras
              de i rätt ordning från början.
            </p>

            <ul className="mt-7 space-y-3">
              {[
                "Samordnade datum – städningen sker efter att bostaden är tömd",
                "En offert och en kontaktväg för båda uppdragen",
                "Samordningen sköter vi, även om två partners utför momenten",
              ].map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-korall-600 text-white">
                    <Ikon namn="check" className="size-4" />
                  </span>
                  <span className="leading-relaxed text-sand-700">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <KnappLank href="/offert?tjanst=bada" medPil>
                Få kostnadsfri offert
              </KnappLank>
              <Link
                href="/flytt-och-stad"
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 font-sans font-semibold text-korall-700 transition-colors hover:text-korall-800 hover:underline"
              >
                Läs mer om flytt och städ
                <Ikon namn="pil" className="size-4" />
              </Link>
            </div>
          </div>

          <Bild
            src="/bilder/flytt-och-stad-rengoring-av-spegel.webp"
            alt="Hand med gul skyddshandske rengör en spegel med svamp"
            format="liggande"
          />
        </div>
      </Sektion>

      {/* RUT */}
      <RutSektion />

      {/* Värderingar */}
      <Sektion bakgrund="ljus" labelledBy="varderingar-rubrik">
        <SektionsRubrik
          id="varderingar-rubrik"
          rubrik="Tre saker vi håller fast vid"
          centrerad
        />
        <ul className="mt-14 grid gap-8 md:grid-cols-3">
          {varderingar.map((v) => (
            <li key={v.rubrik}>
              <Bild
                src={v.bild}
                alt={v.bildAlt}
                format="liggande"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
              <h3 className="mt-5 font-sans text-xl font-bold text-sand-950">
                {v.rubrik}
              </h3>
              <p className="mt-2 leading-relaxed text-sand-600">{v.text}</p>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Tjänsteöversikt – kompakt, alla fyra */}
      <Sektion labelledBy="alla-tjanster-rubrik">
        <SektionsRubrik
          id="alla-tjanster-rubrik"
          rubrik="Allt du kan boka hos oss"
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {aktivaTjanster.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="group flex h-full items-center gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-200 transition-all hover:ring-korall-300"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-korall-50 text-korall-700">
                  <Ikon namn={t.ikon} className="size-6" />
                </span>
                <span className="flex-1">
                  <span className="block font-sans font-bold text-sand-950">
                    {t.kortNamn}
                  </span>
                  <span className="mt-0.5 block text-[0.9375rem] leading-relaxed text-sand-600">
                    {t.sammanfattning}
                  </span>
                </span>
                <Ikon
                  namn="pil"
                  className="size-5 shrink-0 text-korall-600 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Orter */}
      <Sektion bakgrund="ljus" labelledBy="orter-rubrik">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SektionsRubrik
            id="orter-rubrik"
            rubrik="Var behöver du hjälp?"
            ingress="Läs om vad som är bra att veta inför en flytt i din ort."
          />
          <KnappLank href="/flyttfirma" variant="sekundar" medPil>
            Se alla orter
          </KnappLank>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storstader.map((ort) => (
            <li key={ort.slug}>
              <Link
                href={ortPath(ort)}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200 transition-all hover:bg-white hover:ring-korall-300"
              >
                <span>
                  <span className="block font-sans font-bold text-sand-950">
                    {ort.namn}
                  </span>
                  <span className="mt-0.5 block text-sm text-sand-500">
                    {ort.lan}
                  </span>
                </span>
                <Ikon
                  namn="pil"
                  className="size-5 shrink-0 text-korall-600 transition-transform group-hover:translate-x-0.5"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Vanliga frågor */}
      <Sektion labelledBy="fragor-rubrik">
        <SektionsRubrik
          id="fragor-rubrik"
          rubrik="Det folk oftast undrar"
        />
        <div className="mt-10 max-w-3xl">
          <Fragor fragor={startsidansFragor} />
          <p className="mt-6 text-[0.9375rem] text-sand-600">
            Hittar du inte svaret?{" "}
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
