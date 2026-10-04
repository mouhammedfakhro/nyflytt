# Uppgifter att fylla i före publicering

Den här listan samlar allt som **måste kompletteras eller verifieras** innan
nyflytt.se går live. Inget av det nedan är påhittat i koden – där uppgifter
saknas finns tydliga platshållare i stället för gissningar.

---

## 1. Kritiskt – blockerar publicering

### 1.1 Företagsuppgifter
**Fil:** `src/lib/site.ts` → `siteConfig.organisation`

| Fält | Status | Används i |
|---|---|---|
| `juridisktNamn` | Tomt | Sidfot, strukturerad data (`Organization.name`) |
| `organisationsnummer` | Tomt | Sidfot, strukturerad data (`identifier`) |
| `adress`, `postnummer`, `postort` | Tomma | Kontaktsida, strukturerad data (`PostalAddress`) |

Tomma fält **utesluts automatiskt** från JSON-LD (se `rensa()` i
`src/lib/schema.ts`), så ingenting halvfärdigt publiceras. Men sidfoten faller
tillbaka på varumärkesnamnet "Nyflytt" i stället för det juridiska namnet.

### 1.2 Kontaktuppgifter
**Fil:** `src/lib/site.ts` → `siteConfig.kontakt`

| Fält | Nuvarande värde | Åtgärd |
|---|---|---|
| `epost` | `hej@nyflytt.se` | Bekräfta att adressen finns och bevakas |
| `telefon` / `telefonVisning` | `+46 000 00 00 00` | **Ersätt, eller ta bort telefonkortet** på `/kontakt` om ni inte vill ha telefonkontakt |
| `oppettider` | `Vardagar 08–17` | Bekräfta faktiska tider |

Telefonnumret visas som en tydligt markerad platshållare på `/kontakt` –
det publiceras inte som om det vore riktigt.

### 1.3 Juridiska sidor
**Filer:** `src/app/integritetspolicy/page.tsx`, `src/app/cookies/page.tsx`

Båda sidorna är **utkast satta till `noIndex: true`** och visar en synlig
varningsruta. De innehåller en avsnittsstruktur och beskriver vilka uppgifter
som saknas, men är **inte juridiskt granskade**.

Att göra:
1. Låt någon med dataskyddskompetens granska och komplettera texterna.
2. Fyll i lagringstider, rättslig grund, mottagarkategorier och
   personuppgiftsbiträdesavtal.
3. Ta bort `noIndex: true` och varningsrutan (`JuridiskSida`-komponenten).
4. Lägg till sidorna i `src/app/sitemap.ts`.

### 1.4 Domän
**Fil:** `.env.local` / hostingens miljövariabler

```
NEXT_PUBLIC_SITE_URL=https://nyflytt.se
```

`.env.local` pekar i dag på `http://localhost:3000`. Sätts denna fel blir
canonical-URL:er, OG-taggar, sitemap och robots.txt fel.

---

## 2. Påståenden som måste verifieras

Dessa formuleringar finns i texten i dag. De är skrivna försiktigt, men
**bekräfta att de stämmer** – annars ska de ändras.

| Påstående | Var | Bekräfta |
|---|---|---|
| "Nio orter i Skåne och Halland" | Startsida, `/om-oss`, schema `areaServed` | Att ni faktiskt kan leverera i **alla nio** orterna |
| "Uppdraget utförs av en av våra samarbetspartners" | Genomgående | Att modellen beskrivs korrekt |
| "Vilken partner det blir framgår innan du bokar" | `/om-oss`, `src/lib/faq.ts` | Att ni verkligen uppger partnern före bokning |
| Vad som ingår i flytthjälp | `src/lib/tjanster.ts` → `bohagsflytt.ingar` | Att momenten stämmer med vad partnerna levererar |
| Vad som ingår i flyttstädning | `src/lib/tjanster.ts` → `flyttstadning.ingar` | Särskilt fönsterputs och vitvaror |
| "Genomgång innan offert för större verksamheter" | `foretagsflytt` | Att detta erbjuds |

