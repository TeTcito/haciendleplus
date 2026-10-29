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
import { useDocumentMeta } from '../../utils/seo';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';

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

interface ClientReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  avatarUrl: string;
}

const INITIAL_CLIENT_REVIEWS: ClientReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Misión HXP · ONG',
    role: 'Larga Estadía · Delegación',
    rating: 5,
    comment: 'Privacidad, internet fibra óptica y 3 comidas diarias impecables para nuestros 75 voluntarios durante varias semanas.',
    avatarUrl: '/images/avatars/mision-hxp.jpg',
  },
  {
    id: 'rev-2',
    author: 'IMC Cooperación',
    role: 'Hospedaje Empresas y Grupos',
    rating: 5,
    comment: 'Ubicación estratégica en Quito–Píntag a 30 min del aeropuerto, amplios parqueaderos, habitaciones cómodas y atención directa.',
    avatarUrl: '/images/avatars/imc-cooperacion.jpg',
  },
  {
    id: 'rev-3',
    author: 'GAD de Pichincha',
    role: 'Grandes Eventos Corporativos',
    rating: 5,
    comment: 'Carpas, jardines, tarima, canchas deportivas, piscina y un catering puntual y abundante para nuestra jornada de integración.',
    avatarUrl: '/images/avatars/gad-pichincha.jpg',
  },
  {
    id: 'rev-4',
    author: 'Dir. Banco & Finanzas',
    role: 'Fin de Año & Convención',
    rating: 5,
    comment: 'Un solo proveedor para nuestro gran evento, pista de baile, parrillada y hospedaje complementario. Facilitó todo el presupuesto.',
    avatarUrl: '/images/avatars/banco-finanzas.jpg',
  },
  {
    id: 'rev-5',
    author: 'Sofía & Sebastián',
    role: 'Bodas y Celebraciones',
    rating: 5,
    comment: 'Celebramos nuestra ceremonia y recepción en los jardines y alojamos a los invitados que vinieron de fuera en las 14 habitaciones.',
    avatarUrl: '/images/avatars/sofia-sebastian.jpg',
  },
  {
    id: 'rev-6',
    author: 'Dr. Carlos Mendoza',
    role: 'Encuentro Empresarial',
    rating: 5,
    comment: 'Instalaciones de primer nivel en Quito–Píntag, salones equipados y piscina y restaurante como complementos extraordinarios.',
    avatarUrl: '/images/avatars/dr-carlos.jpg',
  },
  {
    id: 'rev-7',
    author: 'Valeria & Mateo',
    role: 'Boda & Catering Propio',
    rating: 5,
    comment: 'La decoración, la recepción bajo carpa y el catering propio dejaron encantados a nuestros 220 invitados.',
    avatarUrl: '/images/avatars/valeria-mateo.jpg',
  },
  {
    id: 'rev-8',
    author: 'Familia Andrade',
    role: 'Celebración & Hospedaje',
    rating: 5,
    comment: 'El complemento de la piscina temperada de 14×6m, los hidromasajes y el restaurante hicieron inolvidable la estadía del grupo.',
    avatarUrl: '/images/avatars/familia-andrade.jpg',
  },
];

