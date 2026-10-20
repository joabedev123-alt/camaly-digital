import { Link } from "react-router-dom";
import { PAGE_SEO } from "@/config/seo";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Section, SectionHeader } from "@/components/system/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/system/Reveal";
import { WhatsAppButton } from "@/components/system/Button";
import { PageHero } from "@/components/blocks/PageHero";
import { CTASection } from "@/components/blocks/CTASection";
import { CAPABILITIES, SERVICES } from "@/data/services";
import { projectsByCategory } from "@/data/projects";

const Services = () => (
  <>
    <Seo
      {...PAGE_SEO["/servicos"]}
      jsonLd={breadcrumbLd([
        { name: "Início", path: "/" },
        { name: "Serviços", path: "/servicos" },
      ])}
    />
    <PageHero
      eyebrow="Soluções digitais"
      breadcrumb={[{ name: "Início", path: "/" }, { name: "Serviços" }]}
      title={["Da presença digital", <span className="text-brand">ao produto completo.</span>]}
      lead={<p>Criamos diferentes tipos de soluções digitais para empresas que precisam vender, comunicar, automatizar ou transformar uma ideia em produto.</p>}
      actions={
        <WhatsAppButton size="lg" context="home">
          Conversar sobre meu projeto
        </WhatsAppButton>
      }
    />

    {/* Índice rápido */}
    <nav aria-label="Serviços" className="sticky top-[var(--header-h)] z-30 border-y border-line bg-ink/85 backdrop-blur-xl">
      <ul className="container-x flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain py-3 scrollbar-hide lg:snap-none">
        {SERVICES.map((s) => (
          <li key={s.slug} className="shrink-0 snap-start">
            <a href={`#${s.slug}`} className="flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-[14px] text-soft transition-colors hover:bg-surface hover:text-foreground">
              <Icon name={s.icon} className="text-brand" /> {s.name}
            </a>
          </li>
        ))}
        <li className="shrink-0 snap-start">
          <a href="#capacidades" className="flex min-h-11 items-center gap-2 rounded-full px-4 py-2 text-[14px] text-soft transition-colors hover:bg-surface hover:text-foreground">
            <Icon name="stars" className="text-brand" /> UI/UX & mais
          </a>
        </li>
      </ul>
    </nav>

    {SERVICES.map((s, i) => {
      const related = projectsByCategory(...s.projectCategories).slice(0, 3);
      return (
        <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-t`} className={`section scroll-mt-[calc(var(--header-h)+3.5rem)] ${i % 2 ? "bg-ink-soft" : ""}`}>
          <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-md border border-line bg-surface text-2xl text-brand">
                  <Icon name={s.icon} />
                </span>
                <span className="font-mono text-[12px] tracking-[0.22em] text-soft">{String(i + 1).padStart(2, "0")} / 04</span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 id={`${s.slug}-t`} className="display-3 mt-8 uppercase">
                  {s.name}
                </h2>
                <p className="mt-6 text-[17.5px] leading-relaxed text-soft">{s.card}</p>
              </Reveal>
              <Reveal delay={0.1} className="mt-8">
                <p className="text-[12px] uppercase tracking-[0.2em] text-soft">Quando contratar</p>
                <ul className="mt-4 space-y-3">
                  {s.whenToHire.map((w) => (
                    <li key={w} className="flex gap-3 text-[15.5px]">
                      <Icon name="check2" className="mt-1 text-brand" /> {w}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.15} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link to={`/servicos/${s.slug}`} className="btn btn-ghost">
                  Conhecer o serviço <Icon name="arrow-right" />
                </Link>
                <WhatsAppButton context={s.wa} variant="primary">
                  {s.cta}
                </WhatsAppButton>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="text-[12px] uppercase tracking-[0.2em] text-soft">Benefícios e entregas</p>
              </Reveal>
              <Stagger className="mt-5 cells grid sm:grid-cols-2">
                {s.deliverables.items.slice(0, 6).map((d) => (
                  <StaggerItem key={d.title} className="bg-ink p-6">
                    <Icon name={d.icon} className="text-lg text-brand" />
                    <h3 className="mt-4 font-semibold tracking-tight">{d.title}</h3>
                    <p className="mt-1.5 text-[14.5px] text-soft">{d.text}</p>
                  </StaggerItem>
                ))}
              </Stagger>

              {related.length > 0 && (
                <Reveal className="mt-10">
                  <p className="text-[12px] uppercase tracking-[0.2em] text-soft">Exemplos reais</p>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-3 sm:gap-3">
                    {related.map((p) => (
                      <li key={p.slug}>
                        <Link to={`/portfolio/${p.slug}`} className="group block">
                          <div className="aspect-[16/10] overflow-hidden rounded-md border border-line">
                            <img src={p.cover.srcSm} alt={p.name} loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-1000 ease-premium group-hover:scale-[1.05]" />
                          </div>
                          <span className="mt-2 block truncate text-[13px] text-soft group-hover:text-foreground">{p.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      );
    })}

    <Section id="capacidades" labelledBy="cap-title" className="scroll-mt-32">
      <SectionHeader id="cap-title" align="split" eyebrow="Em todos os projetos" title={["Strategy × Design", "× Technology."]} lead="Capacidades que atravessam todos os formatos — e que também podem ser contratadas para evoluir um projeto existente." />
      <Stagger className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CAPABILITIES.map((c) => (
          <StaggerItem key={c.title} className="spotlight surface p-7">
            <Icon name={c.icon} className="text-2xl text-brand" />
            <h3 className="mt-10 text-[20px] font-semibold uppercase tracking-tight">{c.title}</h3>
            <p className="mt-3 text-[15px] text-soft">{c.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    <CTASection title={["Não sabe qual formato", "faz mais sentido?"]} text="Conte o seu objetivo. Nossa equipe indica a solução mais adequada para o momento do seu negócio." button="Falar com um especialista" />
  </>
);

export default Services;
