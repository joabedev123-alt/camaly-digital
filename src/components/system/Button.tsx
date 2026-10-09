import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { waLink, type WaContext } from "@/lib/whatsapp";
import { Icon } from "./Icon";

type Variant = "primary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  icon?: string;
  iconLeft?: string;
  className?: string;
  ariaLabel?: string;
}

const classes = (variant: Variant, size: Size, className?: string) =>
  cn("btn", `btn-${variant}`, size !== "md" && `btn-${size}`, className);

/** Link interno (react-router) estilizado como botão. */
export const ButtonLink = ({ to, children, variant = "primary", size = "md", icon, iconLeft, className, ariaLabel }: BaseProps & { to: string }) => (
  <Link to={to} className={classes(variant, size, className)} aria-label={ariaLabel}>
    {iconLeft && <Icon name={iconLeft} />}
    <span>{children}</span>
    {icon && <Icon name={icon} />}
  </Link>
);

/** Link externo estilizado como botão. */
export const ButtonExternal = ({ href, children, variant = "primary", size = "md", icon, iconLeft, className, ariaLabel }: BaseProps & { href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={classes(variant, size, className)} aria-label={ariaLabel}>
    {iconLeft && <Icon name={iconLeft} />}
    <span>{children}</span>
    {icon && <Icon name={icon} />}
  </a>
);

/** CTA de WhatsApp com mensagem contextual. */
export const WhatsAppButton = ({
  context = "home",
  text,
  children,
  variant = "primary",
  size = "md",
  className,
  icon = "arrow-up-right",
}: Omit<BaseProps, "iconLeft"> & { context?: WaContext; text?: string }) => (
  <a
    href={text ? waLink({ text }) : waLink(context)}
    target="_blank"
    rel="noopener noreferrer"
    className={classes(variant, size, className)}
    aria-label={`${typeof children === "string" ? children : "Falar com a Camaly"} — abre o WhatsApp`}
  >
    <Icon name="whatsapp" />
    <span>{children}</span>
    {icon && <Icon name={icon} className="opacity-70" />}
  </a>
);
