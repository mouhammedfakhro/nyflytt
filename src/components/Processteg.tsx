/**
 * Processen från förfrågan till utfört uppdrag.
 * Delas mellan startsidan och /sa-fungerar-det.
 */
export const processteg = [
  {
    nummer: "01",
    rubrik: "Du beskriver behovet",
    text: "Fyll i offertformuläret: vad du behöver hjälp med, adresser, bostadens storlek och önskat datum. Det tar några minuter.",
  },
  {
    nummer: "02",
    rubrik: "Vi går igenom förfrågan",
    text: "Vi läser igenom uppgifterna och hör av oss om något behöver förtydligas innan vi kan räkna på jobbet.",
  },
  {
    nummer: "03",
    rubrik: "Du får en offert",
    text: "Offerten visar vad som ingår och vad det kostar. Stämmer något inte hör du av dig – du binder dig inte förrän du tackar ja.",
  },
  {
    nummer: "04",
    rubrik: "En samarbetspartner utför jobbet",
    text: "Tackar du ja bokar vi uppdraget med en av våra samarbetspartners och bekräftar datum och tider med dig.",
  },
];

export function Processteg({ kompakt = false }: { kompakt?: boolean }) {
  return (
    <ol
      className={
        kompakt
          ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          : "space-y-4"
      }
    >
      {processteg.map((steg) => (
        <li
          key={steg.nummer}
          className={
            kompakt
              ? "relative"
              : "relative rounded-3xl bg-white p-6 ring-1 ring-sand-200 sm:p-7"
          }
        >
          <span
            className={`font-sans font-bold tabular-nums text-korall-600 ${
              kompakt ? "text-2xl" : "text-xl"
            }`}
          >
            {steg.nummer}
          </span>
          <h3
            className={`mt-2 font-sans font-bold text-sand-950 ${
              kompakt ? "text-lg" : "text-xl"
            }`}
          >
            {steg.rubrik}
          </h3>
          <p className="mt-2 leading-relaxed text-sand-600">{steg.text}</p>
        </li>
      ))}
    </ol>
  );
}
