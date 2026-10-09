import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { LineReveal, Reveal } from "./Reveal";

export const Container = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn("container-x", className)}>{children}</div>
);

export const Section = ({
  children,
  className,
  id,
  tone = "base",
  bleed = false,
  labelledBy,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "base" | "soft" | "surface";
  /** Remove o container interno (para layouts full-bleed). */
  bleed?: boolean;
  labelledBy?: string;
}) => (
  <section
    id={id}
    aria-labelledby={labelledBy}
    className={cn(
      "section overflow-hidden",
      tone === "soft" && "bg-ink-soft",
      tone === "surface" && "bg-surface",
      className,
    )}
  >
    {bleed ? children : <Container>{children}</Container>}
  </section>
);

export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn("eyebrow", className)}>{children}</span>
);

/**
 * Cabeçalho padrão de seção. `title` aceita array para quebrar linhas
 * com revelação por linha.
 */
export const SectionHeader = ({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  id,
  size = "2",
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode | ReactNode[];
  lead?: ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
  id?: string;
  size?: "1" | "2" | "3";
  action?: ReactNode;
}) => {
  const lines = Array.isArray(title) ? title : [title];
  const heading = (
    <LineReveal as="h2" className={cn(`display-${size}`)}>
      {lines}
    </LineReveal>
  );

  if (align === "split") {
    return (
      <header className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12 lg:items-end", className)}>
        <div className="lg:col-span-7" id={id}>
          {eyebrow && (
            <Reveal className="mb-6">
              <Eyebrow>{eyebrow}</Eyebrow>
            </Reveal>
          )}
          {heading}
        </div>
        {(lead || action) && (
          <Reveal className="lg:col-span-5 lg:pb-2" delay={0.15}>
            {lead && <p className="lead">{lead}</p>}
            {action && <div className="mt-8">{action}</div>}
          </Reveal>
        )}
      </header>
    );
  }

  return (
    <header className={cn(align === "center" && "mx-auto text-center max-w-4xl", className)}>
      {eyebrow && (
        <Reveal className="mb-6">
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <div id={id}>{heading}</div>
      {lead && (
        <Reveal delay={0.15}>
          <p className={cn("lead mt-6 max-w-2xl", align === "center" && "mx-auto")}>{lead}</p>
        </Reveal>
      )}
      {action && (
        <Reveal delay={0.2} className="mt-10">
          {action}
        </Reveal>
      )}
    </header>
  );
};
