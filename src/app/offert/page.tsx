import type { Metadata } from "next";
import { Brodsmulor } from "@/components/Brodsmulor";
import { Ikon } from "@/components/Ikon";
import { JsonLd } from "@/components/JsonLd";
import { OffertFormular } from "@/components/offert/OffertFormular";
import { orter } from "@/lib/orter";
import { brodsmulaSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import type { TjanstVal } from "@/lib/offert/schema";

export const metadata: Metadata = buildMetadata({
  title: "Begär offert på flytt och flyttstädning",
  description:
    "Beskriv din flytt i fem steg och få en offert med tydlig omfattning. Kostnadsfritt och du binder dig inte till något.",
  path: "/offert",
});

const GILTIGA_TJANSTER: TjanstVal[] = ["flytt", "stad", "bada", "foretag"];

/** Trygghetspunkter vid formuläret – inga löften vi inte kan hålla. */
const punkter = [
  {
    ikon: "klocka",
    rubrik: "Tar några minuter",
    text: "Fem korta steg. Du ser en sammanfattning innan du skickar.",
  },
  {
    ikon: "check",
    rubrik: "Kostnadsfritt",
    text: "Att begära offert kostar ingenting och du binder dig inte.",
  },
  {
    ikon: "epost",
    rubrik: "Svar via e-post",
    text: "Vi skickar offerten till adressen du anger.",
  },
] as const;

export default async function OffertSida(props: PageProps<"/offert">) {
  // searchParams används för att förifylla formuläret från tjänste- och
  // ortssidornas CTA-länkar. Värdena valideras innan de används.
  const sokParametrar = await props.searchParams;

  const tjanstParam = Array.isArray(sokParametrar.tjanst)
    ? sokParametrar.tjanst[0]
    : sokParametrar.tjanst;
  const ortParam = Array.isArray(sokParametrar.ort)
    ? sokParametrar.ort[0]
    : sokParametrar.ort;

  const forvaldTjanst = GILTIGA_TJANSTER.find((t) => t === tjanstParam);
  // Bara orter vi faktiskt har sidor för godtas som förvalt värde.
  const forvaldOrt = orter.find((o) => o.namn === ortParam)?.namn;

  const brodsmulor = [
    { namn: "Start", path: "/" },
    { namn: "Begär offert", path: "/offert" },
  ];

  return (
    <>
      <JsonLd data={brodsmulaSchema(brodsmulor)} />
      <Brodsmulor items={brodsmulor} />

      <div className="behallare pt-8 pb-20 sm:pt-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          {/* Formulär */}
          <div className="min-w-0">
            <header className="max-w-2xl">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-[2.75rem]">
                Begär offert
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-sand-700">
                Beskriv vad du behöver hjälp med. Vi går igenom uppgifterna och
                återkommer med en offert där omfattningen framgår tydligt.
              </p>
            </header>

            <div className="mt-10 rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-8 lg:p-10">
              <OffertFormular
                forvaldTjanst={forvaldTjanst}
                forvaldOrt={forvaldOrt}
                kalla="/offert"
              />
            </div>
          </div>

          {/* Sidopanel */}
          <aside className="lg:pt-24">
            <div className="space-y-5 lg:sticky lg:top-24">
              <ul className="space-y-5 rounded-3xl bg-sand-100/70 p-6">
                {punkter.map((p) => (
                  <li key={p.rubrik} className="flex gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-korall-700 ring-1 ring-sand-200">
                      <Ikon namn={p.ikon} className="size-5" />
                    </span>
                    <span>
                      <span className="block font-sans font-semibold text-sand-950">
                        {p.rubrik}
                      </span>
                      <span className="mt-0.5 block text-[0.9375rem] leading-relaxed text-sand-600">
                        {p.text}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="rounded-3xl bg-white p-6 ring-1 ring-sand-200">
                <h2 className="font-sans font-bold text-sand-950">
                  Dina uppgifter
                </h2>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-sand-600">
                  Uppgifterna används för att hantera din förfrågan. Inget sparas
                  i din webbläsare medan du fyller i formuläret.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
