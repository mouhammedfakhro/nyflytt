import Link from "next/link";
import { KnappLank } from "@/components/Knapp";
import { Bild } from "@/components/Bild";
import { ortPath, storstader } from "@/lib/orter";

/**
 * Startsidans hero: budskap till vänster, livsstilsbild till höger.
 *
 * Heroebilden laddas med `prioritet` eftersom den ligger ovanför vikningen
 * och annars skulle försena LCP.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Varm toning uppifrån */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-korall-50 via-sand-50 to-sand-50"
      />

      <div className="behallare relative pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Textkolumn */}
          <div className="glid-in">
            <h1 className="text-[2.5rem] font-bold leading-[1.08] tracking-[-0.03em] text-sand-950 sm:text-5xl lg:text-[3.5rem]">
              Fokusera på ditt nya hem –{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">vi tar flytten</span>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-2.5 w-full text-korall-300"
                >
                  <path
                    d="M2 8c60-5 130-6 296-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand-700 sm:text-xl">
              Beskriv vad du behöver hjälp med, få en offert med tydlig
              omfattning och låt en av våra samarbetspartners utföra jobbet. Du
              slipper ringa runt.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <KnappLank href="/offert" storlek="lg" medPil>
                Få kostnadsfri offert
              </KnappLank>
              <KnappLank href="/sa-fungerar-det" storlek="lg" variant="sekundar">
                Så fungerar det
              </KnappLank>
            </div>
          </div>

          {/* Bildkolumn */}
          <div className="relative">
            <Bild
              src="/bilder/hero-par-packar-upp-i-nytt-kok.webp"
              alt="Ett par packar upp kökssaker ur flyttkartonger i sitt nya hem"
              format="liggande"
              prioritet
              className="shadow-lyft"
            />

          </div>
        </div>

        {/* Ortsrad – genväg för besökare och internlänkning */}
        <div className="mt-16 border-t border-sand-200 pt-7 lg:mt-20">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
            Orter vi arbetar i
          </h2>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {storstader.map((ort) => (
              <li key={ort.slug}>
                <Link
                  href={ortPath(ort)}
                  className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-[0.9375rem] font-medium text-sand-700 ring-1 ring-sand-200 transition-all hover:ring-korall-400 hover:text-korall-700"
                >
                  {ort.namn}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
