/**
 * Mockadapter – används tills riktig CRM-API-specifikation finns.
 *
 * Den skickar ingenting någonstans. Den loggar förfrågan till serverkonsolen
 * och lägger den i `.data/offertforfragningar.jsonl` (bara i utvecklingsläge,
 * och katalogen är gitignorerad) så att flödet kan testas på riktigt.
 *
 * OBS: i produktion utan riktig adapter skrivs inget till disk – då är
 * serverloggen enda spåret. Sätt CRM_ADAPTER innan lansering.
 */
import type { CrmAdapter, CrmForfragan, CrmResultat } from "@/lib/crm";

const LOGGFIL = ".data/offertforfragningar.jsonl";

async function skrivTillDisk(forfragan: CrmForfragan) {
  // Dynamisk import så att fs aldrig hamnar i klientbundeln.
  const { appendFile, mkdir } = await import("node:fs/promises");
  const { dirname } = await import("node:path");

  await mkdir(dirname(LOGGFIL), { recursive: true });
  await appendFile(LOGGFIL, `${JSON.stringify(forfragan)}\n`, "utf8");
}

export const mockAdapter: CrmAdapter = {
  namn: "mock",

  async skickaForfragan(forfragan: CrmForfragan): Promise<CrmResultat> {
    // Maskera personuppgifter i konsolloggen – hela objektet hamnar i filen.
    console.info(
      `[CRM mock] Offertförfrågan ${forfragan.referens} mottagen:`,
      {
        tjanst: forfragan.tjanst,
        fran: forfragan.fran.ort,
        till: forfragan.till.ort,
        bostad: forfragan.bostad,
        datum: forfragan.datum,
        kalla: forfragan.kalla,
        kontakt: "<maskerad i logg>",
      },
    );

    if (process.env.NODE_ENV === "development") {
      try {
        await skrivTillDisk(forfragan);
      } catch (fel) {
        // Diskskrivning är en utvecklingsbekvämlighet – den ska aldrig
        // få förfrågan att misslyckas för kunden.
        console.warn("[CRM mock] Kunde inte skriva till loggfil:", fel);
      }
    }

    return { ok: true, referens: forfragan.referens, crmId: "mock" };
  },
};
