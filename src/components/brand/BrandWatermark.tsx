import { useId, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { CHAMELEON_PATH, CHAMELEON_VIEWBOX } from "./chameleon-geometry";

type Variant = "camaly" | "chameleon" | "wire" | "grid" | "words";
type Position = "center" | "left" | "right" | "top" | "bottom" | "top-right" | "bottom-right" | "bottom-left" | "top-left";

const POS: Record<Position, string> = {
  center: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  left: "left-0 top-1/2 -translate-y-1/2 -translate-x-[18%]",
  right: "right-0 top-1/2 -translate-y-1/2 translate-x-[18%]",
  top: "left-1/2 top-0 -translate-x-1/2",
  bottom: "left-1/2 bottom-0 -translate-x-1/2 translate-y-[12%]",
  "top-right": "right-0 top-0 translate-x-[12%] -translate-y-[8%]",
  "bottom-right": "right-0 bottom-0 translate-x-[10%] translate-y-[10%]",
  "bottom-left": "left-0 bottom-0 -translate-x-[10%] translate-y-[10%]",
  "top-left": "left-0 top-0 -translate-x-[10%] -translate-y-[8%]",
};

interface Props {
  variant?: Variant;
  position?: Position;
  /** 0.02 – 0.06 recomendado. */
  opacity?: number;
  /** Largura relativa ao container (1 = 100%). */
  scale?: number;
  text?: string;
  className?: string;
}

/** Marca d'água Camaly — sempre decorativa, nunca compete com o conteúdo. */
export const BrandWatermark = ({ variant = "camaly", position = "center", opacity = 0.04, scale = 1, text, className }: Props) => {
  const uid = useId().replace(/:/g, "");
  const style: CSSProperties = { opacity, width: `${scale * 100}%` };
  const base = cn("pointer-events-none select-none absolute z-0", POS[position], className);

  if (variant === "camaly" || variant === "words") {
    const label = text ?? (variant === "camaly" ? "CAMALY" : "ADAPT. BUILD. EVOLVE.");
    return (
      <div aria-hidden className={base} style={{ opacity }}>
        <svg
          viewBox={`0 0 ${label.length * 62} 100`}
          style={{ width: `${scale * 100}vw`, maxWidth: variant === "camaly" ? "1600px" : "1800px" }}
          className="block overflow-visible"
        >
          <text
            x="50%"
            y="82"
            textAnchor="middle"
            fill="none"
            stroke="#F4F7F6"
            strokeWidth="0.6"
            style={{ font: "600 100px var(--font-heading)", letterSpacing: "-0.04em" }}
          >
            {label}
          </text>
        </svg>
      </div>
    );
  }

  if (variant === "grid") {
    return <div aria-hidden className={cn(base, "inset-0 bg-grid mask-radial w-auto translate-x-0 translate-y-0")} style={{ opacity: opacity * 10 }} />;
  }

  const { w, h } = CHAMELEON_VIEWBOX;

  return (
    <div aria-hidden className={base} style={style}>
      <svg viewBox={`-20 -20 ${w + 40} ${h + 40}`} className="block w-full h-auto overflow-visible">
        <defs>
          <pattern id={`dots-${uid}`} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.6" fill="#F4F7F6" />
          </pattern>
        </defs>
        {variant === "chameleon" ? (
          <>
            <path d={CHAMELEON_PATH} fill={`url(#dots-${uid})`} />
            <path d={CHAMELEON_PATH} fill="none" stroke="#F4F7F6" strokeWidth="1.5" strokeLinejoin="round" />
          </>
        ) : (
          // WIRE — contornos concêntricos, como curvas de nível
          [1, 0.9, 0.8, 0.7, 0.6, 0.5].map((s, i) => (
            <path
              key={s}
              d={CHAMELEON_PATH}
              fill="none"
              stroke="#F4F7F6"
              strokeWidth={1.4 / s}
              strokeLinejoin="round"
              opacity={1 - i * 0.13}
              transform={`translate(${(w * (1 - s)) / 2} ${(h * (1 - s)) / 2}) scale(${s})`}
            />
          ))
        )}
      </svg>
    </div>
  );
};
