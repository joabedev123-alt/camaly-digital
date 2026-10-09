/**
 * PORTFÓLIO — fonte única dos projetos.
 *
 * Para adicionar um projeto:
 *   1. python scripts/optimize_media.py <screenshot.png> <slug>
 *      (imagens extras da galeria: --index 1, --index 2 …)
 *   2. Adicione uma entrada em PROJECTS abaixo.
 * As imagens são resolvidas automaticamente pelo slug em src/assets/work.
 *
 * Regras de conteúdo: somente informações verificáveis. `results` e `stack`
 * só devem ser preenchidos com dados comprovados — as seções do case
 * aparecem apenas quando houver conteúdo.
 */

export type ProjectCategory = "sites" | "landing-pages" | "ecommerce" | "sistemas" | "plataformas";

export const CATEGORY_LABEL: Record<ProjectCategory, string> = {
  sites: "Site institucional",
  "landing-pages": "Landing page",
  ecommerce: "E-commerce",
  sistemas: "Sistema",
  plataformas: "Plataforma",
};

export const CATEGORY_FILTERS: { id: ProjectCategory | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "sites", label: "Sites" },
  { id: "landing-pages", label: "Landing Pages" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "sistemas", label: "Sistemas" },
  { id: "plataformas", label: "Plataformas" },
];

export type Composition = "browser" | "perspective" | "fullbleed" | "detail";

export interface ProjectImage {
  src: string;
  srcSm: string;
}

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  /** Tipo de projeto, em linguagem natural (ex.: "Plataforma de reservas"). */
  type: string;
  industry: string;
  market: "Brasil" | "Estados Unidos";
  summary: string;
  overview: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  services: string[];
  stack?: string[];
  results?: string[];
  year?: number;
  /** URL pública — omitida quando o site não está no ar. */
  url?: string;
  featured?: boolean;
  composition?: Composition;
  cover: ProjectImage;
  gallery: ProjectImage[];
}

/* ── Resolução automática das imagens por slug ───────────────────── */
const files = import.meta.glob("/src/assets/work/*.webp", { eager: true, import: "default" }) as Record<string, string>;
const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(files)) {
  byName[path.split("/").pop()!.replace(".webp", "")] = url;
}
function image(name: string): ProjectImage {
  const src = byName[name];
  if (!src) throw new Error(`Imagem do portfólio não encontrada: ${name}.webp`);
  return { src, srcSm: byName[`${name}-sm`] ?? src };
}
function galleryFor(slug: string): ProjectImage[] {
  const out: ProjectImage[] = [];
  for (let i = 1; byName[`${slug}-${i}`]; i++) out.push(image(`${slug}-${i}`));
  return out;
}

type ProjectInput = Omit<Project, "cover" | "gallery">;

const UX = "UX/UI";
const DEV = "Desenvolvimento";
const STRAT = "Estratégia";
const RESP = "Responsivo";

