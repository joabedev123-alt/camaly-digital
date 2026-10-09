import { Link, useParams } from "react-router-dom";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Breadcrumb } from "@/components/system/Breadcrumb";
import { Eyebrow, Section } from "@/components/system/Section";
import { ImageReveal, LineReveal, Reveal, Stagger, StaggerItem } from "@/components/system/Reveal";
import { ButtonExternal } from "@/components/system/Button";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { BrowserFrame, DeviceMockup } from "@/components/blocks/DeviceMockup";
import { CTASection } from "@/components/blocks/CTASection";
import { RelatedProjects } from "@/components/blocks/RelatedProjects";
import { CATEGORY_LABEL, getProject, PROJECTS, relatedProjects } from "@/data/projects";
import { VIDEO_TESTIMONIALS } from "@/data/content";
import { caseMessage } from "@/lib/whatsapp";
import { SITE } from "@/config/site";
import { caseMeta } from "@/config/seo";
import NotFound from "./NotFound";

const Block = ({ label, title, children }: { label: string; title?: string; children: React.ReactNode }) => (
  <div className="grid gap-6 border-t border-line py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
    <Reveal className="lg:col-span-4">
      <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-brand">{label}</p>
      {title && <h2 className="mt-4 text-[clamp(24px,2.4vw,32px)] font-semibold leading-tight tracking-tight">{title}</h2>}
    </Reveal>
    <Reveal delay={0.1} className="lg:col-span-8">
      {children}
    </Reveal>
  </div>
);

