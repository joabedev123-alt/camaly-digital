import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/system/Icon";
import { Reveal } from "@/components/system/Reveal";
import { cn } from "@/lib/utils";
import { VIDEO_TESTIMONIALS, type VideoTestimonial } from "@/data/content";
import { getProject } from "@/data/projects";

const labelFor = (t: VideoTestimonial) => {
  const project = t.project ? getProject(t.project) : undefined;
  return {
    title: t.name ?? (project ? `Cliente ${project.name}` : "Cliente Camaly"),
    meta: [t.company, t.projectType ?? project?.type].filter(Boolean).join(" · ") || "Depoimento em vídeo",
    project,
  };
};

const PosterButton = ({ t, onOpen, size }: { t: VideoTestimonial; onOpen: () => void; size: "lg" | "sm" }) => {
  const { title, meta } = labelFor(t);
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative block w-full overflow-hidden rounded-lg border border-line bg-surface text-left",
        size === "lg" ? "aspect-[4/5] sm:aspect-[9/12]" : "aspect-[9/14]",
      )}
      aria-label={`Assistir depoimento: ${title}`}
    >
      <img src={t.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-premium group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
      <span
        className={cn(
          "absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-ink/50 backdrop-blur-md transition-all duration-700 ease-premium group-hover:scale-110 group-hover:border-brand group-hover:bg-brand group-hover:text-ink",
          size === "lg" ? "h-20 w-20 text-3xl" : "h-14 w-14 text-xl",
        )}
      >
        <Icon name="play-fill" className="translate-x-[2px]" />
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <span className={cn("block font-semibold tracking-tight", size === "lg" ? "text-[22px]" : "text-[16px]")}>{title}</span>
        <span className="mt-1 block text-[13px] text-soft">{meta}</span>
      </span>
    </button>
  );
};

/** Modal nativo (<dialog>): foco preso, Esc fecha, sem dependências. */
const VideoModal = ({ item, onClose }: { item: VideoTestimonial | null; onClose: () => void }) => {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);
  const info = item ? labelFor(item) : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      aria-labelledby="video-modal-title"
      className="w-[min(92vw,440px)] overflow-hidden rounded-lg border border-line bg-ink p-0 text-foreground shadow-2xl backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
    >
      {item && info && (
        <>
          <div className="relative">
            <video key={item.src} src={item.src} poster={item.poster} controls autoPlay playsInline preload="metadata" className="aspect-[9/16] max-h-[78vh] w-full bg-black object-contain" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar vídeo"
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-ink/70 backdrop-blur"
            >
              <Icon name="x-lg" />
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p id="video-modal-title" className="text-[17px] font-semibold tracking-tight">
                {info.title}
              </p>
              <p className="text-[13px] text-soft">{info.meta}</p>
            </div>
            {info.project && (
              <Link to={`/portfolio/${info.project.slug}`} onClick={onClose} className="link-arrow shrink-0 text-[14px]">
                Ver projeto <Icon name="arrow-up-right" />
              </Link>
            )}
          </div>
        </>
      )}
    </dialog>
  );
};

/**
 * Depoimentos reais em vídeo: um principal grande + secundários.
 * Os vídeos só carregam ao abrir o modal (nada de autoplay no mobile).
 */
export const Testimonials = () => {
  const [open, setOpen] = useState<VideoTestimonial | null>(null);
  const [main, ...rest] = VIDEO_TESTIMONIALS;

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <PosterButton t={main} size="lg" onOpen={() => setOpen(main)} />
        </Reveal>

        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
          <Reveal delay={0.1} className="surface flex flex-1 flex-col justify-between p-7 sm:p-10">
            <Icon name="quote" className="text-5xl text-brand/80" />
            <p className="mt-6 text-[clamp(22px,2.4vw,32px)] font-medium leading-snug tracking-tight">
              Depoimentos gravados pelos próprios clientes, sem roteiro — sobre a experiência de construir um projeto com a Camaly.
            </p>
            <p className="mt-6 text-[14px] text-soft">Toque em um vídeo para assistir com áudio.</p>
          </Reveal>
          <div className="grid grid-cols-2 gap-6 lg:gap-8">
            {rest.map((t, i) => (
              <Reveal key={t.id} delay={0.15 + i * 0.08}>
                <PosterButton t={t} size="sm" onOpen={() => setOpen(t)} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <VideoModal item={open} onClose={() => setOpen(null)} />
    </>
  );
};