const INPUT: ProjectInput[] = [
  /* ── Plataformas & Sistemas ─────────────────────────────────── */
  {
    slug: "space-park",
    name: "Space Park",
    category: "plataformas",
    type: "Plataforma de reservas",
    industry: "Mobilidade",
    market: "Brasil",
    summary: "Plataforma de reservas para um estacionamento a 4 minutos do Aeroporto de Confins.",
    overview:
      "A Space Park oferece estacionamento com traslado para o Aeroporto de Confins. O site virou o principal ponto de contato com o cliente: explica o serviço, mostra os diferenciais e permite simular e reservar a estadia online.",
    challenge:
      "Quem vai viajar quer decidir rápido. O desafio era transmitir segurança logo no primeiro acesso e deixar o cálculo e a reserva acessíveis sem atrito.",
    solution:
      "Estruturamos a página em torno da reserva: proposta de valor clara no topo, indicadores do serviço (distância, tempo de traslado, segurança 24h) e uma calculadora de estadia integrada à jornada de reserva.",
    deliverables: ["Calculadora de preço por estadia", "Fluxo de reserva online", "Gerenciamento de reserva", "Planos", "FAQ", "Integração com WhatsApp"],
    services: [STRAT, UX, DEV, RESP],
    url: "https://www.estacionamentospacepark.com.br",
    featured: true,
    composition: "perspective",
  },
  {
    slug: "zapy",
    name: "Zapy",
    category: "sistemas",
    type: "Plataforma para criadores",
    industry: "Tecnologia",
    market: "Brasil",
    summary: "Plataforma para criadores publicarem conteúdo, interagirem e monetizarem sua audiência.",
    overview:
      "A Zapy é uma plataforma digital voltada a criadores de conteúdo, com feed, busca, conteúdos exclusivos, perfil e área de ganhos.",
    challenge:
      "Organizar muitas funcionalidades em uma interface que precisa ser simples para quem usa todos os dias — e que comunique a proposta “liberdade para criar e lucrar”.",
    solution:
      "Desenhamos uma navegação por módulos (feed, busca, exclusivos, criação, ganhos e perfil) e uma interface limpa, que coloca o conteúdo em primeiro plano.",
    deliverables: ["Feed de conteúdo", "Busca", "Conteúdos exclusivos", "Área de ganhos", "Perfil do usuário", "Interface web responsiva"],
    services: [UX, DEV, RESP],
    stack: ["React"],
    url: "https://zapybr.com.br",
    composition: "detail",
  },
  {
    slug: "mega-pix",
    name: "Mega Pix",
    category: "plataformas",
    type: "Plataforma de sorteios",
    industry: "Entretenimento",
    market: "Brasil",
    summary: "Plataforma de sorteios com área do usuário, resultados, shopping e consulta de cashback.",
    overview:
      "A Mega Pix reúne sorteios, resultados, uma área de compras e consulta de cashback em uma única plataforma com cadastro e login.",
    challenge:
      "Transmitir transparência — elemento central para um produto de sorteios — e ao mesmo tempo manter a energia visual da marca.",
    solution:
      "Criamos uma interface de alto contraste com os últimos ganhadores e prêmios distribuídos em destaque, e uma navegação direta entre sorteios, resultados, shopping e cashback.",
    deliverables: ["Cadastro e login", "Sorteios", "Resultados e ganhadores", "Mega Pix Shopping", "Consulta de cashback"],
    services: [UX, DEV, RESP],
    composition: "browser",
  },
  {
    slug: "mansao-venda-nova",
    name: "Mansão Venda Nova",
    category: "plataformas",
    type: "Site com motor de reservas",
    industry: "Turismo & Hospedagem",
    market: "Brasil",
    summary: "Site de hospedagem para grupos com consulta de disponibilidade e reserva online.",
    overview:
      "Espaço de hospedagem premium para até 30 pessoas, com piscina privativa e área gourmet. O site apresenta o espaço e permite consultar disponibilidade e reservar.",
    challenge:
      "Vender uma experiência para grupos — o visitante precisa visualizar o espaço e resolver datas e quantidade de pessoas sem depender de várias mensagens.",
    solution:
      "A reserva fica no centro da primeira dobra: check-in, check-out e hóspedes logo abaixo da proposta, com localizador de reservas e área de login para quem já reservou.",
    deliverables: ["Consulta de disponibilidade", "Reserva online", "Localizador de reservas", "Área de login", "Integração com WhatsApp"],
    services: [UX, DEV, RESP],
    url: "https://mansaovendanova.com.br",
    composition: "fullbleed",
  },

  /* ── E-commerce ─────────────────────────────────────────────── */
  {
    slug: "rosa-e-blush",
    name: "Rosa & Blush",
    category: "ecommerce",
    type: "Loja virtual",
    industry: "Beleza & Cosméticos",
    market: "Brasil",
    summary: "Loja virtual de beleza com catálogo por categoria, ofertas e lançamentos.",
    overview:
      "E-commerce de maquiagem, skincare, cabelos e bodycare, com navegação por categorias e destaque para ofertas e novidades.",
    challenge:
      "Um catálogo amplo precisa ser fácil de navegar e, ao mesmo tempo, transmitir o posicionamento delicado e feminino da marca.",
    solution:
      "Identidade visual em tons rosados, menu por categorias, banners de campanha e vitrines que aproximam o cliente dos produtos em poucos cliques.",
    deliverables: ["Home com vitrines", "Categorias e coleções", "Página de produto", "Carrinho e checkout", "Banners de campanha"],
    services: [UX, "E-commerce", RESP],
    stack: ["Shopify", "Yampi"],
    url: "https://rosaeblush.com.br",
    featured: true,
    composition: "fullbleed",
  },
  {
    slug: "colecionadores-de-games",
    name: "Colecionadores de Games",
    category: "ecommerce",
    type: "Loja virtual",
    industry: "Games & Colecionáveis",
    market: "Brasil",
    summary: "E-commerce para o público gamer, com catálogo, rastreio de pedido e frete para todo o Brasil.",
    overview:
      "Loja virtual de games e colecionáveis com catálogo, área do cliente e rastreamento de pedidos.",
    challenge:
      "Falar com um público exigente e transmitir confiança para compras online de produtos de colecionador.",
    solution:
      "Barra de garantias no topo (frete, trocas e satisfação), busca em destaque, área do cliente e rastreio de pedido a um clique.",
    deliverables: ["Home e banners", "Catálogo", "Busca", "Área do cliente", "Rastreio de pedido", "Carrinho e checkout"],
    services: [UX, "E-commerce", RESP],
    stack: ["Shopify", "Yampi"],
    url: "https://www.colecionadoresdegames.com.br",
    composition: "browser",
  },
  {
    slug: "comercial-bom-preco",
    name: "Comercial Bom Preço",
    category: "ecommerce",
    type: "Loja virtual",
    industry: "Varejo",
    market: "Brasil",
    summary: "E-commerce de varejo com dezenas de departamentos — de mercado a ferragens.",
    overview:
      "Loja virtual com navegação por departamentos (mercado, açougue, hortifruti, construção, elétrica, ferragens, hidráulica, higiene e outros).",
    challenge: "Organizar um mix de produtos muito diverso sem deixar a navegação confusa.",
    solution:
      "Categorias visuais na primeira dobra, menu por departamento, busca destacada e barra de garantias para dar segurança na compra.",
    deliverables: ["Navegação por departamentos", "Categorias visuais", "Busca", "Área do cliente", "Carrinho e checkout"],
    services: [UX, "E-commerce", RESP],
    stack: ["Shopify"],
    composition: "browser",
  },
  {
    slug: "pontocom",
    name: "Pontocom Móveis & Eletro",
    category: "ecommerce",
    type: "Loja virtual",
    industry: "Varejo",
    market: "Brasil",
    summary: "Loja virtual de móveis e eletrodomésticos com catálogo por departamento.",
    overview:
      "E-commerce de móveis, eletrodomésticos, eletrônicos e utilidades, com departamentos, busca e área do cliente.",
    challenge: "Apresentar produtos de ticket alto com a confiança necessária para a compra online.",
    solution:
      "Identidade forte da marca, departamentos acessíveis no topo, garantias visíveis e um fluxo de compra direto.",
    deliverables: ["Home e banners", "Departamentos", "Busca", "Área do cliente", "Rastreio de pedido"],
    services: [UX, "E-commerce", RESP],
    composition: "browser",
  },

  /* ── Sites institucionais ───────────────────────────────────── */
  {
    slug: "genesis-tattoo",
    name: "Gênesis Tattoo",
    category: "sites",
    type: "Site institucional",
    industry: "Arte & Tatuagem",
    market: "Brasil",
    summary: "Site autoral para um estúdio de tatuagem — portfólio, agendamento, curso e orçamento.",
    overview:
      "Presença digital de um estúdio de tatuagem com portfólio, agendamento, depoimentos, curso e pedido de orçamento.",
    challenge:
      "Traduzir a identidade artística do estúdio para o digital — o site precisava ser tão autoral quanto o trabalho do estúdio.",
    solution:
      "Direção de arte escura e editorial, tipografia serifada, elementos gráficos inspirados em estudos anatômicos e CTAs claros para orçamento.",
    deliverables: ["Direção de arte", "Portfólio", "Agendamento", "Página de curso", "Depoimentos", "Pedido de orçamento"],
    services: [STRAT, UX, DEV, RESP],
    stack: ["Next.js"],
    url: "https://www.genesistattoo.com.br",
    featured: true,
    composition: "perspective",
  },
  {
    slug: "dom-miguel",
    name: "Dom Miguel Atacadista",
    category: "sites",
    type: "Site institucional",
    industry: "Indústria & Agronegócio",
    market: "Brasil",
    summary: "Site institucional para um atacadista de commodities com distribuição nacional e internacional.",
    overview:
      "A Dom Miguel atua com café, soja e outras commodities. O site apresenta a empresa, o portfólio de produtos e as categorias para distribuição.",
    challenge:
      "Comunicar escala e confiabilidade para compradores no Brasil e no exterior.",
    solution:
      "Hero em carrossel por produto, fotografia de alto impacto, navegação simples (empresa, produtos, contato) e seletor de idioma.",
    deliverables: ["Carrossel de produtos", "Catálogo por categoria", "Página institucional", "Seletor de idioma", "Contato"],
    services: [STRAT, UX, DEV, RESP],
    url: "https://dommiguelindustria.com.br",
    featured: true,
    composition: "fullbleed",
  },
  {
    slug: "star-cases",
    name: "Star Cases",
    category: "sites",
    type: "Site institucional com catálogo",
    industry: "Instrumentos Musicais",
    market: "Brasil",
    summary: "Site para uma marca de cases artesanais sob medida para instrumentos.",
    overview:
      "A Star Cases fabrica cases à mão, sob medida, com acabamento premium. O site apresenta o catálogo, o bordado personalizado e o processo de montagem do case.",
    challenge:
      "Mostrar o valor de um produto artesanal e personalizado — e conduzir o cliente até a montagem do seu case.",
    solution:
      "Headline provocativa (“O case perfeito não existe?”), fotografia do produto, catálogo, área de bordado e um fluxo “Monte seu Case”.",
    deliverables: ["Catálogo", "Monte seu Case", "Bordado personalizado", "Como pedir", "Integração com WhatsApp"],
    services: [STRAT, UX, DEV, RESP],
    stack: ["React"],
    url: "https://starcases.com.br",
    featured: true,
    composition: "browser",
  },
  {
    slug: "douglas-azevedo",
    name: "Douglas Azevedo Imóveis",
    category: "sites",
    type: "Site imobiliário",
    industry: "Imobiliário",
    market: "Brasil",
    summary: "Site para corretor de imóveis com busca, venda, aluguel e lançamentos.",
    overview:
      "Presença digital de um agente imobiliário, com áreas para comprar, alugar, lançamentos e anunciar imóveis.",
    challenge: "Valorizar a marca pessoal do corretor e facilitar a busca do imóvel certo.",
    solution:
      "Marca em destaque, navegação por intenção (comprar, alugar, lançamentos, anunciar) e chamada direta para contato.",
    deliverables: ["Comprar / Alugar", "Lançamentos", "Anuncie seu imóvel", "Contato direto"],
    services: [UX, DEV, RESP],
    url: "https://douglasazevedoimoveis.com.br",
    composition: "browser",
  },
  {
    slug: "h2v-mob",
    name: "H2V Mob",
    category: "sites",
    type: "Site institucional",
    industry: "Energia",
    market: "Brasil",
    summary: "Site institucional para uma integradora de soluções em hidrogênio verde.",
    overview:
      "A H2V Mob atua do projeto ao fornecimento de hidrogênio verde. O site apresenta as frentes de produção, armazenamento, abastecimento e comercialização.",
    challenge: "Explicar um mercado técnico e novo de forma clara para investidores e parceiros.",
    solution:
      "Mensagem direta no topo e uma estrutura por etapas da cadeia (produção, armazenamento, abastecimento, comercialização), além de mercado e modelo de negócio.",
    deliverables: ["Soluções por etapa da cadeia", "Diferenciais", "Mercado", "Modelo de negócio", "Projetos", "Contato"],
    services: [STRAT, UX, DEV, RESP],
    stack: ["React"],
    url: "https://h2vmob.com.br",
    composition: "detail",
  },
  {
    slug: "picredi",
    name: "Picredi",
    category: "sites",
    type: "Site institucional",
    industry: "Finanças",
    market: "Brasil",
    summary: "Site institucional para uma instituição financeira digital.",
    overview: "Apresentação de produtos financeiros com acesso à conta e abertura de conta.",
    challenge: "Transmitir segurança e tecnologia — pré-requisitos para qualquer produto financeiro.",
    solution:
      "Interface escura e tecnológica, pilares de segurança, tecnologia e atendimento em destaque, e CTAs diretos para abrir conta.",
    deliverables: ["Página institucional", "Produtos", "Acesso à conta", "Abertura de conta"],
    services: [UX, DEV, RESP],
    composition: "perspective",
  },
  {
    slug: "getec",
    name: "Desentupidora Getec",
    category: "sites",
    type: "Site institucional",
    industry: "Serviços",
    market: "Brasil",
    summary: "Site de serviços com foco em orçamento e atendimento de emergência 24h.",
    overview:
      "Empresa de desentupimento com atendimento 24h. O site prioriza o contato imediato e o agendamento de visita técnica.",
    challenge: "Quem procura esse serviço normalmente está com pressa — o contato precisa acontecer em segundos.",
    solution:
      "CTAs de orçamento e emergência na primeira dobra, garantias visíveis e serviços organizados para quem quer pesquisar antes de ligar.",
    deliverables: ["CTA de emergência", "Agendamento de visita", "Serviços", "Galeria", "Integração com WhatsApp"],
    services: [UX, DEV, RESP],
    url: "https://desentupidora24horas.tec.br",
    composition: "browser",
  },

  /* ── Landing pages ──────────────────────────────────────────── */
  {
    slug: "anderson-silva",
    name: "Anderson Silva Treinador",
    category: "landing-pages",
    type: "Landing page",
    industry: "Fitness",
    market: "Brasil",
    summary: "Landing page de captação de alunos para um treinador.",
    overview:
      "Página de venda para consultoria de treino, com método, protocolo, resultados e depoimentos.",
    challenge: "Converter visitantes em alunos com uma mensagem direta e prova social.",
    solution:
      "Headline curta (“A gente monta o plano. Você só precisa seguir.”), seções de resultados, método e protocolo, e CTA fixo para virar aluno.",
    deliverables: ["Copy e estrutura de conversão", "Resultados", "Método e protocolo", "Depoimentos", "CTA para WhatsApp"],
    services: [STRAT, UX, DEV, RESP],
    url: "https://andersonsilvatreinador.com.br",
    composition: "fullbleed",
  },
  {
    slug: "thaynara-vertelo",
    name: "Thaynara Vertelo Beauty",
    category: "landing-pages",
    type: "Landing page",
    industry: "Beleza",
    market: "Brasil",
    summary: "Landing page para uma profissional de maquiagem e beleza, com agendamento.",
    overview:
      "Página para makeup & beauty com serviços, academy, resultados, depoimentos e agendamento.",
    challenge: "Transmitir sofisticação e levar a cliente ao agendamento.",
    solution: "Fotografia suave, paleta clara e elegante, e CTA de agendamento sempre visível.",
    deliverables: ["Serviços", "Academy", "Resultados", "Depoimentos", "Agendamento"],
    services: [UX, DEV, RESP],
    stack: ["React"],
    url: "https://thaynaravertelo.com.br",
    composition: "browser",
  },
  {
    slug: "md-landscape",
    name: "MD Landscape",
    category: "landing-pages",
    type: "Landing page",
    industry: "Paisagismo",
    market: "Estados Unidos",
    summary: "Landing page para uma empresa de paisagismo e cuidado de árvores nos Estados Unidos.",
    overview:
      "Página de captação para serviços de cuidado de árvores e jardins para residências, condomínios e empresas.",
    challenge: "Gerar pedidos de orçamento para uma empresa de serviços fora do Brasil.",
    solution: "Mensagem clara sobre o serviço, CTA de orçamento em destaque e estrutura enxuta (serviços, sobre, contato).",
    deliverables: ["Estrutura de captação", "Serviços", "Pedido de orçamento"],
    services: [UX, DEV, RESP],
    composition: "fullbleed",
  },
  {
    slug: "triad-marcenaria",
    name: "Triad Marcenaria",
    category: "landing-pages",
    type: "Landing page",
    industry: "Móveis Planejados",
    market: "Brasil",
    summary: "Landing page para uma marcenaria de móveis sob medida.",
    overview: "Página com serviços, diferenciais, processo, portfólio e depoimentos de uma marcenaria.",
    challenge: "Mostrar acabamento e exclusividade — atributos difíceis de comunicar sem bom visual.",
    solution: "Vídeo e fotografia em destaque, tipografia elegante e estrutura que conduz até o contato.",
    deliverables: ["Serviços", "Diferenciais", "Processo", "Portfólio", "Depoimentos", "Contato"],
    services: [UX, DEV, RESP],
    url: "https://triadmarcenaria.com.br",
    composition: "perspective",
  },
  {
    slug: "fragmente-ja",
    name: "Fragmente Já",
    category: "landing-pages",
    type: "Landing page",
    industry: "Sustentabilidade",
    market: "Brasil",
    summary: "Landing page para soluções corporativas de reciclagem e descarte seguro de materiais.",
    overview:
      "Página para uma empresa de reciclagem e descarte com certificação ambiental, voltada a empresas.",
    challenge: "Comunicar segurança e conformidade ambiental para compradores corporativos.",
    solution: "Pilares (seguro, sustentável, conformidade) logo na primeira dobra e CTA para solicitar coleta.",
    deliverables: ["Serviços", "Grandes empresas", "Processo", "Solicitação de coleta"],
    services: [UX, DEV, RESP],
    url: "https://fragmenteja.com.br",
    composition: "browser",
  },
  {
    slug: "autora-soraia",
    name: "Autora Soraia Fasciani",
    category: "landing-pages",
    type: "Landing page",
    industry: "Literatura",
    market: "Brasil",
    summary: "Página de autora com catálogo de livros e apresentação da escritora.",
    overview: "Landing page para a escritora Soraia Hermes Fasciani, com seus livros e sua história.",
    challenge: "Aproximar leitores da autora e direcionar para os livros.",
    solution: "Visual acolhedor, foto da autora em destaque e acesso direto à coleção de livros.",
    deliverables: ["Apresentação da autora", "Livros disponíveis", "CTAs para os livros"],
    services: [UX, DEV, RESP],
    url: "https://autorasoraiahfasciani.com",
    composition: "browser",
  },
  {
    slug: "sabor-de-alho",
    name: "Sabor de Alho",
    category: "landing-pages",
    type: "Landing page",
    industry: "Alimentos",
    market: "Brasil",
    summary: "Landing page para um distribuidor de alhos nacionais e importados.",
    overview: "Página para venda de alho direto do produtor, para consumidores e negócios.",
    challenge: "Vender um produto simples com diferenciação de qualidade.",
    solution: "Fotografia de produto em destaque, proposta clara e contato direto pelo WhatsApp.",
    deliverables: ["Produtos", "Benefícios", "Depoimentos", "CTA para WhatsApp"],
    services: [UX, DEV, RESP],
    url: "https://sabordealho.com.br",
    composition: "fullbleed",
  },
  {
    slug: "vitoria-placas",
    name: "Vitória Placas",
    category: "landing-pages",
    type: "Landing page",
    industry: "Homenagens & Premiações",
    market: "Brasil",
    summary: "Landing page para placas personalizadas de homenagem, premiação e inauguração.",
    overview: "Página para uma empresa de placas personalizadas, com produtos, depoimentos e orçamento.",
    challenge: "Comunicar cuidado e significado em um produto ligado a momentos importantes.",
    solution: "Tom respeitoso, visual escuro e elegante e CTA de orçamento em destaque.",
    deliverables: ["Produtos", "Sobre", "Depoimentos", "Solicitação de orçamento"],
    services: [UX, DEV, RESP],
    url: "https://www.vitoriaplacas.com.br",
    composition: "browser",
  },
];

export const PROJECTS: Project[] = INPUT.map((p) => ({
  ...p,
  cover: image(p.slug),
  gallery: galleryFor(p.slug),
}));

export const FEATURED_PROJECTS = PROJECTS.filter((p) => p.featured);

export function getProject(slug: string | undefined): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function projectsByCategory(...cats: ProjectCategory[]): Project[] {
  return PROJECTS.filter((p) => cats.includes(p.category));
}

export function relatedProjects(project: Project, limit = 3): Project[] {
  const same = PROJECTS.filter((p) => p.slug !== project.slug && p.category === project.category);
  const rest = PROJECTS.filter((p) => p.slug !== project.slug && p.category !== project.category);
  return [...same, ...rest].slice(0, limit);
}

/** Segmentos atendidos — derivados dos projetos reais. */
export const INDUSTRIES = Array.from(new Set(PROJECTS.map((p) => p.industry)));

/** Nomes de clientes para a faixa de prova social. */
export const CLIENT_NAMES = PROJECTS.map((p) => p.name);
