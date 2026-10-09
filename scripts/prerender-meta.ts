/**
 * Pós-build: gera dist/<rota>/index.html com <title>, description, canonical,
 * Open Graph e Twitter próprios de cada página, além de sitemap.xml.
 * Buscadores e redes sociais recebem os metadados corretos sem depender de JS.
 *
 * Executado por `npm run build` via vite-node (lê os mesmos dados do site).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { allRoutes } from "../src/config/seo";
import { SITE } from "../src/config/site";

const DIST = join(process.cwd(), "dist");
const template = readFileSync(join(DIST, "index.html"), "utf-8");

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fullTitle = (t: string) => (t.includes(SITE.name) ? t : `${t} | ${SITE.name}`);

const routes = allRoutes();

for (const { path, meta } of routes) {
  const url = SITE.url + (path === "/" ? "/" : path);
  const title = esc(fullTitle(meta.title));
  const desc = esc(meta.description);
  const img = SITE.url + (meta.image ?? SITE.ogImage);
  const head = [
    `<title>${title}</title>`,
    `<meta name="description" content="${desc}" />`,
    `<link rel="canonical" href="${url}" />`,
    meta.noindex ? `<meta name="robots" content="noindex, nofollow" />` : "",
    `<meta property="og:type" content="${path.startsWith("/portfolio/") ? "article" : "website"}" />`,
    `<meta property="og:site_name" content="${SITE.name}" />`,
    `<meta property="og:locale" content="${SITE.locale}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${desc}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${desc}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ]
    .filter(Boolean)
    .join("\n    ");

  const html = template.replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, `<!--seo:start-->\n    ${head}\n    <!--seo:end-->`);
  const out = path === "/" ? join(DIST, "index.html") : join(DIST, path.slice(1), "index.html");
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !r.meta.noindex)
  .map((r) => `  <url><loc>${SITE.url}${r.path === "/" ? "/" : r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority.toFixed(1)}</priority></url>`)
  .join("\n")}
</urlset>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemap);

console.log(`prerender-meta: ${routes.length} rotas + sitemap.xml`);
