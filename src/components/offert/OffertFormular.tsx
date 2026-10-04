"use client";

import Link from "next/link";
import { useRef, useState, useTransition } from "react";
import { Ikon } from "@/components/Ikon";
import { Knapp } from "@/components/Knapp";
import {
  KortValGrupp,
  KryssFalt,
  RadioRad,
  TextFalt,
  TextomradeFalt,
  ValFalt,
} from "@/components/offert/Falt";
import { Sammanfattning } from "@/components/offert/Sammanfattning";
import { Stegindikator } from "@/components/offert/Stegindikator";
import { skickaOffertforfragan } from "@/lib/offert/actions";
import {
  ANTAL_STEG,
  type Fel,
  type OffertData,
  type TjanstVal,
  arForetag,
  bostadsTypAlternativ,
  harFel,
  harFlytt,
  hissAlternativ,
  tjanstAlternativ,
  tomOffert,
  valideraSteg,
} from "@/lib/offert/schema";

/**
 * Offertformulär i fem steg med sammanfattning innan inskick.
 *
 * INTEGRITET: ingenting sparas i localStorage eller sessionStorage. Uppgifterna
 * finns bara i komponentens state under ifyllningen och skickas till servern
 * vid inskick. Stänger användaren fliken är de borta.
 *
 * Validering sker per steg när man försöker gå vidare, och om på servern.
 */
