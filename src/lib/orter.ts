/**
 * Ortsdata för de prioriterade orterna.
 *
 * VIKTIGT OM INNEHÅLLET
 * Varje ort har egen brödtext som beskriver sådant som faktiskt skiljer orterna:
 * bebyggelse, vanliga flyttsträckor, parkerings- och framkomlighetsförhållanden.
 * Det är allmänt kända förhållanden om orten, inte påståenden om Nyflytts
 * verksamhet där.
 *
 * VI SKRIVER ALDRIG att vi har lokalt kontor, lokal personal, viss inställelsetid
 * eller garanterad områdestäckning. Det är inte bekräftat och får inte påstås.
 *
 * Fyll på `noteringar` med bekräftade uppgifter när sådana finns.
 */

/**
 * Storstad eller mindre ort.
 *
 * Skillnaden är INTE kosmetisk – den styr både URL och hur mycket innehåll
 * sidan har:
 *
 *   storstad  → /flyttfirma-<slug>      (t.ex. /flyttfirma-helsingborg)
 *               Full sida: stadsdelar, extra djup brödtext, fler frågor.
 *   mindre    → /flyttfirma/<slug>      (t.ex. /flyttfirma/hassleholm)
 *               Kortare sida utan stadsdelsavsnitt.
 *
 * En ort flyttas bara upp till `storstad` när det finns tillräckligt med
 * unikt innehåll att fylla den större mallen med. Att bara byta flagga utan
 * att skriva innehållet ger en tunn sida, vilket är sämre än ingen sida alls.
 */
export type OrtTyp = "storstad" | "mindre";

export type Ort = {
  slug: string;
  typ: OrtTyp;
  namn: string;
  /** Böjd form för löptext: "flytthjälp i Helsingborg". */
  iOrt: string;
  lan: string;
  /** Metadescription – unik per ort. */
  metaBeskrivning: string;
  /** Ingress under H1. Unik per ort. */
  ingress: string;
  /**
   * 2–4 stycken unik brödtext om flyttförutsättningar i orten.
   * Detta är det som gör sidan värd att indexera.
   */
  omOrten: string[];
  /** Typiska bostadstyper i orten – används i en faktaruta. */
  bebyggelse: string;
  /** Vanliga flyttsträckor till/från orten. */
  vanligaStrackor: string[];
  /** Praktiska saker som ofta påverkar en flytt just här. */
  praktiskt: { rubrik: string; text: string }[];
  /** Ortsspecifika frågor. Generella frågor ligger i lib/faq.ts. */
  fragor: { fraga: string; svar: string }[];
  /** Närliggande orter att länka till – måste matcha andra slugs i listan. */
  narliggande: string[];

  // --- Endast storstäder (typ: "storstad") -----------------------------------
  /**
   * Stadsdelar och områden med kort text om vad som kännetecknar en flytt där.
   * Detta är den största skillnaden mot de mindre orternas sidor.
   */
  stadsdelar?: { namn: string; text: string }[];
  /**
   * Fördjupande avsnitt med egen rubrik. Ger storstadssidan det djup som
   * motiverar en egen URL utan att innehållet blir utfyllnad.
   */
  fordjupning?: { rubrik: string; stycken: string[] }[];
};

