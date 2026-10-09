import { lazy, Suspense } from "react";
import { PAGE_SEO } from "@/config/seo";
import { Seo } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Eyebrow } from "@/components/system/Section";
import { LineReveal, Reveal } from "@/components/system/Reveal";
import { WhatsAppButton } from "@/components/system/Button";
import { HeroChameleon } from "@/components/brand/HeroChameleon";
import { LogoMarquee } from "@/components/blocks/LogoMarquee";
import { faqLd } from "@/components/blocks/FAQ";
import { FAQ as FAQ_ITEMS } from "@/data/content";
import { CONTACT, SITE } from "@/config/site";

// Seções abaixo da dobra em um chunk separado: o hero aparece antes e o
// trabalho de renderização é dividido (menos bloqueio no celular).
const HomeSections = lazy(() => import("./HomeSections"));

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
    <section className="relative flex flex-col justify-start overflow-hidden lg:min-h-[100svh] lg:justify-center pb-12 pt-[calc(var(--header-h)+40px)] lg:pb-14">
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
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.2em] text-soft">Sites • E-commerce • Landing Pages • Sistemas • Plataformas</p>
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

    <Suspense fallback={<div className="min-h-[200vh]" aria-hidden />}>
      <HomeSections />
    </Suspense>
  </>
);

export default Home;
