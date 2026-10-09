import type { ReactNode } from "react";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { Breadcrumb } from "@/components/system/Breadcrumb";
import { Eyebrow } from "@/components/system/Section";
import { LineReveal, Reveal } from "@/components/system/Reveal";

/** Hero das páginas internas. */
export const PageHero = ({
  eyebrow,
  title,
  lead,
  breadcrumb,
  actions,
  aside,
  watermark = "wire",
}: {
  eyebrow: string;
  title: ReactNode[];
  lead?: ReactNode;
  breadcrumb?: { name: string; path?: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
  watermark?: "wire" | "chameleon" | "camaly" | "none";
}) => (
  <section className="relative overflow-hidden pb-[clamp(64px,9vw,120px)] pt-[calc(var(--header-h)+clamp(48px,8vw,112px))]">
    <div aria-hidden className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_80%_70%_at_70%_0%,#000,transparent_75%)]" />
    <div aria-hidden className="absolute -top-40 right-[-10%] h-[520px] w-[720px] rounded-full bg-[radial-gradient(closest-side,rgba(0,240,168,0.10),transparent)]" />
    {watermark !== "none" && <BrandWatermark variant={watermark} position="top-right" opacity={0.05} scale={watermark === "camaly" ? 0.9 : 0.62} className="top-24" />}

    <div className="container-x relative z-10">
      {breadcrumb && (
        <Reveal className="mb-10">
          <Breadcrumb items={breadcrumb} />
        </Reveal>
      )}
      <div className={aside ? "grid gap-12 lg:grid-cols-12 lg:items-end" : undefined}>
        <div className={aside ? "lg:col-span-7" : undefined}>
          <Reveal>
            <Eyebrow>{eyebrow}</Eyebrow>
          </Reveal>
          <LineReveal as="h1" immediate fluid className="display-1 mt-7 max-w-[15ch]" delay={0.1}>
            {title}
          </LineReveal>
          {lead && (
            <Reveal delay={0.25}>
              <div className="lead mt-8 max-w-2xl space-y-4">{lead}</div>
            </Reveal>
          )}
          {actions && (
            <Reveal delay={0.35} className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              {actions}
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={0.3} className="lg:col-span-5">
            {aside}
          </Reveal>
        )}
      </div>
    </div>
  </section>
);
