/**
 * Datamodell och validering för offertförfrågan.
 *
 * Valideringen är avsiktligt beroendefri (ingen zod) för att hålla
 * klientbundeln liten. Samma funktioner används på klienten för direkt
 * återkoppling och på servern som sanningskälla – klientvalidering kan
 * alltid kringgås.
 */

export type TjanstVal = "flytt" | "stad" | "bada" | "foretag";

export type BostadsTyp =
  | "lagenhet"
  | "villa"
  | "radhus"
  | "studentrum"
  | "kontor"
  | "annat";

export type OffertData = {
  // Steg 1 – behov
  tjanst: TjanstVal | "";

  // Steg 2 – adresser
  franOrt: string;
  franAdress: string;
  tillOrt: string;
  tillAdress: string;

  // Steg 3 – bostad och datum
  bostadstyp: BostadsTyp | "";
  boyta: string;
  antalRum: string;
  datum: string;
  datumFlexibelt: boolean;

  // Steg 4 – praktiska detaljer
  franVaning: string;
  franHiss: "ja" | "nej" | "vet-inte" | "";
  tillVaning: string;
  tillHiss: "ja" | "nej" | "vet-inte" | "";
  packhjalp: boolean;
  specialforemal: string;
  /** Endast relevant för företagsflytt. */
  antalArbetsplatser: string;
  ovrigt: string;

  // Steg 5 – kontakt
  namn: string;
  epost: string;
  telefon: string;
  foretag: string;
  samtycke: boolean;
};

export const tomOffert: OffertData = {
  tjanst: "",
  franOrt: "",
  franAdress: "",
  tillOrt: "",
  tillAdress: "",
  bostadstyp: "",
  boyta: "",
  antalRum: "",
  datum: "",
  datumFlexibelt: false,
  franVaning: "",
  franHiss: "",
  tillVaning: "",
  tillHiss: "",
  packhjalp: false,
  specialforemal: "",
  antalArbetsplatser: "",
  ovrigt: "",
  namn: "",
  epost: "",
  telefon: "",
  foretag: "",
  samtycke: false,
};

export const tjanstAlternativ: {
  varde: TjanstVal;
  rubrik: string;
  text: string;
  ikon: "lada" | "mopp" | "kombo" | "kontor";
}[] = [
  {
    varde: "flytt",
    rubrik: "Bara flytt",
    text: "Bärhjälp och transport av bohaget. Du sköter städningen själv.",
    ikon: "lada",
  },
  {
    varde: "stad",
    rubrik: "Bara flyttstädning",
    text: "Städning av bostaden inför överlämning. Du sköter flytten själv.",
    ikon: "mopp",
  },
  {
    varde: "bada",
    rubrik: "Flytt och städ",
    text: "Båda tjänsterna i en bokning med samordnade datum.",
    ikon: "kombo",
  },
  {
    varde: "foretag",
    rubrik: "Företagsflytt",
    text: "Flytt av kontor eller verksamhet.",
    ikon: "kontor",
  },
];

export const bostadsTypAlternativ: { varde: BostadsTyp; text: string }[] = [
  { varde: "lagenhet", text: "Lägenhet" },
  { varde: "radhus", text: "Radhus" },
  { varde: "villa", text: "Villa" },
  { varde: "studentrum", text: "Studentrum" },
  { varde: "kontor", text: "Kontor eller lokal" },
  { varde: "annat", text: "Annat" },
];

export const hissAlternativ = [
  { varde: "ja", text: "Ja" },
  { varde: "nej", text: "Nej" },
  { varde: "vet-inte", text: "Vet inte" },
] as const;

/** Antal steg i formuläret, inklusive sammanfattningen. */
export const ANTAL_STEG = 5;

export type Fel = Partial<Record<keyof OffertData, string>>;

// -----------------------------------------------------------------------------
// Hjälpfunktioner
// -----------------------------------------------------------------------------

/** Behöver den valda tjänsten städuppgifter? */
export function harStad(tjanst: OffertData["tjanst"]) {
  return tjanst === "stad" || tjanst === "bada";
}

/** Behöver den valda tjänsten flyttuppgifter (två adresser, våning/hiss)? */
export function harFlytt(tjanst: OffertData["tjanst"]) {
  return tjanst === "flytt" || tjanst === "bada" || tjanst === "foretag";
}

export function arForetag(tjanst: OffertData["tjanst"]) {
  return tjanst === "foretag";
}

/**
 * Enkel e-postkontroll. Medvetet tillåtande – vi vill inte avvisa giltiga
 * adresser med ovanliga men korrekta format. Riktig verifiering sker genom
 * att vi faktiskt svarar på adressen.
 */
