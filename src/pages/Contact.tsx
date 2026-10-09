import { useState, type FormEvent } from "react";
import { PAGE_SEO } from "@/config/seo";
import { Seo, breadcrumbLd } from "@/components/system/Seo";
import { Icon } from "@/components/system/Icon";
import { Eyebrow } from "@/components/system/Section";
import { LineReveal, Reveal } from "@/components/system/Reveal";
import { WhatsAppButton } from "@/components/system/Button";
import { BrandWatermark } from "@/components/brand/BrandWatermark";
import { CONTACT, SITE } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

const NEEDS = ["Site institucional", "Landing Page", "E-commerce", "Sistema / Plataforma", "Outro"];

type Fields = { nome: string; empresa: string; whatsapp: string; email: string; servico: string; projeto: string };
const EMPTY: Fields = { nome: "", empresa: "", whatsapp: "", email: "", servico: "", projeto: "" };

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.nome.trim().length < 2) e.nome = "Informe seu nome.";
  if (f.whatsapp.replace(/\D/g, "").length < 10) e.whatsapp = "Informe um WhatsApp com DDD.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "E-mail inválido.";
  if (!f.servico) e.servico = "Selecione uma opção.";
  return e;
}

function buildMessage(f: Fields) {
  return [
    "Olá! Vim pelo site da Camaly e quero conversar sobre um projeto.",
    "",
    `*Nome:* ${f.nome.trim()}`,
    f.empresa && `*Empresa:* ${f.empresa.trim()}`,
    `*WhatsApp:* ${f.whatsapp.trim()}`,
    f.email && `*E-mail:* ${f.email.trim()}`,
    `*Preciso de:* ${f.servico}`,
    f.projeto && `*Sobre o projeto:* ${f.projeto.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}

const Field = ({ id, label, error, optional, children }: { id: string; label: string; error?: string; optional?: boolean; children: React.ReactNode }) => (
  <div>
    <label htmlFor={id} className="mb-2 flex items-center justify-between text-[14px] font-medium">
      {label}
      {optional && <span className="text-[12px] font-normal text-soft">opcional</span>}
    </label>
    {children}
    {error && (
      <p id={`${id}-err`} role="alert" className="mt-2 flex items-center gap-1.5 text-[13px] text-[#f26d6d]">
        <Icon name="exclamation-circle" /> {error}
      </p>
    )}
  </div>
);

const Contact = () => {
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [sent, setSent] = useState<string | null>(null);

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => setF((s) => ({ ...s, [k]: e.target.value }));
  const err = (k: keyof Fields) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${k}-err` } : {});

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const v = validate(f);
    setErrors(v);
    if (Object.keys(v).length) {
      document.getElementById(Object.keys(v)[0])?.focus();
      return;
    }
    // Sem backend: o projeto é enviado direto para o WhatsApp da Camaly.
    const url = waLink({ text: buildMessage(f) });
    setSent(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Seo
        {...PAGE_SEO["/contato"]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contato — Camaly Digital",
            url: `${SITE.url}/contato`,
          },
          breadcrumbLd([
            { name: "Início", path: "/" },
            { name: "Contato", path: "/contato" },
          ]),
        ]}
      />

      <section data-cta-zone className="relative overflow-hidden pb-24 pt-[calc(var(--header-h)+clamp(48px,7vw,104px))] lg:pb-36">
        <div aria-hidden className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_20%_0%,#000,transparent_75%)]" />
        <BrandWatermark variant="chameleon" position="bottom-left" opacity={0.045} scale={0.7} />

        <div className="container-x relative z-10 grid gap-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>Contato</Eyebrow>
            </Reveal>
            <LineReveal as="h1" immediate fluid className="display-2 mt-7" delay={0.1}>
              <>Vamos construir</>
              <span className="text-brand">alguma coisa juntos?</span>
            </LineReveal>
            <Reveal delay={0.25}>
              <p className="lead mt-8 max-w-md">Conte o que você precisa e nossa equipe entra em contato para entender o projeto.</p>
            </Reveal>
            <Reveal delay={0.35} className="mt-10">
              <WhatsAppButton size="lg" context="contato">
                Falar no WhatsApp
              </WhatsAppButton>
            </Reveal>

            <Reveal delay={0.45}>
              <ul className="mt-14 space-y-px overflow-hidden rounded-lg border border-line bg-line">
                {[
                  { icon: "whatsapp", label: "WhatsApp", value: CONTACT.whatsappDisplay, href: waLink("contato"), ext: true },
                  { icon: "envelope", label: "E-mail", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
                  { icon: "instagram", label: "Instagram", value: `@${CONTACT.instagram}`, href: CONTACT.instagramUrl, ext: true },
                ].map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 bg-ink p-5 transition-colors hover:bg-surface"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-brand">
                        <Icon name={c.icon} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[12px] uppercase tracking-[0.18em] text-soft">{c.label}</span>
                        <span className="block truncate text-[16px] font-medium">{c.value}</span>
                      </span>
                      <Icon name="arrow-up-right" className="text-soft transition-transform duration-500 ease-premium group-hover:rotate-45 group-hover:text-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-7">
            <div className="surface relative p-6 sm:p-10">
              {sent ? (
                <div className="flex min-h-[520px] flex-col items-center justify-center text-center" role="status">
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-brand text-2xl text-ink">
                    <Icon name="check-lg" />
                  </span>
                  <h2 className="mt-8 text-[28px] font-semibold tracking-tight">Projeto pronto para envio.</h2>
                  <p className="mt-3 max-w-sm text-soft">Abrimos o WhatsApp com as informações do seu projeto. É só enviar a mensagem para a nossa equipe.</p>
                  <a href={sent} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-8">
                    <Icon name="whatsapp" /> <span>Abrir WhatsApp novamente</span>
                  </a>
                  <button type="button" className="mt-5 text-[14px] text-soft underline-offset-4 hover:text-foreground hover:underline" onClick={() => (setSent(null), setF(EMPTY))}>
                    Preencher outro projeto
                  </button>
                </div>
              ) : (
                <form noValidate onSubmit={onSubmit} aria-labelledby="form-t">
                  <h2 id="form-t" className="text-[24px] font-semibold tracking-tight">
                    Conte sobre o seu projeto
                  </h2>
                  <p className="mt-2 text-[15px] text-soft">Leva menos de um minuto. Ao enviar, abrimos o WhatsApp com tudo preenchido.</p>

                  <div className="mt-10 grid gap-6 sm:grid-cols-2">
                    <Field id="nome" label="Nome" error={errors.nome}>
                      <input id="nome" className="field" autoComplete="name" value={f.nome} onChange={set("nome")} {...err("nome")} />
                    </Field>
                    <Field id="empresa" label="Empresa" optional>
                      <input id="empresa" className="field" autoComplete="organization" value={f.empresa} onChange={set("empresa")} />
                    </Field>
                    <Field id="whatsapp" label="WhatsApp" error={errors.whatsapp}>
                      <input id="whatsapp" className="field" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" value={f.whatsapp} onChange={set("whatsapp")} {...err("whatsapp")} />
                    </Field>
                    <Field id="email" label="E-mail" optional error={errors.email}>
                      <input id="email" className="field" type="email" autoComplete="email" value={f.email} onChange={set("email")} {...err("email")} />
                    </Field>
                  </div>

                  <fieldset className="mt-8">
                    <legend className="mb-3 text-[14px] font-medium">O que você precisa?</legend>
                    <div id="servico" tabIndex={-1} className="flex flex-wrap gap-2.5" {...err("servico")}>
                      {NEEDS.map((n) => (
                        <label key={n} className="cursor-pointer">
                          <input type="radio" name="servico" value={n} checked={f.servico === n} onChange={set("servico")} className="peer sr-only" />
                          <span className="inline-flex rounded-full border border-white/[0.12] px-4 py-2.5 text-[14px] text-soft transition-colors peer-checked:border-brand peer-checked:bg-brand peer-checked:text-ink peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:border-white/25 hover:text-foreground">
                            {n}
                          </span>
                        </label>
                      ))}
                    </div>
                    {errors.servico && (
                      <p id="servico-err" role="alert" className="mt-2 flex items-center gap-1.5 text-[13px] text-[#f26d6d]">
                        <Icon name="exclamation-circle" /> {errors.servico}
                      </p>
                    )}
                  </fieldset>

                  <div className="mt-8">
                    <Field id="projeto" label="Conte sobre o projeto" optional>
                      <textarea id="projeto" rows={5} className="field resize-y" placeholder="Objetivo, referências, prazo desejado…" value={f.projeto} onChange={set("projeto")} />
                    </Field>
                  </div>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex items-center gap-2 text-[13px] text-soft">
                      <Icon name="shield-check" className="text-brand" /> Seus dados são usados apenas para o contato.
                    </p>
                    <button type="submit" className="btn btn-primary btn-lg">
                      <span>Enviar projeto</span> <Icon name="arrow-up-right" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Contact;
