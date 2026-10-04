/**
 * Tjänstekatalog.
 *
 * `aktiv: false` gör att tjänsten inte renderas någonstans på sajten och inte
 * hamnar i sitemap – men strukturen finns redan på plats. Så lägger vi till
 * packhjälp, montering och magasinering när de är bekräftade som tillgängliga.
 */

export type TjanstSlug =
  | "bohagsflytt"
  | "flyttstadning"
  | "flytt-och-stad"
  | "foretagsflytt"
  | "packhjalp"
  | "montering"
  | "magasinering";

export type Tjanst = {
  slug: TjanstSlug;
  /** Om false renderas tjänsten inte alls – används för kommande tjänster. */
  aktiv: boolean;
  namn: string;
  /** Kort etikett för nav och kort. */
  kortNamn: string;
  /** En mening som förklarar tjänsten – används på översiktskort. */
  sammanfattning: string;
  /** Metadescription för tjänstesidan. */
  metaBeskrivning: string;
  /** H1 på tjänstesidan. */
  rubrik: string;
  /** Ledande stycke under H1. */
  ingress: string;
  /** Vad som ingår. Håll konkret och verifierbart. */
  ingar: string[];
  /** Punkter som förtydligar vad som INTE ingår / kräver överenskommelse. */
  braAttVeta: string[];
  /** Ikonnyckel, matchar `components/Ikon.tsx`. */
  ikon: "lada" | "mopp" | "kombo" | "kontor" | "pack" | "verktyg" | "lager";
  /** Förvalt värde i offertformuläret när man kommer från denna sida. */
  offertTyp: "flytt" | "stad" | "bada" | "foretag";
};