function giltigEpost(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

/** Tillåter svenska format med mellanslag, bindestreck och +46. */
function giltigTelefon(v: string) {
  const rensad = v.replace(/[\s()-]/g, "");
  return /^(\+46|0)\d{6,12}$/.test(rensad);
}

function arDatumIFramtiden(v: string) {
  // Jämför på dagnivå så dagens datum räknas som giltigt.
  const valt = new Date(`${v}T00:00:00`);
  if (Number.isNaN(valt.getTime())) return false;
  const idag = new Date();
  idag.setHours(0, 0, 0, 0);
  return valt.getTime() >= idag.getTime();
}

// -----------------------------------------------------------------------------
// Validering per steg
// -----------------------------------------------------------------------------

/**
 * Validerar ett enskilt steg (1-indexerat).
 * Returnerar ett objekt med fältnamn → felmeddelande på svenska.
 */
export function valideraSteg(steg: number, data: OffertData): Fel {
  const fel: Fel = {};

  if (steg === 1) {
    if (!data.tjanst) {
      fel.tjanst = "Välj vad du behöver hjälp med för att gå vidare.";
    }
  }

  if (steg === 2) {
    const baraStad = harStad(data.tjanst) && !harFlytt(data.tjanst);

    if (!data.franOrt.trim()) {
      fel.franOrt = baraStad
        ? "Ange orten där bostaden ligger."
        : "Ange orten du flyttar från.";
    }
    // Gatuadressen behövs för att kunna bedöma framkomlighet och bärväg.
    if (!data.franAdress.trim()) {
      fel.franAdress = baraStad
        ? "Ange bostadens gatuadress."
        : "Ange gatuadressen du flyttar från.";
    }

    // Flyttjänster behöver en destination – ren flyttstädning gör det inte.
    if (harFlytt(data.tjanst)) {
      if (!data.tillOrt.trim()) {
        fel.tillOrt = "Ange orten du flyttar till.";
      }
      if (!data.tillAdress.trim()) {
        fel.tillAdress = "Ange gatuadressen du flyttar till.";
      }
    }
  }

  if (steg === 3) {
    if (!data.bostadstyp) {
      fel.bostadstyp = "Välj vilken typ av bostad eller lokal det gäller.";
    }
    if (!data.boyta.trim()) {
      fel.boyta = "Ange ungefärlig storlek i kvadratmeter.";
    } else {
      const yta = Number(data.boyta);
      if (!Number.isFinite(yta) || yta <= 0) {
        fel.boyta = "Ange storleken som ett tal, till exempel 72.";
      } else if (yta > 10000) {
        fel.boyta = "Kontrollera storleken – värdet verkar för stort.";
      }
    }
    if (!data.datum) {
      fel.datum = "Välj ett önskat datum. Du kan ändra det senare.";
    } else if (!arDatumIFramtiden(data.datum)) {
      fel.datum = "Välj dagens datum eller ett datum framåt i tiden.";
    }
  }

  if (steg === 4) {
    // Steg 4 är frivilligt i allt utom att siffervärden ska vara rimliga.
    if (data.franVaning && !/^\d{1,3}$/.test(data.franVaning.trim())) {
      fel.franVaning = "Ange våningen som ett tal, till exempel 3.";
    }
    if (data.tillVaning && !/^\d{1,3}$/.test(data.tillVaning.trim())) {
      fel.tillVaning = "Ange våningen som ett tal, till exempel 3.";
    }
    if (
      arForetag(data.tjanst) &&
      data.antalArbetsplatser &&
      !/^\d{1,5}$/.test(data.antalArbetsplatser.trim())
    ) {
      fel.antalArbetsplatser = "Ange antal arbetsplatser som ett tal.";
    }
  }

  if (steg === 5) {
    if (!data.namn.trim()) {
      fel.namn = "Ange ditt namn så vi vet vem vi svarar.";
    }
    if (!data.epost.trim()) {
      fel.epost = "Ange din e-postadress – dit skickar vi offerten.";
    } else if (!giltigEpost(data.epost)) {
      fel.epost = "Kontrollera e-postadressen. Den ska innehålla @ och en domän.";
    }
    if (!data.telefon.trim()) {
      fel.telefon = "Ange ditt telefonnummer så vi kan nå dig vid frågor.";
    } else if (!giltigTelefon(data.telefon)) {
      fel.telefon = "Kontrollera telefonnummret. Ange det med riktnummer, t.ex. 070 123 45 67.";
    }
    if (arForetag(data.tjanst) && !data.foretag.trim()) {
      fel.foretag = "Ange företagets namn.";
    }
    if (!data.samtycke) {
      fel.samtycke = "Du behöver godkänna att vi får behandla uppgifterna för att skicka förfrågan.";
    }
  }

  return fel;
}

/** Validerar alla steg – används på servern innan förfrågan skickas vidare. */
export function valideraAllt(data: OffertData): Fel {
  const allaFel: Fel = {};
  for (let steg = 1; steg <= ANTAL_STEG; steg++) {
    Object.assign(allaFel, valideraSteg(steg, data));
  }
  return allaFel;
}

export function harFel(fel: Fel) {
  return Object.keys(fel).length > 0;
}

/** Läsbara etiketter för sammanfattningen och för CRM-nyttolasten. */
export const etiketter: Record<string, string> = {
  flytt: "Bara flytt",
  stad: "Bara flyttstädning",
  bada: "Flytt och städ",
  foretag: "Företagsflytt",
  lagenhet: "Lägenhet",
  villa: "Villa",
  radhus: "Radhus",
  studentrum: "Studentrum",
  kontor: "Kontor eller lokal",
  annat: "Annat",
  ja: "Ja",
  nej: "Nej",
  "vet-inte": "Vet inte",
};

export function etikett(varde: string) {
  return etiketter[varde] ?? varde;
}
