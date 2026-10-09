import { useEffect, useMemo, useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Icon } from "@/components/system/Icon";
import { EASE } from "@/components/system/Reveal";
import { CHAMELEON_EYE, CHAMELEON_NODES, CHAMELEON_PATH, CHAMELEON_PIXELS, CHAMELEON_VIEWBOX } from "./chameleon-geometry";

const MODES = [
  { label: "Site institucional", icon: "window", hue: "#00F0A8" },
  { label: "Landing page", icon: "graph-up-arrow", hue: "#3FD5E6" },
  { label: "E-commerce", icon: "cart", hue: "#7CF5C9" },
  { label: "Sistema", icon: "code-slash", hue: "#00F0A8" },
] as const;

/** Pseudoaleatório determinístico (sem "pulos" entre renders). */
const rand = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/**
 * Camaleão digital — a silhueta oficial da marca se formando a partir de
 * pixels, nós e wireframe. Alterna entre os tipos de produto para expressar
 * a ideia central: adaptação.
 */
export const HeroChameleon = ({ className }: { className?: string }) => {
  const reduce = useReducedMotion();
  const [mode, setMode] = useState(0);
  const { w, h } = CHAMELEON_VIEWBOX;

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setMode((m) => (m + 1) % MODES.length), 3200);
    return () => clearInterval(t);
  }, [reduce]);

  // Paralaxe muito leve com o cursor
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

  const pixels = useMemo(
    () =>
      CHAMELEON_PIXELS.map(([x, y], i) => ({
        x,
        y,
        o: 0.18 + rand(i) * 0.6,
        delay: 0.5 + (1 - x / w) * 1.1 + rand(i + 7) * 0.35,
        twinkle: rand(i + 3) > 0.82,
      })),
    [w],
  );

  // Pixels que mudam de tom a cada modo (o "camuflar")
  const shifted = useMemo(() => new Set(pixels.map((_, i) => i).filter((i) => rand(i * (mode + 2)) > 0.72)), [pixels, mode]);
  const current = MODES[mode];

  return (
    <div className={className} onPointerMove={onMove} onPointerLeave={() => (mx.set(0), my.set(0))}>
      <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 1200 }} className="relative">
        {/* Chip de modo — o camaleão se adapta ao tipo de produto */}
        <div className="relative mb-2 flex justify-center sm:absolute sm:left-[8%] sm:top-[2%] sm:mb-0 sm:block">
          <div className="flex items-center gap-3 rounded-full border border-white/10 bg-ink/70 backdrop-blur-md pl-1.5 pr-4 py-1.5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/10 text-brand">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={current.icon} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.35, ease: EASE }}>
                  <Icon name={current.icon} />
                </motion.span>
              </AnimatePresence>
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

        <svg viewBox={`-40 -60 ${w + 80} ${h + 120}`} className="block w-full h-auto overflow-visible" role="img" aria-label="Silhueta de camaleão formada por pixels e linhas — símbolo da Camaly">
          <defs>
            <radialGradient id="hc-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00F0A8" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#00F0A8" stopOpacity="0" />
            </radialGradient>
            <pattern id="hc-grid" width="22" height="22" patternUnits="userSpaceOnUse" x="0" y="0">
              <path d="M22 0H0V22" fill="none" stroke="#F4F7F6" strokeOpacity="0.05" strokeWidth="1" />
            </pattern>
            <pattern id="hc-grid-in" width="22" height="22" patternUnits="userSpaceOnUse" x="0" y="0">
              <path d="M22 0H0V22" fill="none" stroke="#00F0A8" strokeOpacity="0.16" strokeWidth="1" />
            </pattern>
            <clipPath id="hc-clip">
              <path d={CHAMELEON_PATH} />
            </clipPath>
          </defs>

          <ellipse cx={w * 0.6} cy={h * 0.45} rx={w * 0.6} ry={h * 0.85} fill="url(#hc-glow)" />
          <rect x="-40" y="-60" width={w + 80} height={h + 120} fill="url(#hc-grid)" />

          {/* Grade interna (wireframe) */}
          <g clipPath="url(#hc-clip)">
            <rect x="0" y="0" width={w} height={h} fill="url(#hc-grid-in)" />
          </g>

          {/* Pixels */}
          <g>
            {pixels.map((p, i) => (
              <rect
                key={i}
                x={p.x - 6}
                y={p.y - 6}
                width="12"
                height="12"
                rx="2"
                fill={shifted.has(i) ? current.hue : "#00F0A8"}
                style={{
                  ["--o" as string]: shifted.has(i) ? Math.min(p.o + 0.25, 0.95) : p.o,
                  opacity: reduce ? p.o : 0,
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  transition: "fill 1.2s var(--ease-out)",
                  animation: reduce
                    ? undefined
                    : `pixel-in 0.9s var(--ease-out) ${p.delay}s forwards${p.twinkle ? `, twinkle 3.6s ease-in-out ${p.delay + 1.2}s infinite` : ""}`,
                }}
              />
            ))}
          </g>

          {/* Contorno */}
          <path
            d={CHAMELEON_PATH}
            pathLength={1}
            fill="none"
            stroke="#00F0A8"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeOpacity="0.85"
            style={{ strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1, animation: reduce ? undefined : "draw 2.4s var(--ease-out) 0.2s forwards" }}
          />

          {/* Nós */}
          {CHAMELEON_NODES.map(([x, y], i) =>
            i % 3 === 0 ? (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3.2"
                fill="#050807"
                stroke="#00F0A8"
                strokeWidth="1.4"
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 1.2 + i * 0.025 }}
              />
            ) : null,
          )}

          {/* Olho */}
          <circle cx={CHAMELEON_EYE[0]} cy={CHAMELEON_EYE[1]} r="9" fill="none" stroke="#F4F7F6" strokeOpacity="0.9" strokeWidth="1.6" />
          <circle cx={CHAMELEON_EYE[0]} cy={CHAMELEON_EYE[1]} r="3" fill="#F4F7F6" />
          {!reduce && (
            <circle cx={CHAMELEON_EYE[0]} cy={CHAMELEON_EYE[1]} r="9" fill="none" stroke="#00F0A8" strokeWidth="1">
              <animate attributeName="r" values="9;26" dur="2.8s" repeatCount="indefinite" />
              <animate attributeName="stroke-opacity" values="0.7;0" dur="2.8s" repeatCount="indefinite" />
            </circle>
          )}

          {/* Linha de "leitura" (scan) */}
          {!reduce && (
            <g clipPath="url(#hc-clip)">
              <rect x="0" y="0" width="80" height={h} fill="url(#hc-glow)" style={{ animation: "scan 5.5s var(--ease-out) 2.6s infinite" }} />
            </g>
          )}
        </svg>

        <div className="absolute right-[2%] bottom-[4%] hidden sm:flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-soft/70">
          <span className="h-1.5 w-1.5 rounded-full bg-brand animate-pulse" />
          Adapt · Build · Evolve
        </div>
      </motion.div>
    </div>
  );
};
