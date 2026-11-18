import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import { Eyebrow } from "@/components/system/Section";
import { LineReveal, Reveal, EASE } from "@/components/system/Reveal";
import { ButtonLink } from "@/components/system/Button";
import {
  CATEGORY_FILTERS,
  CATEGORY_LABEL,
  PROJECTS,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

type FilterId = ProjectCategory | "todos";

const LIMIT_DESKTOP: Record<FilterId, number> = {
  todos: 6,
  sites: 6,
  "landing-pages": 6,
  ecommerce: 4,
  sistemas: 4,
  plataformas: 4,
};

const LIMIT_MOBILE: Record<FilterId, number> = {
  todos: 4,
  sites: 4,
  "landing-pages": 4,
  ecommerce: 4,
  sistemas: 4,
  plataformas: 4,
};

function pickForHome(list: Project[], limit: number) {
  return [...list].sort((a, b) => Number(!!b.featured) - Number(!!a.featured)).slice(0, limit);
}

const tileClass = (i: number, total: number, mobile: boolean) => {
  if (mobile) {
    if (total === 1) return "col-span-2 row-span-2";
    if (total === 3 && i === 0) return "col-span-2 row-span-1";
    return "col-span-1 row-span-1";
  }
  if (total === 1) return "col-span-3 row-span-2";
  if (total === 2) return "col-span-1 row-span-2";
  if (total === 3) return i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
  if (total === 4) return "col-span-1 row-span-1 sm:col-span-1";
  if (total === 5) return i === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1";
  // 6: mosaico 3×2
  return "col-span-1 row-span-1";
};

const ProjectTile = ({ project, className, large }: { project: Project; className?: string; large?: boolean }) => (
  <Link
    to={`/portfolio/${project.slug}`}
    className={cn(
      "group relative min-h-0 overflow-hidden rounded-xl border border-line bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
      className,
    )}
  >
    <img
      src={project.cover.srcSm}
      srcSet={`${project.cover.srcSm} 800w, ${project.cover.src} 1600w`}
      sizes={large ? "(min-width: 1024px) 55vw, 100vw" : "(min-width: 1024px) 30vw, 50vw"}
      alt=""
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-[center_12%] transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 transition-opacity duration-500" />
    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4 lg:p-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/75 sm:text-[11px]">
        {CATEGORY_LABEL[project.category]}
        {project.industry ? ` · ${project.industry}` : ""}
      </p>
      <h3
        className={cn(
          "mt-1 font-semibold tracking-tight text-white",
          large ? "text-[20px] sm:text-[24px] lg:text-[28px]" : "text-[15px] sm:text-[17px] lg:text-[18px]",
        )}
      >
        {project.name}
      </h3>
      <span className="mt-2 inline-flex translate-y-1 items-center gap-1.5 text-[12px] font-medium text-white/0 transition-all duration-500 group-hover:translate-y-0 group-hover:text-white/90">
        Ver projeto <Icon name="arrow-up-right" />
      </span>
    </div>
  </Link>
);

export const HomeProjects = () => {
  const [tipo, setTipo] = useState<FilterId>("todos");
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = { todos: PROJECTS.length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const visible = useMemo(() => {
    const base = tipo === "todos" ? PROJECTS : PROJECTS.filter((p) => p.category === tipo);
    const limit = mobile ? LIMIT_MOBILE[tipo] : LIMIT_DESKTOP[tipo];
    return pickForHome(base, Math.min(limit, base.length));
  }, [tipo, mobile]);

  const cols = mobile ? "grid-cols-2" : visible.length <= 4 ? "grid-cols-2" : "grid-cols-3";

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <Eyebrow>Selected work</Eyebrow>
          </Reveal>
          <LineReveal as="h2" className="display-2 mt-6">
            <span id="work-title">Projetos que falam por nós.</span>
          </LineReveal>
          <Reveal delay={0.12}>
            <p className="lead mt-5 max-w-xl">
              Sites, lojas, landing pages e plataformas desenvolvidos para negócios de diferentes mercados.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="hidden lg:col-span-5 lg:block lg:justify-self-end">
          <ButtonLink to="/portfolio" variant="ghost" icon="arrow-up-right">
            Ver todos os projetos
          </ButtonLink>
        </Reveal>
      </div>

      <div
        role="tablist"
        aria-label="Filtrar projetos por tipo"
        className="-mx-[var(--gutter)] mt-10 flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-[var(--gutter)] pb-1 scrollbar-hide lg:mx-0 lg:mt-12 lg:flex-wrap lg:overflow-visible lg:px-0"
      >
        {CATEGORY_FILTERS.map((f) => {
          const n = counts[f.id] ?? 0;
          if (f.id !== "todos" && !n) return null;
          const active = tipo === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTipo(f.id)}
              className={cn(
                "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] font-medium transition-all duration-300",
                active
                  ? "border-brand bg-brand text-onbrand shadow-[0_10px_28px_-14px_rgba(0,196,138,0.55)]"
                  : "border-line bg-surface/70 text-soft hover:border-foreground/25 hover:text-foreground",
              )}
            >
              {f.label}
              <span className={cn("tabular text-[12px]", active ? "text-onbrand/70" : "text-soft/60")}>{n}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 lg:mt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tipo}-${mobile ? "m" : "d"}-${visible.length}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative h-[min(58vh,480px)] overflow-hidden rounded-2xl border border-line bg-ink-soft/80 p-1.5 shadow-[0_24px_60px_-40px_rgba(15,27,24,0.45)] sm:h-[min(66vh,620px)] sm:p-2.5 lg:h-[min(62vh,600px)]"
          >
            <div className={cn("grid h-full gap-2 sm:gap-2.5", cols)} style={{ gridAutoRows: "minmax(0, 1fr)" }}>
              {visible.map((p, i) => (
                <ProjectTile
                  key={p.slug}
                  project={p}
                  large={i === 0 && visible.length <= 5}
                  className={tileClass(i, visible.length, mobile)}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <Reveal className="mt-5 flex flex-wrap items-center justify-between gap-3 text-[13px] text-soft sm:text-[14px]">
          <p aria-live="polite">
            Mostrando <span className="font-medium text-foreground">{visible.length}</span>
            {tipo === "todos" ? " projetos em destaque" : ` em ${CATEGORY_FILTERS.find((f) => f.id === tipo)?.label}`}
            {" · "}
            <span className="text-soft">{counts[tipo]} no portfólio</span>
          </p>
          <Link to={tipo === "todos" ? "/portfolio" : `/portfolio?tipo=${tipo}`} className="link-arrow text-[14px]">
            Ver categoria completa <Icon name="arrow-up-right" />
          </Link>
        </Reveal>
      </div>

      <Reveal className="mt-12 flex justify-center lg:mt-14">
        <ButtonLink to="/portfolio" size="lg" icon="arrow-up-right">
          Ver todos os projetos
        </ButtonLink>
      </Reveal>
    </div>
  );
};
