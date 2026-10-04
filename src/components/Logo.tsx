import Image from "next/image";

/**
 * Nyflytts logotyp.
 *
 * Källfil: `public/logo.webp` (945×257, transparent bakgrund).
 * Höjden styrs via `className` från anropande komponent – bredden följer med
 * automatiskt eftersom `height: auto` är satt.
 *
 * Ordmärket är svart, så på mörk bakgrund (footern) läggs loggan på en ljus
 * platta i stället för att inverteras – invertering hade gjort även det
 * korallfärgade märket vitt och tappat varumärkesfärgen.
 *
 * Har ni en logotyp framtagen för mörk bakgrund: lägg `public/logo-ljus.png`
 * och byt `src` nedan när `ljus` är true, så kan plattan tas bort.
 */

type Props = {
  className?: string;
  /** Variant för mörk bakgrund – loggan läggs på en ljus platta. */
  ljus?: boolean;
};

export function Logo({ className = "h-9", ljus = false }: Props) {
  const bild = (
    <Image
      src="/logo.webp"
      alt="Nyflytt"
      // Visningsstorleken, inte källfilens mått (945×257). next/image hämtar
      // då en lagom stor fil i stället för originalet i full bredd.
      width={176}
      height={48}
      priority
      className={`w-auto ${className}`}
    />
  );

  if (!ljus) return bild;

  return (
    <span className="inline-flex rounded-xl bg-sand-50 px-3.5 py-2.5">
      {bild}
    </span>
  );
}
