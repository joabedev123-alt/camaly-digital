import { SERVICES } from "@/data/services";

export const NAV = [
  { label: "Início", to: "/" },
  { label: "Serviços", to: "/servicos", mega: true },
  { label: "Projetos", to: "/portfolio" },
  { label: "Processo", to: "/processo" },
  { label: "Sobre", to: "/sobre" },
  { label: "Contato", to: "/contato" },
] as const;

export const SERVICE_LINKS = SERVICES.map((s) => ({
  label: s.name,
  to: `/servicos/${s.slug}`,
  icon: s.icon,
  text: s.card,
}));
