import type { Metadata } from "next";
import Link from "next/link";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { OffertCta } from "@/components/OffertCta";
import { orterPerStorstad, ortPath } from "@/lib/orter";
import { brodsmulaSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

/**
 * Översikt över alla orter, grupperade under sin närmaste storstad.
 *
 * Tidigare var /flyttfirma bara en 307-redirect till Helsingborg, vilket
 * gjorde "Se alla orter" på startsidan missvisande – man hamnade på en
 * enskild ort i stället för en lista. Nu är det en riktig översiktssida.
 *
 * Grupperingen kommer från `narmasteStorstad` på varje mindre ort och är
 * en ren geografisk indelning efter närhet, inte kommuntillhörighet.
 */
export const metadata: Metadata = buildMetadata({
  title: "Orter vi arbetar i",
  description:
    "Alla orter där du kan boka flytthjälp och flyttstädning via Nyflytt, grupperade efter närmaste större stad. Välj din ort för att läsa vad som är bra att veta inför flytten där.",
  path: "/flyttfirma",
});

const brodsmulor = [
  { namn: "Start", path: "/" },
  { namn: "Orter", path: "/flyttfirma" },
];

export default function OrterSida() {
  const grupper = orterPerStorstad();
  const antalOrter = grupper.reduce((n, g) => n + 1 + g.mindre.length, 0);

  return (
    <>
      <JsonLd data={brodsmulaSchema(brodsmulor)} />
      <Brodsmulor items={brodsmulor} />

      <div className="behallare pt-8 pb-20 sm:pt-12">
        <div className="max-w-[72ch]">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
            Orter vi arbetar i
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-sand-600">
            Vi förmedlar flytthjälp och flyttstädning i {antalOrter} orter.
            Välj din ort för att läsa vad som är bra att veta inför en flytt
            just där. Orterna är grupperade efter närmaste större stad.
          </p>
        </div>

        <div className="mt-14 space-y-12">
          {grupper.map(({ storstad, mindre }) => (
            <section key={storstad.slug} aria-labelledby={`grupp-${storstad.slug}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-sand-200 pb-4">
                <h2
                  id={`grupp-${storstad.slug}`}
                  className="font-sans text-2xl font-bold tracking-[-0.02em] text-sand-950"
                >
                  <Link
                    href={ortPath(storstad)}
                    className="transition-colors hover:text-korall-700"
                  >
                    {storstad.namn}
                  </Link>
                </h2>
                <span className="text-sm text-sand-500">{storstad.lan}</span>
              </div>

              {/* Storstaden först, sedan de mindre orterna i närheten. */}
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <li>
                  <Link
                    href={ortPath(storstad)}
                    className="group flex items-center justify-between gap-3 rounded-2xl bg-sand-50 p-4 ring-1 ring-sand-200 transition-all hover:bg-white hover:ring-korall-300"
                  >
                    <span className="font-sans font-bold text-sand-950">
                      Flytthjälp i {storstad.namn}
                    </span>
                    <Ikon
                      namn="pil"
                      className="size-5 shrink-0 text-korall-600 transition-transform group-hover:translate-x-0.5"
                    />
                  </Link>
                </li>

                {mindre.map((ort) => (
                  <li key={ort.slug}>
                    <Link
                      href={ortPath(ort)}
                      className="group flex items-center justify-between gap-3 rounded-2xl p-4 ring-1 ring-sand-200 transition-all hover:bg-sand-50 hover:ring-korall-300"
                    >
                      <span className="font-medium text-sand-700 transition-colors group-hover:text-korall-700">
                        {ort.namn}
                      </span>
                      <Ikon
                        namn="pil"
                        className="size-4 shrink-0 text-sand-400 transition-all group-hover:translate-x-0.5 group-hover:text-korall-600"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <OffertCta
        rubrik="Hittar du inte din ort?"
        text="Vi arbetar i fler orter än de listade. Beskriv din flytt i formuläret – vi hör av oss om vi kan hjälpa till."
        href="/offert"
      />
    </>
  );
}
