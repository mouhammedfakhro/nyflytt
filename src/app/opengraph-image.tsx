import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} – ${siteConfig.tagline}`;

/**
 * Delningsbild för OG och Twitter.
 *
 * SÅ BYTER DU TILL EGEN GRAFIK: lägg en 1200x630-bild i `src/app/` med namnet
 * `opengraph-image.png` och ta bort den här filen. Next.js plockar upp den
 * automatiskt. Per sida kan man lägga en egen bild i respektive mapp.
 *
 * Färgerna är hårdkodade här eftersom OG-bilden renderas utan Tailwind.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#fdfcfa",
          fontFamily: "sans-serif",
        }}
      >
        {/* Dekorativ form i hörnet – speglar loggans förskjutna rutor */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 440,
            height: 440,
            borderRadius: 120,
            background: "#fbe3d3",
          }}
        />

        {/* Loggrad */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", position: "relative", width: 56, height: 56 }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 16,
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "#f6c9a8",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 18,
                top: 2,
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "#d94f1d",
              }}
            />
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "#1c1917",
              letterSpacing: -1,
            }}
          >
            {siteConfig.name}
          </div>
        </div>

        {/* Huvudbudskap */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#1c1917",
              letterSpacing: -2.5,
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Flytten och städningen på ett ställe
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#57534e",
              marginTop: 24,
              maxWidth: 820,
              lineHeight: 1.4,
            }}
          >
            Beskriv ditt behov, få en tydlig offert. Uppdraget utförs av en
            samarbetspartner.
          </div>
        </div>

        {/* Nedre rad: orter */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 24,
            color: "#78716c",
          }}
        >
          <div style={{ width: 40, height: 4, borderRadius: 2, background: "#d94f1d" }} />
          Skåne och Halland
        </div>
      </div>
    ),
    size,
  );
}
