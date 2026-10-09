import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "@/config/site";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  /** Dados estruturados (JSON-LD) adicionais para a página. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function formatTitle(title: string) {
  return title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
}

/**
 * Metadados por página no cliente. O HTML inicial de cada rota também recebe
 * esses dados no build (scripts/prerender-meta.ts), para buscadores e redes sociais.
 */
export const Seo = ({ title, description, image, type = "website", jsonLd, noindex }: SeoProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = formatTitle(title);
    const url = SITE.url + (pathname === "/" ? "/" : pathname.replace(/\/$/, ""));
    const img = SITE.url + (image ?? SITE.ogImage);

    document.title = fullTitle;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
    setLink("canonical", url);

    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE.name);
    setMeta("property", "og:locale", SITE.locale);
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", img);

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

    const id = "page-jsonld";
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = id;
      s.text = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
  }, [title, description, image, type, jsonLd, noindex, pathname]);

  return null;
};

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE.url + it.path,
    })),
  };
}
