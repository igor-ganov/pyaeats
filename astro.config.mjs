import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://igor-ganov.github.io',
  base: '/pyaeats',
  trailingSlash: 'ignore',
  server: {
    host: '127.0.0.1',
    port: 4322,
  },
  vite: {
    server: {
      hmr: { overlay: true },
    },
  },
  devToolbar: { enabled: false },
});
