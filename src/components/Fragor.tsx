import { Ikon } from "@/components/Ikon";
import type { Fraga } from "@/lib/faq";

/**
 * Frågor och svar byggda på <details>/<summary>.
 * Fungerar utan JavaScript och är tillgängligt för skärmläsare utan extra ARIA.
 */
export function Fragor({ fragor }: { fragor: Fraga[] }) {
  return (
    <div className="divide-y divide-sand-200 overflow-hidden rounded-2xl bg-white ring-1 ring-sand-200">
      {fragor.map((f) => (
        <details key={f.fraga} className="group">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5 text-left font-sans text-[1.0625rem] font-semibold text-sand-950 transition-colors hover:bg-sand-50 sm:p-6 [&::-webkit-details-marker]:hidden">
            <span>{f.fraga}</span>
            <Ikon
              namn="chevron"
              className="mt-0.5 size-5 shrink-0 text-korall-600 transition-transform duration-200 group-open:-rotate-180"
            />
          </summary>
          <div className="px-5 pb-5 sm:px-6 sm:pb-6">
            <p className="max-w-[68ch] leading-relaxed text-sand-600">{f.svar}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
