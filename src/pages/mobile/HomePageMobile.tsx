import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Utensils,
  BedDouble,
  MapPin,
  Play,
  Building2,
  HeartHandshake,
  Search,
  Waves,
  Wifi,
  Leaf,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  Send,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import { useDocumentMeta } from '../../utils/seo';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import {
  getHeroStopCards,
  getSection2Cards,
  getPortfolioServices,
  getClientReviews,
  ClientReviewItem,
} from '../../data/resortSpaces';

/* ============================================================================
   REAL-TIME VIEWPORT SCROLL REVEAL (ENTRANCE & EXIT ON SCROLL DOWN / UP)
   Uses a static outer layout wrapper + inner hardware-accelerated layer so
   bounding-box coordinates never shift during animation and transitions happen
   visibly inside the active viewing zone.
   ============================================================================ */
type RevealDirection =
  | 'up'
  | 'down'
  | 'left'
  | 'right'
  | 'up-left'
  | 'up-right'
  | 'down-left'
  | 'down-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'tilt-left'
  | 'tilt-right'
  | 'blur-up';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  className?: string;
  innerClassName?: string;
  style?: React.CSSProperties;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 900,
  distance = 85,
  scale = 0.85,
  className = '',
  innerClassName = '',
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [exitSide, setExitSide] = useState<'top' | 'bottom'>('bottom');
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let rafId: number | null = null;

    const evaluatePosition = () => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight;
      const nearPageBottom = vh + scrollY >= docHeight - 48;

      // Active visible zone inside the screen so user clearly sees both entrance and exit:
      // - Enters when element top rises above 85% of viewport height (or 96% if at very bottom of page)
      // - Exits at top when element bottom rises above 16% of viewport height (below navbar)
      const bottomEnterLine = nearPageBottom ? vh * 0.96 : vh * 0.85;
      const bottomExitLine = vh * 0.89;
      const topExitLine = scrollY > 70 ? vh * 0.16 : 10;
      const topEnterLine = scrollY > 70 ? vh * 0.19 : 15;

      // For taller containers (e.g. > 380px), allow staying visible while middle of container is in view
      const effectiveBottom = Math.max(rect.bottom, rect.top + Math.min(rect.height, 260));

      if (!isVisibleRef.current) {
        if (rect.top <= bottomEnterLine && effectiveBottom >= topEnterLine) {
          isVisibleRef.current = true;
          setIsVisible(true);
        } else {
          setExitSide(rect.top < vh * 0.45 ? 'top' : 'bottom');
        }
      } else {
        if (scrollY > 70 && effectiveBottom < topExitLine) {
          isVisibleRef.current = false;
          setExitSide('top');
          setIsVisible(false);
        } else if (rect.top > bottomExitLine && !nearPageBottom) {
          isVisibleRef.current = false;
          setExitSide('bottom');
          setIsVisible(false);
        }
      }
    };

    const onScrollOrResize = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        evaluatePosition();
      });
    };

    // Initial check after first paint so entrance animations play visibly
    const initTimer = window.setTimeout(() => {
      evaluatePosition();
    }, 45);

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    return () => {
      window.clearTimeout(initTimer);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, []);

  const getHiddenTransform = (): string => {
    const vSign = exitSide === 'top' ? -0.85 : 1;
    switch (direction) {
      case 'up':
        return `translate3d(0, ${distance * vSign}px, 0) scale(0.92)`;
      case 'down':
        return `translate3d(0, ${-distance * vSign}px, 0) scale(0.92)`;
      case 'left':
        return `translate3d(${-distance}px, ${18 * vSign}px, 0) scale(0.92)`;
      case 'right':
        return `translate3d(${distance}px, ${18 * vSign}px, 0) scale(0.92)`;
      case 'up-left':
        return `translate3d(${-distance * 0.9}px, ${distance * 0.75 * vSign}px, 0) scale(0.88)`;
      case 'up-right':
        return `translate3d(${distance * 0.9}px, ${distance * 0.75 * vSign}px, 0) scale(0.88)`;
      case 'down-left':
        return `translate3d(${-distance * 0.85}px, ${-distance * 0.7 * vSign}px, 0) scale(0.88)`;
      case 'down-right':
        return `translate3d(${distance * 0.85}px, ${-distance * 0.7 * vSign}px, 0) scale(0.88)`;
      case 'zoom-in':
        return `translate3d(0, ${32 * vSign}px, 0) scale(${scale})`;
      case 'zoom-out':
        return `translate3d(0, ${24 * vSign}px, 0) scale(1.14)`;
      case 'tilt-left':
        return `translate3d(${-distance * 0.85}px, ${38 * vSign}px, 0) rotate(${-6 * vSign}deg) scale(0.88)`;
      case 'tilt-right':
        return `translate3d(${distance * 0.85}px, ${38 * vSign}px, 0) rotate(${6 * vSign}deg) scale(0.88)`;
      case 'blur-up':
        return `translate3d(0, ${distance * vSign}px, 0) scale(0.9)`;
      default:
        return `translate3d(0, ${distance * vSign}px, 0) scale(0.92)`;
    }
  };

  const revealStyles: React.CSSProperties = {
    ...style,
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1) rotate(0deg)' : getHiddenTransform(),
    filter: isVisible ? 'blur(0px)' : 'blur(6px)',
    transitionProperty: 'transform, opacity, filter',
    transitionDuration: isVisible ? `${duration}ms` : '520ms',
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
    transitionTimingFunction: isVisible
      ? 'cubic-bezier(0.16, 1, 0.3, 1)'
      : 'cubic-bezier(0.4, 0, 0.2, 1)',
  };

  return (
    <div ref={wrapperRef} className={className}>
      <div className={`will-change-reveal ${innerClassName}`} style={revealStyles}>
        {children}
      </div>
    </div>
  );
};



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
    ? 'from-transparent via-[#A3C468]/30 to-[#A3C468]/80'
    : 'from-transparent via-[#C8A45D]/40 to-[#C8A45D]/90';
  const lineColorRev = isLight
    ? 'from-[#A3C468]/80 via-[#A3C468]/30 to-transparent'
    : 'from-[#C8A45D]/90 via-[#C8A45D]/40 to-transparent';
  const diamondColor = isLight ? 'bg-[#A3C468]' : 'bg-[#C8A45D]';
  const textColor = isLight ? 'text-white' : 'text-[#071912]';

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 w-full py-1 ${className}`}>
      <div className={`flex-1 h-[1px] bg-gradient-to-r ${lineColor}`} />
      <span className={`w-1.5 h-1.5 rotate-45 ${diamondColor} shrink-0 shadow-xs`} />
      <h2
        id={id}
        className={`font-serif-luxury text-[18px] sm:text-[21px] font-semibold ${textColor} text-center tracking-tight px-1 shrink-0 max-w-[78%] leading-snug`}
      >
        {title}
      </h2>
      <span className={`w-1.5 h-1.5 rotate-45 ${diamondColor} shrink-0 shadow-xs`} />
      <div className={`flex-1 h-[1px] bg-gradient-to-r ${lineColorRev}`} />
    </div>
  );
};

export const HomePageMobile: React.FC = () => {
  const { siteConfig, packages, openQuoteModal } = useCMS();
  const { language, isEn, t } = useLanguage();

  const heroStopCards = getHeroStopCards(isEn);
  const mainServicesCards = getSection2Cards(isEn);
  const portfolioServices = getPortfolioServices(isEn);

  useDocumentMeta({
    title: 'Hacienda Le Plus | Hospedaje de larga estadía, grandes eventos y bodas en Quito–Píntag',
    title_en: 'Hacienda Le Plus | Corporate Long-Stays, Major Events & Weddings in Quito–Píntag',
    description:
      'Presentación de Hacienda Le Plus en Quito–Píntag: prioridad comercial en hospedaje de larga estadía para empresas y grupos, grandes eventos corporativos y bodas. Cotizaciones al WhatsApp 0969817891.',
    description_en:
      'Hacienda Le Plus in Quito–Píntag: commercial priority in long-stay lodging for corporate groups, major events and weddings. Inquiries via WhatsApp +593 96 981 7891.',
    canonicalPath: '/',
    lang: language,
  });

  // Estado y ref para el Carrusel Táctil de Servicios Principales
  const servicesCarouselRef = useRef<HTMLDivElement>(null);
  const [activeServiceCardIndex, setActiveServiceCardIndex] = useState(0);

  const handleServicesScroll = () => {
    if (!servicesCarouselRef.current) return;
    const { scrollLeft } = servicesCarouselRef.current;
    const cardStep = 150;
    const newIndex = Math.round(scrollLeft / cardStep);
    setActiveServiceCardIndex(Math.min(Math.max(newIndex, 0), mainServicesCards.length - 1));
  };

  const handlePrevServiceCard = () => {
    if (servicesCarouselRef.current) {
      servicesCarouselRef.current.scrollBy({ left: -160, behavior: 'smooth' });
    }
  };

  const handleNextServiceCard = () => {
    if (servicesCarouselRef.current) {
      servicesCarouselRef.current.scrollBy({ left: 160, behavior: 'smooth' });
    }
  };

  // Estado y transiciones de entrada/salida de la tarjeta Hero
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [heroCardTransition, setHeroCardTransition] = useState<'visible' | 'exiting'>('visible');
  const [videoEnabled, setVideoEnabled] = useState(false);

  // Estado y transiciones de entrada/salida del Portafolio de 3 columnas
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState(0);
  const [portfolioTransition, setPortfolioTransition] = useState<'visible' | 'exiting'>('visible');
  const [portfolioDir, setPortfolioDir] = useState<'up' | 'down'>('down');

  // Estado y transiciones de entrada/salida del carrusel de reseñas de clientes
  const [userReviews, setUserReviews] = useState<ClientReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('hacienda_leplus_client_reviews_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].avatarUrl) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });
  const defaultReviews = getClientReviews(isEn);
  const reviews = isEn ? defaultReviews : userReviews.length > 0 ? [...userReviews, ...defaultReviews] : defaultReviews;

  const [reviewStartIndex, setReviewStartIndex] = useState(0);
  const [reviewTransition, setReviewTransition] = useState<'visible' | 'exiting-left' | 'exiting-right'>('visible');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('Bodas & Recepciones');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

  // Transición suave de entrada/salida al cambiar el ambiente en Hero
  const handleSelectHeroStop = (nextIdx: number) => {
    if (nextIdx === activeCardIndex || heroCardTransition !== 'visible') return;
    setHeroCardTransition('exiting');
    setTimeout(() => {
      setActiveCardIndex(nextIdx);
      setHeroCardTransition('visible');
    }, 180);
  };

  const handleNextStop = () => {
    const nextIdx = (activeCardIndex + 1) % heroStopCards.length;
    handleSelectHeroStop(nextIdx);
  };

  // Transición suave de entrada/salida al cambiar de servicio en la Sección 3
  const handleSelectPortfolioService = (nextIdx: number) => {
    if (nextIdx === selectedPortfolioIndex || portfolioTransition !== 'visible') return;
    setPortfolioDir(nextIdx > selectedPortfolioIndex ? 'down' : 'up');
    setPortfolioTransition('exiting');
    setTimeout(() => {
      setSelectedPortfolioIndex(nextIdx);
      setPortfolioTransition('visible');
    }, 170);
  };

  // Transición suave de entrada/salida al navegar el carrusel de reseñas en la Sección 4
  const handleNextReviews = () => {
    if (reviewTransition !== 'visible') return;
    setReviewTransition('exiting-left');
    setTimeout(() => {
      setReviewStartIndex((prev) => (prev + 1) % reviews.length);
      setReviewTransition('visible');
    }, 170);
  };

  const handlePrevReviews = () => {
    if (reviewTransition !== 'visible') return;
    setReviewTransition('exiting-right');
    setTimeout(() => {
      setReviewStartIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setReviewTransition('visible');
    }, 170);
  };

  const handleDotSelectReview = (dotIdx: number) => {
    if (dotIdx === reviewStartIndex || reviewTransition !== 'visible') return;
    setReviewTransition(dotIdx > reviewStartIndex ? 'exiting-left' : 'exiting-right');
    setTimeout(() => {
      setReviewStartIndex(dotIdx);
      setReviewTransition('visible');
    }, 170);
  };

  const visibleReviews = Array.from({ length: 5 }, (_, i) => reviews[(reviewStartIndex + i) % reviews.length]);

  const handleAddClientReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const avatarMap: Record<string, string> = {
      'Bodas & Recepciones': '/images/avatars/sofia-sebastian.jpg',
      'Corporativo & GADs': '/images/avatars/gad-pichincha.jpg',
      'Delegación ONG / HXP': '/images/avatars/mision-hxp.jpg',
      'Suites & Zona Húmeda': '/images/avatars/familia-andrade.jpg',
      'Gastronomía & Eventos': '/images/avatars/valeria-mateo.jpg',
    };

    const created: ClientReviewItem = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      role: newReviewRole,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      avatarUrl: avatarMap[newReviewRole] || '/images/avatars/dr-carlos.jpg',
    };

    const updated = [created, ...userReviews];
    setUserReviews(updated);
    setReviewStartIndex(0);
    try {
      localStorage.setItem('hacienda_leplus_client_reviews_v1', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }

    setReviewSubmittedSuccess(true);
    setTimeout(() => {
      setReviewSubmittedSuccess(false);
      setIsReviewModalOpen(false);
      setNewReviewAuthor('');
      setNewReviewComment('');
      setNewReviewRating(5);
    }, 1100);
  };

  const currentStop = heroStopCards[activeCardIndex] || heroStopCards[0];

  const activePortfolioService =
    portfolioServices[selectedPortfolioIndex] || portfolioServices[0];

  return (
    <main className="overflow-hidden bg-[#FAF7F2]">
      {/* =====================================================================
          SECCIÓN 1: PORTADA PRINCIPAL — MÁSCARAS SVG EXACTAS PIXEL A PIXEL
          SEGÚN REFERENCIA TIDEPOST + FOTOS REALES HACIENDA LE PLUS
      ====================================================================== */}
      <section
        aria-label="Portada Principal Hacienda Le Plus"
        className="relative bg-[#06150F] overflow-hidden w-full"
      >
        {/* SVG ClipPath Definition for the Organic Arched Floating Card */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="tidepost-card-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.11 C 0,0.045 0.044,0.038 0.118,0.032 C 0.314,0.013 0.461,-0.004 0.657,0.002 C 0.804,0.007 0.902,0.015 0.946,0.026 C 0.985,0.038 1,0.07 1,0.133 L 1,0.885 C 1,0.962 0.955,1 0.882,1 L 0.118,1 C 0.045,1 0,0.962 0,0.885 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Hero Full-Bleed Canvas: Estrictamente 16:9 para vista móvil sin zoom */}
        <div className="relative w-full aspect-[16/9] flex flex-col justify-start overflow-hidden">
          {/* FOTOGRAFÍA DE FONDO REAL: 100% FLUIDA TOPANDO EL ANCHO DE LA VENTANA EN 16:9 EXACTO */}
          <div className="absolute inset-0 z-0 w-full h-full overflow-hidden">
            {heroStopCards.map((stop, idx) => {
              const isActive = idx === activeCardIndex;
              return (
                <img
                  key={stop.id}
                  src={stop.bgImage}
                  alt={stop.title}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ease-out ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-100 pointer-events-none'
                  }`}
                />
              );
            })}
            {videoEnabled && siteConfig.heroVideoUrl && (
              <video
                key={siteConfig.heroVideoUrl}
                autoPlay
                muted
                loop
                playsInline
                poster={currentStop.bgImage}
                className="absolute inset-0 w-full h-full object-cover opacity-75 transition-opacity duration-700"
              >
                <source src={siteConfig.heroVideoUrl} type="video/mp4" />
              </video>
            )}

            {/* Gradiente cinematográfico: oscurece el lado izquierdo para máxima legibilidad del texto sin tapar la hacienda a la derecha */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#06150F]/90 via-[#06150F]/45 to-transparent z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#06150F]/70 via-transparent to-black/15 z-[1]" />
          </div>

          {/* 3. MAIN CONTENT: Título + Botón Cotizar a la izquierda (máx. 50%) y Logo oficial a la derecha */}
          <div className="relative z-10 w-full px-4 sm:px-8 pt-[20px] pb-3 flex items-start justify-between">
            <div className="max-w-[50%] space-y-1.5">
              <ScrollReveal direction="left" delay={60} distance={20}>
                <h1 className="font-serif-luxury text-[36px] sm:text-[40px] font-bold text-white leading-[0.98] tracking-tight">
                  {isEn ? (
                    <>
                      Long Stays <br />
                      <span className="text-[#E5C98B] italic font-normal">&amp; Major Events</span>
                    </>
                  ) : (
                    <>
                      Larga Estadía <br />
                      <span className="text-[#E5C98B] italic font-normal">&amp; Grandes Eventos</span>
                    </>
                  )}
                </h1>
              </ScrollReveal>

              {/* Botón Cotizar: Contenedor reducido verticalmente en 5px (de 24px a 19px) sin alterar tamaño de texto */}
              <ScrollReveal direction="up" delay={120} distance={10}>
                <div>
                  <button
                    type="button"
                    onClick={() => openQuoteModal({ serviceType: currentStop.serviceType })}
                    className="inline-flex w-fit items-center justify-center gap-1.5 px-3 h-[19px] rounded-full bg-[#E5C98B] hover:bg-[#C8A45D] text-[#06150F] text-xs font-bold leading-none shadow-sm shadow-black/30 transition-all cursor-pointer active:scale-95"
                  >
                    <Search className="w-3 h-3 text-[#06150F]/80 shrink-0" />
                    <span className="leading-none">{isEn ? 'Quote' : 'Cotizar'}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </button>
                </div>
              </ScrollReveal>
            </div>

            {/* Logo Oficial de la Hacienda en el lado derecho (Aumentado en 50px de 64px a 114px) */}
            <div className="shrink-0 pl-2">
              <ScrollReveal direction="right" delay={100} distance={15}>
                <Link
                  to="/"
                  className="block focus:outline-none active:scale-95 transition-transform"
                  aria-label="Hacienda Le Plus Inicio"
                >
                  <img
                    src="/logo-leplus.png"
                    alt="Logo Oficial Hacienda Le Plus"
                    className="w-[114px] h-[114px] sm:w-[130px] sm:h-[130px] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)]"
                  />
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Transición suave hacia la Sección 2 en móvil */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 w-full h-4 sm:h-6 bg-gradient-to-b from-transparent to-[#FAF7F2]" />
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 2: ACCESO DIRECTO A LOS 3 SERVICIOS PRINCIPALES (A 15PX DE SECCIÓN 1)
      ====================================================================== */}
      <section
        id="rutas-comerciales"
        aria-labelledby="heading-rutas"
        className="pt-[15px] pb-10 bg-[#FAF7F2] text-[#0A1F17]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-[15px]">
          {/* 1. CARRUSEL DE SERVICIOS PRINCIPALES CON TÍTULO "NUESTROS SERVICIOS" Y BOTONES DE DESPLAZAMIENTO */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <ScrollReveal direction="left" delay={40} distance={20}>
                <h3 className="font-sans-ui text-lg sm:text-xl font-extrabold text-[#071912] tracking-tight">
                  {isEn ? 'Our Services' : 'Nuestros Servicios'}
                </h3>
              </ScrollReveal>

              {/* Botones de desplazamiento al margen derecho */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevServiceCard}
                  aria-label={isEn ? 'Previous service' : 'Servicio anterior'}
                  className="w-7 h-7 rounded-full bg-[#EAE2D5] hover:bg-[#D8CDBC] active:scale-90 flex items-center justify-center text-[#071912] transition-all shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextServiceCard}
                  aria-label={isEn ? 'Next service' : 'Servicio siguiente'}
                  className="w-7 h-7 rounded-full bg-[#EAE2D5] hover:bg-[#D8CDBC] active:scale-90 flex items-center justify-center text-[#071912] transition-all shadow-2xs cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Carrusel Táctil: 2.5 tarjetas visibles simultáneamente sin botones ni indicadores */}
            <div className="relative pt-1">
              <div
                ref={servicesCarouselRef}
                onScroll={handleServicesScroll}
                className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 -mx-4 pb-1.5 pt-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {mainServicesCards.map((card, i) => (
                  <div
                    key={i}
                    className="w-[38vw] min-w-[136px] max-w-[160px] shrink-0 snap-start"
                  >
                    <Link
                      to={card.link}
                      className="group relative flex flex-col h-full rounded-[18px] overflow-hidden bg-[#F5EFE6] shadow-[0_4px_16px_rgba(7,25,18,0.06)] active:scale-[0.98] transition-all duration-300 border border-[#0A1F17]/5"
                    >
                      {/* Top Photo Area */}
                      <div className="relative h-[96px] sm:h-[110px] w-full overflow-hidden bg-[#071912]/10">
                        <img
                          src={card.img}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Insignia / Badge sobre la foto */}
                        <div className="absolute top-1.5 left-1.5 z-10">
                          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[8.5px] font-bold tracking-wide bg-[#071912]/80 backdrop-blur-md text-[#FAF7F2] border border-[#C8A45D]/40 shadow-xs">
                            {card.badge}
                          </span>
                        </div>
                      </div>

                      {/* Bloque descriptivo inferior */}
                      <div className="relative z-20 bg-[#F5EFE6] p-2.5 rounded-b-[18px] flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-sans-ui text-[12px] sm:text-[13px] font-extrabold text-[#0B1320] leading-snug tracking-tight group-hover:text-[#D97236] transition-colors line-clamp-2">
                            {card.title}
                          </h4>
                          <p className="text-[10px] sm:text-[11px] text-[#0B1320]/65 line-clamp-2 mt-1 leading-[1.3] font-normal">
                            {card.desc}
                          </p>
                        </div>

                        {/* Enlace y botón flecha */}
                        <div className="mt-2 pt-1.5 border-t border-[#071912]/8 flex items-center justify-between">
                          <span className="text-[9px] font-bold text-[#C88242] uppercase tracking-wider">
                            {isEn ? 'Explore' : 'Explorar'}
                          </span>
                          <div className="w-5 h-5 rounded-full bg-[#FAF7F2] shadow-xs border border-white flex items-center justify-center shrink-0 group-hover:bg-[#C8A45D] transition-all">
                            <ArrowRight className="w-2.5 h-2.5 text-[#C88242] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =====================================================================
              SECCIÓN 3: INSTALACIONES EXCLUSIVAS (TÍTULO ELEGANTE PRIMERO, 4 ICONOS HORIZONTALES, LUEGO FOTOS)
          ====================================================================== */}
          <div className="space-y-4">
            {/* 1. TÍTULO CENTRADO CON DISEÑO DE DIVISIÓN */}
            <ScrollReveal direction="zoom-in" delay={50} scale={0.96}>
              <SectionDividerTitle
                id="heading-rutas"
                title={isEn ? 'Exclusive Facilities' : 'Instalaciones Exclusivas'}
              />
            </ScrollReveal>

            {/* 2. CUATRO ICONOS HORIZONTALES UNO AL LADO DEL OTRO */}
            <div className="grid grid-cols-4 gap-2 pt-1 pb-1">
              <ScrollReveal direction="up" delay={80} distance={20}>
                <Link
                  to="/hospedaje"
                  className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#0A1F17]/10 shadow-xs hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-1">
                    <BedDouble className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">
                    {isEn ? '14 Rooms' : '14 Hab.'}
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={130} distance={20}>
                <Link
                  to="/corporativo"
                  className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#0A1F17]/10 shadow-xs hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-1">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">
                    {isEn ? 'Fiber & Hall' : 'Fibra & Salón'}
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180} distance={20}>
                <Link
                  to="/hospedaje"
                  className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#0A1F17]/10 shadow-xs hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-1">
                    <Utensils className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">
                    {isEn ? 'Restaurant' : 'Restaurante'}
                  </span>
                </Link>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={230} distance={20}>
                <Link
                  to="/corporativo"
                  className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-white border border-[#0A1F17]/10 shadow-xs hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-1">
                    <Waves className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">
                    {isEn ? 'Pool' : 'Piscina'}
                  </span>
                </Link>
              </ScrollReveal>
            </div>

            {/* 3. COLLAGE FOTOGRÁFICO DE INSTALACIONES */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <ScrollReveal direction="tilt-left" delay={40} distance={40}>
                <div className="rounded-2xl overflow-hidden shadow-md border border-[#0A1F17]/10 h-36 sm:h-44 -rotate-1 group">
                  <img
                    src="/images/hacienda/cabana-exterior.jpg"
                    alt="Instalaciones de Hospedaje en Hacienda Le Plus"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="tilt-right" delay={120} distance={40}>
                <div className="rounded-2xl overflow-hidden shadow-md border border-[#0A1F17]/10 h-36 sm:h-44 translate-y-2 rotate-1 group">
                  <img
                    src="/images/hacienda/piscina-aerea.jpg"
                    alt="Piscina de 14x6m y dos hidromasajes como complemento"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={180} distance={40} className="col-span-2">
                <div className="rounded-2xl overflow-hidden shadow-lg border border-[#0A1F17]/10 h-40 sm:h-48 mt-1 group">
                  <img
                    src="/images/hacienda/jardines-teambuilding.jpg"
                    alt="Jardines y Carpas para Grandes Eventos y Larga Estadía"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 4: HOSPEDAJE LARGA ESTADÍA & PORTAFOLIO DE SERVICIOS
          (TÍTULO PRIMERO, 7 OPCIONES HORIZONTALES, IMAGEN FULL-BLEED, DETALLES Y COTIZAR)
      ====================================================================== */}
      <section
        aria-labelledby="heading-vitrina"
        className="bg-[#F4EFE6] text-[#141413] border-y border-[#071912]/10 overflow-hidden py-8 space-y-4"
      >
        {/* 1. TÍTULO Y SELECTOR DE 7 OPCIONES (Con padding estándar) */}
        <div className="w-full px-4 sm:px-6 space-y-3">
          <ScrollReveal direction="zoom-in" delay={50} scale={0.96}>
            <SectionDividerTitle
              id="heading-vitrina"
              title={activePortfolioService.title}
            />
          </ScrollReveal>

          {/* Selector Horizontal de las 7 Opciones */}
          <div className="pt-1">
            <div
              className="flex items-center gap-2 overflow-x-auto scrollbar-none px-4 -mx-4 py-1.5"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {portfolioServices.map((srv, idx) => {
                const isSelected = idx === selectedPortfolioIndex;
                const IconComponent = srv.Icon;
                const shortLabels = isEn
                  ? ['Long Stays', 'Major Events', 'Weddings', 'Restaurant', 'Pool & Spa', 'Sports & Games', 'Parking']
                  : ['Larga Estadía', 'Grandes Eventos', 'Bodas & Gala', 'Restaurante', 'Piscina & Spa', 'Canchas & Juegos', 'Parqueaderos'];
                return (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => handleSelectPortfolioService(idx)}
                    className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#071912] text-[#E5C98B] shadow-sm ring-1 ring-[#E5C98B]/50 scale-[1.02]'
                        : 'bg-white/80 text-[#141413] hover:bg-white border border-[#141413]/10 opacity-75'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: isSelected ? '#C8A45D' : srv.circleBg }}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white shrink-0"
                    >
                      <IconComponent className="w-3 h-3 stroke-[2] text-[#071912]" />
                    </span>
                    <span className="whitespace-nowrap">{shortLabels[idx] || srv.selectorTitle}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 2. IMAGEN: 100% ANCHO DE LA PESTAÑA (Sin padding de contenedor: toca ambos bordes con 0px margen) */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative overflow-hidden shadow-md bg-[#071912]/10">
          <img
            src={activePortfolioService.image}
            alt={activePortfolioService.title}
            className={`w-full h-full object-cover transition-all duration-500 ease-out ${
              portfolioTransition === 'exiting' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20"
            aria-hidden="true"
          />

          {/* Sello Editorial Superior */}
          <div className="pointer-events-none absolute top-3 inset-x-4 text-center z-10">
            <span className="inline-block px-3 py-0.5 rounded-full bg-[#F4EFE6]/90 backdrop-blur-sm text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#141413] shadow-xs">
              {activePortfolioService.imageCaption}
            </span>
          </div>

          {/* Sello Editorial Inferior */}
          <div className="pointer-events-none absolute bottom-3 inset-x-4 text-center z-10">
            <span className="font-serif-luxury text-xs font-bold uppercase tracking-[0.2em] text-[#FAF7F2] drop-shadow">
              HACIENDA LE PLUS
            </span>
          </div>
        </div>

        {/* 3. INCLUSIONES CLAVE, PÍLDORAS Y BOTONES DE COTIZACIÓN (Con padding estándar) */}
        <div className="w-full px-4 sm:px-6 space-y-3">
          {/* Inclusiones clave */}
          <ul className="space-y-1.5">
            {activePortfolioService.inclusions.slice(0, 3).map((inc, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-[#141413]/85 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C04D18] shrink-0" />
                <span className="truncate">{inc}</span>
              </li>
            ))}
          </ul>

          {/* Píldoras de Precio y Capacidad */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-[#071912]/85 pt-1">
            <span className="px-3 py-1 rounded-full bg-white/90 border border-[#071912]/10 shadow-xs">
              {activePortfolioService.priceText}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/90 border border-[#071912]/10 shadow-xs">
              {activePortfolioService.capacityText}
            </span>
          </div>

          {/* Botones de acción: Cotizar Servicio envía directo a WhatsApp */}
          <div className="pt-2 flex flex-wrap items-center gap-2">
            <a
              href={buildContextualWhatsAppUrl(activePortfolioService.serviceType, activePortfolioService.title)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#1FAF53] text-[#071912] text-xs font-extrabold shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>{isEn ? 'Quote Service' : 'Cotizar Servicio'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              to={activePortfolioService.route}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#141413]/10 text-xs font-bold text-[#141413] hover:text-[#C04D18] active:scale-95 transition-all"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isEn ? 'View Page' : 'Ver Página'}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 4: EXPERIENCIAS Y RESEÑAS DE USUARIOS (RÉPLICA EXACTA DE MÁSCARA ORGÁNICA + CARRUSEL)
      ====================================================================== */}
      <section
        id="experiencias-usuarios"
        aria-labelledby="heading-evidencia"
        className="relative bg-[#FAF7F2] text-[#113221] overflow-hidden"
      >
        {/* MÁSCARA VECTORIAL ORGÁNICA CONTINUA */}
        <div className="pointer-events-none absolute inset-0 w-full h-full z-0 overflow-hidden hidden lg:block">
          <svg
            viewBox="0 0 940 200"
            preserveAspectRatio="none"
            className="w-full h-full block"
            aria-hidden="true"
          >
            <path
              d="M 0,18 C 75,11 145,11 205,19 C 248,26 272,52 277,86 C 279,106 271,124 272,142 C 273,168 290,193 325,197 L 940,197 L 940,200 L 0,200 Z"
              fill="#113221"
            />
          </svg>
        </div>

        {/* Clúster decorativo de hojas botánicas en la esquina superior derecha con animación orgánica */}
        <ScrollReveal
          direction="down-right"
          delay={100}
          distance={70}
          className="pointer-events-none hidden sm:block absolute -top-3 -right-3 z-20 w-28 sm:w-36 lg:w-44"
        >
          <div className="animate-float-botanical">
            <svg viewBox="0 0 220 190" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
              <path
                d="M220 0 C145 5 105 42 95 95 C145 102 195 75 220 0 Z"
                fill="#1E4624"
              />
              <path d="M220 0 Q150 50 95 95" stroke="#3A6B33" strokeWidth="1.5" />
              <path
                d="M220 25 C155 18 110 55 82 112 C135 128 190 95 220 25 Z"
                fill="#4E7A27"
              />
              <path d="M220 25 Q148 70 82 112" stroke="#85B246" strokeWidth="1.8" />
              <path
                d="M220 50 C175 65 142 110 148 178 C192 162 218 118 220 50 Z"
                fill="#2B5829"
              />
              <path d="M220 50 Q180 115 148 178" stroke="#5B8C3E" strokeWidth="1.5" />
              <path
                d="M175 48 C135 45 102 68 92 98 C126 105 158 84 175 48 Z"
                fill="#7BA63C"
              />
            </svg>
          </div>
        </ScrollReveal>

        <div className="w-full relative z-10 flex flex-col lg:flex-row lg:items-stretch">
          {/* LADO IZQUIERDO: CONTENIDO FLUIDO ENMARCADO POR LA MÁSCARA ORGÁNICA */}
          <div className="relative w-full lg:w-[29.5%] xl:w-[29%] text-white bg-[#113221] lg:bg-transparent rounded-b-[32px] lg:rounded-none px-4 sm:px-8 lg:pl-12 lg:pr-6 pt-6 pb-6 lg:pt-12 lg:pb-14 flex flex-col justify-center shrink-0">
            <div className="space-y-3 max-w-sm relative z-10">
              <ScrollReveal direction="zoom-in" delay={50} scale={0.96}>
                <SectionDividerTitle
                  id="heading-evidencia"
                  title={isEn ? 'Real Voices & Reviews' : 'Voces Reales & Reseñas'}
                  theme="light"
                />
              </ScrollReveal>

              <ScrollReveal direction="left" delay={140} distance={30}>
                <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed text-center">
                  {isEn
                    ? 'We support every wedding, corporate retreat, and international delegation in Píntag to ensure a memorable, warm, and well-coordinated experience.'
                    : 'Acompañamos cada boda, retiro corporativo y delegación internacional en Píntag para asegurar que tu experiencia sea memorable, cálida y bien coordinada.'}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={280} distance={40}>
                <div className="pt-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4B6E24] via-[#5E842E] to-[#749B3B] hover:from-[#577E2B] hover:to-[#82AD43] text-white text-xs font-semibold shadow-md border border-[#8AB34B]/40 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <span>{isEn ? 'Leave a Review' : 'Dejar mi Opinión'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* LADO DERECHO: CARRUSEL HORIZONTAL DE OPINIONES Y RESEÑAS */}
          <div className="w-full lg:w-[70.5%] xl:w-[71%] relative flex flex-col justify-between px-4 sm:px-6 lg:pl-10 lg:pr-14 pt-4 pb-[calc(63px+env(safe-area-inset-bottom,0px))] lg:pb-10">
            {/* Contenedor de las reseñas en formato 100% horizontal */}
            <div className="relative">
              {/* Carrusel Horizontal Táctil de Reseñas de Clientes */}
              <div
                className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 -mx-4 pb-3 pt-1 relative z-10"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {reviews.map((rev, idx) => {
                  const displayNumber = String((idx + 1)).padStart(2, '0');

                  return (
                    <div
                      key={rev.id || idx}
                      className="w-[80vw] max-w-[280px] shrink-0 snap-start bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-[#113221]/10 flex flex-col justify-between"
                    >
                      <div>
                        {/* Header con Medallón, Nombre, Estrellas y Número */}
                        <div className="flex items-center gap-3 mb-2.5">
                          <div className="w-12 h-12 rounded-full p-[2px] bg-[#113221] shrink-0 shadow-xs">
                            <div className="w-full h-full rounded-full p-[1.5px] border-[1.5px] border-[#6E9436] overflow-hidden bg-[#113221]">
                              <img
                                src={rev.avatarUrl}
                                alt={rev.author}
                                className="w-full h-full object-cover rounded-full"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E842E] truncate">
                                {rev.role}
                              </span>
                              <span className="text-xs font-bold text-[#113221]/60">
                                {displayNumber}
                              </span>
                            </div>
                            <h4 className="font-sans-ui text-[14px] font-extrabold text-[#113221] leading-tight truncate">
                              {rev.author}
                            </h4>
                            <div className="flex items-center gap-0.5 mt-0.5" aria-label={`${rev.rating} de 5 estrellas`}>
                              {Array.from({ length: rev.rating }).map((_, sIdx) => (
                                <Star
                                  key={sIdx}
                                  className="w-3 h-3 text-[#6E9436] fill-[#6E9436]"
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Comentario / Reseña */}
                        <p className="text-[12px] text-[#113221]/80 leading-relaxed italic line-clamp-4">
                          “{rev.comment}”
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Franja inferior de 4px que sella la unión con la base */}
            <div className="hidden lg:block absolute bottom-0 left-0 right-0 h-[4px] bg-[#113221]" />
          </div>
        </div>

        {/* MODAL INTERACTIVO PARA QUE UN NUEVO CLIENTE DEJE SU OPINIÓN */}
        {isReviewModalOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-review-title"
          >
            <div className="bg-[#FAF7F2] text-[#113221] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#113221]/15 relative animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                aria-label={isEn ? 'Close dialog' : 'Cerrar ventana'}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#113221]/10 hover:bg-[#113221] text-[#113221] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-[#5E842E]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#5E842E]">
                  {isEn ? 'NEW REVIEW AT HACIENDA LE PLUS' : 'NUEVA RESEÑA EN HACIENDA LE PLUS'}
                </span>
              </div>

              <h3 id="modal-review-title" className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#113221]">
                {isEn ? 'Share your experience' : 'Comparte tu experiencia'}
              </h3>
              <p className="text-xs text-[#113221]/70 mt-1">
                {isEn
                  ? 'Your review will be published immediately in our real experience carousel.'
                  : 'Tu comentario se publicará inmediatamente en nuestro carrusel de experiencias reales.'}
              </p>

              {reviewSubmittedSuccess ? (
                <div className="my-6 p-5 rounded-2xl bg-[#113221] text-white text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#A3C468] mx-auto" />
                  <p className="font-bold text-sm">
                    {isEn ? 'Thank you for sharing your experience!' : '¡Gracias por compartir tu opinión!'}
                  </p>
                  <p className="text-xs text-white/80">
                    {isEn
                      ? 'Your review is now visible at the beginning of the carousel.'
                      : 'Tu reseña ya está visible al inicio del carrusel.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAddClientReview} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#113221]/80 mb-1">
                      {isEn ? 'Your Name, Family or Organization *' : 'Tu Nombre, Familia o Institución *'}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={40}
                      placeholder={isEn ? 'e.g. Gomez Family / Andean Company' : 'Ej. Familia Gómez / Empresa Andina'}
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#113221]/20 text-sm text-[#113221] focus:outline-none focus:border-[#5E842E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#113221]/80 mb-1">
                        {isEn ? 'Experience Type' : 'Experiencia Vivida'}
                      </label>
                      <select
                        value={newReviewRole}
                        onChange={(e) => setNewReviewRole(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#113221]/20 text-xs font-semibold text-[#113221] focus:outline-none focus:border-[#5E842E]"
                      >
                        <option value={isEn ? 'Weddings & Celebrations' : 'Bodas & Recepciones'}>
                          {isEn ? 'Weddings & Celebrations' : 'Bodas & Recepciones'}
                        </option>
                        <option value={isEn ? 'Corporate & Conventions' : 'Corporativo & GADs'}>
                          {isEn ? 'Corporate & Conventions' : 'Corporativo & GADs'}
                        </option>
                        <option value={isEn ? 'NGO Delegation / Long Stay' : 'Delegación ONG / HXP'}>
                          {isEn ? 'NGO Delegation / Long Stay' : 'Delegación ONG / HXP'}
                        </option>
                        <option value={isEn ? 'Suites & Wellness Spa' : 'Suites & Zona Húmeda'}>
                          {isEn ? 'Suites & Wellness Spa' : 'Suites & Zona Húmeda'}
                        </option>
                        <option value={isEn ? 'Dining & Catering' : 'Gastronomía & Eventos'}>
                          {isEn ? 'Dining & Catering' : 'Gastronomía & Eventos'}
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#113221]/80 mb-1">
                        {isEn ? 'Rating' : 'Calificación'}
                      </label>
                      <div className="flex items-center gap-1.5 h-[38px] px-3 rounded-xl bg-white border border-[#113221]/20">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setNewReviewRating(starVal)}
                            className="cursor-pointer focus:outline-none"
                            aria-label={isEn ? `${starVal} stars` : `${starVal} estrellas`}
                          >
                            <Star
                              className={`w-4 h-4 transition-colors ${
                                starVal <= newReviewRating
                                  ? 'text-[#6E9436] fill-[#6E9436]'
                                  : 'text-[#113221]/25'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#113221]/80 mb-1">
                      {isEn ? 'Your Comment or Review *' : 'Tu Comentario o Reseña *'}
                    </label>
                    <textarea
                      required
                      rows={3}
                      maxLength={170}
                      placeholder={
                        isEn
                          ? 'Tell us what you liked most about Hacienda Le Plus...'
                          : 'Cuéntanos qué fue lo que más te gustó de Hacienda Le Plus...'
                      }
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#113221]/20 text-sm text-[#113221] focus:outline-none focus:border-[#5E842E] resize-none"
                    />
                  </div>

                  <div className="pt-1 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsReviewModalOpen(false)}
                      className="px-4 py-2.5 rounded-full text-xs font-bold text-[#113221]/70 hover:bg-[#113221]/10 transition-colors cursor-pointer"
                    >
                      {isEn ? 'Cancel' : 'Cancelar'}
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4B6E24] to-[#6E9436] hover:from-[#577E2B] hover:to-[#7CA63E] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isEn ? 'Publish Review' : 'Publicar Opinión'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export { HomePageMobile as HomePage };
export default HomePageMobile;