export const tjanster: Tjanst[] = [
  {
    slug: "bohagsflytt",
    aktiv: true,
    namn: "Bohagsflytt",
    kortNamn: "Bohagsflytt",
    sammanfattning:
      "Bärhjälp, transport och lastsäkring för hela bohaget – från lägenhet till villa.",
    metaBeskrivning:
      "Boka flytthjälp för bohagsflytt via Nyflytt. Beskriv bostad, storlek och datum och få en tydlig offert. Uppdraget utförs av en av våra samarbetspartners.",
    rubrik: "Bohagsflytt för hela hemmet",
    ingress:
      "Du beskriver vad som ska flyttas och vart. Vi tar fram en offert med tydlig omfattning, och en av våra samarbetspartners utför flytten.",
    ingar: [
      "Bärhjälp in och ut ur bostaden",
      "Transport med flyttbil mellan adresserna",
      "Flyttfiltar och spännband för lastsäkring",
      "Demontering och montering av standardmöbler som säng och bokhylla",
      "Skydd av golv och dörrpartier i trapphus",
    ],
    braAttVeta: [
      "Packning av kartonger ingår inte som standard – lägg till packhjälp i förfrågan om du vill ha det.",
      "Piano, kassaskåp, akvarium och andra tunga specialföremål behöver anges separat eftersom de kräver extra utrustning.",
      "Våning och hissförhållanden påverkar tidsåtgången. Ange dem så blir offerten mer träffsäker.",
    ],
    ikon: "lada",
    offertTyp: "flytt",
  },
  {
    slug: "flyttstadning",
    aktiv: true,
    namn: "Flyttstädning",
    kortNamn: "Flyttstädning",
    sammanfattning:
      "Städning av hela bostaden efter utflytt, anpassad för besiktning och överlämning.",
    metaBeskrivning:
      "Boka flyttstädning via Nyflytt. Städning av hela bostaden inför överlämning, utförd av en av våra samarbetspartners. Begär offert med bostadstyp och datum.",
    rubrik: "Flyttstädning inför överlämningen",
    ingress:
      "En flyttstädning ska hålla för en besiktning. Vi samlar in uppgifterna som behövs och matchar dig med en samarbetspartner som utför städningen. Vilka moment som ingår framgår av offerten.",
    ingar: [
      "Köket inklusive vitvaror in- och utvändigt, skåp och lådor ur- och avtorkade",
      "Badrum och toalett avkalkade, golvbrunn rengjord",
      "Fönsterputs in- och utvändigt samt mellan rutorna där konstruktionen tillåter",
      "Golv, socklar, dörrar, dörrfoder och strömbrytare",
      "Garderober och förvaring ur- och avtorkade",
      "Balkong eller uteplats sopad och avtorkad",
    ],
    braAttVeta: [
      "Bostaden behöver vara tömd på bohag när städningen börjar – annars kan inte alla ytor kommas åt.",
      "Grovt byggdamm och sanering efter renovering är inte flyttstädning och behöver bedömas separat.",
      "Vilka moment som ingår kan variera något mellan samarbetspartners. Du får omfattningen skriftligt i offerten.",
    ],
    ikon: "mopp",
    offertTyp: "stad",
  },
  {
    slug: "flytt-och-stad",
    aktiv: true,
    namn: "Flytt och städ i samma bokning",
    kortNamn: "Flytt och städ",
    sammanfattning:
      "Flytten och flyttstädningen i en förfrågan, med datum som hänger ihop.",
    metaBeskrivning:
      "Boka flytt och flyttstädning i samma förfrågan via Nyflytt. En offert, ett datumupplägg och en kontaktväg. Begär offert direkt.",
    rubrik: "Flytt och städ i samma bokning",
    ingress:
      "Det vanligaste krånglet vid en flytt är att flytten och städningen bokas var för sig och krockar. Beställer du båda hos oss planeras de i rätt ordning från början.",
    ingar: [
      "Allt som ingår i flytthjälp",
      "Allt som ingår i flyttstädning",
      "Samordnade datum så städningen sker efter att bostaden är tömd",
      "En offert och en kontaktväg för båda uppdragen",
    ],
    braAttVeta: [
      "Flytt och städning kan utföras av två olika samarbetspartners. Samordningen sköter vi.",
      "Ska städningen ske samma dag som flytten behöver vi veta det i förfrågan, eftersom det påverkar tidsplaneringen.",
    ],
    ikon: "kombo",
    offertTyp: "bada",
  },
  {
    slug: "foretagsflytt",
    aktiv: true,
    namn: "Företagsflytt",
    kortNamn: "Företagsflytt",
    sammanfattning:
      "Flytt av kontor och verksamhet planerad så att driftstoppet blir så kort som möjligt.",
    metaBeskrivning:
      "Företagsflytt via Nyflytt. Flytt av kontor och verksamhet med planering, tidsschema och en kontaktväg. Beskriv verksamheten och få en offert.",
    rubrik: "Företagsflytt med kort driftstopp",
    ingress:
      "En kontorsflytt bedöms inte i kvadratmeter utan i arbetsplatser, utrustning och vilka tider verksamheten kan stå still. Vi samlar in det och tar fram ett upplägg.",
    ingar: [
      "Genomgång av verksamhetens behov innan offert",
      "Flytt av arbetsplatser, möbler och förvaring",
      "Nedtagning och uppsättning av kontorsmöbler",
      "Tidsplan som kan läggas på kväll eller helg för att korta driftstoppet",
      "Märkning så att rätt utrustning hamnar på rätt plats",
    ],
    braAttVeta: [
      "Servrar och känslig IT-utrustning hanteras i samråd – ange om det finns sådan utrustning.",
      "Arkiv med sekretesskrav behöver planeras separat. Beskriv det i förfrågan.",
      "För större verksamheter bokar vi en genomgång innan offert lämnas.",
    ],
    ikon: "kontor",
    offertTyp: "foretag",
  },

  // ---------------------------------------------------------------------------
  // Kommande tjänster. Sätt `aktiv: true` när tjänsten är bekräftad tillgänglig,
  // fyll i texterna nedan och skapa sidan under src/app/(tjanster)/.
  // De renderas inte någonstans så länge `aktiv` är false.
  // ---------------------------------------------------------------------------
  {
    slug: "packhjalp",
    aktiv: false,
    namn: "Packhjälp",
    kortNamn: "Packhjälp",
    sammanfattning: "PLATSHÅLLARE – beskriv packhjälpen innan tjänsten aktiveras.",
    metaBeskrivning: "PLATSHÅLLARE",
    rubrik: "Packhjälp",
    ingress: "PLATSHÅLLARE",
    ingar: [],
    braAttVeta: [],
    ikon: "pack",
    offertTyp: "flytt",
  },
  {
    slug: "montering",
    aktiv: false,
    namn: "Montering",
    kortNamn: "Montering",
    sammanfattning: "PLATSHÅLLARE – beskriv monteringen innan tjänsten aktiveras.",
    metaBeskrivning: "PLATSHÅLLARE",
    rubrik: "Montering",
    ingress: "PLATSHÅLLARE",
    ingar: [],
    braAttVeta: [],
    ikon: "verktyg",
    offertTyp: "flytt",
  },
  {
    slug: "magasinering",
    aktiv: false,
    namn: "Magasinering",
    kortNamn: "Magasinering",
    sammanfattning: "PLATSHÅLLARE – beskriv magasineringen innan tjänsten aktiveras.",
    metaBeskrivning: "PLATSHÅLLARE",
    rubrik: "Magasinering",
    ingress: "PLATSHÅLLARE",
    ingar: [],
    braAttVeta: [],
    ikon: "lager",
    offertTyp: "flytt",
  },
];

/** Bara tjänster som är bekräftade tillgängliga. Använd denna överallt i UI. */
export const aktivaTjanster = tjanster.filter((t) => t.aktiv);

export function hittaTjanst(slug: TjanstSlug): Tjanst | undefined {
  return aktivaTjanster.find((t) => t.slug === slug);
}
