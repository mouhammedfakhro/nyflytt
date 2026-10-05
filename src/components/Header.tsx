"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Ikon } from "@/components/Ikon";
import { KnappLank } from "@/components/Knapp";
import { Logo } from "@/components/Logo";
import { type Ort, ortPath, stadPath, storstader } from "@/lib/orter";

/**
 * Sajtheader.
 *
 * Bohagsflytt och Flyttstädning har varsin meny som visar orterna, och varje
 * meny pekar på SIN tjänsts ortssidor: flyttmenyn till /flyttfirma-<ort> och
 * städmenyn till /flyttstadning-<ort>. Vilken funktion som används styrs av
 * `ortLank` på menyn.
 *
 * Menyn öppnas vid hover på desktop och vid klick/tangentbord. Hover ensamt
 * räcker inte: den som navigerar med tangentbord eller pekskärm måste kunna
 * nå orterna, därför är rubriken en riktig knapp med aria-expanded.
 */

type MenyId = "bohagsflytt" | "flyttstadning";

const tjansteMenyer: {
  id: MenyId;
  text: string;
  /** Tjänstesidan som rubriken länkar vidare till. */
  sidPath: string;
  beskrivning: string;
  /** Bygger ortslänken för just den här tjänsten. */
  ortLank: (ort: Ort) => string;
}[] = [
  {
    id: "bohagsflytt",
    text: "Bohagsflytt",
    sidPath: "/bohagsflytt",
    beskrivning: "Bärhjälp, transport och lastsäkring för hela bohaget.",
    ortLank: ortPath,
  },
  {
    id: "flyttstadning",
    text: "Flyttstädning",
    sidPath: "/flyttstadning",
    beskrivning: "Städning av hela bostaden inför överlämning.",
    ortLank: stadPath,
  },
];

const ovrigNav = [
  { href: "/flytt-och-stad", text: "Flytt och städ" },
  { href: "/foretagsflytt", text: "Företagsflytt" },
  { href: "/sa-fungerar-det", text: "Så fungerar det" },
  { href: "/om-oss", text: "Om oss" },
  { href: "/kontakt", text: "Kontakt" },
];

