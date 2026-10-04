import Link from "next/link";
import { KnappLank } from "@/components/Knapp";
import { aktivaTjanster } from "@/lib/tjanster";

/** 404-sida med vägar vidare i stället för en återvändsgränd. */
export default function IckeHittad() {
  return (
    <div className="behallare flex min-h-[60vh] flex-col justify-center py-20">
      <div className="max-w-2xl">
        <p className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-korall-700">
          404
        </p>
        <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-[-0.03em] text-sand-950 sm:text-5xl">
          Sidan finns inte
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-sand-700">
          Adressen kan ha ändrats, eller så blev det ett stavfel. Här är några
          vägar vidare.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <KnappLank href="/" storlek="lg" medPil>
            Till startsidan
          </KnappLank>
          <KnappLank href="/offert" storlek="lg" variant="sekundar">
            Begär offert
          </KnappLank>
        </div>

        <nav aria-label="Genvägar" className="mt-12 border-t border-sand-200 pt-8">
          <h2 className="font-sans text-sm font-semibold uppercase tracking-[0.12em] text-sand-500">
            Tjänster
          </h2>
          <ul className="mt-3.5 flex flex-wrap gap-2">
            {aktivaTjanster.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-[0.9375rem] font-medium text-sand-700 ring-1 ring-sand-200 transition-colors hover:text-korall-700 hover:ring-korall-400"
                >
                  {t.kortNamn}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/flyttfirma"
                className="inline-flex min-h-9 items-center rounded-full bg-white px-3.5 text-[0.9375rem] font-medium text-sand-700 ring-1 ring-sand-200 transition-colors hover:text-korall-700 hover:ring-korall-400"
              >
                Flyttfirma i din ort
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
