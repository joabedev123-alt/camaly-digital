import jonatanImg from "@/assets/socios/jonatan-drumond.webp";
import joabeImg from "@/assets/socios/joabe-avila.webp";
import igorImg from "@/assets/socios/igor-martins.webp";
import { CONTACT } from "@/config/site";

/* ── Processo ─────────────────────────────────────────────────── */
export interface ProcessPhase {
  n: string;
  icon: string;
  title: string;
  short: string;
  text: string;
  outputs: string[];
}

export const PROCESS_FULL: ProcessPhase[] = [
  {
    n: "01",
    icon: "compass",
    title: "Diagnóstico",
    short: "Entendemos negócio, mercado, público e objetivo.",
    text: "Antes de qualquer tela, conversamos sobre a empresa, os clientes, a concorrência e o que o projeto precisa gerar. É aqui que definimos o que realmente importa.",
    outputs: ["Objetivos do projeto", "Público e mercado", "Escopo inicial"],
  },
  {
    n: "02",
    icon: "signpost-split",
    title: "Estratégia",
    short: "Definimos estrutura, mensagem e experiência.",
    text: "Transformamos o diagnóstico em direção: qual mensagem comunicar, em que ordem, e qual ação queremos que o visitante tome.",
    outputs: ["Posicionamento da mensagem", "Jornada do usuário", "Prioridades"],
  },
  {
    n: "03",
    icon: "diagram-3",
    title: "Estrutura / UX",
    short: "Organizamos páginas, seções e fluxos.",
    text: "Definimos a arquitetura das páginas e os fluxos de navegação. Em sistemas e plataformas, mapeamos telas, regras e permissões.",
    outputs: ["Arquitetura de páginas", "Fluxos", "Hierarquia de conteúdo"],
  },
  {
    n: "04",
    icon: "palette",
    title: "Design",
    short: "Criamos uma identidade digital alinhada ao posicionamento.",
    text: "Direção visual, tipografia, cores, componentes e a interface de cada página — desktop e mobile tratados individualmente.",
    outputs: ["Direção visual", "Interface desktop e mobile", "Componentes"],
  },
  {
    n: "05",
    icon: "code-slash",
    title: "Desenvolvimento",
    short: "Transformamos o design em uma experiência rápida, responsiva e funcional.",
    text: "Construímos o projeto com tecnologia moderna, foco em performance e integrações necessárias para a operação.",
    outputs: ["Código responsivo", "Integrações", "Otimização de performance"],
  },
  {
    n: "06",
    icon: "bug",
    title: "Testes",
    short: "Verificamos funcionamento em diferentes telas e navegadores.",
    text: "Testamos navegação, formulários, links e comportamento em diferentes dispositivos antes de apresentar a versão final.",
    outputs: ["Testes em dispositivos", "Revisão de links e formulários", "Ajustes técnicos"],
  },
  {
    n: "07",
    icon: "check2-circle",
    title: "Validação",
    short: "Revisamos projeto, conteúdo e funcionalidades com você.",
    text: "Você revisa o projeto completo. Ajustes são feitos a partir do seu feedback até a aprovação para publicação.",
    outputs: ["Revisão com o cliente", "Ajustes", "Aprovação"],
  },
  {
    n: "08",
    icon: "rocket-takeoff",
    title: "Lançamento",
    short: "Publicamos e entregamos uma estrutura pronta para funcionar.",
    text: "Publicamos o projeto, conferimos tudo em produção e entregamos uma estrutura pronta para receber clientes.",
    outputs: ["Publicação", "Conferência em produção", "Entrega"],
  },
];

/** Versão resumida (6 etapas) usada na Home. */
export const PROCESS_SHORT = ["01", "02", "04", "05", "07", "08"].map((n, i) => {
  const p = PROCESS_FULL.find((x) => x.n === n)!;
  return { ...p, n: String(i + 1).padStart(2, "0") };
});

export const CLIENT_NEEDS = [
  { icon: "journal-text", title: "Briefing", text: "Uma conversa inicial sobre a empresa, os objetivos e as referências." },
  { icon: "info-circle", title: "Informações", text: "Dados da empresa, serviços, diferenciais e contatos." },
  { icon: "images", title: "Materiais", text: "Logo, fotos, textos e acessos — o que já existir." },
  { icon: "chat-left-text", title: "Feedback", text: "Seu retorno nas etapas de revisão." },
  { icon: "check2-square", title: "Aprovações", text: "Aprovação das etapas para seguirmos com segurança." },
];

/* ── Diferenciais ─────────────────────────────────────────────── */
export const DIFFERENTIALS = [
  { n: "01", icon: "puzzle", title: "Soluções personalizadas", text: "Não encaixamos empresas dentro de templates prontos." },
  { n: "02", icon: "bullseye", title: "Design com estratégia", text: "Cada escolha visual precisa ajudar comunicação, navegação ou conversão." },
  { n: "03", icon: "braces", title: "Tecnologia sob medida", text: "De uma página institucional a uma aplicação complexa." },
  { n: "04", icon: "graph-up-arrow", title: "Visão de negócio", text: "Antes de pensar no código, entendemos o objetivo." },
  { n: "05", icon: "phone", title: "Experiência responsiva", text: "Desktop, tablet e smartphone tratados individualmente." },
  { n: "06", icon: "people", title: "Acompanhamento", text: "Participamos de todo o processo até a publicação." },
];

