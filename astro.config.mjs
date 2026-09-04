// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";

export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  adapter: cloudflare({
    platformProxy: { enabled: true },
  }),
  vite: {
    ssr: {
      // Switch from 'external' to 'noExternal' to bundle react-leaflet into the app
      noExternal: ['react-leaflet', 'leaflet'],
    },
    // Keep rollupOptions external empty or removed for these packages
  },
});
