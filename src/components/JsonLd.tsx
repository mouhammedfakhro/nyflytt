type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

/** Renderar JSON-LD i en script-tagg. Kör i en server-komponent för att hamna i HTML:en. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
