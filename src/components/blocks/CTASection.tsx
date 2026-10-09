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
  text = "Conte para nossa equipe o que sua empresa precisa e vamos entender qual solução faz mais sentido para o seu negócio.",
  button = "Falar com um especialista",
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
  <section data-cta-zone className="relative overflow-hidden border-t border-line bg-ink py-[clamp(110px,16vw,220px)] noise">
    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(0,240,168,0.10),transparent_70%)]" />
    <BrandWatermark variant="camaly" position="center" opacity={0.045} scale={0.95} />
    <BrandWatermark variant="wire" position="bottom-right" opacity={0.07} scale={0.55} />

    <div className="container-x relative z-10 text-center">
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <LineReveal as="h2" className="display-1 mx-auto mt-8 max-w-5xl">
        {title}
      </LineReveal>
      <Reveal delay={0.2}>
        <p className="lead mx-auto mt-8 max-w-2xl">{text}</p>
      </Reveal>
      <Reveal delay={0.3} className="mt-12 flex flex-col items-center gap-5">
        <WhatsAppButton size="lg" context={context} text={waText}>
          {button}
        </WhatsAppButton>
        {secondary ?? <span className="text-[14px] text-soft">Atendimento direto pelo WhatsApp.</span>}
      </Reveal>
    </div>
  </section>
);