export const orter: Ort[] = [
  {
    slug: "helsingborg",
    typ: "storstad",
    namn: "Helsingborg",
    iOrt: "Helsingborg",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Helsingborg. Beskriv din bostad och ditt datum och få en tydlig offert från Nyflytt. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Helsingborg eller till staden från någon annan ort? Beskriv bostaden och datumet så får du en offert med tydlig omfattning.",
    omOrten: [
      "Helsingborg är tydligt uppdelat. Innerstaden kring Söder, Norr och Olympia har sekelskifteshus med smala trapphus där hiss ofta saknas – där avgör våningsplanet tidsåtgången mer än bostadens yta.",
      "I Ramlösa, Råå och Ättekulla är det tvärtom: kort bärväg men större bohag, där garage och förråd lätt underskattas när man uppskattar storleken.",
      "Höjdskillnaden upp mot landborgen är värd att nämna. Branta och smala tvärgator kan göra att flyttbilen inte kommer nära porten, vilket förlänger bärsträckan mer än kartan antyder.",
    ],
    bebyggelse:
      "Sekelskifteshus och 1900-talsfastigheter i centrum, villor och radhus i ytterområdena.",
    vanligaStrackor: [
      "Inom Helsingborg, till exempel från centrum till Ramlösa eller Ättekulla",
      "Helsingborg–Landskrona och Helsingborg–Ängelholm",
      "Helsingborg–Lund och Helsingborg–Malmö",
    ],
    praktiskt: [
      {
        rubrik: "Parkering i centrum",
        text: "Stora delar av innerstaden har avgiftsbelagd parkering och begränsad möjlighet att ställa en flyttbil nära porten. Behövs uppställning på gatan kan tillstånd krävas från kommunen – kontrollera i god tid före flyttdagen.",
      },
      {
        rubrik: "Trapphus utan hiss",
        text: "I äldre fastigheter är hiss ovanligt och trappan ofta smal. Ange våning och om det finns hiss, så räknas rätt tid in i offerten från början.",
      },
      {
        rubrik: "Flytt över Öresund",
        text: "Flytt till eller från Danmark innebär andra förutsättningar än en inrikes flytt. Beskriv det i förfrågan så återkommer vi med vad som är möjligt.",
      },
    ],
    fragor: [
      {
        fraga: "Kan jag boka flytt och flyttstädning samtidigt i Helsingborg?",
        svar: "Ja. Välj flytt och städ i offertformuläret, så planeras städningen efter att bostaden är tömd. Momenten kan utföras av två olika samarbetspartners, men du har en kontaktväg och en offert.",
      },
      {
        fraga: "Hjälper ni med flytt från Helsingborg till en annan stad?",
        svar: "Ja, ange både från- och tilladress i förfrågan. Sträckan påverkar offerten, så det är bra att ha båda adresserna klara.",
      },
    ],
    stadsdelar: [
      {
        namn: "Centrum, Söder och Norr",
        text: "Sekelskiftesfastigheter med smala trapphus och ofta ingen hiss. Våningsplanet är här den enskilt viktigaste uppgiften för tidsåtgången. Gatuparkering är avgiftsbelagd och uppställning nära porten kan kräva tillstånd.",
      },
      {
        namn: "Olympia och Tågaborg",
        text: "Blandad bebyggelse med både äldre flerfamiljshus och funkisfastigheter. Hiss förekommer men är inte given. Gatorna är bredare än i de centrala kvarteren, vilket gör uppställning enklare.",
      },
      {
        namn: "Ramlösa och Ättekulla",
        text: "Villor och radhus där bärvägen är kort men bohaget större. Garage, förråd och uteplats innehåller ofta mer än man räknar med när man uppskattar storleken.",
      },
      {
        namn: "Råå och Rydebäck",
        text: "Kustnära villabebyggelse söder om staden. Transportsträckan in till centrum räknas in i uppdraget, och vissa gator är smala med begränsad vändmöjlighet för en större flyttbil.",
      },
    ],
    fordjupning: [
      {
        rubrik: "Landborgen påverkar framkomligheten",
        stycken: [
          "Helsingborg är byggt i två nivåer. Mellan den nedre staden längs hamnen och den övre delen på landborgen är höjdskillnaden påtaglig, och tvärgatorna upp från Drottninggatan är branta. För en tungt lastad flyttbil betyder det att vissa adresser är svårare att komma nära än kartan antyder.",
        ],
      },
      {
        rubrik: "Flytt över Öresund",
        stycken: [
          "Helsingborg har daglig färjeförbindelse till Helsingør, och flytt mellan Sverige och Danmark förekommer. En sådan flytt har andra förutsättningar än en inrikes: färjetider styr tidsplanen, och det tillkommer frågor om tull och regler som inte uppstår vid en flytt inom landet.",
        ],
      },
      {
        rubrik: "Att tänka på vid flytt i Helsingborg",
        stycken: [
          "Behöver flyttbilen stå på gatan i centrum kan det krävas tillstånd från kommunen. Det är något du ordnar själv som boende, och det bör göras i god tid före flyttdagen.",
        ],
      },
    ],
    narliggande: ["landskrona", "angelholm", "lund"],
  },
  {
    slug: "malmo",
    typ: "storstad",
    namn: "Malmö",
    iOrt: "Malmö",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Malmö. Beskriv bostad, storlek och datum och få en tydlig offert från Nyflytt. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Flyttar du inom Malmö eller till staden? Berätta om bostaden och när du vill flytta, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Malmö har störst spännvidd av våra orter. En fyra i Gamla Väster och en nyproducerad trea i Hyllie är helt olika uppdrag rent praktiskt, även vid samma yta.",
      "I Möllevången och Rörsjöstaden är husen från tidigt 1900-tal med smala trapphus och liten eller ingen hiss. I Västra Hamnen och Hyllie finns rymlig hiss och lastzon, men i stället långa avstånd från bilen till dörren och tillträde som kräver tagg eller kod.",
      "Närheten till Lund gör flytt mellan städerna vanlig. Sträckan är kort nog att flytt och flyttstädning ofta kan läggas tätt i tid.",
    ],
    bebyggelse:
      "Allt från sekelskiftesfastigheter i innerstaden till nyproduktion i Hyllie och Västra Hamnen, samt stora hyresrättsområden.",
    vanligaStrackor: [
      "Inom Malmö, till exempel från Möllevången till Hyllie eller Limhamn",
      "Malmö–Lund och Malmö–Trelleborg",
      "Malmö–Helsingborg och Malmö–Landskrona",
    ],
    praktiskt: [
      {
        rubrik: "Lastzoner och bilfria gator",
        text: "Delar av centrala Malmö har gågator och begränsad biltrafik där en flyttbil inte kan komma ända fram. Nämn det i förfrågan om du vet att gatan är avstängd eller att närmaste uppställning ligger en bit bort.",
      },
      {
        rubrik: "Garage och inpassering i nyproduktion",
        text: "I nyare fastigheter behövs ofta tagg eller kod för garage, hiss och soprum. Se till att du har tillträde ordnat på flyttdagen, annars tappas tid i onödan.",
      },
      {
        rubrik: "Datum i slutet av månaden",
        text: "Sista veckan i månaden är den mest efterfrågade tiden att flytta. Skicka förfrågan tidigt om du är bunden till ett specifikt datum.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni studentbostäder i Malmö?",
        svar: "Ja. Ange bostadstyp och ungefärlig storlek i förfrågan – ett studentrum är ett betydligt mindre uppdrag än en lägenhet och det ska offerten spegla.",
      },
      {
        fraga: "Kan ni hjälpa med företagsflytt i Malmö?",
        svar: "Ja. Välj företagsflytt i formuläret och beskriv antal arbetsplatser och verksamhet. För större kontor bokar vi en genomgång innan offert.",
      },
    ],
    stadsdelar: [
      {
        namn: "Möllevången och Rörsjöstaden",
        text: "Täta kvarter med fastigheter från tidigt 1900-tal. Trapphusen är smala, hiss saknas ofta och gatorna är trånga. Våning och hiss avgör tidsåtgången mer än bostadens yta.",
      },
      {
        namn: "Gamla Väster och Davidshall",
        text: "Äldre bebyggelse med delvis bilfria gator. Flyttbilen kan behöva stå en bit bort, vilket förlänger bärsträckan. Nämn i förfrågan om gatan har trafikbegränsning.",
      },
      {
        namn: "Västra Hamnen och Limhamns sjöstad",
        text: "Nyproduktion med rymlig hiss och lastzon. I gengäld är avståndet från lastzon till lägenhetsdörr ofta långt, och tillträde till garage kräver tagg eller kod som behöver ordnas i förväg.",
      },
      {
        namn: "Hyllie och Bunkeflostrand",
        text: "Nyare områden med goda uppställningsmöjligheter. Flytten blir förutsägbar, men kontrollera vilka in- och utfarter som gäller för tyngre fordon i de nyaste kvarteren.",
      },
    ],
    fordjupning: [
      {
        rubrik: "Nyproduktion kräver förberedelser",
        stycken: [
          "I Malmös nyare områden är den praktiska utmaningen sällan trappor, utan tillträde. Garageportar, hissar och soprum kräver ofta tagg eller kod, och i vissa fastigheter måste hissen bokas för flytt i förväg hos förvaltaren.",
        ],
      },
      {
        rubrik: "Månadsskiften och terminsstart",
        stycken: [
          "Malmö har hög omsättning på hyreslägenheter, och de allra flesta kontrakt löper över ett månadsskifte. Sista veckan i månaden är därför den mest efterfrågade tiden att flytta, i hela branschen.",
        ],
      },
      {
        rubrik: "Flytt mellan Malmö och Lund",
        stycken: [
          "Sträckan Malmö–Lund är bland de vanligaste vi får förfrågningar om. Avståndet är kort nog att flytten i praktiken planeras som en lokal flytt, vilket gör det enklare att lägga flytt och flyttstädning nära varandra i tid.",
        ],
      },
    ],
    narliggande: ["lund", "trelleborg", "landskrona"],
  },
  {
    slug: "landskrona",
    typ: "storstad",
    namn: "Landskrona",
    iOrt: "Landskrona",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Landskrona. Beskriv din bostad och ditt önskade datum och få en tydlig offert från Nyflytt.",
    ingress:
      "Planerar du en flytt i Landskrona? Beskriv bostaden och datumet och få en offert där omfattningen framgår tydligt.",
    omOrten: [
      "Landskrona är kompakt, och avstånden inom staden är korta. Transporttiden är därför sällan det som avgör – det är bärvägen i bostaden som styr hur lång tid ett uppdrag tar.",
      "Centrum har en blandning av äldre flerbostadshus och fastigheter från 1950- till 70-talet. De senare har ofta hiss, medan husen närmast citadellet och hamnen kan ha smalare trapphus.",
      "En sak skiljer Landskrona från övriga orter: Ven. Flytt till eller från ön innebär färjetransport med fasta turer och begränsad kapacitet, vilket måste planeras in i tidsschemat.",
    ],
    bebyggelse:
      "Äldre flerbostadshus i centrum, 1950–70-talsfastigheter med hiss, samt villaområden i utkanten.",
    vanligaStrackor: [
      "Inom Landskrona, till exempel centrum till Karlslund eller Häljarp",
      "Landskrona–Helsingborg och Landskrona–Lund",
      "Landskrona–Malmö",
    ],
    praktiskt: [
      {
        rubrik: "Flytt till eller från Ven",
        text: "Färjan till Ven har fasta turer och begränsad plats för fordon. Nämn i förfrågan om flytten berör ön, så kan tidsplanen läggas efter färjetiderna.",
      },
      {
        rubrik: "Korta avstånd inom staden",
        text: "Vid en flytt inom Landskrona är transportsträckan sällan avgörande. Ange i stället våning, hiss och mängd bohag – det är det som styr tidsåtgången.",
      },
      {
        rubrik: "Uppställning i centrum",
        text: "I de äldsta kvarteren är gatorna smala och uppställning nära porten kan vara svår. Beskriv gatan om du vet att den är trång.",
      },
    ],
    fragor: [
      {
        fraga: "Kan ni hjälpa med flytt till Ven?",
        svar: "Beskriv flytten i förfrågan och ange att den berör Ven. Vi återkommer med vad som är möjligt och hur färjetransporten påverkar upplägget och priset.",
      },
      {
        fraga: "Hur snabbt kan jag få en offert?",
        svar: "Vi återkommer så snart vi har gått igenom förfrågan. Har du ett specifikt datum i sikte är det bra att skicka in i god tid, särskilt kring månadsskiften.",
      },
    ],
    stadsdelar: [
      {
        namn: "Centrum och Östergatan",
        text: "Äldre flerbostadshus där hiss ofta saknas och trapphusen kan vara smala. Gatorna närmast citadellet är trånga med begränsad uppställning.",
      },
      {
        namn: "Karlslund",
        text: "Flerbostadshus från 1960- och 70-talet, nästan alltid med hiss och gott om plats att ställa flyttbilen.",
      },
      {
        namn: "Norrestad",
        text: "Blandad bebyggelse med både flerfamiljshus och radhus. Förutsättningarna varierar, så ange bostadstyp och våning.",
      },
      {
        namn: "Häljarp och Asmundtorp",
        text: "Tätorter i kommunen med villabebyggelse. Avståndet in till Landskrona räknas in i uppdraget.",
      },
    ],
    fordjupning: [
      {
        rubrik: "Flytt till eller från Ven",
        stycken: [
          "Ven hör till Landskrona kommun, och en flytt till eller från ön skiljer sig från allt annat i vårt område. Färjan har fasta turer och begränsad plats för fordon, vilket betyder att tidsplanen måste läggas efter färjetiderna. Nämn det direkt i förfrågan om flytten berör ön.",
        ],
      },
      {
        rubrik: "Korta avstånd inom staden",
        stycken: [
          "Landskrona är kompakt, och transportsträckan inom staden är sällan det som avgör tidsåtgången. Det är i stället våning, hiss och mängden bohag som styr. Ange de uppgifterna så blir offerten träffsäker.",
        ],
      },
      {
        rubrik: "Pendling till Helsingborg och Lund",
        stycken: [
          "Läget mitt emellan Helsingborg och Malmö gör Landskrona till en utpräglad pendlingsort. Flyttar mot båda städerna är vanliga, och sträckorna är korta nog att flytt och flyttstädning ofta kan läggas tätt efter varandra.",
        ],
      },
    ],
    narliggande: ["helsingborg", "lund", "malmo"],
  },
  {
    slug: "angelholm",
    typ: "storstad",
    namn: "Ängelholm",
    iOrt: "Ängelholm",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Ängelholm. Beskriv bostad, storlek och datum och få en tydlig offert från Nyflytt.",
    ingress:
      "Ska du flytta i Ängelholm? Berätta om bostaden och när flytten ska ske, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Ängelholm har en hög andel villor och radhus. Bärvägen är oftast kort och trappor sällan ett problem, men bohaget är större – garage, förråd och vind innehåller mer än man räknar med.",
      "I centrum finns lägre flerbostadshus i två till fyra plan. Hiss förekommer men är inte självklart i de äldre husen, så våningsplanet är värt att ange även här.",
      "Närheten till kusten märks i att både fritids- och permanentboenden byter ägare kring sommaren. Juni till augusti är därmed den mest efterfrågade perioden.",
    ],
    bebyggelse:
      "Stor andel villor och radhus, lägre flerbostadshus i centrum, samt en del fritidsbebyggelse mot kusten.",
    vanligaStrackor: [
      "Inom Ängelholm och till närliggande orter som Munka-Ljungby och Vejbystrand",
      "Ängelholm–Helsingborg",
      "Ängelholm–Halmstad",
    ],
    praktiskt: [
      {
        rubrik: "Räkna med förråd och garage",
        text: "Vid villaflytt är det ofta garaget, förrådet och vinden som gör bohaget större än väntat. Gå igenom dem innan du uppskattar storleken i förfrågan.",
      },
      {
        rubrik: "Högsäsong på sommaren",
        text: "Juni till augusti är den mest efterfrågade flyttperioden här. Skicka förfrågan i god tid om du har ett bestämt datum.",
      },
      {
        rubrik: "Grusade infarter",
        text: "Långa eller mjuka grusinfarter kan begränsa hur nära porten en tung flyttbil kan ta sig. Nämn det om det gäller din adress.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni fritidshus i Ängelholmsområdet?",
        svar: "Beskriv bostaden och vad som ska flyttas i förfrågan. Ett fritidshus har ofta mindre bohag än ett permanentboende, och det ska offerten spegla.",
      },
      {
        fraga: "Ingår flyttstädning av villa?",
        svar: "Ja, flyttstädning beställs för både lägenhet och villa. Ange ungefärlig boyta och antal rum, eftersom en villa tar längre tid än en lägenhet av samma yta.",
      },
    ],
    stadsdelar: [
      {
        namn: "Centrum kring Storgatan",
        text: "Lägre flerbostadshus i två till fyra plan. Hiss förekommer men är inte självklart i de äldre husen, så våningsplanet är värt att ange.",
      },
      {
        namn: "Villastaden och Nya staden",
        text: "Villaområden nära centrum med kort bärväg men stora bohag. Gatorna är normalbreda med rimlig framkomlighet.",
      },
      {
        namn: "Hjärnarp och Strövelstorp",
        text: "Tätorter i kommunen med eget avstånd till centralorten. Transportsträckan räknas in, så ange exakt adress.",
      },
      {
        namn: "Vejbystrand och kusten",
        text: "Kustnära bebyggelse med stort inslag av före detta fritidshus. Smala gator och grusade infarter förekommer.",
      },
    ],
    fordjupning: [
      {
        rubrik: "Hög andel villor",
        stycken: [
          "Ängelholm har fler villor och radhus än de flesta skånska städer av samma storlek. Det gör att bärvägen oftast är kort, men bohaget större: garage, förråd, vind och uteplats innehåller tillsammans betydligt mer än boytan antyder. Gå igenom dem innan du uppskattar storleken i förfrågan.",
        ],
      },
      {
        rubrik: "Sommaren är högsäsong",
        stycken: [
          "Närheten till Skälderviken och stränderna gör att både fritidsboenden och permanentbostäder byter ägare kring sommaren. Det sammanfaller med att juni till augusti är branschens mest efterfrågade period, vilket gör framförhållning extra värdefull här.",
        ],
      },
      {
        rubrik: "Bra läge vid E6",
        stycken: [
          "Ängelholm ligger nära E6 med korta transportsträckor till Helsingborg, Halmstad och Båstad. Det gör att tiden på plats i bostäderna dominerar uppdraget snarare än körsträckan, vilket i sin tur gör offerten mer förutsägbar.",
        ],
      },
    ],
    narliggande: ["helsingborg", "halmstad", "landskrona"],
  },
  {
    slug: "halmstad",
    typ: "storstad",
    namn: "Halmstad",
    iOrt: "Halmstad",
    lan: "Hallands län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Halmstad. Beskriv din bostad och ditt datum och få en tydlig offert från Nyflytt.",
    ingress:
      "Flyttar du i Halmstad eller till staden? Beskriv bostaden och datumet så får du en offert med tydlig omfattning.",
    omOrten: [
      "Halmstad är vår enda ort i Hallands län. Länsgränsen spelar ingen praktisk roll, men avståndet gör det – en flytt härifrån till Malmö är betydligt längre än en flytt inom Skåne.",
      "Centrum har flerbostadshus där hiss förekommer men inte är regel, medan Vallås och Andersberg till stor del har hiss. Söndrum och Frösakull mot kusten är villadominerade med större bohag och kort bärväg.",
      "Högskolan ger ett studentinslag kring terminsstart, och fritidsbebyggelsen mot Tylösand byter ägare framför allt på sommaren. Båda gör framförhållning extra värdefull.",
    ],
    bebyggelse:
      "Flerbostadshus i centrum och i ytterområdena, villaområden mot kusten, samt studentbostäder.",
    vanligaStrackor: [
      "Inom Halmstad, till exempel centrum till Söndrum eller Vallås",
      "Halmstad–Ängelholm och Halmstad–Helsingborg",
      "Halmstad–Malmö",
    ],
    praktiskt: [
      {
        rubrik: "Längre transportsträckor söderut",
        text: "Halmstad ligger en bit från de skånska orterna. Vid flytt till exempelvis Malmö blir transporttiden en tydlig del av uppdraget – ange båda adresserna så blir offerten rätt.",
      },
      {
        rubrik: "Terminsstart",
        text: "Kring augusti och januari ökar efterfrågan på mindre flyttar i staden. Skicka förfrågan tidigt om din flytt sammanfaller med terminsstart.",
      },
      {
        rubrik: "Kustnära adresser",
        text: "Smala vägar och sandiga infarter i kustområdena kan begränsa framkomligheten för en större flyttbil. Nämn det om det gäller din adress.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni med flytt mellan Halland och Skåne?",
        svar: "Ja. Ange både från- och tilladress i förfrågan, eftersom sträckan påverkar tidsåtgång och offert.",
      },
      {
        fraga: "Kan jag boka bara flyttstädning i Halmstad?",
        svar: "Ja. Välj städ i offertformuläret om du sköter flytten själv men vill att flyttstädningen utförs av en samarbetspartner.",
      },
    ],
    stadsdelar: [
      {
        namn: "Centrum och Norre Port",
        text: "Flerbostadshus där hiss förekommer men inte är regel. Gatuparkering är begränsad i de centrala kvarteren, så uppställning nära porten kan behöva planeras.",
      },
      {
        namn: "Vallås och Andersberg",
        text: "Flerfamiljshus med hiss och gott om plats att ställa flyttbilen. Mängden bohag blir det som styr offerten snarare än bärvägen.",
      },
      {
        namn: "Linehed och Nyhem",
        text: "Blandad bebyggelse med både flerbostadshus och mindre villor. Förutsättningarna varierar från gata till gata, så exakt adress gör offerten mer träffsäker.",
      },
      {
        namn: "Söndrum och Frösakull",
        text: "Villadominerade områden mot kusten. Kort bärväg men stora bohag, och vissa infarter är smala eller sandiga vilket begränsar hur nära en tung bil kan ta sig.",
      },
    ],
    fordjupning: [
      {
        rubrik: "Halland, inte Skåne",
        stycken: [
          "Halmstad är den enda av våra orter som ligger i Hallands län. För dig som flyttar spelar länsgränsen ingen praktisk roll, men avståndet gör det. En flytt Halmstad–Malmö är betydligt längre än en flytt inom Skåne, och transporttiden blir då en påtaglig del av uppdraget.",
        ],
      },
      {
        rubrik: "Högskolan och terminsstart",
        stycken: [
          "Högskolan i Halmstad gör att staden har ett studentinslag som märks i flyttmönstret. Kring augusti och januari ökar antalet mindre flyttar – studentrum och ettor – under några koncentrerade veckor.",
        ],
      },
      {
        rubrik: "Kusten och sommarsäsongen",
        stycken: [
          "Fritidsbebyggelsen mot Tylösand och Haverdal byter i stor utsträckning ägare under sommarhalvåret. Det sammanfaller med att sommaren är högsäsong för flytt generellt, vilket gör juni till augusti till den mest efterfrågade perioden i Halmstad.",
        ],
      },
    ],
    narliggande: ["angelholm", "helsingborg"],
  },
  {
    slug: "kristianstad",
    typ: "storstad",
    namn: "Kristianstad",
    iOrt: "Kristianstad",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Kristianstad. Beskriv bostad, storlek och datum och få en tydlig offert från Nyflytt.",
    ingress:
      "Ska du flytta i Kristianstad? Berätta om bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Kristianstad ligger i östra Skåne, vilket gör flyttsträckorna annorlunda än för orterna längs västkusten. En flytt till Malmö eller Helsingborg går tvärs över Skåne och transporttiden blir en tydlig del av uppdraget.",
      "Centrum har en rutnätsstruktur från 1600-talet med raka men delvis smala gator. Bebyggelsen är blandad, och hiss förekommer i de nyare husen men är inte given i de äldre.",
      "Till kommunen hör också Åhus, Degeberga och Tollarp. Avståndet till centralorten räknas in i uppdraget, så ange alltid den faktiska adressen och inte bara kommunen.",
    ],
    bebyggelse:
      "Blandad bebyggelse i rutnätsstaden, flerbostadshus i ytterområdena och villor i utkanten. Fritidsbebyggelse mot Åhus.",
    vanligaStrackor: [
      "Inom Kristianstad, till exempel centrum till Näsby eller Vilan",
      "Kristianstad–Hässleholm",
      "Kristianstad–Åhus och Kristianstad–Malmö",
    ],
    praktiskt: [
      {
        rubrik: "Smala gator i rutnätsstaden",
        text: "I de centrala kvarteren kan uppställning nära porten vara svår trots den raka gatustrukturen. Beskriv gatan om du vet att den är trång eller enkelriktad.",
      },
      {
        rubrik: "Orter i kommunen",
        text: "Flytt till eller från Åhus, Degeberga eller Tollarp innebär en transportsträcka från centralorten. Ange den faktiska adressen, inte bara kommunen.",
      },
      {
        rubrik: "Tvärgående flytt i Skåne",
        text: "Kristianstad–Malmö och Kristianstad–Helsingborg är längre sträckor än de flesta flyttar i västra Skåne. Ha båda adresserna klara när du begär offert.",
      },
    ],
    fragor: [
      {
        fraga: "Täcker ni Åhus och andra orter i kommunen?",
        svar: "Ange den faktiska adressen i förfrågan, så återkommer vi med vad vi kan erbjuda. Avståndet från centralorten påverkar offerten.",
      },
      {
        fraga: "Kan ni ta både flytt och städ i Kristianstad?",
        svar: "Ja. Välj flytt och städ i formuläret, så samordnas datumen så att städningen sker efter att bostaden är tömd.",
      },
    ],
    stadsdelar: [
      {
        namn: "Centrum och rutnätsstaden",
        text: "1600-talets raka gatunät med blandad bebyggelse. Hiss finns i de nyare husen men inte i de äldre, och vissa gator är smala trots den raka strukturen.",
      },
      {
        namn: "Näsby",
        text: "Flerbostadshus med hiss och goda uppställningsmöjligheter, nära högskolan. Flytten blir här mer förutsägbar än i centrum.",
      },
      {
        namn: "Vilan och Hammar",
        text: "Villaområden söder om centrum. Kort bärväg men större bohag – garage och förråd rymmer ofta mer än väntat.",
      },
      {
        namn: "Österäng och Gamlegården",
        text: "Flerbostadshus med hiss och gott om plats att ställa bilen. Mängden bohag blir det som styr offerten.",
      },
    ],
    fordjupning: [
      {
        rubrik: "Låglänt mark och Helge å",
        stycken: [
          "Kristianstad ligger på Sveriges lägsta punkt, och staden är byggd kring Helge å med vallar som skydd. För en flytt betyder det att vissa adresser nås via smalare vägar längs vattendragen, där en tung flyttbil kan ha begränsad framkomlighet.",
        ],
      },
      {
        rubrik: "Tvärgående flytt i Skåne",
        stycken: [
          "Kristianstad–Malmö och Kristianstad–Helsingborg är betydligt längre sträckor än de flesta flyttar i västra Skåne. Transporttiden blir en tydlig del av uppdraget, så ha båda adresserna klara när du begär offert.",
        ],
      },
      {
        rubrik: "Orterna i kommunen",
        stycken: [
          "Åhus, Degeberga och Tollarp ligger alla i Kristianstads kommun men har eget avstånd till centralorten. Särskilt Åhus skiljer sig, eftersom fritidsbebyggelsen där koncentrerar flyttarna till sommarhalvåret. Ange alltid den faktiska adressen.",
        ],
      },
    ],
    narliggande: ["hassleholm", "malmo", "lund"],
  },
  {
    slug: "hassleholm",
    typ: "mindre",
    namn: "Hässleholm",
    iOrt: "Hässleholm",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Hässleholm. Beskriv din bostad och ditt önskade datum och få en tydlig offert från Nyflytt.",
    ingress:
      "Planerar du en flytt i Hässleholm? Beskriv bostaden och datumet och få en offert där omfattningen framgår.",
    omOrten: [
      "Hässleholm växte fram kring järnvägen, och centrum är relativt tätt medan villabebyggelsen börjar tidigt utanför kärnan. Uppdragen varierar därför mycket mellan lägenhetsflytt och villaflytt bara några kilometer bort.",
      "De centrala flerbostadshusen är mest från 1900-talets mitt och senare. Hiss är vanligare här än i kuststädernas sekelskifteskvarter, men förekommer inte överallt.",
      "Kommunen är stor till ytan och rymmer flera tätorter – Tyringe, Bjärnum, Vinslöv och Sösdala. En flytt inom kommunen kan därför innebära en sträcka som motsvarar en flytt mellan två städer på västkusten.",
    ],
    bebyggelse:
      "Flerbostadshus från mitten av 1900-talet i centrum, villabebyggelse strax utanför, samt flera tätorter i kommunen.",
    vanligaStrackor: [
      "Inom Hässleholm och till kommunens tätorter som Tyringe och Vinslöv",
      "Hässleholm–Kristianstad",
      "Hässleholm–Lund och Hässleholm–Malmö",
    ],
    praktiskt: [
      {
        rubrik: "Stor kommun, långa avstånd",
        text: "En flytt mellan två tätorter i kommunen kan vara längre än man tror. Ange den exakta adressen så att transportsträckan kommer med i offerten.",
      },
      {
        rubrik: "Pendlingsflytt söderut",
        text: "Flytt till Lund eller Malmö innebär en tydlig transportsträcka. Ska flyttstädningen ske nära flyttdagen behöver tidsplanen ta hänsyn till det.",
      },
      {
        rubrik: "Villaflytt nära centrum",
        text: "Villabebyggelsen börjar nära stadskärnan. Vid villaflytt är det bohagets mängd, inklusive garage och förråd, som styr offerten mest.",
      },
    ],
    fragor: [
      {
        fraga: "Gäller offerten även Tyringe och Bjärnum?",
        svar: "Ange den faktiska adressen i förfrågan. Avståndet till centralorten påverkar offerten, så exakt adress ger ett mer träffsäkert underlag.",
      },
      {
        fraga: "Kan jag få hjälp med bara flytten?",
        svar: "Ja. Välj flytt i formuläret om du sköter städningen själv. Du kan alltid komplettera med flyttstädning senare.",
      },
    ],
    narliggande: ["kristianstad", "lund", "helsingborg"],
  },
  {
    slug: "lund",
    typ: "storstad",
    namn: "Lund",
    iOrt: "Lund",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Lund. Beskriv bostad, storlek och datum och få en tydlig offert från Nyflytt.",
    ingress:
      "Ska du flytta i Lund? Berätta om bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Lund präglas av universitetet mer än någon annan av våra orter. Kring terminsstart sker ett stort antal mindre flyttar under några få veckor, främst studentrum och ettor.",
      "Den medeltida stadskärnan ställer egna krav. Kvarteren kring Domkyrkan har gågator och trafikbegränsningar som gör att flyttbilen sällan kan stå vid porten, och husen är gamla med trånga trapphus.",
      "Utanför centrum är bilden en annan. Norra Fäladen, Linero och Klostergården har flerbostadshus med hiss och rimliga uppställningsmöjligheter, vilket gör flytten betydligt mer förutsägbar.",
    ],
    bebyggelse:
      "Medeltida stadskärna med äldre fastigheter, stora studentbostadsområden och flerbostadshus med hiss i ytterområdena.",
    vanligaStrackor: [
      "Inom Lund, till exempel centrum till Norra Fäladen eller Linero",
      "Lund–Malmö",
      "Lund–Helsingborg och Lund–Landskrona",
    ],
    praktiskt: [
      {
        rubrik: "Terminsstart är högsäsong",
        text: "Slutet av augusti och januari är de mest efterfrågade perioderna. Är du bunden till ett datum kring terminsstart, skicka förfrågan så tidigt du kan.",
      },
      {
        rubrik: "Gågator i stadskärnan",
        text: "I de medeltida kvarteren kan flyttbilen behöva stå en bit bort. Nämn i förfrågan om adressen ligger på en gågata eller en gata med trafikbegränsning.",
      },
      {
        rubrik: "Studentbostäder",
        text: "Ett studentrum är ett litet uppdrag jämfört med en lägenhet. Ange bostadstyp så att offerten speglar den faktiska omfattningen.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni studentbostäder i Lund?",
        svar: "Ja. Ange bostadstyp och ungefärlig storlek, så blir offerten anpassad till omfattningen. Kring terminsstart är det klokt att skicka förfrågan i god tid.",
      },
      {
        fraga: "Hur fungerar flyttstädning för studentbostad?",
        svar: "Samma moment som för en lägenhet, men i mindre omfattning. Bostaden behöver vara tömd innan städningen börjar.",
      },
    ],
    stadsdelar: [
      {
        namn: "Centrum och Kulturen-kvarteren",
        text: "Medeltida gatunät med smala gator, gågator och begränsad biltrafik. Flyttbilen kan sällan stå vid porten, och fastigheterna är gamla med trånga trapphus utan hiss.",
      },
      {
        namn: "Norra Fäladen",
        text: "Flerbostadshus med hiss och goda uppställningsmöjligheter. Ett av de områden där en flytt är som mest förutsägbar i Lund.",
      },
      {
        namn: "Klostergården och Linero",
        text: "Flerfamiljshus från 1960- och 70-talet, nästan alltid med hiss. Gott om plats att ställa bilen, vilket håller nere tidsåtgången.",
      },
      {
        namn: "Delphi, Sparta, Vildanden och Ulrikedal",
        text: "Studentbostadsområden där flyttarna är små i volym men koncentrerade till terminsstart. Ett studentrum är ett betydligt mindre uppdrag än en lägenhet.",
      },
    ],
    fordjupning: [
      {
        rubrik: "Terminsstart styr tillgängligheten",
        stycken: [
          "Inget annat av våra områden har ett lika tydligt säsongsmönster som Lund. Kring terminsstart i slutet av augusti, och i mindre omfattning i januari, sker ett stort antal flyttar under loppet av ett par veckor.",
        ],
      },
      {
        rubrik: "Den medeltida stadskärnan",
        stycken: [
          "Kvarteren kring Domkyrkan, Kiliansgatan och Krafts torg har ett gatunät som är äldre än bilen. Gågator, trafikbegränsningar och smala passager gör att en större flyttbil ofta måste stå en bit från porten.",
        ],
      },
      {
        rubrik: "Studentbostad eller lägenhet?",
        stycken: [
          "Ett studentrum på tolv kvadratmeter och en tvåa på sextio är helt olika uppdrag, även om båda kallas lägenhet i dagligt tal. Ange bostadstyp i förfrågan så att offerten speglar den faktiska omfattningen.",
        ],
      },
    ],
    narliggande: ["malmo", "landskrona", "helsingborg"],
  },
  {
    slug: "trelleborg",
    typ: "mindre",
    namn: "Trelleborg",
    iOrt: "Trelleborg",
    lan: "Skåne län",
    metaBeskrivning:
      "Flytthjälp och flyttstädning i Trelleborg. Beskriv din bostad och ditt datum och få en tydlig offert från Nyflytt.",
    ingress:
      "Flyttar du i Trelleborg? Beskriv bostaden och när flytten ska ske, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Trelleborg är kompakt med centrum nära vattnet och bostadsområden norrut. Vid en flytt inom staden är det bostadens förutsättningar snarare än transporten som avgör tidsåtgången.",
      "Centrum består av lägre flerbostadshus i två till fyra våningar där hiss förekommer men långt ifrån alltid. Smygehamn och byarna längs kusten är villadominerade.",
      "Närheten till Malmö gör flytt mellan städerna vanlig. Sträckan är kort, så en flytt Trelleborg–Malmö planeras i praktiken mer som en lokal flytt än som en långdistansflytt.",
    ],
    bebyggelse:
      "Lägre flerbostadshus i centrum, villaområden norrut och längs kusten.",
    vanligaStrackor: [
      "Inom Trelleborg, till exempel centrum till Västervång",
      "Trelleborg–Malmö",
      "Trelleborg–Lund",
    ],
    praktiskt: [
      {
        rubrik: "Hiss saknas ofta i lägre hus",
        text: "I två- till fyravåningshus utan hiss är våningsplanet den uppgift som påverkar tidsåtgången mest. Ange det i förfrågan.",
      },
      {
        rubrik: "Kort sträcka till Malmö",
        text: "Flytt Trelleborg–Malmö planeras i praktiken som en lokal flytt. Det gör det enklare att lägga flytt och flyttstädning nära varandra i tid.",
      },
      {
        rubrik: "Adresser i byarna",
        text: "Flytt till eller från Smygehamn, Anderslöv eller Klagstorp innebär en transportsträcka från staden. Ange exakt adress i förfrågan.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni med flytt från Trelleborg till Malmö?",
        svar: "Ja, det är en av de vanligaste sträckorna. Ange båda adresserna i förfrågan så blir offerten rätt från början.",
      },
      {
        fraga: "Kan jag boka flyttstädning utan flytthjälp?",
        svar: "Ja. Välj städ i offertformuläret. Bostaden behöver vara tömd på bohag innan städningen utförs.",
      },
    ],
    narliggande: ["malmo", "lund"],
  },

  // ---------------------------------------------------------------------------
  // Mindre orter.
  //
  // Varje ort har egen brödtext om läge, bebyggelse och pendlingsmönster –
  // allmänt kända förhållanden om orten, inte påståenden om Nyflytts
  // verksamhet där. Ingen av dem har `stadsdelar` eller `fordjupning`, vilket
  // är det som skiljer dem från storstadssidorna.
  // ---------------------------------------------------------------------------
  {
    slug: "odakra",
    typ: "mindre",
    namn: "Ödåkra",
    iOrt: "Ödåkra",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Ödåkra – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Ödåkra? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Ödåkra ligger i Helsingborgs kommun, strax nordost om staden, och har pågatågstation på Skånebanan. Orten är till stor del ett villa- och radhusområde, vilket betyder att bärvägen oftast är kort men bohaget desto större.",
      "Eftersom avståndet in till Helsingborg är kort går många flyttar mellan orterna. Det gör att flytt och flyttstädning ofta kan läggas nära varandra i tid, vilket underlättar när den gamla bostaden ska lämnas över.",
    ],
    bebyggelse:
      "Övervägande villor och radhus, med inslag av flerbostadshus nära stationen.",
    vanligaStrackor: [
      "Inom Ödåkra och närområdet",
      "Ödåkra–Helsingborg",
      "Ödåkra till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Villaflytt tar mer plats än man tror",
        text: "Garage, förråd och vind innehåller ofta mer än man räknar med. Gå igenom dem innan du uppskattar storleken i förfrågan.",
      },
      {
        rubrik: "Kort väg till Helsingborg",
        text: "Flytt mellan Ödåkra och Helsingborg planeras i praktiken som en lokal flytt, vilket gör tidsplaneringen enklare.",
      },
    ],
    fragor: [
      {
        fraga: "Ligger Ödåkra inom ert område?",
        svar: "Ja, Ödåkra ligger i Helsingborgs kommun och vi tar emot förfrågningar därifrån. Ange den faktiska gatuadressen så blir offerten mer träffsäker.",
      },
      {
        fraga: "Kan jag boka både flytt och städ?",
        svar: "Ja. Välj flytt och städ i formuläret, så planeras städningen efter att bostaden är tömd.",
      },
    ],
    narliggande: ["helsingborg", "hittarp", "viken"],
  },
  {
    slug: "hittarp",
    typ: "mindre",
    namn: "Hittarp",
    iOrt: "Hittarp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Hittarp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Hittarp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Hittarp ligger längs Öresundskusten norr om Helsingborg, mellan Laröd och Domsten. Bebyggelsen är nästan uteslutande villor, en del av dem ursprungligen sommarhus som byggts om för åretruntboende.",
      "Kustläget innebär att vissa gator är smala och att infarter kan vara branta eller grusade. Det påverkar hur nära porten en tyngre flyttbil kan ta sig, vilket i sin tur förlänger bärsträckan.",
    ],
    bebyggelse:
      "Kustnära villabebyggelse, delvis med äldre sommarhus som byggts om till permanentboende.",
    vanligaStrackor: [
      "Inom Hittarp och närområdet",
      "Hittarp–Helsingborg",
      "Hittarp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Smala kustgator",
        text: "Vägnätet närmast kusten är på sina håll trångt. Nämn i förfrågan om din gata är smal eller har begränsad vändmöjlighet.",
      },
      {
        rubrik: "Kort pendling till staden",
        text: "Avståndet till Helsingborg är kort, så en flytt däremellan räknas som lokal.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Hittarp?",
        svar: "Ja, Hittarp ligger i Helsingborgs kommun. Ange gatuadressen i förfrågan eftersom framkomligheten varierar mellan gatorna.",
      },
      {
        fraga: "Vad kostar flytt från villa?",
        svar: "Priset beror på mängden bohag, avstånd och eventuella specialföremål. Du får ett pris med tydlig omfattning i offerten.",
      },
    ],
    narliggande: ["helsingborg", "odakra", "viken"],
  },
  {
    slug: "rydeback",
    typ: "mindre",
    namn: "Rydebäck",
    iOrt: "Rydebäck",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Rydebäck – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Rydebäck? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Rydebäck ligger söder om Helsingborg längs kusten och är ett planerat samhälle som främst växte fram från 1960-talet. Bebyggelsen domineras av villor och radhus med jämförelsevis god framkomlighet på gatorna.",
      "Orten har pågatågstation, och pendlingen går åt båda håll – till Helsingborg i norr och Landskrona i söder. Flyttar mellan Rydebäck och de två städerna är därför vanliga.",
    ],
    bebyggelse:
      "Planerat villasamhälle från 1960- och 70-talet med inslag av radhus och nyare bebyggelse.",
    vanligaStrackor: [
      "Inom Rydebäck och närområdet",
      "Rydebäck–Helsingborg",
      "Rydebäck till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "God framkomlighet",
        text: "Som planerat samhälle har Rydebäck breda gator och gott om plats att ställa flyttbilen, vilket håller nere tidsåtgången.",
      },
      {
        rubrik: "Räkna med förråd och garage",
        text: "Villabebyggelsen innebär att bohaget ofta är större än boytan antyder.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni till och från Rydebäck?",
        svar: "Ja. Ange både från- och tilladress i förfrågan, eftersom sträckan påverkar offerten.",
      },
      {
        fraga: "Hur långt i förväg bör jag boka?",
        svar: "Så tidigt du kan, särskilt kring månadsskiften och under sommaren då efterfrågan är högst.",
      },
    ],
    narliggande: ["helsingborg", "landskrona", "odakra"],
  },
  {
    slug: "paarp",
    typ: "mindre",
    namn: "Påarp",
    iOrt: "Påarp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Påarp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Påarp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Påarp ligger sydost om Helsingborg och har pågatågstation på Skånebanan mot Hässleholm. Orten är liten och domineras av villor, med en del mindre flerbostadshus närmast stationen.",
      "Att orten ligger inåt landet innebär kortare transport till Helsingborg än från kustorterna norrut, men också att flyttar österut mot Hässleholm och Klippan förekommer.",
    ],
    bebyggelse:
      "Villabebyggelse och mindre flerbostadshus kring stationen.",
    vanligaStrackor: [
      "Inom Påarp och närområdet",
      "Påarp–Helsingborg",
      "Påarp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Litet samhälle, korta avstånd",
        text: "Inom Påarp är transportsträckan sällan avgörande. Det är bostadens förutsättningar som styr tidsåtgången.",
      },
      {
        rubrik: "Ange exakt adress",
        text: "Avståndet till Helsingborg räknas in i uppdraget, så exakt adress ger en mer träffsäker offert.",
      },
    ],
    fragor: [
      {
        fraga: "Är Påarp för litet för er?",
        svar: "Nej. Ange din adress i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Ingår montering av möbler?",
        svar: "Demontering och montering av standardmöbler som säng och bokhylla ingår i flytthjälpen.",
      },
    ],
    narliggande: ["helsingborg", "bjuv", "hyllinge"],
  },
  {
    slug: "barslov",
    typ: "mindre",
    namn: "Bårslöv",
    iOrt: "Bårslöv",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Bårslöv – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Bårslöv? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Bårslöv är en mindre tätort sydost om Helsingborg, omgiven av jordbrukslandskap. Bebyggelsen är nästan uteslutande villor och radhus i en till två våningar.",
      "Eftersom orten är liten och nära Helsingborg går de flesta flyttar antingen inom kommunen eller till någon av grannkommunerna. Transportsträckan är därmed kort.",
    ],
    bebyggelse:
      "Mindre tätort med övervägande villor och radhus.",
    vanligaStrackor: [
      "Inom Bårslöv och närområdet",
      "Bårslöv–Helsingborg",
      "Bårslöv till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Villaflytt dominerar",
        text: "Trappor är sällan ett problem här, men bohaget är ofta större än i en lägenhet av samma yta.",
      },
      {
        rubrik: "Landsvägar och infarter",
        text: "Några adresser ligger utmed mindre vägar med grusade infarter. Nämn det om det gäller din adress.",
      },
    ],
    fragor: [
      {
        fraga: "Kan ni hjälpa till i Bårslöv?",
        svar: "Ja, Bårslöv ligger i Helsingborgs kommun. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Måste jag packa själv?",
        svar: "Packning ingår inte som standard, men du kan ange i förfrågan att du vill ha packhjälp.",
      },
    ],
    narliggande: ["helsingborg", "paarp", "bjuv"],
  },
  {
    slug: "viken",
    typ: "mindre",
    namn: "Viken",
    iOrt: "Viken",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Viken – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Viken? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Viken är en gammal fiskeby på Kullahalvön med en välbevarad bykärna. De äldsta delarna har smala, slingrande gator och tätt placerade hus – förhållanden som märks tydligt vid en flytt.",
      "Runt den gamla byn finns nyare villabebyggelse med betydligt bättre framkomlighet. Vilken del av Viken adressen ligger i gör därför stor skillnad för hur uppdraget planeras.",
    ],
    bebyggelse:
      "Gammal fiskeby med tät äldre bebyggelse i kärnan och villaområden runtomkring.",
    vanligaStrackor: [
      "Inom Viken och närområdet",
      "Viken–Höganäs",
      "Viken till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Den gamla bykärnan",
        text: "Smala gränder gör att en större flyttbil ofta inte kommer ända fram. Bärsträckan blir längre än väntat – nämn det i förfrågan.",
      },
      {
        rubrik: "Nyare områden",
        text: "Utanför bykärnan är gatorna normalbreda med goda uppställningsmöjligheter.",
      },
    ],
    fragor: [
      {
        fraga: "Går det att flytta i gamla Viken?",
        svar: "Ja, men framkomligheten är begränsad i de äldsta kvarteren. Beskriv gatan i förfrågan så planeras uppdraget därefter.",
      },
      {
        fraga: "Hjälper ni med flytt till Danmark?",
        svar: "Beskriv flytten i förfrågan så återkommer vi med vad som är möjligt.",
      },
    ],
    narliggande: ["hoganas", "helsingborg", "hittarp"],
  },
  {
    slug: "hoganas",
    typ: "mindre",
    namn: "Höganäs",
    iOrt: "Höganäs",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Höganäs – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Höganäs? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Höganäs är centralort på Kullahalvön och präglas av sin historia som bruks- och gruvort. Centrum har flerbostadshus där hiss förekommer men inte är regel, medan ytterområdena domineras av villor.",
      "Kommunen är utsträckt och innehåller flera mindre orter som Viken, Nyhamnsläge och Jonstorp. Avståndet mellan dem innebär att en flytt inom kommunen kan ha en påtaglig transportsträcka.",
    ],
    bebyggelse:
      "Blandad bebyggelse med flerbostadshus i centrum och villaområden utanför, samt äldre bruksbebyggelse.",
    vanligaStrackor: [
      "Inom Höganäs och närområdet",
      "Höganäs–Viken",
      "Höganäs till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Hiss är inte självklart",
        text: "I de centrala flerbostadshusen varierar det. Ange våning och om hiss finns, så räknas rätt tid in från början.",
      },
      {
        rubrik: "Utsträckt kommun",
        text: "Flytt till eller från Nyhamnsläge, Jonstorp eller Arild innebär en sträcka från centralorten. Ange exakt adress.",
      },
    ],
    fragor: [
      {
        fraga: "Täcker ni hela Höganäs kommun?",
        svar: "Ange den faktiska adressen i förfrågan, så återkommer vi med vad vi kan erbjuda. Avståndet från centralorten påverkar offerten.",
      },
      {
        fraga: "Vad ingår i flyttstädning?",
        svar: "Hela bostaden städas inför överlämning. Exakt omfattning framgår av offerten.",
      },
    ],
    narliggande: ["viken", "helsingborg", "angelholm"],
  },
  {
    slug: "bjuv",
    typ: "mindre",
    namn: "Bjuv",
    iOrt: "Bjuv",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Bjuv – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Bjuv? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Bjuv har sin bakgrund i gruv- och industriverksamhet, vilket syns i bebyggelsen. Centrum har flerbostadshus från mitten av 1900-talet, ofta i tre till fyra våningar, medan ytterområdena är villadominerade.",
      "Orten ligger på Skånebanan med pågatåg mot både Helsingborg och Hässleholm. Pendling åt båda hållen är vanlig, och det märks i flyttmönstret.",
    ],
    bebyggelse:
      "Tidigare gruv- och industriort med flerbostadshus i centrum och villaområden runtomkring.",
    vanligaStrackor: [
      "Inom Bjuv och närområdet",
      "Bjuv–Billesholm",
      "Bjuv till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Hiss varierar i centrum",
        text: "Flerbostadshusen från mitten av 1900-talet har inte alltid hiss. Våningsplanet är därför en viktig uppgift.",
      },
      {
        rubrik: "Kommunens andra orter",
        text: "Billesholm och Ekeby ligger i samma kommun men har eget avstånd. Ange exakt adress.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i hela Bjuvs kommun?",
        svar: "Ange den faktiska adressen i förfrågan. Avståndet mellan kommunens orter påverkar offerten.",
      },
      {
        fraga: "Kan jag få hjälp med bara flytten?",
        svar: "Ja. Välj flytt i formuläret om du sköter städningen själv.",
      },
    ],
    narliggande: ["billesholm", "ekeby", "astorp"],
  },
  {
    slug: "billesholm",
    typ: "mindre",
    namn: "Billesholm",
    iOrt: "Billesholm",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Billesholm – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Billesholm? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Billesholm är en mindre tätort i Bjuvs kommun med bakgrund i gruvdriften i området. Bebyggelsen består mest av villor, med några mindre flerbostadshus närmast centrum.",
      "Orten har pågatågstation, och avstånden till Helsingborg och Landskrona är korta. Många flyttar går därför mot kuststäderna.",
    ],
    bebyggelse:
      "Mindre tätort med villor och enstaka flerbostadshus, präglad av sin gruvhistoria.",
    vanligaStrackor: [
      "Inom Billesholm och närområdet",
      "Billesholm–Bjuv",
      "Billesholm till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Mindre ort, kort bärväg",
        text: "Villabebyggelsen gör att trappor sällan är problemet. Mängden bohag styr i stället tidsåtgången.",
      },
      {
        rubrik: "Ange exakt adress",
        text: "Transportsträckan till närmaste stad räknas in, så gatuadressen gör offerten mer träffsäker.",
      },
    ],
    fragor: [
      {
        fraga: "Är Billesholm för litet?",
        svar: "Nej. Skicka in din förfrågan med gatuadress så återkommer vi.",
      },
      {
        fraga: "Hur snabbt får jag svar?",
        svar: "Vi återkommer så snart vi gått igenom förfrågan. Skicka in i god tid om du har ett bestämt datum.",
      },
    ],
    narliggande: ["bjuv", "ekeby", "astorp"],
  },
  {
    slug: "ekeby",
    typ: "mindre",
    namn: "Ekeby",
    iOrt: "Ekeby",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Ekeby – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Ekeby? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Ekeby är en liten tätort i Bjuvs kommun, omgiven av jordbruksmark. Bebyggelsen är i huvudsak villor i en till två våningar, med kort bärväg men ofta stora bohag.",
      "Närheten till Helsingborg och Åstorp gör att flyttar oftast går mot dessa orter. Avståndet är kort nog att flytt och städning kan planeras tätt.",
    ],
    bebyggelse:
      "Liten tätort med övervägande villabebyggelse.",
    vanligaStrackor: [
      "Inom Ekeby och närområdet",
      "Ekeby–Bjuv",
      "Ekeby till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Villor dominerar",
        text: "Räkna med att garage och förråd rymmer mer än väntat när du uppskattar storleken.",
      },
      {
        rubrik: "Landsvägsadresser",
        text: "Ligger bostaden utanför tätorten kan infarten vara grusad eller smal. Nämn det i förfrågan.",
      },
    ],
    fragor: [
      {
        fraga: "Kan ni komma till Ekeby?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Ingår flyttkartonger?",
        svar: "Flyttfiltar och spännband ingår. Kartonger ingår inte som standard, men kan läggas till.",
      },
    ],
    narliggande: ["bjuv", "billesholm", "astorp"],
  },
  {
    slug: "astorp",
    typ: "mindre",
    namn: "Åstorp",
    iOrt: "Åstorp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Åstorp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Åstorp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Åstorp ligger vid Söderåsens västra sluttning och är en järnvägsknut där Skånebanan möter Godsstråket. Centrum kring stationen har flerbostadshus, medan resten av orten domineras av villor.",
      "Läget gör att pendling sker åt flera håll – Helsingborg, Ängelholm och Klippan ligger alla inom rimligt avstånd. Flyttmönstret är därför spritt.",
    ],
    bebyggelse:
      "Centralort med flerbostadshus kring stationen och villaområden utanför.",
    vanligaStrackor: [
      "Inom Åstorp och närområdet",
      "Åstorp–Bjuv",
      "Åstorp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Stationsnära lägenheter",
        text: "I kvarteren kring stationen är flerbostadshus vanligast. Ange våning och hiss.",
      },
      {
        rubrik: "Söderåsens topografi",
        text: "Adresser närmare åsen kan ha branta infarter som begränsar framkomligheten för en tung bil.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni mellan Åstorp och Helsingborg?",
        svar: "Ja, det är en kort och vanlig sträcka. Ange båda adresserna i förfrågan.",
      },
      {
        fraga: "Vad påverkar priset mest?",
        svar: "Mängden bohag, avstånd, samt våning och hiss. Därför frågar vi efter det i formuläret.",
      },
    ],
    narliggande: ["bjuv", "klippan", "angelholm"],
  },
  {
    slug: "klippan",
    typ: "mindre",
    namn: "Klippan",
    iOrt: "Klippan",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Klippan – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Klippan? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Klippan ligger vid Rönne å och har en historia som bruksort med pappersindustri. Centrum har flerbostadshus från olika epoker där hiss förekommer i de nyare, medan ytterområdena är villadominerade.",
      "Kommunen rymmer också Ljungbyhed och Östra Ljungby, som ligger en bit från centralorten. En flytt inom kommunen kan därför innebära en reell transportsträcka.",
    ],
    bebyggelse:
      "Centralort med blandad bebyggelse: flerbostadshus i centrum, villor utanför.",
    vanligaStrackor: [
      "Inom Klippan och närområdet",
      "Klippan–Åstorp",
      "Klippan till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Varierande hisstillgång",
        text: "Beståndet i centrum spänner över flera decennier. Ange våning och om hiss finns.",
      },
      {
        rubrik: "Kommunens andra orter",
        text: "Ljungbyhed ligger några mil från Klippan. Ange exakt adress så räknas sträckan in.",
      },
    ],
    fragor: [
      {
        fraga: "Täcker ni hela Klippans kommun?",
        svar: "Ange den faktiska adressen i förfrågan så återkommer vi. Avståndet påverkar offerten.",
      },
      {
        fraga: "Kan jag boka flytt och städ samtidigt?",
        svar: "Ja, och det är oftast smidigast. Då samordnas datumen.",
      },
    ],
    narliggande: ["astorp", "ljungbyhed", "perstorp"],
  },
  {
    slug: "ljungbyhed",
    typ: "mindre",
    namn: "Ljungbyhed",
    iOrt: "Ljungbyhed",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Ljungbyhed – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Ljungbyhed? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Ljungbyhed är känt för sin flyghistoria och har en bebyggelse som delvis växte fram kring flottiljen. I dag är orten övervägande villabebyggd, med en del äldre bostadshus från militärtiden.",
      "Orten ligger en bit från Klippan, och avståndet in till större städer är längre än för många andra skånska tätorter. Transporttiden blir därmed en tydligare del av uppdraget.",
    ],
    bebyggelse:
      "Mindre tätort med villor och bebyggelse kopplad till den tidigare flygflottiljen.",
    vanligaStrackor: [
      "Inom Ljungbyhed och närområdet",
      "Ljungbyhed–Klippan",
      "Ljungbyhed till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Längre transportsträcka",
        text: "Ljungbyhed ligger en bit från kuststäderna. Ange båda adresserna så blir offerten rätt från början.",
      },
      {
        rubrik: "Blandad bebyggelse",
        text: "Både villor och äldre flerbostadshus förekommer. Våning och hiss är värda att ange.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Ljungbyhed?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Hur bedömer ni storleken?",
        svar: "Vi utgår från boyta, antal rum och bostadstyp. Ungefärliga uppgifter räcker.",
      },
    ],
    narliggande: ["klippan", "perstorp", "astorp"],
  },
  {
    slug: "perstorp",
    typ: "mindre",
    namn: "Perstorp",
    iOrt: "Perstorp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Perstorp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Perstorp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Perstorp är starkt präglat av sin kemiska industri, och bebyggelsen växte fram i takt med fabriken. Centrum har flerbostadshus från 1900-talets mitt och senare, medan ytterområdena är villadominerade.",
      "Orten ligger i norra Skåne med pågatåg mot Helsingborg och Hässleholm. Flyttar härifrån går ofta söderut mot kusten eller österut mot Hässleholm.",
    ],
    bebyggelse:
      "Industriort med flerbostadshus i centrum och villaområden runtomkring.",
    vanligaStrackor: [
      "Inom Perstorp och närområdet",
      "Perstorp–Klippan",
      "Perstorp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Flerbostadshus från mitten av 1900-talet",
        text: "Hiss förekommer men är inte given. Ange våningsplan i förfrågan.",
      },
      {
        rubrik: "Längre sträckor söderut",
        text: "En flytt till Malmö eller Lund är en reell transportsträcka som räknas in i offerten.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Perstorp?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir bedömningen mer träffsäker.",
      },
      {
        fraga: "Vad händer efter att jag skickat förfrågan?",
        svar: "Vi går igenom uppgifterna och återkommer med en offert. Du binder dig inte.",
      },
    ],
    narliggande: ["klippan", "hassleholm", "orkelljunga"],
  },
  {
    slug: "orkelljunga",
    typ: "mindre",
    namn: "Örkelljunga",
    iOrt: "Örkelljunga",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Örkelljunga – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Örkelljunga? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Örkelljunga ligger i norra Skåne längs E4:an, vilket ger god framkomlighet för tyngre fordon. Bebyggelsen är övervägande villor, med mindre flerbostadshus i centrum.",
      "Läget vid motorvägen gör att både Helsingborg och Halmstad nås relativt snabbt. Flyttar går åt båda hållen, och transportsträckan är förutsägbar.",
    ],
    bebyggelse:
      "Centralort med villabebyggelse och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Örkelljunga och närområdet",
      "Örkelljunga–Perstorp",
      "Örkelljunga till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Bra vägförbindelser",
        text: "E4:an gör transporten dit och därifrån smidig, vilket håller nere oförutsedd tidsåtgång.",
      },
      {
        rubrik: "Landsbygdsadresser",
        text: "Delar av kommunen är glesbebyggd med mindre vägar. Ange exakt adress.",
      },
    ],
    fragor: [
      {
        fraga: "Är Örkelljunga inom ert område?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Kan ni flytta till Halland?",
        svar: "Ja. Ange både från- och tilladress eftersom sträckan påverkar offerten.",
      },
    ],
    narliggande: ["perstorp", "angelholm", "munka-ljungby"],
  },
  {
    slug: "bastad",
    typ: "mindre",
    namn: "Båstad",
    iOrt: "Båstad",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Båstad – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Båstad? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Båstad ligger på Bjärehalvön med Hallandsåsen i ryggen. Bebyggelsen har ett stort inslag av villor och fritidshus, och många fastigheter ligger i sluttande terräng ned mot Laholmsbukten.",
      "Säsongsvariationen är tydligare här än på de flesta andra orter. Sommaren innebär både fler flyttar och mer trafik, vilket påverkar framkomligheten i de centrala delarna.",
    ],
    bebyggelse:
      "Blandad bebyggelse med äldre villor, fritidshus och nyare bostadsområden.",
    vanligaStrackor: [
      "Inom Båstad och närområdet",
      "Båstad–Förslöv",
      "Båstad till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Backig terräng",
        text: "Hallandsåsens sluttning gör att många infarter är branta. Nämn det om det gäller din adress.",
      },
      {
        rubrik: "Högsäsong på sommaren",
        text: "Juni till augusti är den mest efterfrågade perioden. Skicka förfrågan tidigt om du har ett bestämt datum.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni fritidshus i Båstad?",
        svar: "Ja. Beskriv vad som ska flyttas – ett fritidshus har oftast mindre bohag än ett permanentboende.",
      },
      {
        fraga: "Kan ni hjälpa till över länsgränsen?",
        svar: "Ja. Ange båda adresserna så räknas sträckan in i offerten.",
      },
    ],
    narliggande: ["forslov", "vejbystrand", "angelholm"],
  },
  {
    slug: "forslov",
    typ: "mindre",
    namn: "Förslöv",
    iOrt: "Förslöv",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Förslöv – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Förslöv? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Förslöv ligger på Bjärehalvöns södra sida med station på Västkustbanan. Orten är liten och domineras av villor, med en del nyare bebyggelse kring stationsområdet.",
      "Tågförbindelsen gör att pendling mot både Ängelholm och Halmstad är vanlig. Flyttar följer ofta samma mönster.",
    ],
    bebyggelse:
      "Mindre tätort med övervägande villabebyggelse.",
    vanligaStrackor: [
      "Inom Förslöv och närområdet",
      "Förslöv–Båstad",
      "Förslöv till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Villabebyggelse",
        text: "Kort bärväg men ofta stort bohag. Gå igenom förråd och garage innan du uppskattar storleken.",
      },
      {
        rubrik: "Stationsnära nybyggnation",
        text: "I de nyare kvarteren är framkomligheten god och uppställning sällan ett problem.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Förslöv?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Ingår bärhjälp i alla våningar?",
        svar: "Ja, bärhjälp in och ut ur bostaden ingår. Våning och hiss påverkar dock tidsåtgången.",
      },
    ],
    narliggande: ["bastad", "vejbystrand", "angelholm"],
  },
  {
    slug: "vejbystrand",
    typ: "mindre",
    namn: "Vejbystrand",
    iOrt: "Vejbystrand",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Vejbystrand – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Vejbystrand? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Vejbystrand är ett kustsamhälle norr om Ängelholm där en stor del av bebyggelsen ursprungligen var fritidshus. Många har byggts om för permanentboende, men karaktären med trädgårdar och smala gator finns kvar.",
      "Sommarhalvåret är den period då flest flyttar sker här, både för att fritidsfastigheter byter ägare och för att det sammanfaller med branschens högsäsong.",
    ],
    bebyggelse:
      "Kustsamhälle med stort inslag av fritidshus och villor.",
    vanligaStrackor: [
      "Inom Vejbystrand och närområdet",
      "Vejbystrand–Angelholm",
      "Vejbystrand till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Smala gator i sommarområdena",
        text: "Vägnätet i de äldsta delarna är trångt. Nämn i förfrågan om din gata är smal.",
      },
      {
        rubrik: "Fritidshus har mindre bohag",
        text: "Beskriv vad som faktiskt ska flyttas så speglar offerten den verkliga omfattningen.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni fritidshus?",
        svar: "Ja. Ange bostadstyp och ungefärlig mängd bohag i förfrågan.",
      },
      {
        fraga: "Hur långt i förväg bör jag boka på sommaren?",
        svar: "Så tidigt som möjligt – juni till augusti är den mest efterfrågade perioden.",
      },
    ],
    narliggande: ["angelholm", "bastad", "munka-ljungby"],
  },
  {
    slug: "munka-ljungby",
    typ: "mindre",
    namn: "Munka-Ljungby",
    iOrt: "Munka-Ljungby",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Munka-Ljungby – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Munka-Ljungby? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Munka-Ljungby ligger nordost om Ängelholm, en bit in i landet från kusten. Orten är övervägande villabebyggd med några mindre flerbostadshus i centrum.",
      "Avståndet till Ängelholm är kort, vilket gör att många flyttar går mellan orterna. Längre flyttar går oftast söderut mot Helsingborg.",
    ],
    bebyggelse:
      "Tätort med villabebyggelse och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Munka-Ljungby och närområdet",
      "Munka-Ljungby–Angelholm",
      "Munka-Ljungby till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nära Ängelholm",
        text: "Flytt mellan orterna planeras som en lokal flytt, vilket gör tidsplaneringen enklare.",
      },
      {
        rubrik: "Villaflytt",
        text: "Räkna med att garage, förråd och vind innehåller mer än man först tror.",
      },
    ],
    fragor: [
      {
        fraga: "Är Munka-Ljungby inom ert område?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Kan jag ändra datum efter att jag skickat?",
        svar: "Hör av dig till oss så ser vi vad som går att lösa.",
      },
    ],
    narliggande: ["angelholm", "orkelljunga", "vejbystrand"],
  },
  {
    slug: "hyllinge",
    typ: "mindre",
    namn: "Hyllinge",
    iOrt: "Hyllinge",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Hyllinge – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Hyllinge? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Hyllinge ligger i Åstorps kommun mellan Helsingborg och Åstorp. Orten är liten med övervägande villa- och radhusbebyggelse, och har ett handelsområde strax intill.",
      "Närheten till både Helsingborg och Åstorp gör att flyttar går åt båda hållen. Transportsträckan är kort oavsett riktning.",
    ],
    bebyggelse:
      "Mindre tätort med villor och radhus.",
    vanligaStrackor: [
      "Inom Hyllinge och närområdet",
      "Hyllinge–Åstorp",
      "Hyllinge till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Korta avstånd",
        text: "Transporttiden är sällan avgörande. Bostadens förutsättningar styr i stället tidsåtgången.",
      },
      {
        rubrik: "Radhus och villor",
        text: "Bärvägen är kort men bohaget ofta större än i en lägenhet av samma yta.",
      },
    ],
    fragor: [
      {
        fraga: "Kan ni komma till Hyllinge?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir offerten mer träffsäker.",
      },
      {
        fraga: "Vad ingår i flytthjälpen?",
        svar: "Bärhjälp, transport, flyttfiltar och spännband samt montering av standardmöbler.",
      },
    ],
    narliggande: ["astorp", "bjuv", "helsingborg"],
  },
  {
    slug: "dalby",
    typ: "mindre",
    namn: "Dalby",
    iOrt: "Dalby",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Dalby – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Dalby? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Dalby ligger sydost om Lund vid Romeleåsens norra fot. Orten har vuxit en hel del de senaste decennierna, och bebyggelsen blandar äldre villor med nyare radhus- och flerbostadsområden.",
      "Närheten till Lund gör att många pendlar, och flyttar mellan Dalby och Lund är bland de vanligaste här. Avståndet är kort nog att flytt och städning kan planeras tätt.",
    ],
    bebyggelse:
      "Tätort med blandad bebyggelse: villor, radhus och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Dalby och närområdet",
      "Dalby–Lund",
      "Dalby till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Varierad bebyggelse",
        text: "Allt från äldre villor till nyproducerade radhus finns här. Ange bostadstyp och våning i förfrågan.",
      },
      {
        rubrik: "Kort väg till Lund",
        text: "En flytt Dalby–Lund planeras i praktiken som en lokal flytt.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Dalby?",
        svar: "Ja, Dalby ligger i Lunds kommun. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Kan jag boka städning utan flytthjälp?",
        svar: "Ja. Välj städ i formuläret om du sköter flytten själv.",
      },
    ],
    narliggande: ["lund", "veberod", "sodra-sandby"],
  },
  {
    slug: "sodra-sandby",
    typ: "mindre",
    namn: "Södra Sandby",
    iOrt: "Södra Sandby",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Södra Sandby – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Södra Sandby? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Södra Sandby ligger öster om Lund och är en av kommunens större tätorter utanför staden. Bebyggelsen domineras av villor och radhus, med inslag av flerbostadshus i de centrala delarna.",
      "Pendlingen till Lund är omfattande, och flyttar mellan orterna sker året runt. Kring terminsstart märks också Lunds studentflyttar indirekt här.",
    ],
    bebyggelse:
      "Tätort med övervägande villor och radhus, samt några flerbostadsområden.",
    vanligaStrackor: [
      "Inom Södra Sandby och närområdet",
      "Södra Sandby–Lund",
      "Södra Sandby till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Villa- och radhusområden",
        text: "Bärvägen är kort, men bohaget är ofta större än boytan antyder.",
      },
      {
        rubrik: "Nära Lund",
        text: "Korta avstånd gör att flytt och flyttstädning kan läggas nära varandra i tid.",
      },
    ],
    fragor: [
      {
        fraga: "Är Södra Sandby inom ert område?",
        svar: "Ja, orten ligger i Lunds kommun. Ange adressen i förfrågan.",
      },
      {
        fraga: "Hur mycket kostar en flytt?",
        svar: "Priset beror på bohag, avstånd, våning och hiss. Du får ett pris med tydlig omfattning i offerten.",
      },
    ],
    narliggande: ["lund", "dalby", "veberod"],
  },
  {
    slug: "veberod",
    typ: "mindre",
    namn: "Veberöd",
    iOrt: "Veberöd",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Veberöd – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Veberöd? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Veberöd ligger i Lunds kommuns sydöstra del, söder om Romeleåsen. Orten är omgiven av skog och jordbruksmark och har en övervägande villabebyggelse.",
      "Avståndet till Lund är längre än från Dalby och Södra Sandby, vilket gör att transportsträckan blir en tydligare del av uppdraget vid flytt mot staden.",
    ],
    bebyggelse:
      "Tätort med villabebyggelse och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Veberöd och närområdet",
      "Veberöd–Lund",
      "Veberöd till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Längre till Lund",
        text: "Räkna med transportsträcka vid flytt mot staden. Ange båda adresserna i förfrågan.",
      },
      {
        rubrik: "Lantliga adresser",
        text: "Utanför tätorten kan infarter vara grusade eller smala. Nämn det om det gäller dig.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Veberöd?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Ingår demontering av möbler?",
        svar: "Ja, demontering och montering av standardmöbler ingår i flytthjälpen.",
      },
    ],
    narliggande: ["lund", "dalby", "sjobo"],
  },
  {
    slug: "genarp",
    typ: "mindre",
    namn: "Genarp",
    iOrt: "Genarp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Genarp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Genarp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Genarp ligger längst i sydost i Lunds kommun, nära gränsen mot Svedala. Orten är liten och nästan helt villabebyggd, omgiven av öppet jordbrukslandskap och Häckeberga naturområde.",
      "Läget innebär att avståndet till både Lund och Malmö är påtagligt. Flyttar härifrån har därför oftast en reell transportsträcka.",
    ],
    bebyggelse:
      "Mindre tätort med villabebyggelse, omgiven av jordbrukslandskap.",
    vanligaStrackor: [
      "Inom Genarp och närområdet",
      "Genarp–Lund",
      "Genarp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Avstånd till städerna",
        text: "Både Lund och Malmö ligger en bit bort. Transporttiden räknas in i offerten.",
      },
      {
        rubrik: "Villaflytt",
        text: "Gå igenom garage, förråd och uthus innan du uppskattar mängden bohag.",
      },
    ],
    fragor: [
      {
        fraga: "Är Genarp för avlägset?",
        svar: "Nej. Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Kan ni flytta tunga saker?",
        svar: "Ange särskilda föremål som piano eller kassaskåp i förfrågan, så bedöms de separat.",
      },
    ],
    narliggande: ["lund", "svedala", "dalby"],
  },
  {
    slug: "staffanstorp",
    typ: "mindre",
    namn: "Staffanstorp",
    iOrt: "Staffanstorp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Staffanstorp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Staffanstorp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Staffanstorp ligger mitt emellan Lund och Malmö och har vuxit kraftigt som pendlingsort. Bebyggelsen blandar äldre villor med nyare radhus- och flerbostadsområden.",
      "Läget mellan två städer gör att flyttar går åt båda hållen, och att orten också tar emot många som flyttar ut från Malmö och Lund.",
    ],
    bebyggelse:
      "Centralort med blandad bebyggelse: villor, radhus och flerbostadshus.",
    vanligaStrackor: [
      "Inom Staffanstorp och närområdet",
      "Staffanstorp–Lund",
      "Staffanstorp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Mellan två städer",
        text: "Kort avstånd åt båda hållen gör tidsplaneringen enkel oavsett riktning.",
      },
      {
        rubrik: "Nyare bostadsområden",
        text: "I de nyare kvarteren finns ofta god framkomlighet och plats att ställa flyttbilen.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni mellan Staffanstorp och Malmö?",
        svar: "Ja, det är en kort och vanlig sträcka. Ange båda adresserna i förfrågan.",
      },
      {
        fraga: "Kan jag boka flytt och städ samtidigt?",
        svar: "Ja. Då samordnas datumen så att städningen sker efter att bostaden är tömd.",
      },
    ],
    narliggande: ["lund", "malmo", "hjarup"],
  },
  {
    slug: "hjarup",
    typ: "mindre",
    namn: "Hjärup",
    iOrt: "Hjärup",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Hjärup – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Hjärup? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Hjärup ligger längs södra stambanan mellan Lund och Malmö och har vuxit snabbt som pendlingsort. Bebyggelsen är till stor del villor och radhus, med nyare flerbostadshus närmast stationen.",
      "Tågförbindelsen gör att pendlingen dominerar, och många flyttar in hit från både Lund och Malmö. Avstånden åt båda hållen är korta.",
    ],
    bebyggelse:
      "Villa- och radhusdominerad pendlingsort med nyare bebyggelse kring stationen.",
    vanligaStrackor: [
      "Inom Hjärup och närområdet",
      "Hjärup–Staffanstorp",
      "Hjärup till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nybyggda kvarter",
        text: "I de nyaste områdena är framkomligheten god, men kontrollera tillträde till garage och soprum i förväg.",
      },
      {
        rubrik: "Kort till båda städerna",
        text: "Flytt till Lund eller Malmö räknas som lokal flytt.",
      },
    ],
    fragor: [
      {
        fraga: "Är Hjärup inom ert område?",
        svar: "Ja, Hjärup ligger i Staffanstorps kommun. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Behöver jag boka hiss i förväg?",
        svar: "I vissa nyare fastigheter krävs det. Stäm av med din förening eller hyresvärd.",
      },
    ],
    narliggande: ["staffanstorp", "lund", "akarp"],
  },
  {
    slug: "akarp",
    typ: "mindre",
    namn: "Åkarp",
    iOrt: "Åkarp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Åkarp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Åkarp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Åkarp ligger i Burlövs kommun längs stambanan mellan Lund och Malmö. Orten är till stor del villabebyggd, och stationsområdet har byggts om i samband med utbyggnaden till fyra spår.",
      "Som pendlingsort går flyttar främst mot Malmö och Lund. Avståndet till båda är kort, vilket gör flytten förutsägbar.",
    ],
    bebyggelse:
      "Villadominerad ort med nyare bebyggelse kring stationsområdet.",
    vanligaStrackor: [
      "Inom Åkarp och närområdet",
      "Åkarp–Hjärup",
      "Åkarp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Villabebyggelse",
        text: "Kort bärväg men ofta stora bohag. Räkna med garage och förråd.",
      },
      {
        rubrik: "Pågående stadsutveckling",
        text: "Kring stationen kan vägar vara omlagda. Nämn i förfrågan om det påverkar framkomligheten till din adress.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Åkarp?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir bedömningen mer träffsäker.",
      },
      {
        fraga: "Ingår flyttstädning av villa?",
        svar: "Ja. Ange boyta och antal rum – en villa tar längre tid än en lägenhet av samma yta.",
      },
    ],
    narliggande: ["hjarup", "malmo", "lomma"],
  },
  {
    slug: "kavlinge",
    typ: "mindre",
    namn: "Kävlinge",
    iOrt: "Kävlinge",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Kävlinge – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Kävlinge? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Kävlinge ligger nordväst om Lund vid Kävlingeån och är kommunens centralort. Centrum har flerbostadshus där hiss förekommer i de nyare, medan ytterområdena domineras av villor och radhus.",
      "Orten är en knutpunkt med tåg mot både Malmö, Lund och Landskrona. Det speglas i flyttmönstret, som är spritt åt flera håll.",
    ],
    bebyggelse:
      "Centralort med flerbostadshus i centrum och villaområden runtomkring.",
    vanligaStrackor: [
      "Inom Kävlinge och närområdet",
      "Kävlinge–Furulund",
      "Kävlinge till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Blandad bebyggelse i centrum",
        text: "Hiss är inte given i de äldre husen. Ange våningsplan i förfrågan.",
      },
      {
        rubrik: "Kommunens andra orter",
        text: "Furulund och Löddeköpinge ligger i samma kommun men har eget avstånd till centralorten.",
      },
    ],
    fragor: [
      {
        fraga: "Täcker ni hela Kävlinge kommun?",
        svar: "Ange den faktiska adressen i förfrågan. Avståndet mellan orterna påverkar offerten.",
      },
      {
        fraga: "Vad behöver jag göra innan flyttdagen?",
        svar: "Packa klart, märk kartongerna med rum och se till att tillträde till trapphus och hiss är ordnat.",
      },
    ],
    narliggande: ["furulund", "loddekopinge", "lomma"],
  },
  {
    slug: "furulund",
    typ: "mindre",
    namn: "Furulund",
    iOrt: "Furulund",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Furulund – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Furulund? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Furulund ligger strax öster om Kävlinge och växte ursprungligen fram kring industrin i området. I dag är bebyggelsen övervägande villor och radhus.",
      "Orten ligger nära Kävlinge och har kort avstånd till både Lund och Landskrona. De flesta flyttar går mot dessa orter.",
    ],
    bebyggelse:
      "Mindre tätort med villor och radhus.",
    vanligaStrackor: [
      "Inom Furulund och närområdet",
      "Furulund–Kävlinge",
      "Furulund till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Korta avstånd",
        text: "Transportsträckan är sällan avgörande inom området. Bostadens förutsättningar styr tidsåtgången.",
      },
      {
        rubrik: "Villa- och radhusflytt",
        text: "Bohaget är ofta större än boytan antyder. Gå igenom förråd och garage.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Furulund?",
        svar: "Ja. Ange gatuadressen i förfrågan så återkommer vi.",
      },
      {
        fraga: "Hur fungerar RUT-avdraget?",
        svar: "Arbetskostnaden kan ge skattereduktion. Kontrollera aktuella regler hos Skatteverket.",
      },
    ],
    narliggande: ["kavlinge", "loddekopinge", "lomma"],
  },
  {
    slug: "loddekopinge",
    typ: "mindre",
    namn: "Löddeköpinge",
    iOrt: "Löddeköpinge",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Löddeköpinge – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Löddeköpinge? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Löddeköpinge ligger nära Öresundskusten i Kävlinge kommun och är känt för sitt handelsområde. Bostadsbebyggelsen är övervägande villor och radhus, med en del flerbostadshus.",
      "Närheten till både Landskrona och Lund gör att flyttar går åt flera håll. Vägförbindelserna är goda, vilket underlättar framkomligheten för större fordon.",
    ],
    bebyggelse:
      "Tätort med villor, radhus och ett större handelsområde.",
    vanligaStrackor: [
      "Inom Löddeköpinge och närområdet",
      "Löddeköpinge–Kävlinge",
      "Löddeköpinge till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "God framkomlighet",
        text: "Breda gator och närhet till större vägar gör uppställning sällan till ett problem.",
      },
      {
        rubrik: "Blandad bebyggelse",
        text: "Ange bostadstyp och våning så att offerten speglar de faktiska förutsättningarna.",
      },
    ],
    fragor: [
      {
        fraga: "Är Löddeköpinge inom ert område?",
        svar: "Ja. Ange adressen i förfrågan så blir bedömningen mer träffsäker.",
      },
      {
        fraga: "Kan jag få hjälp med packning?",
        svar: "Ange i förfrågan att du vill ha packhjälp, så tas det med i bedömningen.",
      },
    ],
    narliggande: ["kavlinge", "lomma", "landskrona"],
  },
  {
    slug: "lomma",
    typ: "mindre",
    namn: "Lomma",
    iOrt: "Lomma",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Lomma – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Lomma? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Lomma ligger vid Öresund mellan Malmö och Landskrona. Den gamla delen har äldre villor och tätare bebyggelse, medan hamnområdet har byggts om med nyproducerade lägenheter och radhus.",
      "Kontrasten mellan gammalt och nytt märks i flyttarna. I nyproduktionen finns hiss och lastzon, medan de äldre kvarteren närmast vattnet har smalare gator.",
    ],
    bebyggelse:
      "Kustort med blandad bebyggelse, från äldre villor till nyproduktion i hamnområdet.",
    vanligaStrackor: [
      "Inom Lomma och närområdet",
      "Lomma–Bjärred",
      "Lomma till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nyproduktion i hamnen",
        text: "Hiss och lastzon finns oftast, men tillträde kräver tagg eller kod som behöver ordnas i förväg.",
      },
      {
        rubrik: "Äldre kvarter",
        text: "Smalare gator i de gamla delarna kan göra att flyttbilen inte kommer ända fram.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni i Lomma hamn?",
        svar: "Ja. Kontrollera i förväg om hissen behöver bokas och att du har tillträde till garage.",
      },
      {
        fraga: "Hur nära porten kan bilen stå?",
        svar: "Det varierar mellan områdena. Beskriv gatan i förfrågan så planeras uppdraget därefter.",
      },
    ],
    narliggande: ["bjarred", "malmo", "kavlinge"],
  },
  {
    slug: "bjarred",
    typ: "mindre",
    namn: "Bjärred",
    iOrt: "Bjärred",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Bjärred – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Bjärred? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Bjärred ligger vid Öresund i Lomma kommun och har en karaktär av villasamhälle med rötter som badort. Bebyggelsen är nästan uteslutande villor, många med stora tomter.",
      "Närheten till Lund gör orten till en utpräglad pendlingsort. Flyttar går oftast mot Lund eller Malmö.",
    ],
    bebyggelse:
      "Villadominerad kustort med inslag av äldre badortsbebyggelse.",
    vanligaStrackor: [
      "Inom Bjärred och närområdet",
      "Bjärred–Lomma",
      "Bjärred till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Stora villor",
        text: "Bohaget är ofta omfattande. Gå igenom garage, förråd, vind och uthus innan du uppskattar storleken.",
      },
      {
        rubrik: "Trädgårdsgator",
        text: "Vissa gator är smala med häckar nära vägkanten, vilket kan begränsa framkomligheten.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Bjärred?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir bedömningen mer träffsäker.",
      },
      {
        fraga: "Kan ni flytta utemöbler och trädgårdsredskap?",
        svar: "Ja, men ange dem i förfrågan så att de räknas in i mängden bohag.",
      },
    ],
    narliggande: ["lomma", "lund", "kavlinge"],
  },
  {
    slug: "oxie",
    typ: "mindre",
    namn: "Oxie",
    iOrt: "Oxie",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Oxie – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Oxie? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Oxie är en stadsdel i Malmös sydöstra del som tidigare var en egen tätort. Karaktären av förort finns kvar: bebyggelsen är till stor del villor och radhus, med flerbostadshus kring centrum och stationen.",
      "Pågatåget gör att pendlingen in till Malmö centrum är kort. Flyttar går därför ofta mellan Oxie och centrala Malmö, men också mot Svedala och Trelleborg.",
    ],
    bebyggelse:
      "Villa- och radhusdominerad stadsdel med inslag av flerbostadshus.",
    vanligaStrackor: [
      "Inom Oxie och närområdet",
      "Oxie–Malmo",
      "Oxie till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Mer villa än innerstad",
        text: "Till skillnad från centrala Malmö är bärvägen här oftast kort, men bohaget större.",
      },
      {
        rubrik: "Kort till centrum",
        text: "Flytt mellan Oxie och centrala Malmö är en lokal flytt med kort transportsträcka.",
      },
    ],
    fragor: [
      {
        fraga: "Räknas Oxie som Malmö?",
        svar: "Oxie är en stadsdel i Malmö. Ange gatuadressen i förfrågan så blir offerten träffsäker.",
      },
      {
        fraga: "Kan jag boka flytt och städ?",
        svar: "Ja. Välj flytt och städ i formuläret så samordnas datumen.",
      },
    ],
    narliggande: ["malmo", "svedala", "trelleborg"],
  },
  {
    slug: "bunkeflostrand",
    typ: "mindre",
    namn: "Bunkeflostrand",
    iOrt: "Bunkeflostrand",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Bunkeflostrand – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Bunkeflostrand? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Bunkeflostrand ligger i Malmös sydvästra del nära Öresundsbron. Området har byggts ut kraftigt sedan 1990-talet och består av villor, radhus och nyare flerbostadshus.",
      "Närheten till både Malmö centrum och Vellinge gör att flyttar går åt flera håll. Vägnätet är modernt med god framkomlighet.",
    ],
    bebyggelse:
      "Villa- och radhusområden samt nyare flerbostadshus.",
    vanligaStrackor: [
      "Inom Bunkeflostrand och närområdet",
      "Bunkeflostrand–Malmo",
      "Bunkeflostrand till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nyare bebyggelse",
        text: "Breda gator och planerade parkeringar gör uppställning sällan till ett problem.",
      },
      {
        rubrik: "Tillträde i flerbostadshus",
        text: "I nyare fastigheter krävs ofta tagg till garage och soprum. Ordna det före flyttdagen.",
      },
    ],
    fragor: [
      {
        fraga: "Är Bunkeflostrand en del av Malmö?",
        svar: "Ja, det är en stadsdel i Malmö. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Hur bokar jag?",
        svar: "Fyll i offertformuläret i fem steg. Du ser en sammanfattning innan du skickar.",
      },
    ],
    narliggande: ["malmo", "vellinge", "tygelsjo"],
  },
  {
    slug: "tygelsjo",
    typ: "mindre",
    namn: "Tygelsjö",
    iOrt: "Tygelsjö",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Tygelsjö – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Tygelsjö? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Tygelsjö ligger i Malmös södra utkant, mellan Bunkeflostrand och Vellinge kommun. Området har kvar en bykaraktär med övervägande villabebyggelse.",
      "Som ytterområde i Malmö är avståndet in till centrum påtagligt men ändå kort nog att räknas som lokal flytt. Flyttar mot Vellinge och Trelleborg förekommer också.",
    ],
    bebyggelse:
      "Mindre stadsdel med övervägande villor och radhus.",
    vanligaStrackor: [
      "Inom Tygelsjö och närområdet",
      "Tygelsjö–Malmo",
      "Tygelsjö till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Bykaraktär",
        text: "Äldre delar av Tygelsjö har smalare gator än de nyare villaområdena.",
      },
      {
        rubrik: "Villaflytt",
        text: "Räkna med att garage och förråd innehåller mer än man först tror.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Tygelsjö?",
        svar: "Ja, Tygelsjö ligger i Malmö stad. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Vad ingår i flytthjälpen?",
        svar: "Bärhjälp, transport, flyttfiltar och spännband samt montering av standardmöbler.",
      },
    ],
    narliggande: ["malmo", "bunkeflostrand", "vellinge"],
  },
  {
    slug: "vellinge",
    typ: "mindre",
    namn: "Vellinge",
    iOrt: "Vellinge",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Vellinge – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Vellinge? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Vellinge är centralort i kommunen med samma namn och ligger på Söderslätt sydväst om Malmö. Bebyggelsen domineras av villor och radhus, med en del mindre flerbostadshus i centrum.",
      "Kommunen omfattar också Näset med Höllviken, Skanör och Falsterbo. Avstånden inom kommunen är märkbara, så exakt adress spelar roll för offerten.",
    ],
    bebyggelse:
      "Centralort med villor, radhus och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Vellinge och närområdet",
      "Vellinge–Höllviken",
      "Vellinge till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Utsträckt kommun",
        text: "Näsetorterna ligger en bit från Vellinge tätort. Ange den faktiska adressen.",
      },
      {
        rubrik: "Villadominerad bebyggelse",
        text: "Kort bärväg men ofta stort bohag, inklusive garage och förråd.",
      },
    ],
    fragor: [
      {
        fraga: "Täcker ni hela Vellinge kommun?",
        svar: "Ange den faktiska adressen i förfrågan. Avståndet inom kommunen påverkar offerten.",
      },
      {
        fraga: "Kan ni flytta till Malmö?",
        svar: "Ja, det är en kort och vanlig sträcka. Ange båda adresserna.",
      },
    ],
    narliggande: ["hollviken", "skanor", "malmo"],
  },
  {
    slug: "hollviken",
    typ: "mindre",
    namn: "Höllviken",
    iOrt: "Höllviken",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Höllviken – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Höllviken? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Höllviken ligger på Falsterbonäset och har vuxit från sommarortsbebyggelse till ett utpräglat villasamhälle för åretruntboende. Många hus ligger på stora tomter med tallbevuxna gator.",
      "Näsets läge innebär att all trafik går via Falsterbovägen, vilket kan ge köer under sommaren. Det påverkar tidsplaneringen vid flytt under högsäsong.",
    ],
    bebyggelse:
      "Villadominerad ort med inslag av äldre fritidshusbebyggelse.",
    vanligaStrackor: [
      "Inom Höllviken och närområdet",
      "Höllviken–Skanör",
      "Höllviken till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "En infartsväg",
        text: "Trafiken till och från Näset går via samma stråk. Räkna med längre restid sommartid.",
      },
      {
        rubrik: "Sandiga infarter",
        text: "Vissa adresser har grusade eller sandiga infarter som begränsar framkomligheten för tunga fordon.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni på Näset?",
        svar: "Ja. Ange gatuadressen i förfrågan eftersom framkomligheten varierar mellan områdena.",
      },
      {
        fraga: "Är sommaren sämre tid att flytta?",
        svar: "Efterfrågan är högst då. Skicka förfrågan i god tid om du har ett bestämt datum.",
      },
    ],
    narliggande: ["skanor", "falsterbo", "vellinge"],
  },
  {
    slug: "skanor",
    typ: "mindre",
    namn: "Skanör",
    iOrt: "Skanör",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Skanör – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Skanör? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Skanör ligger längst ut på Falsterbonäset och har en välbevarad gammal stadskärna med anor från medeltiden. Gatorna i de äldsta delarna är smala och husen ligger tätt.",
      "Runt den gamla kärnan finns villabebyggelse med bättre framkomlighet. Vilken del adressen ligger i avgör därför mycket av hur uppdraget planeras.",
    ],
    bebyggelse:
      "Historisk stadskärna med tät äldre bebyggelse samt villaområden runtomkring.",
    vanligaStrackor: [
      "Inom Skanör och närområdet",
      "Skanör–Falsterbo",
      "Skanör till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Den gamla stadskärnan",
        text: "Smala gator och tät bebyggelse gör att flyttbilen ofta måste stå en bit bort.",
      },
      {
        rubrik: "Längst ut på Näset",
        text: "Transportsträckan hit är lång från Malmö. Det räknas in i offerten.",
      },
    ],
    fragor: [
      {
        fraga: "Går det att flytta i gamla Skanör?",
        svar: "Ja, men framkomligheten är begränsad. Beskriv gatan i förfrågan.",
      },
      {
        fraga: "Hur påverkar avståndet priset?",
        svar: "Transportsträckan är en av faktorerna. Ange båda adresserna så blir offerten rätt.",
      },
    ],
    narliggande: ["falsterbo", "hollviken", "vellinge"],
  },
  {
    slug: "falsterbo",
    typ: "mindre",
    namn: "Falsterbo",
    iOrt: "Falsterbo",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Falsterbo – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Falsterbo? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Falsterbo ligger längst ut på näset söder om Skanör. Bebyggelsen präglas av badortshistorien med stora villor på rymliga tomter, många från tidigt 1900-tal.",
      "Läget längst ut innebär den längsta transportsträckan av Näsetorterna. Sommartid är trafiken in och ut påtaglig, vilket påverkar tidsplaneringen.",
    ],
    bebyggelse:
      "Villabebyggelse med stort inslag av äldre badortsvillor.",
    vanligaStrackor: [
      "Inom Falsterbo och närområdet",
      "Falsterbo–Skanör",
      "Falsterbo till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Äldre villor",
        text: "Stora hus betyder ofta stort bohag. Gå igenom alla utrymmen innan du uppskattar storleken.",
      },
      {
        rubrik: "Längst ut på Näset",
        text: "Både avstånd och sommartrafik räknas in i tidsplaneringen.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Falsterbo?",
        svar: "Ja. Ange gatuadressen i förfrågan så räknas transportsträckan in.",
      },
      {
        fraga: "Kan ni hantera ömtåliga föremål?",
        svar: "Ange dem under särskilda föremål i förfrågan så bedöms de separat.",
      },
    ],
    narliggande: ["skanor", "hollviken", "vellinge"],
  },
  {
    slug: "svedala",
    typ: "mindre",
    namn: "Svedala",
    iOrt: "Svedala",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Svedala – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Svedala? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Svedala ligger sydost om Malmö och är kommunens centralort. Centrum har flerbostadshus där hiss förekommer i de nyare husen, medan ytterområdena domineras av villor och radhus.",
      "Närheten till både Malmö och Trelleborg, samt Sturups flygplats, gör att orten har god tillgänglighet. Flyttmönstret är spritt åt flera håll.",
    ],
    bebyggelse:
      "Centralort med blandad bebyggelse: flerbostadshus i centrum, villor utanför.",
    vanligaStrackor: [
      "Inom Svedala och närområdet",
      "Svedala–Malmo",
      "Svedala till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Hiss varierar",
        text: "I de äldre flerbostadshusen saknas hiss ibland. Ange våningsplan i förfrågan.",
      },
      {
        rubrik: "Goda vägförbindelser",
        text: "Närheten till större vägar gör transporten förutsägbar.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Svedala?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir offerten mer träffsäker.",
      },
      {
        fraga: "Hur lång tid tar en flytt?",
        svar: "Det beror på bohag, våning och hiss. Tidsåtgången framgår av offerten.",
      },
    ],
    narliggande: ["malmo", "skurup", "oxie"],
  },
  {
    slug: "bara",
    typ: "mindre",
    namn: "Bara",
    iOrt: "Bara",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Bara – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Bara? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Bara ligger i Svedala kommun mellan Malmö och Svedala, intill Torups bokskog. Orten är liten och domineras av villor och radhus, en del av nyare datum.",
      "Som pendlingsort går de flesta flyttar mot Malmö. Avståndet är kort, vilket gör att flytt och flyttstädning kan planeras tätt.",
    ],
    bebyggelse:
      "Mindre tätort med övervägande villor och radhus.",
    vanligaStrackor: [
      "Inom Bara och närområdet",
      "Bara–Svedala",
      "Bara till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Pendlingsort nära Malmö",
        text: "Kort transportsträcka gör tidsplaneringen enkel.",
      },
      {
        rubrik: "Villa- och radhusflytt",
        text: "Bohaget är ofta större än boytan antyder – räkna med garage och förråd.",
      },
    ],
    fragor: [
      {
        fraga: "Är Bara för litet för er?",
        svar: "Nej. Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Kan jag boka bara flyttstädning?",
        svar: "Ja. Välj städ i formuläret om du sköter flytten själv.",
      },
    ],
    narliggande: ["svedala", "malmo", "staffanstorp"],
  },
  {
    slug: "skurup",
    typ: "mindre",
    namn: "Skurup",
    iOrt: "Skurup",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Skurup – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Skurup? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Skurup ligger på Söderslätt mellan Malmö och Ystad och är kommunens centralort. Bebyggelsen i centrum består av flerbostadshus, medan villor dominerar utanför.",
      "Orten ligger längs Ystadbanan, och pendlingen går åt båda hållen. Flyttar mot både Malmö och Ystad är vanliga.",
    ],
    bebyggelse:
      "Centralort med flerbostadshus i centrum och villaområden utanför.",
    vanligaStrackor: [
      "Inom Skurup och närområdet",
      "Skurup–Svedala",
      "Skurup till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Läge mellan två städer",
        text: "Avståndet åt båda hållen är måttligt och transporttiden förutsägbar.",
      },
      {
        rubrik: "Landsbygd i kommunen",
        text: "Utanför tätorten finns gårdar och byar med längre infarter. Ange exakt adress.",
      },
    ],
    fragor: [
      {
        fraga: "Täcker ni Skurups kommun?",
        svar: "Ange den faktiska adressen i förfrågan så återkommer vi.",
      },
      {
        fraga: "Vad händer om något går sönder?",
        svar: "Ansvar och försäkring regleras i villkoren för uppdraget, som framgår av offerten.",
      },
    ],
    narliggande: ["svedala", "ystad", "trelleborg"],
  },
  {
    slug: "ystad",
    typ: "mindre",
    namn: "Ystad",
    iOrt: "Ystad",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Ystad – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Ystad? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Ystad har en av Sveriges bäst bevarade medeltida stadskärnor, med korsvirkeshus och smala gränder. Det ställer särskilda krav vid flytt: gatorna i gamla stan är trånga och många hus har branta, smala trappor.",
      "Utanför den gamla stadskärnan finns flerbostadshus och villaområden med helt andra förutsättningar. Staden är också färjehamn mot Bornholm och Polen.",
    ],
    bebyggelse:
      "Medeltida stadskärna med korsvirkeshus, flerbostadshus och villaområden utanför.",
    vanligaStrackor: [
      "Inom Ystad och närområdet",
      "Ystad–Simrishamn",
      "Ystad till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Gamla stan",
        text: "Korsvirkeshusen har ofta trånga trappor och gatorna är smala. Beskriv förhållandena i förfrågan.",
      },
      {
        rubrik: "Avstånd till Malmö",
        text: "Ystad ligger en bit från de större städerna. Transportsträckan räknas in i offerten.",
      },
    ],
    fragor: [
      {
        fraga: "Går det att flytta i Ystads gamla stan?",
        svar: "Ja, men framkomligheten är begränsad. Ange våning, trappbredd och om gatan är smal.",
      },
      {
        fraga: "Flyttar ni till Malmö och Lund?",
        svar: "Ja. Ange båda adresserna eftersom sträckan påverkar offerten.",
      },
    ],
    narliggande: ["simrishamn", "tomelilla", "skurup"],
  },
  {
    slug: "simrishamn",
    typ: "mindre",
    namn: "Simrishamn",
    iOrt: "Simrishamn",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Simrishamn – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Simrishamn? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Simrishamn ligger på Österlen vid Östersjön och har en äldre stadskärna med låg, tät bebyggelse. Gatorna närmast hamnen är smala, medan nyare områden utanför har bättre framkomlighet.",
      "Kommunen har ett stort inslag av fritidsboende längs kusten, vilket gör att flyttarna är starkt koncentrerade till sommarhalvåret.",
    ],
    bebyggelse:
      "Äldre småstadsbebyggelse i centrum, villaområden utanför och fritidshus längs kusten.",
    vanligaStrackor: [
      "Inom Simrishamn och närområdet",
      "Simrishamn–Tomelilla",
      "Simrishamn till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Smal stadskärna",
        text: "I de äldsta kvarteren kan flyttbilen behöva stå en bit från porten.",
      },
      {
        rubrik: "Långt till storstäderna",
        text: "Avståndet till Malmö och Lund är påtagligt. Räkna med transporttid i tidsplaneringen.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Österlen?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda. Avståndet påverkar offerten.",
      },
      {
        fraga: "Flyttar ni fritidshus?",
        svar: "Ja. Beskriv vad som ska flyttas – fritidshus har oftast mindre bohag.",
      },
    ],
    narliggande: ["tomelilla", "ystad", "kristianstad"],
  },
  {
    slug: "tomelilla",
    typ: "mindre",
    namn: "Tomelilla",
    iOrt: "Tomelilla",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Tomelilla – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Tomelilla? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Tomelilla ligger i Österlens inland och är kommunens centralort. Bebyggelsen är låg, med villor och mindre flerbostadshus i två till tre våningar där hiss sällan finns.",
      "Orten ligger på Österlenbanan med tåg mot Ystad och Simrishamn. Kommunen i övrigt är glesbebyggd med många byar och gårdar.",
    ],
    bebyggelse:
      "Centralort med låg bebyggelse: villor och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Tomelilla och närområdet",
      "Tomelilla–Simrishamn",
      "Tomelilla till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Hiss är ovanligt",
        text: "I de låga flerbostadshusen saknas hiss oftast. Våningsplanet påverkar tidsåtgången.",
      },
      {
        rubrik: "Byar och gårdar",
        text: "Utanför tätorten är avstånden långa och infarterna ibland grusade. Ange exakt adress.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Tomelilla kommun?",
        svar: "Ange den faktiska adressen i förfrågan så återkommer vi.",
      },
      {
        fraga: "Kan ni flytta från en gård?",
        svar: "Ja, men beskriv vad som ska flyttas och hur infarten ser ut, så blir bedömningen rätt.",
      },
    ],
    narliggande: ["simrishamn", "ystad", "sjobo"],
  },
  {
    slug: "sjobo",
    typ: "mindre",
    namn: "Sjöbo",
    iOrt: "Sjöbo",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Sjöbo – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Sjöbo? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Sjöbo ligger i mellersta Skåne, omgivet av både skog och jordbruksmark. Centralorten har villor och mindre flerbostadshus, och kommunen i övrigt är glesbebyggd.",
      "Avstånden till de större städerna är märkbara åt alla håll – Lund, Malmö och Ystad ligger alla en bit bort. Det gör transporttiden till en tydlig del av uppdraget.",
    ],
    bebyggelse:
      "Centralort med villor och mindre flerbostadshus, omgiven av skogs- och jordbruksbygd.",
    vanligaStrackor: [
      "Inom Sjöbo och närområdet",
      "Sjöbo–Veberöd",
      "Sjöbo till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Avstånd åt alla håll",
        text: "Ingen storstad ligger nära. Ange båda adresserna så räknas sträckan in korrekt.",
      },
      {
        rubrik: "Glesbygd i kommunen",
        text: "Gårdar och byar utanför tätorten kan ha långa, grusade infarter.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Sjöbo?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Ingår bortforsling av saker jag inte vill ha?",
        svar: "Beskriv det i förfrågan så återkommer vi om vad som är möjligt.",
      },
    ],
    narliggande: ["veberod", "tomelilla", "horby"],
  },
  {
    slug: "horby",
    typ: "mindre",
    namn: "Hörby",
    iOrt: "Hörby",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Hörby – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Hörby? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Hörby ligger mitt i Skåne där riksvägarna 13 och 23 möts. Centralorten har villor och mindre flerbostadshus, och saknar järnväg – allt resande sker på väg.",
      "Det centrala läget innebär att avstånden till Lund, Malmö, Kristianstad och Hässleholm är ungefär jämnstora. Flyttar går därför åt många olika håll.",
    ],
    bebyggelse:
      "Centralort med låg bebyggelse: villor och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Hörby och närområdet",
      "Hörby–Höör",
      "Hörby till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Inget tåg – bara väg",
        text: "All transport sker på väg, men riksvägarna ger god framkomlighet för större fordon.",
      },
      {
        rubrik: "Centralt i Skåne",
        text: "Avstånden åt alla håll är måttliga, vilket gör transporttiden förutsägbar.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Hörby?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir offerten mer träffsäker.",
      },
      {
        fraga: "Kan jag få offert utan att binda mig?",
        svar: "Ja. Att begära offert är kostnadsfritt och du binder dig inte.",
      },
    ],
    narliggande: ["hoor", "sjobo", "eslov"],
  },
  {
    slug: "hoor",
    typ: "mindre",
    namn: "Höör",
    iOrt: "Höör",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Höör – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Höör? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Höör ligger i mellersta Skåne nära Ringsjön och Frostavallen. Orten har station på södra stambanan, och bebyggelsen närmast stationen är tätare medan ytterområdena domineras av villor.",
      "Tågförbindelsen gör Höör till en pendlingsort mot både Malmö och Lund i söder och Hässleholm i norr. Många flyttar följer den riktningen.",
    ],
    bebyggelse:
      "Centralort med villor, radhus och flerbostadshus kring stationen.",
    vanligaStrackor: [
      "Inom Höör och närområdet",
      "Höör–Hörby",
      "Höör till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Stationsnära bebyggelse",
        text: "Kring stationen finns flerbostadshus där hiss förekommer men inte är given. Ange våningsplan.",
      },
      {
        rubrik: "Natur och sluttningar",
        text: "Vissa adresser mot Frostavallen ligger i kuperad terräng med branta infarter.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Höör?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir bedömningen mer träffsäker.",
      },
      {
        fraga: "Hur långt i förväg bör jag boka?",
        svar: "Så tidigt du kan, särskilt kring månadsskiften då efterfrågan är högst.",
      },
    ],
    narliggande: ["horby", "eslov", "hassleholm"],
  },
  {
    slug: "eslov",
    typ: "mindre",
    namn: "Eslöv",
    iOrt: "Eslöv",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Eslöv – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Eslöv? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Eslöv växte fram kring järnvägen och har en tydlig stadskärna med flerbostadshus, delvis från tidigt 1900-tal. Ytterområdena domineras av villor och radhus.",
      "Läget vid stambanan gör pendlingen till Lund och Malmö kort och enkel. Flyttar mot Lund är bland de vanligaste.",
    ],
    bebyggelse:
      "Centralort med flerbostadshus i centrum och villaområden utanför.",
    vanligaStrackor: [
      "Inom Eslöv och närområdet",
      "Eslöv–Lund",
      "Eslöv till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Äldre hus i centrum",
        text: "I de äldsta flerbostadshusen saknas hiss ibland och trapphusen kan vara smala.",
      },
      {
        rubrik: "Kort till Lund",
        text: "Avståndet gör att flytt och flyttstädning kan läggas nära varandra i tid.",
      },
    ],
    fragor: [
      {
        fraga: "Är Eslöv inom ert område?",
        svar: "Ja. Ange gatuadressen i förfrågan så blir offerten mer träffsäker.",
      },
      {
        fraga: "Vad ingår i flyttstädningen?",
        svar: "Hela bostaden inför överlämning – kök, badrum, fönster, golv och förvaring. Omfattningen framgår av offerten.",
      },
    ],
    narliggande: ["lund", "hoor", "kavlinge"],
  },
  {
    slug: "svalov",
    typ: "mindre",
    namn: "Svalöv",
    iOrt: "Svalöv",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Svalöv – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Svalöv? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Svalöv ligger i västra Skånes jordbruksbygd och är känt för sin växtförädlingshistoria. Centralorten har villor och mindre flerbostadshus, och kommunen rymmer flera mindre byar.",
      "Avståndet till kuststäderna Landskrona och Helsingborg är måttligt, och många pendlar dit. Flyttmönstret följer samma riktning.",
    ],
    bebyggelse:
      "Centralort med villor och mindre flerbostadshus, omgiven av jordbruksbygd.",
    vanligaStrackor: [
      "Inom Svalöv och närområdet",
      "Svalöv–Landskrona",
      "Svalöv till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Jordbruksbygd",
        text: "Utanför tätorten finns gårdar med långa infarter. Ange exakt adress i förfrågan.",
      },
      {
        rubrik: "Måttligt till kusten",
        text: "Landskrona och Helsingborg nås relativt snabbt, vilket gör transporttiden förutsägbar.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Svalöv?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Kan ni flytta en hel gård?",
        svar: "Beskriv omfattningen i förfrågan så bedömer vi vad som krävs.",
      },
    ],
    narliggande: ["landskrona", "klippan", "kavlinge"],
  },
  {
    slug: "ahus",
    typ: "mindre",
    namn: "Åhus",
    iOrt: "Åhus",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Åhus – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Åhus? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Åhus ligger vid Hanöbuktens kust och har en gammal kärna med låg, tät bebyggelse. Runtomkring finns villaområden och, längs stranden, en stor mängd fritidshus.",
      "Säsongsvariationen är mycket tydlig. Sommaren innebär både fler flyttar och betydligt mer trafik, medan orten är lugn resten av året.",
    ],
    bebyggelse:
      "Gammal köping med tät äldre kärna, villaområden och omfattande fritidshusbebyggelse.",
    vanligaStrackor: [
      "Inom Åhus och närområdet",
      "Åhus–Kristianstad",
      "Åhus till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Sommarsäsongen dominerar",
        text: "Juni till augusti är den klart mest efterfrågade perioden. Skicka förfrågan tidigt.",
      },
      {
        rubrik: "Sandiga vägar",
        text: "Nära stranden är många vägar sandiga eller smala, vilket begränsar framkomligheten för tunga fordon.",
      },
    ],
    fragor: [
      {
        fraga: "Flyttar ni fritidshus i Åhus?",
        svar: "Ja. Beskriv vad som ska flyttas – ett fritidshus har oftast mindre bohag än ett permanentboende.",
      },
      {
        fraga: "Hur påverkar avståndet till Kristianstad?",
        svar: "Sträckan räknas in i offerten. Ange den faktiska adressen.",
      },
    ],
    narliggande: ["kristianstad", "hammar", "tollarp"],
  },
  {
    slug: "hammar",
    typ: "mindre",
    namn: "Hammar",
    iOrt: "Hammar",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Hammar – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Hammar? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Hammar ligger strax söder om Kristianstads centrum, längs vägen mot Åhus. Området är övervägande villabebyggt och fungerar i praktiken som en stadsdel i utkanten av staden.",
      "Närheten till Kristianstad gör att flyttar oftast går inom kommunen, och transportsträckan är därmed kort.",
    ],
    bebyggelse:
      "Villaområde i Kristianstads södra utkant.",
    vanligaStrackor: [
      "Inom Hammar och närområdet",
      "Hammar–Kristianstad",
      "Hammar till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nära Kristianstad",
        text: "Kort transportsträcka gör att bostadens förutsättningar avgör tidsåtgången.",
      },
      {
        rubrik: "Villaflytt",
        text: "Räkna med garage och förråd när du uppskattar mängden bohag.",
      },
    ],
    fragor: [
      {
        fraga: "Räknas Hammar som Kristianstad?",
        svar: "Hammar ligger i Kristianstads kommun. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Kan jag boka flytt och städ samtidigt?",
        svar: "Ja. Då samordnas datumen så att städningen sker efter att bostaden är tömd.",
      },
    ],
    narliggande: ["kristianstad", "ahus", "tollarp"],
  },
  {
    slug: "tollarp",
    typ: "mindre",
    namn: "Tollarp",
    iOrt: "Tollarp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Tollarp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Tollarp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Tollarp ligger sydväst om Kristianstad vid Vramsån. Orten är en av kommunens större tätorter utanför centralorten, med övervägande villabebyggelse.",
      "Avståndet in till Kristianstad är märkbart men inte långt. De flesta flyttar går mot centralorten eller inom kommunen.",
    ],
    bebyggelse:
      "Tätort med villor och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Tollarp och närområdet",
      "Tollarp–Kristianstad",
      "Tollarp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Avstånd till centralorten",
        text: "Transportsträckan in till Kristianstad räknas in. Ange exakt adress.",
      },
      {
        rubrik: "Låg bebyggelse",
        text: "Hiss är ovanligt här. Ange våningsplan om du bor i flerbostadshus.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Tollarp?",
        svar: "Ja, Tollarp ligger i Kristianstads kommun. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Måste jag vara hemma under flytten?",
        svar: "Någon behöver kunna visa vad som ska flyttas och ta emot nycklar.",
      },
    ],
    narliggande: ["kristianstad", "hammar", "horby"],
  },
  {
    slug: "bromolla",
    typ: "mindre",
    namn: "Bromölla",
    iOrt: "Bromölla",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Bromölla – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Bromölla? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Bromölla ligger i nordöstra Skåne vid Ivösjön, nära gränsen mot Blekinge. Orten präglas av sin industrihistoria, och bebyggelsen i centrum består till stor del av flerbostadshus.",
      "Läget i kommunens nordöstra hörn innebär att Kristianstad är närmaste större stad, medan Karlshamn i Blekinge ligger åt andra hållet.",
    ],
    bebyggelse:
      "Industriort med flerbostadshus i centrum och villaområden runtomkring.",
    vanligaStrackor: [
      "Inom Bromölla och närområdet",
      "Bromölla–Kristianstad",
      "Bromölla till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Flerbostadshus från industritiden",
        text: "Hiss är inte given i det äldre beståndet. Ange våningsplan i förfrågan.",
      },
      {
        rubrik: "Nära länsgränsen",
        text: "Flytt till eller från Blekinge förekommer. Ange båda adresserna så räknas sträckan in.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Bromölla?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Kan ni flytta över länsgränsen?",
        svar: "Beskriv flytten i förfrågan så återkommer vi med vad som är möjligt.",
      },
    ],
    narliggande: ["kristianstad", "knislinge", "osby"],
  },
  {
    slug: "knislinge",
    typ: "mindre",
    namn: "Knislinge",
    iOrt: "Knislinge",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Knislinge – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Knislinge? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Knislinge ligger i Göingebygden norr om Kristianstad, vid Helge å. Orten har en bakgrund i industri och jordbruk, och bebyggelsen består av villor och mindre flerbostadshus.",
      "Göinge är glesbebyggt, och avstånden till närmaste större stad är påtagliga. Kristianstad är närmast, medan Hässleholm ligger åt väster.",
    ],
    bebyggelse:
      "Tätort med villor och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Knislinge och närområdet",
      "Knislinge–Broby",
      "Knislinge till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Glesbebyggd bygd",
        text: "Avstånden är längre än i västra Skåne. Transporttiden blir en tydlig del av uppdraget.",
      },
      {
        rubrik: "Låg bebyggelse",
        text: "Hiss är ovanligt. Ange våningsplan om du bor i flerbostadshus.",
      },
    ],
    fragor: [
      {
        fraga: "Är Knislinge inom ert område?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Hur mycket påverkar avståndet priset?",
        svar: "Transportsträckan är en av faktorerna. Du får ett pris med tydlig omfattning i offerten.",
      },
    ],
    narliggande: ["broby", "kristianstad", "hassleholm"],
  },
  {
    slug: "broby",
    typ: "mindre",
    namn: "Broby",
    iOrt: "Broby",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Broby – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Broby? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Broby är centralort i Östra Göinge kommun och ligger vid Helge å i nordöstra Skåne. Bebyggelsen är låg, med villor och mindre flerbostadshus.",
      "Göingebygden är skogrik och glesbebyggd. Det innebär längre avstånd till både Kristianstad och Hässleholm än vad många räknar med.",
    ],
    bebyggelse:
      "Centralort i kommunen med villor och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Broby och närområdet",
      "Broby–Knislinge",
      "Broby till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Längre transportsträckor",
        text: "Räkna med reell transporttid vid flytt mot kusten eller söderut.",
      },
      {
        rubrik: "Skogsbygd",
        text: "Adresser utanför tätorten kan ha långa, grusade infarter. Ange exakt adress.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Broby?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Kan jag få hjälp med packning?",
        svar: "Ange i förfrågan att du vill ha packhjälp så tas det med i bedömningen.",
      },
    ],
    narliggande: ["knislinge", "osby", "hassleholm"],
  },
  {
    slug: "osby",
    typ: "mindre",
    namn: "Osby",
    iOrt: "Osby",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Osby – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Osby? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Osby ligger längst upp i norra Skåne, nära gränsen mot Småland. Orten har station på södra stambanan, och bebyggelsen kring stationen är tätare medan resten domineras av villor.",
      "Läget i norra Skåne innebär att både Hässleholm och Älmhult i Småland är närmare än de skånska kuststäderna. Flyttar går därför ofta norrut.",
    ],
    bebyggelse:
      "Centralort med villor och flerbostadshus kring stationen.",
    vanligaStrackor: [
      "Inom Osby och närområdet",
      "Osby–Broby",
      "Osby till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nordligaste Skåne",
        text: "Avståndet till Malmö och Helsingborg är betydande. Transporttiden räknas in i offerten.",
      },
      {
        rubrik: "Flytt över länsgränsen",
        text: "Flytt till eller från Småland förekommer. Ange båda adresserna i förfrågan.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Osby?",
        svar: "Ange adressen i förfrågan så återkommer vi med vad vi kan erbjuda.",
      },
      {
        fraga: "Hur fungerar det om jag flyttar långt?",
        svar: "Ange både från- och tilladress. Sträckan påverkar tidsplan och offert.",
      },
    ],
    narliggande: ["broby", "hassleholm", "bromolla"],
  },
  {
    slug: "bjarnum",
    typ: "mindre",
    namn: "Bjärnum",
    iOrt: "Bjärnum",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Bjärnum – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Bjärnum? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Bjärnum ligger norr om Hässleholm och har en historia inom möbelindustrin. Orten är liten med övervägande villabebyggelse och några mindre flerbostadshus.",
      "Avståndet till Hässleholm är måttligt, men till kuststäderna betydligt längre. Flyttar går oftast mot Hässleholm eller inom kommunen.",
    ],
    bebyggelse:
      "Tätort med villor och mindre flerbostadshus, med bakgrund i möbelindustrin.",
    vanligaStrackor: [
      "Inom Bjärnum och närområdet",
      "Bjärnum–Hassleholm",
      "Bjärnum till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nära Hässleholm",
        text: "Kort sträcka till centralorten gör flytt inom kommunen förutsägbar.",
      },
      {
        rubrik: "Längre söderut",
        text: "Flytt till Malmö eller Lund innebär en reell transportsträcka.",
      },
    ],
    fragor: [
      {
        fraga: "Är Bjärnum inom ert område?",
        svar: "Ja, Bjärnum ligger i Hässleholms kommun. Ange adressen i förfrågan.",
      },
      {
        fraga: "Vad kostar flytthjälp?",
        svar: "Priset beror på bohag, avstånd, våning och hiss. Du får ett pris med tydlig omfattning i offerten.",
      },
    ],
    narliggande: ["hassleholm", "vinslov", "tyringe"],
  },
  {
    slug: "tyringe",
    typ: "mindre",
    namn: "Tyringe",
    iOrt: "Tyringe",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Tyringe – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Tyringe? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Tyringe ligger väster om Hässleholm och har en bakgrund som kurort. Bebyggelsen är övervägande villor, med inslag av mindre flerbostadshus i centrum.",
      "Orten ligger på Skånebanan mellan Hässleholm och Helsingborg, vilket gör pendling åt båda hållen möjlig. Flyttmönstret följer banan.",
    ],
    bebyggelse:
      "Tätort med villor och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Tyringe och närområdet",
      "Tyringe–Hassleholm",
      "Tyringe till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Längs Skånebanan",
        text: "Pendling åt både öst och väst är vanlig, och flyttar följer samma riktning.",
      },
      {
        rubrik: "Villabebyggelse",
        text: "Kort bärväg men ofta stort bohag. Gå igenom garage och förråd.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Tyringe?",
        svar: "Ja, Tyringe ligger i Hässleholms kommun. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Kan jag ändra i min förfrågan?",
        svar: "Hör av dig till oss så uppdaterar vi uppgifterna.",
      },
    ],
    narliggande: ["hassleholm", "bjarnum", "perstorp"],
  },
  {
    slug: "vinslov",
    typ: "mindre",
    namn: "Vinslöv",
    iOrt: "Vinslöv",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Vinslöv – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Vinslöv? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Vinslöv ligger mellan Hässleholm och Kristianstad i ett jordbrukslandskap. Orten är övervägande villabebyggd med några mindre flerbostadshus i centrum.",
      "Läget mitt emellan två städer gör att flyttar går åt båda hållen, och avstånden är ungefär jämnstora.",
    ],
    bebyggelse:
      "Tätort med villor och mindre flerbostadshus.",
    vanligaStrackor: [
      "Inom Vinslöv och närområdet",
      "Vinslöv–Hassleholm",
      "Vinslöv till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Mellan två städer",
        text: "Både Hässleholm och Kristianstad ligger nära. Ange båda adresserna vid flytt.",
      },
      {
        rubrik: "Jordbruksbygd",
        text: "Gårdar utanför tätorten kan ha långa infarter. Ange exakt adress.",
      },
    ],
    fragor: [
      {
        fraga: "Hjälper ni till i Vinslöv?",
        svar: "Ja, Vinslöv ligger i Hässleholms kommun. Ange adressen i förfrågan.",
      },
      {
        fraga: "Ingår flyttkartonger?",
        svar: "Flyttfiltar och spännband ingår. Kartonger kan läggas till – ange det i förfrågan.",
      },
    ],
    narliggande: ["hassleholm", "kristianstad", "bjarnum"],
  },
  {
    slug: "haljarp",
    typ: "mindre",
    namn: "Häljarp",
    iOrt: "Häljarp",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Häljarp – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Häljarp? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Häljarp ligger i Landskrona kommun mellan Landskrona och Kävlinge, nära Saxån. Orten är liten med övervägande villa- och radhusbebyggelse.",
      "Närheten till Landskrona gör att de flesta flyttar går dit eller till Kävlinge. Avstånden är korta åt båda hållen.",
    ],
    bebyggelse:
      "Mindre tätort med villor och radhus.",
    vanligaStrackor: [
      "Inom Häljarp och närområdet",
      "Häljarp–Landskrona",
      "Häljarp till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Korta avstånd",
        text: "Transportsträckan är sällan avgörande. Bostadens förutsättningar styr tidsåtgången.",
      },
      {
        rubrik: "Villa och radhus",
        text: "Bohaget är ofta större än boytan antyder – räkna med förråd och garage.",
      },
    ],
    fragor: [
      {
        fraga: "Är Häljarp inom ert område?",
        svar: "Ja, Häljarp ligger i Landskrona kommun. Ange gatuadressen i förfrågan.",
      },
      {
        fraga: "Kan jag boka bara städning?",
        svar: "Ja. Välj städ i formuläret. Bostaden behöver vara tömd innan städningen börjar.",
      },
    ],
    narliggande: ["landskrona", "kavlinge", "furulund"],
  },
  {
    slug: "hofterup",
    typ: "mindre",
    namn: "Hofterup",
    iOrt: "Hofterup",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Hofterup – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Hofterup? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Hofterup ligger i norra delen av Kävlinge kommun, en bit in från Öresundskusten. Området är villadominerat, och en del av husen har sitt ursprung som fritidshus.",
      "Närheten till både Landskrona och Lund gör att flyttar går åt flera håll. Vägförbindelserna är goda via E6.",
    ],
    bebyggelse:
      "Villaområde med inslag av äldre fritidshusbebyggelse.",
    vanligaStrackor: [
      "Inom Hofterup och närområdet",
      "Hofterup–Kävlinge",
      "Hofterup till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Nära E6",
        text: "God framkomlighet för större fordon gör transporten förutsägbar.",
      },
      {
        rubrik: "Villaflytt",
        text: "Gå igenom garage, förråd och uthus innan du uppskattar mängden bohag.",
      },
    ],
    fragor: [
      {
        fraga: "Kommer ni till Hofterup?",
        svar: "Ja, Hofterup ligger i Kävlinge kommun. Ange adressen i förfrågan.",
      },
      {
        fraga: "Hur lång tid i förväg bör jag höra av mig?",
        svar: "Så tidigt du kan, särskilt om du är bunden till ett specifikt datum.",
      },
    ],
    narliggande: ["kavlinge", "loddekopinge", "landskrona"],
  },
  {
    slug: "ljunghusen",
    typ: "mindre",
    namn: "Ljunghusen",
    iOrt: "Ljunghusen",
    lan: "Skåne län",
    metaBeskrivning:
      "Flyttfirma Ljunghusen – boka bohagsflytt och flyttstädning via Nyflytt. Beskriv din bostad och ditt datum och få en tydlig offert. Uppdraget utförs av en samarbetspartner.",
    ingress:
      "Ska du flytta i Ljunghusen? Beskriv bostaden och ditt datum, så får du en offert med tydlig omfattning.",
    omOrten: [
      "Ljunghusen ligger på Falsterbonäset mellan Höllviken och Skanör, i en karaktäristisk tallskogsmiljö. Bebyggelsen är villor på stora, skogsbevuxna tomter.",
      "Vägnätet här är smalt och slingrande mellan tallarna, vilket skiljer orten från de mer öppna delarna av Näset. Det påverkar framkomligheten för större fordon.",
    ],
    bebyggelse:
      "Villabebyggelse i tallskogsmiljö, med inslag av äldre fritidshus.",
    vanligaStrackor: [
      "Inom Ljunghusen och närområdet",
      "Ljunghusen–Höllviken",
      "Ljunghusen till och från övriga Skåne",
    ],
    praktiskt: [
      {
        rubrik: "Smala skogsvägar",
        text: "Vägarna mellan tallarna är trånga med begränsad vändmöjlighet. Nämn det i förfrågan.",
      },
      {
        rubrik: "Långt ut på Näset",
        text: "Transportsträckan från Malmö är påtaglig och räknas in i offerten.",
      },
    ],
    fragor: [
      {
        fraga: "Går det att komma fram i Ljunghusen?",
        svar: "Oftast ja, men beskriv gatan i förfrågan så planeras uppdraget efter förutsättningarna.",
      },
      {
        fraga: "Flyttar ni fritidshus?",
        svar: "Ja. Ange vad som ska flyttas så speglar offerten den verkliga omfattningen.",
      },
    ],
    narliggande: ["hollviken", "skanor", "vellinge"],
  },
];

export function hittaOrt(slug: string): Ort | undefined {
  return orter.find((o) => o.slug === slug);
}

/** Storstäder – egen URL i rooten: /flyttfirma-helsingborg */
export const storstader = orter.filter((o) => o.typ === "storstad");

/** Mindre orter – under /flyttfirma/: /flyttfirma/hassleholm */
export const mindreOrter = orter.filter((o) => o.typ === "mindre");

/**
 * URL till en orts sida. Använd ALLTID denna i stället för att bygga
 * sökvägen för hand – då kan en ort flyttas mellan typerna utan att
 * länkar runt om i sajten går sönder.
 */
export function ortPath(ort: Pick<Ort, "slug" | "typ">): string {
  return ort.typ === "storstad"
    ? `/flyttfirma-${ort.slug}`
    : `/flyttfirma/${ort.slug}`;
}

/** Slugs i den ordning de ska visas. Används av sitemap. */
export const ortSlugs = orter.map((o) => o.slug);
