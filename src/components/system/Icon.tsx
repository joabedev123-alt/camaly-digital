import { cn } from "@/lib/utils";

/** Bootstrap Icons — `name` sem o prefixo "bi-". */
export const Icon = ({ name, className, label }: { name: string; className?: string; label?: string }) => (
  <i
    className={cn(`bi bi-${name}`, "inline-block leading-none", className)}
    aria-hidden={label ? undefined : true}
    role={label ? "img" : undefined}
    aria-label={label}
  />
);
