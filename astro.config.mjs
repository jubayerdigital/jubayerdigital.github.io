// @ts-check
import { defineConfig } from 'astro/config';

// This site deploys to the root of jubayerdigital.github.io (a user/org GitHub Pages site),
// so no `base` path is needed. If you ever rename the repo to something other than
// <username>.github.io, set base: '/your-repo-name' here instead.
export default defineConfig({
  site: 'https://jubayerdigital.github.io',
  trailingSlash: 'always',
});
