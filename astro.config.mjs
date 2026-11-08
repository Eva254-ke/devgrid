// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Your live domain (required for the sitemap to generate correct absolute URLs)
  site: 'https://devgridsystems.com',
  
  devOptions: {
    port: 4321
  },
  
  output: 'static',
  
  integrations: [
    sitemap()
  ]
});