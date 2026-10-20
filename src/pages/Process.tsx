import { PAGE_SEO } from "@/config/seo";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Section, SectionHeader } from "@/components/system/Section";
import { Reveal, Stagger, StaggerItem } from "@/components/system/Reveal";
import { WhatsAppButton } from "@/components/system/Button";
import { PageHero } from "@/components/blocks/PageHero";
import { ProcessPhases } from "@/components/blocks/ProcessSteps";
import { CTASection } from "@/components/blocks/CTASection";
import { CLIENT_NEEDS, PROCESS_FULL } from "@/data/content";
import { CONTACT, SITE } from "@/config/site";

const Process = () => (
  <>
    <Seo
      {...PAGE_SEO["/processo"]}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "Como a Camaly desenvolve um projeto digital",
          url: `${SITE.url}/processo`,
          step: PROCESS_FULL.map((p, i) => ({ "@type": "HowToStep", position: i + 1, name: p.title, text: p.text })),
        },
        breadcrumbLd([
          { name: "Início", path: "/" },
          { name: "Processo", path: "/processo" },
        ]),
      ]}
    />

    <PageHero
      eyebrow="Nosso processo"
      breadcrumb={[{ name: "Início", path: "/" }, { name: "Processo" }]}
      title={["Um bom projeto começa", <span className="text-brand">muito antes do primeiro pixel.</span>]}
      lead={<p>Oito fases, cada uma com um objetivo claro. Você sabe o que está acontecendo, o que vem a seguir e quando sua participação é necessária.</p>}
      aside={
        <ol className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
          {PROCESS_FULL.map((p) => (
            <li key={p.n} className="flex min-h-[88px] flex-col justify-between bg-ink p-4 sm:aspect-square sm:min-h-0">
              <Icon name={p.icon} className="text-lg text-brand" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">{p.n}</span>
            </li>
          ))}
        </ol>
      }
    />

    <Section className="!pt-8">
      <ProcessPhases phases={PROCESS_FULL} />
    </Section>

    {/* O que precisamos do cliente */}
    <Section tone="soft" labelledBy="needs-t">
      <SectionHeader
        id="needs-t"
        align="split"
        eyebrow="Sua participação"
        title={["O que precisamos", "de você."]}
        lead="Projetos bons são construídos em conjunto. Estes são os pontos em que sua participação faz diferença."
      />
      <Stagger className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CLIENT_NEEDS.map((n, i) => (
          <StaggerItem key={n.title} className="spotlight surface flex flex-col p-6">
            <div className="flex items-center justify-between">
              <Icon name={n.icon} className="text-xl text-brand" />
              <span className="font-mono text-[11px] tracking-[0.2em] text-soft">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-8 text-[18px] font-semibold uppercase tracking-tight">{n.title}</h3>
            <p className="mt-2 text-[14.5px] text-soft">{n.text}</p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>

    {/* Comunicação */}
    <Section labelledBy="comm-t">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeader id="comm-t" eyebrow="Comunicação" title={["Como funciona", "a comunicação."]} size="3" />
        </div>
        <div className="lg:col-span-7">
          <Stagger as="ul" className="border-t border-line">
            {[
              { icon: "whatsapp", title: "WhatsApp como canal principal", text: `O atendimento acontece diretamente pelo WhatsApp (${CONTACT.whatsappDisplay}), do primeiro contato à entrega.` },
              { icon: "check2-circle", title: "Validação nas etapas", text: "Você revisa o projeto antes da publicação e os ajustes são feitos a partir do seu feedback." },
              { icon: "envelope", title: "E-mail quando necessário", text: `Materiais e documentos também podem ser enviados para ${CONTACT.email}.` },
            ].map((c) => (
              <StaggerItem as="li" key={c.title} className="flex gap-5 border-b border-line py-7">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-brand">
                  <Icon name={c.icon} />
                </span>
                <div>
                  <h3 className="text-[18px] font-semibold tracking-tight">{c.title}</h3>
                  <p className="mt-1.5 text-[15.5px] text-soft">{c.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <WhatsAppButton context="processo">Começar pelo diagnóstico</WhatsAppButton>
          </Reveal>
        </div>
      </div>
    </Section>

    <CTASection eyebrow="Fase 01" title={["Tudo começa", "com uma conversa."]} text="O diagnóstico é o primeiro passo. Conte sobre sua empresa e o que você quer construir." context="processo" />
  </>
);

export default Process;