**Medvetet utelämnat** (får inte läggas till utan underlag): kundomdömen,
betyg, antal genomförda flyttar, partnerlogotyper, lokalt kontor, lokal
personal, inställelsetid, garanterad områdestäckning, prisuppgifter.

---

## 3. Saknade villkor – markerade i koden

Sök på `KRÄVER UPPGIFT` för att hitta dem:

```bash
grep -rn "KRÄVER UPPGIFT" src/
```

| Fråga | Fil | Vad som saknas |
|---|---|---|
| "Vad kostar en flytt?" | `src/lib/faq.ts` | Prismodell – timpris, intervall eller inget alls |
| "Vad händer om något går sönder?" | `src/lib/faq.ts` | Försäkringsskydd och ansvarsfördelning mellan Nyflytt och partner |
| "Om besiktningen inte godkänns" | `src/app/flyttstadning/page.tsx` | Villkor för omstädning |
| "Blir det billigare att boka båda?" | `src/app/flytt-och-stad/page.tsx` | Eventuell paketrabatt |
| Krav på samarbetspartners | `src/app/sa-fungerar-det/page.tsx` | F-skatt, ansvarsförsäkring, kollektivavtal, kontroller |

---

## 4. CRM-koppling

**Filer:** `src/lib/crm/` (adapter), `src/lib/offert/actions.ts` (server action)

I dag används `mockAdapter`, som **inte skickar något någonstans**. Den loggar
till serverkonsolen och skriver till `.data/offertforfragningar.jsonl` i
utvecklingsläge (katalogen är gitignorerad).

> **Viktigt:** i produktion utan riktig adapter är serverloggen enda spåret av
> en förfrågan. Sätt `CRM_ADAPTER` innan lansering.

### Så kopplar ni in det skarpa CRM:et

1. Skapa `src/lib/crm/adapters/<ert-crm>.ts` som uppfyller `CrmAdapter`.
   Använd `adapters/http.ts` som utgångspunkt – den har redan timeout (10 s),
   felhantering och loggning utan personuppgifter.
2. Anpassa i `adapters/http.ts`:
   - `byggKropp()` – mappa vår nyttolast till CRM:ets fältnamn
   - `lasUtId()` – plocka ut CRM:ets id ur svaret
   - Autentisering, om Bearer-token inte passar
3. Registrera adaptern i `valjAdapter()` i `src/lib/crm/index.ts`.
4. Sätt miljövariabler:
   ```
   CRM_ADAPTER=http
   CRM_API_URL=https://...
   CRM_API_KEY=...
   ```

Nyttolasten som skickas är typad som `CrmForfragan` i `src/lib/crm/index.ts`.

### E-postkvittens
Kunden får i dag ett kvitto **på skärmen** med referensnummer, men **inget
e-postmeddelande** skickas. Vill ni det behöver en e-posttjänst kopplas in –
lämpligen i `skickaOffertforfragan()` efter lyckat CRM-anrop.

---

## 5. Logotyp och bilder

| Sak | Status | Åtgärd |
|---|---|---|
| Logotyp | **Klar** – `public/logo.png` (945×257) används i header och footer | Vill ni ha en variant för mörk bakgrund: lägg `public/logo-ljus.png`, se kommentar i `src/components/Logo.tsx` |
| Favicon | Next.js standard (`src/app/favicon.ico`) | Ersätt med Nyflytts ikon |
| OG-delningsbild | Genereras i `src/app/opengraph-image.tsx` | Fungerar som den är. Vill ni egen grafik: lägg `opengraph-image.png` (1200×630) i `src/app/` och ta bort .tsx-filen |

### Bilder på startsidan

Startsidan har **8 foton** i `public/bilder/`. De är hämtade från **Pexels**
(Pexels-licensen: fri användning även kommersiellt, ingen attribution krävs)
och valda så att **ingen text syns i motivet** – flera kandidater valdes bort
just för att det stod "KITCHEN" eller "TOYS" på kartongerna.

