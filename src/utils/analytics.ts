import { GA4_MEASUREMENT_ID } from '../config/seoConfig';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __leplusGa4Initialized?: boolean;
  }
}

/**
 * Inicializa Google Analytics 4 (gtag.js) una sola vez si existe un Measurement ID válido.
 * Compatible con inyección estática en <head> durante el build (evita carga duplicada).
 */
export function initGA4(): boolean {
  if (typeof window === 'undefined' || !GA4_MEASUREMENT_ID) return false;
  if (window.__leplusGa4Initialized) return true;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  const existingScript = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}"]`
  );
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID, {
      send_page_view: false,
      anonymize_ip: true,
    });
  }

  window.__leplusGa4Initialized = true;
  return true;
}

function sendEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !GA4_MEASUREMENT_ID) return;
  if (!window.__leplusGa4Initialized) {
    initGA4();
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackPageView(pathname: string, search: string, pageTitle: string) {
  if (pathname.startsWith('/admin') || pathname.startsWith('/portal-admin')) return;
  sendEvent('page_view', {
    page_path: `${pathname}${search || ''}`,
    page_location: typeof window !== 'undefined' ? window.location.href : undefined,
    page_title: pageTitle,
  });
}

export function trackLeadConversion(params: {
  serviceType: string;
  sourcePage: string;
  estimatedVolume?: string;
}) {
  sendEvent('generate_lead', {
    currency: 'USD',
    service_type: params.serviceType,
    source_page: params.sourcePage,
    estimated_volume: params.estimatedVolume || '',
  });
}

export function trackCommercialClick(
  eventName: 'whatsapp_click' | 'phone_click' | 'email_click' | 'maps_click',
  params: {
    pagePath: string;
    linkUrl: string;
    linkText?: string;
  }
) {
  sendEvent(eventName, {
    page_path: params.pagePath,
    link_url: params.linkUrl,
    link_text: (params.linkText || '').slice(0, 80),
  });
}
