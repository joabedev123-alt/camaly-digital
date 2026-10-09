import { SERVICES } from "@/data/services";
import { PROJECTS } from "@/data/projects";

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
  noindex?: boolean;
}

/** Metadados das páginas estáticas — usados pelas páginas e pelo pré-render do build. */
export const PAGE_SEO = {
  "/": {
    title: "Camaly Digital | Sites, Landing Pages, E-commerce e Sistemas",
    description:
      "Desenvolvemos sites, landing pages, lojas virtuais, sistemas e plataformas digitais para empresas que querem crescer através da tecnologia.",
  },
  "/servicos": {
    title: "Serviços — sites, landing pages, e-commerce e sistemas",
    description: "Da presença digital ao produto completo: sites institucionais, landing pages, lojas virtuais, sistemas e plataformas sob medida.",
  },
  "/portfolio": {
    title: "Portfólio — projetos reais",
    description: "Sites, lojas virtuais, landing pages, sistemas e plataformas desenvolvidos pela Camaly para empresas de diferentes mercados.",
  },
  "/sobre": {
    title: "Sobre a Camaly",
    description: "A Camaly combina estratégia, design e tecnologia para criar produtos digitais que fazem sentido para quem usa e para quem investe.",
  },
  "/processo": {
    title: "Nosso processo",
    description: "Diagnóstico, estratégia, UX, design, desenvolvimento, testes, validação e lançamento: como a Camaly conduz cada projeto digital.",
  },
  "/contato": {
    title: "Contato",
    description: "Conte o que você precisa e a equipe da Camaly entra em contato para entender o seu projeto. Atendimento direto pelo WhatsApp.",
  },
  "/faq": {
    title: "Perguntas frequentes",
    description: "Dúvidas sobre sites, landing pages, lojas virtuais, sistemas, prazos e forma de trabalho da Camaly Digital.",
  },
  "/privacidade": { title: "Política de privacidade", description: "Política de privacidade do site da Camaly Digital." },
  "/termos": { title: "Termos de uso", description: "Termos de uso do site da Camaly Digital." },
} satisfies Record<string, PageMeta>;

export const serviceMeta = (slug: string): PageMeta | undefined => {
  const s = SERVICES.find((x) => x.slug === slug);
  return s && { title: s.seo.title, description: s.seo.description };
};

export const caseMeta = (slug: string): PageMeta | undefined => {
  const p = PROJECTS.find((x) => x.slug === slug);
  return p && { title: `${p.name} — ${p.type}`, description: `${p.summary} Case desenvolvido pela Camaly Digital.`, image: `/og/${p.slug}.jpg` };
};

/** Todas as rotas indexáveis, com seus metadados. */
export function allRoutes(): { path: string; meta: PageMeta; priority: number }[] {
  return [
    ...Object.entries(PAGE_SEO).map(([path, meta]) => ({
      path,
      meta,
      priority: path === "/" ? 1 : path === "/privacidade" || path === "/termos" ? 0.2 : 0.8,
    })),
    ...SERVICES.map((s) => ({ path: `/servicos/${s.slug}`, meta: serviceMeta(s.slug)!, priority: 0.9 })),
    ...PROJECTS.map((p) => ({ path: `/portfolio/${p.slug}`, meta: caseMeta(p.slug)!, priority: 0.6 })),
  ];
}
