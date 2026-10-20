import { PAGE_SEO } from "@/config/seo";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Eyebrow, Section, SectionHeader } from "@/components/system/Section";
import { LineReveal, Reveal, Stagger, StaggerItem } from "@/components/system/Reveal";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { PageHero } from "@/components/blocks/PageHero";
import { CTASection } from "@/components/blocks/CTASection";
import { Metrics } from "@/components/blocks/Metrics";
import { DIFFERENTIALS, PRINCIPLES, TEAM } from "@/data/content";
import { SITE } from "@/config/site";

const About = () => (
  <>
    <Seo
      {...PAGE_SEO["/sobre"]}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Sobre a Camaly Digital",
          url: `${SITE.url}/sobre`,
          mainEntity: {
            "@type": "Organization",
            name: SITE.name,
            url: SITE.url,
            employee: TEAM.map((t) => ({ "@type": "Person", name: t.name, jobTitle: t.role })),
          },
        },
        breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Sobre", path: "/sobre" },
        ]),
      ]}
    />

    <PageHero
      eyebrow="About Camaly"
      breadcrumb={[{ name: "Início", path: "/" }, { name: "Sobre" }]}
      title={["Tecnologia precisa se adaptar", <span className="text-brand">ao negócio — e não o contrário.</span>]}
      lead={
        <>
          <p>A Camaly nasceu da vontade de transformar ideias e empresas através do digital.</p>
          <p>
            Nosso trabalho combina estratégia, design e tecnologia para criar produtos digitais que realmente fazem sentido para quem usa e para quem investe.
          </p>
        </>
      }
      watermark="chameleon"
    />

    {/* Conceito do camaleão */}
    <section aria-labelledby="name-t" className="section relative overflow-hidden border-y border-line bg-ink-soft">
      <BrandWatermark variant="chameleon" position="center" opacity={0.05} scale={1.1} />
      <div className="container-x relative z-10 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>O nome</Eyebrow>
          </Reveal>
          <LineReveal as="h2" className="display-2 mt-7">
            <span id="name-t">Uma ideia simples:</span>
            <span className="text-brand">adaptação.</span>
          </LineReveal>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Stagger className="space-y-px overflow-hidden rounded-lg border border-line bg-line">
            {[
              ["01", "O nome e a identidade carregam uma ideia simples: adaptação."],
              ["02", "O camaleão entende o ambiente antes de mudar."],
              ["03", "Da mesma forma, antes de criar, buscamos entender o negócio."],
            ].map(([n, t]) => (
              <StaggerItem key={n} className="flex gap-6 bg-ink p-7 sm:p-9">
                <span className="font-mono text-[12px] tracking-[0.2em] text-brand">{n}</span>
                <p className="text-[clamp(19px,1.8vw,23px)] font-medium leading-snug tracking-tight">{t}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.2}>
            <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.24em] text-soft">Entender. Adaptar. Construir. Evoluir.</p>
          </Reveal>
        </div>
      </div>
    </section>

    {/* Equipe */}
    <Section labelledBy="team-t">
      <SectionHeader
        id="team-t"
        align="split"
        eyebrow="Quem está por trás"
        title={["Três sócios.", "Uma forma de trabalhar."]}
        lead="A Camaly é liderada por seus sócios, que acompanham os projetos de perto — da primeira conversa à publicação."
      />
      <Stagger className="mt-16 grid gap-5 sm:grid-cols-3">
        {TEAM.map((m) => (
          <StaggerItem key={m.name} className="group">
            <div className="spotlight relative grid aspect-square place-items-center overflow-hidden rounded-lg border border-line bg-surface">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-60 mask-radial" />
              <div className="relative aspect-square w-[72%] overflow-hidden rounded-full ring-1 ring-white/10 ring-offset-8 ring-offset-[rgb(var(--rgb-surface))] transition-[box-shadow] duration-700 group-hover:ring-primary/50">
                <img
                  src={m.image}
                  alt={`${m.name}, ${m.role} da Camaly`}
                  loading="lazy"
                  className="h-full w-full scale-[1.04] object-cover grayscale transition-all duration-[1.2s] ease-premium group-hover:scale-[1.08] group-hover:grayscale-0"
                />
              </div>
              <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-ink/60 px-3 py-1 font-mono text-[11px] tracking-[0.18em] backdrop-blur">{m.role}</span>
            </div>
            <h3 className="mt-5 text-[22px] font-semibold tracking-tight">{m.name}</h3>
            <p className="text-[15px] text-soft">Sócio · {m.role}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    {/* Forma de pensar */}
    <Section tone="soft" labelledBy="think-t">
      <SectionHeader id="think-t" eyebrow="Nossa forma de pensar" title={["Princípios que guiam", "cada projeto."]} />
      <ol className="mt-16 border-t border-line">
        {PRINCIPLES.map((p, i) => (
          <Reveal as="li" key={p.n} delay={i * 0.05} className="group grid grid-cols-[auto_1fr] items-center gap-6 border-b border-line py-7 sm:grid-cols-[auto_1fr_auto] sm:gap-10 sm:py-9">
            <span className="font-mono text-[13px] tracking-[0.2em] text-brand">{p.n}</span>
            <span className="min-w-0 break-words text-[clamp(26px,4vw,56px)] font-semibold leading-none tracking-[-0.04em] transition-transform duration-700 ease-premium group-hover:translate-x-2">{p.title}</span>
            <Icon name="arrow-right" className="hidden text-xl text-soft opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:block" />
          </Reveal>
        ))}
      </ol>
    </Section>

    <Section labelledBy="num-t">
      <SectionHeader id="num-t" eyebrow="Em números" title={["O que já construímos."]} size="3" />
      <div className="mt-14">
        <Metrics />
      </div>
    </Section>

    <Section tone="soft" labelledBy="diff-t">
      <SectionHeader id="diff-t" align="split" eyebrow="Por que Camaly?" title={["Your business. Your challenge.", <span className="text-brand">Your digital solution.</span>]} size="3" />
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DIFFERENTIALS.map((d) => (
          <StaggerItem key={d.n} className="spotlight surface p-7">
            <Icon name={d.icon} className="text-xl text-brand" />
            <h3 className="mt-8 text-[18px] font-semibold uppercase tracking-tight">{d.title}</h3>
            <p className="mt-2 text-[15px] text-soft">{d.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    <CTASection eyebrow="From idea to product" title={["Vamos construir", "alguma coisa juntos?"]} context="sobre" />
  </>
);

export default About;
