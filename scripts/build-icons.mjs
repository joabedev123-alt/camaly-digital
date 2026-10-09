/**
 * Gera src/styles/icons.css apenas com os Bootstrap Icons usados no site
 * (o CSS completo tem ~2.000 classes; usamos algumas dezenas).
 * Roda automaticamente antes de `npm run dev` e `npm run build`.
 */
import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const full = readFileSync(join(ROOT, "node_modules/bootstrap-icons/font/bootstrap-icons.css"), "utf-8");
const glyphs = new Map([...full.matchAll(/\.bi-([a-z0-9-]+)::before \{ content: "(\\[0-9a-f]+)"; \}/g)].map((m) => [m[1], m[2]]));

const used = new Set();
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (f !== "ui") walk(p);
    } else if (/\.(tsx?|jsx?)$/.test(f)) {
      const s = readFileSync(p, "utf-8");
      for (const m of s.matchAll(/(?:name|icon|iconLeft)=\{?"([a-z0-9-]+)"|icon:\s*"([a-z0-9-]+)"|bi-([a-z0-9-]+)/g)) {
        const n = m[1] || m[2] || m[3];
        if (glyphs.has(n)) used.add(n);
      }
    }
  }
};
walk(join(ROOT, "src"));

const fontFace = full.match(/@font-face \{[\s\S]*?\}/)[0].replace(/url\("\.\/fonts\//g, 'url("../../node_modules/bootstrap-icons/font/fonts/');
const base = full.match(/\.bi::before,\s*\[class\^="bi-"\]::before,\s*\[class\*=" bi-"\]::before \{[\s\S]*?\}/)[0];
const rules = [...used].sort().map((n) => `.bi-${n}::before { content: "${glyphs.get(n)}"; }`);

mkdirSync(join(ROOT, "src/styles"), { recursive: true });
writeFileSync(
  join(ROOT, "src/styles/icons.css"),
  `/* Gerado por scripts/build-icons.mjs — não editar. */\n${fontFace}\n\n${base}\n\n${rules.join("\n")}\n`,
);
console.log(`icons: ${used.size} ícones`);
