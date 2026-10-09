# Camaly Digital — site institucional

Site multipáginas da Camaly Digital (camaly.com.br).
Vite + React + TypeScript + Tailwind + Framer Motion + Bootstrap Icons.

## Rodar e publicar

```bash
npm install
npm run dev        # http://localhost:8080
npm run build      # gera dist/ (+ HTML por rota com metatags e sitemap.xml)
npm run preview    # testa o build em http://localhost:4173
```

**Hostinger:** envie **todo o conteúdo de `dist/`** para `public_html`, incluindo o
arquivo oculto `.htaccess` (ele cuida das rotas, HTTPS, cache e URLs sem barra final).

## Rotas

| Rota | Página |
|---|---|
| `/` | Home (funil de vendas) |
| `/servicos` | Visão geral dos serviços |
| `/servicos/sites-institucionais` · `/landing-pages` · `/ecommerce` · `/sistemas-plataformas` | Páginas de serviço (um template, dados em `src/data/services.ts`) |
| `/portfolio` | Portfólio com filtros por tipo/segmento e "carregar mais" |
| `/portfolio/:slug` | Case individual (gerado a partir de `src/data/projects.ts`) |
| `/sobre` · `/processo` · `/contato` · `/faq` | Institucionais |
| `/privacidade` · `/termos` | Textos-base legais |

## Onde editar o conteúdo

| O quê | Arquivo |
|---|---|
| WhatsApp, e-mail, Instagram, métricas | `src/config/site.ts` |
| Mensagens pré-preenchidas do WhatsApp | `src/lib/whatsapp.ts` |
| Títulos e descrições de SEO | `src/config/seo.ts` |
| Projetos do portfólio | `src/data/projects.ts` |
| Serviços | `src/data/services.ts` |
| Processo, FAQ, diferenciais, equipe, depoimentos | `src/data/content.ts` |

## Adicionar um projeto ao portfólio

1. Gere as imagens otimizadas a partir de um screenshot (PNG/JPG, idealmente 1920px de largura):
   ```bash
   python scripts/optimize_media.py caminho/screenshot.png meu-projeto
   python scripts/optimize_media.py caminho/outra-tela.png meu-projeto --index 1   # galeria (opcional)
   ```
   Isso cria `src/assets/work/meu-projeto.webp`, a versão `-sm` e `public/og/meu-projeto.jpg`.
2. Adicione a entrada em `PROJECTS` (`src/data/projects.ts`) com o mesmo `slug`.
3. `npm run build` — o case, os filtros, o sitemap e as metatags são gerados automaticamente.

Use `featured: true` para destacar na Home (os 5 primeiros destacados aparecem).
Preencha `results` e `stack` **somente** com informações comprovadas — as seções só
aparecem quando há conteúdo.

## Sistema visual

- Tokens em `src/index.css` (`--color-*`, `--radius-*`, `--space-section`, `--font-*`) e
  mapeados no `tailwind.config.ts` (`bg-ink`, `bg-surface`, `text-brand`, `text-soft`, `border-line`).
- Fonte única: Geist. Ícones: Bootstrap Icons (`<Icon name="arrow-up-right" />`).
- Marca d'água: `<BrandWatermark variant="camaly | chameleon | wire | grid | words" position opacity scale />`.
  A silhueta vem do camaleão oficial (`src/components/brand/chameleon-geometry.ts`).
- Animações: `Reveal`, `Stagger`, `LineReveal`, `ImageReveal`, `Counter` em
  `src/components/system/Reveal.tsx` — todas respeitam "reduzir movimento".

## Desempenho mobile (Lighthouse, perfil mobile)

| Página | Performance | Acessibilidade | Boas práticas | SEO |
|---|---|---|---|---|
| Home | 83–87 | 100 | 100 | 100 |
| Serviço (sistemas) | 80 | 100 | 100 | 100 |
| Portfólio | 83–84 | 100 | 100 | 100 |
| Case | 83 | 100 | 100 | 100 |
| Contato | 87 | 100 | 100 | 100 |

Decisões que sustentam esses números — mantenha ao evoluir o site:
- O camaleão do hero anima apenas `opacity`, `transform` e `clip-path`; os pixels são
  poucos `<path>` agrupados (não um elemento por pixel) e o ciclo pausa fora da tela.
- As seções da Home abaixo da dobra ficam em um chunk separado (`HomeSections.tsx`) e
  são montadas uma a uma em momentos ociosos — sem tarefas longas no carregamento.
- Paralaxe só com mouse; no toque o conteúdo fica estático.
- Fontes Geist com `preload` (injetado no build) e ícones com caixa fixa: CLS = 0.
- `scripts/build-icons.mjs` gera um CSS só com os ícones usados (roda no `dev`/`build`).

## Pendências de conteúdo (confirmar com a equipe)

- **Métricas** (120+, 98%, 3x, 100%) foram mantidas exatamente como estavam no site
  publicado. Confirme se são comprovadas — principalmente "3x mais conversão".
- **Depoimentos em vídeo:** não há nome/empresa dos clientes no projeto. Preencha
  `name`, `company` e `project` em `VIDEO_TESTIMONIALS` quando houver autorização.
  O vídeo 02 foi associado à Star Cases porque o site dela aparece na gravação.
- **Textos dos cases** (visão geral, desafio, solução) foram escritos a partir do que
  está visível em cada site publicado — revise com o que foi de fato combinado com cada cliente.
- **Sites fora do ar** em 09/10/2026 (sem link "Visitar site"): Comercial Bom Preço,
  Pontocom, Picredi, Mega Pix e MD Landscape.
- **Logos de clientes:** não existem arquivos de logo no projeto; a faixa de prova social
  usa os nomes reais dos clientes. Se tiver os logos (SVG monocromático), substitua em
  `src/components/blocks/LogoMarquee.tsx`.
- **Privacidade e Termos:** textos-base; revisar com assessoria jurídica.
