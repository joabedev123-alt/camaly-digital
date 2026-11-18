import { Fragment, useEffect, useState } from "react";
import { Icon } from "@/components/system/Icon";
import { Eyebrow, Section, SectionHeader } from "@/components/system/Section";
import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/system/Reveal";
import { ButtonLink, WhatsAppButton } from "@/components/system/Button";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { HomeProjects } from "@/components/blocks/HomeProjects";
import { Metrics } from "@/components/blocks/Metrics";
import { ProcessTimeline } from "@/components/blocks/ProcessSteps";
import { Testimonials } from "@/components/blocks/Testimonials";
import { FAQ } from "@/components/blocks/FAQ";
import { CTASection } from "@/components/blocks/CTASection";
import { SERVICES } from "@/data/services";
import { INDUSTRIES, PROJECTS } from "@/data/projects";
import { CAMALY_WAY_FLOW, FAQ_HOME, PILLARS, PROCESS_HOME } from "@/data/content";

/*
 * Hierarquia da Home:
 * Projetos → Depoimentos → Serviços → Camaly Way → Resultados → Processo → FAQ → CTA
 *
 * Montagem ociosa: SEO preservado, sem bloquear o hero no celular.
 */
const BLOCKS = [
  <Fragment key="projetos">
    {/* ═══ SELECTED WORK ══════════════════════════════════════ */}
    <Section tone="soft" id="projetos" labelledBy="work-title" className="!py-[clamp(64px,9vw,110px)]">
      <HomeProjects />
    </Section>
  </Fragment>,

  <Fragment key="depoimentos">
    {/* ═══ DEPOIMENTOS ════════════════════════════════════════ */}
    <Section labelledBy="test-title" className="!py-[clamp(72px,10vw,120px)]">
      <SectionHeader
        id="test-title"
        align="split"
        eyebrow="Depoimentos"
        title={["Quem trabalha com a Camaly", "entende a diferença."]}
      />
      <div className="mt-12 lg:mt-14">
        <Testimonials />
      </div>
    </Section>
  </Fragment>,

  <Fragment key="servicos">
    {/* ═══ SERVIÇOS ═══════════════════════════════════════════ */}
    <Section tone="soft" id="servicos" labelledBy="servicos-title" className="!py-[clamp(72px,10vw,120px)]">
      <SectionHeader id="servicos-title" align="split" eyebrow="What we build" title={["Uma solução digital", "para cada desafio."]} />
      <Stagger className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 lg:gap-5">
        {SERVICES.map((s, i) => (
          <StaggerItem key={s.slug}>
            <ServiceCard service={s} index={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  </Fragment>,

  <Fragment key="camaly-way">
    {/* ═══ THE CAMALY WAY ═════════════════════════════════════ */}
    <section aria-labelledby="way-title" className="relative overflow-hidden py-[clamp(72px,10vw,120px)]">
      <BrandWatermark variant="chameleon" position="right" opacity={0.07} scale={0.95} />
      <BrandWatermark variant="wire" position="bottom-left" opacity={0.05} scale={0.5} />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_40%,#000,transparent_75%)]" />

      <div className="container-x relative z-10">
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>The Camaly Way</Eyebrow>
          </Reveal>
          <LineReveal as="h2" className="display-2 mt-7">
            <span id="way-title">Não encaixamos sua empresa</span>
            <>em um template.</>
            <span className="text-brand">Nós nos adaptamos ao seu negócio.</span>
          </LineReveal>
          <Reveal delay={0.15}>
            <p className="lead mt-7 max-w-2xl">
              Cada negócio possui um público, mercado e desafio diferente. Por isso, entendemos primeiro e desenvolvemos a solução que realmente faz sentido para cada
              empresa.
            </p>
          </Reveal>
        </div>

        {/* Fluxo visual: Entender → Adaptar → Construir → Evoluir */}
        <Stagger className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-16 lg:grid-cols-4">
          {CAMALY_WAY_FLOW.map((step, i) => (
            <StaggerItem key={step.label} className="relative flex items-center gap-3 rounded-lg border border-line bg-surface/80 px-4 py-5 backdrop-blur-sm sm:px-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-line bg-ink-soft text-lg text-brand">
                <Icon name={step.icon} />
              </span>
              <div className="min-w-0">
                <p className="font-mono text-[10px] tracking-[0.2em] text-soft">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 text-[15px] font-semibold uppercase tracking-tight sm:text-[16px]">{step.label}</p>
              </div>
              {i < CAMALY_WAY_FLOW.length - 1 && (
                <Icon name="chevron-right" className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-soft lg:block" />
              )}
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:mt-12 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <StaggerItem key={p.title} className="spotlight flex min-w-0 flex-col bg-surface p-5 sm:p-7">
              <Icon name={p.icon} className="text-2xl text-brand" />
              <h3 className="mt-5 break-words text-[14px] font-semibold uppercase leading-snug tracking-[0.04em] sm:mt-6 sm:text-[16px]">{p.title}</h3>
              <p className="mt-2 text-[13px] text-soft sm:text-[14px]">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  </Fragment>,

  <Fragment key="resultados">
    {/* ═══ RESULTADOS ═════════════════════════════════════════ */}
    <Section tone="soft" labelledBy="results-title" className="!py-[clamp(72px,10vw,120px)]">
      <SectionHeader id="results-title" eyebrow="Results" title={["Bonito chama atenção.", <span className="text-soft">Resultado constrói negócios.</span>]} />
      <div className="mt-12 lg:mt-14">
        <Metrics />
      </div>
      <Reveal className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2 text-[14px] text-soft sm:text-[15px]">
        <span>
          <span className="font-semibold text-foreground">{PROJECTS.length}</span> cases no portfólio
        </span>
        <span>
          <span className="font-semibold text-foreground">{INDUSTRIES.length}</span> segmentos atendidos
        </span>
        <span>Brasil e Estados Unidos</span>
      </Reveal>
    </Section>
  </Fragment>,

  <Fragment key="processo">
    {/* ═══ PROCESSO RESUMIDO ══════════════════════════════════ */}
    <Section labelledBy="process-title" className="!py-[clamp(72px,10vw,120px)]">
      <SectionHeader
        id="process-title"
        align="split"
        eyebrow="Processo"
        title={["Do primeiro contato", "ao projeto publicado."]}
        action={
          <ButtonLink to="/processo" variant="ghost" icon="arrow-right">
            Conhecer nosso processo
          </ButtonLink>
        }
      />
      <div className="mt-14 lg:mt-16">
        <ProcessTimeline steps={PROCESS_HOME} />
      </div>
    </Section>
  </Fragment>,

  <Fragment key="faq">
    {/* ═══ FAQ ════════════════════════════════════════════════ */}
    <Section tone="soft" labelledBy="faq-title" className="!py-[clamp(72px,10vw,120px)]">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-title" eyebrow="Dúvidas" title={["Ainda está", "em dúvida?"]} size="2" />
          <Reveal delay={0.15} className="mt-6">
            <WhatsAppButton variant="ghost" className="mt-2" context="home" icon="arrow-right">
              Perguntar no WhatsApp
            </WhatsAppButton>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <FAQ items={FAQ_HOME} />
        </div>
      </div>
    </Section>
  </Fragment>,

  <Fragment key="cta">
    {/* ═══ CTA FINAL ══════════════════════════════════════════ */}
    <CTASection />
  </Fragment>,
];

const hasIdle = typeof window !== "undefined" && "requestIdleCallback" in window;
const idle = (cb: () => void): number => (hasIdle ? window.requestIdleCallback(cb, { timeout: 400 }) : window.setTimeout(cb, 60));
const cancelIdle = (id: number) => (hasIdle ? window.cancelIdleCallback(id) : window.clearTimeout(id));

const HomeSections = () => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    if (count >= BLOCKS.length) return;
    const id = idle(() => setCount((c) => c + 1));
    return () => cancelIdle(id);
  }, [count]);
  return <>{BLOCKS.slice(0, count)}</>;
};

export default HomeSections;