export function OffertFormular({
  forvaldTjanst,
  forvaldOrt,
  kalla = "/offert",
}: {
  forvaldTjanst?: TjanstVal;
  forvaldOrt?: string;
  kalla?: string;
}) {
  const [steg, setSteg] = useState(1);
  const [data, setData] = useState<OffertData>({
    ...tomOffert,
    tjanst: forvaldTjanst ?? "",
    franOrt: forvaldOrt ?? "",
  });
  const [fel, setFel] = useState<Fel>({});
  const [visarSammanfattning, setVisarSammanfattning] = useState(false);
  const [skickarFel, setSkickarFel] = useState<string>();
  const [klarReferens, setKlarReferens] = useState<string>();
  const [skickar, startaSkick] = useTransition();

  const rubrikRef = useRef<HTMLHeadingElement>(null);

  function uppdatera<K extends keyof OffertData>(nyckel: K, varde: OffertData[K]) {
    setData((d) => ({ ...d, [nyckel]: varde }));
    // Rensa felet för fältet så fort användaren rättar det.
    setFel((f) => {
      if (!f[nyckel]) return f;
      const nytt = { ...f };
      delete nytt[nyckel];
      return nytt;
    });
  }

  /** Flyttar fokus till stegrubriken så skärmläsare följer med i flödet. */
  function fokuseraRubrik() {
    // rAF så att DOM hunnit uppdateras innan fokus flyttas.
    requestAnimationFrame(() => rubrikRef.current?.focus());
  }

  function gaFramat() {
    const stegFel = valideraSteg(steg, data);

    if (harFel(stegFel)) {
      setFel(stegFel);
      // Fokusera första felaktiga fältet.
      const forstaFel = Object.keys(stegFel)[0];
      requestAnimationFrame(() => {
        document.getElementById(forstaFel)?.focus();
      });
      return;
    }

    setFel({});

    if (steg === ANTAL_STEG) {
      setVisarSammanfattning(true);
    } else {
      setSteg((s) => s + 1);
    }
    fokuseraRubrik();
  }

  function gaBakat() {
    setFel({});
    if (visarSammanfattning) {
      setVisarSammanfattning(false);
    } else {
      setSteg((s) => Math.max(1, s - 1));
    }
    fokuseraRubrik();
  }

  function gaTillSteg(nyttSteg: number) {
    setVisarSammanfattning(false);
    setSteg(nyttSteg);
    setFel({});
    fokuseraRubrik();
  }

  function skicka() {
    setSkickarFel(undefined);

    startaSkick(async () => {
      const resultat = await skickaOffertforfragan({ ...data }, kalla);

      if (resultat.status === "ok") {
        setKlarReferens(resultat.referens);
        fokuseraRubrik();
        return;
      }

      if (resultat.status === "valideringsfel") {
        // Servern hittade fel klienten missade – hoppa till första felsteget.
        setFel(resultat.fel);
        setVisarSammanfattning(false);
        for (let s = 1; s <= ANTAL_STEG; s++) {
          if (harFel(valideraSteg(s, data))) {
            setSteg(s);
            break;
          }
        }
        fokuseraRubrik();
        return;
      }

      setSkickarFel(resultat.meddelande);
    });
  }

  // ---------------------------------------------------------------------------
  // Kvitto efter inskick
  // ---------------------------------------------------------------------------
  if (klarReferens) {
    return <Kvitto referens={klarReferens} epost={data.epost} rubrikRef={rubrikRef} />;
  }

  const flytt = harFlytt(data.tjanst);
  const foretag = arForetag(data.tjanst);

  return (
    <div>
      {!visarSammanfattning ? <Stegindikator steg={steg} /> : null}

      {/* Annonserar stegbyten för skärmläsare */}
      <p aria-live="polite" className="sr-only">
        {visarSammanfattning
          ? "Sammanfattning innan du skickar"
          : `Steg ${steg} av ${ANTAL_STEG}`}
      </p>

      <div className="mt-8">
        {visarSammanfattning ? (
          <>
            <h2
              ref={rubrikRef}
              tabIndex={-1}
              className="text-2xl font-bold text-sand-950 sm:text-3xl"
            >
              Stämmer allt?
            </h2>
            <p className="mt-2 max-w-prose text-sand-600">
              Gå igenom uppgifterna innan du skickar. Du kan ändra varje del.
            </p>

            <div className="mt-6">
              <Sammanfattning data={data} gaTillSteg={gaTillSteg} />
            </div>

            <div className="mt-6 rounded-2xl border border-sand-200 bg-sand-100/60 p-5">
              <p className="text-[0.9375rem] leading-relaxed text-sand-700">
                När du skickar förfrågan går uppgifterna till Nyflytt. Vi
                återkommer med en offert. Att skicka förfrågan är kostnadsfritt
                och du binder dig inte till något.
              </p>
            </div>
          </>
        ) : (
          <>
            {/* ------------------------------ Steg 1 ------------------------- */}
            {steg === 1 ? (
              <Steg
                rubrikRef={rubrikRef}
                rubrik="Vad behöver du hjälp med?"
                ingress="Välj det som passar bäst. Du kan lägga till detaljer längre fram."
              >
                <KortValGrupp
                  namn="tjanst"
                  etikett="Välj tjänst"
                  fel={fel.tjanst}
                  varde={data.tjanst}
                  onValj={(v) => uppdatera("tjanst", v)}
                  alternativ={tjanstAlternativ.map((a) => ({
                    varde: a.varde,
                    rubrik: a.rubrik,
                    text: a.text,
                    ikon: <Ikon namn={a.ikon} className="size-7" />,
                  }))}
                />
              </Steg>
            ) : null}

            {/* ------------------------------ Steg 2 ------------------------- */}
            {steg === 2 ? (
              <Steg
                rubrikRef={rubrikRef}
                rubrik={flytt ? "Varifrån och vart?" : "Var ligger bostaden?"}
                ingress={
                  flytt
                    ? "Ort räcker för att vi ska kunna räkna. Fyll i gatuadress om du redan vet den."
                    : "Ort räcker för att vi ska kunna räkna på städningen."
                }
              >
                <div className="space-y-6">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextFalt
                      id="franOrt"
                      etikett={flytt ? "Ort du flyttar från" : "Ort"}
                      krav
                      autoComplete="address-level2"
                      value={data.franOrt}
                      fel={fel.franOrt}
                      onChange={(e) => uppdatera("franOrt", e.target.value)}
                    />
                    <TextFalt
                      id="franAdress"
                      etikett="Gatuadress"
                      krav
                      autoComplete="street-address"
                      value={data.franAdress}
                      fel={fel.franAdress}
                      onChange={(e) => uppdatera("franAdress", e.target.value)}
                    />
                  </div>

                  {flytt ? (
                    <div className="grid gap-5 border-t border-sand-200 pt-6 sm:grid-cols-2">
                      <TextFalt
                        id="tillOrt"
                        etikett="Ort du flyttar till"
                        krav
                        autoComplete="address-level2"
                        value={data.tillOrt}
                        fel={fel.tillOrt}
                        onChange={(e) => uppdatera("tillOrt", e.target.value)}
                      />
                      <TextFalt
                        id="tillAdress"
                        etikett="Gatuadress"
                        krav
                        autoComplete="street-address"
                        value={data.tillAdress}
                        fel={fel.tillAdress}
                        onChange={(e) => uppdatera("tillAdress", e.target.value)}
                      />
                    </div>
                  ) : null}
                </div>
              </Steg>
            ) : null}

            {/* ------------------------------ Steg 3 ------------------------- */}
            {steg === 3 ? (
              <Steg
                rubrikRef={rubrikRef}
                rubrik="Bostaden och datumet"
                ingress="Ungefärliga uppgifter räcker. Vi stämmer av detaljerna innan bokning."
              >
                <div className="space-y-6">
                  <ValFalt
                    id="bostadstyp"
                    etikett="Typ av bostad"
                    krav
                    alternativ={bostadsTypAlternativ.map((b) => ({
                      varde: b.varde,
                      text: b.text,
                    }))}
                    value={data.bostadstyp}
                    fel={fel.bostadstyp}
                    onChange={(e) =>
                      uppdatera("bostadstyp", e.target.value as OffertData["bostadstyp"])
                    }
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextFalt
                      id="boyta"
                      etikett="Ungefärlig storlek"
                      hjalptext="Antal kvadratmeter, till exempel 72."
                      krav
                      inputMode="numeric"
                      value={data.boyta}
                      fel={fel.boyta}
                      onChange={(e) => uppdatera("boyta", e.target.value)}
                    />
                    <TextFalt
                      id="antalRum"
                      etikett="Antal rum"
                      inputMode="numeric"
                      value={data.antalRum}
                      fel={fel.antalRum}
                      onChange={(e) => uppdatera("antalRum", e.target.value)}
                    />
                  </div>

                  <div>
                    <TextFalt
                      id="datum"
                      etikett="Önskat datum"
                      hjalptext="Vet du inte exakt datum än? Välj ungefärligt och kryssa i flexibelt nedan."
                      krav
                      type="date"
                      value={data.datum}
                      fel={fel.datum}
                      onChange={(e) => uppdatera("datum", e.target.value)}
                    />
                    <div className="mt-3">
                      <KryssFalt
                        id="datumFlexibelt"
                        etikett="Jag är flexibel med datumet"
                        checked={data.datumFlexibelt}
                        onChange={(e) => uppdatera("datumFlexibelt", e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </Steg>
            ) : null}

            {/* ------------------------------ Steg 4 ------------------------- */}
            {steg === 4 ? (
              <Steg
                rubrikRef={rubrikRef}
                rubrik="Praktiska detaljer"
                ingress="Allt här är frivilligt, men det gör offerten mer träffsäker. Våning och hiss påverkar tidsåtgången mest."
              >
                <div className="space-y-7">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextFalt
                      id="franVaning"
                      etikett={flytt ? "Våning, från" : "Våning"}
                      hjalptext="Ange 0 för bottenvåning."
                      inputMode="numeric"
                      value={data.franVaning}
                      fel={fel.franVaning}
                      onChange={(e) => uppdatera("franVaning", e.target.value)}
                    />
                    <RadioRad
                      namn="franHiss"
                      etikett={flytt ? "Hiss, från" : "Finns hiss?"}
                      varde={data.franHiss}
                      alternativ={hissAlternativ}
                      onValj={(v) => uppdatera("franHiss", v)}
                    />
                  </div>

                  {flytt ? (
                    <div className="grid gap-5 border-t border-sand-200 pt-7 sm:grid-cols-2">
                      <TextFalt
                        id="tillVaning"
                        etikett="Våning, till"
                        hjalptext="Ange 0 för bottenvåning."
                        inputMode="numeric"
                        value={data.tillVaning}
                        fel={fel.tillVaning}
                        onChange={(e) => uppdatera("tillVaning", e.target.value)}
                      />
                      <RadioRad
                        namn="tillHiss"
                        etikett="Hiss, till"
                        varde={data.tillHiss}
                        alternativ={hissAlternativ}
                        onValj={(v) => uppdatera("tillHiss", v)}
                      />
                    </div>
                  ) : null}

                  {foretag ? (
                    <div className="border-t border-sand-200 pt-7">
                      <TextFalt
                        id="antalArbetsplatser"
                        etikett="Antal arbetsplatser"
                        hjalptext="Ungefär hur många personer arbetar på platsen?"
                        inputMode="numeric"
                        value={data.antalArbetsplatser}
                        fel={fel.antalArbetsplatser}
                        onChange={(e) => uppdatera("antalArbetsplatser", e.target.value)}
                      />
                    </div>
                  ) : null}

                  {flytt ? (
                    <div className="border-t border-sand-200 pt-7">
                      <KryssFalt
                        id="packhjalp"
                        etikett="Jag vill ha hjälp med packning"
                        hjalptext="Packning ingår inte som standard. Kryssa i så tar vi med det i offerten."
                        checked={data.packhjalp}
                        onChange={(e) => uppdatera("packhjalp", e.target.checked)}
                      />
                    </div>
                  ) : null}

                  <div className="space-y-5 border-t border-sand-200 pt-7">
                    {flytt ? (
                      <TextomradeFalt
                        id="specialforemal"
                        etikett="Särskilda föremål"
                        hjalptext="Till exempel piano, kassaskåp, akvarium eller andra tunga eller ömtåliga saker som kräver extra utrustning."
                        rows={3}
                        value={data.specialforemal}
                        fel={fel.specialforemal}
                        onChange={(e) => uppdatera("specialforemal", e.target.value)}
                      />
                    ) : null}

                    <TextomradeFalt
                      id="ovrigt"
                      etikett="Övrigt vi bör veta"
                      hjalptext="Trång gata, avstängd port, husdjur, begränsad parkering – allt som kan påverka."
                      value={data.ovrigt}
                      fel={fel.ovrigt}
                      onChange={(e) => uppdatera("ovrigt", e.target.value)}
                    />
                  </div>
                </div>
              </Steg>
            ) : null}

            {/* ------------------------------ Steg 5 ------------------------- */}
            {steg === 5 ? (
              <Steg
                rubrikRef={rubrikRef}
                rubrik="Hur når vi dig?"
                ingress="Vi använder uppgifterna för att skicka offerten och för att kunna ställa följdfrågor."
              >
                <div className="space-y-5">
                  <TextFalt
                    id="namn"
                    etikett="Namn"
                    krav
                    autoComplete="name"
                    value={data.namn}
                    fel={fel.namn}
                    onChange={(e) => uppdatera("namn", e.target.value)}
                  />

                  {foretag ? (
                    <TextFalt
                      id="foretag"
                      etikett="Företag"
                      krav
                      autoComplete="organization"
                      value={data.foretag}
                      fel={fel.foretag}
                      onChange={(e) => uppdatera("foretag", e.target.value)}
                    />
                  ) : null}

                  <div className="grid gap-5 sm:grid-cols-2">
                    <TextFalt
                      id="epost"
                      etikett="E-post"
                      krav
                      type="email"
                      autoComplete="email"
                      value={data.epost}
                      fel={fel.epost}
                      onChange={(e) => uppdatera("epost", e.target.value)}
                    />
                    <TextFalt
                      id="telefon"
                      etikett="Telefon"
                      krav
                      type="tel"
                      autoComplete="tel"
                      value={data.telefon}
                      fel={fel.telefon}
                      onChange={(e) => uppdatera("telefon", e.target.value)}
                    />
                  </div>

                  <div className="rounded-2xl border border-sand-200 bg-white p-5">
                    <KryssFalt
                      id="samtycke"
                      etikett={
                        <>
                          Jag godkänner att Nyflytt behandlar mina uppgifter för
                          att hantera min förfrågan, enligt{" "}
                          <Link
                            href="/integritetspolicy"
                            className="font-medium text-korall-700 underline underline-offset-2"
                          >
                            integritetspolicyn
                          </Link>
                          .
                        </>
                      }
                      checked={data.samtycke}
                      fel={fel.samtycke}
                      onChange={(e) => uppdatera("samtycke", e.target.checked)}
                    />
                  </div>
                </div>
              </Steg>
            ) : null}
          </>
        )}
      </div>

      {/* Fel vid inskick */}
      {skickarFel ? (
        <div
          role="alert"
          className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5"
        >
          <p className="font-sans font-semibold text-red-900">
            Förfrågan kunde inte skickas
          </p>
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-red-800">
            {skickarFel}
          </p>
        </div>
      ) : null}

      {/* Navigering */}
      <div className="mt-8 flex flex-col gap-3 border-t border-sand-200 pt-6 sm:flex-row-reverse sm:items-center sm:justify-start">
        {visarSammanfattning ? (
          <Knapp
            storlek="lg"
            onClick={skicka}
            disabled={skickar}
            className="w-full sm:w-auto"
          >
            {skickar ? "Skickar…" : "Skicka förfrågan"}
          </Knapp>
        ) : (
          <Knapp
            storlek="lg"
            onClick={gaFramat}
            medPil
            className="w-full sm:w-auto"
          >
            {steg === ANTAL_STEG ? "Granska förfrågan" : "Nästa"}
          </Knapp>
        )}

        {steg > 1 || visarSammanfattning ? (
          <Knapp
            variant="sekundar"
            storlek="lg"
            onClick={gaBakat}
            disabled={skickar}
            className="w-full sm:w-auto"
          >
            Tillbaka
          </Knapp>
        ) : null}
      </div>
    </div>
  );
}

/** Gemensamt omslag för ett steg – håller rubriknivåer konsekventa. */
function Steg({
  rubrik,
  ingress,
  children,
  rubrikRef,
}: {
  rubrik: string;
  ingress?: string;
  children: React.ReactNode;
  rubrikRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="glid-in">
      <h2
        ref={rubrikRef}
        tabIndex={-1}
        className="text-2xl font-bold text-sand-950 sm:text-3xl"
      >
        {rubrik}
      </h2>
      {ingress ? (
        <p className="mt-2 max-w-prose leading-relaxed text-sand-600">{ingress}</p>
      ) : null}
      <div className="mt-7">{children}</div>
    </div>
  );
}

/** Kvitto som visas direkt efter lyckat inskick. */
function Kvitto({
  referens,
  epost,
  rubrikRef,
}: {
  referens: string;
  epost: string;
  rubrikRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="glid-in rounded-3xl border border-sand-200 bg-white p-7 sm:p-10">
      <span className="flex size-14 items-center justify-center rounded-full bg-korall-100 text-korall-700">
        <Ikon namn="check" className="size-7" />
      </span>

      <h2
        ref={rubrikRef}
        tabIndex={-1}
        className="mt-5 text-2xl font-bold text-sand-950 sm:text-3xl"
      >
        Tack! Vi har tagit emot din förfrågan
      </h2>

      <p className="mt-3 max-w-prose text-lg leading-relaxed text-sand-600">
        Vi går igenom uppgifterna och återkommer med en offert till{" "}
        <span className="font-medium text-sand-900">{epost}</span>.
      </p>

      <dl className="mt-7 rounded-2xl bg-sand-100/70 p-5">
        <dt className="text-sm font-medium text-sand-600">Ditt referensnummer</dt>
        <dd className="mt-1 font-sans text-xl font-bold tracking-tight text-sand-950">
          {referens}
        </dd>
        <p className="mt-2 text-sm text-sand-600">
          Spara numret om du vill höra av dig om din förfrågan.
        </p>
      </dl>

      <div className="mt-7 border-t border-sand-200 pt-6">
        <h3 className="font-sans text-[1.0625rem] font-semibold text-sand-950">
          Vad händer nu?
        </h3>
        <ol className="mt-3 space-y-2.5 text-[0.9375rem] leading-relaxed text-sand-700">
          <li className="flex gap-2.5">
            <span className="font-semibold text-korall-700">1.</span>
            Vi går igenom din förfrågan och kontaktar dig om något behöver
            förtydligas.
          </li>
          <li className="flex gap-2.5">
            <span className="font-semibold text-korall-700">2.</span>
            Du får en offert med tydlig omfattning och pris.
          </li>
          <li className="flex gap-2.5">
            <span className="font-semibold text-korall-700">3.</span>
            Tackar du ja bokar vi uppdraget med en samarbetspartner och bekräftar
            datumet.
          </li>
        </ol>
      </div>
    </div>
  );
}
