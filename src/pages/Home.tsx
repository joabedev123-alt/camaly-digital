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
    <Seo {...PAGE_SEO["/"]} jsonLd={orgLd} />

    {/* ═══ HERO ═══════════════════════════════════════════════ */}
    <section className="relative flex flex-col justify-start overflow-hidden pb-8 pt-[calc(var(--header-h)+28px)] sm:pb-10 sm:pt-[calc(var(--header-h)+36px)] lg:min-h-[100svh] lg:justify-center lg:pb-12">
      <div aria-hidden className="atmosphere max-md:opacity-70" />
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_90%_70%_at_60%_10%,#000,transparent_80%)] sm:opacity-70" />

      <div className="container-x relative z-10">
        <Reveal>
          <Eyebrow>CAMALY® — Digital Product Studio</Eyebrow>
        </Reveal>

        <LineReveal as="h1" immediate fluid delay={0.1} className="mt-5 text-[clamp(30px,8.2vw,88px)] font-semibold leading-[0.98] tracking-[-0.045em] sm:mt-7">
          <>Transformamos ideias</>
          <>em experiências digitais</>
          <>
            que <span className="bg-gradient-to-r from-brand to-cyan bg-clip-text text-transparent">fazem negócios crescerem.</span>
          </>
        </LineReveal>

        <div className="mt-8 grid items-center gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <Reveal delay={0.35}>
              <p className="lead max-w-lg text-[16px] sm:text-[17px] md:text-[18px]">
                Sites, lojas, landing pages e plataformas desenvolvidos para transformar presença digital em resultado.
              </p>
            </Reveal>
            <Reveal delay={0.45} className="mt-7 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:items-center sm:gap-5">
              <WhatsAppButton size="lg" context="home" className="w-full sm:w-auto">
                Quero criar meu projeto
              </WhatsAppButton>
              <a href="#projetos" className="link-arrow min-h-11 justify-center sm:justify-start">
                Ver nossos trabalhos <Icon name="arrow-down" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.25} className="order-1 lg:order-2 lg:col-span-7">
            <HeroChameleon className="mx-auto w-full max-w-[560px] sm:max-w-[680px] lg:-mr-8 lg:ml-auto lg:max-w-[760px]" />
          </Reveal>
        </div>
      </div>
    </section>

    {/* ═══ TRUST BAR (visual) ═════════════════════════════════ */}
    <section aria-label="Clientes" className="border-y border-line bg-ink-soft py-6 sm:py-8">
      <LogoMarquee />
    </section>

    <Suspense fallback={<div className="min-h-[80vh] md:min-h-[160vh]" aria-hidden />}>
      <HomeSections />
    </Suspense>
  </>
);

export default Home;
