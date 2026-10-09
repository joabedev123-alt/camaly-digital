import { Link } from "react-router-dom";
import { PAGE_SEO } from "@/config/seo";
import { Seo } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Eyebrow, Section, SectionHeader } from "@/components/system/Section";
import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/system/Reveal";
import { ButtonLink, WhatsAppButton } from "@/components/system/Button";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { HeroChameleon } from "@/components/brand/HeroChameleon";
import { LogoMarquee } from "@/components/blocks/LogoMarquee";
import { ServiceCard } from "@/components/blocks/ServiceCard";
import { ProjectShowcase } from "@/components/blocks/ProjectShowcase";
import { Metrics } from "@/components/blocks/Metrics";
import { ProcessTimeline } from "@/components/blocks/ProcessSteps";
import { Testimonials } from "@/components/blocks/Testimonials";
import { FAQ, faqLd } from "@/components/blocks/FAQ";
import { CTASection } from "@/components/blocks/CTASection";
import { SERVICES } from "@/data/services";
import { FEATURED_PROJECTS, INDUSTRIES, PROJECTS } from "@/data/projects";
import { DIFFERENTIALS, FAQ as FAQ_ITEMS, PILLARS, PROBLEMS, PROCESS_SHORT } from "@/data/content";
import { CONTACT, SITE } from "@/config/site";

const LAYOUTS = ["left", "right", "full", "left", "right"] as const;

const orgLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: SITE.url + SITE.logo,
    email: CONTACT.email,
    sameAs: [CONTACT.instagramUrl],
    contactPoint: { "@type": "ContactPoint", telephone: `+${CONTACT.whatsapp}`, contactType: "sales", availableLanguage: ["Portuguese"] },
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: SITE.url, inLanguage: "pt-BR" },
  faqLd(FAQ_ITEMS),
];

