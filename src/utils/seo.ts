import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description: string;
  canonicalPath?: string;
}

/**
 * Updates document title, meta description, and OpenGraph tags dynamically per route
 * according to the approved SEO strategy table.
 */
export function useDocumentMeta({ title, description, canonicalPath = '/' }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:url"]', `https://www.haciendaleplus.com${canonicalPath}`);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', `https://www.haciendaleplus.com${canonicalPath}`);
    }
  }, [title, description, canonicalPath]);
}
