import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import type { Service } from "@/data/services";

export const ServiceCard = ({ service, index, className }: { service: Service; index: number; className?: string }) => (
  <Link
    to={`/servicos/${service.slug}`}
    className={cn(
      "group spotlight relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-7 transition-colors duration-500 hover:border-white/15 sm:p-9",
      className,
    )}
  >
    <div className="flex items-start justify-between">
      <span className="grid h-14 w-14 place-items-center rounded-md border border-line bg-ink-soft text-[22px] text-brand transition-all duration-700 ease-premium group-hover:border-primary/40 group-hover:shadow-[0_0_40px_-8px_rgba(0,240,168,0.45)]">
        <Icon name={service.icon} />
      </span>
      <span className="font-mono text-[12px] tracking-[0.2em] text-soft">{String(index + 1).padStart(2, "0")}</span>
    </div>
    <h3 className="mt-10 text-[26px] font-semibold uppercase leading-tight tracking-[-0.01em] sm:text-[28px]">{service.name}</h3>
    <p className="mt-4 flex-1 text-[16px] leading-relaxed text-soft">{service.card}</p>
    <span className="link-arrow mt-8 text-[15px]">
      Conhecer serviço <Icon name="arrow-right" />
    </span>
  </Link>
);
