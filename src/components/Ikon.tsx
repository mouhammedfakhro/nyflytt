/**
 * Egenritade ikoner. Enhetlig 24x24-ruta, 1.5px linjer, currentColor.
 * Dekorativa som standard (aria-hidden) – sätt `titel` om ikonen bär
 * information som inte finns i texten runt omkring.
 */

export type IkonNamn =
  | "lada"
  | "mopp"
  | "kombo"
  | "kontor"
  | "pack"
  | "verktyg"
  | "lager"
  | "pil"
  | "check"
  | "telefon"
  | "epost"
  | "plats"
  | "klocka"
  | "meny"
  | "stang"
  | "chevron";

type Props = {
  namn: IkonNamn;
  className?: string;
  /** Sätt om ikonen förmedlar egen information – gör den synlig för skärmläsare. */
  titel?: string;
};

const banor: Record<IkonNamn, React.ReactNode> = {
  // Flyttlåda
  lada: (
    <>
      <path d="M3 8.5 12 4l9 4.5v7L12 20l-9-4.5z" />
      <path d="M3 8.5 12 13l9-4.5M12 13v7" />
      <path d="M8.5 6.2 17 10.5" />
    </>
  ),
  // Mopp/städ
  mopp: (
    <>
      <path d="M14.5 3 9 8.5" />
      <path d="M7.2 10.8 4 14l6 6 3.2-3.2z" />
      <path d="M13.2 16.8 20 10a2.5 2.5 0 0 0-3.5-3.5L9.7 13.3z" />
      <path d="M17.5 3.5 19 2M20.5 6.5 22 5M21 11h1.5" />
    </>
  ),
  // Flytt + städ kombinerat
  kombo: (
    <>
      <path d="M3 9l6-3 6 3v6l-6 3-6-3z" />
      <path d="M3 9l6 3 6-3M9 12v6" />
      <path d="M18 3.5 15.5 6M20.5 8 18 10.5" />
      <path d="M17 14.5c2 0 3.5 1.6 3.5 3.5S19 21.5 17 21.5" />
    </>
  ),
  // Kontor/företag
  kontor: (
    <>
      <path d="M4 21V5.5A1.5 1.5 0 0 1 5.5 4h7A1.5 1.5 0 0 1 14 5.5V21" />
      <path d="M14 10h4.5A1.5 1.5 0 0 1 20 11.5V21" />
      <path d="M2.5 21h19" />
      <path d="M7 8h4M7 12h4M7 16h4M17 14h1M17 17.5h1" />
    </>
  ),
  // Packhjälp
  pack: (
    <>
      <path d="M4 7.5h16v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 19.5z" />
      <path d="M2.5 4.5h19v3h-19zM10 12h4" />
    </>
  ),
  // Montering
  verktyg: (
    <>
      <path d="M14.5 6.5a3.5 3.5 0 0 0 4.8 4.8l1.2 1.2-5.5 5.5-1.2-1.2a3.5 3.5 0 0 0-4.8-4.8z" />
      <path d="M6.5 17.5 4 20M3.5 13.5 6 11l2.5 2.5" />
    </>
  ),
  // Magasinering
  lager: (
    <>
      <path d="M3 10.5 12 5l9 5.5V21H3z" />
      <path d="M8 21v-6h8v6M8 18h8" />
    </>
  ),
  pil: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M4.5 12.5 9.5 17.5 19.5 7" />,
  telefon: (
    <path d="M6.5 3.5h3l1.5 4-2 1.5a10.5 10.5 0 0 0 5 5L15.5 12l4 1.5v3a2 2 0 0 1-2.2 2A15.5 15.5 0 0 1 4.5 5.7a2 2 0 0 1 2-2.2z" />
  ),
  epost: (
    <>
      <path d="M3.5 5.5h17v13h-17z" />
      <path d="m3.5 6.5 8.5 6 8.5-6" />
    </>
  ),
  plats: (
    <>
      <path d="M12 21.5s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" />
      <circle cx="12" cy="10.5" r="2.5" />
    </>
  ),
  klocka: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  meny: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  stang: <path d="M6 6l12 12M18 6L6 18" />,
  chevron: <path d="m6 9 6 6 6-6" />,
};

export function Ikon({ namn, className = "size-6", titel }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={titel ? undefined : true}
      role={titel ? "img" : undefined}
      aria-label={titel}
      focusable="false"
    >
      {banor[namn]}
    </svg>
  );
}
