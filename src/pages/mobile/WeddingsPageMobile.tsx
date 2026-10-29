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
  Search,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { useDocumentMeta } from '../../utils/seo';
import { ScrollReveal } from '../../components/ScrollReveal';
import { getWeddingServices, getWeddingPresets } from '../../data/resortSpaces';

/* ============================================================================
   5 SERVICIOS NUPCIALES (BLOQUE 2 - "WHAT WE DO" RÉPLICA DEL DISEÑO)
   ============================================================================ */
const WEDDING_SERVICES_CARDS = [
  {
    id: 'srv-planning',
    title: 'Ceremonias & Recepción',
    description:
      'Ceremonias al aire libre o en salón colonial, protocolo integral y recepción de gala en Quito–Píntag.',
    priceTag: 'Desde $42 / invitado',
    iconType: 'rings' as const,
  },
  {
    id: 'srv-theme',
    title: 'Jardines & Decoración',
    description:
      'Jardines exclusivos, decoración floral personalizada, carpa estructural de gala y mesas imperiales.',
    priceTag: '80 a 300 invitados',
    iconType: 'flower' as const,
  },
  {
    id: 'srv-catering',
    title: 'Catering & Restaurante',
    description:
      'Catering nupcial propio (cóctel, menú de 3 tiempos, mesa de dulces), descorche libre y restaurante como complemento.',
    priceTag: 'Desde $70 / invitado',
    iconType: 'camera' as const,
  },
  {
    id: 'srv-destination',
    title: 'Hospedaje para Invitados',
    description:
      'Aloja de 28 a 80 invitados en 14 habitaciones, fortalecido con piscina 14×6m, hidromasajes y áreas recreativas.',
    priceTag: 'Desde $95 / invitado',
    iconType: 'couple' as const,
  },
  {
    id: 'srv-coordination',
    title: 'Eventos Sociales & Gala',
    description:
      'Aniversarios, bautizos, graduaciones y celebraciones familiares con Suite Nupcial y parqueadero privado.',
    priceTag: 'Quito – Píntag',
    iconType: 'calendar' as const,
  },
];

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

/* ============================================================================
   CARRUSEL DE SERVICIOS NUPCIALES (RÉPLICA "FEATURED PROPERTIES" CON PALETA LE PLUS)
   ============================================================================ */
interface CarouselServiceItem {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeClass: string;
  image: string;
  specs: { label: string; icon: 'users' | 'bed' | 'tent' | 'utensils' | 'glass' | 'sparkles' }[];
  price: string;
  unit: string;
  serviceType: string;
}

