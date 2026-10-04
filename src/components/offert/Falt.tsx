"use client";

import type { ComponentProps, ReactNode } from "react";
import { Ikon } from "@/components/Ikon";

/**
 * Formulärfält.
 *
 * Tillgänglighet: varje fält har en riktig <label>, fel kopplas via
 * aria-describedby och aria-invalid, och felmeddelandet läses upp via
 * role="alert". Inga placeholder-texter som ersätter etiketter.
 */

const faltBas =
  "w-full rounded-xl border bg-white px-4 py-3 text-base text-sand-950 " +
  "transition-colors placeholder:text-sand-400 " +
  "focus:border-korall-600 focus:outline-none focus:ring-2 focus:ring-korall-600/25";

function felKlass(fel?: string) {
  return fel
    ? "border-red-400 focus:border-red-500 focus:ring-red-500/25"
    : "border-sand-300 hover:border-sand-400";
}

function Omslag({
  id,
  etikett,
  hjalptext,
  fel,
  krav,
  children,
}: {
  id: string;
  etikett: string;
  hjalptext?: string;
  fel?: string;
  krav?: boolean;
  children: ReactNode;
}) {
  return (
    // Flexkolumn så att fält bredvid varandra i ett grid får sina inputs på
    // samma höjd, även när bara det ena har hjälptext.
    <div className="flex h-full flex-col">
      <label htmlFor={id} className="block font-sans text-[0.9375rem] font-semibold text-sand-900">
        {etikett}
        {krav ? (
          <span className="ml-1 text-korall-700" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 font-body text-sm font-normal text-sand-500">
            (frivilligt)
          </span>
        )}
      </label>

      {hjalptext ? (
        <p id={`${id}-hjalp`} className="mt-1 grow text-sm leading-relaxed text-sand-500">
          {hjalptext}
        </p>
      ) : (
        <span className="grow" aria-hidden="true" />
      )}

      <div className="mt-2">{children}</div>

      {fel ? (
        <p
          id={`${id}-fel`}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-sm font-medium text-red-700"
        >
          <Ikon namn="stang" className="mt-0.5 size-4 shrink-0" />
          {fel}
        </p>
      ) : null}
    </div>
  );
}

/** Beskriver vilka id:n som ska kopplas till fältet. */
function beskrivsAv(id: string, fel?: string, hjalptext?: string) {
  const delar = [hjalptext ? `${id}-hjalp` : null, fel ? `${id}-fel` : null].filter(
    Boolean,
  );
  return delar.length > 0 ? delar.join(" ") : undefined;
}

export function TextFalt({
  id,
  etikett,
  hjalptext,
  fel,
  krav,
  ...rest
}: {
  id: string;
  etikett: string;
  hjalptext?: string;
  fel?: string;
  krav?: boolean;
} & ComponentProps<"input">) {
  return (
    <Omslag id={id} etikett={etikett} hjalptext={hjalptext} fel={fel} krav={krav}>
      <input
        id={id}
        name={id}
        aria-invalid={fel ? true : undefined}
        aria-describedby={beskrivsAv(id, fel, hjalptext)}
        className={`${faltBas} ${felKlass(fel)}`}
        {...rest}
      />
    </Omslag>
  );
}

export function TextomradeFalt({
  id,
  etikett,
  hjalptext,
  fel,
  krav,
  ...rest
}: {
  id: string;
  etikett: string;
  hjalptext?: string;
  fel?: string;
  krav?: boolean;
} & ComponentProps<"textarea">) {
  return (
    <Omslag id={id} etikett={etikett} hjalptext={hjalptext} fel={fel} krav={krav}>
      <textarea
        id={id}
        name={id}
        rows={4}
        aria-invalid={fel ? true : undefined}
        aria-describedby={beskrivsAv(id, fel, hjalptext)}
        className={`${faltBas} ${felKlass(fel)} resize-y`}
        {...rest}
      />
    </Omslag>
  );
}

export function ValFalt({
  id,
  etikett,
  hjalptext,
  fel,
  krav,
  alternativ,
  platshallare = "Välj…",
  ...rest
}: {
  id: string;
  etikett: string;
  hjalptext?: string;
  fel?: string;
  krav?: boolean;
  alternativ: { varde: string; text: string }[];
  platshallare?: string;
} & ComponentProps<"select">) {
  return (
    <Omslag id={id} etikett={etikett} hjalptext={hjalptext} fel={fel} krav={krav}>
      <div className="relative">
        <select
          id={id}
          name={id}
          aria-invalid={fel ? true : undefined}
          aria-describedby={beskrivsAv(id, fel, hjalptext)}
          className={`${faltBas} ${felKlass(fel)} cursor-pointer appearance-none pr-11`}
          {...rest}
        >
          <option value="">{platshallare}</option>
          {alternativ.map((a) => (
            <option key={a.varde} value={a.varde}>
              {a.text}
            </option>
          ))}
        </select>
        <Ikon
          namn="chevron"
          className="pointer-events-none absolute right-3.5 top-1/2 size-5 -translate-y-1/2 text-sand-500"
        />
      </div>
    </Omslag>
  );
}

