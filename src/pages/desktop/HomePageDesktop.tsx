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
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { saveReviewToSupabase, fetchReviewsFromSupabase } from '../../lib/supabase';
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

export const HomePageDesktop: React.FC = () => {
  const { siteConfig, packages, openQuoteModal } = useCMS();
  const { language, isEn, t } = useLanguage();

  const heroStopCards = getHeroStopCards(isEn);
  const portfolioServices = getPortfolioServices(isEn);
  const section2Cards = getSection2Cards(isEn);

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
  const reviews = userReviews.length > 0 ? [...userReviews, ...defaultReviews] : defaultReviews;

  const [reviewStartIndex, setReviewStartIndex] = useState(0);
  const [reviewTransition, setReviewTransition] = useState<'visible' | 'exiting-left' | 'exiting-right'>('visible');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRole, setNewReviewRole] = useState('Bodas & Recepciones');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmittedSuccess, setReviewSubmittedSuccess] = useState(false);

  // Sincronizar reseñas aprobadas desde Supabase
  useEffect(() => {
    fetchReviewsFromSupabase().then((remote) => {
      if (remote && remote.length > 0) {
        const avatarMap: Record<string, string> = {
          'Bodas & Recepciones': '/images/avatars/sofia-sebastian.jpg',
          'Corporativo & GADs': '/images/avatars/gad-pichincha.jpg',
          'Delegación ONG / HXP': '/images/avatars/mision-hxp.jpg',
          'Suites & Zona Húmeda': '/images/avatars/familia-andrade.jpg',
          'Gastronomía & Eventos': '/images/avatars/valeria-mateo.jpg',
        };
        const mapped: ClientReviewItem[] = remote.map((r: any) => ({
          id: r.id,
          author: r.author,
          role: r.role,
          rating: r.rating || 5,
          comment: r.comment,
          avatarUrl: avatarMap[r.role] || '/images/avatars/dr-carlos.jpg',
        }));
        setUserReviews((prev) => {
          const remoteIds = new Set(mapped.map((m) => m.id));
          const uniqueLocal = prev.filter((p) => !remoteIds.has(p.id));
          return [...mapped, ...uniqueLocal];
        });
      }
    });
  }, []);

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
      localStorage.setItem('hacienda_leplus_client_reviews_v2', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }

    // Guardar en Supabase
    saveReviewToSupabase({
      author: created.author,
      role: created.role,
      rating: created.rating,
      comment: created.comment,
    });

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
        className="relative bg-[#FAF7F2] pt-[64px] sm:pt-[72px] overflow-hidden"
      >
        {/* SVG ClipPath Definition for the Organic Arched Floating Card */}
        <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true">
          <defs>
            <clipPath id="tidepost-card-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0,0.11 C 0,0.045 0.044,0.038 0.118,0.032 C 0.314,0.013 0.461,-0.004 0.657,0.002 C 0.804,0.007 0.902,0.015 0.946,0.026 C 0.985,0.038 1,0.07 1,0.133 L 1,0.885 C 1,0.962 0.955,1 0.882,1 L 0.118,1 C 0.045,1 0,0.962 0,0.885 Z" />
            </clipPath>
          </defs>
        </svg>

        {/* Hero Full-Bleed Canvas */}
        <div className="relative min-h-[85vh] lg:min-h-[88vh] w-full flex items-center overflow-hidden">
          {/* 1. TOP PIXEL-PERFECT SVG MASK */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 z-20 w-full h-[28px] sm:h-[38px] lg:h-[46px] -mt-[1px]">
            <svg
              viewBox="0 0 753 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full block"
              preserveAspectRatio="none"
            >
              <path
                d="M 0,0 L 753,0 L 753,15 C 732,5 700,1 655,1 L 95,1 C 52,1 22,6 0,25 Z"
                fill="#071912"
              />
            </svg>
          </div>

          {/* 2. BACKGROUND REAL PHOTO / OPTIONAL HD VIDEO WITH CINEMATIC CROSSFADE & ZOOM */}
          <div className="absolute inset-0 z-0">
            {heroStopCards.map((stop, idx) => {
              const isActive = idx === activeCardIndex;
              return (
                <img
                  key={stop.id}
                  src={stop.bgImage}
                  alt={stop.title}
                  fetchPriority={idx === 0 ? 'high' : 'auto'}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ease-out ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
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

            {/* Atmospheric gradient: deep emerald-teal on left, warm golden light on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#061811]/95 via-[#082218]/72 to-[#1F1608]/25" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06150F]/85 via-transparent to-[#06150F]/30" />
          </div>

          {/* 3. MAIN GRID CONTENT */}
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 w-full pt-10 pb-28 sm:pb-36 lg:pb-40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* LEFT COLUMN: Overline + 3-Line Editorial Headline + Paragraph + Pill CTA + Avatar Social Proof */}
              <div className="lg:col-span-7 space-y-6">
                <ScrollReveal direction="down" delay={40} distance={50}>
                  <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.26em] text-[#E2C585]">
                    {isEn ? t.hero.overline : siteConfig.heroOverline}
                  </p>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={120} distance={85}>
                  <h1 className="font-sans-ui text-4xl sm:text-6xl lg:text-[58px] font-extrabold text-white leading-[1.06] tracking-tight max-w-2xl">
                    {isEn ? (
                      <>
                        Corporate Long-Stay
                        <br />
                        &amp; <span className="text-[#E5C98B]">Major Events Venue</span>
                        <br />
                        in Quito – Píntag.
                      </>
                    ) : (
                      <>
                        Hospedaje de Larga
                        <br />
                        Estadía y <span className="text-[#E5C98B]">Grandes Eventos</span>
                        <br />
                        en Quito – Píntag.
                      </>
                    )}
                  </h1>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={210} distance={80}>
                  <p className="text-sm sm:text-base lg:text-[17px] text-[#FAF7F2]/90 max-w-xl leading-relaxed font-normal">
                    {isEn ? (
                      <>
                        Welcome to <strong className="text-white font-semibold">Hacienda Le Plus</strong> in Quito–Píntag: commercial priority in long-stay lodging with{' '}
                        <strong className="text-[#E2C585] font-semibold">
                          14 private rooms (28 to 80 guests)
                        </strong>
                        , macro-events and weddings, featuring heated swimming pool, on-site dining and sports facilities.
                      </>
                    ) : (
                      <>
                        Presentación de <strong className="text-white font-semibold">Hacienda Le Plus</strong> en Quito–Píntag: alojamiento corporativo y grupal con{' '}
                        <strong className="text-[#E2C585] font-semibold">
                          14 habitaciones (28 a 80 huéspedes)
                        </strong>
                        , macroeventos empresariales y bodas exclusivas, fortalecidos por nuestra piscina temperada, restaurante propio y áreas deportivas.
                      </>
                    )}
                  </p>
                </ScrollReveal>

                {/* Primary Pill CTA Button (redirige a WhatsApp) + Secondary Action */}
                <ScrollReveal direction="up" delay={300} distance={65}>
                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <a
                      href={buildContextualWhatsAppUrl(currentStop.serviceType)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E5C98B] hover:bg-[#C8A45D] text-[#06150F] font-bold text-xs sm:text-sm shadow-xl shadow-black/30 transition-all cursor-pointer"
                    >
                      <Search className="w-4 h-4 text-[#06150F]/80" />
                      <span>{isEn ? 'Request Quote' : 'Solicitar Cotización'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    <a
                      href="#rutas-comerciales"
                      className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 backdrop-blur-md text-xs font-semibold transition-all"
                    >
                      <span>{isEn ? 'Explore 3 Pillars' : 'Ver 3 Servicios'}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setVideoEnabled(!videoEnabled)}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-black/35 hover:bg-black/55 text-[#E2C585] border border-[#C8A45D]/35 text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>
                        {videoEnabled
                          ? isEn
                            ? 'View Real Photo'
                            : 'Ver Foto Real'
                          : isEn
                          ? 'HD Video Tour'
                          : 'Video HD'}
                      </span>
                    </button>
                  </div>
                </ScrollReveal>

                {/* Bottom-Left Social Proof Avatar Stack */}
                <ScrollReveal direction="up-left" delay={390} distance={70}>
                  <div className="pt-3 flex items-center gap-4">
                    <div className="flex -space-x-3 shrink-0">
                      <img
                        src="/images/hacienda/grupos-hxp.jpg"
                        alt="Hospedaje Larga Estadía Empresas y ONGs"
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#FAF7F2] shadow-md transition-transform duration-300 hover:scale-110 hover:z-10"
                      />
                      <img
                        src="/images/hacienda/reunion-corporativa.jpg"
                        alt="Grandes Eventos Corporativos e Integraciones"
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#FAF7F2] shadow-md transition-transform duration-300 hover:scale-110 hover:z-10"
                      />
                      <img
                        src="/images/hacienda/bodas-exteriores.jpg"
                        alt="Bodas y Celebraciones en Hacienda Le Plus"
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#FAF7F2] shadow-md transition-transform duration-300 hover:scale-110 hover:z-10"
                      />
                      <img
                        src="/images/hacienda/piscina-aerea.jpg"
                        alt="Complemento Piscina, Restaurante y Áreas Recreativas"
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#FAF7F2] shadow-md transition-transform duration-300 hover:scale-110 hover:z-10"
                      />
                    </div>
                    <div className="text-xs sm:text-sm text-[#FAF7F2]/90 leading-snug">
                      <strong className="text-white block font-semibold">
                        {isEn
                          ? 'Priority in Corporate Long Stays, Major Events & Weddings'
                          : 'Prioridad en Larga Estadía Empresarial, Grandes Eventos y Bodas'}
                      </strong>
                      <span className="text-[#E2C585]/90 text-xs">
                        {isEn
                          ? 'Quito–Píntag · San Juan de la Tola · WhatsApp +593 96 981 7891'
                          : 'Ubicación Quito–Píntag · Barrio San Juan de la Tola · WhatsApp 0969817891'}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>

              {/* RIGHT COLUMN: Curved Arrow + "Próximo encuentro" + Arched Floating Card */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">
                {/* Hand-drawn Curved Arrow + Script Text */}
                <ScrollReveal direction="down-right" delay={180} distance={65} className="self-end">
                  <div className="flex items-center gap-3 mb-2 mr-4 text-[#FAF7F2]/95">
                    <svg
                      width="58"
                      height="28"
                      viewBox="0 0 58 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[#E5C98B] -rotate-6"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 22C16 24 28 19 39 9C43 5 47 4 53 6M53 6L46 2M53 6L47 13"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="font-handwritten text-2xl sm:text-3xl text-[#E5C98B] -rotate-3 tracking-wide">
                      {isEn ? 'Upcoming Gathering' : 'Próximo encuentro'}
                    </span>
                  </div>
                </ScrollReveal>

                {/* Outer Drop-Shadow Wrapper + Clipped Organic Card (with Entrance/Exit State Transition) */}
                <ScrollReveal
                  direction="right"
                  delay={260}
                  distance={90}
                  className="w-full max-w-[390px]"
                >
                  <div className="w-full drop-shadow-[0_26px_48px_rgba(0,0,0,0.48)] transition-transform duration-300 hover:scale-[1.01]">
                    <div
                      style={{ clipPath: 'url(#tidepost-card-clip)' }}
                      className="bg-white text-[#071912] pt-[4px] overflow-hidden"
                    >
                      {/* Top Edge-to-Edge Photo inside the Organic Arch */}
                      <div
                        style={{ clipPath: 'url(#tidepost-card-clip)' }}
                        className="relative h-48 sm:h-52 w-full overflow-hidden"
                      >
                        <img
                          src={currentStop.cardImage}
                          alt={currentStop.title}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            heroCardTransition === 'exiting'
                              ? 'opacity-0 scale-105'
                              : 'opacity-100 scale-100'
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                        {/* Location Pill at bottom-left of photo */}
                        <div
                          className={`absolute bottom-3 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#071912]/80 backdrop-blur-md text-white text-xs font-semibold transition-all duration-300 ${
                            heroCardTransition === 'exiting'
                              ? 'opacity-0 -translate-x-3'
                              : 'opacity-100 translate-x-0'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 text-[#E5C98B] shrink-0" />
                          <span>{currentStop.location}</span>
                        </div>
                      </div>

                      {/* White Bottom Content Area */}
                      <div className="relative bg-white px-5 pt-4 pb-5">
                        {/* Circular Action Button straddling the exact photo/white boundary */}
                        <button
                          type="button"
                          onClick={handleNextStop}
                          title={isEn ? 'Switch featured venue' : 'Cambiar ambiente destacado'}
                          aria-label={isEn ? 'Next venue at Hacienda Le Plus' : 'Siguiente ambiente de Hacienda Le Plus'}
                          className="absolute -top-5 right-4 w-10 h-10 rounded-full bg-[#C8A45D] hover:bg-[#071912] text-[#071912] hover:text-[#E5C98B] shadow-md border-2 border-white flex items-center justify-center transition-colors cursor-pointer z-10"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>

                        <div
                          className={`transition-all duration-300 ${
                            heroCardTransition === 'exiting'
                              ? 'opacity-0 translate-y-2'
                              : 'opacity-100 translate-y-0'
                          }`}
                        >
                          <h2 className="font-sans-ui text-lg sm:text-[19px] font-extrabold text-[#071912] pr-10 leading-snug">
                            {currentStop.title}
                          </h2>
                          <p className="text-xs sm:text-[13px] text-[#071912]/70 mt-1 leading-relaxed">
                            {currentStop.subtitle}
                          </p>

                          <div className="mt-3 pt-2.5 border-t border-[#071912]/10 flex items-center justify-between gap-2 text-xs font-semibold text-[#071912]/75">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-[#A6823C] shrink-0" />
                              <span>{currentStop.meta}</span>
                            </span>
                            <Link
                              to={currentStop.route}
                              className="text-[#A6823C] hover:text-[#071912] font-bold underline whitespace-nowrap"
                            >
                              {isEn ? 'Learn more' : 'Ver más'}
                            </Link>
                          </div>
                        </div>

                        {/* Quick Switcher Pills */}
                        <div className="mt-2.5 flex items-center gap-1">
                          {heroStopCards.map((item, idx) => (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectHeroStop(idx)}
                              className={`flex-1 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                                activeCardIndex === idx
                                  ? 'bg-[#071912] text-[#E5C98B]'
                                  : 'bg-[#071912]/5 text-[#071912]/55 hover:bg-[#071912]/10'
                              }`}
                            >
                              {item.id === 'larga-estadia'
                                ? (isEn ? 'Lodging' : 'Estadía')
                                : item.id === 'grandes-eventos'
                                ? (isEn ? 'Events' : 'Eventos')
                                : item.id === 'bodas'
                                ? (isEn ? 'Weddings' : 'Bodas')
                                : (isEn ? 'Resort' : 'Hacienda')}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* 4. BOTTOM PIXEL-VERIFIED FULL-WIDTH DUAL-WAVE MASK */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 w-full h-[115px] sm:h-[165px] lg:h-[225px] -mb-[1px]">
            <svg
              viewBox="0 0 753 165"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full block"
              preserveAspectRatio="none"
            >
              {/* Layer A: Secondary Soft-Tinted Wave Lobe on the Right */}
              <path
                d="M 0,115 C 105,128 210,149 315,149 C 400,149 455,139 495,131 C 555,118 610,82 660,66 C 680,60 695,61 705,56 C 722,45 738,25 753,7 L 753,165 L 0,165 Z"
                fill="#EBE4D4"
              />
              {/* Layer B: Main Ivory Background Wave */}
              <path
                d="M 0,115 C 105,128 210,149 315,149 C 400,149 455,139 495,131 C 540,130 575,130 605,133 C 650,142 695,159 753,161 L 753,165 L 0,165 Z"
                fill="#FAF7F2"
              />
            </svg>

            {/* Handwritten Script inside the Right Wave Crescent */}
            <ScrollReveal
              direction="tilt-right"
              delay={350}
              distance={60}
              className="absolute bottom-[18%] right-[4%] sm:bottom-[20%] sm:right-[5%] lg:bottom-[22%] lg:right-[5.5%]"
            >
              <div className="text-center -rotate-[11deg]">
                <span className="font-handwritten text-xl sm:text-3xl lg:text-[34px] font-bold text-[#071912]/85 block leading-[0.95]">
                  Quito – Píntag
                </span>
                <span className="font-handwritten text-xl sm:text-3xl lg:text-[34px] font-bold text-[#A6823C] block leading-[0.95] ml-3">
                  Hacienda Le Plus
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 2: ACCESO DIRECTO A LOS 3 SERVICIOS PRINCIPALES + PRESENTACIÓN DE HACIENDA LE PLUS EN QUITO–PÍNTAG E INSTALACIONES
      ====================================================================== */}
      <section
        id="rutas-comerciales"
        aria-labelledby="heading-rutas"
        className="py-16 lg:py-24 bg-[#FAF7F2] text-[#0A1F17]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* 1. ACCESO DIRECTO A LOS TRES SERVICIOS PRINCIPALES Y SUS COMPLEMENTOS */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <ScrollReveal direction="left" delay={40} distance={85}>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C88242] block mb-1">
                    {isEn ? 'DIRECT ACCESS · 3 MAIN PILLARS & AMENITIES' : 'ACCESO DIRECTO · 3 SERVICIOS PRINCIPALES Y COMPLEMENTOS'}
                  </span>
                  <h3 className="font-sans-ui text-3xl sm:text-4xl font-extrabold text-[#071912] tracking-tight">
                    {isEn ? 'Our Main Services and Amenities' : 'Nuestros Servicios Principales y Complementos'}
                  </h3>
                </div>
              </ScrollReveal>
            </div>

            {/* Carousel / Cards List with Exact Stepped Folder-Tab Mask + Staggered Directional Reveal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 pb-2">
              {section2Cards.map((card, i) => {
                const dir: RevealDirection =
                  i === 0
                    ? 'tilt-left'
                    : i === 1
                    ? 'up'
                    : i === 2
                    ? 'zoom-in'
                    : i === 3
                    ? 'up'
                    : 'tilt-right';
                return (
                  <ScrollReveal
                    key={i}
                    direction={dir}
                    delay={60 + i * 95}
                    distance={75}
                    scale={0.82}
                    className="h-full"
                    innerClassName="h-full"
                  >
                    <Link
                      to={card.link}
                      className="group relative flex flex-col h-full rounded-[24px] overflow-hidden bg-[#F5EFE6] shadow-[0_10px_28px_rgba(7,25,18,0.07)] hover:shadow-[0_16px_36px_rgba(7,25,18,0.13)] hover:-translate-y-1.5 transition-all duration-300"
                    >
                      {/* Top Photo Area (extending behind the stepped SVG mask) */}
                      <div className="relative h-[230px] w-full overflow-hidden">
                        <img
                          src={card.img}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />

                        {/* Pixel-verified Stepped / Folder-Tab SVG Mask overlapping bottom of photo */}
                        <svg
                          viewBox="0 0 188 28"
                          preserveAspectRatio="none"
                          className="absolute -bottom-[1px] left-0 right-0 w-full h-[30px] z-10 pointer-events-none block"
                        >
                          <path
                            d="M 0,18 C 2,5 11,1 24,1 L 48,1 C 58,1 64,11 76,11 L 164,11 C 177,11 186,16 188,26 L 188,28 L 0,28 Z"
                            fill="#F5EFE6"
                          />
                        </svg>
                      </div>

                      {/* Bottom Descriptive Block seamlessly joined at y=28 with transparent inner pull-up */}
                      <div className="relative z-20 bg-[#F5EFE6] px-4 pb-4 pt-0 rounded-b-[24px] flex-1 flex flex-col justify-end">
                        <div className="-mt-[12px] flex items-end justify-between gap-2 w-full">
                          <div className="min-w-0 pr-1">
                            <h4 className="font-sans-ui text-[16px] font-extrabold text-[#0B1320] leading-tight tracking-tight group-hover:text-[#D97236] transition-colors">
                              {card.title}
                            </h4>
                            <p className="text-[12px] text-[#0B1320]/60 line-clamp-2 mt-1.5 leading-[1.35] font-medium">
                              {card.desc}
                            </p>
                          </div>

                          {/* Soft Neumorphic Circular Arrow Button */}
                          <div className="w-9 h-9 rounded-full bg-[#FAF7F2] shadow-[0_4px_10px_rgba(0,0,0,0.08)] border border-white flex items-center justify-center shrink-0 mb-0.5 group-hover:bg-[#D97236] group-hover:border-[#D97236] transition-all duration-300">
                            <ArrowRight className="w-4 h-4 text-[#E06D2B] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* 2. PRESENTACIÓN DE HACIENDA LE PLUS, FOTOS DESTACADAS, UBICACIÓN QUITO–PÍNTAG E INSTALACIONES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-4">
            {/* Left 6 cols: 3-Photo Organic Collage using Real Hacienda Le Plus Photos */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <ScrollReveal direction="tilt-left" delay={40} distance={85}>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#0A1F17]/10 h-48 sm:h-56 -rotate-1 group">
                  <img
                    src="/images/hacienda/cabana-exterior.jpg"
                    alt="Instalaciones de Hospedaje en Hacienda Le Plus Quito–Píntag"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="tilt-right" delay={160} distance={85}>
                <div className="rounded-3xl overflow-hidden shadow-lg border border-[#0A1F17]/10 h-48 sm:h-56 translate-y-4 rotate-1 group">
                  <img
                    src="/images/hacienda/piscina-aerea.jpg"
                    alt="Piscina de 14x6m y dos hidromasajes como complemento"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={260} distance={80} className="col-span-2">
                <div className="rounded-3xl overflow-hidden shadow-xl border border-[#0A1F17]/10 h-52 sm:h-60 mt-2 group">
                  <img
                    src="/images/hacienda/jardines-teambuilding.jpg"
                    alt="Jardines y Carpas en Quito–Píntag para Grandes Eventos y Larga Estadía"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Right 6 cols: Presentación de Hacienda Le Plus, Ubicación Quito–Píntag e Instalaciones */}
            <div className="lg:col-span-6 space-y-6">
              <ScrollReveal direction="right" delay={80} distance={90}>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C88242] block mb-1.5">
                  {isEn
                    ? 'ABOUT HACIENDA LE PLUS · QUITO–PÍNTAG VENUE'
                    : 'PRESENTACIÓN DE HACIENDA LE PLUS · UBICACIÓN QUITO–PÍNTAG'}
                </span>
                <h2
                  id="heading-rutas"
                  className="font-serif-luxury text-3xl sm:text-5xl font-semibold text-[#071912] leading-tight"
                >
                  {isEn ? (
                    <>
                      Exclusive resort facilities in{' '}
                      <em className="italic text-[#A6823C] font-normal">Quito – Píntag</em> for stays and major events.
                    </>
                  ) : (
                    <>
                      Instalaciones exclusivas en{' '}
                      <em className="italic text-[#A6823C] font-normal">Quito – Píntag</em> para estadías y eventos.
                    </>
                  )}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={180} distance={85}>
                <p className="text-sm sm:text-base text-[#0A1F17]/75 leading-relaxed">
                  {isEn ? (
                    <>
                      Located in <strong>Quito–Píntag (San Juan de la Tola, Calle Deus No. 100)</strong>, just <strong>40 minutes from Quito</strong> and{' '}
                      <strong>30 minutes from Mariscal Sucre International Airport</strong>. Our facilities integrate long-stay lodging for corporate teams and groups (14 rooms for 28 to 80 guests), gala tents and lawns for macro-events and weddings, alongside a heated pool, restaurant, and sports facilities as value-added amenities.
                    </>
                  ) : (
                    <>
                      Ubicada en <strong>Quito–Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100)</strong>, a solo <strong>40 minutos de Quito</strong> y{' '}
                      <strong>30 minutos del Aeropuerto Internacional Mariscal Sucre</strong>. Nuestras instalaciones integran hospedaje de larga estadía para empresas y grupos (14 habitaciones para 28 a 80 personas), carpas y jardines para grandes eventos y bodas, junto con piscina temperada, restaurante y actividades recreativas como complementos que fortalecen tu experiencia.
                    </>
                  )}
                </p>
              </ScrollReveal>

              {/* 4 Circular Icon Pillars (staggered pop-in reveal) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                <ScrollReveal direction="zoom-in" delay={220} scale={0.76}>
                  <Link
                    to="/hospedaje"
                    className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white border border-[#0A1F17]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-2.5">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#071912]">
                      {isEn ? '14 Rooms' : '14 Habitaciones'}
                    </span>
                  </Link>
                </ScrollReveal>

                <ScrollReveal direction="zoom-in" delay={310} scale={0.76}>
                  <Link
                    to="/corporativo"
                    className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white border border-[#0A1F17]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-2.5">
                      <Wifi className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#071912]">
                      {isEn ? 'Fiber & Halls' : 'Fibra & Salones'}
                    </span>
                  </Link>
                </ScrollReveal>

                <ScrollReveal direction="zoom-in" delay={400} scale={0.76}>
                  <Link
                    to="/hospedaje"
                    className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white border border-[#0A1F17]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-2.5">
                      <Utensils className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#071912]">
                      {isEn ? 'Dining & Catering' : 'Restaurante & Catering'}
                    </span>
                  </Link>
                </ScrollReveal>

                <ScrollReveal direction="zoom-in" delay={490} scale={0.76}>
                  <Link
                    to="/corporativo"
                    className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-white border border-[#0A1F17]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-full bg-[#071912] text-[#E5C98B] flex items-center justify-center mb-2.5">
                      <Waves className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#071912]">
                      {isEn ? 'Pool & Courts' : 'Piscina & Canchas'}
                    </span>
                  </Link>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECCIÓN 3: PORTAFOLIO Y SERVICIOS — ARQUITECTURA INTERACTIVA DE 3 COLUMNAS
          (ALTURA FIJA DE 520PX ESTRICTAMENTE SINCRONIZADA A LA IMAGEN CENTRAL)
      ====================================================================== */}
      <section
        aria-labelledby="heading-vitrina"
        className="bg-[#F4EFE6] text-[#141413] border-y border-[#071912]/10 overflow-hidden"
      >
        <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 lg:items-center">
            {/* COLUMNA 1 (IZQUIERDA): CADA ELEMENTO CON SU PROPIO SCROLL REVEAL INDEPENDIENTE */}
            <div className="lg:col-span-4 h-full lg:h-[520px] lg:max-h-[520px] flex flex-col justify-between py-6 lg:py-8">
              <div
                className={`space-y-3 transition-all duration-300 ${
                  portfolioTransition === 'exiting'
                    ? portfolioDir === 'down'
                      ? 'opacity-0 -translate-y-4'
                      : 'opacity-0 translate-y-4'
                    : 'opacity-100 translate-y-0'
                }`}
              >
                <ScrollReveal direction="down" delay={30} distance={48}>
                  <span className="block text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#222220]">
                    {activePortfolioService.overline}
                  </span>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={95} distance={85}>
                  <h2
                    id="heading-vitrina"
                    className="font-serif-luxury text-3xl sm:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-[#141413] leading-[1.08] tracking-tight line-clamp-2"
                  >
                    {activePortfolioService.title}
                  </h2>
                </ScrollReveal>

                <ScrollReveal direction="left" delay={160} distance={80}>
                  <p className="text-[14px] text-[#2C2A28]/85 leading-relaxed line-clamp-3">
                    {activePortfolioService.description}
                  </p>
                </ScrollReveal>

                {/* Inclusiones clave: cada ítem se revela de forma independiente */}
                <ul className="space-y-1.5 pt-1">
                  {activePortfolioService.inclusions.slice(0, 3).map((inc, i) => (
                    <li key={i}>
                      <ScrollReveal
                        direction="up-left"
                        delay={220 + i * 65}
                        distance={68}
                      >
                        <div className="flex items-center gap-2 text-xs text-[#141413]/85 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-[#C04D18] shrink-0" />
                          <span className="truncate">{inc}</span>
                        </div>
                      </ScrollReveal>
                    </li>
                  ))}
                </ul>

                {/* Píldoras de Precio y Capacidad independientes */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-xs font-bold text-[#071912]/85">
                  <ScrollReveal direction="zoom-in" delay={410} scale={0.75} className="inline-block">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-white/85 border border-[#071912]/10 shadow-xs">
                      {activePortfolioService.priceText}
                    </span>
                  </ScrollReveal>

                  <ScrollReveal direction="zoom-in" delay={475} scale={0.75} className="inline-block">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-white/85 border border-[#071912]/10 shadow-xs">
                      {activePortfolioService.capacityText}
                    </span>
                  </ScrollReveal>
                </div>
              </div>

              {/* Botones de acción inferiores independientes */}
              <div
                className={`pt-3 flex flex-wrap items-center gap-3.5 transition-all duration-300 ${
                  portfolioTransition === 'exiting' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
              >
                <ScrollReveal direction="up" delay={520} distance={60} className="inline-block">
                  <a
                    href={buildContextualWhatsAppUrl(activePortfolioService.serviceType, activePortfolioService.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[4px] bg-[#C04D18] hover:bg-[#A33E10] text-white text-xs sm:text-[13px] font-bold shadow-sm transition-all cursor-pointer"
                  >
                    <span>{isEn ? 'Quote Service' : 'Cotizar Servicio'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </ScrollReveal>

                <ScrollReveal direction="right" delay={585} distance={60} className="inline-block">
                  <Link
                    to={activePortfolioService.route}
                    className="group inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#141413] hover:text-[#C04D18] transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full border-[1.8px] border-[#141413] group-hover:border-[#C04D18] flex items-center justify-center transition-colors">
                      <Play className="w-3 h-3 fill-current ml-0.5" />
                    </span>
                    <span>{isEn ? 'View Page' : 'Ver Página'}</span>
                  </Link>
                </ScrollReveal>
              </div>
            </div>

            {/* COLUMNA 2 (MEDIO): IMAGEN CENTRAL FIJA DE 520PX + SELLOS CON REVEAL INDEPENDIENTE */}
            <div className="lg:col-span-4 w-full h-[440px] sm:h-[480px] lg:h-[520px] min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] max-h-[520px] relative overflow-hidden flex-shrink-0">
              <ScrollReveal
                direction="zoom-in"
                delay={110}
                scale={0.8}
                className="w-full h-full"
                innerClassName="w-full h-full relative overflow-hidden"
              >
                <img
                  src={activePortfolioService.image}
                  alt={activePortfolioService.title}
                  className={`w-full h-full object-cover transition-all duration-500 ease-out ${
                    portfolioTransition === 'exiting'
                      ? 'opacity-0 scale-105'
                      : 'opacity-100 scale-100'
                  }`}
                />

                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25"
                  aria-hidden="true"
                />
              </ScrollReveal>

              {/* Sello Editorial Superior con su propio ScrollReveal */}
              <ScrollReveal
                direction="down"
                delay={280}
                distance={50}
                className="pointer-events-none absolute top-5 inset-x-6 text-center z-10"
              >
                <div
                  className={`transition-all duration-300 ${
                    portfolioTransition === 'exiting'
                      ? 'opacity-0 -translate-y-2'
                      : 'opacity-100 translate-y-0'
                  }`}
                >
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4EFE6]/90 backdrop-blur-sm text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#141413] shadow-sm">
                    {activePortfolioService.imageCaption}
                  </span>
                </div>
              </ScrollReveal>

              {/* Sello Editorial Inferior con su propio ScrollReveal */}
              <ScrollReveal
                direction="up"
                delay={360}
                distance={50}
                className="pointer-events-none absolute bottom-5 inset-x-6 text-center z-10"
              >
                <span className="font-serif-luxury text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#FAF7F2] drop-shadow">
                  HACIENDA LE PLUS
                </span>
              </ScrollReveal>
            </div>

            {/* COLUMNA 3 (DERECHA): CADA UNO DE LOS 7 SERVICIOS CON SU PROPIO SCROLL REVEAL INDEPENDIENTE */}
            <div className="lg:col-span-4 h-[440px] sm:h-[480px] lg:h-[520px] min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] max-h-[520px] overflow-y-auto overflow-x-hidden pr-2 space-y-2 custom-scrollbar py-4 lg:py-6">
              {portfolioServices.map((srv, idx) => {
                const isSelected = idx === selectedPortfolioIndex;
                const IconComponent = srv.Icon;
                const itemDirection: RevealDirection =
                  idx % 3 === 0 ? 'right' : idx % 3 === 1 ? 'up-right' : 'tilt-right';

                return (
                  <ScrollReveal
                    key={srv.id}
                    direction={itemDirection}
                    delay={50 + idx * 75}
                    distance={85}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectPortfolioService(idx)}
                      aria-pressed={isSelected}
                      className={`w-full text-left flex items-center gap-3 p-2 rounded-xl transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-white/95 shadow-[0_6px_20px_rgba(7,25,18,0.08)] ring-1 ring-[#141413]/15 translate-x-1'
                          : 'hover:bg-white/50 opacity-85 hover:opacity-100 hover:translate-x-0.5'
                      }`}
                    >
                      <div
                        style={{ backgroundColor: srv.circleBg }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-white shadow-xs transition-transform duration-200 ${
                          isSelected ? 'scale-105 ring-4 ring-white' : ''
                        }`}
                      >
                        <IconComponent className="w-5 h-5 stroke-[1.8]" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="font-serif-luxury text-[16px] font-bold text-[#141413] leading-tight truncate">
                          {srv.selectorTitle}
                        </h3>
                        <p className="text-[12px] text-[#2C2A28]/75 leading-tight mt-0.5 truncate">
                          {srv.selectorDesc}
                        </p>
                      </div>
                    </button>
                  </ScrollReveal>
                );
              })}
            </div>
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
              {/* Hoja posterior oscura */}
              <path
                d="M220 0 C145 5 105 42 95 95 C145 102 195 75 220 0 Z"
                fill="#1E4624"
              />
              <path d="M220 0 Q150 50 95 95" stroke="#3A6B33" strokeWidth="1.5" />
              {/* Hoja media verde oliva brillante */}
              <path
                d="M220 25 C155 18 110 55 82 112 C135 128 190 95 220 25 Z"
                fill="#4E7A27"
              />
              <path d="M220 25 Q148 70 82 112" stroke="#85B246" strokeWidth="1.8" />
              {/* Hoja inferior vertical */}
              <path
                d="M220 50 C175 65 142 110 148 178 C192 162 218 118 220 50 Z"
                fill="#2B5829"
              />
              <path d="M220 50 Q180 115 148 178" stroke="#5B8C3E" strokeWidth="1.5" />
              {/* Hoja pequeña luminosa */}
              <path
                d="M175 48 C135 45 102 68 92 98 C126 105 158 84 175 48 Z"
                fill="#7BA63C"
              />
            </svg>
          </div>
        </ScrollReveal>

        <div className="w-full relative z-10 flex flex-col lg:flex-row lg:items-stretch">
          {/* LADO IZQUIERDO: CONTENIDO FLUIDO ENMARCADO POR LA MÁSCARA ORGÁNICA */}
          <div className="relative w-full lg:w-[29.5%] xl:w-[29%] text-white bg-[#113221] lg:bg-transparent rounded-b-[40px] lg:rounded-none px-6 sm:px-10 lg:pl-12 lg:pr-6 pt-10 pb-10 lg:pt-12 lg:pb-14 flex flex-col justify-center shrink-0">
            {/* Marca de agua botánica sutil dentro de la máscara verde */}
            <svg
              viewBox="0 0 240 240"
              fill="none"
              className="pointer-events-none absolute top-6 left-6 w-56 h-56 text-white/[0.04] z-0 hidden lg:block"
              aria-hidden="true"
            >
              <path
                d="M120 20 C180 20 220 70 220 140 C220 190 170 220 120 220 C70 220 20 190 20 140 C20 70 60 20 120 20 Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M120 20 L120 220 M120 70 L180 40 M120 120 L195 85 M120 170 L185 145 M120 95 L55 65 M120 145 L45 115"
                stroke="currentColor"
                strokeWidth="1.8"
              />
            </svg>

            <div className="space-y-3.5 max-w-sm relative z-10">
              <ScrollReveal direction="left" delay={40} distance={80}>
                <div className="inline-flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-[#7BA63C] fill-[#7BA63C]/30 -rotate-12" />
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#A3C468]">
                    {isEn ? 'CLIENT REVIEWS' : 'RESEÑAS DE CLIENTES'}
                  </span>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={120} distance={85}>
                <h2
                  id="heading-evidencia"
                  className="font-serif-luxury text-3xl sm:text-4xl xl:text-[40px] font-semibold text-white leading-[1.1]"
                >
                  {isEn ? (
                    <>
                      Real Voices.
                      <br />
                      Positive Impact.
                    </>
                  ) : (
                    <>
                      Voces Reales.
                      <br />
                      Impacto Positivo.
                    </>
                  )}
                </h2>
              </ScrollReveal>

              <ScrollReveal direction="left" delay={200} distance={80}>
                <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed">
                  {isEn
                    ? 'We support every wedding, corporate retreat, and international delegation in Píntag to ensure a memorable, warm, and well-coordinated experience.'
                    : 'Acompañamos cada boda, retiro corporativo y delegación internacional en Píntag para asegurar que tu experiencia sea memorable, cálida y bien coordinada.'}
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={280} distance={65}>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-[#4B6E24] via-[#5E842E] to-[#749B3B] hover:from-[#577E2B] hover:to-[#82AD43] text-white text-xs sm:text-[13px] font-semibold shadow-[0_6px_20px_rgba(0,0,0,0.28)] border border-[#8AB34B]/40 transition-all duration-200 cursor-pointer group"
                  >
                    <span>{isEn ? 'Leave a Review' : 'Dejar mi Opinión'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>
            </div>
          </div>

          {/* LADO DERECHO: CARRUSEL CONECTADO DE COMENTARIOS Y RESEÑAS DE USUARIOS */}
          <div className="w-full lg:w-[70.5%] xl:w-[71%] relative flex flex-col justify-between px-6 sm:px-10 lg:pl-10 lg:pr-14 pt-8 pb-8 lg:pt-10 lg:pb-10">
            {/* Contenedor de los 5 ítems del carrusel con la línea ondulada punteada detrás */}
            <div className="relative">
              {/* Línea curva punteada y puntos conectores */}
              <ScrollReveal
                direction="zoom-in"
                delay={120}
                scale={0.82}
                className="pointer-events-none hidden xl:block absolute top-[22px] left-[6%] right-[6%] h-[34px] z-0"
                innerClassName="w-full h-full"
              >
                <svg
                  viewBox="0 0 800 36"
                  fill="none"
                  preserveAspectRatio="none"
                  className="w-full h-full"
                >
                  <path
                    d="M 0,18 Q 50,34 100,18 T 200,18 T 300,18 T 400,18 T 500,18 T 600,18 T 700,18 T 800,18"
                    stroke="#113221"
                    strokeOpacity="0.28"
                    strokeWidth="1.3"
                    strokeDasharray="3 3"
                  />
                  {/* Puntos oscuros intermedios entre cada medallón */}
                  <circle cx="100" cy="18" r="3.2" fill="#113221" />
                  <circle cx="300" cy="18" r="3.2" fill="#113221" />
                  <circle cx="500" cy="18" r="3.2" fill="#113221" />
                  <circle cx="700" cy="18" r="3.2" fill="#113221" />
                </svg>
              </ScrollReveal>

              {/* Grid / Carrusel de 5 columnas conectadas con transición de entrada/salida */}
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-4 relative z-10 transition-all duration-300 ease-out ${
                  reviewTransition === 'exiting-left'
                    ? 'opacity-0 -translate-x-8 scale-[0.96]'
                    : reviewTransition === 'exiting-right'
                    ? 'opacity-0 translate-x-8 scale-[0.96]'
                    : 'opacity-100 translate-x-0 scale-100'
                }`}
              >
                {visibleReviews.map((rev, idx) => {
                  const displayNumber = String(((reviewStartIndex + idx) % reviews.length) + 1).padStart(2, '0');

                  return (
                    <ScrollReveal
                      key={`slot-${idx}`}
                      direction="zoom-in"
                      delay={80 + idx * 90}
                      scale={0.78}
                    >
                      <div className="flex flex-col items-center text-center px-1.5 group transition-all duration-300">
                        {/* Medallón Circular con Foto de Perfil y Doble Anillo Verde Bosque + Oliva */}
                        <div className="w-16 h-16 rounded-full p-[2.5px] bg-[#113221] shadow-[0_6px_18px_rgba(17,50,33,0.22)] relative mb-3 group-hover:scale-108 transition-all duration-300">
                          <div className="w-full h-full rounded-full p-[2px] border-[1.8px] border-[#6E9436] overflow-hidden bg-[#113221] flex items-center justify-center">
                            <img
                              src={rev.avatarUrl}
                              alt={rev.author}
                              className="w-full h-full object-cover rounded-full"
                              loading="lazy"
                            />
                          </div>
                        </div>

                        {/* Número 01..05 + Estrellas */}
                        <span className="text-sm font-bold text-[#113221]/80 tracking-wider">
                          {displayNumber}
                        </span>

                        <div className="flex items-center justify-center gap-0.5 my-0.5" aria-label={`${rev.rating} de 5 estrellas`}>
                          {Array.from({ length: rev.rating }).map((_, sIdx) => (
                            <Star
                              key={sIdx}
                              className="w-3 h-3 text-[#6E9436] fill-[#6E9436]"
                            />
                          ))}
                        </div>

                        {/* Nombre del Cliente / Organización */}
                        <h3 className="font-sans-ui text-[15px] font-extrabold text-[#113221] leading-snug mt-0.5">
                          {rev.author}
                        </h3>

                        {/* Rol / Tipo de evento */}
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#5E842E] mb-1">
                          {rev.role}
                        </span>

                        {/* Comentario / Reseña */}
                        <p className="text-[12px] text-[#113221]/75 leading-[1.42] line-clamp-4 max-w-[185px]">
                          “{rev.comment}”
                        </p>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>

            {/* Controles del Carrusel de Reseñas en la parte inferior derecha */}
            <ScrollReveal direction="up" delay={340} distance={55}>
              <div className="mt-6 pt-3 flex items-center justify-between border-t border-[#113221]/10">
                <div className="flex items-center gap-1.5">
                  {reviews.map((r, dotIdx) => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleDotSelectReview(dotIdx)}
                      aria-label={`Ir a reseña ${dotIdx + 1}`}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        dotIdx === reviewStartIndex
                          ? 'w-6 bg-[#113221]'
                          : 'w-2 bg-[#113221]/25 hover:bg-[#113221]/50'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#113221]/60 mr-1 hidden sm:inline">
                    Deslizar reseñas ({reviews.length})
                  </span>
                  <button
                    type="button"
                    onClick={handlePrevReviews}
                    aria-label="Reseña anterior"
                    className="w-8 h-8 rounded-full border border-[#113221]/20 bg-white hover:bg-[#113221] text-[#113221] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextReviews}
                    aria-label="Siguiente reseña"
                    className="w-8 h-8 rounded-full border border-[#113221]/20 bg-white hover:bg-[#113221] text-[#113221] hover:text-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Franja inferior de 4px que sella la unión con el Footer verde oscuro */}
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
                aria-label="Cerrar ventana"
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

export { HomePageDesktop as HomePage };
export default HomePageDesktop;
