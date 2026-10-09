import type { ProjectCategory } from "./projects";
import type { WaContext } from "@/lib/whatsapp";

export interface ServiceItem {
  icon: string;
  title: string;
  text: string;
}

export interface Service {
  slug: "sites-institucionais" | "landing-pages" | "ecommerce" | "sistemas-plataformas";
  icon: string;
  name: string;
  shortName: string;
  card: string;
  wa: WaContext;
  cta: string;
  projectCategories: ProjectCategory[];
  seo: { title: string; description: string };
  hero: { eyebrow: string; title: string; highlight: string; lead: string[] };
  why: { title: string; text: string; points: ServiceItem[] };
  deliverables: { title: string; items: ServiceItem[] };
  audience: { title: string; items: string[] };
  whenToHire: string[];
  extra?: { title: string; text?: string; items: ServiceItem[]; note?: string };
  disclaimer?: string;
}

export const SERVICES: Service[] = [
  {
    slug: "sites-institucionais",
    icon: "window",
    name: "Sites institucionais",
    shortName: "Sites",
    card: "Sites profissionais desenvolvidos para posicionar sua empresa, apresentar seus serviços e transformar visitantes em oportunidades.",
    wa: "sites",
    cta: "Quero criar meu site",
    projectCategories: ["sites"],
    seo: {
      title: "Sites institucionais profissionais",
      description:
        "Criamos sites institucionais com estrutura personalizada, UX/UI, performance e integração com WhatsApp para empresas que precisam transmitir confiança.",
    },
    hero: {
      eyebrow: "Sites institucionais",
      title: "Sites profissionais para empresas",
      highlight: "que precisam transmitir confiança.",
      lead: [
        "Seu site é frequentemente o primeiro contato de um potencial cliente com sua empresa.",
        "Criamos sites institucionais que apresentam sua marca com clareza, autoridade e uma experiência preparada para transformar visitas em oportunidades.",
      ],
    },
    why: {
      title: "Por que sua empresa precisa de um site profissional",
      text: "Antes de entrar em contato, o cliente pesquisa. O site é onde ele confirma se pode confiar em você.",
      points: [
        { icon: "search", title: "Ser encontrado", text: "Uma estrutura bem organizada ajuda sua empresa a aparecer quando o cliente procura." },
        { icon: "patch-check", title: "Transmitir confiança", text: "Design, conteúdo e provas reais mostram que existe uma empresa séria por trás da marca." },
        { icon: "chat-dots", title: "Gerar contato", text: "Cada página conduz o visitante para o próximo passo — normalmente, uma conversa." },
      ],
    },
    deliverables: {
      title: "O que entregamos",
      items: [
        { icon: "phone", title: "Design responsivo", text: "Desktop, tablet e celular tratados individualmente." },
        { icon: "layers", title: "Estrutura personalizada", text: "Arquitetura de páginas pensada para o seu negócio, não para um template." },
        { icon: "palette", title: "UX/UI", text: "Interface clara, com hierarquia e identidade visual alinhadas à marca." },
        { icon: "ui-checks", title: "Formulários", text: "Captura de contatos organizada e direta." },
        { icon: "whatsapp", title: "WhatsApp", text: "Botões com mensagens pré-preenchidas para facilitar o primeiro contato." },
        { icon: "search", title: "SEO técnico", text: "Base técnica de SEO quando aplicável: semântica, metadados e estrutura." },
        { icon: "lightning-charge", title: "Performance", text: "Imagens otimizadas e carregamento rápido." },
        { icon: "plug", title: "Integrações", text: "Conexão com as ferramentas que sua operação já usa, quando necessário." },
      ],
    },
    audience: {
      title: "Para quem é",
      items: ["Prestadores de serviço", "Construtoras", "Clínicas", "Advogados", "Empresas locais", "Empresas internacionais", "Profissionais", "Indústrias"],
    },
    whenToHire: [
      "Sua empresa ainda não tem site.",
      "O site atual parece ultrapassado ou não funciona bem no celular.",
      "Você recebe visitas, mas poucos contatos.",
      "Sua marca evoluiu e o site não acompanhou.",
    ],
  },
  {
    slug: "landing-pages",
    icon: "graph-up-arrow",
    name: "Landing pages",
    shortName: "Landing Pages",
    card: "Páginas de alta conversão para campanhas, lançamentos, produtos, serviços e geração de leads.",
    wa: "landing-pages",
    cta: "Quero uma landing page",
    projectCategories: ["landing-pages"],
    seo: {
      title: "Landing pages de alta conversão",
      description:
        "Landing pages projetadas para campanhas, tráfego pago, produtos, cursos e captação. Oferta, hierarquia, prova e CTA trabalhando para a conversão.",
    },
    hero: {
      eyebrow: "Landing pages",
      title: "Landing pages projetadas",
      highlight: "para transformar tráfego em ação.",
      lead: [
        "Uma landing page não deve apenas ser bonita.",
        "Cada seção precisa conduzir o visitante em direção a uma decisão.",
      ],
    },
    why: {
      title: "Para que serve uma landing page",
      text: "Uma página, um objetivo. Ideal quando você precisa transformar atenção em ação.",
      points: [
        { icon: "megaphone", title: "Campanhas e tráfego pago", text: "Uma página dedicada a cada campanha melhora a coerência entre anúncio e oferta." },
        { icon: "box-seam", title: "Produtos, cursos e serviços", text: "Apresentação completa de uma oferta específica, do problema à decisão." },
        { icon: "person-plus", title: "Captação e lançamentos", text: "Estrutura focada em gerar contatos qualificados ou inscrições." },
      ],
    },
    deliverables: {
      title: "O que trabalhamos",
      items: [
        { icon: "bullseye", title: "Oferta", text: "Clareza sobre o que é oferecido e para quem." },
        { icon: "type", title: "Copy visual", text: "Texto e design trabalhando juntos para comunicar rápido." },
        { icon: "sort-down", title: "Hierarquia", text: "O que o visitante precisa ver primeiro — e depois." },
        { icon: "cursor", title: "UX", text: "Leitura fluida, sem distrações do objetivo principal." },
        { icon: "hand-index-thumb", title: "CTA", text: "Chamadas claras e bem posicionadas ao longo da página." },
        { icon: "patch-check", title: "Prova", text: "Depoimentos, resultados e elementos de confiança." },
        { icon: "phone", title: "Responsividade", text: "A maior parte do tráfego pago chega pelo celular." },
        { icon: "lightning-charge", title: "Velocidade", text: "Página leve para não desperdiçar o clique do anúncio." },
        { icon: "bar-chart", title: "Analytics", text: "Configuração de métricas quando contratado." },
      ],
    },
    audience: {
      title: "Ideal para",
      items: ["Campanhas", "Tráfego pago", "Produtos", "Cursos", "Serviços", "Captação de leads", "Lançamentos"],
    },
    whenToHire: [
      "Você vai investir em anúncios e precisa de uma página para receber esse tráfego.",
      "Tem um produto, curso ou serviço específico para vender.",
      "Quer testar uma nova oferta rapidamente.",
      "Seu site institucional não converte bem para campanhas.",
    ],
  },
  {
    slug: "ecommerce",
    icon: "cart",
    name: "E-commerce",
    shortName: "E-commerce",
    card: "Lojas virtuais desenvolvidas para tornar produtos mais desejáveis, facilitar a compra e gerar vendas.",
    wa: "ecommerce",
    cta: "Quero criar minha loja",
    projectCategories: ["ecommerce"],
    seo: {
      title: "Lojas virtuais e e-commerce",
      description:
        "Lojas virtuais em Shopify criadas para facilitar a decisão de compra: vitrines, categorias, página de produto, carrinho, checkout e integrações.",
    },
    hero: {
      eyebrow: "E-commerce",
      title: "Lojas virtuais criadas",
      highlight: "para facilitar a decisão de compra.",
      lead: [
        "Uma boa loja virtual vai além de listar produtos.",
        "Ela organiza o catálogo, valoriza cada item e remove o atrito entre o interesse e a compra.",
      ],
    },
    why: {
      title: "Plataformas que utilizamos",
      text: "Nossas lojas publicadas utilizam Shopify, com checkout Yampi quando faz sentido para a operação.",
      points: [
        { icon: "bag-check", title: "Shopify", text: "Plataforma robusta e escalável para gestão de produtos, pedidos e pagamentos." },
        { icon: "credit-card", title: "Checkout Yampi", text: "Utilizado em lojas publicadas pela Camaly para a etapa de checkout." },
        { icon: "sliders", title: "Configuração sob medida", text: "Tema, vitrines e navegação adaptados ao catálogo e ao público da loja." },
      ],
    },
    deliverables: {
      title: "O que a loja inclui",
      items: [
        { icon: "house", title: "Home", text: "Vitrines, banners e destaques que conduzem à compra." },
        { icon: "grid", title: "Categorias e coleções", text: "Catálogo organizado para o cliente encontrar rápido." },
        { icon: "tag", title: "Página de produto", text: "Fotos, descrição e informações que ajudam na decisão." },
        { icon: "cart", title: "Carrinho e checkout", text: "Fluxo de compra direto, com menos etapas." },
        { icon: "whatsapp", title: "WhatsApp", text: "Atendimento acessível para tirar dúvidas antes da compra." },
        { icon: "image", title: "Banners", text: "Espaços de campanha para ofertas e lançamentos." },
        { icon: "phone", title: "Responsivo", text: "Experiência de compra pensada para o celular." },
        { icon: "file-earmark-text", title: "Políticas", text: "Páginas de trocas, envio e privacidade." },
        { icon: "plug", title: "Integrações", text: "Pagamentos, frete e ferramentas da operação." },
        { icon: "bar-chart", title: "Analytics", text: "Acompanhamento de métricas quando contratado." },
      ],
    },
    audience: {
      title: "Para quem é",
      items: ["Varejo", "Moda e beleza", "Produtos de nicho", "Marcas que vendem pelo Instagram", "Lojas físicas que querem vender online"],
    },
    whenToHire: [
      "Você vende pelo Instagram ou WhatsApp e quer escalar.",
      "Sua loja atual é difícil de navegar ou não passa confiança.",
      "Você tem uma loja física e quer abrir o canal online.",
      "Seu catálogo cresceu e precisa de organização.",
    ],
  },
  {
    slug: "sistemas-plataformas",
    icon: "code-slash",
    name: "Sistemas & Plataformas",
    shortName: "Sistemas",
    card: "Aplicações, sistemas e plataformas personalizadas para transformar ideias, serviços e processos em produtos digitais.",
    wa: "sistemas",
    cta: "Quero tirar minha ideia do papel",
    projectCategories: ["sistemas", "plataformas"],
    seo: {
      title: "Sistemas, plataformas e aplicações web sob medida",
      description:
        "Desenvolvemos sistemas, plataformas e aplicações web sob medida: dashboards, portais, áreas do cliente, integrações, APIs e produtos digitais.",
    },
    hero: {
      eyebrow: "Sistemas & Plataformas",
      title: "Quando um site não é suficiente,",
      highlight: "construímos o produto.",
      lead: [
        "Criamos sistemas, plataformas e aplicações digitais sob medida para empresas que precisam transformar processos, serviços ou novas ideias em tecnologia.",
      ],
    },
    why: {
      title: "Do problema ao produto",
      text: "Um sistema bem construído começa pelo entendimento do processo — só depois vem a tecnologia.",
      points: [
        { icon: "diagram-3", title: "Mapear o processo", text: "Entendemos como a operação funciona hoje e onde a tecnologia gera mais valor." },
        { icon: "bounding-box", title: "Desenhar o produto", text: "Fluxos, telas e regras definidos antes do desenvolvimento." },
        { icon: "rocket-takeoff", title: "Construir e evoluir", text: "Entregamos uma base funcional, pronta para crescer com o negócio." },
      ],
    },
    deliverables: {
      title: "O que podemos construir",
      items: [
        { icon: "speedometer2", title: "Dashboards", text: "Indicadores e informações da operação em um só lugar." },
        { icon: "sliders", title: "Painéis administrativos", text: "Gestão de conteúdo, usuários, pedidos e cadastros." },
        { icon: "door-open", title: "Portais", text: "Ambientes para clientes, parceiros ou equipes." },
        { icon: "window-stack", title: "Aplicações web", text: "Ferramentas acessíveis pelo navegador, em qualquer dispositivo." },
        { icon: "building-gear", title: "Sistemas internos", text: "Processos da empresa transformados em fluxos digitais." },
        { icon: "person-badge", title: "Área do cliente", text: "Login, histórico, reservas e informações do usuário." },
        { icon: "gear-wide-connected", title: "Automação", text: "Tarefas repetitivas resolvidas por regras e integrações." },
        { icon: "braces", title: "APIs", text: "Comunicação entre sistemas de forma estruturada." },
        { icon: "plug", title: "Integrações", text: "Pagamentos, mensageria, ERPs e outras ferramentas." },
        { icon: "shop", title: "Marketplaces", text: "Plataformas que conectam compradores e vendedores." },
        { icon: "cloud", title: "SaaS", text: "Produtos digitais por assinatura." },
        { icon: "puzzle", title: "Plataformas personalizadas", text: "Quando a necessidade não cabe em nenhuma ferramenta pronta." },
      ],
    },
    audience: {
      title: "Para quem é",
      items: ["Empresas com processos manuais", "Negócios de serviço que precisam de reservas ou agendamentos", "Empreendedores com uma ideia de produto", "Operações que precisam integrar ferramentas"],
    },
    whenToHire: [
      "Sua operação depende de planilhas e processos manuais.",
      "Você tem uma ideia de produto digital e precisa tirá-la do papel.",
      "Seus clientes precisam de uma área própria (reservas, pedidos, histórico).",
      "As ferramentas prontas não atendem ao seu processo.",
    ],
    disclaimer: "Cada projeto possui requisitos diferentes e passa por análise técnica antes da proposta.",
  },
];

/** Capacidades transversais apresentadas em /servicos. */
export const CAPABILITIES: ServiceItem[] = [
  { icon: "palette", title: "UI/UX", text: "Interfaces claras, com hierarquia, identidade e foco em quem vai usar." },
  { icon: "braces", title: "Desenvolvimento", text: "Código moderno, responsivo e preparado para evoluir." },
  { icon: "plug", title: "Integrações", text: "WhatsApp, pagamentos, formulários e ferramentas da operação." },
  { icon: "speedometer", title: "Otimização", text: "Performance, SEO técnico e melhorias em projetos existentes." },
];

export function getService(slug: string | undefined): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