const WEDDING_CAROUSEL_SERVICES: CarouselServiceItem[] = [
  {
    id: 'boda-campestre-imperial',
    title: 'Ceremonia, Recepción & Jardines',
    subtitle: 'Quito–Píntag · Jardines & Carpa de Gala',
    badge: 'Más Solicitado',
    badgeClass: 'bg-[#13281F]/90 text-[#E2C585] border border-[#C8A45D]/40',
    image: '/images/hacienda/boda-carpa-gala.jpg',
    specs: [
      { label: '80 a 300 Pax', icon: 'users' },
      { label: 'Decoración & Carpa', icon: 'tent' },
      { label: 'Catering 3 Tiempos', icon: 'utensils' },
    ],
    price: '$42',
    unit: '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'boda-destino-14-suites',
    title: 'Boda + Hospedaje para Invitados',
    subtitle: 'Quito–Píntag · 14 Habitaciones (28 a 80 Pax)',
    badge: 'Hospedaje Invitados',
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    image: '/images/hacienda/bodas-exteriores.jpg',
    specs: [
      { label: '28 a 80 Pax', icon: 'users' },
      { label: '14 Habitaciones', icon: 'bed' },
      { label: 'Comp. Piscina 14×6m', icon: 'sparkles' },
    ],
    price: '$95',
    unit: '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'banquete-autor-coctel',
    title: 'Catering Nupcial & Decoración',
    subtitle: 'Quito–Píntag · Gastronomía & Montaje',
    badge: 'Catering & Decoración',
    badgeClass: 'bg-[#1A382B]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-mesa-imperial.jpg',
    specs: [
      { label: 'Descorche Libre', icon: 'glass' },
      { label: 'Catering Propio', icon: 'utensils' },
      { label: 'Decoración Floral', icon: 'sparkles' },
    ],
    price: '$70',
    unit: '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'ceremonia-jardin-palmeras',
    title: 'Ceremonia en Jardines de la Hacienda',
    subtitle: 'Quito–Píntag · Altares & Decoración Natural',
    badge: 'Ceremonias',
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    image: '/images/hacienda/boda-ceremonia-arco.jpg',
    specs: [
      { label: '50 a 300 Pax', icon: 'users' },
      { label: 'Arco & Decoración', icon: 'sparkles' },
      { label: 'Sillas Tiffany', icon: 'sparkles' },
    ],
    price: '$35',
    unit: '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'experiencia-zona-humeda',
    title: 'Complemento: Piscina, Restaurante & Recreación',
    subtitle: 'Quito–Píntag · Fortalece la Estadía de Invitados',
    badge: 'Complemento Nupcial',
    badgeClass: 'bg-[#7A6A58]/90 text-[#FAF7F2]',
    image: '/images/hacienda/area-humeda.jpg',
    specs: [
      { label: 'Piscina 14×6m', icon: 'sparkles' },
      { label: 'Restaurante', icon: 'utensils' },
      { label: 'Áreas Recreativas', icon: 'sparkles' },
    ],
    price: '$55',
    unit: '/ invitado',
    serviceType: 'bodas',
  },
  {
    id: 'recepcion-salon-colonial',
    title: 'Recepción & Eventos Sociales en Salón',
    subtitle: 'Quito–Píntag · Bodas Civiles & Celebraciones',
    badge: 'Recepción & Sociales',
    badgeClass: 'bg-[#221D1A]/90 text-[#E2C585]',
    image: '/images/hacienda/suite-1.jpg',
    specs: [
      { label: '30 a 90 Pax', icon: 'users' },
      { label: 'Decoración & Menú', icon: 'utensils' },
      { label: 'Hospedaje Opcional', icon: 'bed' },
    ],
    price: '$48',
    unit: '/ invitado',
    serviceType: 'bodas',
  },
];

interface SectionDividerTitleProps {
  title: string;
  theme?: 'dark' | 'light';
  id?: string;
  className?: string;
}

