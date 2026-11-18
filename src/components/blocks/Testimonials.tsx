import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@/components/system/Icon";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonials";
import { VIDEO_TESTIMONIALS, type VideoTestimonial } from "@/data/content";
import { getProject } from "@/data/projects";

const labelFor = (t: VideoTestimonial) => {
  const project = t.project ? getProject(t.project) : undefined;
  return {
    title: t.name ?? (project ? project.name : "Cliente Camaly"),
    meta: t.projectType ?? project?.type ?? "Depoimento",
    project,
  };
};

function splitColumns<T>(items: T[], columns: number): T[][] {
  const cols: T[][] = Array.from({ length: columns }, () => []);
  items.forEach((item, i) => cols[i % columns].push(item));
  return cols;
}

const VideoCard = ({ t, onOpen }: { t: VideoTestimonial; onOpen: () => void }) => {
  const { title, meta } = labelFor(t);
  return (
    <button type="button" onClick={onOpen} aria-label={`Assistir depoimento: ${title}`} className="block w-full text-left">
      <Card className="overflow-hidden border-line bg-surface shadow-[0_14px_36px_-28px_rgba(15,27,24,0.3)] transition-transform duration-500 ease-premium active:scale-[0.98] sm:hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="relative aspect-[9/13] overflow-hidden">
            <img src={t.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-md sm:h-11 sm:w-11">
              <Icon name="play-fill" className="translate-x-[1px] text-base sm:text-lg" />
            </span>
            <span className="absolute inset-x-0 bottom-0 space-y-0.5 p-2 sm:p-3">
              <span className="block truncate text-[11px] font-semibold leading-snug tracking-tight text-white sm:text-[13px]">{title}</span>
              <span className="block truncate text-[10px] leading-snug text-white/65 sm:text-[11px]">{meta}</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

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
      className="m-auto w-[min(92vw,440px)] overflow-hidden rounded-lg border border-line bg-ink p-0 text-foreground shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm"
    >
      {item && info && (
        <>
          <div className="relative">
            <video key={item.src} src={item.src} poster={item.poster} controls autoPlay playsInline preload="metadata" className="aspect-[9/16] max-h-[70vh] w-full bg-black object-contain sm:max-h-[78vh]" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar vídeo"
              className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur"
            >
              <Icon name="x-lg" />
            </button>
          </div>
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <p id="video-modal-title" className="text-[17px] font-semibold tracking-tight">
                {info.title}
              </p>
              <p className="mt-1 text-[13px] text-soft">{info.meta}</p>
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
 * Fileiras verticais 2D: 2 no mobile, 3 a partir de md.
 */
export const Testimonials = () => {
  const [open, setOpen] = useState<VideoTestimonial | null>(null);
  const colsMobile = useMemo(() => splitColumns(VIDEO_TESTIMONIALS, 2), []);
  const colsDesktop = useMemo(() => splitColumns(VIDEO_TESTIMONIALS, 3), []);

  const renderCols = (cols: VideoTestimonial[][], repeat: number) =>
    cols.map((col, i) => (
      <Marquee
        key={i}
        vertical
        pauseOnHover
        reverse={i % 2 === 1}
        repeat={repeat}
        className="h-full min-h-0 p-0 [--duration:48s] [--gap:0.55rem] sm:[--duration:46s] sm:[--gap:0.85rem]"
        ariaLabel={`Fileira vertical de depoimentos ${i + 1}`}
      >
        {col.map((t) => (
          <VideoCard key={t.id} t={t} onOpen={() => setOpen(t)} />
        ))}
      </Marquee>
    ));

  return (
    <>
      <div className="relative h-[22rem] overflow-hidden rounded-xl border border-line bg-surface/80 [content-visibility:auto] sm:h-[32rem] md:h-[36rem]">
        {/* Mobile: 2 fileiras, menos cópias no marquee */}
        <div className="grid h-full grid-cols-2 gap-1.5 px-1.5 py-2 md:hidden">{renderCols(colsMobile, 2)}</div>
        {/* Desktop: 3 fileiras */}
        <div className="hidden h-full grid-cols-3 gap-4 px-4 py-4 md:grid">{renderCols(colsDesktop, 3)}</div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-surface sm:h-16 md:h-20" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-surface sm:h-16 md:h-20" />
      </div>

      <VideoModal item={open} onClose={() => setOpen(null)} />
    </>
  );
};
