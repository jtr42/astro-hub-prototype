// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    site: "https://example.com",
    integrations: [mdx(), sitemap(), react()],
        vite: {
            ssr: {
          // Tells Astro/Vite to skip bundling these on the server completely
          noExternal: [] 
        },
        build: {
          rollupOptions: {
            // Tells Rolldown to treat these imports as external modules
            external: ['react-leaflet', 'leaflet'],
          },
    adapter: cloudflare({
        platformProxy: {
            enabled: true,
        },
    }),
});