const SectionDividerTitle: React.FC<SectionDividerTitleProps> = ({
  title,
  theme = 'dark',
  id,
  className = '',
}) => {
  const isLight = theme === 'light';
  const lineColor = isLight
    ? 'from-transparent via-[#8C6D3F]/30 to-[#8C6D3F]/80'
    : 'from-transparent via-[#C8A45D]/40 to-[#C8A45D]/90';
  const lineColorRev = isLight
    ? 'from-[#8C6D3F]/80 via-[#8C6D3F]/30 to-transparent'
    : 'from-[#C8A45D]/90 via-[#C8A45D]/40 to-transparent';
  const diamondColor = isLight ? 'bg-[#8C6D3F]' : 'bg-[#C8A45D]';
  const textColor = isLight ? 'text-white' : 'text-[#071912]';

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 w-full py-1 ${className}`}>
      <div className={`flex-1 h-[1px] bg-gradient-to-r ${lineColor}`} />
      <span className={`w-1.5 h-1.5 rotate-45 ${diamondColor} shrink-0 shadow-xs`} />
      <h2
        id={id}
        className={`font-serif-luxury text-[17px] sm:text-[20px] font-semibold ${textColor} text-center tracking-tight px-1 shrink-0 max-w-[82%] leading-snug`}
      >
        {title}
      </h2>
      <span className={`w-1.5 h-1.5 rotate-45 ${diamondColor} shrink-0 shadow-xs`} />
      <div className={`flex-1 h-[1px] bg-gradient-to-r ${lineColorRev}`} />
    </div>
  );
};

export const WeddingsPageMobile: React.FC = () => {
  const { siteConfig, packages, photos, openQuoteModal } = useCMS();
  const { language, isEn } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  const weddingServices = getWeddingServices(isEn);
  const weddingCarouselServices = getWeddingPresets(isEn);

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 160;
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
        className="relative w-full bg-[#F6EFE6] overflow-hidden border-b border-[#E6DDD0]"
      >
        {/* Canvas 16:9 Full Bleed */}
        <div className="relative w-full aspect-[16/9] overflow-hidden flex flex-col justify-start">
          {/* FOTOGRAFÍA DE FONDO: DESPLAZADA 40PX A LA DERECHA */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/hacienda/boda-hero-editorial.jpg"
              alt="Novios en arco floral de Hacienda Le Plus Píntag"
              fetchPriority="high"
              className="absolute inset-0 w-[calc(100%+80px)] -left-10 h-full object-cover object-[72%_center] translate-x-[40px]"
            />

            {/* Sombra suave color crema en el tercio izquierdo para máxima legibilidad del texto */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(246, 239, 230, 0.96) 0%, rgba(246, 239, 230, 0.90) 38%, rgba(246, 239, 230, 0.45) 52%, rgba(246, 239, 230, 0) 68%)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* CONTENIDO EN EL LADO IZQUIERDO: TÍTULO (+50%), BOTÓN COTIZAR Y 3 ICONOS DE MÉTRICAS */}
          <div className="relative z-10 w-full px-4 sm:px-6 pt-[14px] pb-2 flex flex-col justify-start">
            <div className="max-w-[58%] space-y-1.5">
              <ScrollReveal direction="left" delay={60} distance={20}>
                <h1 className="text-[#181512]">
                  <span className="font-serif-luxury block text-[36px] sm:text-[42px] font-bold leading-[0.98] tracking-tight">
                    {isEn ? 'Weddings & Celebrations' : 'Bodas y Celebraciones'}
                  </span>
                  <span className="font-wedding-script inline-flex items-center gap-2 text-[30px] sm:text-[36px] font-medium text-[#8C6D3F] mt-0.5 leading-tight">
                    <span>{isEn ? 'In an Everlasting Story' : 'En una Historia Eterna'}</span>
                    <Heart className="w-4 h-4 text-[#8C6D3F] fill-[#8C6D3F]/25 -rotate-12 shrink-0" />
                  </span>
                </h1>
              </ScrollReveal>

              {/* Botón único de Cotizar */}
              <ScrollReveal direction="up" delay={120} distance={10}>
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'bodas',
                        itemName: isEn ? 'Wedding & Social Event Planning & Quote' : 'Planificación y Cotización de Boda / Evento Social',
                      })
                    }
                    className="inline-flex w-fit items-center justify-center gap-1.5 px-3 h-[20px] rounded-full bg-[#13281F] hover:bg-[#0A1F17] text-[#E2C585] text-xs font-bold leading-none shadow-sm shadow-black/20 transition-all cursor-pointer active:scale-95"
                  >
                    <Search className="w-3 h-3 text-[#E2C585] shrink-0" />
                    <span className="leading-none">{isEn ? 'Quote' : 'Cotizar'}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Fila de iconos: Capacidad, Alojamiento, Felicidad y Respaldo */}
              <ScrollReveal direction="up" delay={160} distance={10}>
                <div className="flex items-center gap-1.5 pt-0.5">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/85 backdrop-blur-xs border border-[#8C6D3F]/30 shadow-2xs">
                    <Users className="w-3 h-3 text-[#8C6D3F] shrink-0" />
                    <div className="leading-tight">
                      <span className="block font-sans-ui text-[10px] font-bold text-[#181512]">300+</span>
                      <span className="block text-[7.5px] text-[#544B42] -mt-0.5">{isEn ? 'Capacity' : 'Capacidad'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/85 backdrop-blur-xs border border-[#8C6D3F]/30 shadow-2xs">
                    <BedDouble className="w-3 h-3 text-[#8C6D3F] shrink-0" />
                    <div className="leading-tight">
                      <span className="block font-sans-ui text-[10px] font-bold text-[#181512]">{isEn ? '14 Rooms' : '14 Suites'}</span>
                      <span className="block text-[7.5px] text-[#544B42] -mt-0.5">{isEn ? 'Lodging' : 'Alojamiento'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white/85 backdrop-blur-xs border border-[#8C6D3F]/30 shadow-2xs">
                    <ShieldCheck className="w-3 h-3 text-[#8C6D3F] shrink-0" />
                    <div className="leading-tight">
                      <span className="block font-sans-ui text-[10px] font-bold text-[#181512]">100%</span>
                      <span className="block text-[7.5px] text-[#544B42] -mt-0.5">{isEn ? 'Support' : 'Respaldo'}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
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
        {/* PARTE A: ENCABEZADO CENTRADO CON DIVISIÓN + CARRUSEL DE 2.5 TARJETAS DE SERVICIOS NUPCIALES */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-5 pb-6">
          {/* Título elegante centrado con diseño de división sin etiqueta ni mensaje */}
          <ScrollReveal direction="zoom-in" delay={40} scale={0.96}>
            <SectionDividerTitle
              id="heading-wedding-services"
              title={isEn ? 'Wedding Services' : 'Servicios Nupciales'}
            />
          </ScrollReveal>

          {/* Carrusel Táctil: 2.5 tarjetas visibles simultáneamente sin botones ni indicadores */}
          <div className="relative pt-3">
            <div
              className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 -mx-4 pb-2 pt-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {weddingServices.map((card, idx) => (
                <div
                  key={card.id || idx}
                  className="w-[38vw] min-w-[136px] max-w-[160px] shrink-0 snap-start"
                >
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'bodas',
                        itemName: card.title,
                      })
                    }
                    className="w-full h-[186px] text-left bg-[#FDFBF8] hover:bg-white border border-[#EBE3D6] hover:border-[#C8A45D]/60 rounded-[16px] p-3 flex flex-col justify-between shadow-[0_4px_16px_rgba(24,21,18,0.04)] active:scale-[0.98] transition-all group cursor-pointer"
                  >
                    <div>
                      {/* Círculo beige con icono lineal */}
                      <div className="w-10 h-10 rounded-full bg-[#F2ECE1] group-hover:bg-[#EAE0D0] flex items-center justify-center mb-2 transition-colors">
                        <ServiceCardIcon type={card.iconType} />
                      </div>

                      <h3 className="font-serif-luxury text-[13px] font-bold text-[#181512] group-hover:text-[#8C6D3F] leading-snug line-clamp-2">
                        {card.title}
                      </h3>

                      <p className="text-[10px] text-[#5A5147] leading-snug line-clamp-2 mt-1">
                        {card.description}
                      </p>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-[#EBE3D6]/80 flex items-center justify-between text-[#8C6D3F]">
                      <span className="text-[9.5px] font-bold truncate">{card.priceTag}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform shrink-0 ml-1" />
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PARTE B: MÁS QUE UN ESCENARIO (TÍTULO PRIMERO, LUEGO IMAGEN, 4 ICONOS HORIZONTALES Y BOTÓN AGENDAR -> WHATSAPP) */}
        <div className="w-full mt-6 pt-5 border-t border-[#E6DDD0] bg-[#FAF7F2] px-4 sm:px-6 pb-6">
          <div className="max-w-4xl mx-auto space-y-3.5">
            {/* 1. TÍTULO CENTRADO CON DISEÑO DE DIVISIÓN SIN ETIQUETA */}
            <ScrollReveal direction="zoom-in" delay={40} scale={0.96}>
              <SectionDividerTitle
                title={isEn ? 'More than a Venue, Wedding Partners' : 'Más que un Escenario, Cómplices de tu Boda'}
              />
            </ScrollReveal>

            {/* 2. FOTOGRAFÍA EDITORIAL DEL ARCO CEREMONIAL */}
            <ScrollReveal direction="up" delay={80}>
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[#E6DDD0] bg-[#EDE5D8]">
                <img
                  src="/images/hacienda/boda-arco-editorial.jpg"
                  alt="Ceremonia de boda al aire libre en Hacienda Le Plus Píntag"
                  className="w-full h-full object-cover object-center"
                />

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(circle at 18% 18%, rgba(250, 247, 242, 0.75) 0%, rgba(250, 247, 242, 0.20) 34%, transparent 60%)',
                  }}
                  aria-hidden="true"
                />

                <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-6 z-10 pointer-events-none select-none -rotate-[8deg]">
                  <p className="font-wedding-script text-2xl sm:text-3xl font-semibold text-[#1E1916] leading-[1.02] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
                    {isEn ? (
                      <>
                        Because every
                        <span className="block ml-3">detail matters...</span>
                      </>
                    ) : (
                      <>
                        Porque cada
                        <span className="block ml-3">detalle importa...</span>
                      </>
                    )}
                  </p>
                  <Heart className="w-4 h-4 text-[#8C6D3F] fill-[#8C6D3F]/40 ml-16 mt-0.5 rotate-6" />
                </div>
              </div>
            </ScrollReveal>

            {/* 3. CUATRO ICONOS CON TÍTULOS EN UNA SOLA FILA HORIZONTAL */}
            <ScrollReveal direction="up" delay={120}>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                    <Heart className="w-4 h-4 text-[#8C6D3F]" />
                  </div>
                  <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                    {isEn ? (
                      <>Personal<br />Care</>
                    ) : (
                      <>Atención<br />Personal</>
                    )}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                    <Sparkles className="w-4 h-4 text-[#8C6D3F]" />
                  </div>
                  <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                    {isEn ? (
                      <>Unique<br />Gardens</>
                    ) : (
                      <>Jardines<br />Únicos</>
                    )}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                    <Utensils className="w-4 h-4 text-[#8C6D3F]" />
                  </div>
                  <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                    {isEn ? (
                      <>In-House<br />Cuisine</>
                    ) : (
                      <>Cocina<br />Propia</>
                    )}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                  <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                    <ShieldCheck className="w-4 h-4 text-[#8C6D3F]" />
                  </div>
                  <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                    {isEn ? (
                      <>Zero<br />Stress</>
                    ) : (
                      <>Cero<br />Estrés</>
                    )}
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. BOTÓN ÚNICO DE AGENDAR VISITA (CONECTADO DIRECTAMENTE A WHATSAPP) */}
            <ScrollReveal direction="up" delay={160}>
              <div className="pt-2 flex justify-center">
                <a
                  href={buildContextualWhatsAppUrl('bodas')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{isEn ? 'Schedule Tour' : 'Agendar Visita'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D]" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 3: MÁS QUE UN ESPACIO, TU BODA SOÑADA (RÉPLICA EXACTA DE LA SECCIÓN ANTERIOR)
      ====================================================================== */}
      <section className="w-full mt-2 pt-5 border-t border-[#E6DDD0] bg-[#FAF7F2] px-4 sm:px-6 pb-6">
        <div className="max-w-4xl mx-auto space-y-3.5">
          {/* 1. TÍTULO CENTRADO CON DISEÑO DE DIVISIÓN */}
          <ScrollReveal direction="zoom-in" delay={40} scale={0.96}>
            <SectionDividerTitle
              title={isEn ? 'More Than a Venue, Your Dream Wedding' : 'Más Que Un Espacio, Tu Boda Soñada'}
            />
          </ScrollReveal>

          {/* 2. FOTOGRAFÍA EDITORIAL DE SUITE Y LOUNGE NUPCIAL */}
          <ScrollReveal direction="up" delay={80}>
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-[#E6DDD0] bg-[#EDE5D8]">
              <img
                src="/images/hacienda/boda-suite-lounge.jpg"
                alt="Lounge y Suite Nupcial con ventanales hacia los jardines de Hacienda Le Plus en Píntag"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />

              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 18% 18%, rgba(250, 247, 242, 0.75) 0%, rgba(250, 247, 242, 0.20) 34%, transparent 60%)',
                }}
                aria-hidden="true"
              />

              <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-6 z-10 pointer-events-none select-none -rotate-[7deg]">
                <p className="font-wedding-script text-2xl sm:text-3xl font-semibold text-[#1E1916] leading-[1.02] drop-shadow-[0_1px_6px_rgba(255,255,255,0.9)]">
                  {isEn ? (
                    <>
                      Your dream day
                      <span className="block ml-3">in every corner...</span>
                    </>
                  ) : (
                    <>
                      Tu día soñado
                      <span className="block ml-3">en cada espacio...</span>
                    </>
                  )}
                </p>
                <Sparkles className="w-4 h-4 text-[#8C6D3F] ml-16 mt-0.5 rotate-6" />
              </div>
            </div>
          </ScrollReveal>

          {/* 3. CUATRO ICONOS CON TÍTULOS EN UNA SOLA FILA HORIZONTAL */}
          <ScrollReveal direction="up" delay={120}>
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                  <Sparkles className="w-4 h-4 text-[#8C6D3F]" />
                </div>
                <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                  {isEn ? (
                    <>Setups &amp;<br />Gala Tent</>
                  ) : (
                    <>Montajes &amp;<br />Carpa Gala</>
                  )}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                  <Wine className="w-4 h-4 text-[#8C6D3F]" />
                </div>
                <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                  {isEn ? (
                    <>Free<br />Corkage</>
                  ) : (
                    <>Descorche<br />Libre</>
                  )}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                  <Heart className="w-4 h-4 text-[#8C6D3F]" />
                </div>
                <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                  {isEn ? (
                    <>Expert<br />Advisory</>
                  ) : (
                    <>Asesoría<br />Experta</>
                  )}
                </span>
              </div>

              <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#E6DDD0] shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-[#F2ECE1] text-[#8C6D3F] flex items-center justify-center mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#8C6D3F]" />
                </div>
                <span className="text-[9.5px] font-bold text-[#181512] leading-tight">
                  {isEn ? (
                    <>Happy<br />Weddings</>
                  ) : (
                    <>Bodas<br />Felices</>
                  )}
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* 4. BOTÓN ÚNICO DE PLANIFICAR BODA (CONECTADO DIRECTAMENTE A WHATSAPP) */}
          <ScrollReveal direction="up" delay={160}>
            <div className="pt-2 flex justify-center">
              <a
                href={buildContextualWhatsAppUrl('bodas')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-xs font-bold shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{isEn ? 'Plan My Wedding' : 'Planificar mi Boda'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C8A45D]" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 4: CARRUSEL DE SERVICIOS NUPCIALES (2.5 TARJETAS, TÍTULO IZQUIERDA, FLECHAS DERECHA)
      ====================================================================== */}
      <section className="w-full bg-[#F9F5EE] py-5 border-t border-b border-[#E6DDD0] overflow-hidden">
        <div className="w-full space-y-2">
          {/* ENCABEZADO: TÍTULO A LA IZQUIERDA Y BOTONES DE DESPLAZAMIENTO AL MARGEN DERECHO */}
          <div className="flex items-center justify-between px-4 sm:px-6">
            <h2 className="font-serif-luxury text-[18px] sm:text-[21px] font-bold text-[#181512] leading-tight text-left">
              {isEn ? 'Wedding Services & Packages' : 'Servicios & Paquetes Nupciales'}
            </h2>

            {/* Controles de Navegación del Carrusel al Margen Derecho */}
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label={isEn ? 'Scroll left' : 'Desplazar hacia la izquierda'}
                className="w-8 h-8 rounded-full border border-[#D5C7B2] bg-white hover:bg-[#FAF7F2] text-[#181512] flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#3D352E]" />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label={isEn ? 'Scroll right' : 'Desplazar hacia la derecha'}
                className="w-8 h-8 rounded-full border border-[#D5C7B2] bg-white hover:bg-[#FAF7F2] text-[#181512] flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-[#3D352E]" />
              </button>
            </div>
          </div>

          {/* CONTENEDOR DEL CARRUSEL: ALINEADO EXACTAMENTE CON EL TÍTULO */}
          <div
            ref={carouselRef}
            className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-6 scroll-pl-4 sm:scroll-pl-6 pb-2 pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {weddingCarouselServices.map((card) => {
              return (
                <div
                  key={card.id}
                  className="w-[38vw] min-w-[136px] max-w-[160px] shrink-0 snap-start rounded-xl bg-[#FAF7F2] border border-[#E6DDD0] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  {/* IMAGEN DE LA TARJETA: OCUPA TODO EL ANCHO DEL CONTENEDOR SIN CORAZÓN */}
                  <div className="relative w-full aspect-[4/3] bg-[#EDE5D8] overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block"
                      loading="lazy"
                    />

                    <span
                      className={`absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded text-[8.5px] font-bold ${card.badgeClass} backdrop-blur-xs shadow-xs`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* CUERPO: TÍTULO, UBICACIÓN Y SPECS */}
                  <div className="p-2 sm:p-2.5 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif-luxury text-xs font-bold text-[#181512] line-clamp-1 leading-snug">
                        {card.title}
                      </h3>

                      <div className="flex items-center gap-1 text-[9.5px] text-[#5A5147] mt-0.5">
                        <MapPin className="w-2.5 h-2.5 text-[#8C6D3F] shrink-0" />
                        <span className="truncate">{card.subtitle}</span>
                      </div>

                      <div className="mt-1.5 pt-1 border-t border-[#EBE3D6]/70 flex items-center gap-1 text-[9px] text-[#6E6357] truncate">
                        <Users className="w-2.5 h-2.5 text-[#8C6D3F] shrink-0" />
                        <span className="truncate">{card.specs[0]?.label || '80-300 pax'}</span>
                      </div>
                    </div>

                    {/* PRECIO Y BOTÓN "VER" REDUCIDO A 2PX ALREDEDOR DE LA PALABRA */}
                    <div className="mt-2 pt-1.5 border-t border-[#EBE3D6]/80 flex items-center justify-between text-[#8C6D3F]">
                      <div>
                        <span className="text-[10.5px] font-bold text-[#181512]">
                          {card.price}
                        </span>
                        <span className="text-[8.5px] text-[#7A6A58] block -mt-0.5">
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
                        className="rounded-[3px] bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-[9px] font-bold shadow-2xs active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center shrink-0 min-h-0"
                        style={{
                          height: '13px',
                          minHeight: '13px',
                          maxHeight: '13px',
                          padding: '0 5px',
                          lineHeight: '1',
                        }}
                      >
                        <span className="leading-none block" style={{ transform: 'translateY(-0.5px)' }}>{isEn ? 'View' : 'Ver'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 5: CANVAS 16:9 CON TEXTO +50%, ESPACIO COMPACTO Y 10PX DEBAJO DE LA BARRA MÓVIL
      ====================================================================== */}
      <section className="relative w-full bg-[#CCD6C4] border-t border-[#B8C4AF] overflow-hidden mb-[calc(38px+env(safe-area-inset-bottom,0px))]">
        <div className="relative w-full aspect-[16/9] min-h-[210px] overflow-hidden flex flex-col justify-between">
          {/* FOTOGRAFÍA DE FONDO CON DEGRADADO SUAVE */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/hacienda/boda-banner-gastronomia.jpg"
              alt="Banquete de bodas y gastronomía en Hacienda Le Plus Píntag"
              className="absolute inset-0 w-full h-full object-cover object-right"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(204, 214, 196, 0.98) 0%, rgba(204, 214, 196, 0.94) 54%, rgba(204, 214, 196, 0.50) 74%, rgba(204, 214, 196, 0.15) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* CONTENIDO EN EL LADO IZQUIERDO: TEXTO +50%, ESPACIOS COMPACTADOS Y 3 ICONOS */}
          <div className="relative z-10 w-full h-full px-4 pt-3 pb-2.5 sm:px-6 sm:pt-4 sm:pb-3 flex flex-col justify-between max-w-[76%] sm:max-w-[68%]">
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-[19px] sm:text-[23px] font-bold text-[#172414] leading-[1.08] text-left">
                {isEn ? 'Schedule Your Tour & Quote' : 'Agenda tu Visita Nupcial & Cotiza tu Boda'}
              </h2>
              <p className="text-[13px] sm:text-[14px] text-[#2F3E2C] leading-snug line-clamp-2 text-left">
                {isEn
                  ? 'Let us explore the gardens, halls, and suites together in Píntag with signature dining and a team devoted to your wedding.'
                  : 'Recorramos juntos los jardines, salones y suites en Píntag con gastronomía de autor y un equipo comprometido con tu boda.'}
              </p>
            </div>

            {/* BOTÓN ÚNICO (CONECTADO DIRECTAMENTE A WHATSAPP) */}
            <div className="pt-0.5">
              <a
                href={buildContextualWhatsAppUrl('bodas')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#2D4029] hover:bg-[#1E2E1B] text-[#FAF7F2] text-[12px] sm:text-[13px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <span>{isEn ? 'Request Proposal' : 'Solicitar Propuesta'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D8E6CF]" />
              </a>
            </div>

            {/* 3 ICONOS LINEALES DEBAJO CON TEXTO +50% (DESPLAZADOS 5PX HACIA ARRIBA) */}
            <div className="flex items-center gap-2.5 sm:gap-4 -translate-y-[5px]">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#2D4029]/15 text-[#2D4029] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 28 28" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M3 21L9.5 9L14 17L18.5 8L25 21H3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10.5px] sm:text-[11.5px] font-bold text-[#2C3D28] leading-tight">
                  {isEn ? 'Volcano Views' : 'Vistas a Volcanes'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#2D4029]/15 text-[#2D4029] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 28 28" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M14 5L24 20H4L14 5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[10.5px] sm:text-[11.5px] font-bold text-[#2C3D28] leading-tight">
                  {isEn ? 'Gala Marquee' : 'Carpa de Gala'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full bg-[#2D4029]/15 text-[#2D4029] flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 28 28" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                    <path d="M8 6H20L14 14L8 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M14 14V22" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </div>
                <span className="text-[10.5px] sm:text-[11.5px] font-bold text-[#2C3D28] leading-tight">
                  {isEn ? 'Free Corkage' : 'Descorche Libre'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export { WeddingsPageMobile as WeddingsPage };
export default WeddingsPageMobile;
