import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";
import { Children, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/** Revela o conteúdo ao entrar na viewport. */
export const Reveal = ({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "header" | "p" | "span";
}) => {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </M>
  );
};

/** Container que revela os filhos em sequência. */
export const Stagger = ({
  children,
  className,
  gap = 0.08,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  as?: "div" | "ul" | "ol";
}) => {
  const M = motion[as] as typeof motion.div;
  return (
    <M
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </M>
  );
};

export const StaggerItem = ({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) => {
  const M = motion[as] as typeof motion.div;
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  );
};

/**
 * Título com revelação por linha (máscara). Cada filho direto vira uma linha.
 * Use <Line> ou strings separadas.
 */
export const LineReveal = ({
  children,
  as: Tag = "h2",
  className,
  delay = 0,
  immediate = false,
  fluid = false,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Anima no carregamento (hero) em vez de ao entrar na viewport. */
  immediate?: boolean;
  /** No mobile o texto flui naturalmente (sem quebra forçada por linha). */
  fluid?: boolean;
}) => {
  const lines = Children.toArray(children);
  const reduce = useReducedMotion();
  // O gatilho fica no elemento pai: as linhas começam fora da máscara
  // (overflow-hidden) e o IntersectionObserver nunca as veria.
  const M = (motion as unknown as Record<string, typeof motion.div>)[Tag as string] ?? motion.div;
  return (
    <M
      className={className}
      initial={reduce ? false : "hidden"}
      {...(immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -8% 0px" } })}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn(fluid ? "inline sm:block sm:overflow-hidden" : "block overflow-hidden", "pb-[0.08em] -mb-[0.08em]")}>
          <motion.span
            className={cn(fluid ? "inline sm:block" : "block")}
            variants={{
              hidden: { y: "105%", opacity: fluid ? 0 : 1 },
              show: { y: "0%", opacity: 1, transition: { duration: 1, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
          {fluid && i < lines.length - 1 && <span className="sm:hidden"> </span>}
        </span>
      ))}
    </M>
  );
};

/** Revela imagens com uma cortina suave. */
export const ImageReveal = ({ children, className }: { children: ReactNode; className?: string }) => (
  <motion.div
    className={cn("overflow-hidden", className)}
    initial={{ clipPath: "inset(12% 6% 12% 6% round 24px)", opacity: 0.4 }}
    whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", opacity: 1 }}
    viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    transition={{ duration: 1.2, ease: EASE }}
  >
    {children}
  </motion.div>
);

/** Contador animado ao entrar na viewport. */
export const Counter = ({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round((1 - Math.pow(1 - p, 4)) * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
      <span aria-hidden>
        {n}
        {suffix}
      </span>
    </span>
  );
};
