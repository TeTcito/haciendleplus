import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Calendar,
  CloudRain,
  BedDouble,
  ArrowRight,
  Clock,
  ShieldCheck,
  Play,
  Heart,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Check,
  Users,
  Utensils,
  Wine,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { useDocumentMeta } from '../../utils/seo';
import { DirectQuoteForm } from '../../components/DirectQuoteForm';
import { ScrollReveal } from '../../components/ScrollReveal';
import { getWeddingServices, getWeddingPresets } from '../../data/resortSpaces';

/* ============================================================================
   ICONOS LINE-ART PERSONALIZADOS EN ORO VIEJO (#8C6D3F) FIELES A LA REFERENCIA
   ============================================================================ */
const ServiceCardIcon: React.FC<{ type: 'rings' | 'flower' | 'camera' | 'couple' | 'calendar' }> = ({
  type,
}) => {
  switch (type) {
    case 'rings':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-[#8C6D3F]">
          {/* Diamond on top of left ring */}
          <path
            d="M16 12L19 8H25L28 12L22 17L16 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Left Ring */}
          <circle cx="19" cy="27" r="10" stroke="currentColor" strokeWidth="1.6" />
          {/* Right Interlocking Ring */}
          <circle cx="29" cy="29" r="10" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-[#8C6D3F]">
          {/* 5 Petals */}
          <path
            d="M24 8C26.5 8 28.5 11 27.5 15C31 13.5 34.5 15.5 34.5 18.5C34.5 21.5 31 23 28 22.5C30.5 25.5 29.5 29.5 26.5 30.5C24 31.2 22 28.5 21.5 25.5C20.5 28.5 18.5 31 16 30C13 29 12.5 25 15 22.5C12 23 8.5 21.5 8.5 18.5C8.5 15.5 12 13.5 15.5 15C14.5 11 16.5 8 19 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="21.5" cy="19.5" r="3" stroke="currentColor" strokeWidth="1.5" />
          {/* Stem & Leaves */}
          <path
            d="M21.5 30V41M21.5 36C25 36 28 33.5 28.5 31C25 31 22.5 33 21.5 36ZM21.5 38C18 38 15 35.5 14.5 33C18 33 20.5 35 21.5 38Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'camera':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-[#8C6D3F]">
          <rect
            x="8"
            y="15"
            width="32"
            height="22"
            rx="4"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M17 15L19.5 11H28.5L31 15"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24" cy="26" r="6.5" stroke="currentColor" strokeWidth="1.6" />
          <circle cx="24" cy="26" r="2.5" stroke="currentColor" strokeWidth="1.3" />
          <circle cx="34" cy="20" r="1.2" fill="currentColor" />
        </svg>
      );
    case 'couple':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-[#8C6D3F]">
          {/* Groom Head & Shoulders */}
          <circle cx="18.5" cy="14" r="4.2" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M11 38V27C11 23.5 13.8 21 17.5 21H19.5C22.2 21 24.5 22.8 25 25.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Bride Head, Veil & Dress */}
          <circle cx="29.5" cy="15.5" r="4" stroke="currentColor" strokeWidth="1.6" />
          <path
            d="M23 38L25.5 25.5C26 23.2 27.8 22 30 22C32.2 22 34 23.2 34.5 25.5L37 38"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32.5 13C35.5 14.5 37.5 18 38 22"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'calendar':
      return (
        <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8 text-[#8C6D3F]">
          <rect
            x="9"
            y="12"
            width="30"
            height="27"
            rx="3.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M9 19.5H39M16 9V14M32 9V14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* Heart inside calendar */}
          <path
            d="M24 33.5C24 33.5 17.5 29.2 17.5 25.2C17.5 23.2 19.1 21.8 21 21.8C22.3 21.8 23.4 22.5 24 23.5C24.6 22.5 25.7 21.8 27 21.8C28.9 21.8 30.5 23.2 30.5 25.2C30.5 29.2 24 33.5 24 33.5Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
};

export const WeddingsPageDesktop: React.FC = () => {
  const { siteConfig, packages, photos, openQuoteModal } = useCMS();
  const { language, isEn, t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [isDirectFormOpen, setIsDirectFormOpen] = useState(false);

  const weddingServices = getWeddingServices(isEn);
  const weddingCarouselServices = getWeddingPresets(isEn);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 390;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useDocumentMeta({
    title: 'Bodas y Celebraciones en Quito–Píntag | Hacienda Le Plus',
    title_en: 'Weddings & Celebrations in Quito–Píntag | Hacienda Le Plus',
    description:
      'Bodas y eventos sociales en Hacienda Le Plus (Quito–Píntag): ceremonias, recepción, jardines, catering, decoración y hospedaje para invitados (14 habitaciones). Cotiza al WhatsApp 0969817891.',
    description_en:
      'Weddings and social celebrations at Hacienda Le Plus (Quito–Píntag): ceremonies, reception, gardens, catering, decor, and on-site lodging for guests in 14 rooms.',
    canonicalPath: '/bodas',
    lang: language,
  });

  const weddingPackages = packages.filter((p) => p.category === 'bodas');
  const weddingPhotos = photos.filter(
    (p) => p.category === 'Bodas' || p.category === 'Naturaleza & Gastronomía'
  );

  return (
    <main className="pt-0 bg-[#FAF7F2] text-[#181512] overflow-x-hidden">
      {/* =====================================================================
          SECCIÓN 1 (HERO): RÉPLICA FIEL DEL DISEÑO DE REFERENCIA
          "Convertimos tu Boda Soñada En una Historia Inolvidable ♡"
      ====================================================================== */}
      <section
        aria-label="Portada de Bodas Hacienda Le Plus"
        className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center bg-[#F6EFE6] overflow-hidden border-b border-[#E6DDD0] pt-[88px] sm:pt-[96px] lg:pt-[104px]"
      >
        {/* 1. IMAGEN DE FONDO CON FUSIÓN SUAVE A CREMA EN LA IZQUIERDA Y BOKEH CÁLIDO A LA DERECHA */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hacienda/boda-hero-editorial.jpg"
            alt="Novios en arco floral de Hacienda Le Plus Píntag"
            fetchPriority="high"
            className="w-full h-full object-cover object-[48%_center] sm:object-[50%_center] lg:object-[52%_center] transform translate-x-4 sm:translate-x-8 lg:translate-x-12 xl:translate-x-16 scale-105 transition-transform duration-500"
          />

          {/* Sombra blanca/cremosa: cubre el lado izquierdo con una transición suave y se extiende unos 38px más allá de la mitad (50% + 38px) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, #F6EFE6 0%, #F6EFE6 28%, rgba(246, 239, 230, 0.96) 38%, rgba(246, 239, 230, 0.78) 46%, rgba(246, 239, 230, 0.35) calc(50% + 15px), rgba(246, 239, 230, 0) calc(50% + 40px))',
            }}
            aria-hidden="true"
          />

          {/* Resplandor bokeh cálido sutil en la esquina superior izquierda */}
          <div
            className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-40"
            style={{
              background:
                'radial-gradient(circle, rgba(235, 204, 148, 0.35) 0%, rgba(246, 239, 230, 0) 70%)',
            }}
            aria-hidden="true"
          />

          {/* Viñeta cálida en el extremo derecho SOLO en los últimos 280px detrás del texto poético a 20px del margen de la pestaña */}
          <div
            className="absolute inset-y-0 right-0 w-[280px] pointer-events-none"
            style={{
              background:
                'linear-gradient(to left, rgba(14, 24, 18, 0.85) 0%, rgba(14, 24, 18, 0.5) 50%, rgba(14, 24, 18, 0.15) 80%, rgba(14, 24, 18, 0) 100%)',
            }}
            aria-hidden="true"
          />

          {/* Sutil degradado inferior para transición limpia hacia la Sección 2 en móvil */}
          <div
            className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F7F2E9]/70 to-transparent lg:hidden"
            aria-hidden="true"
          />
        </div>

        {/* 2. RAMA BOTÁNICA ILUSTRADA EN EL BORDE IZQUIERDO (IDÉNTICA AL DISEÑO DE REFERENCIA) */}
        <div
          className="pointer-events-none hidden sm:block absolute left-0 top-[10%] bottom-0 w-24 lg:w-32 z-20 opacity-90"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 130 520"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* Tallo principal orgánico */}
            <path
              d="M-6 470 C22 390 38 300 32 210 C28 145 42 90 58 45"
              stroke="#6B7052"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M15 350 C45 335 72 342 98 362"
              stroke="#6B7052"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            {/* Hojas superiores en tonos oliva/salvia y bronce */}
            <path
              d="M58 45 C42 52 36 72 48 86 C62 76 68 58 58 45 Z"
              fill="#848C6A"
              fillOpacity="0.75"
            />
            <path
              d="M44 92 C24 85 12 98 18 118 C36 116 46 104 44 92 Z"
              fill="#626D4C"
              fillOpacity="0.8"
            />
            <path
              d="M42 128 C64 118 82 126 80 146 C62 150 46 140 42 128 Z"
              fill="#9A825A"
              fillOpacity="0.65"
            />
            <path
              d="M35 168 C14 156 2 170 10 192 C28 190 38 180 35 168 Z"
              fill="#566343"
              fillOpacity="0.85"
            />
            <path
              d="M34 205 C58 194 78 206 74 228 C54 230 38 218 34 205 Z"
              fill="#7A8462"
              fillOpacity="0.78"
            />
            <path
              d="M32 248 C10 238 -2 254 8 276 C26 272 35 260 32 248 Z"
              fill="#8C734B"
              fillOpacity="0.7"
            />
            <path
              d="M30 288 C56 278 76 292 70 314 C50 314 34 302 30 288 Z"
              fill="#5D6B48"
              fillOpacity="0.82"
            />
            {/* Hojas inferiores que asoman hacia la sección 2 */}
            <path
              d="M48 342 C68 326 88 334 86 352 C68 356 54 348 48 342 Z"
              fill="#6E7A56"
              fillOpacity="0.8"
            />
            <path
              d="M68 355 C88 352 108 364 102 380 C82 378 72 366 68 355 Z"
              fill="#53613F"
              fillOpacity="0.85"
            />
            <path
              d="M22 365 C42 372 56 392 44 410 C26 400 18 380 22 365 Z"
              fill="#8B734B"
              fillOpacity="0.72"
            />
          </svg>
        </div>

        {/* 3. CONTENIDO PRINCIPAL DEL HERO (IZQUIERDA + FRASE DERECHA) */}
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 lg:px-16 w-full py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* COLUMNA IZQUIERDA (7 COLUMNAS): TÍTULO EDITORIAL + SCRIPT + BOTONES + 3 MÉTRICAS */}
            <div className="lg:col-span-7 space-y-5 sm:pl-6 lg:pl-8">
              <ScrollReveal direction="down" delay={40}>
                <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.24em] text-[#2C2621]">
                  {isEn ? 'WEDDINGS & SOCIAL CELEBRATIONS IN QUITO – PÍNTAG' : 'BODAS Y EVENTOS SOCIALES EN QUITO – PÍNTAG'}
                </span>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={110}>
                <h1 className="text-[#181512]">
                  <span className="font-serif-luxury block text-5xl sm:text-6xl lg:text-[66px] font-normal leading-[0.96] tracking-tight">
                    {isEn ? 'Weddings & Celebrations' : 'Bodas y Celebraciones'}
                  </span>
                  <span className="font-wedding-script inline-flex items-center gap-3 text-4xl sm:text-5xl lg:text-[54px] font-medium text-[#221D1A] ml-2 sm:ml-6 mt-1 leading-[1.08]">
                    <span>{isEn ? 'In an Everlasting Story' : 'En una Historia Eterna'}</span>
                    {/* Corazón dibujado a mano idéntico a la referencia */}
                    <svg
                      viewBox="0 0 32 32"
                      fill="none"
                      className="w-6 h-6 sm:w-7 sm:h-7 text-[#4A3F35] -rotate-12 shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M16 26.5C16 26.5 5.5 19.2 5.5 11.8C5.5 8.4 8.2 6 11.3 6C13.4 6 15.1 7.2 16 9C16.9 7.2 18.6 6 20.7 6C23.8 6 26.5 8.4 26.5 11.8C26.5 19.2 16 26.5 16 26.5Z"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </h1>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={180}>
                <div className="space-y-2 max-w-[490px]">
                  <p className="text-sm sm:text-[15.5px] font-semibold text-[#1E1A17]">
                    {isEn
                      ? 'Ceremonies, reception, gardens, catering, decor, and guest lodging in Quito–Píntag.'
                      : 'Ceremonias, recepción, jardines, catering, decoración y hospedaje para invitados en Quito–Píntag.'}
                  </p>
                  <p className="text-xs sm:text-[13.5px] text-[#4A433B] leading-[1.65]">
                    {isEn ? (
                      <>
                        We celebrate exclusive weddings and social gatherings with ceremonial gardens, gala marquee tent, in-house catering, bespoke decor, and <strong>14 rooms (28 to 80 guests)</strong>, strengthened by our heated pool, restaurant, and recreation grounds.
                      </>
                    ) : (
                      <>
                        Celebramos bodas y eventos sociales exclusivos con jardines ceremoniales, carpa estructural de gala, catering propio, decoración personalizada y <strong>14 habitaciones (28 a 80 huéspedes)</strong>, fortalecidos por nuestra piscina temperada, restaurante y áreas recreativas como complementos.
                      </>
                    )}
                  </p>
                </div>
              </ScrollReveal>

              {/* Botones estilo Eterna + Botón Visible de WhatsApp 0969817891 */}
              <ScrollReveal direction="up" delay={250}>
                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <a
                    href={buildContextualWhatsAppUrl('bodas')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-[8px] bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-xs sm:text-[13.5px] font-semibold shadow-[0_8px_22px_rgba(10,31,23,0.22)] transition-all cursor-pointer"
                  >
                    <span>{isEn ? 'Quote Wedding or Celebration' : 'Cotizar Boda o Celebración'}</span>
                    <ArrowRight className="w-4 h-4 text-[#E2C585] group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#nuestros-servicios-bodas"
                    className="group inline-flex items-center gap-2.5 px-4 py-3 rounded-[8px] bg-[#F8F3EB]/90 hover:bg-white text-[#1E1A17] border border-[#C4B49B] text-xs sm:text-[13px] font-semibold shadow-2xs transition-all"
                  >
                    <span>{isEn ? 'View Services' : 'Ver Servicios'}</span>
                    <span className="w-6 h-6 rounded-full border border-[#8C6D3F] bg-[#EFE7DA] group-hover:bg-[#13281F] group-hover:border-[#13281F] text-[#13281F] group-hover:text-[#E2C585] flex items-center justify-center transition-colors">
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </span>
                  </a>
                </div>
              </ScrollReveal>

              {/* Fila inferior de 3 Estadísticas con Iconos Line-Art Dorados */}
              <ScrollReveal direction="up" delay={330}>
                <div className="pt-5 flex flex-wrap items-center gap-6 sm:gap-8">
                  {/* Métrica 1: 300+ Invitados / Bodas */}
                  <div className="flex items-center gap-3 pr-6 sm:pr-8 border-r border-[#D8CBB8]">
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="w-9 h-9 text-[#8C6D3F] shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 18C20 18 14 13.8 14 10.2C14 8.3 15.5 7 17.2 7C18.4 7 19.4 7.6 20 8.6C20.6 7.6 21.6 7 22.8 7C24.5 7 26 8.3 26 10.2C26 13.8 20 18 20 18Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M8 23C10 21 13 22 15 24L20 29L25 24C27 22 30 21 32 23C34 25 33 28 30 31L20 35L10 31C7 28 6 25 8 23Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div>
                      <span className="block font-sans-ui text-xl sm:text-2xl font-bold text-[#181512] leading-none">
                        300+
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#544B42] mt-1">
                        {isEn ? 'Gala Capacity' : 'Capacidad en Gala'}
                      </span>
                    </div>
                  </div>

                  {/* Métrica 2: 14 Habitaciones / Experiencia */}
                  <div className="flex items-center gap-3 pr-6 sm:pr-8 border-r border-[#D8CBB8]">
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="w-9 h-9 text-[#8C6D3F] shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M13 9H27V18C27 21.9 23.9 25 20 25C16.1 25 13 21.9 13 18V9Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                      <path
                        d="M13 12H9V15C9 17.2 10.8 19 13 19M27 12H31V15C31 17.2 29.2 19 27 19M20 25V32M14 32H26"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M20 13.5L21.2 16L24 16.3L22 18.2L22.5 21L20 19.6L17.5 21L18 18.2L16 16.3L18.8 16L20 13.5Z"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                    <div>
                      <span className="block font-sans-ui text-xl sm:text-2xl font-bold text-[#181512] leading-none">
                        {isEn ? '14 Rooms' : '14 Suites'}
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#544B42] mt-1">
                        {isEn ? 'Lodging (28–80 Pax)' : 'Alojamiento (28–80 Pax)'}
                      </span>
                    </div>
                  </div>

                  {/* Métrica 3: 100% Felicidad & Garantía */}
                  <div className="flex items-center gap-3">
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      className="w-9 h-9 text-[#8C6D3F] shrink-0"
                      aria-hidden="true"
                    >
                      <path
                        d="M20 7L23.5 14.2L31.5 15.3L25.7 20.9L27.1 28.8L20 25.1L12.9 28.8L14.3 20.9L8.5 15.3L16.5 14.2L20 7Z"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11 31C14 33.5 26 33.5 29 31"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div>
                      <span className="block font-sans-ui text-xl sm:text-2xl font-bold text-[#181512] leading-none">
                        100%
                      </span>
                      <span className="block text-[11px] sm:text-xs text-[#544B42] mt-1">
                        {isEn ? 'Joy & Full Support' : 'Felicidad & Respaldo'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Versión móvil del texto poético */}
                <div className="lg:hidden pt-4 flex justify-start">
                  <div className="bg-[#0A1F17]/65 backdrop-blur-xs p-4 rounded-xl border border-[#E2C585]/20 max-w-[260px]">
                    <p className="font-serif-luxury text-xl font-normal text-[#FAF5EC] leading-snug">
                      {isEn ? (
                        <>
                          Your Love Story
                          <br />
                          Deserves An Extraordinary Setting
                        </>
                      ) : (
                        <>
                          Tu Historia de Amor
                          <br />
                          Merece Un Escenario Extraordinario
                        </>
                      )}
                    </p>
                    <div className="mt-2 flex items-center gap-3 text-[#E2C585]">
                      <span className="w-10 h-[1px] bg-[#E2C585]/75 block" />
                      <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5 text-[#E2C585]" aria-hidden="true">
                        <path d="M12 20.5C12 20.5 4 14.8 4 9.2C4 6.6 6.1 4.5 8.6 4.5C10.2 4.5 11.4 5.4 12 6.8C12.6 5.4 13.8 4.5 15.4 4.5C17.9 4.5 20 6.6 20 9.2C20 14.8 12 20.5 12 20.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* TEXTO POÉTICO A 20PX EXACTOS DEL MARGEN DE LA PESTAÑA / PANTALLA */}
        <div className="hidden lg:block absolute right-[20px] top-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <ScrollReveal direction="right" delay={220}>
            <div className="max-w-[240px] pointer-events-auto">
              <p className="font-serif-luxury text-2xl lg:text-[31px] xl:text-[33px] font-normal text-[#FAF5EC] leading-[1.16] tracking-wide drop-shadow-[0_2px_14px_rgba(0,0,0,0.85)]">
                {isEn ? (
                  <>
                    Your
                    <br />
                    Love Story
                    <br />
                    Deserves
                    <br />
                    An Extraordinary
                    <br />
                    Setting
                  </>
                ) : (
                  <>
                    Tu
                    <br />
                    Historia de Amor
                    <br />
                    Merece
                    <br />
                    Un Escenario
                    <br />
                    Extraordinario
                  </>
                )}
              </p>

              {/* Línea horizontal + Corazón en la parte inferior derecha */}
              <div className="mt-4 flex items-center gap-4 text-[#E2C585]">
                <span className="w-14 h-[1px] bg-[#E2C585]/85 block" />
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-4 h-4 text-[#E2C585]"
                  aria-hidden="true"
                >
                  <path
                    d="M12 20.5C12 20.5 4 14.8 4 9.2C4 6.6 6.1 4.5 8.6 4.5C10.2 4.5 11.4 5.4 12 6.8C12.6 5.4 13.8 4.5 15.4 4.5C17.9 4.5 20 6.6 20 9.2C20 14.8 12 20.5 12 20.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 2 (PARTE A + PARTE B): RÉPLICA FIEL DE LAS 5 TARJETAS "WHAT WE DO"
          Y LA SECCIÓN DIVIDIDA "BECAUSE EVERY DETAIL MATTERS / ABOUT HACIENDA LE PLUS"
      ====================================================================== */}
      <section
        id="nuestros-servicios-bodas"
        aria-labelledby="heading-wedding-services"
        className="relative bg-[#F9F5EE] text-[#181512]"
      >
        {/* PARTE A: ENCABEZADO CENTRADO + 5 TARJETAS DE SERVICIOS NUPCIALES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-14 pb-16 lg:pt-16 lg:pb-20">
          <ScrollReveal direction="up" delay={40}>
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="inline-flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7A6A58]">
                <span className="w-8 h-[1px] bg-[#C5B59D] block" />
                <span>{isEn ? 'WHAT WE DO AT LE PLUS' : 'QUÉ HACEMOS EN LE PLUS'}</span>
                <span className="w-8 h-[1px] bg-[#C5B59D] block" />
              </div>

              <h2
                id="heading-wedding-services"
                className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#181512] tracking-tight"
              >
                {isEn ? 'Our Wedding Planning & Event Services' : 'Nuestros Servicios de Planificación y Bodas'}
              </h2>

              <p className="text-xs sm:text-[13.5px] text-[#544B42] leading-relaxed pt-0.5">
                {isEn
                  ? 'From the first concept to "I do" — we care for every detail with dedication, signature gastronomy, and warmth in Píntag.'
                  : 'Desde la primera idea hasta el “Sí, acepto” — cuidamos cada detalle con dedicación, gastronomía propia y calidez en Píntag.'}
              </p>
            </div>
          </ScrollReveal>

          {/* Fila de 5 Tarjetas Iguales al Diseño de Referencia */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {weddingServices.map((card, idx) => {
              const directions: ('up-left' | 'up' | 'zoom-in' | 'up' | 'up-right')[] = [
                'up-left',
                'up',
                'zoom-in',
                'up',
                'up-right',
              ];
              return (
                <ScrollReveal key={card.id} direction={directions[idx % 5]} delay={80 + idx * 70} duration={750} className="h-full">
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'bodas',
                        itemName: card.title,
                      })
                    }
                    className="w-full h-full text-center bg-[#FDFBF8] hover:bg-white border border-[#EBE3D6] hover:border-[#C8A45D]/60 rounded-[6px] px-5 py-8 flex flex-col items-center justify-between shadow-[0_6px_24px_rgba(24,21,18,0.03)] hover:shadow-[0_14px_32px_rgba(10,31,23,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex flex-col items-center">
                      {/* Círculo beige suave detrás del icono lineal dorado */}
                      <div className="w-16 h-16 rounded-full bg-[#F2ECE1] group-hover:bg-[#EAE0D0] flex items-center justify-center mb-5 transition-colors">
                        <ServiceCardIcon type={card.iconType} />
                      </div>

                      <h3 className="font-serif-luxury text-xl sm:text-[21px] font-bold text-[#181512] group-hover:text-[#0A1F17] leading-snug">
                        {card.title}
                      </h3>

                      <p className="text-xs text-[#5A5147] leading-[1.55] mt-2.5 max-w-[210px]">
                        {card.description}
                      </p>
                    </div>

                    <span className="mt-4 pt-2.5 border-t border-[#EBE3D6]/80 w-full text-[11px] font-semibold text-[#8C6D3F] group-hover:text-[#13281F] transition-colors">
                      {card.priceTag} · {isEn ? 'Quote →' : 'Cotizar →'}
                    </span>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* PARTE B: BLOQUE DIVIDIDO INFERIOR ("Porque cada detalle importa..." + "SOBRE HACIENDA LE PLUS") */}
        <div className="w-full border-t border-[#E6DDD0] bg-[#FAF7F2]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch lg:h-[500px]">
            {/* MITAD IZQUIERDA (6 COLUMNAS): FOTO DEL ARCO CEREMONIAL + SCRIPT "Porque cada detalle importa... ♡" */}
            <ScrollReveal direction="left" duration={850} className="lg:col-span-6 relative min-h-[360px] sm:min-h-[420px] lg:min-h-0 lg:h-full overflow-hidden bg-[#EDE5D8]">
              <img
                src="/images/hacienda/boda-arco-editorial.jpg"
                alt="Ceremonia de boda al aire libre en Hacienda Le Plus Píntag"
                className="w-full h-full object-cover object-center"
              />

              {/* Resplandor claro suave en la esquina superior izquierda para legibilidad del texto caligráfico */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 18% 18%, rgba(250, 247, 242, 0.78) 0%, rgba(250, 247, 242, 0.25) 34%, transparent 62%)',
                }}
                aria-hidden="true"
              />

              {/* Texto Caligráfico Inclinado "Porque cada detalle importa... ♡" tal cual la referencia */}
              <div className="absolute top-6 left-6 sm:top-9 sm:left-10 z-10 pointer-events-none select-none -rotate-[8deg]">
                <p className="font-wedding-script text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#1E1916] leading-[1.02] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
                  {isEn ? (
                    <>
                      Because every
                      <span className="block ml-4">detail matters...</span>
                    </>
                  ) : (
                    <>
                      Porque cada
                      <span className="block ml-4">detalle importa...</span>
                    </>
                  )}
                </p>
                <svg
                  viewBox="0 0 28 28"
                  fill="none"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#8C6D3F] ml-24 mt-1 rotate-6"
                  aria-hidden="true"
                >
                  <path
                    d="M14 23C14 23 4.5 16.5 4.5 10.2C4.5 7.4 6.8 5.2 9.5 5.2C11.3 5.2 12.8 6.2 14 7.8C15.2 6.2 16.7 5.2 18.5 5.2C21.2 5.2 23.5 7.4 23.5 10.2C23.5 16.5 14 23 14 23Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </ScrollReveal>

            {/* MITAD DERECHA (6 COLUMNAS): "SOBRE HACIENDA LE PLUS / Más que un Escenario, Somos Cómplices de tu Boda" */}
            <ScrollReveal direction="right" duration={850} className="lg:col-span-6 relative flex flex-col justify-center px-6 sm:px-12 lg:px-14 xl:px-16 py-8 lg:py-10 bg-[#FAF7F2] overflow-hidden">
              {/* Ilustración Botánica Line-Art en Oro Viejo a la derecha (idéntica a la referencia) */}
              <svg
                viewBox="0 0 110 150"
                fill="none"
                className="pointer-events-none hidden sm:block absolute right-5 lg:right-8 top-12 lg:top-16 w-20 lg:w-24 text-[#9C7D4C]/75"
                aria-hidden="true"
              >
                <path
                  d="M85 135 C65 100 45 65 25 20"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
                {/* Hojas lineales a lo largo del tallo */}
                <path
                  d="M25 20 C16 26 18 38 30 42 C32 30 29 24 25 20 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M36 46 C18 44 10 54 18 64 C30 62 36 54 36 46 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M39 50 C44 34 56 28 62 38 C56 48 46 50 39 50 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M50 74 C30 70 20 82 28 92 C42 90 48 82 50 74 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M53 78 C60 60 74 54 80 64 C72 74 62 78 53 78 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M66 102 C46 100 36 110 44 120 C58 118 64 110 66 102 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path
                  d="M68 104 C76 88 90 84 96 94 C88 102 78 104 68 104 Z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>

              <div className="max-w-xl space-y-4 relative z-10">
                <ScrollReveal direction="up" delay={40}>
                  <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6A58]">
                    {isEn ? 'ABOUT HACIENDA LE PLUS' : 'SOBRE HACIENDA LE PLUS'}
                  </span>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={100}>
                  <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#181512] leading-[1.12] pr-12">
                    {isEn ? (
                      <>
                        More than a Venue,
                        <br />
                        We Partner in Your Wedding
                      </>
                    ) : (
                      <>
                        Más que un Escenario,
                        <br />
                        Somos Cómplices de tu Boda
                      </>
                    )}
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="up" delay={160}>
                  <p className="text-xs sm:text-[13.5px] text-[#4E463E] leading-[1.7]">
                    {isEn
                      ? 'We believe every love story is unique, and so should every wedding be. At Hacienda Le Plus we combine creativity, Andean nature, signature gastronomy, and flawless execution with our dedicated in-house team to craft elegant, intimate, and unforgettable celebrations in Píntag.'
                      : 'Creemos que cada historia de amor es única, y así debe ser cada boda. En Hacienda Le Plus combinamos creatividad, naturaleza andina, gastronomía propia y una ejecución impecable con nuestro equipo profesional de planta para crear celebraciones elegantes, íntimas e inolvidables en Píntag.'}
                  </p>
                </ScrollReveal>

                {/* 4 Pilares con Iconos Line-Art y Divisores Verticales (Idénticos a la Referencia) */}
                <ScrollReveal direction="up" delay={220}>
                  <div className="pt-2 pb-1 grid grid-cols-2 sm:grid-cols-4 gap-y-3">
                    {/* Pilar 1: Atención Personalizada */}
                    <div className="flex flex-col items-center text-center px-3 border-r border-[#DFD5C5]">
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-7 h-7 text-[#8C6D3F] mb-2"
                        aria-hidden="true"
                      >
                        <path
                          d="M16 26C16 26 5.5 19 5.5 11.8C5.5 8.5 8.1 6 11.2 6C13.3 6 15 7.1 16 8.8C17 7.1 18.7 6 20.8 6C23.9 6 26.5 8.5 26.5 11.8C26.5 19 16 26 16 26Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[11px] sm:text-xs font-medium text-[#3D352E] leading-tight">
                        {isEn ? (
                          <>Personalized<br />Attention</>
                        ) : (
                          <>Atención<br />Personalizada</>
                        )}
                      </span>
                    </div>

                    {/* Pilar 2: Diseños y Escenarios Creativos */}
                    <div className="flex flex-col items-center text-center px-3 sm:border-r border-[#DFD5C5]">
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-7 h-7 text-[#8C6D3F] mb-2"
                        aria-hidden="true"
                      >
                        <circle cx="16" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M16 5C18 8 18 11 16 13C14 11 14 8 16 5ZM16 19C18 21 18 24 16 27C14 24 14 21 16 19ZM5 16C8 14 11 14 13 16C11 18 8 18 5 16ZM19 16C21 14 24 14 27 16C24 18 21 18 19 16ZM8.2 8.2C11 9.5 12.5 11.5 12.5 13.5C10.5 13.5 8.5 12 8.2 8.2ZM19.5 18.5C21.5 18.5 23.5 20 23.8 23.8C20 23.5 18.5 21.5 19.5 18.5ZM23.8 8.2C23.5 12 21.5 13.5 19.5 13.5C19.5 11.5 21 9.5 23.8 8.2ZM12.5 18.5C12.5 20.5 11 22.5 8.2 23.8C8.5 20 10.5 18.5 12.5 18.5Z"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[11px] sm:text-xs font-medium text-[#3D352E] leading-tight">
                        {isEn ? (
                          <>Bespoke Setups<br />&amp; Gardens</>
                        ) : (
                          <>Montajes &amp;<br />Jardines Únicos</>
                        )}
                      </span>
                    </div>

                    {/* Pilar 3: Cocina & Equipo Propio */}
                    <div className="flex flex-col items-center text-center px-3 border-r border-[#DFD5C5]">
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-7 h-7 text-[#8C6D3F] mb-2"
                        aria-hidden="true"
                      >
                        <path
                          d="M16 25C16 25 7 19.2 7 12.5C7 9.5 9.4 7 12.3 7C14.1 7 15.3 7.9 16 9.2C16.7 7.9 17.9 7 19.7 7C22.6 7 25 9.5 25 12.5C25 19.2 16 25 16 25Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M11.5 15.5L14.5 18.5L21 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[11px] sm:text-xs font-medium text-[#3D352E] leading-tight">
                        {isEn ? (
                          <>In-House Cuisine<br />&amp; Staff</>
                        ) : (
                          <>Gastronomía &amp;<br />Equipo Propio</>
                        )}
                      </span>
                    </div>

                    {/* Pilar 4: Experiencia Libre de Estrés */}
                    <div className="flex flex-col items-center text-center px-3">
                      <svg
                        viewBox="0 0 32 32"
                        fill="none"
                        className="w-7 h-7 text-[#8C6D3F] mb-2"
                        aria-hidden="true"
                      >
                        <path
                          d="M14 6L16 12L22 14L16 16L14 22L12 16L6 14L12 12L14 6Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M23 19L24 22.5L27.5 23.5L24 24.5L23 28L22 24.5L18.5 23.5L22 22.5L23 19Z"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="text-[11px] sm:text-xs font-medium text-[#3D352E] leading-tight">
                        {isEn ? (
                          <>Stress-Free<br />Experience</>
                        ) : (
                          <>Experiencia<br />Libre de Estrés</>
                        )}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Botón Inferior "Conocer Propuesta / Agendar Visita ->" + WhatsApp Directo */}
                <ScrollReveal direction="up" delay={280}>
                  <div className="pt-3 flex flex-wrap items-center gap-3.5">
                    <a
                      href={buildContextualWhatsAppUrl('bodas')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-[8px] bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-xs sm:text-[13.5px] font-semibold shadow-[0_8px_20px_rgba(10,31,23,0.18)] transition-all cursor-pointer"
                    >
                      <span>{isEn ? 'Schedule Wedding Tour' : 'Agendar Visita Nupcial'}</span>
                      <ArrowRight className="w-4 h-4 text-[#E2C585] group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </ScrollReveal>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 3: DOS BLOQUES DE ANCHO COMPLETO (SIMETRÍA EXACTA CON SECCIÓN ANTERIOR)
          "Más Que Un Espacio, Tu Boda Soñada" + FOTO PANORÁMICA AL RAS HASTA EL FINAL DE LA PESTAÑA
      ====================================================================== */}
      <section className="w-full border-t border-[#E6DDD0] bg-[#FAF7F2] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch lg:h-[500px]">
          {/* MITAD IZQUIERDA (6 COLUMNAS): TEXTO EDITORIAL + 4 CHECKPOINTS + BOTÓN */}
          <div className="lg:col-span-6 relative flex flex-col justify-center px-6 sm:px-12 lg:px-14 xl:px-16 py-8 lg:py-10 bg-[#FAF7F2] overflow-hidden">
            <div className="max-w-xl space-y-3.5">
              <ScrollReveal direction="up" delay={50}>
                <span className="block text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-[#7A6A58]">
                  {isEn ? 'WHY CHOOSE HACIENDA LE PLUS' : 'POR QUÉ ELEGIR HACIENDA LE PLUS'}
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={120}>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#181512] leading-[1.12]">
                  {isEn ? (
                    <>
                      More Than a Venue,
                      <br />
                      Your Dream Wedding
                    </>
                  ) : (
                    <>
                      Más Que Un Espacio,
                      <br />
                      Tu Boda Soñada
                    </>
                  )}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180}>
                <p className="text-xs sm:text-[13.5px] text-[#4E463E] leading-[1.7]">
                  {isEn
                    ? 'We offer much more than scenic gardens in Píntag. We craft complete wedding journeys marking the beginning of your new life together, featuring signature dining, luxury lodging, and an experienced team beside you at every step.'
                    : 'Ofrecemos mucho más que hermosos jardines en Píntag. Creamos experiencias nupciales completas que marcan el inicio de tu nueva vida juntos, con gastronomía de autor, hospedaje exclusivo y un equipo profesional a tu lado en todo momento.'}
                </p>
              </ScrollReveal>

              {/* 4 Checkpoints en cuadrícula 2x2 compacta (idéntica proporción que los 4 pilares superiores) */}
              <ScrollReveal direction="up" delay={250}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-1">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#13281F] text-[#E2C585] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="text-xs sm:text-[12.5px] font-medium text-[#2C2621] leading-snug">
                      {isEn ? 'Setups, gardens & gala marquee tent (80 to 300 pax)' : 'Montajes, jardines y carpa de gala (80 a 300 pax)'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#13281F] text-[#E2C585] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="text-xs sm:text-[12.5px] font-medium text-[#2C2621] leading-snug">
                      {isEn ? 'Flexible terms and free corkage with zero surprises' : 'Términos flexibles y descorche libre sin sorpresas'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#13281F] text-[#E2C585] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="text-xs sm:text-[12.5px] font-medium text-[#2C2621] leading-snug">
                      {isEn ? 'Bespoke accompaniment & expert personalized advice' : 'Acompañamiento y asesoría experta personalizada'}
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#13281F] text-[#E2C585] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                    <span className="text-xs sm:text-[12.5px] font-medium text-[#2C2621] leading-snug">
                      {isEn ? 'Hundreds of weddings and happy couples endorse us' : 'Cientos de bodas y familias felices nos respaldan'}
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Botón Planificar Boda */}
              <ScrollReveal direction="up" delay={320}>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'bodas',
                        itemName: isEn ? 'Comprehensive Wedding Planning at Hacienda Le Plus' : 'Planificación Integral de Boda en Hacienda Le Plus',
                      })
                    }
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-[8px] bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-xs sm:text-[13.5px] font-semibold shadow-[0_8px_20px_rgba(10,31,23,0.18)] transition-all cursor-pointer"
                  >
                    <span>{isEn ? 'Plan My Wedding' : 'Planificar mi Boda'}</span>
                    <ArrowRight className="w-4 h-4 text-[#E2C585] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* MITAD DERECHA (6 COLUMNAS): FOTO AL RAS HASTA EL FINAL DE LA PESTAÑA (DIMENSIÓN SIMÉTRICA A LA ANTERIOR) */}
          <ScrollReveal direction="zoom-in" duration={850} className="lg:col-span-6 relative min-h-[360px] sm:min-h-[420px] lg:min-h-0 lg:h-full overflow-hidden bg-[#EDE5D8]">
            <img
              src="/images/hacienda/boda-suite-lounge.jpg"
              alt="Lounge y Suite Nupcial con ventanales hacia los jardines de Hacienda Le Plus en Píntag"
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 4: CARRUSEL DE SERVICIOS NUPCIALES ("FEATURED PROPERTIES" RÉPLICA CON PALETA DE BODAS)
      ====================================================================== */}
      <section className="w-full bg-[#F9F5EE] py-16 lg:py-24 border-t border-b border-[#E6DDD0] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* ENCABEZADO DEL CARRUSEL: ESTILO EDITORIAL DE LA MARCA */}
          <ScrollReveal direction="down" duration={750}>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7A6A58] mb-1.5">
                  <span className="w-6 h-[1px] bg-[#C5B59D]" />
                  <span>{isEn ? 'FEATURED WEDDING PROPOSALS' : 'PROPUESTAS NUPCIALES DESTACADAS'}</span>
                  <span className="w-6 h-[1px] bg-[#C5B59D]" />
                </div>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#181512] leading-tight">
                  {isEn ? 'Wedding Services & Packages' : 'Servicios & Paquetes Nupciales'}
                </h2>
                <p className="text-xs sm:text-sm text-[#544B42] mt-1">
                  {isEn
                    ? 'All-inclusive packages in Píntag, Quito designed for you to enjoy your big day with complete serenity.'
                    : 'Propuestas integrales en Píntag, Quito diseñadas para que vivas tu gran día con total tranquilidad.'}
                </p>
              </div>

              {/* Controles de Navegación del Carrusel + Ver Todas las Opciones */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => scrollCarousel('left')}
                  aria-label={isEn ? 'Scroll left' : 'Desplazar hacia la izquierda'}
                  className="w-10 h-10 rounded-full border border-[#D5C7B2] bg-[#FAF7F2] hover:bg-white text-[#181512] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5 text-[#3D352E]" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel('right')}
                  aria-label={isEn ? 'Scroll right' : 'Desplazar hacia la derecha'}
                  className="w-10 h-10 rounded-full border border-[#D5C7B2] bg-[#FAF7F2] hover:bg-white text-[#181512] flex items-center justify-center shadow-xs transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5 text-[#3D352E]" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      serviceType: 'bodas',
                      itemName: isEn ? 'Complete Hacienda Le Plus Wedding Catalog' : 'Catálogo Completo de Bodas Hacienda Le Plus',
                    })
                  }
                  className="hidden md:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#181512] hover:text-[#8C6D3F] ml-2 transition-colors cursor-pointer"
                >
                  <span>{isEn ? 'View All Options' : 'Ver Todas las Opciones'}</span>
                  <ArrowRight className="w-4 h-4 text-[#8C6D3F]" />
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* CONTENEDOR DEL CARRUSEL SCROLLABLE */}
          <ScrollReveal direction="up" delay={120} duration={800}>
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {weddingCarouselServices.map((card) => {
                const isFav = !!favorites[card.id];
                return (
                  <div
                    key={card.id}
                    className="w-[305px] sm:w-[355px] lg:w-[375px] shrink-0 snap-start rounded-2xl bg-[#FAF7F2] border border-[#E6DDD0] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between p-3.5 sm:p-4 group"
                  >
                    {/* IMAGEN DE LA TARJETA + BADGE DE COLOR + BOTÓN DE FAVORITO */}
                    <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden bg-[#EDE5D8]">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />

                      {/* Badge Elegante Acorde a la Paleta de Bodas */}
                      <span
                        className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-[11px] font-semibold shadow-xs ${card.badgeClass} backdrop-blur-xs`}
                      >
                        {card.badge}
                      </span>

                      {/* Botón de Favorito Circular */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(card.id);
                        }}
                        aria-label={isEn ? 'Save to favorites' : 'Guardar en favoritos'}
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs border border-[#8C6D3F]/30 flex items-center justify-center shadow-xs transition-transform hover:scale-110 active:scale-95 cursor-pointer text-[#8C6D3F]"
                      >
                        <Heart
                          className={`w-4 h-4 transition-colors ${
                            isFav ? 'fill-[#C8A45D] text-[#C8A45D]' : 'text-[#8C6D3F]'
                          }`}
                        />
                      </button>
                    </div>

                    {/* CUERPO DE LA TARJETA: TÍTULO, UBICACIÓN, SPECS */}
                    <div className="pt-3.5 space-y-2">
                      <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#181512] line-clamp-1 group-hover:text-[#8C6D3F] transition-colors">
                        {card.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-xs text-[#5A5147]">
                        <MapPin className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                        <span className="truncate">{card.subtitle}</span>
                      </div>

                      {/* Fila de 3 Especificaciones con Iconos en Oro Viejo */}
                      <div className="flex items-center justify-between py-2.5 my-2 border-t border-b border-[#EBE3D6] text-xs text-[#4E463E]">
                        {card.specs.map((spec, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            {spec.icon === 'users' && (
                              <Users className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                            )}
                            {spec.icon === 'bed' && (
                              <BedDouble className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                            )}
                            {spec.icon === 'tent' && (
                              <Calendar className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                            )}
                            {spec.icon === 'utensils' && (
                              <Utensils className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                            )}
                            {spec.icon === 'glass' && (
                              <Wine className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                            )}
                            {spec.icon === 'sparkles' && (
                              <Sparkles className="w-3.5 h-3.5 text-[#8C6D3F] shrink-0" />
                            )}
                            <span className="whitespace-nowrap font-medium text-[11px] sm:text-xs">
                              {spec.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* PRECIO Y BOTÓN "VER DETALLES" */}
                    <div className="pt-2 flex items-center justify-between">
                      <div>
                        <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#181512]">
                          {card.price}
                        </span>
                        <span className="text-xs text-[#6E6357] font-normal ml-1">
                          {card.unit}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          openQuoteModal({
                            serviceType: 'bodas',
                            itemName: card.title,
                          })
                        }
                        className="px-4 py-2.5 rounded-[8px] bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-xs sm:text-[13px] font-semibold transition-all cursor-pointer shadow-xs hover:shadow-md"
                      >
                        {isEn ? 'View Details' : 'Ver Detalles'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 5: NUEVA SECCIÓN DE ANCHO COMPLETO (RÉPLICA DE LA IMAGEN DE REFERENCIA)
          BANNER HORIZONTAL CON GASTRONOMÍA, BOTÓN QUE ABRE EL FORMULARIO Y 3 CARACTERÍSTICAS
      ====================================================================== */}
      <section className="w-full bg-[#CCD6C4] border-t border-[#B8C4AF] overflow-hidden">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* BLOQUE IZQUIERDO (7 COLUMNAS): TEXTO + BOTÓN + 3 ICONOS LINEALES CON TEXTO INFERIOR */}
          <div className="lg:col-span-7 flex flex-col justify-center px-6 sm:px-12 lg:px-14 xl:px-20 py-12 lg:py-16">
            <div className="max-w-xl space-y-4">
              <ScrollReveal direction="up" delay={40}>
                <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#34472F]">
                  {isEn ? 'DIRECT INBOX · IMMEDIATE RESPONSE' : 'BANDEJA DIRECTA · ATENCIÓN INMEDIATA'}
                </span>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={100}>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#172414] leading-[1.12]">
                  {isEn ? 'Schedule Your Wedding Tour & Quote' : 'Agenda tu Visita Nupcial & Cotiza tu Boda'}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={160}>
                <p className="text-xs sm:text-[13.5px] text-[#334230] leading-[1.65]">
                  {isEn
                    ? 'Let us explore the gardens, halls, and suites together in Píntag. We tend to every nuance with signature gastronomy, free corkage, and a dedicated team committed to your celebration.'
                    : 'Recorramos juntos los jardines, salones y suites en Píntag. Cuidamos cada detalle con gastronomía de autor, descorche libre y un equipo profesional comprometido con la magia de tu celebración.'}
                </p>
              </ScrollReveal>

              {/* Fila con Botón de Apertura y 3 Iconos Lineales (Idéntico a la referencia) */}
              <ScrollReveal direction="up" delay={220}>
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 flex-wrap">
                  <a
                    href={buildContextualWhatsAppUrl('bodas')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-[10px] bg-[#2D4029] hover:bg-[#1E2E1B] text-[#FAF7F2] text-xs sm:text-[13.5px] font-semibold shadow-md transition-all cursor-pointer shrink-0"
                  >
                    <span>{isEn ? 'Request Proposal' : 'Solicitar Propuesta'}</span>
                    <ArrowRight className="w-4 h-4 text-[#D8E6CF]" />
                  </a>

                  {/* 3 Iconos con Etiquetas Inferiores */}
                  <div className="flex items-center gap-5 sm:gap-6">
                    {/* Item 1: Vistas a los Volcanes */}
                    <div className="flex flex-col items-center text-center">
                      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 text-[#2D4029] mb-1" aria-hidden="true">
                        <path d="M3 21L9.5 9L14 17L18.5 8L25 21H3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M12 14.5L14 17L16.5 12" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      </svg>
                      <span className="text-[10.5px] font-medium text-[#2C3D28] leading-tight">
                        {isEn ? (
                          <>Volcano<br />Views</>
                        ) : (
                          <>Vistas a los<br />Volcanes</>
                        )}
                      </span>
                    </div>

                    {/* Item 2: Carpa y Plan de Lluvia */}
                    <div className="flex flex-col items-center text-center">
                      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 text-[#2D4029] mb-1" aria-hidden="true">
                        <path d="M14 5L24 20H4L14 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M14 10V20" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                      <span className="text-[10.5px] font-medium text-[#2C3D28] leading-tight">
                        {isEn ? (
                          <>Gala Marquee &amp;<br />Rain Plan</>
                        ) : (
                          <>Carpa Gala &amp;<br />Plan de Lluvia</>
                        )}
                      </span>
                    </div>

                    {/* Item 3: Descorche Libre */}
                    <div className="flex flex-col items-center text-center">
                      <svg viewBox="0 0 28 28" fill="none" className="w-6 h-6 text-[#2D4029] mb-1" aria-hidden="true">
                        <path d="M8 6H20L14 14L8 6Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                        <path d="M14 14V22M9 22H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                      </svg>
                      <span className="text-[10.5px] font-medium text-[#2C3D28] leading-tight">
                        {isEn ? (
                          <>Free Corkage<br />No Surprises</>
                        ) : (
                          <>Descorche Libre<br />Sin Sorpresas</>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* BLOQUE DERECHO (5 COLUMNAS): IMAGEN ARTÍSTICA GASTRONOMÍA & MENÚ NUPCIAL */}
          <ScrollReveal direction="right" duration={850} className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden">
            <img
              src="/images/hacienda/boda-banner-gastronomia.jpg"
              alt="Banquete de bodas, tartaletas y menú nupcial en Hacienda Le Plus Píntag"
              className="w-full h-full object-cover object-right"
              loading="lazy"
            />
          </ScrollReveal>
        </div>

        {/* FORMULARIO DIRECTO INCORPORADO (SE DESPLIEGA EN ESTA SECCIÓN CON EL BOTÓN) */}
        {isDirectFormOpen && (
          <div className="w-full bg-[#071912] text-[#FAF7F2] py-14 px-4 sm:px-6 lg:px-8 border-t border-[#C8A45D]/30 transition-all duration-500">
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A45D]">
                  {isEn ? 'Direct Inbox:' : 'Bandeja Directa:'} {siteConfig.corporateEmails.bodas}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white">
                  {isEn ? 'Schedule your wedding visit or request a custom proposal' : 'Agenda tu visita nupcial o solicita tu propuesta'}
                </h3>
                <p className="text-xs sm:text-sm text-[#FAF7F2]/75 max-w-xl mx-auto">
                  {isEn
                    ? 'Let us know your tentative date and estimated guest count. We will confirm date availability and visiting hours to tour the estate in Píntag.'
                    : 'Indícanos tu fecha tentativa y número aproximado de invitados. Te confirmaremos disponibilidad de fecha y horarios para recorrer la hacienda en Píntag.'}
                </p>
              </div>

              <DirectQuoteForm defaultService="bodas" darkTheme={true} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export { WeddingsPageDesktop as WeddingsPage };
export default WeddingsPageDesktop;
