import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Icon } from "@/components/system/Icon";
import { EASE } from "@/components/system/Reveal";
import { CHAMELEON_EYE, CHAMELEON_NODES, CHAMELEON_PATH, CHAMELEON_PIXELS, CHAMELEON_VIEWBOX } from "./chameleon-geometry";

const MODES = [
  { label: "Site institucional", icon: "window" },
  { label: "Landing page", icon: "graph-up-arrow" },
  { label: "E-commerce", icon: "cart" },
  { label: "Sistema", icon: "code-slash" },
] as const;

/** Pseudoaleatório determinístico (sem "pulos" entre renders). */
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const { w, h } = CHAMELEON_VIEWBOX;
const VB = `-40 -60 ${w + 80} ${h + 120}`;
const px = (x: number, y: number) => `M${x - 6} ${y - 6}h12v12h-12z`;

/*
 * Geometria pré-calculada uma única vez: os 317 pixels viram poucos <path>
 * (um por faixa de opacidade) em vez de um elemento por pixel — essencial
 * para o desempenho no celular.
 */
const PIXEL_LAYERS = [0.22, 0.42, 0.68].map((opacity, layer) => ({
  opacity,
  d: CHAMELEON_PIXELS.filter((_, i) => Math.min(2, Math.floor(rand(i) * 3)) === layer)
    .map(([x, y]) => px(x, y))
    .join(""),
}));

/** Pixels destacados de cada modo (o "camuflar"). */
const MODE_LAYERS = MODES.map((_, m) =>
  CHAMELEON_PIXELS.filter((_, i) => rand(i * (m + 2)) > 0.74)
    .map(([x, y]) => px(x, y))
    .join(""),
);

const NODES_D = CHAMELEON_NODES.filter((_, i) => i % 3 === 0)
  .map(([x, y]) => `M${x - 3.2} ${y}a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0`)
  .join("");

/* Posição do olho em % da caixa do SVG, para o pulso em HTML (camada composta). */
const EYE_LEFT = ((CHAMELEON_EYE[0] + 40) / (w + 80)) * 100;
const EYE_TOP = ((CHAMELEON_EYE[1] + 60) / (h + 120)) * 100;

/**
 * Camaleão digital — a silhueta oficial da marca se formando a partir de
 * pixels, nós e wireframe. Alterna entre os tipos de produto para expressar
 * a ideia central: adaptação.
 *
 * Performance: anima apenas opacity/transform/clip-path (compositor) e o
 * ciclo de modos pausa fora da tela ou com a aba oculta.
 */
export const HeroChameleon = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

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

  // Paralaxe leve com o cursor — apenas mouse (nunca no toque)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 60, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 60, damping: 20 });
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const current = MODES[mode];
  const anim = (value: string) => (reduce ? undefined : value);

  const base = useMemo(
    () => (
      <svg viewBox={VB} className="block h-auto w-full overflow-visible" role="img" aria-label="Silhueta de camaleão formada por pixels e linhas — símbolo da Camaly">
        <defs>
          <radialGradient id="hc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00F0A8" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#00F0A8" stopOpacity="0" />
          </radialGradient>
          <pattern id="hc-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="#F4F7F6" strokeOpacity="0.05" strokeWidth="1" />
          </pattern>
          <pattern id="hc-grid-in" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="#00F0A8" strokeOpacity="0.16" strokeWidth="1" />
          </pattern>
          <clipPath id="hc-clip">
            <path d={CHAMELEON_PATH} />
          </clipPath>
        </defs>
        <ellipse cx={w * 0.6} cy={h * 0.45} rx={w * 0.6} ry={h * 0.85} fill="url(#hc-glow)" />
        <rect x="-40" y="-60" width={w + 80} height={h + 120} fill="url(#hc-grid)" />
        <rect x="0" y="0" width={w} height={h} fill="url(#hc-grid-in)" clipPath="url(#hc-clip)" />
      </svg>
    ),
    [],
  );

  return (
    <div ref={rootRef} className={className} onPointerMove={onMove} onPointerLeave={() => (mx.set(0), my.set(0))}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} className="relative">
        {/* Chip de modo — o camaleão se adapta ao tipo de produto */}
        <div className="relative z-10 mb-2 flex justify-center sm:absolute sm:left-[8%] sm:top-[2%] sm:mb-0 sm:block">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/80 py-1.5 pl-1.5 pr-4 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-brand">
              <Icon name={current.icon} />
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-soft">
              Adaptando para{" "}
              <span className="relative inline-block min-w-[9.5em] text-foreground">
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

        <div className="relative">
          {/* Camada 1: brilho + grades (estática) */}
          {base}

          {/* Camada 2: pixels — revelados por clip-path numa única camada */}
          <svg
            viewBox={VB}
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            style={{ animation: anim("hc-sweep 1.6s var(--ease-out) 0.45s both") }}
          >
            {PIXEL_LAYERS.map((l) => (
              <path key={l.opacity} d={l.d} fill="#00F0A8" fillOpacity={l.opacity} />
            ))}
          </svg>

          {/* Camada 3: destaques por modo — troca apenas de opacidade */}
          {MODE_LAYERS.map((d, i) => (
            <svg
              key={i}
              viewBox={VB}
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible transition-opacity duration-[1200ms] ease-premium"
              style={{ opacity: i === mode ? 1 : 0 }}
            >
              <path d={d} fill={i % 2 ? "#3FD5E6" : "#7CF5C9"} fillOpacity="0.85" />
            </svg>
          ))}

          {/* Camada 4: contorno + nós + olho */}
          <svg viewBox={VB} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <path
              d={CHAMELEON_PATH}
              pathLength={1}
              fill="none"
              stroke="#00F0A8"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeOpacity="0.85"
              style={{ strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1, animation: anim("draw 2s var(--ease-out) 0.2s forwards") }}
            />
            <path d={NODES_D} fill="#050807" stroke="#00F0A8" strokeWidth="1.4" style={{ opacity: reduce ? 1 : 0, animation: anim("fade-in 0.8s ease-out 1.3s forwards") }} />
            <circle cx={CHAMELEON_EYE[0]} cy={CHAMELEON_EYE[1]} r="9" fill="none" stroke="#F4F7F6" strokeOpacity="0.9" strokeWidth="1.6" />
            <circle cx={CHAMELEON_EYE[0]} cy={CHAMELEON_EYE[1]} r="3" fill="#F4F7F6" />
          </svg>

          {/* Pulso do olho em HTML (transform + opacity = compositor) */}
          {!reduce && (
            <span aria-hidden className="pointer-events-none absolute aspect-square w-[2.2%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${EYE_LEFT}%`, top: `${EYE_TOP}%` }}>
              <span className="absolute inset-0 rounded-full border border-brand" style={{ animation: "eye-pulse 2.8s ease-out infinite" }} />
            </span>
          )}
        </div>

        <div className="absolute bottom-[4%] right-[2%] hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-soft sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-brand" />
          Adapt · Build · Evolve
        </div>
      </motion.div>
    </div>
  );
};
