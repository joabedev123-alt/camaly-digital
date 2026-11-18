import { useMemo } from "react";
import { CHAMELEON_EYE, CHAMELEON_NODES, CHAMELEON_PATH, CHAMELEON_PIXELS, CHAMELEON_VIEWBOX } from "./chameleon-geometry";

const rand = (i: number) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const { w, h } = CHAMELEON_VIEWBOX;
const VB = `-40 -60 ${w + 80} ${h + 120}`;
const px = (x: number, y: number) => `M${x - 6} ${y - 6}h12v12h-12z`;

const PIXEL_LAYERS = [0.22, 0.42, 0.68].map((opacity, layer) => ({
  opacity,
  d: CHAMELEON_PIXELS.filter((_, i) => Math.min(2, Math.floor(rand(i) * 3)) === layer)
    .map(([x, y]) => px(x, y))
    .join(""),
}));

const MODE_LAYERS = [0, 1, 2, 3].map((m) =>
  CHAMELEON_PIXELS.filter((_, i) => rand(i * (m + 2)) > 0.74)
    .map(([x, y]) => px(x, y))
    .join(""),
);

const NODES_D = CHAMELEON_NODES.filter((_, i) => i % 3 === 0)
  .map(([x, y]) => `M${x - 3.2} ${y}a3.2 3.2 0 1 0 6.4 0a3.2 3.2 0 1 0 -6.4 0`)
  .join("");

const EYE_LEFT = ((CHAMELEON_EYE[0] + 40) / (w + 80)) * 100;
const EYE_TOP = ((CHAMELEON_EYE[1] + 60) / (h + 120)) * 100;

/** Fallback 2D (silhueta digital) — reduced motion / WebGL indisponível. */
export const HeroChameleonDigital = ({ mode = 0, reduce = false }: { mode?: number; reduce?: boolean }) => {
  const anim = (value: string) => (reduce ? undefined : value);
  const base = useMemo(
    () => (
      <svg viewBox={VB} className="block h-auto w-full overflow-visible" role="img" aria-label="Silhueta de camaleão formada por pixels e linhas — símbolo da Camaly">
        <defs>
          <radialGradient id="hc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00C48A" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#00C48A" stopOpacity="0" />
          </radialGradient>
          <pattern id="hc-grid" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="#0B1614" strokeOpacity="0.06" strokeWidth="1" />
          </pattern>
          <pattern id="hc-grid-in" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M22 0H0V22" fill="none" stroke="#00C48A" strokeOpacity="0.2" strokeWidth="1" />
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
    <div className="relative">
      {base}
      <svg viewBox={VB} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" style={{ animation: anim("hc-sweep 1.6s var(--ease-out) 0.45s both") }}>
        {PIXEL_LAYERS.map((l) => (
          <path key={l.opacity} d={l.d} fill="#00C48A" fillOpacity={l.opacity} />
        ))}
      </svg>
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
      <svg viewBox={VB} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <path
          d={CHAMELEON_PATH}
          pathLength={1}
          fill="none"
          stroke="#00C48A"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeOpacity="0.85"
          style={{ strokeDasharray: 1, strokeDashoffset: reduce ? 0 : 1, animation: anim("draw 2s var(--ease-out) 0.2s forwards") }}
        />
        <path d={NODES_D} fill="var(--color-bg)" stroke="#00C48A" strokeWidth="1.4" style={{ opacity: reduce ? 1 : 0, animation: anim("fade-in 0.8s ease-out 1.3s forwards") }} />
        <circle cx={CHAMELEON_EYE[0]} cy={CHAMELEON_EYE[1]} r="9" fill="none" stroke="#0F1B18" strokeOpacity="0.85" strokeWidth="1.6" />
        <circle cx={CHAMELEON_EYE[0]} cy={CHAMELEON_EYE[1]} r="3" fill="#0F1B18" />
      </svg>
      {!reduce && (
        <span aria-hidden className="pointer-events-none absolute aspect-square w-[2.2%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${EYE_LEFT}%`, top: `${EYE_TOP}%` }}>
          <span className="absolute inset-0 rounded-full border border-brand" style={{ animation: "eye-pulse 2.8s ease-out infinite" }} />
        </span>
      )}
    </div>
  );
};
