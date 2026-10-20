import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import { EASE } from "@/components/system/Reveal";
import { CATEGORY_FILTERS, INDUSTRIES, PROJECTS, type ProjectCategory } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

const PAGE = 8;

/**
 * Grade do portfólio com filtros por tipo e segmento + "carregar mais".
 * O estado fica na URL (?tipo=&segmento=&n=) — links compartilháveis e
 * navegação de volta preservada. Escala para centenas de projetos.
 */
export const ProjectGrid = () => {
  const [params, setParams] = useSearchParams();
  const tipo = (params.get("tipo") ?? "todos") as ProjectCategory | "todos";
  const segmento = params.get("segmento") ?? "";
  const shown = Math.max(PAGE, Number(params.get("n")) || PAGE);

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) => (tipo === "todos" || p.category === tipo) && (!segmento || p.industry === segmento)),
    [tipo, segmento],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { todos: PROJECTS.length };
    PROJECTS.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, []);

  const update = (next: Record<string, string | null>) => {
    const p = new URLSearchParams(params);
    Object.entries(next).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    setParams(p, { replace: true, preventScrollReset: true });
  };

  const visible = filtered.slice(0, shown);

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-line pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filtrar por tipo de projeto" className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-[var(--gutter)] scrollbar-hide lg:mx-0 lg:snap-none lg:overflow-visible lg:px-0">
          {CATEGORY_FILTERS.map((f) => {
            const active = tipo === f.id;
            const n = counts[f.id] ?? 0;
            if (f.id !== "todos" && !n) return null;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => update({ tipo: f.id === "todos" ? null : f.id, n: null })}
                className={cn(
                  "flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors duration-300",
                  active ? "border-brand bg-brand text-ink" : "border-line text-soft hover:border-white/20 hover:text-foreground",
                )}
              >
                {f.label}
                <span className={cn("tabular text-[12px]", active ? "text-ink/60" : "text-soft/60")}>{n}</span>
              </button>
            );
          })}
        </div>

        <label className="relative flex items-center">
          <span className="sr-only">Filtrar por segmento</span>
          <Icon name="funnel" className="pointer-events-none absolute left-4 text-soft" />
          <select
            value={segmento}
            onChange={(e) => update({ segmento: e.target.value || null, n: null })}
            className="field min-h-[44px] w-full appearance-none rounded-full py-2 pl-10 pr-10 text-[14px] lg:w-64"
          >
            <option value="">Todos os segmentos</option>
            {INDUSTRIES.slice().sort().map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
          <Icon name="chevron-down" className="pointer-events-none absolute right-4 text-xs text-soft" />
        </label>
      </div>

      <p className="mt-6 text-[14px] text-soft" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "projeto" : "projetos"}
      </p>

      <motion.ul layout className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p, i) => (
            <motion.li
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % PAGE) * 0.04 }}
            >
              <ProjectCard project={p} priority={i < 2} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-soft">
          Nenhum projeto com esses filtros.{" "}
          <button type="button" className="text-brand underline-offset-4 hover:underline" onClick={() => update({ tipo: null, segmento: null, n: null })}>
            Limpar filtros
          </button>
        </div>
      )}

      {visible.length < filtered.length && (
        <div className="mt-16 flex flex-col items-center gap-4">
          <div className="h-px w-40 overflow-hidden rounded bg-line">
            <div className="h-full bg-brand" style={{ width: `${(visible.length / filtered.length) * 100}%` }} />
          </div>
          <p className="text-[13px] text-soft">
            {visible.length} de {filtered.length}
          </p>
          <button type="button" className="btn btn-ghost" onClick={() => update({ n: String(shown + PAGE) })}>
            Carregar mais projetos <Icon name="arrow-down" />
          </button>
        </div>
      )}
    </div>
  );
};
