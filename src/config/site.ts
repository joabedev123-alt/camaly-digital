/**
 * Fonte única de informações institucionais da Camaly.
 * Contatos e métricas vieram do site publicado em camaly.com.br.
 */
export const SITE = {
  name: "Camaly Digital",
  shortName: "Camaly",
  url: "https://camaly.com.br",
  locale: "pt_BR",
  tagline: "Digital Product Studio",
  description:
    "Desenvolvemos sites, landing pages, lojas virtuais, sistemas e plataformas digitais para empresas que querem crescer através da tecnologia.",
  logo: "/brand/camaly-logo.png",
  ogImage: "/og/camaly.jpg",
} as const;

export const CONTACT = {
  /** Número usado em todos os CTAs do site publicado. */
  whatsapp: "5531973373379",
  whatsappDisplay: "+55 31 97337-3379",
  email: "contato@camaly.com.br",
  instagram: "camalydigital",
  instagramUrl: "https://instagram.com/camalydigital",
} as const;

/**
 * Métricas exibidas no site atual (seção "Números que provam nosso resultado").
 * Mantidas exatamente como estavam publicadas — revise com a equipe antes de alterar.
 */
export const METRICS = [
  { value: 120, suffix: "+", label: "Projetos entregues", detail: "para empresas de todo o Brasil" },
  { value: 98, suffix: "%", label: "Satisfação dos clientes", detail: "que indicam para outros" },
  { value: 3, suffix: "x", label: "Mais conversão", detail: "comparado à média do mercado" },
  { value: 100, suffix: "%", label: "Atendimento estratégico", detail: "do início ao resultado" },
] as const;
