import Image from "next/image";

/**
 * Bild i samma format som platshållaren hade.
 *
 * Använder next/image, som ger avif/webp, rätt srcset och lazy loading.
 * Källfilerna är redan WebP; next/image omkodar till avif där stöd finns.
 * Bilderna ligger i `public/bilder/` och är fotograferade utan text i motivet.
 *
 * BILDKÄLLA: foton från Pexels (Pexels-licensen – fri användning även
 * kommersiellt, ingen attribution krävs). Vill ni byta till egna foton:
 * lägg filen i `public/bilder/` och byt `src` och `alt` där komponenten
 * används. Behåll beskrivande filnamn.
 */

type Props = {
  src: string;
  /** Beskriv vad som händer i bilden. Tom sträng om bilden är rent dekorativ. */
  alt: string;
  format?: "liggande" | "staende" | "kvadrat" | "bred";
  /** Sätt true för bilden överst på sidan så den inte lazy-laddas. */
  prioritet?: boolean;
  className?: string;
  /** Hur bred bilden blir i olika brytpunkter – styr vilken fil som hämtas. */
  sizes?: string;
};

const format2klass = {
  liggande: "aspect-[4/3]",
  staende: "aspect-[3/4]",
  kvadrat: "aspect-square",
  bred: "aspect-[16/9]",
} as const;

export function Bild({
  src,
  alt,
  format = "liggande",
  prioritet = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: Props) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-sand-100 ${format2klass[format]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={prioritet}
        className="object-cover"
      />
    </div>
  );
}
