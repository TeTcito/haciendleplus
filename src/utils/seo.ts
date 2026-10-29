import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  lang?: string;
  title_en?: string;
  description_en?: string;
}

/**
 * Updates document title, html lang, meta description, hreflang, and OpenGraph tags dynamically per route
 * according to the approved SEO & i18n strategy.
 */
export function useDocumentMeta({
  title,
  description,
  canonicalPath = '/',
  lang = 'es',
  title_en,
  description_en,
}: PageMetaOptions) {
  useEffect(() => {
    const isEn = lang === 'en';
    const effectiveTitle = isEn && title_en ? title_en : title;
    const effectiveDescription = isEn && description_en ? description_en : description;

    // 1. Dynamic document.title
    document.title = effectiveTitle;

    // 2. Dynamic html lang attribute
    document.documentElement.lang = lang;

    // 3. Meta tags helper
    const setMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (selector.startsWith('meta[name="')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) el.setAttribute('name', name);
        } else if (selector.startsWith('meta[property="')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) el.setAttribute('property', property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', effectiveDescription);
    setMeta('meta[property="og:title"]', effectiveTitle);
    setMeta('meta[property="og:description"]', effectiveDescription);
    setMeta('meta[property="og:url"]', `https://www.haciendaleplus.com${canonicalPath}`);
    setMeta('meta[property="og:locale"]', isEn ? 'en_US' : 'es_EC');
    setMeta('meta[name="twitter:title"]', effectiveTitle);
    setMeta('meta[name="twitter:description"]', effectiveDescription);

    // 4. Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', `https://www.haciendaleplus.com${canonicalPath}`);

    // 5. Hreflang alternates preparation for Phase 2
    const setHreflang = (hreflang: string, href: string) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    };

    setHreflang('es', `https://www.haciendaleplus.com${canonicalPath}`);
    setHreflang('en', `https://www.haciendaleplus.com${canonicalPath}?lang=en`);
    setHreflang('x-default', `https://www.haciendaleplus.com${canonicalPath}`);
  }, [title, description, canonicalPath, lang, title_en, description_en]);
}
