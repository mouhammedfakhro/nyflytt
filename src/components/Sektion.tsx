import type { ReactNode } from "react";

/** Standardsektion med konsekvent vertikal rytm. */
export function Sektion({
  children,
  className = "",
  id,
  bakgrund = "ingen",
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bakgrund?: "ingen" | "ljus" | "varm" | "mork";
  labelledBy?: string;
}) {
  const bakgrunder = {
    ingen: "",
    ljus: "bg-white",
    varm: "bg-korall-50/60",
    mork: "bg-sand-950 text-sand-100",
  } as const;

  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`py-16 sm:py-20 lg:py-24 ${bakgrunder[bakgrund]} ${className}`}
    >
      <div className="behallare">{children}</div>
    </section>
  );
}

/**
 * Sektionsrubrik med valfri ingress.
 * `niva` styr vilken rubriknivå som renderas så hierarkin blir korrekt per sida.
 */
export function SektionsRubrik({
  rubrik,
  ingress,
  id,
  niva = 2,
  centrerad = false,
  ljus = false,
}: {
  rubrik: string;
  ingress?: string;
  id?: string;
  niva?: 2 | 3;
  centrerad?: boolean;
  ljus?: boolean;
}) {
  const Rubrik = niva === 2 ? "h2" : "h3";

  return (
    <div className={`${centrerad ? "mx-auto text-center" : ""} max-w-2xl`}>
      <Rubrik
        id={id}
        className={`text-3xl font-bold sm:text-4xl ${
          niva === 2 ? "lg:text-[2.75rem] lg:leading-[1.1]" : ""
        } ${ljus ? "text-white" : "text-sand-950"}`}
      >
        {rubrik}
      </Rubrik>
      {ingress ? (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            ljus ? "text-sand-300" : "text-sand-600"
          }`}
        >
          {ingress}
        </p>
      ) : null}
    </div>
  );
}

/** Innehållsbredd för löpande brödtext – håller radlängden läsbar. */
export function Brodtext({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`max-w-[68ch] space-y-5 text-[1.0625rem] leading-relaxed text-sand-700 ${className}`}
    >
      {children}
    </div>
  );
}
