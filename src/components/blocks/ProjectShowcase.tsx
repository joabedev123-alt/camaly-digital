import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import { Reveal } from "@/components/system/Reveal";
import { CATEGORY_LABEL, type Project } from "@/data/projects";
import { DeviceMockup } from "./DeviceMockup";

/**
 * Projeto em destaque, grande. Layouts alternados:
 * imagem à esquerda, à direita ou largura total.
 */
export const ProjectShowcase = ({ project, index, layout }: { project: Project; index: number; layout: "left" | "right" | "full" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const still = reduce || (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches);
  const y = useTransform(scrollYProgress, [0, 1], still ? [0, 0] : [40, -40]);

  const media = (
    <motion.div style={{ y }} className="relative">
      <Link to={`/portfolio/${project.slug}`} className="group block overflow-hidden rounded-xl border border-line" tabIndex={-1} aria-hidden>
        <DeviceMockup image={project.cover} alt="" url={project.url} composition={project.composition} />
        <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink/70 text-lg opacity-0 backdrop-blur transition-all duration-700 ease-premium group-hover:opacity-100 group-hover:rotate-45">
          <Icon name="arrow-up-right" />
        </span>
      </Link>
    </motion.div>
  );

  const info = (
    <Reveal className={cn("flex flex-col", layout === "full" ? "lg:flex-row lg:items-end lg:justify-between gap-8" : "justify-center")}>
      <div>
        <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-soft">
          Camaly / Project {String(index + 1).padStart(2, "0")}
        </p>
        <h3 className="mt-5 text-[clamp(32px,4.2vw,56px)] font-semibold leading-[1.02] tracking-[-0.04em]">{project.name}</h3>
        <p className="mt-3 text-[17px] text-brand">{project.type}</p>
        <p className="mt-5 max-w-md text-[17px] leading-relaxed text-soft">{project.summary}</p>
      </div>
      <div className={cn(layout !== "full" && "mt-8")}>
        <p className="text-[13px] uppercase tracking-[0.16em] text-soft/80">{project.services.join(" • ")}</p>
        <Link to={`/portfolio/${project.slug}`} className="btn btn-ghost mt-6">
          Ver case <Icon name="arrow-up-right" />
        </Link>
      </div>
    </Reveal>
  );

  if (layout === "full") {
    return (
      <article ref={ref} aria-label={`${project.name} — ${CATEGORY_LABEL[project.category]}`} className="space-y-10">
        {media}
        {info}
      </article>
    );
  }

  return (
    <article
      ref={ref}
      aria-label={`${project.name} — ${CATEGORY_LABEL[project.category]}`}
      className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
    >
      <div className={cn("lg:col-span-8", layout === "right" && "lg:order-2")}>{media}</div>
      <div className={cn("lg:col-span-4", layout === "right" && "lg:order-1")}>{info}</div>
    </article>
  );
};
