import { Counter, Reveal } from "@/components/system/Reveal";
import { METRICS } from "@/config/site";

/** Métricas em tipografia gigante. */
export const Metrics = () => (
  <dl className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
    {METRICS.map((m, i) => (
      <Reveal
        key={m.label}
        delay={i * 0.08}
        className="flex flex-col border-b border-line py-8 odd:pr-4 even:border-l even:pl-4 sm:py-10 sm:odd:pr-8 sm:even:pl-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
      >
        <dd className="order-1 text-[clamp(40px,11vw,120px)] font-semibold leading-[0.9] tracking-[-0.06em]">
          <Counter value={m.value} suffix={m.suffix} />
        </dd>
        <dt className="order-2 mt-4 break-words text-[15px] font-medium text-pretty sm:mt-6 sm:text-[17px]">{m.label}</dt>
        <dd className="order-3 mt-1 break-words text-[13px] text-soft text-pretty sm:text-[15px]">{m.detail}</dd>
      </Reveal>
    ))}
  </dl>
);
