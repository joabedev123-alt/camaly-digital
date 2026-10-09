import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Icon } from "@/components/system/Icon";
import { Reveal } from "@/components/system/Reveal";
import type { ProcessPhase } from "@/data/content";

/** Linha do tempo horizontal (desktop) / vertical (mobile) — versão resumida. */
export const ProcessTimeline = ({ steps }: { steps: ProcessPhase[] }) => (
  <ol className="relative grid gap-0 md:grid-cols-3 lg:grid-cols-6">
    {steps.map((s, i) => (
      <Reveal as="li" key={s.n} delay={i * 0.07} className="group relative border-l border-line pb-10 pl-8 md:border-l-0 md:border-t md:pb-0 md:pl-0 md:pr-6 md:pt-8">
        <span className="absolute -left-[5px] top-1 h-[9px] w-[9px] rounded-full border border-brand bg-ink transition-colors duration-500 group-hover:bg-brand md:-top-[5px] md:left-0" />
        <span className="font-mono text-[12px] tracking-[0.2em] text-brand">{s.n}</span>
        <h3 className="mt-3 text-[19px] font-semibold uppercase tracking-tight">{s.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-soft">{s.short}</p>
      </Reveal>
    ))}
  </ol>
);

/** Processo detalhado em fases — com progresso vinculado ao scroll. */
export const ProcessPhases = ({ phases }: { phases: ProcessPhase[] }) => {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 30 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute left-[27px] top-2 bottom-2 w-px bg-line md:left-[39px]" />
      <motion.span aria-hidden style={{ scaleY }} className="absolute left-[27px] top-2 bottom-2 w-px origin-top bg-brand md:left-[39px]" />
      {phases.map((p, i) => (
        <li key={p.n} className="relative grid gap-6 pb-16 pl-20 md:grid-cols-12 md:gap-12 md:pb-24 md:pl-28 last:pb-0">
          <span className="absolute left-0 top-0 grid h-14 w-14 place-items-center rounded-full border border-line bg-ink text-xl text-brand md:h-20 md:w-20 md:text-2xl">
            <Icon name={p.icon} />
          </span>
          <Reveal className="md:col-span-7">
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-soft">Fase {p.n}</p>
            <h3 className="mt-3 flex items-baseline gap-4 text-[clamp(30px,3.6vw,48px)] font-semibold uppercase leading-none tracking-[-0.03em]">
              {p.title}
            </h3>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-soft">{p.text}</p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-5">
            <div className="surface relative overflow-hidden p-6">
              <span aria-hidden className="pointer-events-none absolute -right-3 -top-8 select-none text-[120px] font-semibold leading-none tracking-[-0.06em] text-white/[0.04]">
                {p.n}
              </span>
              <p className="text-[12px] uppercase tracking-[0.2em] text-soft">Nesta fase</p>
              <ul className="mt-4 space-y-3">
                {p.outputs.map((o) => (
                  <li key={o} className="flex items-center gap-3 text-[15.5px]">
                    <Icon name="check2" className="text-brand" /> {o}
                  </li>
                ))}
              </ul>
              {/* Pequena representação visual: barra de progresso da fase */}
              <div className="mt-6 flex gap-1" aria-hidden>
                {phases.map((_, j) => (
                  <span key={j} className={`h-1 flex-1 rounded-full ${j <= i ? "bg-brand" : "bg-white/10"}`} />
                ))}
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
};
