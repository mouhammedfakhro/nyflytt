"use server";

/**
 * Server action för offertförfrågan.
 *
 * Servern validerar om allt själv – klientvalideringen finns för
 * användarupplevelsen, men kan alltid kringgås. Den här funktionen är
 * nåbar via POST direkt, så den behandlar all indata som opålitlig.
 */
import { byggForfragan, hamtaCrmAdapter, skapaReferens } from "@/lib/crm";
import {
  type Fel,
  type OffertData,
  harFel,
  tomOffert,
  valideraAllt,
} from "@/lib/offert/schema";

export type SkickaResultat =
  | { status: "ok"; referens: string }
  | { status: "valideringsfel"; fel: Fel }
  | { status: "fel"; meddelande: string };

/** Tillåtna värden per fält – skyddar mot manipulerad indata. */
const TILLATNA_TJANSTER = ["flytt", "stad", "bada", "foretag"];
const TILLATNA_BOSTADSTYPER = [
  "lagenhet",
  "villa",
  "radhus",
  "studentrum",
  "kontor",
  "annat",
];
const TILLATNA_HISS = ["ja", "nej", "vet-inte"];

/** Trimmar och kapar strängar så att inte orimligt stora fält skickas vidare. */
function text(varde: unknown, maxLangd = 500): string {
  return typeof varde === "string" ? varde.trim().slice(0, maxLangd) : "";
}

function flagga(varde: unknown): boolean {
  return varde === true || varde === "true" || varde === "on";
}

function enumVarde<T extends string>(varde: unknown, tillatna: readonly string[]): T | "" {
  const v = text(varde, 40);
  return (tillatna.includes(v) ? v : "") as T | "";
}

/**
 * Normaliserar okänd indata till OffertData.
 * Okända fält kastas bort – vi plockar bara det vi känner igen.
 */
function normalisera(rad: Record<string, unknown>): OffertData {
  return {
    ...tomOffert,
    tjanst: enumVarde(rad.tjanst, TILLATNA_TJANSTER),
    franOrt: text(rad.franOrt, 100),
    franAdress: text(rad.franAdress, 200),
    tillOrt: text(rad.tillOrt, 100),
    tillAdress: text(rad.tillAdress, 200),
    bostadstyp: enumVarde(rad.bostadstyp, TILLATNA_BOSTADSTYPER),
    boyta: text(rad.boyta, 10),
    antalRum: text(rad.antalRum, 10),
    datum: text(rad.datum, 10),
    datumFlexibelt: flagga(rad.datumFlexibelt),
    franVaning: text(rad.franVaning, 5),
    franHiss: enumVarde(rad.franHiss, TILLATNA_HISS),
    tillVaning: text(rad.tillVaning, 5),
    tillHiss: enumVarde(rad.tillHiss, TILLATNA_HISS),
    packhjalp: flagga(rad.packhjalp),
    specialforemal: text(rad.specialforemal, 1000),
    antalArbetsplatser: text(rad.antalArbetsplatser, 10),
    ovrigt: text(rad.ovrigt, 2000),
    namn: text(rad.namn, 120),
    epost: text(rad.epost, 200),
    telefon: text(rad.telefon, 40),
    foretag: text(rad.foretag, 160),
    samtycke: flagga(rad.samtycke),
  };
}

export async function skickaOffertforfragan(
  rad: Record<string, unknown>,
  kalla = "/offert",
): Promise<SkickaResultat> {
  const data = normalisera(rad ?? {});

  // Servern är sanningskällan för validering.
  const fel = valideraAllt(data);
  if (harFel(fel)) {
    return { status: "valideringsfel", fel };
  }

  const referens = skapaReferens();
  const forfragan = byggForfragan(data, {
    referens,
    kalla: text(kalla, 200) || "/offert",
  });

  try {
    const resultat = await hamtaCrmAdapter().skickaForfragan(forfragan);

    if (!resultat.ok) {
      // Visa inte tekniska detaljer för kunden – de ligger i serverloggen.
      return {
        status: "fel",
        meddelande:
          "Vi kunde inte ta emot din förfrågan just nu. Försök igen om en stund, eller kontakta oss direkt via e-post.",
      };
    }

    return { status: "ok", referens: resultat.referens };
  } catch (fel) {
    console.error(`[offert] Oväntat fel för ${referens}:`, fel);
    return {
      status: "fel",
      meddelande:
        "Något gick fel när förfrågan skulle skickas. Försök igen, eller kontakta oss direkt via e-post.",
    };
  }
}
