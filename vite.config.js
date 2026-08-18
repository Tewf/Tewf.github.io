import { defineConfig } from 'vite';
import { resolve, dirname, join } from 'node:path';
import { readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { buildPages } from './tools/build-pages.mjs';
import { buildDiscovery, readContent } from './tools/build-discovery.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const GEN = resolve(ROOT, '.gen');

/* Set while a translation is still being written. CI leaves it unset, so a page
   that is missing a language fails the build rather than shipping half a site. */
const STRICT = !process.env.ALLOW_MISSING_TRANSLATIONS;

/** Every generated document, as a rollup entry keyed by its URL path. */
function htmlInputs (dir, base = dir, acc = {}) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) htmlInputs(path, base, acc);
    else if (entry.endsWith('.html')) {
      acc[path.slice(base.length + 1).replace(/\/?index\.html$/, '') || 'index'] = path;
    }
  }
  return acc;
}

/** Regenerate .gen when content or a template changes, then reload the page. */
const content = () => ({
  name: 'content',
  configureServer (server) {
    const watched = [resolve(ROOT, 'content'), resolve(ROOT, 'src/templates')];
    server.watcher.add(watched);
    server.watcher.on('change', async (file) => {
      if (!watched.some((dir) => file.startsWith(dir))) return;
      await buildPages({ out: GEN, strict: STRICT });
      server.ws.send({ type: 'full-reload' });
    });
  },
});

/* sitemap.xml and robots.txt describe the pages, so they are written from the
   same content rather than kept by hand, and after the bundle because the build
   empties dist first. */
const discovery = (outDir) => ({
  name: 'discovery',
  apply: 'build',
  async closeBundle () {
    const { site, pages } = await readContent();
    const { urls } = await buildDiscovery({ out: outDir, pages, site });
    this.info(`discovery: sitemap.xml with ${urls} urls, robots.txt`);
  },
});

export default defineConfig(async () => {
  await buildPages({ out: GEN, strict: STRICT });

  return {
    root: GEN,
    publicDir: resolve(ROOT, 'public'),
    base: '/',
    plugins: [content(), discovery(resolve(ROOT, 'dist'))],
    // Generated documents reference /src/... even though the root is .gen.
    resolve: { alias: { '/src': resolve(ROOT, 'src') } },
    server: { fs: { allow: [ROOT] } },
    build: {
      outDir: resolve(ROOT, 'dist'),
      emptyOutDir: true,
      target: 'es2022',
      cssCodeSplit: true,
      modulePreload: { polyfill: false },
      rollupOptions: { input: htmlInputs(GEN) },
    },
  };
});
