import { Seo } from "@/components/system/Seo";
import { PAGE_SEO } from "@/config/seo";
import { PageHero } from "@/components/blocks/PageHero";
import { CONTACT } from "@/config/site";

/*
 * Textos-base. Revise com assessoria jurídica antes da publicação definitiva —
 * especialmente se forem adicionadas ferramentas de analytics, pixels ou cookies.
 */

const PRIVACY = [
  {
    h: "Quais dados coletamos",
    p: "O site não exige cadastro. Quando você usa o formulário de contato, os dados informados (nome, empresa, WhatsApp, e-mail e descrição do projeto) são montados em uma mensagem e enviados por você, pelo WhatsApp, para a nossa equipe. O formulário não armazena essas informações em servidores do site.",
  },
  {
    h: "Como usamos os dados",
    p: "Usamos as informações recebidas exclusivamente para responder ao seu contato, entender o seu projeto e apresentar uma proposta.",
  },
  {
    h: "Compartilhamento",
    p: "Não vendemos nem compartilhamos seus dados com terceiros para fins de marketing. As conversas acontecem nos canais que você escolher (WhatsApp ou e-mail), sujeitas também às políticas desses serviços.",
  },
  {
    h: "Seus direitos",
    p: `Você pode solicitar a qualquer momento acesso, correção ou exclusão dos seus dados, conforme a Lei Geral de Proteção de Dados (LGPD), pelo e-mail ${CONTACT.email}.`,
  },
];

const TERMS = [
  {
    h: "Uso do site",
    p: "Este site apresenta os serviços e projetos da Camaly Digital. O conteúdo tem caráter informativo e não constitui proposta comercial — condições, prazos e valores são definidos em proposta específica para cada projeto.",
  },
  {
    h: "Propriedade intelectual",
    p: "Marca, textos, elementos visuais e código deste site pertencem à Camaly Digital. Os projetos exibidos no portfólio pertencem aos respectivos clientes e são apresentados como referência do trabalho realizado.",
  },
  {
    h: "Links externos",
    p: "O portfólio contém links para sites de clientes. Não nos responsabilizamos pelo conteúdo, disponibilidade ou políticas desses sites.",
  },
  {
    h: "Contato",
    p: `Dúvidas sobre estes termos podem ser enviadas para ${CONTACT.email}.`,
  },
];

const Legal = ({ kind }: { kind: "privacidade" | "termos" }) => {
  const isPrivacy = kind === "privacidade";
  const items = isPrivacy ? PRIVACY : TERMS;
  const title = isPrivacy ? "Política de privacidade" : "Termos de uso";
  return (
    <>
      <Seo {...PAGE_SEO[`/${kind}`]} />
      <PageHero eyebrow="Institucional" breadcrumb={[{ name: "Início", path: "/" }, { name: title }]} title={[title]} watermark="none" />
      <section className="pb-32">
        <div className="container-x">
          <div className="max-w-3xl space-y-12">
            {items.map((it, i) => (
              <div key={it.h} className="grid gap-4 border-t border-line pt-8 sm:grid-cols-[80px_1fr]">
                <span className="font-mono text-[12px] tracking-[0.2em] text-brand">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-[22px] font-semibold tracking-tight">{it.h}</h2>
                  <p className="mt-3 text-[16.5px] leading-relaxed text-soft">{it.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Legal;
