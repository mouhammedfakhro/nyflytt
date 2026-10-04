import Link from "next/link";
import { Ikon } from "@/components/Ikon";
import { Logo } from "@/components/Logo";
import { footerNav } from "@/lib/navigation";
import { ortPath, orter } from "@/lib/orter";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const ar = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-sand-950 text-sand-300">
      <div className="behallare py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Varumärke och kontakt */}
          <div>
            <Logo ljus />
            <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed text-sand-400">
              Flytt och flyttstädning bokat på ett ställe. Uppdragen utförs av
              våra samarbetspartners.
            </p>

            <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
              <li>
                <a
                  href={`mailto:${siteConfig.kontakt.epost}`}
                  className="inline-flex items-center gap-2.5 text-sand-300 transition-colors hover:text-white"
                >
                  <Ikon namn="epost" className="size-[1.125rem] shrink-0 text-korall-400" />
                  {siteConfig.kontakt.epost}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sand-400">
                <Ikon namn="klocka" className="size-[1.125rem] shrink-0 text-korall-400" />
                {siteConfig.kontakt.oppettider}
              </li>
            </ul>
          </div>

          {/* Länkkolumner */}
          {footerNav.map((grupp) => (
            <nav key={grupp.rubrik} aria-labelledby={`footer-${grupp.rubrik}`}>
              <h2
                id={`footer-${grupp.rubrik}`}
                className="font-sans text-sm font-semibold uppercase tracking-wider text-white"
              >
                {grupp.rubrik}
              </h2>
              <ul className="mt-4 space-y-2.5 text-[0.9375rem]">
                {grupp.lankar.map((lank) => (
                  <li key={lank.href}>
                    <Link
                      href={lank.href}
                      className="text-sand-400 transition-colors hover:text-white"
                    >
                      {lank.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Ortslänkar – hjälper både besökare och internlänkning */}
        <nav aria-labelledby="footer-orter" className="mt-12 border-t border-sand-800 pt-8">
          <h2
            id="footer-orter"
            className="font-sans text-sm font-semibold uppercase tracking-wider text-white"
          >
            Orter vi arbetar i
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.9375rem]">
            {orter.map((ort) => (
              <li key={ort.slug}>
                <Link
                  href={ortPath(ort)}
                  className="text-sand-400 transition-colors hover:text-white"
                >
                  Flytthjälp {ort.iOrt}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 flex flex-col gap-2 border-t border-sand-800 pt-8 text-sm text-sand-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {ar} {siteConfig.organisation.juridisktNamn || siteConfig.name}
          </p>
          {/* PLATSHÅLLARE: organisationsnummer visas när det är ifyllt i lib/site.ts */}
          {siteConfig.organisation.organisationsnummer ? (
            <p>Org.nr {siteConfig.organisation.organisationsnummer}</p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