const Home = () => (
  <>
    <Seo
      {...PAGE_SEO["/"]}
      jsonLd={orgLd}
    />

    {/* ═══ HERO ═══════════════════════════════════════════════ */}
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] lg:pb-14">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-80 [mask-image:radial-gradient(ellipse_90%_70%_at_60%_10%,#000,transparent_80%)]" />
      <div aria-hidden className="absolute -top-60 left-1/2 h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(0,240,168,0.09),transparent)]" />

      <div className="container-x relative z-10">
        <Reveal>
          <Eyebrow>CAMALY® — Digital Product Studio</Eyebrow>
        </Reveal>

        <LineReveal as="h1" immediate fluid delay={0.1} className="mt-7 text-[clamp(40px,6vw,88px)] font-semibold leading-[0.98] tracking-[-0.045em]">
          <>Transformamos ideias</>
          <>em experiências digitais</>
          <>
            que <span className="text-brand">fazem negócios crescerem.</span>
          </>
        </LineReveal>

        <div className="mt-10 grid items-center gap-12 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal delay={0.35}>
              <p className="lead max-w-xl">
                Criamos sites, landing pages, lojas virtuais, sistemas e plataformas digitais que unem estratégia, design e tecnologia para transformar presença
                digital em oportunidade de negócio.
              </p>
            </Reveal>
            <Reveal delay={0.45} className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <WhatsAppButton size="lg" context="home">
                Quero criar meu projeto
              </WhatsAppButton>
              <a href="#projetos" className="link-arrow justify-center sm:justify-start">
                Explorar projetos <Icon name="arrow-down" />
              </a>
            </Reveal>
            <Reveal delay={0.55}>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-soft/80">Sites • E-commerce • Landing Pages • Sistemas • Plataformas</p>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="lg:col-span-7">
            <HeroChameleon className="mx-auto w-full max-w-[720px] lg:-mr-6 lg:ml-auto" />
          </Reveal>
        </div>
      </div>
    </section>

    {/* ═══ TRUST BAR ══════════════════════════════════════════ */}
    <section aria-label="Clientes" className="border-y border-line bg-ink-soft py-10">
      <p className="container-x mb-8 text-center text-[12px] uppercase tracking-[0.22em] text-soft">
        Projetos desenvolvidos para negócios de diferentes mercados
      </p>
      <LogoMarquee />
    </section>

    {/* ═══ PROBLEMA ═══════════════════════════════════════════ */}
    <Section labelledBy="problema-title">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader id="problema-title" eyebrow="Presença digital" title={["Seu cliente pesquisa antes", "de escolher quem contratar."]} />
          <Reveal delay={0.15} className="mt-8 space-y-5 text-[17px] leading-relaxed text-soft">
            <p>
              Ter um excelente produto ou serviço não é suficiente se sua empresa não transmite confiança quando alguém encontra sua marca na internet.
            </p>
            <p>Seu site precisa explicar o que você faz, apresentar seus diferenciais, provar sua capacidade e transformar interesse em contato.</p>
          </Reveal>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
          {PROBLEMS.map((p) => (
            <StaggerItem key={p.n} className="spotlight surface flex flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[12px] tracking-[0.2em] text-soft">{p.n}</span>
                <Icon name={p.icon} className="text-xl text-brand" />
              </div>
              <h3 className="mt-10 text-[21px] font-semibold leading-snug tracking-tight">{p.title}</h3>
              <p className="mt-3 text-[15px] text-soft">{p.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
      <Reveal className="mt-16 flex items-center gap-5 border-t border-line pt-10">
        <span className="h-px w-12 bg-brand" />
        <p className="text-[clamp(22px,2.6vw,32px)] font-medium tracking-tight">É exatamente aqui que a Camaly entra.</p>
      </Reveal>
    </Section>

    {/* ═══ SERVIÇOS ═══════════════════════════════════════════ */}
    <Section tone="soft" id="servicos" labelledBy="servicos-title">
      <SectionHeader
        id="servicos-title"
        align="split"
        eyebrow="What we build"
        title={["Uma solução digital", "para cada desafio."]}
        lead="De uma página para campanha a uma plataforma completa — cada formato resolve um tipo de problema."
      />
      <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:gap-5">
        {SERVICES.map((s, i) => (
          <StaggerItem key={s.slug}>
            <ServiceCard service={s} index={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    {/* ═══ THE CAMALY WAY ═════════════════════════════════════ */}
    <section aria-labelledby="way-title" className="section relative overflow-hidden">
      <BrandWatermark variant="chameleon" position="right" opacity={0.06} scale={0.9} />
      <div className="container-x relative z-10">
        <div className="max-w-4xl">
          <Reveal>
            <Eyebrow>The Camaly Way</Eyebrow>
          </Reveal>
          <LineReveal as="h2" className="display-2 mt-7">
            <span id="way-title">Não colocamos sua empresa</span>
            <>dentro de um template.</>
            <span className="text-soft">Nós nos adaptamos</span>
            <span className="text-brand">ao seu negócio.</span>
          </LineReveal>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="space-y-5 text-[17.5px] leading-relaxed text-soft lg:col-span-5">
            <p className="text-foreground">Nenhuma empresa é igual à outra.</p>
            <p>
              Por isso, antes de pensar no layout, entendemos seu público, seu mercado, sua oferta e o resultado que o projeto precisa gerar.
            </p>
            <p>Assim como o camaleão entende o ambiente antes de se adaptar, a Camaly desenvolve cada solução considerando a realidade do negócio.</p>
          </Reveal>
          <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:col-span-7">
            {PILLARS.map((p) => (
              <StaggerItem key={p.title} className="spotlight flex min-w-0 flex-col bg-ink p-5 sm:p-8">
                <Icon name={p.icon} className="text-2xl text-brand" />
                <h3 className="mt-8 break-words text-[14px] font-semibold uppercase tracking-[0.02em] sm:text-[18px] sm:tracking-[0.06em]">{p.title}</h3>
                <p className="mt-2 text-[14.5px] text-soft">{p.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>

    {/* ═══ PORTFÓLIO ══════════════════════════════════════════ */}
    <Section tone="soft" id="projetos" labelledBy="work-title">
      <SectionHeader
        id="work-title"
        align="split"
        eyebrow="Selected work"
        title={["Projetos que transformam", "negócios em experiências digitais."]}
        action={
          <ButtonLink to="/portfolio" variant="ghost" icon="arrow-up-right">
            Ver todo o portfólio
          </ButtonLink>
        }
      />
      <div className="mt-20 space-y-28 lg:space-y-40">
        {FEATURED_PROJECTS.slice(0, 5).map((p, i) => (
          <ProjectShowcase key={p.slug} project={p} index={i} layout={LAYOUTS[i]} />
        ))}
      </div>
      <Reveal className="mt-24 flex justify-center">
        <ButtonLink to="/portfolio" size="lg" icon="arrow-up-right">
          Ver todo o portfólio
        </ButtonLink>
      </Reveal>
    </Section>

    {/* ═══ SEGMENTOS ══════════════════════════════════════════ */}
    <section aria-labelledby="segmentos-title" className="relative overflow-hidden border-y border-line py-20 lg:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Projetos para diferentes mercados</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <p id="segmentos-title" className="mt-6 text-[clamp(24px,2.6vw,34px)] font-medium leading-snug tracking-tight">
                De negócios locais a plataformas digitais, nossa metodologia se adapta ao desafio.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.15} className="lg:col-span-7">
            <ul className="flex flex-wrap gap-2.5">
              {INDUSTRIES.map((ind) => (
                <li key={ind}>
                  <Link
                    to={`/portfolio?segmento=${encodeURIComponent(ind)}`}
                    className="inline-flex items-center rounded-full border border-line px-4 py-2 text-[14px] text-soft transition-colors hover:border-primary/40 hover:text-foreground"
                  >
                    {ind}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>

    {/* ═══ RESULTADOS ═════════════════════════════════════════ */}
    <Section labelledBy="results-title">
      <SectionHeader id="results-title" eyebrow="Results" title={["Bonito chama atenção.", <span className="text-soft">Resultado constrói negócios.</span>]} />
      <div className="mt-16">
        <Metrics />
      </div>
      <Reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px] text-soft">
        <span>
          <span className="font-semibold text-foreground">{PROJECTS.length}</span> cases publicados no portfólio
        </span>
        <span>
          <span className="font-semibold text-foreground">{INDUSTRIES.length}</span> segmentos atendidos
        </span>
        <span>Clientes no Brasil e nos Estados Unidos</span>
      </Reveal>
    </Section>

    {/* ═══ DIFERENCIAIS ═══════════════════════════════════════ */}
    <Section tone="soft" labelledBy="why-title">
      <SectionHeader id="why-title" align="split" eyebrow="Por que Camaly?" title={["Built to adapt.", "Designed to perform."]} />
      <Stagger className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
        {DIFFERENTIALS.map((d) => (
          <StaggerItem key={d.n} className="group border-b border-line py-10 sm:pr-10 lg:[&:nth-child(3n+2)]:px-10 lg:[&:nth-child(3n)]:pl-10 lg:[&:nth-child(3n+2)]:border-x">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[12px] tracking-[0.2em] text-brand">{d.n}</span>
              <Icon name={d.icon} className="text-xl text-soft transition-colors group-hover:text-brand" />
            </div>
            <h3 className="mt-8 text-[20px] font-semibold uppercase tracking-tight">{d.title}</h3>
            <p className="mt-3 text-[16px] text-soft">{d.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    {/* ═══ PROCESSO ═══════════════════════════════════════════ */}
    <Section labelledBy="process-title">
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
      <div className="mt-16">
        <ProcessTimeline steps={PROCESS_SHORT} />
      </div>
    </Section>

    {/* ═══ DEPOIMENTOS ════════════════════════════════════════ */}
    <Section tone="soft" labelledBy="test-title">
      <SectionHeader id="test-title" eyebrow="Depoimentos" title={["Quem trabalha com a Camaly", "entende a diferença."]} />
      <div className="mt-16">
        <Testimonials />
      </div>
    </Section>

    {/* ═══ FAQ ════════════════════════════════════════════════ */}
    <Section labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeader id="faq-title" eyebrow="Dúvidas" title={["Ainda está", "em dúvida?"]} size="2" />
          <Reveal delay={0.2} className="mt-8">
            <p className="text-[16px] text-soft">Não encontrou sua pergunta? Fale direto com a equipe.</p>
            <WhatsAppButton variant="ghost" className="mt-6" context="home" icon="arrow-right">
              Perguntar no WhatsApp
            </WhatsAppButton>
          </Reveal>
        </div>
        <div className="lg:col-span-8">
          <FAQ items={FAQ_ITEMS.slice(0, 9)} />
        </div>
      </div>
    </Section>

    {/* ═══ PROVOCAÇÃO + CTA ═══════════════════════════════════ */}
    <section aria-label="Não espere sua empresa ficar para trás" className="border-t border-line bg-ink-soft py-16 lg:py-20">
      <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-5">
          <p className="text-[13px] font-medium uppercase tracking-[0.22em] text-brand">Não espere sua empresa ficar para trás.</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-7">
          <p className="text-[clamp(22px,2.4vw,30px)] font-medium leading-snug tracking-tight">
            Seu cliente já está pesquisando. A questão é: <span className="text-soft">ele encontra você ou seu concorrente?</span>
          </p>
        </Reveal>
      </div>
    </section>

    <CTASection />
  </>
);

export default Home;
