import type { ReactNode } from "react";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { WhatsAppButton } from "@/components/system/Button";
import { Eyebrow } from "@/components/system/Section";
import { LineReveal, Reveal } from "@/components/system/Reveal";
import type { WaContext } from "@/lib/whatsapp";

/** CTA final — uma das seções mais fortes do site. */
export const CTASection = ({
  eyebrow = "Start a project",
  title = ["Seu próximo projeto", "pode começar agora."],
  text = "Conte para nossa equipe o que sua empresa precisa. Vamos entender o desafio e indicar a solução certa.",
  button = "Falar com a Camaly",
  context = "home",
  waText,
  secondary,
}: {
  eyebrow?: string;
  title?: ReactNode[];
  text?: ReactNode;
  button?: string;
  context?: WaContext;
  waText?: string;
  secondary?: ReactNode;
}) => (
  <section data-cta-zone data-tone="deep" className="relative overflow-hidden border-t border-line bg-deep py-[clamp(96px,14vw,180px)] noise">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_30%_100%,rgba(0,196,138,0.18),transparent_65%),radial-gradient(ellipse_45%_40%_at_80%_20%,rgba(31,168,186,0.12),transparent_60%)]" />
    <BrandWatermark variant="camaly" position="center" opacity={0.05} scale={0.95} />
    <BrandWatermark variant="wire" position="bottom-right" opacity={0.06} scale={0.55} />

    <div className="container-x relative z-10 text-center">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <LineReveal as="h2" className="display-1 mx-auto mt-8 max-w-5xl">
        {title}
      </LineReveal>
      <Reveal delay={0.2}>
        <p className="lead mx-auto mt-6 max-w-xl">{text}</p>
      </Reveal>
      <Reveal delay={0.3} className="mt-10 flex flex-col items-center gap-5">
        <WhatsAppButton size="lg" context={context} text={waText}>
          {button}
        </WhatsAppButton>
        {secondary}
      </Reveal>
    </div>
  </section>
);
