import Link from "next/link";
import { Ikon } from "@/components/Ikon";
import { aktivaTjanster } from "@/lib/tjanster";

/** Tjänsteöversikt. Hela kortet är en länk för stor träffyta på mobil. */
export function TjanstKort() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2">
      {aktivaTjanster.map((t) => (
        <li key={t.slug}>
          <Link
            href={`/${t.slug}`}
            className="group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-sand-200 transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-lyft hover:ring-korall-300 sm:p-7"
          >
            <span className="flex size-12 items-center justify-center rounded-2xl bg-korall-50 text-korall-700 ring-1 ring-korall-100 transition-colors group-hover:bg-korall-100">
              <Ikon namn={t.ikon} className="size-6" />
            </span>

            <h3 className="mt-5 font-sans text-xl font-bold text-sand-950">
              {t.kortNamn}
            </h3>
            <p className="mt-2 flex-1 leading-relaxed text-sand-600">
              {t.sammanfattning}
            </p>

            <span className="mt-5 inline-flex items-center gap-1.5 font-sans text-[0.9375rem] font-semibold text-korall-700">
              Läs mer
              <Ikon
                namn="pil"
                className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
