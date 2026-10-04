import { aktivaTjanster } from "@/lib/tjanster";

export type NavLank = { href: string; text: string; beskrivning?: string };

/** Tjänstelänkar genereras från katalogen så nav och sitemap aldrig glider isär. */
export const tjanstLankar: NavLank[] = aktivaTjanster.map((t) => ({
  href: `/${t.slug}`,
  text: t.kortNamn,
  beskrivning: t.sammanfattning,
}));

export const footerNav: { rubrik: string; lankar: NavLank[] }[] = [
  { rubrik: "Tjänster", lankar: tjanstLankar },
  {
    rubrik: "Om Nyflytt",
    lankar: [
      { href: "/sa-fungerar-det", text: "Så fungerar det" },
      { href: "/om-oss", text: "Om oss" },
      { href: "/kontakt", text: "Kontakt" },
      { href: "/offert", text: "Begär offert" },
    ],
  },
  {
    rubrik: "Juridiskt",
    lankar: [
      { href: "/integritetspolicy", text: "Integritetspolicy" },
      { href: "/cookies", text: "Om cookies" },
    ],
  },
];
