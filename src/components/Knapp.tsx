import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Ikon } from "@/components/Ikon";

type Variant = "primar" | "sekundar" | "diskret";
type Storlek = "md" | "lg";

const bas =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[transform,background-color,border-color,box-shadow] duration-200 " +
  "ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px " +
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-55";

const varianter: Record<Variant, string> = {
  primar:
    "bg-korall-600 text-white shadow-mjuk hover:bg-korall-700 hover:shadow-lyft",
  sekundar:
    "bg-white text-sand-900 ring-1 ring-sand-300 hover:ring-sand-400 hover:bg-sand-50",
  diskret:
    "text-sand-800 hover:bg-sand-100 hover:text-sand-950",
};

const storlekar: Record<Storlek, string> = {
  md: "min-h-11 px-5 text-[0.9375rem]",
  lg: "min-h-13 px-7 text-base sm:text-[1.0625rem]",
};

type GemensamProps = {
  variant?: Variant;
  storlek?: Storlek;
  /** Visar en pil till höger – signalerar att knappen leder vidare. */
  medPil?: boolean;
  children: ReactNode;
  className?: string;
};

/** Länkknapp. Använd för navigering – renderas som <a> så den funkar utan JS. */
export function KnappLank({
  href,
  variant = "primar",
  storlek = "md",
  medPil = false,
  children,
  className = "",
  ...rest
}: GemensamProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={`${bas} ${varianter[variant]} ${storlekar[storlek]} ${className}`}
      {...rest}
    >
      {children}
      {medPil ? <Ikon namn="pil" className="size-[1.125rem]" /> : null}
    </Link>
  );
}

/** Vanlig knapp för formulärinteraktion. */
export function Knapp({
  variant = "primar",
  storlek = "md",
  medPil = false,
  children,
  className = "",
  type = "button",
  ...rest
}: GemensamProps & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={`${bas} ${varianter[variant]} ${storlekar[storlek]} ${className}`}
      {...rest}
    >
      {children}
      {medPil ? <Ikon namn="pil" className="size-[1.125rem]" /> : null}
    </button>
  );
}
