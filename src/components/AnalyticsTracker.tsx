import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA4, trackCommercialClick, trackPageView } from '../utils/analytics';

/**
 * Rastreador comercial no intrusivo para Google Analytics 4:
 * - Registra vistas de página SPA (excluyendo /admin y /portal-admin).
 * - Detecta automáticamente clics comerciales en WhatsApp, teléfono, correo y Google Maps.
 */
export const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    initGA4();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      trackPageView(location.pathname, location.search, document.title);
    }, 60);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const pagePath = window.location.pathname;
      const linkText = (anchor.textContent || anchor.getAttribute('aria-label') || '').trim();

      if (/wa\.me\/|api\.whatsapp\.com/i.test(href)) {
        trackCommercialClick('whatsapp_click', { pagePath, linkUrl: href, linkText });
      } else if (href.startsWith('tel:')) {
        trackCommercialClick('phone_click', { pagePath, linkUrl: href, linkText });
      } else if (href.startsWith('mailto:')) {
        trackCommercialClick('email_click', { pagePath, linkUrl: href, linkText });
      } else if (/google\.com\/maps|maps\.app\.goo\.gl/i.test(href)) {
        trackCommercialClick('maps_click', { pagePath, linkUrl: href, linkText });
      }
    };

    document.addEventListener('click', handleDocumentClick, { passive: true });
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  return null;
};

export default AnalyticsTracker;