const Case = () => {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const testimonial = VIDEO_TESTIMONIALS.find((t) => t.project === project.slug);
  const images = [project.cover, ...project.gallery];

  return (
    <>
      <Seo
        {...caseMeta(project.slug)!}
        type="article"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description: project.summary,
            url: `${SITE.url}/portfolio/${project.slug}`,
            image: `${SITE.url}/og/${project.slug}.jpg`,
            genre: project.type,
            creator: { "@type": "Organization", name: SITE.name, url: SITE.url },
          },
          breadcrumbLd([
            { name: "Início", path: "/" },
            { name: "Portfólio", path: "/portfolio" },
            { name: project.name, path: `/portfolio/${project.slug}` },
          ]),
        ]}
      />

      {/* CASE HERO */}
      <section className="relative overflow-hidden pt-[calc(var(--header-h)+clamp(40px,6vw,88px))]">
        <BrandWatermark variant="wire" position="top-right" opacity={0.05} scale={0.6} className="top-20" />
        <div className="container-x relative z-10">
          <Reveal className="mb-10">
            <Breadcrumb items={[{ name: "Início", path: "/" }, { name: "Portfólio", path: "/portfolio" }, { name: project.name }]} />
          </Reveal>

          <dl className="grid grid-cols-2 gap-6 border-y border-line py-6 text-[14px] sm:grid-cols-4">
            {[
              ["Client", project.name],
              ["Project type", CATEGORY_LABEL[project.category]],
              ["Industry", project.industry],
              [project.year ? "Year" : "Market", project.year ? String(project.year) : project.market],
            ].map(([k, v]) => (
              <Reveal key={k}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.22em] text-soft">{k}</dt>
                <dd className="mt-2 font-medium">{v}</dd>
              </Reveal>
            ))}
          </dl>

          <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:items-end">
            <LineReveal as="h1" immediate className="display-1 lg:col-span-8" delay={0.1}>
              {project.name}
            </LineReveal>
            <Reveal delay={0.25} className="lg:col-span-4">
              <p className="lead">{project.summary}</p>
              {project.url && (
                <ButtonExternal href={project.url} variant="ghost" icon="arrow-up-right" className="mt-8">
                  Visitar site
                </ButtonExternal>
              )}
            </Reveal>
          </div>
        </div>

        <div className="container-x relative z-10 mt-16 lg:mt-20">
          <ImageReveal className="rounded-xl border border-line">
            <DeviceMockup image={project.cover} alt={`${project.name} — página inicial`} url={project.url} composition={project.composition === "fullbleed" ? "fullbleed" : "browser"} eager />
          </ImageReveal>
        </div>
      </section>

      {/* NARRATIVA */}
      <Section className="!pb-0">
        <Block label="Overview" title="Apresentação">
          <p className="text-[clamp(19px,1.8vw,24px)] leading-relaxed">{project.overview}</p>
        </Block>
        <Block label="The challenge" title="O desafio">
          <p className="text-[18px] leading-relaxed text-soft">{project.challenge}</p>
        </Block>
        <Block label="The solution" title="A solução">
          <p className="text-[18px] leading-relaxed text-soft">{project.solution}</p>
        </Block>
        <Block label="What we built" title="O que construímos">
          <Stagger as="ul" className="cells grid sm:grid-cols-2">
            {project.deliverables.map((d) => (
              <StaggerItem as="li" key={d} className="flex items-center gap-3 bg-ink p-5 text-[16px]">
                <Icon name="check2-circle" className="text-brand" /> {d}
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-6 text-[14px] text-soft">Serviços: {project.services.join(" • ")}</p>
        </Block>
      </Section>

      {/* EXPERIÊNCIA / GALERIA */}
      <Section labelledBy="exp-t">
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>Responsive experience</Eyebrow>
            <h2 id="exp-t" className="display-3 mt-5">
              A experiência em detalhe.
            </h2>
          </div>
          <p className="max-w-md text-[15px] text-soft">Capturas do projeto publicado. Toda a experiência foi desenvolvida para desktop, tablet e celular.</p>
        </div>
        <div className="space-y-8">
          {images.map((img, i) => (
            <ImageReveal key={img.src} className="rounded-xl border border-line">
              {i === 0 ? (
                <div className="grid gap-px bg-line lg:grid-cols-12">
                  <div className="bg-surface p-5 sm:p-10 lg:col-span-8">
                    <BrowserFrame url={project.url}>
                      <img src={img.src} srcSet={`${img.srcSm} 800w, ${img.src} 1600w`} sizes="(min-width:1024px) 60vw, 100vw" alt={`${project.name} — tela ${i + 1}`} loading="lazy" className="block w-full" />
                    </BrowserFrame>
                  </div>
                  <div className="relative overflow-hidden bg-surface lg:col-span-4">
                    <img src={img.srcSm} alt="" aria-hidden loading="lazy" className="h-64 w-full scale-[2.2] object-cover [object-position:12%_6%] origin-top-left lg:h-full" />
                    <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-soft backdrop-blur">Close-up</span>
                  </div>
                </div>
              ) : (
                <DeviceMockup image={img} alt={`${project.name} — tela ${i + 1}`} url={project.url} composition="perspective" />
              )}
            </ImageReveal>
          ))}
        </div>
      </Section>

      {/* RESULTADOS & TECNOLOGIA — só com dados comprovados */}
      {(project.results?.length || project.stack?.length || testimonial) && (
        <Section className="!pt-0">
          {project.results?.length ? (
            <Block label="Result" title="Resultado">
              <ul className="space-y-3 text-[18px]">
                {project.results.map((r) => (
                  <li key={r} className="flex gap-3">
                    <Icon name="graph-up-arrow" className="mt-1 text-brand" /> {r}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
          {project.stack?.length ? (
            <Block label="Technology" title="Tecnologia">
              <ul className="flex flex-wrap gap-2.5">
                {project.stack.map((s) => (
                  <li key={s} className="rounded-full border border-line px-4 py-2 font-mono text-[13px]">
                    {s}
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
          {testimonial && (
            <Block label="Client voice" title="Depoimento">
              <div className="max-w-sm overflow-hidden rounded-lg border border-line">
                <video src={testimonial.src} poster={testimonial.poster} controls playsInline preload="none" className="aspect-[9/16] w-full bg-black object-cover" />
              </div>
            </Block>
          )}
        </Section>
      )}

      {/* Próximo projeto */}
      <section aria-label="Próximo projeto" className="border-t border-line">
        <Link to={`/portfolio/${next.slug}`} className="group container-x flex items-center justify-between gap-8 py-14 lg:py-20">
          <div>
            <p className="font-mono text-[12px] uppercase tracking-[0.22em] text-soft">Next project</p>
            <p className="mt-4 text-[clamp(32px,5vw,72px)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-500 group-hover:text-brand">{next.name}</p>
          </div>
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-line text-2xl transition-all duration-700 ease-premium group-hover:rotate-45 group-hover:border-brand group-hover:bg-brand group-hover:text-ink lg:h-24 lg:w-24">
            <Icon name="arrow-up-right" />
          </span>
        </Link>
      </section>

      <RelatedProjects projects={relatedProjects(project)} title={["Outros projetos", "que você pode gostar."]} />

      <CTASection
        eyebrow="Gostou deste projeto?"
        title={["Vamos conversar", "sobre o seu."]}
        text="Conte o que sua empresa precisa. Nossa equipe entende o desafio e apresenta a solução mais adequada."
        button="Falar pelo WhatsApp"
        waText={caseMessage(project.name)}
      />
    </>
  );
};

export default Case;
