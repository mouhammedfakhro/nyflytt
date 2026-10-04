import Link from "next/link";
import { Ikon, type IkonNamn } from "@/components/Ikon";
import { KnappLank } from "@/components/Knapp";
import { Bild } from "@/components/Bild";

export type TjanstBlockData = {
  slug: string;
  rubrik: string;
  ingress: string;
  /** Fyra punkter med ikon som förklarar vad tjänsten innebär. */
  punkter: { ikon: IkonNamn; rubrik: string; text: string }[];
  bild: string;
  bildAlt: string;
  offertTyp: string;
};

/**
 * Tjänstesektion på startsidan: bild på ena sidan, innehåll på andra.
 * `vand` kastar om sidorna så sektionerna alternerar nedåt i sidan.
 */
export function TjanstBlock({
  data,
  vand = false,
  bakgrund = "ingen",
}: {
  data: TjanstBlockData;
  vand?: boolean;
  bakgrund?: "ingen" | "ljus" | "varm";
}) {
  const bakgrunder = {
    ingen: "",
    ljus: "bg-white",
    varm: "bg-korall-50/60",
  } as const;

  const rubrikId = `tjanst-${data.slug}`;

  return (
    <section
      aria-labelledby={rubrikId}
      className={`py-16 sm:py-20 lg:py-24 ${bakgrunder[bakgrund]}`}
    >
      <div className="behallare">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Bild – flyttas till höger på vända sektioner */}
          <div className={vand ? "lg:order-2" : ""}>
            <Bild
              src={data.bild}
              alt={data.bildAlt}
              format="liggande"
            />
          </div>

          {/* Innehåll */}
          <div className={vand ? "lg:order-1" : ""}>
            <h2
              id={rubrikId}
              className="text-3xl font-bold text-sand-950 sm:text-4xl"
            >
              {data.rubrik}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sand-600">
              {data.ingress}
            </p>

            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {data.punkter.map((p) => (
                <li key={p.rubrik}>
                  <span className="flex size-10 items-center justify-center rounded-xl bg-korall-100 text-korall-700">
                    <Ikon namn={p.ikon} className="size-5" />
                  </span>
                  <h3 className="mt-3 font-sans font-bold text-sand-950">
                    {p.rubrik}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-sand-600">
                    {p.text}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <KnappLank href={`/offert?tjanst=${data.offertTyp}`} medPil>
                Få kostnadsfri offert
              </KnappLank>
              <Link
                href={`/${data.slug}`}
                className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 font-sans font-semibold text-korall-700 transition-colors hover:text-korall-800 hover:underline"
              >
                Läs mer om {data.rubrik.toLowerCase()}
                <Ikon namn="pil" className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