const HERO_STOP_CARDS = [
  {
    id: 'larga-estadia',
    location: 'Quito–Píntag · Prioridad Comercial',
    title: 'Hospedaje para empresas, delegaciones y ONGs',
    subtitle: '14 habitaciones (28 a 80 personas), alimentación, internet fibra óptica y parqueaderos.',
    meta: 'Larga Estadía · Cotización por personas y duración',
    cardImage: '/images/hacienda/grupos-hxp.jpg',
    bgImage: '/images/hacienda/hero-vista-aerea-clean-derecha.jpg',
    route: '/hospedaje',
    serviceType: 'grupos' as const,
  },
  {
    id: 'grandes-eventos',
    location: 'Explanada 5.000 m² & Carpas · Quito–Píntag',
    title: 'Grandes eventos y experiencias corporativas',
    subtitle: 'Fin de año, integración y convenciones: carpas, jardines, catering, tarima, pista de baile, canchas y piscina.',
    meta: 'Macroeventos de 50 a 350 pax · Hospedaje complementario',
    cardImage: '/images/hacienda/jardines-teambuilding.jpg',
    bgImage: '/images/hacienda/hero-atardecer.jpg',
    route: '/corporativo',
    serviceType: 'corporativo' as const,
  },
  {
    id: 'bodas',
    location: 'Jardines & Recepción de Gala · Quito–Píntag',
    title: 'Bodas y celebraciones sociales',
    subtitle: 'Ceremonias, recepción, jardines, catering, decoración y hospedaje para invitados.',
    meta: 'Bodas & Eventos Sociales · Hasta 300 invitados',
    cardImage: '/images/hacienda/montaje-banquete.jpg',
    bgImage: '/images/hacienda/bodas-exteriores.jpg',
    route: '/bodas',
    serviceType: 'bodas' as const,
  },
  {
    id: 'instalaciones',
    location: 'Quito–Píntag · A 30 min del Aeropuerto',
    title: 'Piscina, restaurante y actividades recreativas',
    subtitle: 'Complementos que fortalecen tu larga estadía o gran evento en un mismo predio privado.',
    meta: 'Piscina 14×6m, Canchas Deportivas y Gastronomía Propia',
    cardImage: '/images/hacienda/piscina-aerea.jpg',
    bgImage: '/images/hacienda/piscina-nocturna.jpg',
    route: '/hospedaje',
    serviceType: 'hospedaje' as const,
  },
];

interface MainServiceCardItem {
  title: string;
  desc: string;
  img: string;
  link: string;
  badge: string;
}

