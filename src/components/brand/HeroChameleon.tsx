import { lazy, Suspense, useEffect, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "@/components/system/Icon";
import { EASE } from "@/components/system/Reveal";
import { HeroChameleonDigital } from "./HeroChameleonDigital";

const HeroChameleon3D = lazy(() => import("./HeroChameleon3D").then((m) => ({ default: m.HeroChameleon3D })));

const MODES = [
  { label: "Site institucional", icon: "window" },
  { label: "Landing page", icon: "graph-up-arrow" },
  { label: "E-commerce", icon: "cart" },
  { label: "Sistema", icon: "code-slash" },
] as const;

function canUse3D() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  // Mobile / touch: silhueta digital (bem mais leve que WebGL + HDR)
  if (window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl") || c.getContext("experimental-webgl"));
  } catch {
    return false;
  }
}

/**
 * Hero: 3D realista no desktop; silhueta digital no mobile (performance).
 */
export const HeroChameleon = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState(0);
  const [use3d, setUse3d] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setUse3d(canUse3D());
    const onChange = () => setUse3d(canUse3D());
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse), (prefers-reduced-motion: reduce)");
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduce) return;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    if (rootRef.current) io.observe(rootRef.current);
    const t = window.setInterval(() => {
      if (visible && !document.hidden) setMode((m) => (m + 1) % MODES.length);
    }, 3200);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, [reduce]);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" && !use3d) return;
    const r = e.currentTarget.getBoundingClientRect();
    target.current = {
      x: ((e.clientX - r.left) / r.width) * 2 - 1,
      y: -(((e.clientY - r.top) / r.height) * 2 - 1),
    };
  };

  const current = MODES[mode];

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerMove={onMove}
      onPointerLeave={() => {
        target.current = { x: 0, y: 0 };
      }}
      role="img"
      aria-label={use3d ? "Camaleão 3D da Camaly que acompanha o cursor" : "Silhueta digital do camaleão Camaly"}
    >
      <div className="relative">
        <div className="relative z-10 mb-2 flex justify-center sm:absolute sm:left-[6%] sm:top-[2%] sm:z-20 sm:mb-0 sm:block">
          <div className="mx-auto flex w-full max-w-sm items-center gap-3 rounded-full border border-line bg-surface/95 py-1.5 pl-1.5 pr-4 shadow-[0_12px_36px_-16px_rgba(15,27,24,0.18)] sm:mx-0 sm:w-auto sm:max-w-none">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-brand">
              <Icon name={current.icon} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-soft sm:text-[11px]">
              Adaptando para{" "}
              <span className="relative inline-block min-w-0 text-foreground sm:min-w-[9.5em]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={current.label}
                    className="inline-block"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    {current.label}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </div>
        </div>

        <div className={use3d ? "relative aspect-[5/4] w-full sm:aspect-[4/3]" : "relative"}>
          {use3d ? (
            <Suspense fallback={<HeroChameleonDigital mode={mode} reduce={!!reduce} />}>
              <HeroChameleon3D className="absolute inset-0" target={target} />
            </Suspense>
          ) : (
            <HeroChameleonDigital mode={mode} reduce={!!reduce} />
          )}
        </div>

        <div className="absolute bottom-[3%] right-[2%] z-10 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-soft sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Adapt · Build · Evolve
        </div>
      </div>
    </div>
  );
};
