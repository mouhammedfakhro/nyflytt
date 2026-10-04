/**
 * Innehåll för startsidans större sektioner.
 *
 * Separerat från sidkomponenten så texterna går att redigera utan att röra
 * layouten. Inga omdömen, betyg, statistik eller certifieringsmärken –
 * sådant får bara läggas till om det är verifierat och vi har rätt att visa det.
 */
import type { TjanstBlockData } from "@/components/TjanstBlock";
import type { IkonNamn } from "@/components/Ikon";

/** Tre löften direkt under hero. */
export const loften: { ikon: IkonNamn; rubrik: string; text: string }[] = [
  {
    ikon: "epost",
    rubrik: "Tydlig offert utan överraskningar",
    text: "Du får veta vad som ingår och vad det kostar innan du bokar. Dyker något oväntat upp hör vi av oss först – vi lägger inte på kostnader i efterhand.",
  },
  {
    ikon: "kombo",
    rubrik: "Flytt och städ i en bokning",
    text: "Slipp samordna två företag. Beställer du båda planeras datumen så att städningen sker efter att bostaden är tömd.",
  },
  {
    ikon: "check",
    rubrik: "En kontaktväg hela vägen",
    text: "Du har samma kontakt från förfrågan till utfört uppdrag, även när flytt och städning utförs av två olika samarbetspartners.",
  },
];

/** Tjänstesektioner med bild – speglar strukturen på en klassisk flyttsajt. */
export const tjanstBlock: TjanstBlockData[] = [
  {
    slug: "bohagsflytt",
    rubrik: "Bohagsflytt för hela hemmet",
    ingress:
      "Bärhjälp, transport och lastsäkring – från etta till villa. Du beskriver vad som ska flyttas, vi räknar på det.",
    bild: "/bilder/bohagsflytt-barhjalp-i-trapphus.webp",
    bildAlt: "Person bär en flyttkartong uppför en trappa i ett trapphus",
    offertTyp: "flytt",
    punkter: [
      {
        ikon: "lada",
        rubrik: "Skydd under transporten",
        text: "Flyttfiltar och spännband ingår, och golv och dörrpartier skyddas i trapphuset.",
      },
      {
        ikon: "verktyg",
        rubrik: "Montering av standardmöbler",
        text: "Demontering och montering av säng, bokhylla och liknande ingår i uppdraget.",
      },
      {
        ikon: "kontor",
        rubrik: "Våning och hiss räknas in",
        text: "Trapphus utan hiss tar längre tid. Anger du våningen blir offerten mer träffsäker.",
      },
      {
        ikon: "pack",
        rubrik: "Packhjälp som tillval",
        text: "Packning ingår inte som standard, men kan läggas till i förfrågan.",
      },
    ],
  },
  {
    slug: "flyttstadning",
    rubrik: "Flyttstädning inför överlämning",
    ingress:
      "En flyttstädning ska hålla för en besiktning. Vi samlar in uppgifterna som behövs och matchar dig med en samarbetspartner som utför städningen.",
    bild: "/bilder/flyttstadning-rent-kok-efter-stadning.webp",
    bildAlt: "Nystädat ljust kök med rena bänkskivor och blanka vitvaror",
    offertTyp: "stad",
    punkter: [
      {
        ikon: "mopp",
        rubrik: "Hela bostaden",
        text: "Kök med vitvaror in- och utvändigt, badrum, golv, socklar, dörrar och förvaring.",
      },
      {
        ikon: "check",
        rubrik: "Fönsterputs ingår",
        text: "In- och utvändigt samt mellan rutorna, där konstruktionen tillåter att fönstret öppnas.",
      },
      {
        ikon: "epost",
        rubrik: "Omfattningen skriftligt",
        text: "Du får vad som ingår skriftligt i offerten, så det går att stämma av mot besiktningen.",
      },
      {
        ikon: "lada",
        rubrik: "Tömd bostad krävs",
        text: "Bohaget behöver vara ute innan städningen börjar – annars går inte alla ytor att komma åt.",
      },
    ],
  },
  {
    slug: "foretagsflytt",
    rubrik: "Företagsflytt med kort driftstopp",
    ingress:
      "En kontorsflytt mäts inte i kvadratmeter utan i arbetsplatser, utrustning och vilka tider verksamheten kan stå still.",
    bild: "/bilder/foretagsflytt-kartonger-i-tom-lokal.webp",
    bildAlt: "Flyttkartonger uppställda på golvet i en tömd lokal",
    offertTyp: "foretag",
    punkter: [
      {
        ikon: "klocka",
        rubrik: "Kväll och helg går bra",
        text: "Tidsplanen kan läggas utanför arbetstid för att korta driftstoppet.",
      },
      {
        ikon: "kontor",
        rubrik: "Arbetsplats för arbetsplats",
        text: "Märkning gör att rätt utrustning hamnar på rätt plats i den nya lokalen.",
      },
      {
        ikon: "verktyg",
        rubrik: "Möbler ned och upp",
        text: "Nedtagning och uppsättning av kontorsmöbler ingår i uppdraget.",
      },
      {
        ikon: "check",
        rubrik: "Genomgång före offert",
        text: "För större verksamheter går vi igenom förutsättningarna innan offert lämnas.",
      },
    ],
  },
];

/** Det vi står för – tre värderingar med bild. */
export const varderingar = [
  {
    rubrik: "Vi säger som det är",
    text: "Nyflytt utför inte flyttarna själva – det gör våra samarbetspartners. Det skriver vi öppet, inte i det finstilta. Du får veta vilken partner som tar ditt uppdrag innan du bokar.",
    bild: "/bilder/varderingar-par-packar-kartonger.webp",
    bildAlt: "Två personer packar ned saker i flyttkartonger i ett ljust rum",
  },
  {
    rubrik: "Tydlighet före lockpris",
    text: "En offert som ser billig ut men saknar halva omfattningen hjälper ingen. Vi skriver hellre ut exakt vad som ingår och vad som inte gör det, så att du kan jämföra på riktigt.",
    bild: "/bilder/varderingar-staplade-flyttkartonger.webp",
    bildAlt: "Staplade flyttkartonger av olika storlek",
  },
  {
    rubrik: "Enkelt från start till mål",
    text: "Ett formulär, en offert, en kontaktväg. Du ska inte behöva vara projektledare för din egen flytt, särskilt inte när både flytt och städning ska hinnas med.",
    bild: "/bilder/varderingar-inflyttat-vardagsrum.webp",
    bildAlt: "Inrett vardagsrum med soffa och matplats i en nyinflyttad bostad",
  },
];
