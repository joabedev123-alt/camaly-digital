/**
 * Pós-build: gera dist/<rota>/index.html com <title>, description, canonical,
 * Open Graph e Twitter próprios de cada página, além dos sitemaps para o
 * Google Search Console (índice + páginas / serviços / portfólio).
 *
 * Executado por `npm run build` via vite-node (lê os mesmos dados do site).
 */
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { allRoutes, type SitemapRoute } from "../src/config/seo";
import { SITE } from "../src/config/site";

const DIST = join(process.cwd(), "dist");
// Preload das fontes principais (evita troca de fonte tardia e layout shift)
const fonts = readdirSync(join(DIST, "assets")).filter((f) => /^geist-sans-latin-(400|600)-normal-.*\.woff2$/.test(f));
const preload = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`).join("\n    ");
const template = readFileSync(join(DIST, "index.html"), "utf-8").replace("</head>", `  ${preload}\n  </head>`);

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const fullTitle = (t: string) => (t.includes(SITE.name) ? t : `${t} | ${SITE.name}`);
const absUrl = (path: string) => SITE.url + (path === "/" ? "/" : path);

const routes = allRoutes();
const indexable = routes.filter((r) => !r.meta.noindex);

for (const { path, meta } of routes) {
  const url = absUrl(path);
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

const urlEntry = (r: SitemapRoute) => `  <url>
    <loc>${absUrl(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`;

const writeUrlset = (filename: string, list: SitemapRoute[]) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list.map(urlEntry).join("\n")}
</urlset>
`;
  writeFileSync(join(DIST, filename), xml);
};

const pages = indexable.filter((r) => r.group === "pages");
const services = indexable.filter((r) => r.group === "services");
const portfolio = indexable.filter((r) => r.group === "portfolio");

writeUrlset("sitemap-pages.xml", pages);
writeUrlset("sitemap-services.xml", services);
writeUrlset("sitemap-portfolio.xml", portfolio);

/** Índice principal — URL a enviar no Google Search Console. */
const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE.url}/sitemap-pages.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE.url}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE.url}/sitemap-portfolio.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>
`;
writeFileSync(join(DIST, "sitemap.xml"), sitemapIndex);

/** Sitemap único (todas as URLs) — útil como fallback no GSC. */
writeUrlset("sitemap-all.xml", indexable);

const robots = `User-agent: *
Allow: /

# Sitemaps — Google Search Console
Sitemap: ${SITE.url}/sitemap.xml
Sitemap: ${SITE.url}/sitemap-all.xml
Sitemap: ${SITE.url}/sitemap-pages.xml
Sitemap: ${SITE.url}/sitemap-services.xml
Sitemap: ${SITE.url}/sitemap-portfolio.xml
`;
writeFileSync(join(DIST, "robots.txt"), robots);

console.log(
  `prerender-meta: ${routes.length} rotas + sitemaps (index, pages ${pages.length}, services ${services.length}, portfolio ${portfolio.length}, all ${indexable.length})`,
);
