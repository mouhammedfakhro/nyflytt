/**
 * CRM-adapter.
 *
 * ════════════════════════════════════════════════════════════════════════════
 *  HÄR KOPPLAS CRM:ET IN
 * ════════════════════════════════════════════════════════════════════════════
 *
 * All utgående integration går genom interfacet `CrmAdapter` nedan. Ingen annan
 * del av kodbasen känner till hur CRM:et ser ut – sidor och server actions
 * anropar bara `hamtaCrmAdapter().skickaForfragan(...)`.
 *
 * SÅ BYTER DU FRÅN MOCK TILL SKARP INTEGRATION:
 *
 *   1. Skapa `src/lib/crm/adapters/<ert-crm>.ts` som exporterar ett objekt som
 *      uppfyller `CrmAdapter`. Använd `httpAdapter` i `./adapters/http.ts` som
 *      utgångspunkt – den innehåller redan timeout, felhantering och
 *      omförsöksskydd.
 *   2. Registrera adaptern i `valjAdapter()` längst ner i denna fil.
 *   3. Sätt miljövariablerna i `.env.local` (se `.env.example`):
 *        CRM_ADAPTER=http
 *        CRM_API_URL=https://...
 *        CRM_API_KEY=...
 *
 * Tills dess används `mockAdapter`, som loggar förfrågan till serverkonsolen
 * och skriver den till `.data/offertforfragningar.jsonl` i utvecklingsläge.
 * Inget skickas någonstans.
 */
import type { OffertData } from "@/lib/offert/schema";
import { mockAdapter } from "@/lib/crm/adapters/mock";
import { httpAdapter } from "@/lib/crm/adapters/http";

/** Normaliserad nyttolast som skickas till CRM:et. */
export type CrmForfragan = {
  /** Vårt eget referensnummer – visas för kunden i kvittot. */
  referens: string;
  mottagenTid: string;
  tjanst: string;
  fran: { ort: string; adress: string; vaning: string; hiss: string };
  till: { ort: string; adress: string; vaning: string; hiss: string };
  bostad: { typ: string; boyta: string; antalRum: string };
  datum: { onskat: string; flexibelt: boolean };
  tillval: { packhjalp: boolean; specialforemal: string };
  foretagsuppgifter: { foretag: string; antalArbetsplatser: string };
  ovrigt: string;
  kontakt: { namn: string; epost: string; telefon: string };
  /** Var förfrågan kom ifrån – t.ex. vilken ortssida. */
  kalla: string;
};

export type CrmResultat =
  | { ok: true; referens: string; crmId?: string }
  | { ok: false; felkod: "natverk" | "validering" | "server"; meddelande: string };

export interface CrmAdapter {
  readonly namn: string;
  skickaForfragan(forfragan: CrmForfragan): Promise<CrmResultat>;
}

/**
 * Bygger CRM-nyttolasten från formulärdata.
 * Separerad från adaptern så att fältmappning kan testas och återanvändas.
 */
export function byggForfragan(
  data: OffertData,
  meta: { referens: string; kalla: string },
): CrmForfragan {
  return {
    referens: meta.referens,
    mottagenTid: new Date().toISOString(),
    tjanst: data.tjanst,
    fran: {
      ort: data.franOrt.trim(),
      adress: data.franAdress.trim(),
      vaning: data.franVaning.trim(),
      hiss: data.franHiss,
    },
    till: {
      ort: data.tillOrt.trim(),
      adress: data.tillAdress.trim(),
      vaning: data.tillVaning.trim(),
      hiss: data.tillHiss,
    },
    bostad: {
      typ: data.bostadstyp,
      boyta: data.boyta.trim(),
      antalRum: data.antalRum.trim(),
    },
    datum: { onskat: data.datum, flexibelt: data.datumFlexibelt },
    tillval: {
      packhjalp: data.packhjalp,
      specialforemal: data.specialforemal.trim(),
    },
    foretagsuppgifter: {
      foretag: data.foretag.trim(),
      antalArbetsplatser: data.antalArbetsplatser.trim(),
    },
    ovrigt: data.ovrigt.trim(),
    kontakt: {
      namn: data.namn.trim(),
      epost: data.epost.trim(),
      telefon: data.telefon.trim(),
    },
    kalla: meta.kalla,
  };
}

/**
 * Referensnummer i formatet NF-ÅÅMMDD-XXXX.
 * Slumpdelen använder crypto så två samtidiga förfrågningar inte kolliderar.
 */
export function skapaReferens(): string {
  const nu = new Date();
  const datumdel = [
    String(nu.getFullYear()).slice(2),
    String(nu.getMonth() + 1).padStart(2, "0"),
    String(nu.getDate()).padStart(2, "0"),
  ].join("");

  const tecken = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // utan lätt förväxlade tecken
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  const slump = Array.from(bytes, (b) => tecken[b % tecken.length]).join("");

  return `NF-${datumdel}-${slump}`;
}

/** Väljer adapter utifrån miljövariabel. Default är mock. */
function valjAdapter(): CrmAdapter {
  switch (process.env.CRM_ADAPTER) {
    case "http":
      return httpAdapter;
    // Lägg till era egna adaptrar här:
    // case "hubspot":
    //   return hubspotAdapter;
    default:
      return mockAdapter;
  }
}

let cachad: CrmAdapter | undefined;

export function hamtaCrmAdapter(): CrmAdapter {
  cachad ??= valjAdapter();
  return cachad;
}