export function Header() {
  const [oppen, setOppen] = useState(false);
  const [aktivMeny, setAktivMeny] = useState<MenyId | null>(null);
  const pathname = usePathname();
  const menyKnapp = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  /** Fördröjer stängning så muspekaren hinner nå menyn. */
  const stangTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Escape stänger öppna menyer.
  useEffect(() => {
    if (!oppen && !aktivMeny) return;

    function vidTangent(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (aktivMeny) setAktivMeny(null);
      if (oppen) {
        setOppen(false);
        menyKnapp.current?.focus();
      }
    }

    document.addEventListener("keydown", vidTangent);
    return () => document.removeEventListener("keydown", vidTangent);
  }, [oppen, aktivMeny]);

  // Klick utanför navigationen stänger tjänstemenyn.
  useEffect(() => {
    if (!aktivMeny) return;

    function vidKlick(e: MouseEvent) {
      if (!navRef.current?.contains(e.target as Node)) setAktivMeny(null);
    }

    document.addEventListener("mousedown", vidKlick);
    return () => document.removeEventListener("mousedown", vidKlick);
  }, [aktivMeny]);

  // Lås scroll bakom den öppna mobilmenyn.
  useEffect(() => {
    if (!oppen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [oppen]);

  // Städa bort timern om komponenten plockas bort medan den är satt.
  useEffect(() => () => clearTimeout(stangTimer.current), []);

  function arAktiv(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const ortsSidaAktiv =
    pathname.startsWith("/flyttfirma/") || pathname.startsWith("/flyttfirma-");

  function oppnaMeny(id: MenyId) {
    clearTimeout(stangTimer.current);
    setAktivMeny(id);
  }

  function stangMedFordrojning() {
    clearTimeout(stangTimer.current);
    stangTimer.current = setTimeout(() => setAktivMeny(null), 120);
  }

  function stangAllt() {
    clearTimeout(stangTimer.current);
    setAktivMeny(null);
    setOppen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/80 bg-sand-50/85 backdrop-blur-md">
      <div className="behallare flex h-16 items-center justify-between gap-4 sm:h-18">
        <Link href="/" className="rounded-md" aria-label="Nyflytt – till startsidan">
          <Logo />
        </Link>

        {/* Desktopnavigation */}
        <nav ref={navRef} aria-label="Huvudmeny" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {tjansteMenyer.map((meny) => {
              const oppnad = aktivMeny === meny.id;
              const markerad = arAktiv(meny.sidPath) || (oppnad && ortsSidaAktiv);

              return (
                <li
                  key={meny.id}
                  className="relative"
                  onMouseEnter={() => oppnaMeny(meny.id)}
                  onMouseLeave={stangMedFordrojning}
                >
                  <button
                    type="button"
                    onClick={() => setAktivMeny(oppnad ? null : meny.id)}
                    aria-expanded={oppnad}
                    aria-controls={`meny-${meny.id}`}
                    className={`relative inline-flex min-h-10 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[0.9375rem] font-medium transition-colors ${
                      markerad ? "text-korall-700" : "text-sand-700 hover:text-sand-950"
                    }`}
                  >
                    {meny.text}
                    <Ikon
                      namn="chevron"
                      className={`size-4 transition-transform duration-200 ${
                        oppnad ? "-rotate-180" : ""
                      }`}
                    />
                    {arAktiv(meny.sidPath) ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-korall-600"
                      />
                    ) : null}
                  </button>

                  {/* Ortsmeny */}
                  <div
                    id={`meny-${meny.id}`}
                    hidden={!oppnad}
                    className="absolute left-1/2 top-full w-136 -translate-x-1/2 pt-2"
                  >
                    <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-lyft ring-1 ring-sand-200">
                      {/* Länk till själva tjänstesidan */}
                      <Link
                        href={meny.sidPath}
                        onClick={stangAllt}
                        className="flex items-start justify-between gap-4 rounded-xl bg-sand-50 p-3.5 transition-colors hover:bg-korall-50"
                      >
                        <span>
                          <span className="block font-sans text-[0.9375rem] font-semibold text-sand-950">
                            Om {meny.text.toLowerCase()}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-sand-600">
                            {meny.beskrivning}
                          </span>
                        </span>
                        <Ikon
                          namn="pil"
                          className="mt-1 size-4 shrink-0 text-korall-600"
                        />
                      </Link>

                      <p className="px-1 pb-1 pt-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-sand-500">
                        Välj ort
                      </p>
                      <ul className="grid grid-cols-3 gap-0.5">
                        {storstader.map((ort) => {
                          // Flyttmenyn länkar till /flyttfirma-<ort>,
                          // städmenyn till /flyttstadning-<ort>.
                          const href = meny.ortLank(ort);
                          const harAktiv = pathname === href;

                          return (
                            <li key={ort.slug}>
                              <Link
                                href={href}
                                onClick={stangAllt}
                                aria-current={harAktiv ? "page" : undefined}
                                className={`block rounded-lg px-3 py-2 text-[0.9375rem] transition-colors ${
                                  harAktiv
                                    ? "bg-korall-50 font-semibold text-korall-700"
                                    : "text-sand-700 hover:bg-sand-50 hover:text-korall-700"
                                }`}
                              >
                                {ort.namn}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}

            {ovrigNav.map((lank) => (
              <li key={lank.href}>
                <Link
                  href={lank.href}
                  aria-current={arAktiv(lank.href) ? "page" : undefined}
                  className={`relative inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-3 text-[0.9375rem] font-medium transition-colors ${
                    arAktiv(lank.href)
                      ? "text-korall-700"
                      : "text-sand-700 hover:text-sand-950"
                  }`}
                >
                  {lank.text}
                  {arAktiv(lank.href) ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-korall-600"
                    />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <KnappLank href="/offert" className="hidden sm:inline-flex" medPil>
            Gratis offert
          </KnappLank>

          <button
            ref={menyKnapp}
            type="button"
            onClick={() => setOppen((v) => !v)}
            aria-expanded={oppen}
            aria-controls="mobilmeny"
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-sand-800 transition-colors hover:bg-sand-100 lg:hidden"
          >
            <Ikon
              namn={oppen ? "stang" : "meny"}
              titel={oppen ? "Stäng menyn" : "Öppna menyn"}
            />
          </button>
        </div>
      </div>

      {/* Mobilmeny */}
      <div
        id="mobilmeny"
        hidden={!oppen}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-sand-200 bg-sand-50 lg:hidden"
      >
        <nav aria-label="Mobilmeny" className="behallare py-4">
          <p className="px-4 pb-1 pt-2 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-sand-500">
            Tjänster
          </p>
          <ul className="flex flex-col gap-1">
            {[...tjansteMenyer.map((m) => ({ href: m.sidPath, text: m.text })), ...ovrigNav.slice(0, 2)].map(
              (lank) => (
                <li key={lank.href}>
                  <Link
                    href={lank.href}
                    onClick={stangAllt}
                    aria-current={arAktiv(lank.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-medium transition-colors ${
                      arAktiv(lank.href)
                        ? "bg-korall-50 text-korall-700"
                        : "text-sand-800 hover:bg-sand-100"
                    }`}
                  >
                    {lank.text}
                    <Ikon namn="pil" className="size-4 opacity-40" />
                  </Link>
                </li>
              ),
            )}
          </ul>

          {/*
            Orterna listas direkt på mobil – ingen extra nivå att öppna.
            Båda tjänsterna får en egen lista så att städsidorna är nåbara
            även här, inte bara via desktopmenyn.
          */}
          {[
            { rubrik: "Flyttfirma i din ort", lank: ortPath },
            { rubrik: "Flyttstädning i din ort", lank: stadPath },
          ].map((grupp) => (
            <div key={grupp.rubrik}>
              <p className="px-4 pb-1 pt-5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-sand-500">
                {grupp.rubrik}
              </p>
              <ul className="grid grid-cols-2 gap-1">
                {storstader.map((ort) => {
                  const href = grupp.lank(ort);
                  const harAktiv = pathname === href;

                  return (
                    <li key={ort.slug}>
                      <Link
                        href={href}
                        onClick={stangAllt}
                        aria-current={harAktiv ? "page" : undefined}
                        className={`flex min-h-11 items-center rounded-xl px-4 text-[0.9375rem] font-medium transition-colors ${
                          harAktiv
                            ? "bg-korall-50 text-korall-700"
                            : "text-sand-800 hover:bg-sand-100"
                        }`}
                      >
                        {ort.namn}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <p className="px-4 pb-1 pt-5 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-sand-500">
            Om Nyflytt
          </p>
          <ul className="flex flex-col gap-1">
            {ovrigNav.slice(2).map((lank) => (
              <li key={lank.href}>
                <Link
                  href={lank.href}
                  onClick={stangAllt}
                  aria-current={arAktiv(lank.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-between rounded-xl px-4 text-base font-medium transition-colors ${
                    arAktiv(lank.href)
                      ? "bg-korall-50 text-korall-700"
                      : "text-sand-800 hover:bg-sand-100"
                  }`}
                >
                  {lank.text}
                  <Ikon namn="pil" className="size-4 opacity-40" />
                </Link>
              </li>
            ))}
          </ul>

          <KnappLank
            href="/offert"
            onClick={stangAllt}
            storlek="lg"
            className="mt-5 w-full"
            medPil
          >
            Gratis offert
          </KnappLank>
        </nav>
      </div>
    </header>
  );
}