const MAIN_SERVICES_CARDS: MainServiceCardItem[] = [
  {
    title: 'Hospedaje Empresas',
    desc: 'Prioridad Larga Estadía: 14 hab., alimentación, internet y parqueadero.',
    img: '/images/hacienda/grupos-hxp.jpg',
    link: '/hospedaje',
    badge: 'Prioridad Comercial',
  },
  {
    title: 'Grandes Eventos',
    desc: 'Fin de año, integración, convenciones, carpas, jardines y tarima.',
    img: '/images/hacienda/jardines-teambuilding.jpg',
    link: '/corporativo',
    badge: 'Hasta 350+ pax',
  },
  {
    title: 'Bodas y Celebraciones',
    desc: 'Ceremonias, recepción, jardines, catering, decoración y hospedaje.',
    img: '/images/hacienda/montaje-banquete.jpg',
    link: '/bodas',
    badge: 'Bodas Exclusivas',
  },
  {
    title: 'Comp.: Piscina & Canchas',
    desc: 'Piscina 14×6m, hidromasajes y deportes que fortalecen tu evento.',
    img: '/images/hacienda/piscina-aerea.jpg',
    link: '/corporativo',
    badge: 'Complementario',
  },
  {
    title: 'Comp.: Restaurante',
    desc: 'Alimentación 3 tiempos, parrilladas y catering propio en hacienda.',
    img: '/images/hacienda/gastronomia-2.jpg',
    link: '/hospedaje',
    badge: 'Catering Propio',
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

  useDocumentMeta({
    title: 'Hacienda Le Plus | Hospedaje de larga estadía, grandes eventos y bodas en Quito–Píntag',
    description:
      'Presentación de Hacienda Le Plus en Quito–Píntag: prioridad comercial en hospedaje de larga estadía para empresas y grupos, grandes eventos corporativos y bodas. Cotizaciones al WhatsApp 0969817891.',
    canonicalPath: '/',
  });

  // Estado y ref para el Carrusel Táctil de Servicios Principales
  const servicesCarouselRef = useRef<HTMLDivElement>(null);
  const [activeServiceCardIndex, setActiveServiceCardIndex] = useState(0);

  const handleServicesScroll = () => {
    if (!servicesCarouselRef.current) return;
    const { scrollLeft } = servicesCarouselRef.current;
    const cardStep = 150;
    const newIndex = Math.round(scrollLeft / cardStep);
    setActiveServiceCardIndex(Math.min(Math.max(newIndex, 0), MAIN_SERVICES_CARDS.length - 1));
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
  const [reviews, setReviews] = useState<ClientReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('hacienda_leplus_client_reviews_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].avatarUrl) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_CLIENT_REVIEWS;
  });
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
    const nextIdx = (activeCardIndex + 1) % HERO_STOP_CARDS.length;
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

    const updated = [created, ...reviews];
    setReviews(updated);
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

  const currentStop = HERO_STOP_CARDS[activeCardIndex];

  const bodaPkg = packages.find((p) => p.id === 'pkg-boda-gala') || packages.find((p) => p.category === 'bodas');
  const bodaHospPkg = packages.find((p) => p.id === 'pkg-boda-hospedaje');
  const corpPkg = packages.find((p) => p.id === 'pkg-corp-jornada') || packages.find((p) => p.category === 'corporativo');
  const corpRetiroPkg = packages.find((p) => p.id === 'pkg-corp-retiro');
  const ongPkg = packages.find((p) => p.id === 'pkg-grupos-largas') || packages.find((p) => p.category === 'hospedaje');
  const escapePkg = packages.find((p) => p.id === 'pkg-escapada-pareja') || packages.find((p) => p.category === 'escapadas');

  const portfolioServices = [
    {
      id: 'srv-larga-estadia',
      overline: 'PRIORIDAD COMERCIAL · LARGA ESTADÍA EN QUITO–PÍNTAG',
      title: ongPkg?.title || 'Hospedaje para Empresas y Grupos (Larga Estadía)',
      description:
        'Alojamiento estratégico para personal de empresas, delegaciones, ONG (IMC · HXP), voluntarios y grupos internacionales. Habitaciones configurables, alimentación diaria, internet fibra óptica, parqueaderos y cotización según número de personas y duración.',
      inclusions: [
        '14 habitaciones configurables (28 a 80 personas) con limpieza y lavandería',
        'Alimentación completa en restaurante, internet fibra óptica y parqueaderos privados',
        'Cotización flexible por número de personas y duración (días, semanas o meses)',
      ],
      priceText: `${ongPkg?.priceLabel || 'Desde'} $${ongPkg?.priceValue ?? 35} / persona / noche`,
      capacityText: ongPkg?.capacity || '28 a 80 personas · 14 habitaciones',
      image: ongPkg?.image || '/images/hacienda/grupos-hxp.jpg',
      imageCaption: 'PRIORIDAD COMERCIAL · LARGA ESTADÍA PARA EMPRESAS Y GRUPOS',
      selectorTitle: '1. Hospedaje Empresas y Grupos (Larga Estadía)',
      selectorDesc: 'Personal de empresas, delegaciones, ONGs y grupos internacionales.',
      circleBg: '#113B4F',
      route: '/hospedaje',
      serviceType: 'grupos' as const,
      Icon: HeartHandshake,
    },
    {
      id: 'srv-grandes-eventos',
      overline: 'PRIORIDAD COMERCIAL · MACROEVENTOS Y EMPRESAS',
      title: corpPkg?.title || 'Grandes Eventos y Experiencias Corporativas',
      description:
        'Eventos de fin de año, integración, convenciones y celebraciones de gran formato en Quito–Píntag. Incluye carpas, 5.000 m² de jardines, catering, tarima, pista de baile, actividades deportivas, piscina y hospedaje complementario.',
      inclusions: [
        'Carpas estructurales, salones, tarima, sonido profesional y pista de baile',
        'Jardines de 5.000 m², canchas deportivas (fútbol, vóley, básquet) y catering propio',
        'Piscina temperada 14×6m y 14 habitaciones de hospedaje complementario',
      ],
      priceText: `${corpPkg?.priceLabel || 'Desde'} $${corpPkg?.priceValue ?? 45} / participante`,
      capacityText: corpPkg?.capacity || '50 a 350 participantes',
      image: corpPkg?.image || '/images/hacienda/jardines-teambuilding.jpg',
      imageCaption: 'MACROEVENTOS, FIN DE AÑO, INTEGRACIÓN Y CONVENCIONES',
      selectorTitle: '2. Grandes Eventos y Corporativo',
      selectorDesc: 'Fin de año, integración, convenciones, carpas, tarima y pista de baile.',
      circleBg: '#4A5D36',
      route: '/corporativo',
      serviceType: 'corporativo' as const,
      Icon: Building2,
    },
    {
      id: 'srv-bodas',
      overline: 'BODAS Y EVENTOS SOCIALES EN QUITO–PÍNTAG',
      title: bodaPkg?.title || 'Bodas y Celebraciones Sociales',
      description:
        'Ceremonias al aire libre con vistas a los volcanes, recepción en carpa de gala o salón, jardines exclusivos, catering propio, decoración personalizada y hospedaje para invitados en nuestras 14 habitaciones.',
      inclusions: [
        'Ceremonias en jardines naturales y recepción cubierta en carpa de gala o salón',
        'Catering propio de alto nivel, decoración floral, tarima y pista de baile',
        'Hospedaje para 28 a 80 invitados in situ con desayuno y suite nupcial',
      ],
      priceText: `${bodaPkg?.priceLabel || 'Desde'} $${bodaPkg?.priceValue ?? 70} / invitado`,
      capacityText: bodaPkg?.capacity || '80 a 300 invitados',
      image: bodaPkg?.image || '/images/hacienda/montaje-banquete.jpg',
      imageCaption: 'CEREMONIAS, RECEPCIÓN, JARDINES, CATERING Y HOSPEDAJE',
      selectorTitle: '3. Bodas y Celebraciones',
      selectorDesc: 'Ceremonias, recepción, jardines, catering, decoración y hospedaje.',
      circleBg: '#C8531B',
      route: '/bodas',
      serviceType: 'bodas' as const,
      Icon: Sparkles,
    },
    {
      id: 'srv-comp-restaurante',
      overline: 'COMPLEMENTO QUE FORTALECE TU ESTADÍA O EVENTO',
      title: 'Complemento: Restaurante, Alimentación y Catering Propio',
      description:
        'Nuestro restaurante y cocina de planta fortalecen tanto el hospedaje de larga estadía (3 comidas diarias balanceadas para empresas y ONGs) como los grandes eventos corporativos y bodas (parrilladas, banquetes y coffee breaks).',
      inclusions: [
        'Planes de alimentación diaria (desayuno, almuerzo y cena) para largas estadías',
        'Banquetes de gala, parrilladas campestres y coffee breaks para grandes eventos',
        'Control total de calidad, puntualidad y presupuesto con un solo proveedor',
      ],
      priceText: 'Complemento Gastronómico In Situ',
      capacityText: 'Para Larga Estadía, Macroeventos y Bodas',
      image: '/images/hacienda/gastronomia-parrillada.jpg',
      imageCaption: 'RESTAURANTE Y CATERING COMO COMPLEMENTO INTEGRAL',
      selectorTitle: 'Complemento: Restaurante y Catering',
      selectorDesc: 'Alimentación para largas estadías, parrilladas y banquetes de eventos.',
      circleBg: '#7A4928',
      route: '/hospedaje',
      serviceType: 'grupos' as const,
      Icon: Utensils,
    },
    {
      id: 'srv-comp-piscina',
      overline: 'COMPLEMENTO RECREATIVO Y DE BIENESTAR',
      title: 'Complemento: Piscina Temperada 14×6m y Zona Húmeda',
      description:
        'La piscina cubierta de 14×6 metros, los dos hidromasajes, el sauna y el baño turco se integran como el complemento ideal para el descanso del personal en larga estadía, jornadas corporativas y huéspedes de bodas.',
      inclusions: [
        'Piscina temperada de 14×6 metros bajo cubierta climatizada',
        'Dos hidromasajes, sauna finlandés y baño turco para recuperación y bienestar',
        'Valor agregado exclusivo para grupos alojados y eventos empresariales',
      ],
      priceText: 'Complemento Incluido en Estadías y Eventos',
      capacityText: 'Piscina 14×6m + 2 Hidromasajes + Sauna & Turco',
      image: escapePkg?.image || '/images/hacienda/piscina-aerea.jpg',
      imageCaption: 'PISCINA Y ZONA HÚMEDA COMO COMPLEMENTO DE VALOR',
      selectorTitle: 'Complemento: Piscina y Zona Húmeda',
      selectorDesc: 'Piscina 14×6m, 2 hidromasajes, sauna y turco para tus grupos y eventos.',
      circleBg: '#9E7329',
      route: '/corporativo',
      serviceType: 'corporativo' as const,
      Icon: Waves,
    },
    {
      id: 'srv-comp-recreacion',
      overline: 'COMPLEMENTO DEPORTIVO Y DE INTEGRACIÓN',
      title: 'Complemento: Actividades Deportivas, Canchas y Recreación',
      description:
        'Fortalece la convivencia de tu empresa, delegación o evento de fin de año con 5.000 m² de jardines, canchas deportivas reglamentarias y salón de juegos sin salir de la propiedad.',
      inclusions: [
        'Canchas de fútbol, vóley y básquet para torneos corporativos y recreación',
        'Salón social con billar, ping-pong, karaoke y áreas de fogata/convivencia',
        '5.000 m² de jardines privados para gincanas, team building y descanso',
      ],
      priceText: 'Complemento Deportivo & Recreativo',
      capacityText: '5.000 m² de Jardines y Canchas Deportivas',
      image: corpRetiroPkg?.image || '/images/hacienda/reunion-corporativa.jpg',
      imageCaption: 'CANCHAS Y RECREACIÓN QUE FORTALECEN TU EXPERIENCIA',
      selectorTitle: 'Complemento: Actividades Recreativas',
      selectorDesc: 'Canchas de fútbol, vóley, básquet, billar, karaoke y áreas verdes.',
      circleBg: '#2E5239',
      route: '/corporativo',
      serviceType: 'corporativo' as const,
      Icon: ShieldCheck,
    },
    {
      id: 'srv-ubicacion-logistica',
      overline: 'UBICACIÓN ESTRATÉGICA EN QUITO–PÍNTAG',
      title: 'Instalaciones, Internet Fibra Óptica y Parqueaderos Privados',
      description:
        'Ubicada en Quito–Píntag (Barrio San Juan de la Tola, Calle Deus N.º 100), a 40 min de Quito y 30 min del Aeropuerto Mariscal Sucre. Cuenta con internet por fibra óptica, amplios parqueaderos internos y flota de buses.',
      inclusions: [
        'A 40 min de Quito y 30 min del Aeropuerto Internacional Mariscal Sucre',
        'Parqueadero privado de gran capacidad para vehículos, camionetas y buses',
        'Internet de fibra óptica estable en habitaciones, salones y áreas sociales',
      ],
      priceText: 'Atención Directa · WhatsApp 0969817891',
      capacityText: 'Quito–Píntag · Predio Cerrado y Seguro',
      image: bodaHospPkg?.image || '/images/hacienda/vista-aerea.jpg',
      imageCaption: 'CONECTIVIDAD Y PARQUEADEROS A 30 MIN DEL AEROPUERTO',
      selectorTitle: 'Ubicación Quito–Píntag & Parqueaderos',
      selectorDesc: 'A 40 min de Quito y 30 min del Aeropuerto, fibra óptica y parqueaderos.',
      circleBg: '#A64B2A',
      route: '/hospedaje',
      serviceType: 'grupos' as const,
      Icon: BedDouble,
    },
  ];

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
            {HERO_STOP_CARDS.map((stop, idx) => {
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
                  Larga Estadía <br />
                  <span className="text-[#E5C98B] italic font-normal">&amp; Grandes Eventos</span>
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
                    <span className="leading-none">Cotizar</span>
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
                  Nuestros Servicios
                </h3>
              </ScrollReveal>

              {/* Botones de desplazamiento al margen derecho */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handlePrevServiceCard}
                  aria-label="Servicio anterior"
                  className="w-7 h-7 rounded-full bg-[#EAE2D5] hover:bg-[#D8CDBC] active:scale-90 flex items-center justify-center text-[#071912] transition-all shadow-2xs cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNextServiceCard}
                  aria-label="Servicio siguiente"
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
                {MAIN_SERVICES_CARDS.map((card, i) => (
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
                            Explorar
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
                title="Instalaciones Exclusivas"
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
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">14 Hab.</span>
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
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">Fibra & Salón</span>
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
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">Restaurante</span>
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
                  <span className="text-[10px] font-bold text-[#071912] leading-tight">Piscina</span>
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
                const shortLabels = [
                  'Larga Estadía',
                  'Grandes Eventos',
                  'Bodas & Gala',
                  'Restaurante',
                  'Piscina & Spa',
                  'Canchas & Juegos',
                  'Parqueaderos',
                ];
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
              <span>Cotizar Servicio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <Link
              to={activePortfolioService.route}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#141413]/10 text-xs font-bold text-[#141413] hover:text-[#C04D18] active:scale-95 transition-all"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Ver Página</span>
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
          <div className="relative w-full lg:w-[29.5%] xl:w-[29%] text-white bg-[#113221] lg:bg-transparent rounded-b-[32px] lg:rounded-none px-4 sm:px-8 lg:pl-12 lg:pr-6 pt-6 pb-6 lg:pt-12 lg:pb-14 flex flex-col justify-center shrink-0">
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

            <div className="space-y-3 max-w-sm relative z-10">
              <ScrollReveal direction="zoom-in" delay={50} scale={0.96}>
                <SectionDividerTitle
                  id="heading-evidencia"
                  title="Voces Reales & Reseñas"
                  theme="light"
                />
              </ScrollReveal>

              <ScrollReveal direction="left" delay={140} distance={30}>
                <p className="text-xs sm:text-[13px] text-white/80 leading-relaxed text-center">
                  Acompañamos cada boda, retiro corporativo y delegación internacional en Píntag para asegurar que tu experiencia sea memorable, cálida y bien coordinada.
                </p>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={280} distance={40}>
                <div className="pt-1 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsReviewModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#4B6E24] via-[#5E842E] to-[#749B3B] hover:from-[#577E2B] hover:to-[#82AD43] text-white text-xs font-semibold shadow-md border border-[#8AB34B]/40 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    <span>Dejar mi Opinión</span>
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
                aria-label="Cerrar ventana"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#113221]/10 hover:bg-[#113221] text-[#113221] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-[#5E842E]" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#5E842E]">
                  NUEVA RESEÑA EN HACIENDA LE PLUS
                </span>
              </div>

              <h3 id="modal-review-title" className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#113221]">
                Comparte tu experiencia
              </h3>
              <p className="text-xs text-[#113221]/70 mt-1">
                Tu comentario se publicará inmediatamente en nuestro carrusel de experiencias reales.
              </p>

              {reviewSubmittedSuccess ? (
                <div className="my-6 p-5 rounded-2xl bg-[#113221] text-white text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-[#A3C468] mx-auto" />
                  <p className="font-bold text-sm">¡Gracias por compartir tu opinión!</p>
                  <p className="text-xs text-white/80">Tu reseña ya está visible al inicio del carrusel.</p>
                </div>
              ) : (
                <form onSubmit={handleAddClientReview} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#113221]/80 mb-1">
                      Tu Nombre, Familia o Institución *
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={40}
                      placeholder="Ej. Familia Gómez / Empresa Andina"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#113221]/20 text-sm text-[#113221] focus:outline-none focus:border-[#5E842E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#113221]/80 mb-1">
                        Experiencia Vivida
                      </label>
                      <select
                        value={newReviewRole}
                        onChange={(e) => setNewReviewRole(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#113221]/20 text-xs font-semibold text-[#113221] focus:outline-none focus:border-[#5E842E]"
                      >
                        <option value="Bodas & Recepciones">Bodas & Recepciones</option>
                        <option value="Corporativo & GADs">Corporativo & GADs</option>
                        <option value="Delegación ONG / HXP">Delegación ONG / HXP</option>
                        <option value="Suites & Zona Húmeda">Suites & Zona Húmeda</option>
                        <option value="Gastronomía & Eventos">Gastronomía & Eventos</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#113221]/80 mb-1">
                        Calificación
                      </label>
                      <div className="flex items-center gap-1.5 h-[38px] px-3 rounded-xl bg-white border border-[#113221]/20">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            key={starVal}
                            type="button"
                            onClick={() => setNewReviewRating(starVal)}
                            className="cursor-pointer focus:outline-none"
                            aria-label={`${starVal} estrellas`}
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
                      Tu Comentario o Reseña *
                    </label>
                    <textarea
                      required
                      rows={3}
                      maxLength={170}
                      placeholder="Cuéntanos qué fue lo que más te gustó de Hacienda Le Plus..."
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
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#4B6E24] to-[#6E9436] hover:from-[#577E2B] hover:to-[#7CA63E] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Publicar Opinión</span>
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
