"use client";

import { Ikon } from "@/components/Ikon";

const STEGNAMN = ["Behov", "Adresser", "Bostad", "Detaljer", "Kontakt"];

/**
 * Visar var i flödet användaren är.
 * Progressen annonseras för skärmläsare via aria-live-texten i OffertFormular.
 */
export function Stegindikator({ steg }: { steg: number }) {
  return (
    <div>
      {/* Mobil: kompakt räknare + progressbar */}
      <div className="sm:hidden">
        <div className="flex items-baseline justify-between">
          <p className="font-sans text-sm font-semibold text-sand-900">
            {STEGNAMN[steg - 1]}
          </p>
          <p className="text-sm text-sand-500">
            Steg {steg} av {STEGNAMN.length}
          </p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sand-200">
          <div
            className="h-full rounded-full bg-korall-600 transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ width: `${(steg / STEGNAMN.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Desktop: full steglista */}
      <ol className="hidden items-center gap-1 sm:flex">
        {STEGNAMN.map((namn, i) => {
          const nummer = i + 1;
          const klar = nummer < steg;
          const aktiv = nummer === steg;

          return (
            <li key={namn} className="flex flex-1 items-center gap-2 last:flex-none">
              <span className="flex items-center gap-2.5">
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                    klar
                      ? "bg-korall-600 text-white"
                      : aktiv
                        ? "bg-korall-600 text-white ring-4 ring-korall-600/20"
                        : "bg-sand-200 text-sand-600"
                  }`}
                >
                  {klar ? <Ikon namn="check" className="size-4" /> : nummer}
                </span>
                <span
                  className={`font-sans text-sm font-semibold ${
                    aktiv ? "text-sand-950" : "text-sand-500"
                  }`}
                >
                  {namn}
                </span>
              </span>

              {/* Linje mellan stegen */}
              {nummer < STEGNAMN.length ? (
                <span
                  aria-hidden="true"
                  className={`ml-1 h-px flex-1 ${klar ? "bg-korall-400" : "bg-sand-200"}`}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
