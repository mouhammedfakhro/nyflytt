/**
 * Generella vanliga frågor.
 *
 * Svaren är medvetet formulerade utan påhittade garantier, priser eller
 * försäkringsvillkor. Där en uppgift saknas står det uttryckligen att den
 * framgår av offerten, i stället för att vi gissar.
 *
 * ATT FYLLA I INNAN PUBLICERING: se frågorna märkta med KRÄVER UPPGIFT i
 * kommentar – de behöver kompletteras med verkliga villkor.
 */

export type Fraga = { fraga: string; svar: string };

export const vanligaFragor: Fraga[] = [
  {
    fraga: "Hur begär jag en offert?",
    svar: "Du fyller i offertformuläret i fem steg: vad du behöver hjälp med, adresser, bostad och datum, praktiska detaljer och dina kontaktuppgifter. Innan du skickar får du se en sammanfattning av allt du angett. Det tar några minuter och du binder dig inte till något.",
  },
  {
    fraga: "Vem utför själva flytten eller städningen?",
    svar: "Uppdraget utförs av en av våra samarbetspartners, inte av Nyflytt själva. Vi tar emot din förfrågan, tar fram offerten och håller ihop kontakten. Vilken partner som utför just ditt uppdrag framgår innan du bokar.",
  },
  {
    fraga: "Vad kostar en flytt?",
    // KRÄVER UPPGIFT: om ni vill ange prisintervall eller timpris måste det fyllas i här.
    svar: "Priset beror på mängden bohag, avståndet mellan adresserna, våning och hiss samt vilka tjänster du väljer. Därför sätter vi inte ett pris innan vi vet förutsättningarna. Du får ett pris med tydlig omfattning i offerten och kan tacka nej om det inte passar.",
  },
  {
    fraga: "Vad ingår i en flyttstädning?",
    svar: "Hela bostaden städas inför överlämning: köket med vitvaror in- och utvändigt, badrum, fönsterputs, golv, socklar, dörrar och förvaring. Exakt omfattning framgår av offerten, eftersom den kan variera något mellan samarbetspartners.",
  },
  {
    fraga: "Hur långt i förväg bör jag boka?",
    svar: "Så tidigt du kan, särskilt om du är bunden till ett specifikt datum. Slutet av månaden och sommarmånaderna är de mest efterfrågade perioderna, och kring terminsstart gäller det även studentorter som Lund och Halmstad.",
  },
  {
    fraga: "Måste jag packa själv?",
    svar: "Ja, packning ingår inte som standard i flytthjälpen. Du kan ange i förfrågan att du vill ha hjälp med packning, så tar vi med det i bedömningen.",
  },
  {
    fraga: "Vad händer om något går sönder under flytten?",
    // KRÄVER UPPGIFT: försäkringsvillkor och ansvarsfördelning mellan Nyflytt och partner.
    svar: "Ansvaret vid transportskada regleras i villkoren för det uppdrag du bokar. Vilka villkor och vilket försäkringsskydd som gäller framgår av offerten från den samarbetspartner som utför uppdraget. Läs igenom det innan du tackar ja.",
  },
  {
    fraga: "Kan jag boka både flytt och flyttstädning?",
    svar: "Ja, och det är oftast smidigast. Välj flytt och städ i formuläret, då planeras städningen efter att bostaden är tömd och du får en offert för båda delarna.",
  },
  {
    fraga: "Vilka orter arbetar ni i?",
    svar: "Vi arbetar i Helsingborg, Malmö, Landskrona, Ängelholm, Halmstad, Kristianstad, Hässleholm, Lund och Trelleborg. Ligger din adress utanför de orterna kan du ändå skicka en förfrågan, så återkommer vi med om vi kan hjälpa till.",
  },
  {
    fraga: "Vad behöver jag göra innan flyttdagen?",
    svar: "Packa klart, märk kartongerna med rum, töm och frosta av frysen och se till att det finns tillträde till trapphus, hiss och eventuellt garage. Behövs tillstånd för att ställa flyttbilen på gatan är det bra att ordna det i god tid.",
  },
];

/** Frågor som visas på startsidan – en delmängd för att hålla sidan fokuserad. */
export const startsidansFragor = vanligaFragor.slice(0, 6);
