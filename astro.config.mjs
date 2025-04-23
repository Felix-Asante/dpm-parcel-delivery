// @ts-check
import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  env: {
    schema: {
      API_BASE_URL: envField.string({ context: "client", access: "public" }),
    },
  },
});
