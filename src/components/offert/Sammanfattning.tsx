"use client";

import {
  type OffertData,
  arForetag,
  etikett,
  harFlytt,
} from "@/lib/offert/schema";

/**
 * Sammanfattning innan inskick.
 * Visar bara ifyllda fält – tomma frivilliga fält listas inte alls,
 * så kunden slipper läsa en lista med streck.
 */
export function Sammanfattning({
  data,
  gaTillSteg,
}: {
  data: OffertData;
  gaTillSteg: (steg: number) => void;
}) {
  const flytt = harFlytt(data.tjanst);
  const foretag = arForetag(data.tjanst);

  const grupper: { steg: number; rubrik: string; rader: [string, string][] }[] = [
    {
      steg: 1,
      rubrik: "Det här behöver du hjälp med",
      rader: [["Tjänst", etikett(data.tjanst)]],
    },
    {
      steg: 2,
      rubrik: flytt ? "Adresser" : "Adress",
      rader: [
        [flytt ? "Från" : "Ort", [data.franAdress, data.franOrt].filter(Boolean).join(", ")],
        ...(flytt
          ? ([
              ["Till", [data.tillAdress, data.tillOrt].filter(Boolean).join(", ")],
            ] as [string, string][])
          : []),
      ],
    },
    {
      steg: 3,
      rubrik: "Bostad och datum",
      rader: [
        ["Bostadstyp", etikett(data.bostadstyp)],
        ["Storlek", data.boyta ? `Cirka ${data.boyta} m²` : ""],
        ["Antal rum", data.antalRum],
        [
          "Önskat datum",
          data.datum
            ? `${data.datum}${data.datumFlexibelt ? " (flexibelt)" : ""}`
            : "",
        ],
      ],
    },
    {
      steg: 4,
      rubrik: "Praktiska detaljer",
      rader: [
        ["Våning, från", data.franVaning],
        ["Hiss, från", data.franHiss ? etikett(data.franHiss) : ""],
        ...(flytt
          ? ([
              ["Våning, till", data.tillVaning],
              ["Hiss, till", data.tillHiss ? etikett(data.tillHiss) : ""],
            ] as [string, string][])
          : []),
        ["Packhjälp", data.packhjalp ? "Ja, önskas" : ""],
        ["Särskilda föremål", data.specialforemal],
        ...(foretag
          ? ([["Antal arbetsplatser", data.antalArbetsplatser]] as [string, string][])
          : []),
        ["Övrigt", data.ovrigt],
      ],
    },
    {
      steg: 5,
      rubrik: "Dina kontaktuppgifter",
      rader: [
        ["Namn", data.namn],
        ...(foretag ? ([["Företag", data.foretag]] as [string, string][]) : []),
        ["E-post", data.epost],
        ["Telefon", data.telefon],
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {grupper.map((grupp) => {
        const ifyllda = grupp.rader.filter(([, v]) => v && v.trim() !== "");
        if (ifyllda.length === 0) return null;

        return (
          <div
            key={grupp.rubrik}
            className="rounded-2xl border border-sand-200 bg-white p-5"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-sans text-[0.9375rem] font-semibold text-sand-950">
                {grupp.rubrik}
              </h3>
              <button
                type="button"
                onClick={() => gaTillSteg(grupp.steg)}
                className="shrink-0 cursor-pointer rounded text-sm font-semibold text-korall-700 underline decoration-korall-300 underline-offset-2 transition-colors hover:text-korall-800 hover:decoration-korall-600"
              >
                Ändra
                <span className="sr-only"> {grupp.rubrik.toLowerCase()}</span>
              </button>
            </div>

            <dl className="mt-3 space-y-2">
              {ifyllda.map(([namn, varde]) => (
                <div key={namn} className="flex flex-wrap gap-x-2 text-[0.9375rem]">
                  <dt className="text-sand-500">{namn}:</dt>
                  <dd className="font-medium text-sand-900">{varde}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}