| Fil | Motiv | Används |
|---|---|---|
| `hero-par-packar-upp-i-nytt-kok.jpg` | Par packar upp i kök | Hero |
| `bohagsflytt-barhjalp-i-trapphus.jpg` | Kartong bärs uppför trappa | Flytthjälp |
| `flyttstadning-rent-kok-efter-stadning.jpg` | Nystädat ljust kök | Flyttstädning |
| `foretagsflytt-kartonger-i-tom-lokal.jpg` | Kartonger i tömd lokal | Företagsflytt |
| `flytt-och-stad-rengoring-av-spegel.jpg` | Spegel rengörs med handske | Flytt och städ |
| `varderingar-par-packar-kartonger.jpg` | Två personer packar | Värdering 1 |
| `varderingar-staplade-flyttkartonger.jpg` | Staplade kartonger | Värdering 2 |
| `varderingar-inflyttat-vardagsrum.jpg` | Inrett vardagsrum | Värdering 3 |

Alla har beskrivande svensk alt-text, serveras via `next/image` (avif/webp,
rätt srcset) och lazy-laddas utom heroebilden, som är prioriterad för LCP.

**Byta till egna foton:** lägg filen i `public/bilder/` och ändra `src` + `alt`
i `src/lib/startsida.ts` (tjänster och värderingar), `src/components/Hero.tsx`
eller `src/app/page.tsx` (flytt och städ). Komponenten `src/components/Bild.tsx`
sköter formatet.

> **Rekommendation:** byt till egna foton av faktiska uppdrag när sådana finns.
> Stockbilder fungerar men egna bilder bygger mer förtroende.

Övrig grafik (ikoner, logotyp, bakgrundsformer) är egenritad inline-SVG.

### Medvetet utelämnat: certifieringsmärken och omdömen

Sajten innehåller **inga** kundomdömen, betyg, stjärnor, Reco-märken,
UC-sigill, Trygg-Hansa-logotyper, Dun & Bradstreet-certifikat eller
partnerlogotyper. Det är ett medvetet val – sådant får bara läggas till om det
är verifierat och ni har rätt att visa märket.

Vill ni lägga till det senare: kontrollera licensvillkoren för varje märke, och
lägg **aldrig** in `aggregateRating` eller `review` i den strukturerade datan
utan verkliga, verifierbara omdömen (det bryter mot Googles riktlinjer).

---

## 6. Google Search Console och analys

### Search Console
Sätt miljövariabeln – verifieringstaggen läggs då till automatiskt:
```
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token från Search Console>
```
Skicka in `https://nyflytt.se/sitemap.xml` efter lansering.

### Analys
**Inga tredjepartsskript är aktiverade** – medvetet, för prestanda och för att
slippa cookie-samtycke. Aktiveras analys senare:
1. Lägg till skriptet (gärna via `next/script` med `strategy="afterInteractive"`).
2. **Bygg en samtyckeslösning först** – icke-nödvändiga cookies kräver samtycke
   enligt lagen om elektronisk kommunikation.
3. Uppdatera `/cookies` med en fullständig cookietabell.
4. Uppdatera integritetspolicyn.

---

## 6b. URL-struktur för orter – två sidtyper

Sajten har **72 ortssidor** i två varianter. Typen styrs av fältet `typ` i
`src/lib/orter.ts`.

| Typ | URL-mönster | Antal | Orter |
|---|---|---|---|
| `storstad` | `/flyttfirma-<slug>` | 7 | Helsingborg, Malmö, Lund, Landskrona, Ängelholm, Halmstad, Kristianstad |
| `mindre` | `/flyttfirma/<slug>` | 65 | Ödåkra, Höör, Ystad, Vellinge, Höganäs m.fl. |

### Skillnaden är innehåll, inte bara layout

Storstadssidorna har **två extra avsnitt**:
1. **Områdesguide** (`stadsdelar`) – 4 stadsdelar med egen text
2. **Fördjupning** (`fordjupning`) – 3 avsnitt med längre resonemang

De får också fler frågor i FAQ (6 generella i stället för 4).

### Innehållet är unikt per ort