export const PILLARS = [
  { icon: "compass", title: "Estratégia", text: "Entendemos o negócio antes de desenhar." },
  { icon: "palette", title: "Design", text: "Identidade que comunica e conduz." },
  { icon: "code-slash", title: "Desenvolvimento", text: "Tecnologia moderna, feita para funcionar." },
  { icon: "lightning-charge", title: "Performance", text: "Rápido, responsivo e pronto para crescer." },
];

export const PROBLEMS = [
  { n: "01", icon: "globe2", title: "Sua empresa não possui site?", text: "Quem não encontra você, encontra o concorrente." },
  { n: "02", icon: "hourglass-split", title: "Seu site parece ultrapassado?", text: "Um site antigo comunica uma empresa parada no tempo." },
  { n: "03", icon: "graph-down-arrow", title: "Você recebe visitas, mas poucos contatos?", text: "Tráfego sem estrutura de conversão é oportunidade perdida." },
  { n: "04", icon: "gear-wide-connected", title: "Sua operação precisa de uma solução personalizada?", text: "Quando as ferramentas prontas não resolvem, a solução é construir." },
];

export const PRINCIPLES = [
  { n: "01", title: "Entender antes de criar." },
  { n: "02", title: "Resolver antes de decorar." },
  { n: "03", title: "Projetar para pessoas." },
  { n: "04", title: "Desenvolver para funcionar." },
  { n: "05", title: "Evoluir sempre." },
];

/* ── Equipe (fotos e cargos do site publicado) ────────────────── */
export const TEAM = [
  { name: "Jonatan Drumond", role: "CEO", image: jonatanImg },
  { name: "Joabe Avila", role: "CPO", image: joabeImg },
  { name: "Igor Martins", role: "CIO", image: igorImg },
];

/* ── Depoimentos em vídeo (vídeos reais do site publicado) ────── */
export interface VideoTestimonial {
  id: string;
  src: string;
  poster: string;
  /** Preencha quando o cliente autorizar a identificação. */
  name?: string;
  company?: string;
  /** Slug do projeto relacionado, quando identificado. */
  project?: string;
  projectType?: string;
}

export const VIDEO_TESTIMONIALS: VideoTestimonial[] = [
  { id: "01", src: "/videos/depoimento-01.mp4", poster: "/videos/depoimento-01-poster.jpg" },
  // O vídeo 02 mostra o site da Star Cases durante o depoimento.
  { id: "02", src: "/videos/depoimento-02.mp4", poster: "/videos/depoimento-02-poster.jpg", project: "star-cases", projectType: "Site institucional" },
  { id: "03", src: "/videos/depoimento-03.mp4", poster: "/videos/depoimento-03-poster.jpg" },
];

/* ── FAQ ──────────────────────────────────────────────────────── */
export interface FaqItem {
  q: string;
  a: string;
}

const SCOPE = "O prazo e o investimento dependem do escopo. Nossa equipe entende sua necessidade antes de apresentar a solução.";

export const FAQ: FaqItem[] = [
  {
    q: "Eu já tenho Instagram. Preciso de site?",
    a: "O Instagram é ótimo para relacionamento, mas você não controla o alcance nem a forma como sua empresa é apresentada. O site é o seu espaço próprio: explica o que você faz, reúne provas, aparece nas buscas do Google e conduz o visitante até o contato.",
  },
  {
    q: "O site funciona no celular?",
    a: "Sim. Todos os projetos são responsivos, e desktop, tablet e smartphone são tratados individualmente — não apenas reduzidos.",
  },
  {
    q: "Vocês criam o conteúdo?",
    a: "Orientamos a estrutura, a hierarquia e a mensagem de cada página. A produção de textos, fotos e demais materiais é alinhada no diagnóstico, de acordo com o escopo de cada projeto.",
  },
  {
    q: "Vocês trabalham com empresas dos Estados Unidos?",
    a: "Sim. Já desenvolvemos projetos para empresas nos Estados Unidos, como a MD Landscape, além de clientes em diferentes regiões do Brasil.",
  },
  {
    q: "Posso pedir alterações?",
    a: "Sim. O projeto passa por etapas de revisão e validação com você antes da publicação. A forma de trabalhar os ajustes é combinada no escopo.",
  },
  {
    q: "Vocês desenvolvem lojas virtuais?",
    a: "Sim. Desenvolvemos lojas virtuais em Shopify, com vitrines, categorias, página de produto, carrinho, checkout e integrações.",
  },
  {
    q: "Vocês fazem sistemas?",
    a: "Sim. Desenvolvemos sistemas, plataformas e aplicações web sob medida — como plataformas de reservas, áreas do cliente e painéis. Cada projeto passa por análise técnica antes da proposta.",
  },
  { q: "Quanto tempo leva?", a: SCOPE },
  {
    q: "Como funciona o pagamento?",
    a: "As condições de pagamento são apresentadas junto com a proposta, de acordo com o escopo do projeto. " + SCOPE.split(". ")[1],
  },
  {
    q: "Como falo com a Camaly?",
    a: `O atendimento é feito diretamente pelo WhatsApp (${CONTACT.whatsappDisplay}). Você também pode usar o formulário da página de contato ou o e-mail ${CONTACT.email}.`,
  },
];
