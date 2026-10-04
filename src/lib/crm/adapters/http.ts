/**
 * Generisk HTTP-adapter – utgångspunkt för den skarpa CRM-kopplingen.
 *
 * Aktiveras med CRM_ADAPTER=http och kräver CRM_API_URL. CRM_API_KEY skickas
 * som Bearer-token om den är satt.
 *
 * ANPASSA DETTA när API-specifikationen finns:
 *   - `bygKropp()` mappar vår nyttolast till CRM:ets fältnamn. Just nu skickas
 *     vår egen struktur rakt igenom, vilket nästan säkert behöver ändras.
 *   - `lasUtId()` plockar ut CRM:ets eget id ur svaret.
 *   - Autentiseringen kan behöva bytas mot t.ex. en API-nyckel i header eller
 *     OAuth-token.
 */
import type { CrmAdapter, CrmForfragan, CrmResultat } from "@/lib/crm";

const TIMEOUT_MS = 10_000;

/** ANPASSA: mappa till CRM:ets förväntade fältnamn. */
function byggKropp(forfragan: CrmForfragan): unknown {
  return forfragan;
}

/** ANPASSA: plocka ut CRM:ets id ur svaret. */
function lasUtId(svar: unknown): string | undefined {
  if (svar && typeof svar === "object" && "id" in svar) {
    const id = (svar as { id: unknown }).id;
    return typeof id === "string" || typeof id === "number" ? String(id) : undefined;
  }
  return undefined;
}

export const httpAdapter: CrmAdapter = {
  namn: "http",

  async skickaForfragan(forfragan: CrmForfragan): Promise<CrmResultat> {
    const url = process.env.CRM_API_URL;

    if (!url) {
      console.error("[CRM http] CRM_API_URL saknas – kan inte skicka förfrågan.");
      return {
        ok: false,
        felkod: "server",
        meddelande: "CRM-integrationen är inte konfigurerad.",
      };
    }

    // Avbryt hängande anrop så kunden inte väntar i onödan.
    const avbryt = AbortSignal.timeout(TIMEOUT_MS);

    try {
      const svar = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CRM_API_KEY
            ? { Authorization: `Bearer ${process.env.CRM_API_KEY}` }
            : {}),
        },
        body: JSON.stringify(byggKropp(forfragan)),
        signal: avbryt,
        cache: "no-store",
      });

      if (!svar.ok) {
        // Logga status men aldrig kundens personuppgifter.
        console.error(
          `[CRM http] ${forfragan.referens}: CRM svarade ${svar.status} ${svar.statusText}`,
        );
        return {
          ok: false,
          felkod: svar.status >= 500 ? "server" : "validering",
          meddelande: `CRM svarade med status ${svar.status}.`,
        };
      }

      // Tomt svar är giltigt – vissa CRM svarar 201 utan kropp.
      const text = await svar.text();
      const kropp = text ? (JSON.parse(text) as unknown) : undefined;

      return {
        ok: true,
        referens: forfragan.referens,
        crmId: kropp ? lasUtId(kropp) : undefined,
      };
    } catch (fel) {
      const avbruten = fel instanceof Error && fel.name === "TimeoutError";
      console.error(
        `[CRM http] ${forfragan.referens}: ${avbruten ? "timeout" : "nätverksfel"}`,
        fel,
      );
      return {
        ok: false,
        felkod: "natverk",
        meddelande: avbruten
          ? "CRM svarade inte i tid."
          : "Kunde inte nå CRM-systemet.",
      };
    }
  },
};
