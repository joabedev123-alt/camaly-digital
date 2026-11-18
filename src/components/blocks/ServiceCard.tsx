import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import type { Service } from "@/data/services";

export const ServiceCard = ({ service, index, className }: { service: Service; index: number; className?: string }) => (
  <Link
    to={`/servicos/${service.slug}`}
    className={cn(
      "group spotlight relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-5 shadow-[0_18px_40px_-32px_rgba(15,27,24,0.18)] transition-colors duration-500 hover:border-brand/35 active:scale-[0.995] sm:p-7 md:p-9",
      className,
    )}
  >
    <div className="flex items-start justify-between">
      <span className="grid h-12 w-12 place-items-center rounded-md border border-line bg-ink-soft text-[20px] text-brand transition-all duration-700 ease-premium group-hover:border-primary/40 group-hover:shadow-[0_0_40px_-8px_rgba(0,184,127,0.4)] sm:h-14 sm:w-14 sm:text-[22px]">
        <Icon name={service.icon} />
      </span>
      <span className="font-mono text-[12px] tracking-[0.2em] text-soft">{String(index + 1).padStart(2, "0")}</span>
    </div>
    <h3 className="mt-7 text-[22px] font-semibold uppercase leading-tight tracking-[-0.01em] sm:mt-10 sm:text-[26px] md:text-[28px]">{service.name}</h3>
    <p className="mt-3 flex-1 text-[15px] leading-relaxed text-soft sm:mt-4 sm:text-[16px]">{service.card}</p>
    <span className="link-arrow mt-6 text-[14px] sm:mt-8 sm:text-[15px]">
      Conhecer serviço <Icon name="arrow-right" />
    </span>
  </Link>
);