Varje ortssida har egen brödtext om läge, bebyggelse och pendlingsmönster –
kontrollerat att ingen sida delar text med någon annan. Det är detta som gör
att en sökning på "flyttfirma Höör" kan landa på rätt sida.

Texterna beskriver **allmänt kända förhållanden om orten** (bebyggelse,
avstånd, framkomlighet), inte påståenden om Nyflytts närvaro där. Vi skriver
aldrig att vi har lokalt kontor eller personal på orten.

### Var orterna visas

- **Navmenyn, hero, startsidan, om-oss, tjänstesidor:** bara de 7 storstäderna.
  Alla 72 hade gjort menyerna oanvändbara.
- **Sidfoten:** alla 72, för internlänkning.
- **Sitemap:** alla 72.

### Flytta en ort mellan typerna

1. Fyll i `stadsdelar` och `fordjupning` för orten i `src/lib/orter.ts`.
2. Ändra `typ` till `"storstad"`.
3. **Lägg till en 301-redirect** i `next.config.ts` – se `redirects()` där
   Kristianstad, Landskrona och Ängelholm redan ligger. Utan den slutar den
   gamla URL:en fungera.

URL, sitemap, navigation och interna länkar följer automatiskt med via
hjälpfunktionen `ortPath()`.

> **Byt aldrig bara `typ`** utan att skriva innehållet – då blir den större
> mallen en tom skal-sida, vilket är sämre än att orten ligger kvar som mindre.

### Tekniska detaljer

- Storstädernas route ligger i rooten (`src/app/[flyttfirmaStad]/page.tsx`).
  `dynamicParams = false` gör att den bara matchar de faktiska storstäderna
  och inte slukar andra sidors adresser.
- Varje ort nås på **exakt en** URL. Fel mönster ger 404 (eller 308 för de tre
  som har redirect), så inget duplicerat innehåll uppstår.

## 7. Att lägga till senare

### Nya tjänster (packhjälp, montering, magasinering)
Strukturen finns redan i `src/lib/tjanster.ts` med `aktiv: false`. De renderas
inte någonstans och hamnar inte i sitemap så länge flaggan är false.

För att aktivera:
1. Fyll i texterna (`sammanfattning`, `metaBeskrivning`, `rubrik`, `ingress`,
   `ingar`, `braAttVeta`) – ersätt alla `PLATSHÅLLARE`.
2. Sätt `aktiv: true`.
3. Skapa `src/app/<slug>/page.tsx` – kopiera mönstret från
   `src/app/bohagsflytt/page.tsx` (fyra rader plus egna frågor).

Navigation, sitemap, tjänstekort och korslänkar uppdateras automatiskt.

### Tjänst + ort-kombinationssidor
**Medvetet inte byggda.** Nio orter × fyra tjänster = 36 sidor som skulle bli
tunt innehåll, vilket riskerar att skada sajten snarare än hjälpa.

Arkitekturen är förberedd: ortsdatan i `src/lib/orter.ts` har redan
ortsspecifika fält (`omOrten`, `praktiskt`, `vanligaStrackor`, `fragor`). När
det finns **verkligt unikt och användbart** innehåll per kombination kan en
route som `/orter/[stad]/[tjanst]` läggas till. Gör det bara för kombinationer
där ni faktiskt har något eget att säga – inte för alla 36.

---

## Snabbchecklista före lansering

- [ ] `NEXT_PUBLIC_SITE_URL` satt till skarp domän
- [ ] Organisationsuppgifter ifyllda i `src/lib/site.ts`
- [ ] Telefonnummer ifyllt eller telefonkortet borttaget
- [ ] Integritetspolicy juridiskt granskad, `noIndex` borttaget, tillagd i sitemap
- [ ] Cookiesida granskad, `noIndex` borttaget, tillagd i sitemap
- [ ] Alla `KRÄVER UPPGIFT`-punkter besvarade
- [ ] `CRM_ADAPTER` satt till skarp adapter och testad
- [ ] Logotyp och favicon utbytta
- [ ] Search Console-verifiering satt och sitemap inskickad
- [ ] Påståendena i avsnitt 2 verifierade
