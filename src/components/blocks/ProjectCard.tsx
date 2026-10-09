import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/system/Icon";
import { CATEGORY_LABEL, type Project } from "@/data/projects";

/** Card do portfólio: imagem 16:10, overlay escuro e "View project" no hover. */
export const ProjectCard = ({ project, className, priority, compact }: { project: Project; className?: string; priority?: boolean; compact?: boolean }) => (
  <Link to={`/portfolio/${project.slug}`} className={cn("group block", className)} aria-label={`${project.name} — ver case`}>
    <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-line bg-surface">
      <img
        src={project.cover.srcSm}
        srcSet={`${project.cover.srcSm} 800w, ${project.cover.src} 1600w`}
        sizes="(min-width: 1024px) 50vw, 100vw"
        alt={`${project.name} — ${project.type}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.02]"
      />
      <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 ease-premium group-hover:bg-ink/55" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="flex translate-y-3 items-center gap-2 rounded-full border border-white/20 bg-ink/70 px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.18em] opacity-0 backdrop-blur transition-all duration-700 ease-premium group-hover:translate-y-0 group-hover:opacity-100">
          View project <Icon name="arrow-up-right" />
        </span>
      </div>
      <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/90 backdrop-blur">
        {CATEGORY_LABEL[project.category]}
      </span>
    </div>
    <div className="mt-5 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-[22px] font-semibold tracking-tight transition-colors group-hover:text-brand">{project.name}</h3>
        <p className="mt-1 text-[15px] text-soft">
          {project.industry}
          {project.market !== "Brasil" && <> · {project.market}</>}
        </p>
      </div>
      {!compact && <p className="hidden pt-1.5 text-right text-[13px] text-soft sm:block">{project.services.slice(0, 3).join(" • ")}</p>}
    </div>
  </Link>
);
