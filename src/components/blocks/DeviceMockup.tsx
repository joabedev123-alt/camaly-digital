import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Composition, ProjectImage } from "@/data/projects";

const sizes = "(min-width: 1024px) 66vw, 100vw";

const Img = ({ image, alt, eager, className }: { image: ProjectImage; alt: string; eager?: boolean; className?: string }) => (
  <img
    src={image.src}
    srcSet={`${image.srcSm} 800w, ${image.src} 1600w`}
    sizes={sizes}
    alt={alt}
    width={1600}
    height={1000}
    loading={eager ? "eager" : "lazy"}
    decoding="async"
    fetchPriority={eager ? "high" : undefined}
    className={cn("block h-full w-full object-cover object-top", className)}
  />
);

/** Moldura de navegador minimalista. */
export const BrowserFrame = ({ children, url, className }: { children: ReactNode; url?: string; className?: string }) => (
  <div className={cn("overflow-hidden rounded-[14px] border border-white/10 bg-[#0d1312] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]", className)}>
    <div className="flex h-8 items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-3.5 sm:h-9">
      <span className="flex gap-1.5" aria-hidden>
        <i className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <i className="h-2.5 w-2.5 rounded-full bg-white/10" />
      </span>
      {url && (
        <span className="mx-auto hidden max-w-[60%] truncate rounded-full bg-white/[0.04] px-4 py-0.5 text-[11px] text-soft sm:block">
          {url.replace(/^https?:\/\/(www\.)?/, "")}
        </span>
      )}
    </div>
    {children}
  </div>
);

/**
 * Composições variadas para o portfólio — o projeto é o protagonista.
 *  - browser: navegador centralizado sobre superfície
 *  - perspective: navegador em perspectiva 3D
 *  - fullbleed: imagem sangrada, sem moldura
 *  - detail: navegador + recorte ampliado (close-up de UI)
 */
export const DeviceMockup = ({
  image,
  alt,
  url,
  composition = "browser",
  eager,
  className,
}: {
  image: ProjectImage;
  alt: string;
  url?: string;
  composition?: Composition;
  eager?: boolean;
  className?: string;
}) => {
  if (composition === "fullbleed") {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden", className)}>
        <Img image={image} alt={alt} eager={eager} className="transition-transform duration-[1.6s] ease-premium group-hover:scale-[1.03]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
      </div>
    );
  }

  if (composition === "perspective") {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", className)}>
        <div className="absolute inset-0 bg-grid opacity-60 mask-radial" />
        <div className="absolute inset-0 flex items-center justify-center [perspective:1800px]">
          <div className="w-[82%] transition-transform duration-[1.4s] ease-premium [transform:rotateX(14deg)_rotateY(-16deg)_rotateZ(3deg)] group-hover:[transform:rotateX(8deg)_rotateY(-9deg)_rotateZ(1.5deg)]">
            <BrowserFrame url={url}>
              <div className="aspect-[16/9]">
                <Img image={image} alt={alt} eager={eager} />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>
    );
  }

  if (composition === "detail") {
    return (
      <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", className)}>
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />
        <div className="absolute left-[6%] top-[10%] w-[72%] transition-transform duration-[1.4s] ease-premium group-hover:-translate-y-1">
          <BrowserFrame url={url}>
            <div className="aspect-[16/9]">
              <Img image={image} alt={alt} eager={eager} />
            </div>
          </BrowserFrame>
        </div>
        <div className="absolute bottom-[8%] right-[5%] w-[38%] overflow-hidden rounded-[12px] border border-white/15 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] transition-transform duration-[1.4s] ease-premium group-hover:translate-y-1">
          <div className="aspect-[4/3]">
            <img src={image.srcSm} alt="" aria-hidden width={800} height={500} loading="lazy" className="h-full w-full object-cover [object-position:30%_8%] scale-[1.9] origin-top-left" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-surface", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(0,240,168,0.12),transparent_60%)]" />
      <div className="absolute inset-x-[7%] top-[9%] transition-transform duration-[1.4s] ease-premium group-hover:-translate-y-1.5">
        <BrowserFrame url={url}>
          <div className="aspect-[16/9]">
            <Img image={image} alt={alt} eager={eager} />
          </div>
        </BrowserFrame>
      </div>
    </div>
  );
};
