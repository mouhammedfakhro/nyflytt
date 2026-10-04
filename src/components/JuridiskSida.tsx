import Link from "next/link";
import { Brodsmulor } from "@/components/Brodsmulor";
import { siteConfig } from "@/lib/site";

/**
 * Layout för juridiska sidor (integritetspolicy, cookies).
 *
 * Sidorna är PLATSHÅLLARE och ska granskas juridiskt innan publicering.
 * De är satta till noindex i sina respektive page.tsx tills innehållet är klart.
 */
export function JuridiskSida({
  rubrik,
  path,
  ingress,
  avsnitt,
}: {
  rubrik: string;
  path: string;
  ingress: string;
  avsnitt: { rubrik: string; stycken: string[]; punkter?: string[] }[];
}) {
  return (
    <>
      <Brodsmulor
        items={[
          { namn: "Start", path: "/" },
          { namn: rubrik, path },
        ]}
      />

      <article className="behallare pt-8 pb-20 sm:pt-12">
        <div className="max-w-[72ch]">
          <h1 className="text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
            {rubrik}
          </h1>

          {/* Tydlig varning så att ingen tror att texten är färdig */}
          <div className="mt-8 rounded-2xl border-2 border-dashed border-korall-300 bg-korall-50/70 p-5 sm:p-6">
            <p className="font-sans font-bold text-sand-950">
              Platshållare – måste granskas juridiskt före publicering
            </p>
            <p className="mt-2 leading-relaxed text-sand-700">
              Texten nedan är ett utkast som beskriver vilka avsnitt som behövs
              och vilka uppgifter som saknas. Den är <strong>inte</strong> en
              färdig eller juridiskt granskad policy, och sidan är satt till
              noindex tills den är det. Låt någon med dataskyddskompetens gå
              igenom och komplettera innan lansering.
            </p>
          </div>

          <p className="mt-8 text-lg leading-relaxed text-sand-700">{ingress}</p>

          <div className="mt-12 space-y-10">
            {avsnitt.map((a) => (
              <section key={a.rubrik}>
                <h2 className="font-sans text-2xl font-bold text-sand-950">
                  {a.rubrik}
                </h2>
                <div className="mt-4 space-y-4 text-[1.0625rem] leading-relaxed text-sand-700">
                  {a.stycken.map((s, i) => (
                    <p key={i}>{s}</p>
                  ))}
                </div>
                {a.punkter && a.punkter.length > 0 ? (
                  <ul className="mt-4 space-y-2.5">
                    {a.punkter.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-korall-600"
                        />
                        <span className="leading-relaxed text-sand-700">{p}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <div className="mt-14 rounded-2xl bg-sand-100/70 p-6">
            <h2 className="font-sans text-lg font-bold text-sand-950">
              Frågor om dina uppgifter?
            </h2>
            <p className="mt-2 leading-relaxed text-sand-700">
              Kontakta oss på{" "}
              <a
                href={`mailto:${siteConfig.kontakt.epost}`}
                className="font-medium text-korall-700 underline underline-offset-2"
              >
                {siteConfig.kontakt.epost}
              </a>
              , eller läs mer på{" "}
              <Link
                href="/kontakt"
                className="font-medium text-korall-700 underline underline-offset-2"
              >
                kontaktsidan
              </Link>
              .
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
