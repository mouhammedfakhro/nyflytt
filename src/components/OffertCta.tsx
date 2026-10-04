import { Ikon } from "@/components/Ikon";
import { KnappLank } from "@/components/Knapp";

/**
 * Avslutande offertsektion. Återanvänds på start-, tjänste- och ortssidor.
 * `href` kan förifylla tjänstevalet i formuläret, t.ex. "/offert?tjanst=stad".
 */
export function OffertCta({
  rubrik = "Redo att begära offert?",
  text = "Beskriv ditt behov i formuläret. Du får en offert med tydlig omfattning och binder dig inte till något.",
  href = "/offert",
  punkter = [
    "Tar några minuter",
    "Kostar ingenting",
    "Du binder dig inte",
  ],
}: {
  rubrik?: string;
  text?: string;
  href?: string;
  punkter?: string[];
}) {
  return (
    <section className="py-16 sm:py-20 lg:py-24" aria-labelledby="offert-cta-rubrik">
      <div className="behallare">
        <div className="relative overflow-hidden rounded-3xl bg-sand-950 px-6 py-14 sm:px-12 sm:py-16 lg:px-16">
          {/* Dekorativ bakgrundsgrafik – egen form, ingen stockbild */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 size-[22rem] text-korall-600/25 sm:-right-8 sm:size-[26rem]"
            viewBox="0 0 200 200"
            fill="none"
          >
            <circle cx="100" cy="100" r="99" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="49" stroke="currentColor" strokeWidth="1" />
            <rect
              x="78"
              y="78"
              width="44"
              height="44"
              rx="10"
              className="fill-korall-600/35"
            />
          </svg>

          <div className="relative max-w-2xl">
            <h2
              id="offert-cta-rubrik"
              className="text-3xl font-bold text-white sm:text-4xl lg:text-[2.625rem] lg:leading-[1.12]"
            >
              {rubrik}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sand-300">{text}</p>

            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {punkter.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[0.9375rem] text-sand-200">
                  <Ikon namn="check" className="size-[1.125rem] shrink-0 text-korall-400" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <KnappLank href={href} storlek="lg" medPil>
                Begär offert
              </KnappLank>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
