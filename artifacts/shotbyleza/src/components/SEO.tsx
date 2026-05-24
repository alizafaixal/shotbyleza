import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: Record<string, unknown>;
}

const SITE_URL = "https://shotbyleza.com.au";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export function SEO({ title, description, canonical, ogImage, schema }: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, prop = false) => {
      const attr = prop ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel: string, href: string) => {
      let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    setMeta("description", description);

    // Open Graph
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:type", "website", true);
    setMeta("og:image", ogImage ?? DEFAULT_OG_IMAGE, true);
    setMeta("og:url", canonical ?? window.location.href, true);
    setMeta("og:site_name", "ShotByLeza", true);
    setMeta("og:locale", "en_AU", true);

    // Twitter / X
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:site", "@ShotByLeza");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage ?? DEFAULT_OG_IMAGE);

    // Canonical
    if (canonical) setLink("canonical", canonical);

    // JSON-LD structured data
    const schemaId = "page-schema";
    let schemaEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (schema) {
      if (!schemaEl) {
        schemaEl = document.createElement("script");
        schemaEl.id = schemaId;
        schemaEl.type = "application/ld+json";
        document.head.appendChild(schemaEl);
      }
      schemaEl.textContent = JSON.stringify(schema);
    } else if (schemaEl) {
      schemaEl.remove();
    }
  }, [title, description, canonical, ogImage, schema]);

  return null;
}
