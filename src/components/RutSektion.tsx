import Link from "next/link";
import { Ikon } from "@/components/Ikon";
import { KnappLank } from "@/components/Knapp";

/**
 * RUT-avdrag.
 *
 * OBS OM FAKTAUPPGIFTER: texten beskriver bara principen för RUT och undviker
 * medvetet att ange takbelopp och procentsatser, eftersom de ändras mellan
 * beskattningsår. Kontrollera alltid aktuella nivåer hos Skatteverket innan
 * siffror läggs in här.
 *
 * KRÄVER UPPGIFT: om Nyflytt (eller partnern) gör avdraget direkt på fakturan
 * behöver det bekräftas – se platshållarrutan nedan.
 */
export function RutSektion() {
  return (
    <section aria-labelledby="rut-rubrik" className="py-16 sm:py-20 lg:py-24">
      <div className="behallare">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2
              id="rut-rubrik"
              className="text-3xl font-bold text-sand-950 sm:text-4xl"
            >
              Flytt och städ kan ge RUT-avdrag
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-sand-600">
              RUT är en skattereduktion för hushållsnära tjänster. Både
              flytthjälp och flyttstädning är sådana tjänster, vilket gör att en
              del av arbetskostnaden kan dras av.
            </p>

            <div className="mt-8 rounded-2xl bg-sand-100/70 p-5">
              <p className="text-[0.9375rem] leading-relaxed text-sand-700">
                Reglerna och takbeloppen för RUT ändras mellan beskattningsår.
                Kontrollera vad som gäller just nu hos{" "}
                <a
                  href="https://www.skatteverket.se/privat/fastigheterochbostad/rotochrutarbete.4.2e56d4ba1202f95012080002966.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-korall-700 underline underline-offset-2 hover:text-korall-800"
                >
                  Skatteverket
                </a>
                .
              </p>
            </div>

            <div className="mt-6">
              <KnappLank href="/offert" medPil>
                Få kostnadsfri offert
              </KnappLank>
            </div>
          </div>

          {/* Faktapunkter */}
          <div className="space-y-4">
            {[
              {
                ikon: "check" as const,
                rubrik: "Det är arbetskostnaden som räknas",
                text: "Avdraget gäller arbetet, inte material, transportkostnad eller utrustning. Därför särredovisas arbetskostnaden i offerten.",
              },
              {
                ikon: "lada" as const,
                rubrik: "Både flytt och flyttstädning omfattas",
                text: "Flytthjälp och flyttstädning räknas som hushållsnära tjänster. Bokar du båda kan avdraget gälla arbetskostnaden för båda.",
              },
              {
                ikon: "plats" as const,
                rubrik: "Du behöver ha rätt till avdraget",
                text: "Du ska ha fyllt 18 år, vara obegränsat skattskyldig i Sverige och ha tillräckligt med skatt att dra av mot. Utrymmet delas med eventuella andra RUT- och ROT-tjänster under året.",
              },
              {
                ikon: "kontor" as const,
                rubrik: "Gäller inte företag",
                text: "RUT är till för privatpersoner. Vid företagsflytt är kostnaden i stället normalt avdragsgill i verksamheten – stäm av med er bokföring.",
              },
            ].map((p) => (
              <div
                key={p.rubrik}
                className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-sand-200"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-korall-50 text-korall-700">
                  <Ikon namn={p.ikon} className="size-5" />
                </span>
                <div>
                  <h3 className="font-sans font-bold text-sand-950">{p.rubrik}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-sand-600">
                    {p.text}
                  </p>
                </div>
              </div>
            ))}

            {/* PLATSHÅLLARE – hanteringen av avdraget måste bekräftas */}
            <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-100/60 p-5">
              <p className="font-sans font-semibold text-sand-900">
                Platshållare: så hanteras avdraget
              </p>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-sand-700">
                Här ska det stå om avdraget görs direkt på fakturan eller om du
                ansöker själv i efterhand, och vem som ansvarar för ansökan till
                Skatteverket. Fylls i när rutinen är bekräftad – se{" "}
                <Link
                  href="/kontakt"
                  className="font-medium text-korall-700 underline underline-offset-2"
                >
                  kontaktsidan
                </Link>{" "}
                om du har frågor under tiden.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
