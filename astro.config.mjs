import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  // site: 'https://NatalioDev.github.io',
  // base: '/astro-landing-page-dropdown/',
  integrations: [react(), tailwind()],
  base: '/Portafolio-2025/',
});