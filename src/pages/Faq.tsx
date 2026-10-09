import { PAGE_SEO } from "@/config/seo";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Section } from "@/components/system/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { FAQ, faqLd } from "@/components/blocks/FAQ";
import { CTASection } from "@/components/blocks/CTASection";
import { FAQ as FAQ_ITEMS } from "@/data/content";

const Faq = () => (
  <>
    <Seo
      {...PAGE_SEO["/faq"]}
      jsonLd={[
        faqLd(FAQ_ITEMS),
        breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Perguntas frequentes", path: "/faq" },
        ]),
      ]}
    />
    <PageHero
      eyebrow="FAQ"
      breadcrumb={[{ name: "Início", path: "/" }, { name: "Perguntas frequentes" }]}
      title={["Perguntas", <span className="text-brand">frequentes.</span>]}
      lead={<p>Respostas diretas para as dúvidas mais comuns antes de começar um projeto.</p>}
    />
    <Section className="!pt-0">
      <div className="mx-auto max-w-4xl">
        <FAQ items={FAQ_ITEMS} />
      </div>
    </Section>
    <CTASection eyebrow="Ainda tem dúvidas?" title={["Pergunte direto", "para a equipe."]} button="Falar no WhatsApp" />
  </>
);

export default Faq;
