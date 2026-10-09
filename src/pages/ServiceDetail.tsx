import { Link, Navigate, useParams } from "react-router-dom";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Section, SectionHeader } from "@/components/system/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/system/Reveal";
import { WhatsAppButton } from "@/components/system/Button";
import { PageHero } from "@/components/blocks/PageHero";
import { CTASection } from "@/components/blocks/CTASection";
import { RelatedProjects } from "@/components/blocks/RelatedProjects";
import { ProcessTimeline } from "@/components/blocks/ProcessSteps";
import { FAQ } from "@/components/blocks/FAQ";
import { DeviceMockup } from "@/components/blocks/DeviceMockup";
import { getService, SERVICES } from "@/data/services";
import { projectsByCategory } from "@/data/projects";
import { FAQ as FAQ_ITEMS, PROCESS_SHORT } from "@/data/content";
import { SITE } from "@/config/site";
import { serviceMeta } from "@/config/seo";

/** FAQs mais relevantes por serviço (referência por texto da pergunta). */
const FAQ_BY_SERVICE: Record<string, string[]> = {
  "sites-institucionais": ["Eu já tenho Instagram. Preciso de site?", "O site funciona no celular?", "Vocês criam o conteúdo?", "Quanto tempo leva?"],
  "landing-pages": ["O site funciona no celular?", "Vocês criam o conteúdo?", "Posso pedir alterações?", "Quanto tempo leva?"],
  ecommerce: ["Vocês desenvolvem lojas virtuais?", "O site funciona no celular?", "Quanto tempo leva?", "Como funciona o pagamento?"],
  "sistemas-plataformas": ["Vocês fazem sistemas?", "Posso pedir alterações?", "Quanto tempo leva?", "Como funciona o pagamento?"],
};

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getService(slug);
  if (!service) return <Navigate to="/servicos" replace />;

  const projects = projectsByCategory(...service.projectCategories);
  const [hero] = projects;
  const faqs = FAQ_ITEMS.filter((f) => FAQ_BY_SERVICE[service.slug]?.includes(f.q));
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const isSystems = service.slug === "sistemas-plataformas";

  return (
    <>
      <Seo
        {...serviceMeta(service.slug)!}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.seo.description,
            provider: { "@type": "Organization", name: SITE.name, url: SITE.url },
            areaServed: ["BR", "US"],
          },
          breadcrumbLd([
            { name: "Início", path: "/" },
            { name: "Serviços", path: "/servicos" },
            { name: service.name, path: `/servicos/${service.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={service.hero.eyebrow}
        breadcrumb={[{ name: "Início", path: "/" }, { name: "Serviços", path: "/servicos" }, { name: service.name }]}
        title={[service.hero.title, <span className="text-brand">{service.hero.highlight}</span>]}
        lead={service.hero.lead.map((l) => (
          <p key={l}>{l}</p>
        ))}
        actions={
          <>
            <WhatsAppButton size="lg" context={service.wa}>
              {service.cta}
            </WhatsAppButton>
            <a href="#entregas" className="link-arrow justify-center">
              O que entregamos <Icon name="arrow-down" />
            </a>
          </>
        }
        watermark={isSystems ? "chameleon" : "wire"}
      />

      {hero && (
        <div className="container-x -mt-4 mb-4">
          <Reveal>
            <Link to={`/portfolio/${hero.slug}`} className="group block overflow-hidden rounded-xl border border-line">
              <DeviceMockup image={hero.cover} alt={`${hero.name} — ${hero.type}`} url={hero.url} composition={isSystems ? "perspective" : "browser"} eager />
            </Link>
            <p className="mt-4 text-[13px] text-soft">
              Projeto real: <Link to={`/portfolio/${hero.slug}`} className="text-foreground hover:text-brand">{hero.name}</Link> · {hero.type}
            </p>
          </Reveal>
        </div>
      )}

      {/* Por quê */}
      <Section labelledBy="why-t">
        <SectionHeader id="why-t" align="split" eyebrow="Por quê" title={[service.why.title]} size="3" lead={service.why.text} />
        <Stagger className="mt-14 grid gap-4 md:grid-cols-3">
          {service.why.points.map((p, i) => (
            <StaggerItem key={p.title} className="spotlight surface p-7 sm:p-8">
              <div className="flex items-center justify-between">
                <Icon name={p.icon} className="text-2xl text-brand" />
                <span className="font-mono text-[12px] tracking-[0.2em] text-soft">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-10 text-[21px] font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[15.5px] leading-relaxed text-soft">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      {/* Entregas */}
      <Section tone="soft" id="entregas" labelledBy="del-t" className="scroll-mt-24">
        <SectionHeader id="del-t" eyebrow={isSystems ? "Possibilidades" : "Entregas"} title={[service.deliverables.title]} />
        <Stagger className="mt-14 cells grid sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.items.map((d) => (
            <StaggerItem key={d.title} className="group bg-ink-soft p-7 transition-colors duration-500 hover:bg-surface">
              <Icon name={d.icon} className="text-xl text-brand" />
              <h3 className="mt-6 text-[18px] font-semibold tracking-tight">{d.title}</h3>
              <p className="mt-2 text-[15px] text-soft">{d.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
        {service.disclaimer && (
          <Reveal className="mt-8 flex items-start gap-3 rounded-md border border-line bg-ink p-5 text-[15px] text-soft">
            <Icon name="info-circle" className="mt-0.5 text-brand" />
            {service.disclaimer}
          </Reveal>
        )}
      </Section>

      {/* Para quem é + quando contratar */}
      <Section labelledBy="aud-t">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader id="aud-t" eyebrow="Para quem" title={[service.audience.title]} size="3" />
            <Reveal delay={0.1}>
              <ul className="mt-10 flex flex-wrap gap-2.5">
                {service.audience.items.map((a) => (
                  <li key={a} className="rounded-full border border-line px-4 py-2.5 text-[15px]">
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div>
            <SectionHeader eyebrow="Sinais" title={["Quando contratar"]} size="3" />
            <Stagger as="ul" className="mt-10 border-t border-line">
              {service.whenToHire.map((w, i) => (
                <StaggerItem as="li" key={w} className="flex items-start gap-5 border-b border-line py-5">
                  <span className="font-mono text-[12px] tracking-[0.2em] text-brand">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[17px]">{w}</span>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Section>

      {/* Processo */}
      <Section tone="soft" labelledBy="proc-t">
        <SectionHeader
          id="proc-t"
          align="split"
          eyebrow="Como trabalhamos"
          title={["Um processo claro,", "do diagnóstico ao lançamento."]}
          action={
            <Link to="/processo" className="link-arrow">
              Ver o processo completo <Icon name="arrow-right" />
            </Link>
          }
        />
        <div className="mt-14">
          <ProcessTimeline steps={PROCESS_SHORT} />
        </div>
      </Section>

      <RelatedProjects projects={projects.slice(0, 6)} tone="base" title={["Projetos reais", `de ${service.shortName.toLowerCase()}.`]} />

      {faqs.length > 0 && (
        <Section tone="soft" labelledBy="faq-t">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeader id="faq-t" eyebrow="Dúvidas" title={["Perguntas", "frequentes"]} size="3" />
            </div>
            <div className="lg:col-span-8">
              <FAQ items={faqs} />
            </div>
          </div>
        </Section>
      )}

      {/* Outros serviços */}
      <section aria-label="Outros serviços" className="border-t border-line py-14">
        <div className="container-x grid gap-3 sm:grid-cols-3">
          {others.map((s) => (
            <Link key={s.slug} to={`/servicos/${s.slug}`} className="group flex items-center justify-between rounded-md border border-line p-5 transition-colors hover:border-white/20 hover:bg-surface">
              <span className="flex items-center gap-3">
                <Icon name={s.icon} className="text-brand" />
                <span className="font-medium">{s.name}</span>
              </span>
              <Icon name="arrow-up-right" className="text-soft transition-transform duration-500 ease-premium group-hover:rotate-45 group-hover:text-foreground" />
            </Link>
          ))}
        </div>
      </section>

      <CTASection eyebrow={service.hero.eyebrow} title={["Vamos conversar", "sobre o seu projeto?"]} button={service.cta} context={service.wa} />
    </>
  );
};

export default ServiceDetail;
