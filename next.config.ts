import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Låser rooten till projektet så Turbopack inte plockar upp lockfiler längre upp i trädet.
  turbopack: { root: __dirname },
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Orter som flyttats från mindre ort till storstad byter URL-mönster
   * (/flyttfirma/<slug> -> /flyttfirma-<slug>). 301 så att länkar och
   * sökresultat följer med. Lägg till en rad här vid varje framtida typbyte.
   */
  async redirects() {
    return ["kristianstad", "landskrona", "angelholm"].map((slug) => ({
      source: `/flyttfirma/${slug}`,
      destination: `/flyttfirma-${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
