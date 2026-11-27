/**
 * Configuración centralizada de SEO Comercial, Analítica (GA4),
 * Verificación de Google Search Console y Perfiles Oficiales (sameAs).
 *
 * Los valores se configuran en `.env` (o variables de entorno en CI/CD):
 * - VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
 * - VITE_GSC_VERIFICATION=tu_codigo_de_verificacion
 * - VITE_SOCIAL_SAME_AS=https://www.instagram.com/...,https://www.facebook.com/...
 */

const rawGa4 = (import.meta.env.VITE_GA4_MEASUREMENT_ID || '').trim();
export const GA4_MEASUREMENT_ID: string = /^G-[A-Z0-9]{6,}$/i.test(rawGa4) ? rawGa4 : '';

export const GSC_VERIFICATION_CODE: string = (import.meta.env.VITE_GSC_VERIFICATION || '').trim();

const parseSocialUrls = (raw: string | undefined): string[] => {
  if (!raw) return [];
  return raw
    .split(',')
    .map((u) => u.trim())
    .filter((u) => /^https?:\/\/.+/i.test(u));
};

/**
 * Perfiles oficiales de Hacienda Le Plus para Schema.org `sameAs`
 * (Instagram, Facebook, TikTok, LinkedIn, TripAdvisor, Booking, Google Business Profile).
 */
export const OFFICIAL_SOCIAL_PROFILES: string[] = parseSocialUrls(
  import.meta.env.VITE_SOCIAL_SAME_AS
);
