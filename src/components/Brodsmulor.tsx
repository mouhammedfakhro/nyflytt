import Link from "next/link";

export type Brodsmula = { namn: string; path: string };

/**
 * Brödsmulor. Sista objektet är nuvarande sida och renderas som text.
 * Matchande JSON-LD läggs till separat via `brodsmulaSchema()`.
 */
export function Brodsmulor({ items }: { items: Brodsmula[] }) {
  return (
    <nav aria-label="Brödsmulor" className="behallare pt-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-sand-500">
        {items.map((item, i) => {
          const sist = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {sist ? (
                <span aria-current="page" className="font-medium text-sand-700">
                  {item.namn}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition-colors hover:text-korall-700 hover:underline"
                >
                  {item.namn}
                </Link>
              )}
              {sist ? null : (
                <span aria-hidden="true" className="text-sand-300">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
