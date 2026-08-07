import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jubayerdigital.github.io",
  output: "static",
  integrations: [sitemap()]
});
