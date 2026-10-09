import { Counter, Reveal } from "@/components/system/Reveal";
import { METRICS } from "@/config/site";

/** Métricas em tipografia gigante. */
export const Metrics = () => (
  <dl className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
    {METRICS.map((m, i) => (
      <Reveal
        key={m.label}
        delay={i * 0.08}
        className="flex flex-col border-b border-line py-10 sm:px-0 sm:odd:pr-8 sm:even:border-l sm:even:pl-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
      >
        <dd className="order-1 text-[clamp(64px,8vw,120px)] font-semibold leading-[0.9] tracking-[-0.06em]">
          <Counter value={m.value} suffix={m.suffix} />
        </dd>
        <dt className="order-2 mt-6 text-[17px] font-medium">{m.label}</dt>
        <dd className="order-3 mt-1 text-[15px] text-soft">{m.detail}</dd>
      </Reveal>
    ))}
  </dl>
);
