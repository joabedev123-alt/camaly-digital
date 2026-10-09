import { CONTACT } from "@/config/site";

/** Mensagens pré-preenchidas por contexto de conversão. */
export const WA_MESSAGES = {
  home: "Olá! Conheci a Camaly pelo site e gostaria de conversar sobre um projeto.",
  sites: "Olá! Estou interessado em criar/renovar o site da minha empresa.",
  "landing-pages": "Olá! Gostaria de conversar sobre uma landing page.",
  ecommerce: "Olá! Gostaria de conversar sobre uma loja virtual.",
  sistemas: "Olá! Tenho uma ideia para um sistema/plataforma e gostaria de conversar.",
  portfolio: "Olá! Vi os projetos da Camaly e gostaria de conversar sobre o meu.",
  processo: "Olá! Conheci o processo da Camaly e gostaria de começar um projeto.",
  sobre: "Olá! Conheci a Camaly pelo site e gostaria de conversar sobre um projeto.",
  contato: "Olá! Gostaria de falar com a Camaly sobre um projeto.",
} as const;

export type WaContext = keyof typeof WA_MESSAGES;

export function waLink(context: WaContext | { text: string } = "home"): string {
  const text = typeof context === "string" ? WA_MESSAGES[context] : context.text;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const caseMessage = (projectName: string) =>
  `Olá! Vi o projeto ${projectName} no site da Camaly e gostaria de conversar sobre o meu.`;
