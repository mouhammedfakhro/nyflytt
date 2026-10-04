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
import { hittaOrt, type Ort, ortPath, storstader } from "@/lib/orter";
import { brodsmulaSchema, faqSchema, tjanstSchema } from "@/lib/schema";
import { aktivaTjanster } from "@/lib/tjanster";

/**
 * Gemensam layout för ortssidor.
 *
 * SKILLNADEN MELLAN SIDTYPERNA
 * Storstäder (typ: "storstad") får tre extra avsnitt som bygger på data som
 * bara de har: stadsdelsguide, fördjupningsavsnitt och fler frågor. Mindre
 * orter får en kortare sida.
 *
 * Det är en innehållsskillnad, inte bara en layoutskillnad. En mindre ort
 * flyttas upp först när `stadsdelar` och `fordjupning` faktiskt är ifyllda –
 * annars blir den större mallen en tom skal-sida.
 */
export function OrtSida({ ort }: { ort: Ort }) {
  const path = ortPath(ort);
  const arStorstad = ort.typ === "storstad";

  // Storstäder får fler generella frågor eftersom sidan är längre och
  // besökaren förväntar sig mer djup.
  const fragor = [
    ...ort.fragor,
    ...vanligaFragor.slice(0, arStorstad ? 6 : 4),
  ];

  const narliggande = ort.narliggande
    .map((slug) => hittaOrt(slug))
    .filter((o): o is Ort => Boolean(o));

  const brodsmulor = [
    { namn: "Start", path: "/" },
    { namn: ort.namn, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          tjanstSchema({
            namn: `Flyttfirma ${ort.iOrt} – bohagsflytt och flyttstädning`,
            beskrivning: ort.metaBeskrivning,
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
              Flyttfirma {ort.namn}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-sand-700 sm:text-xl">
              {ort.ingress}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <KnappLank
                href={`/offert?ort=${encodeURIComponent(ort.namn)}`}
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

          <Bild
            src="/bilder/ort-lastning-av-flyttbil.webp"
            alt="Flyttkartonger lastas in i en flyttbil med hjälp av en pirra"
            format="liggande"
            prioritet
            className="shadow-mjuk"
          />
        </div>
      </header>

      {/* Unik brödtext om orten + faktaruta */}
      <Sektion bakgrund="ljus" labelledBy="om-orten-rubrik">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <SektionsRubrik
              id="om-orten-rubrik"
              rubrik={`Så ser en flytt i ${ort.namn} ut`}
            />
            <div className="mt-8 max-w-[68ch] space-y-5 text-[1.0625rem] leading-relaxed text-sand-700">
              {ort.omOrten.map((stycke, i) => (
                <p key={i}>{stycke}</p>
              ))}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-sand-100/70 p-6">
              <h2 className="font-sans text-lg font-bold text-sand-950">
                Bebyggelse i {ort.namn}
              </h2>
              <p className="mt-2.5 leading-relaxed text-sand-700">
                {ort.bebyggelse}
              </p>
            </div>

            <div className="rounded-3xl bg-sand-100/70 p-6">
              <h2 className="font-sans text-lg font-bold text-sand-950">
                Vanliga flyttsträckor
              </h2>
              <ul className="mt-3.5 space-y-2.5">
                {ort.vanligaStrackor.map((s) => (
                  <li key={s} className="flex gap-3">
                    <Ikon namn="pil" className="mt-1 size-4 shrink-0 text-korall-600" />
                    <span className="leading-relaxed text-sand-700">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Bild
              src="/bilder/ort-kartonger-i-rum-under-flytt.webp"
              alt="Flyttkartonger staplade i ett rum under pågående flytt"
              format="liggande"
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
          </aside>
        </div>
      </Sektion>

      {/* ENDAST STORSTAD: stadsdelsguide */}
      {ort.stadsdelar && ort.stadsdelar.length > 0 ? (
        <Sektion labelledBy="stadsdelar-rubrik">
          <SektionsRubrik
            id="stadsdelar-rubrik"
            rubrik={`Flytta i olika delar av ${ort.namn}`}
            ingress="Förutsättningarna skiljer sig mellan stadsdelarna. Här är vad som är värt att veta om de vanligaste områdena."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ort.stadsdelar.map((d) => (
              <li
                key={d.namn}
                className="rounded-3xl bg-white p-6 ring-1 ring-sand-200"
              >
                <h3 className="flex items-start gap-2.5 font-sans text-lg font-bold text-sand-950">
                  <Ikon
                    namn="plats"
                    className="mt-0.5 size-5 shrink-0 text-korall-600"
                  />
                  {d.namn}
                </h3>
                <p className="mt-2.5 leading-relaxed text-sand-600">{d.text}</p>
              </li>
            ))}
          </ul>
        </Sektion>
      ) : null}

      {/* Praktiska förutsättningar */}
      <Sektion
        bakgrund={ort.stadsdelar ? "ljus" : "ingen"}
        labelledBy="praktiskt-rubrik"
      >
        <SektionsRubrik
          id="praktiskt-rubrik"
          rubrik={`Praktiskt att tänka på i ${ort.namn}`}
          ingress="Sådant som ofta påverkar tidsåtgången – och därmed offerten."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ort.praktiskt.map((p) => (
            <li
              key={p.rubrik}
              className={`rounded-3xl p-6 ring-1 ring-sand-200 ${
                ort.stadsdelar ? "bg-sand-50" : "bg-white"
              }`}
            >
              <h3 className="font-sans text-lg font-bold text-sand-950">
                {p.rubrik}
              </h3>
              <p className="mt-2.5 leading-relaxed text-sand-600">{p.text}</p>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* ENDAST STORSTAD: fördjupning */}
      {ort.fordjupning && ort.fordjupning.length > 0 ? (
        <Sektion bakgrund="varm" labelledBy="fordjupning-rubrik">
          <SektionsRubrik
            id="fordjupning-rubrik"
            rubrik={`Mer om att flytta i ${ort.namn}`}
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {ort.fordjupning.map((f) => (
              <section key={f.rubrik}>
                <h3 className="font-sans text-xl font-bold text-sand-950">
                  {f.rubrik}
                </h3>
                <div className="mt-3 space-y-3.5 leading-relaxed text-sand-700">
                  {f.stycken.map((stycke, i) => (
                    <p key={i}>{stycke}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Sektion>
      ) : null}

      {/* Tjänster i orten */}
      <Sektion
        bakgrund={ort.fordjupning ? "ljus" : "varm"}
        labelledBy="tjanster-rubrik"
      >
        <SektionsRubrik
          id="tjanster-rubrik"
          rubrik={`Det här kan du boka i ${ort.namn}`}
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {aktivaTjanster.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="group flex h-full gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-200 transition-all hover:ring-korall-300"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-korall-50 text-korall-700">
                  <Ikon namn={t.ikon} className="size-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-sans font-bold text-sand-950">
                    {t.kortNamn} {ort.iOrt}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] leading-relaxed text-sand-600">
                    {t.sammanfattning}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold text-korall-700">
                    Läs mer
                    <Ikon
                      namn="pil"
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Sektion>

      {/* Processen */}
      <Sektion
        bakgrund={ort.fordjupning ? "ingen" : "ljus"}
        labelledBy="process-rubrik"
      >
        <SektionsRubrik
          id="process-rubrik"
          rubrik={`Från förfrågan till utförd flytt i ${ort.namn}`}
          ingress="Samma process oavsett ort. Uppdraget utförs av en av våra samarbetspartners."
        />
        <div className="mt-12">
          <Processteg kompakt />
        </div>
      </Sektion>

      {/* Frågor */}
      <Sektion
        bakgrund={ort.fordjupning ? "ljus" : "ingen"}
        labelledBy="fragor-rubrik"
      >
        <SektionsRubrik
          id="fragor-rubrik"
          rubrik={`Frågor om flytt i ${ort.namn}`}
        />
        <div className="mt-10 max-w-3xl">
          <Fragor fragor={fragor} />
        </div>
      </Sektion>

      {/* Närliggande orter + full ortslista */}
      <Sektion bakgrund={ort.fordjupning ? "ingen" : "ljus"} labelledBy="narliggande-rubrik">
        <SektionsRubrik
          id="narliggande-rubrik"
          rubrik="Flyttar du till eller från en annan ort?"
          ingress="Vi arbetar även i dessa orter. Flyttar du mellan två av dem anger du bara båda adresserna i förfrågan."
        />

        {narliggande.length > 0 ? (
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {narliggande.map((o) => (
              <li key={o.slug}>
                <Link
                  href={ortPath(o)}
                  className="group flex items-center justify-between gap-4 rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200 transition-all hover:bg-white hover:ring-korall-300"
                >
                  <span>
                    <span className="block font-sans font-bold text-sand-950">
                      {o.namn}
                    </span>
                    <span className="mt-0.5 block text-sm text-sand-500">
                      {o.lan}
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
        ) : null}

        <div className="mt-10 border-t border-sand-200 pt-8">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
            Större orter vi arbetar i
          </h3>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {storstader
              .filter((o) => o.slug !== ort.slug)
              .map((o) => (
                <li key={o.slug}>
                  <Link
                    href={ortPath(o)}
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
        rubrik={`Begär offert för din flytt i ${ort.namn}`}
        text="Beskriv bostaden och ditt datum i formuläret. Du får en offert med tydlig omfattning och binder dig inte till något."
        href={`/offert?ort=${encodeURIComponent(ort.namn)}`}
      />
    </>
  );
}