/** Kryssruta med etikett till höger. Stor träffyta för mobil. */
export function KryssFalt({
  id,
  etikett,
  hjalptext,
  fel,
  ...rest
}: {
  id: string;
  etikett: ReactNode;
  hjalptext?: string;
  fel?: string;
} & ComponentProps<"input">) {
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name={id}
          aria-invalid={fel ? true : undefined}
          aria-describedby={beskrivsAv(id, fel, hjalptext)}
          className={`mt-0.5 size-5 shrink-0 cursor-pointer rounded border-2 accent-korall-600 ${
            fel ? "border-red-400" : "border-sand-400"
          }`}
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-relaxed text-sand-800">
          {etikett}
        </label>
      </div>

      {hjalptext ? (
        <p id={`${id}-hjalp`} className="mt-1.5 pl-8 text-sm text-sand-500">
          {hjalptext}
        </p>
      ) : null}

      {fel ? (
        <p
          id={`${id}-fel`}
          role="alert"
          className="mt-2 pl-8 text-sm font-medium text-red-700"
        >
          {fel}
        </p>
      ) : null}
    </div>
  );
}

/**
 * Radiogrupp som stora kort. Använder riktiga radioinputs så
 * tangentbordsnavigering med piltangenter fungerar automatiskt.
 */
export function KortValGrupp<T extends string>({
  namn,
  etikett,
  fel,
  varde,
  onValj,
  alternativ,
}: {
  namn: string;
  etikett: string;
  fel?: string;
  varde: T | "";
  onValj: (v: T) => void;
  alternativ: { varde: T; rubrik: string; text?: string; ikon?: ReactNode }[];
}) {
  return (
    <fieldset aria-describedby={fel ? `${namn}-fel` : undefined}>
      <legend className="font-sans text-[0.9375rem] font-semibold text-sand-900">
        {etikett}
      </legend>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {alternativ.map((a) => {
          const valt = varde === a.varde;
          return (
            <label
              key={a.varde}
              className={`relative flex cursor-pointer gap-3.5 rounded-2xl border-2 p-4 transition-all duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-korall-600/40 has-[:focus-visible]:ring-offset-2 ${
                valt
                  ? "border-korall-600 bg-korall-50/70 shadow-mjuk"
                  : "border-sand-200 bg-white hover:border-sand-400"
              }`}
            >
              <input
                type="radio"
                name={namn}
                value={a.varde}
                checked={valt}
                onChange={() => onValj(a.varde)}
                className="sr-only"
              />

              {a.ikon ? (
                <span
                  className={`mt-0.5 shrink-0 transition-colors ${
                    valt ? "text-korall-600" : "text-sand-500"
                  }`}
                >
                  {a.ikon}
                </span>
              ) : null}

              <span>
                <span className="block font-sans font-semibold text-sand-950">
                  {a.rubrik}
                </span>
                {a.text ? (
                  <span className="mt-1 block text-sm leading-relaxed text-sand-600">
                    {a.text}
                  </span>
                ) : null}
              </span>

              {/* Bockmarkering för valt kort */}
              {valt ? (
                <span
                  aria-hidden="true"
                  className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-korall-600 text-white"
                >
                  <Ikon namn="check" className="size-3.5" />
                </span>
              ) : null}
            </label>
          );
        })}
      </div>

      {fel ? (
        <p
          id={`${namn}-fel`}
          role="alert"
          className="mt-3 flex items-start gap-1.5 text-sm font-medium text-red-700"
        >
          <Ikon namn="stang" className="mt-0.5 size-4 shrink-0" />
          {fel}
        </p>
      ) : null}
    </fieldset>
  );
}

/** Kompakt radiogrupp för korta val (t.ex. hiss ja/nej/vet inte). */
export function RadioRad<T extends string>({
  namn,
  etikett,
  varde,
  onValj,
  alternativ,
  fel,
}: {
  namn: string;
  etikett: string;
  varde: T | "";
  onValj: (v: T) => void;
  alternativ: readonly { varde: T; text: string }[];
  fel?: string;
}) {
  return (
    <fieldset className="flex h-full flex-col">
      <legend className="font-sans text-[0.9375rem] font-semibold text-sand-900">
        {etikett}
      </legend>
      <span className="grow" aria-hidden="true" />
      <div className="mt-2 flex flex-wrap gap-2">
        {alternativ.map((a) => {
          const valt = varde === a.varde;
          return (
            <label
              key={a.varde}
              className={`inline-flex min-h-[3.125rem] cursor-pointer items-center rounded-full border px-5 text-[0.9375rem] font-medium transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-korall-600/40 has-[:focus-visible]:ring-offset-2 ${
                valt
                  ? "border-korall-600 bg-korall-600 text-white"
                  : "border-sand-300 bg-white text-sand-700 hover:border-sand-400"
              }`}
            >
              <input
                type="radio"
                name={namn}
                value={a.varde}
                checked={valt}
                onChange={() => onValj(a.varde)}
                className="sr-only"
              />
              {a.text}
            </label>
          );
        })}
      </div>
      {fel ? (
        <p role="alert" className="mt-2 text-sm font-medium text-red-700">
          {fel}
        </p>
      ) : null}
    </fieldset>
  );
}
