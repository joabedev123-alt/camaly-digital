import { PAGE_SEO } from "@/config/seo";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Section } from "@/components/system/Section";
import { PageHero } from "@/components/blocks/PageHero";
import { ProjectGrid } from "@/components/blocks/ProjectGrid";
import { CTASection } from "@/components/blocks/CTASection";
import { INDUSTRIES, PROJECTS } from "@/data/projects";
import { SITE } from "@/config/site";

const Portfolio = () => (
  <>
    <Seo
      {...PAGE_SEO["/portfolio"]}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Portfólio Camaly Digital",
          url: `${SITE.url}/portfolio`,
          hasPart: PROJECTS.map((p) => ({ "@type": "CreativeWork", name: p.name, url: `${SITE.url}/portfolio/${p.slug}` })),
        },
        breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Portfólio", path: "/portfolio" },
        ]),
      ]}
    />
    <PageHero
      eyebrow="Our work"
      breadcrumb={[{ name: "Início", path: "/" }, { name: "Portfólio" }]}
      title={["Projetos desenvolvidos", <span className="text-brand">para diferentes desafios.</span>]}
      lead={<p>Sites, lojas, landing pages, sistemas e experiências digitais construídos para empresas de diferentes mercados.</p>}
      aside={
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
          <div className="bg-ink p-6">
            <dt className="text-[13px] text-soft">Cases publicados</dt>
            <dd className="mt-2 text-[44px] font-semibold leading-none tracking-[-0.04em]">{PROJECTS.length}</dd>
          </div>
          <div className="bg-ink p-6">
            <dt className="text-[13px] text-soft">Segmentos</dt>
            <dd className="mt-2 text-[44px] font-semibold leading-none tracking-[-0.04em]">{INDUSTRIES.length}</dd>
          </div>
        </dl>
      }
    />
    <Section className="!pt-0">
      <ProjectGrid />
    </Section>
    <CTASection title={["Gostou do que viu?", "O próximo pode ser o seu."]} context="portfolio" button="Falar sobre meu projeto" />
  </>
);

export default Portfolio;
