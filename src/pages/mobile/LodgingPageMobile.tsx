import React, { useState, useEffect, useRef } from 'react';
import {
  BedDouble,
  Users,
  Bath,
  CheckCircle2,
  Globe,
  Calendar,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Waves,
  Utensils,
  ShieldCheck,
  Star,
  MapPin,
  Play,
  X,
  PhoneCall,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Search,
  Clock,
  Heart,
  FileText,
  Coffee,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import { getCabinsData } from '../../data/resortSpaces';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { useDocumentMeta } from '../../utils/seo';
import { DirectQuoteForm } from '../../components/DirectQuoteForm';
import { ScrollReveal } from '../../components/ScrollReveal';
import { CabinRoom } from '../../types/cms';

interface LodgingServiceItem {
  id: string;
  title: string;
  badge: string;
  badgeClass: string;
  image: string;
  description: string;
  serviceType: 'bodas' | 'corporativo' | 'hospedaje' | 'escapadas' | 'grupos' | 'visita';
  itemName: string;
}

const getLodgingServicesCards = (isEn: boolean): LodgingServiceItem[] => [
  {
    id: 'alimentacion-restaurante',
    title: isEn ? 'Dining & Restaurant' : 'Alimentación & Restaurante',
    badge: isEn ? 'Board' : 'Pensión',
    badgeClass: 'bg-[#13281F]/90 text-[#E2C585] border border-[#C8A45D]/40',
    image: '/images/hacienda/gastronomia-parrillada.jpg',
    description: isEn
      ? 'Breakfasts, lunches, dinners, and coffee breaks for corporate teams and delegations.'
      : 'Desayunos, almuerzos, cenas y coffee breaks para empresas y delegaciones.',
    serviceType: 'hospedaje',
    itemName: isEn
      ? '3-Meal Catering & Restaurant for Extended Stays'
      : 'Alimentación 3 Tiempos y Restaurante para Larga Estadía',
  },
  {
    id: 'internet-parqueaderos',
    title: isEn ? 'Internet & Parking' : 'Internet & Parqueaderos',
    badge: isEn ? 'Logistics' : 'Logística',
    badgeClass: 'bg-[#8C6D3F]/90 text-[#FAF7F2]',
    image: '/images/hacienda/grupos-hxp.jpg',
    description: isEn
      ? 'High-speed dedicated fiber optic WiFi and secure parking for trucks, vans, and buses.'
      : 'Fibra óptica de alta velocidad y estacionamiento seguro para camionetas y buses.',
    serviceType: 'hospedaje',
    itemName: isEn
      ? 'Corporate Stay with Fiber Optic WiFi & Private Parking'
      : 'Estadía Corporativa con Internet Fibra Óptica y Parqueaderos',
  },
  {
    id: 'piscina-bienestar',
    title: isEn ? 'Amenity: Heated Pool' : 'Comp.: Piscina & Bienestar',
    badge: isEn ? 'Amenity' : 'Complemento',
    badgeClass: 'bg-[#1A382B]/90 text-[#FAF7F2]',
    image: '/images/hacienda/area-humeda.jpg',
    description: isEn
      ? 'Heated 14×6m pool, 2 jacuzzis, sauna, and steam bath for team rest and recovery.'
      : 'Piscina temperada 14×6 m, 2 hidromasajes, sauna y turco para el descanso.',
    serviceType: 'hospedaje',
    itemName: isEn ? 'Heated Swimming Pool & Wet Zone Amenity' : 'Complemento Piscina Temperada y Zona Húmeda',
  },
  {
    id: 'recreacion-deportes',
    title: isEn ? 'Amenity: Sports Courts' : 'Comp.: Recreación & Canchas',
    badge: isEn ? 'Amenity' : 'Complemento',
    badgeClass: 'bg-[#6B7052]/90 text-[#FAF7F2]',
    image: '/images/hacienda/jardines-teambuilding.jpg',
    description: isEn
      ? '5,000 m² of green lawns, soccer field, volleyball, and basketball courts.'
      : '5.000 m² de áreas verdes, canchas de fútbol, vóley y básquetbol para equipos.',
    serviceType: 'grupos',
    itemName: isEn
      ? 'Group Lodging with Sports Courts & Recreation'
      : 'Hospedaje Grupal con Actividades Recreativas y Canchas',
  },
];

export const LodgingPageMobile: React.FC = () => {
  const { siteConfig, cabins, openQuoteModal } = useCMS();
  const { language, isEn } = useLanguage();

  // SEO Meta
  useDocumentMeta({
    title: isEn
      ? 'Lodging for Companies and Groups (Extended Stay) in Quito–Píntag | Hacienda Le Plus'
      : 'Hospedaje para Empresas y Grupos (Larga Estadía) en Quito–Píntag | Hacienda Le Plus',
    description: isEn
      ? 'Extended-stay lodging for company staff, delegations, NGOs, volunteers, and international groups in Quito–Píntag. 14 rooms (28 to 80 guests), catering, fiber optic WiFi, parking, and custom quotes by guest count and duration.'
      : 'Hospedaje de larga estadía para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales en Quito–Píntag. 14 habitaciones (28 a 80 personas), alimentación, internet fibra óptica, parqueaderos y cotización según número de personas y duración.',
    canonicalPath: '/hospedaje',
    lang: language,
  });

  // Fechas dinámicas automáticas para el widget de agendamiento
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Estado del widget funcional de cotización según número de personas y duración (inicialmente vacíos)
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [stayDuration, setStayDuration] = useState('');
  const [guestsSelection, setGuestsSelection] = useState('');

  // Referencias y manejadores para abrir el selector de fecha al hacer clic en cualquier parte del bloque
  const checkInInputRef = useRef<HTMLInputElement>(null);

  const handleOpenCheckInPicker = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (checkInInputRef.current) {
      try {
        checkInInputRef.current.showPicker();
      } catch {
        checkInInputRef.current.focus();
      }
    }
  };

  // Estado del carrusel interactivo de testimonios
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Estados de modales
  const [selectedCabinModal, setSelectedCabinModal] = useState<CabinRoom | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  // Referencias para carruseles táctiles de Habitaciones y Servicios
  const cabinsCarouselRef = useRef<HTMLDivElement>(null);
  const servicesCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCabins = (direction: 'left' | 'right') => {
    if (cabinsCarouselRef.current) {
      const scrollAmount = 160;
      cabinsCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollServices = (direction: 'left' | 'right') => {
    if (servicesCarouselRef.current) {
      const scrollAmount = 160;
      servicesCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Estado para mostrar el formulario cuando se termine el contador
  const [showExpiredForm, setShowExpiredForm] = useState(false);

  // Contador regresivo en tiempo real para la oferta de descuento
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 36,
    seconds: 27,
  });

  const isPromoExpired =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Función al hacer clic en el botón "Cotizar Estadía" de la barra de cotización según personas y duración
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dest = destination || (isEn ? 'Group / Corporate Lodging' : 'Hospedaje Grupal / Empresas');
    const dur = stayDuration || (isEn ? 'Stay duration to arrange' : 'Estadía a convenir');
    const guests = guestsSelection || (isEn ? 'To be specified' : 'Por definir');
    openQuoteModal({
      serviceType: 'hospedaje',
      itemName: `${dest} | ${dur} | ${guests}`,
    });
  };

  // Reseñas bilingües para el carrusel de testimonios (Larga Estadía, Empresas, ONGs y Grupos)
  const testimonials = [
    {
      id: 1,
      quote: isEn
        ? 'We lodged our international HXP mission of 42 volunteers across the 14 rooms. The 3-course catering, dedicated fiber optic WiFi, and bus parking operated seamlessly.'
        : 'Alojamos a nuestra misión internacional HXP de 42 voluntarios en las 14 habitaciones. La alimentación de 3 tiempos, el internet por fibra óptica y los parqueaderos para buses funcionaron a la perfección.',
      author: 'Sarah Mitchell',
      role: isEn ? 'HXP Mission Coordinator · International NGO' : 'Coordinación Misión HXP · ONG Internacional',
      avatar: '/images/avatars/mision-hxp.jpg',
      rating: 5,
    },
    {
      id: 2,
      quote: isEn
        ? 'Outstanding extended-stay option for our technical and executive staff close to Quito and the Airport. Comfortable rooms, stable internet, punctual meals, and corporate invoicing.'
        : 'Excelente opción de larga estadía para nuestro personal técnico y directivo cerca de Quito y el Aeropuerto. Habitaciones cómodas, internet estable, alimentación puntual y facturación corporativa.',
      author: 'Dr. Carlos Enríquez',
      role: isEn ? 'Board of Directors · Corporate Operations' : 'Directorio Ejecutivo · Empresas & Proyectos',
      avatar: '/images/avatars/dr-carlos.jpg',
      rating: 5,
    },
    {
      id: 3,
      quote: isEn
        ? 'Our international delegation stayed the entire week in Píntag. The heated pool, on-site dining, and outdoor sports courts were the perfect complement after intense field days.'
        : 'Tuvimos a nuestra delegación alojada toda la semana en Píntag. La piscina temperada, el restaurante y las canchas deportivas fueron el complemento ideal tras cada jornada de trabajo.',
      author: isEn ? 'IMC Coordination' : 'Coordinación IMC',
      role: isEn ? 'International Delegation · Extended Stay' : 'Delegación Internacional · Estadía Prolongada',
      avatar: '/images/avatars/familia-andrade.jpg',
      rating: 5,
    },
    {
      id: 4,
      quote: isEn
        ? 'We booked the room wing for our guests and organizing crew. Spacious, 24/7 security, and transparent volume and duration quoting.'
        : 'Reservamos el bloque de habitaciones para nuestros invitados y equipo organizador. Espacioso, seguro las 24 horas y con opciones claras de cotización según número de personas y días.',
      author: 'Valeria & Mateo',
      role: isEn ? 'Group Lodging & Operations' : 'Hospedaje Grupal & Eventos',
      avatar: '/images/avatars/valeria-mateo.jpg',
      rating: 5,
    },
  ];

  const handleNextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Lista de habitaciones y cabañas con nombres en español o inglés (Prioridad Larga Estadía Empresas y Grupos)
  const defaultCabins = getCabinsData(isEn);
  const displayCabins: CabinRoom[] = isEn
    ? defaultCabins.map((enCabin) => {
        const cmsCabin = cabins?.find((c) => c.id === enCabin.id);
        return cmsCabin
          ? { ...enCabin, pricePerNight: cmsCabin.pricePerNight, image: cmsCabin.image }
          : enCabin;
      })
    : cabins && cabins.length >= 4
    ? cabins.slice(0, 4)
    : defaultCabins;
  const lodgingServices = getLodgingServicesCards(isEn);

  return (
    <main className="w-full bg-[#FAF7F2] text-[#0A1F17] overflow-x-hidden selection:bg-[#C8A45D]/30 selection:text-[#06150F]">
      {/* =========================================================================
          SECCIÓN 1: HERO SECTION 16:9 — HOSPEDAJE PARA EMPRESAS Y GRUPOS
          ========================================================================= */}
      <section className="relative w-full overflow-visible z-20 bg-[#06150F]">
        {/* Canvas 16:9 Full Bleed */}
        <div className="relative w-full aspect-[16/9] min-h-[220px] overflow-hidden flex flex-col justify-start">
          {/* Fotografía de Fondo con degradado asimétrico */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/hacienda/lodging-hero-hacienda.jpg"
              alt="Hospedaje para Empresas, Delegaciones y Grupos en Hacienda Le Plus Quito–Píntag"
              className="w-full h-full object-cover object-[65%_center]"
              fetchPriority="high"
            />
            {/* Degradado para contraste sobre el texto a la izquierda */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(6, 21, 15, 0.95) 0%, rgba(6, 21, 15, 0.82) 42%, rgba(6, 21, 15, 0.35) 65%, rgba(6, 21, 15, 0.08) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Contenido en el lado izquierdo: Título elegante y Botón Cotizar */}
          <div className="relative z-10 w-full px-4 sm:px-6 pt-3.5 sm:pt-4 flex flex-col justify-start">
            <div className="max-w-[64%] sm:max-w-[58%] space-y-1.5">
              <ScrollReveal direction="left" delay={60} distance={20}>
                <h1 className="text-white text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  <span className="font-serif-luxury block text-[24px] sm:text-[30px] font-bold leading-[1.02] tracking-tight">
                    {isEn ? 'Corporate Lodging' : 'Hospedaje para Empresas'}
                  </span>
                  <span className="italic font-light text-[17px] sm:text-[22px] bg-gradient-to-r from-[#FAF7F2] via-[#E2C585] to-[#C8A45D] bg-clip-text text-transparent block leading-tight mt-0.5">
                    {isEn ? 'Delegations & Groups' : 'Delegaciones y Grupos'}
                  </span>
                </h1>
              </ScrollReveal>

              {/* Botón Cotizar (actúa como el botón de WhatsApp) */}
              <ScrollReveal direction="up" delay={120} distance={10}>
                <div className="pt-0.5">
                  <a
                    href={buildContextualWhatsAppUrl({
                      phone: siteConfig.whatsappNumber,
                      context: 'hospedaje',
                      itemName: isEn ? 'Corporate & Group Lodging' : 'Hospedaje para Empresas y Grupos',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center justify-center gap-1.5 px-3 h-[20px] rounded-full bg-[#13281F] hover:bg-[#0A1F17] text-[#E2C585] text-xs font-bold leading-none shadow-sm shadow-black/30 border border-[#C8A45D]/40 transition-all cursor-pointer active:scale-95"
                  >
                    <Search className="w-3 h-3 text-[#E2C585] shrink-0" />
                    <span className="leading-none">{isEn ? 'Quote' : 'Cotizar'}</span>
                    <ArrowRight className="w-3 h-3 shrink-0" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* BLOQUE DE COTIZAR ESTADÍA EN UNA SOLA FILA SUPERPUESTO */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-30 w-[94%] max-w-[430px]">
          <form
            onSubmit={handleBookingSubmit}
            className="bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.15)] border border-[#0A1F17]/15 text-[#0A1F17] flex items-center justify-between h-[30px] px-1 gap-1"
          >
            {/* 1. Grupo / Hab */}
            <div className="flex-1 min-w-0 h-full flex items-center px-1">
              <select
                id="booking-dest-mini"
                aria-label={isEn ? 'Group or Room Type' : 'Grupo o Tipo de Habitación'}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={`w-full text-[10px] font-bold ${destination ? 'text-[#06150F]' : 'text-[#0A1F17]/50'} bg-transparent outline-none cursor-pointer truncate leading-none`}
              >
                <option value="" disabled hidden>{isEn ? 'Group / Type' : 'Grupo / Tipo'}</option>
                <option value="Personal de Empresas / Equipos Técnicos">{isEn ? 'Corporate Staff' : 'Empresas'}</option>
                <option value="Delegaciones / ONG / Voluntarios (HXP / IMC)">{isEn ? 'Delegations / NGOs' : 'Delegaciones / ONG'}</option>
                <option value="Grupos Internacionales y Misiones">{isEn ? 'International' : 'Internacionales'}</option>
                <option value="Bloque Completo (14 Habitaciones · 28-80 Pax)">{isEn ? '14 Rooms (28-80p)' : '14 Hab. (28-80p)'}</option>
                <option value="Suites Ejecutivas & Chalet (1-10 Pax)">{isEn ? 'Suites (1-10p)' : 'Suites (1-10p)'}</option>
              </select>
            </div>

            <div className="w-[1px] h-3.5 bg-[#0A1F17]/15 shrink-0" />

            {/* 2. Personas */}
            <div className="w-[78px] shrink-0 h-full flex items-center px-1">
              <select
                id="booking-guests-mini"
                aria-label={isEn ? 'Number of Guests' : 'Número de Personas'}
                value={guestsSelection}
                onChange={(e) => setGuestsSelection(e.target.value)}
                className={`w-full text-[10px] font-bold ${guestsSelection ? 'text-[#06150F]' : 'text-[#0A1F17]/50'} bg-transparent outline-none cursor-pointer truncate leading-none`}
              >
                <option value="" disabled hidden>{isEn ? 'Guests' : 'Personas'}</option>
                <option value="1 a 10 Personas (Suites / Chalet)">1-10 Pax</option>
                <option value="10 a 25 Personas (Equipo / Empresa)">10-25 Pax</option>
                <option value="28 a 50 Personas (Delegación / ONG / Empresa)">28-50 Pax</option>
                <option value="50 a 80 Personas (Bloque Completo 14 Hab.)">50-80 Pax</option>
              </select>
            </div>

            <div className="w-[1px] h-3.5 bg-[#0A1F17]/15 shrink-0" />

            {/* 3. Duración */}
            <div className="w-[78px] shrink-0 h-full flex items-center px-1">
              <select
                id="booking-duration-mini"
                aria-label={isEn ? 'Stay Duration' : 'Duración de Estadía'}
                value={stayDuration}
                onChange={(e) => setStayDuration(e.target.value)}
                className={`w-full text-[10px] font-bold ${stayDuration ? 'text-[#06150F]' : 'text-[#0A1F17]/50'} bg-transparent outline-none cursor-pointer truncate leading-none`}
              >
                <option value="" disabled hidden>{isEn ? 'Duration' : 'Duración'}</option>
                <option value="3 a 6 Noches (Estadía Semanal Corta)">{isEn ? '3-6 nights' : '3-6 noches'}</option>
                <option value="7 a 14 Noches (Estadía Semanal / Quincenal)">{isEn ? '1-2 weeks' : '1-2 sem.'}</option>
                <option value="15 a 30+ Noches (Larga Estadía Mensual)">{isEn ? 'Monthly' : 'Mensual'}</option>
                <option value="Convenio Corporativo Recurrente">{isEn ? 'Agreement' : 'Convenio'}</option>
              </select>
            </div>

            <div className="w-[1px] h-3.5 bg-[#0A1F17]/15 shrink-0" />

            {/* 4. Botón Submit */}
            <button
              type="submit"
              aria-label={isEn ? 'Quote Stay' : 'Cotizar Estadía'}
              className="text-[#071912] hover:text-[#C8A45D] text-[10.5px] font-extrabold flex items-center gap-1 shrink-0 px-1.5 cursor-pointer transition-all active:scale-95 leading-none"
            >
              <span>{isEn ? 'Quote' : 'Cotizar'}</span>
              <ArrowRight className="w-3 h-3 text-[#C8A45D]" />
            </button>
          </form>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 2: FRANJA DE PILARES EN UNA SOLA FILA HORIZONTAL
          ========================================================================= */}
      <section className="w-full bg-white border-b border-[#0A1F17]/10 pt-8 sm:pt-9 pb-3.5 px-2 sm:px-4">
        <div className="max-w-lg mx-auto">
          <div className="grid grid-cols-5 gap-1 text-center">
            {/* Pilar 1: Habitaciones */}
            <div className="flex flex-col items-center justify-center p-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] mb-1.5 shadow-2xs">
                <BedDouble className="w-[21px] h-[21px] stroke-[1.5]" />
              </div>
              <span className="text-[8.5px] sm:text-[9.5px] font-bold text-[#06150F] leading-tight">
                {isEn ? '14 Rooms' : '14 Hab.'}
              </span>
              <span className="text-[7px] text-[#0A1F17]/60 leading-none">28-80 Pax</span>
            </div>

            {/* Pilar 2: Alimentación */}
            <div className="flex flex-col items-center justify-center p-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] mb-1.5 shadow-2xs">
                <Utensils className="w-[21px] h-[21px] stroke-[1.5]" />
              </div>
              <span className="text-[8.5px] sm:text-[9.5px] font-bold text-[#06150F] leading-tight">
                {isEn ? 'Full Board' : 'Pensión'}
              </span>
              <span className="text-[7px] text-[#0A1F17]/60 leading-none">
                {isEn ? 'Catering' : 'Completa'}
              </span>
            </div>

            {/* Pilar 3: Internet */}
            <div className="flex flex-col items-center justify-center p-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] mb-1.5 shadow-2xs">
                <Globe className="w-[21px] h-[21px] stroke-[1.5]" />
              </div>
              <span className="text-[8.5px] sm:text-[9.5px] font-bold text-[#06150F] leading-tight">Internet</span>
              <span className="text-[7px] text-[#0A1F17]/60 leading-none">
                {isEn ? 'Fiber Optic' : 'Fibra Óptica'}
              </span>
            </div>

            {/* Pilar 4: Parqueaderos */}
            <div className="flex flex-col items-center justify-center p-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] mb-1.5 shadow-2xs">
                <ShieldCheck className="w-[21px] h-[21px] stroke-[1.5]" />
              </div>
              <span className="text-[8.5px] sm:text-[9.5px] font-bold text-[#06150F] leading-tight">
                {isEn ? 'Parking' : 'Parqueo'}
              </span>
              <span className="text-[7px] text-[#0A1F17]/60 leading-none">
                {isEn ? 'Private' : 'Privado'}
              </span>
            </div>

            {/* Pilar 5: Complementos */}
            <div className="flex flex-col items-center justify-center p-1">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] mb-1.5 shadow-2xs">
                <Waves className="w-[21px] h-[21px] stroke-[1.5]" />
              </div>
              <span className="text-[8.5px] sm:text-[9.5px] font-bold text-[#06150F] leading-tight">
                {isEn ? 'Pool' : 'Piscina'}
              </span>
              <span className="text-[7px] text-[#0A1F17]/60 leading-none">
                {isEn ? 'Amenity' : 'Comp.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3: HABITACIONES & CABAÑAS EN CARRUSEL (2.5 TARJETAS)
          ========================================================================= */}
      <section className="w-full bg-[#FAF7F2] py-5 border-b border-[#0A1F17]/10 overflow-hidden">
        <div className="w-full space-y-2">
          {/* Encabezado: Título a la izquierda y botones de desplazamiento a la derecha */}
          <div className="flex items-center justify-between px-4 sm:px-6">
            <h2 className="font-serif-luxury text-[18px] sm:text-[21px] font-bold text-[#06150F] leading-tight text-left">
              {isEn ? 'Rooms & Cabins' : 'Habitaciones & Cabañas'}
            </h2>

            {/* Controles de Navegación del Carrusel al Margen Derecho */}
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                type="button"
                onClick={() => scrollCabins('left')}
                aria-label={isEn ? 'Scroll left' : 'Desplazar hacia la izquierda'}
                className="w-8 h-8 rounded-full border border-[#D5C7B2] bg-white hover:bg-[#FAF7F2] text-[#181512] flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#3D352E]" />
              </button>
              <button
                type="button"
                onClick={() => scrollCabins('right')}
                aria-label={isEn ? 'Scroll right' : 'Desplazar hacia la derecha'}
                className="w-8 h-8 rounded-full border border-[#D5C7B2] bg-white hover:bg-[#FAF7F2] text-[#181512] flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-[#3D352E]" />
              </button>
            </div>
          </div>

          {/* Carrusel de 2.5 Tarjetas Reducidas Simétricamente */}
          <div
            ref={cabinsCarouselRef}
            className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-6 scroll-pl-4 sm:scroll-pl-6 pb-2 pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayCabins.map((cabin) => (
              <div
                key={cabin.id}
                className="w-[38vw] min-w-[136px] max-w-[160px] shrink-0 snap-start rounded-xl bg-white border border-[#0A1F17]/10 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Imagen que ocupa el ancho completo */}
                <div className="relative w-full aspect-[4/3] bg-[#0A1F17] overflow-hidden">
                  <img
                    src={cabin.image}
                    alt={cabin.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block"
                    loading="lazy"
                  />
                  <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#06150F]/85 backdrop-blur-xs text-[#E2C585] border border-[#C8A45D]/30 shadow-xs">
                    {cabin.type || (isEn ? 'Extended Stay' : 'Larga Estadía')}
                  </span>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-2 sm:p-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif-luxury text-xs font-bold text-[#06150F] line-clamp-1 leading-snug group-hover:text-[#A6823C] transition-colors">
                      {cabin.name}
                    </h3>

                    <div className="mt-1.5 pt-1 border-t border-[#0A1F17]/8 space-y-1 text-[8.5px] text-[#0A1F17]/75">
                      <div className="flex items-center gap-1 truncate">
                        <Users className="w-2.5 h-2.5 text-[#C8A45D] shrink-0" />
                        <span className="truncate">{cabin.capacity}</span>
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <BedDouble className="w-2.5 h-2.5 text-[#C8A45D] shrink-0" />
                        <span className="truncate">{cabin.beds}</span>
                      </div>
                      <div className="flex items-center gap-1 truncate">
                        <Bath className="w-2.5 h-2.5 text-[#C8A45D] shrink-0" />
                        <span className="truncate">
                          {cabin.bathrooms} {cabin.bathrooms > 1 ? (isEn ? 'baths' : 'baños') : (isEn ? 'bath' : 'baño')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Precio y Botón Ver */}
                  <div className="mt-2 pt-1.5 border-t border-[#0A1F17]/8 flex items-center justify-between">
                    <div>
                      <span className="text-[10.5px] font-bold text-[#06150F]">
                        ${cabin.pricePerNight}
                      </span>
                      <span className="text-[7.5px] text-[#0A1F17]/60 block -mt-0.5">
                        {isEn ? '/ ref. night' : '/ ref. noche'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSelectedCabinModal(cabin)}
                      className="rounded-[3px] bg-[#13281F] hover:bg-[#0A1F17] text-[#FAF7F2] text-[9px] font-bold shadow-2xs active:scale-95 transition-all cursor-pointer inline-flex items-center justify-center shrink-0 min-h-0"
                      style={{
                        height: '13px',
                        minHeight: '13px',
                        maxHeight: '13px',
                        padding: '0 5px',
                        lineHeight: '1',
                      }}
                    >
                      <span className="leading-none block" style={{ transform: 'translateY(-0.5px)' }}>
                        {isEn ? 'View' : 'Ver'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 4: SERVICIOS DE ESTADÍA Y COMPLEMENTOS EN CARRUSEL (2.5 TARJETAS)
          ========================================================================= */}
      <section className="w-full bg-[#FAF7F2] py-5 border-b border-[#0A1F17]/10 overflow-hidden">
        <div className="w-full space-y-2">
          {/* Encabezado: Título a la izquierda y botones de desplazamiento a la derecha */}
          <div className="flex items-center justify-between px-4 sm:px-6">
            <h2 className="font-serif-luxury text-[18px] sm:text-[21px] font-bold text-[#06150F] leading-tight text-left">
              {isEn ? 'Amenities & Services' : 'Servicios & Complementos'}
            </h2>

            {/* Controles de Navegación del Carrusel al Margen Derecho */}
            <div className="flex items-center gap-1.5 shrink-0 ml-2">
              <button
                type="button"
                onClick={() => scrollServices('left')}
                aria-label={isEn ? 'Scroll left' : 'Desplazar hacia la izquierda'}
                className="w-8 h-8 rounded-full border border-[#D5C7B2] bg-white hover:bg-[#FAF7F2] text-[#181512] flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#3D352E]" />
              </button>
              <button
                type="button"
                onClick={() => scrollServices('right')}
                aria-label={isEn ? 'Scroll right' : 'Desplazar hacia la derecha'}
                className="w-8 h-8 rounded-full border border-[#D5C7B2] bg-white hover:bg-[#FAF7F2] text-[#181512] flex items-center justify-center shadow-2xs active:scale-90 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-[#3D352E]" />
              </button>
            </div>
          </div>

          {/* Carrusel de 2.5 Tarjetas de Servicios y Complementos */}
          <div
            ref={servicesCarouselRef}
            className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-4 sm:px-6 scroll-pl-4 sm:scroll-pl-6 pb-2 pt-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {lodgingServices.map((card) => (
              <div
                key={card.id}
                className="w-[38vw] min-w-[136px] max-w-[160px] shrink-0 snap-start rounded-xl bg-white border border-[#0A1F17]/10 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Imagen que ocupa el ancho completo */}
                <div className="relative w-full aspect-[4/3] bg-[#06150F] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 block"
                    loading="lazy"
                  />
                  <span className={`absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 rounded text-[8px] font-bold ${card.badgeClass} backdrop-blur-xs shadow-xs`}>
                    {card.badge}
                  </span>
                </div>

                {/* Contenido de la tarjeta */}
                <div className="p-2 sm:p-2.5 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif-luxury text-xs font-bold text-[#06150F] line-clamp-1 leading-snug group-hover:text-[#A6823C] transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-[9px] text-[#0A1F17]/70 leading-snug line-clamp-2 mt-1">
                      {card.description}
                    </p>
                  </div>

                  {/* Botón Ver */}
                  <div className="mt-2 pt-1.5 border-t border-[#0A1F17]/8 flex items-center justify-between">
                    <span className="text-[8px] font-semibold text-[#A6823C]">
                      {isEn ? 'Lodging' : 'Estadía'}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          serviceType: card.serviceType,
                          itemName: card.itemName,
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
                      <span className="leading-none block" style={{ transform: 'translateY(-0.5px)' }}>
                        {isEn ? 'View' : 'Ver'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 5: VENTAJAS PARA EMPRESAS Y GRUPOS
          ========================================================================= */}
      <section className="w-full bg-white border-t border-[#0A1F17]/10 py-10 sm:py-16">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch w-full">
            {/* Columna izquierda: Título y 4 iconos en una sola fila con separación de 15px */}
            <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <ScrollReveal direction="left" duration={750}>
                  <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#06150F] leading-tight text-left">
                    {isEn ? 'Advantages for Companies & Groups' : 'Ventajas para Empresas y Grupos'}
                  </h2>
                </ScrollReveal>

                {/* 4 Iconos en una sola fila con separación de 15px */}
                <ScrollReveal direction="up" delay={80} duration={650}>
                  <div className="grid grid-cols-4 gap-[15px] pt-1">
                    {/* 1: Tarifas por Volumen */}
                    <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 shadow-2xs hover:border-[#C8A45D]/40 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C8A45D] mb-1 shadow-2xs">
                        <Star className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#06150F] leading-tight">
                        {isEn ? <>Volume<br />Rates</> : <>Tarifas por<br />Volumen</>}
                      </span>
                    </div>

                    {/* 2: Facturación Corporativa */}
                    <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 shadow-2xs hover:border-[#C8A45D]/40 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#123326] mb-1 shadow-2xs">
                        <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#06150F] leading-tight">
                        {isEn ? <>Corporate<br />Billing</> : <>Facturación<br />Corporativa</>}
                      </span>
                    </div>

                    {/* 3: Operación Todo en Uno */}
                    <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 shadow-2xs hover:border-[#C8A45D]/40 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#123326] mb-1 shadow-2xs">
                        <Calendar className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#06150F] leading-tight">
                        {isEn ? <>All-in-One<br />Operations</> : <>Operación<br />Todo en Uno</>}
                      </span>
                    </div>

                    {/* 4: Seguridad & Parqueo 24/7 */}
                    <div className="flex flex-col items-center justify-center text-center p-2 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 shadow-2xs hover:border-[#C8A45D]/40 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#123326] mb-1 shadow-2xs">
                        <PhoneCall className="w-4 h-4 stroke-[1.5]" />
                      </div>
                      <span className="text-[9px] font-bold text-[#06150F] leading-tight">
                        {isEn ? <>24/7<br />Security</> : <>Seguridad<br />24/7</>}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Columna central: Foto de la piscina y cabañas */}
            <ScrollReveal direction="up" duration={850} className="lg:col-span-5 h-full">
              <div className="relative rounded-3xl overflow-hidden min-h-[420px] sm:min-h-[480px] h-full w-full shadow-xl border border-[#0A1F17]/10 hover:scale-[1.015] hover:shadow-2xl transition-all duration-300 group bg-[#0A1F17]">
                <img
                  src="/images/hacienda/privilegio-piscina-clean.jpg"
                  alt="Instalaciones de hospedaje y piscina como complemento en Hacienda Le Plus"
                  className="w-full h-full object-cover object-center block"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>

            {/* Columna derecha: Testimonios interactivos */}
            <ScrollReveal direction="right" duration={850} className="lg:col-span-3 bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#0A1F17]/10 flex flex-col justify-between shadow-sm">
              <div className="space-y-4">
                <div className="text-4xl sm:text-5xl font-serif text-[#C8A45D] leading-none select-none">
                  “
                </div>
                <p className="text-xs sm:text-sm text-[#0A1F17]/80 leading-relaxed italic">
                  "{testimonials[activeTestimonial].quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-[#0A1F17]/10 mt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonials[activeTestimonial].avatar}
                    alt={testimonials[activeTestimonial].author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-[#C8A45D]/40"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-[#06150F]">
                      {testimonials[activeTestimonial].author}
                    </h5>
                    <p className="text-[10px] text-[#0A1F17]/60">
                      {testimonials[activeTestimonial].role}
                    </p>
                    {/* Estrellas */}
                    <div className="flex items-center gap-0.5 text-amber-500 pt-0.5">
                      {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Flechas de navegación y contador */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handlePrevTestimonial}
                      className="w-8 h-8 rounded-full bg-white border border-[#0A1F17]/10 hover:bg-[#071912] hover:text-[#E2C585] flex items-center justify-center text-[#0A1F17] transition-colors cursor-pointer"
                      title={isEn ? 'Previous review' : 'Testimonio anterior'}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextTestimonial}
                      className="w-8 h-8 rounded-full bg-white border border-[#0A1F17]/10 hover:bg-[#071912] hover:text-[#E2C585] flex items-center justify-center text-[#0A1F17] transition-colors cursor-pointer"
                      title={isEn ? 'Next review' : 'Siguiente testimonio'}
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[11px] font-semibold text-[#0A1F17]/60">
                    {activeTestimonial + 1} / {testimonials.length}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 6: CANVAS 16:9 — COTIZACIÓN SEGÚN NÚMERO DE PERSONAS Y DURACIÓN
          ========================================================================= */}
      <section className="relative w-full bg-[#06150F] border-t border-[#C8A45D]/25 overflow-hidden mb-[calc(38px+env(safe-area-inset-bottom,0px))]">
        <div className="relative w-full aspect-[16/9] min-h-[210px] overflow-hidden flex flex-col justify-between">
          {/* Fotografía de Fondo con degradado asimétrico */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="/images/hacienda/vista-aerea.jpg"
              alt="Cotización de Larga Estadía según Número de Personas y Duración en Hacienda Le Plus"
              className="absolute inset-0 w-full h-full object-cover object-right"
              loading="lazy"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'linear-gradient(to right, rgba(6, 21, 15, 0.98) 0%, rgba(6, 21, 15, 0.92) 52%, rgba(6, 21, 15, 0.45) 74%, rgba(6, 21, 15, 0.10) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          {/* Contenido en el lado izquierdo */}
          <div className="relative z-10 w-full h-full px-4 pt-3 pb-2.5 sm:px-6 sm:pt-4 sm:pb-3 flex flex-col justify-between max-w-[76%] sm:max-w-[68%]">
            <div className="space-y-1">
              <h2 className="font-serif-luxury text-[19px] sm:text-[23px] font-bold text-white leading-[1.08] text-left">
                {isEn ? 'Quote by Group Size & Duration' : 'Cotización según Personas & Duración'}
              </h2>
              <p className="text-[12.5px] sm:text-[13.5px] text-[#FAF7F2]/85 leading-snug line-clamp-2 text-left">
                {isEn
                  ? 'Tailored proposals across 14 rooms for companies, delegations, and groups with catering, fiber optic WiFi, and parking.'
                  : 'Propuestas a medida en 14 habitaciones para empresas, delegaciones y grupos con alimentación, fibra óptica y parqueaderos.'}
              </p>
            </div>

            {/* Botón único Solicitar Cotización */}
            <div className="pt-0.5">
              <a
                href={buildContextualWhatsAppUrl({
                  phone: siteConfig.whatsappNumber,
                  context: 'hospedaje',
                  itemName: isEn ? 'Group & Corporate Lodging Quote' : 'Cotización Hospedaje Grupal y Empresas',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E2C585] hover:bg-[#C8A45D] text-[#06150F] text-[12px] sm:text-[13px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
              >
                <span>{isEn ? 'Request Quote' : 'Solicitar Cotización'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#06150F]" />
              </a>
            </div>

            {/* 3 Iconos métricas lineales */}
            <div className="flex items-center gap-2.5 sm:gap-4 -translate-y-[4px]">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/15 text-[#E2C585] flex items-center justify-center shrink-0">
                  <BedDouble className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#FAF7F2] leading-tight">
                  {isEn ? '14 Rooms' : '14 Habitaciones'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/15 text-[#E2C585] flex items-center justify-center shrink-0">
                  <Utensils className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#FAF7F2] leading-tight">
                  {isEn ? 'Catering' : 'Alimentación'}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full bg-white/15 text-[#E2C585] flex items-center justify-center shrink-0">
                  <Globe className="w-3 h-3" />
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#FAF7F2] leading-tight">
                  {isEn ? 'Fiber Optic' : 'Fibra Óptica'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL: DETALLES DE HABITACIÓN SELECCIONADA
          ========================================================================= */}
      {selectedCabinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#0A1F17]/10 flex flex-col max-h-[90vh]">
            {/* Cabecera del modal */}
            <div className="relative h-64 shrink-0">
              <img
                src={selectedCabinModal.image}
                alt={selectedCabinModal.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedCabinModal(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#06150F] text-[#E2C585] border border-[#C8A45D]/40">
                  {selectedCabinModal.type}
                </span>
              </div>
            </div>

            {/* Cuerpo del modal */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#06150F]">
                    {selectedCabinModal.name}
                  </h3>
                  <div className="flex items-center gap-4 text-xs font-semibold text-[#A6823C] mt-1">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> {selectedCabinModal.capacity}
                    </span>
                    <span className="flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5" /> {selectedCabinModal.beds}
                    </span>
                    <span className="flex items-center gap-1">
                      <Bath className="w-3.5 h-3.5" /> {selectedCabinModal.bathrooms} {isEn ? 'Bath(s)' : 'Baño(s)'}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase text-[#0A1F17]/60 block">
                    {isEn ? 'Base Rate' : 'Tarifa Base'}
                  </span>
                  <span className="font-serif-luxury text-3xl font-bold text-[#A6823C]">
                    ${selectedCabinModal.pricePerNight}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#0A1F17]/80 leading-relaxed">
                {selectedCabinModal.description}
              </p>

              <div className="space-y-2 pt-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#06150F]">
                  {isEn ? 'Included Amenities & Facilities' : 'Instalaciones & Complementos Incluidos'}
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedCabinModal.amenities.map((am, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF7F2] text-[#06150F] border border-[#0A1F17]/10"
                    >
                      {am}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#0A1F17]/65 italic bg-[#FAF7F2] p-3 rounded-xl border border-[#0A1F17]/5">
                {selectedCabinModal.weekendNote}
              </p>
            </div>

            {/* Acciones del modal */}
            <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#0A1F17]/10 flex flex-wrap items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedCabinModal(null)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#0A1F17]/70 hover:bg-[#0A1F17]/10 transition-colors cursor-pointer"
              >
                {isEn ? 'Close' : 'Cerrar'}
              </button>

              <a
                href={buildContextualWhatsAppUrl({
                  phone: siteConfig.whatsappNumber,
                  context: 'hospedaje',
                  itemName: selectedCabinModal.name,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-[#071912] text-[#E2C585] hover:bg-[#123326] transition-colors cursor-pointer shadow-sm"
              >
                <span>{isEn ? 'Quote by Guests & Duration' : 'Cotizar según Personas y Duración'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: VIDEO RECORRIDO 360° / PRESENTACIÓN
          ========================================================================= */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#06150F] rounded-3xl overflow-hidden border border-[#C8A45D]/40 shadow-2xl p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between text-white pb-2 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E2C585]">
                <Play className="w-4 h-4 fill-current" />
                <span>
                  {isEn
                    ? 'Extended-Stay Facilities · Hacienda Le Plus Quito–Píntag'
                    : 'Instalaciones Larga Estadía · Hacienda Le Plus Quito–Píntag'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Simulación y bienvenida al recorrido */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              <img
                src="/images/hacienda/lodging-hero-hacienda.jpg"
                alt="Vista Hacienda Le Plus"
                className="w-full h-full object-cover opacity-85"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#C8A45D] text-[#06150F] flex items-center justify-center shadow-2xl animate-pulse">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl text-white font-semibold">
                  {isEn
                    ? 'Lodging for Companies, Delegations & Groups'
                    : 'Hospedaje para Empresas, Delegaciones y Grupos'}
                </h4>
                <p className="text-xs text-[#FAF7F2]/80 max-w-md">
                  {isEn
                    ? '14 rooms (28 to 80 guests), 3-meal catering, fiber optic WiFi, private bus parking, and heated pool, dining, and sports area access.'
                    : '14 habitaciones (28 a 80 personas), alimentación 3 tiempos, internet por fibra óptica, parqueaderos privados y complementos de piscina, restaurante y áreas deportivas.'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    openQuoteModal({
                      serviceType: 'hospedaje',
                      itemName: isEn
                        ? 'Corporate & Group Extended Stay Lodging'
                        : 'Hospedaje Larga Estadía Empresas y Grupos',
                    });
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold bg-white text-[#06150F] hover:bg-[#E2C585] transition-colors cursor-pointer mt-2"
                >
                  {isEn
                    ? 'Request Quote by Guests & Duration'
                    : 'Solicitar Cotización según Personas y Duración'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL: OPCIONES DE COTIZACIÓN SEGÚN NÚMERO DE PERSONAS Y DURACIÓN
          ========================================================================= */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#0A1F17]/10 flex flex-col max-h-[90vh]">
            <div className="p-6 bg-[#071912] text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#C8A45D] block">
                  {isEn
                    ? 'Extended Stays · Companies, Delegations, NGOs & Groups'
                    : 'Larga Estadía · Empresas, Delegaciones, ONGs y Grupos'}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold">
                  {isEn
                    ? 'Quote Options by Group Size & Duration'
                    : 'Opciones de Cotización según Número de Personas y Duración'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[#0A1F17]/15 bg-[#FAF7F2] text-[#071912]">
                      <th className="py-3 px-4 font-bold">
                        {isEn ? 'Scale by Number of Guests / Profile' : 'Escala por N.º de Personas / Perfil'}
                      </th>
                      <th className="py-3 px-4 font-bold">
                        {isEn ? 'Short Stay (1 to 6 Nights)' : 'Estadía Corta (1 a 6 Noches)'}
                      </th>
                      <th className="py-3 px-4 font-bold text-[#A6823C]">
                        {isEn ? 'Weekly Stay (7 to 14 Nights)' : 'Estadía Semanal (7 a 14 Noches)'}
                      </th>
                      <th className="py-3 px-4 font-bold text-[#071912]">
                        {isEn ? 'Extended Stay (15 to 30+ Nights)' : 'Larga Estadía (15 a 30+ Noches)'}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0A1F17]/10">
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {isEn
                          ? '1 to 10 Guests (Executive Suites & Chalet)'
                          : '1 a 10 Personas (Suites Ejecutivas & Chalet)'}
                      </td>
                      <td className="py-3 px-4">
                        {isEn
                          ? 'From $55 / guest (Breakfast + Fiber Optic WiFi)'
                          : 'Desde $55 / persona (Desayuno + Fibra Óptica)'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        {isEn ? 'Weekly Corporate Rate (-15%)' : 'Tarifa Corporativa Semanal (-15%)'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        {isEn ? 'Monthly Agreement (-25% + Catering)' : 'Convenio Mensual (-25% + Alimentación)'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {isEn
                          ? '10 to 25 Guests (Company Staff / Teams)'
                          : '10 a 25 Personas (Personal de Empresas / Equipos)'}
                      </td>
                      <td className="py-3 px-4">
                        {isEn
                          ? 'Multiple-occupancy rooms + fleet parking'
                          : 'Habitaciones múltiples + parqueadero flotas'}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {isEn ? 'Half board or 3 meals + Fiber Optic WiFi' : 'Media pensión o 3 tiempos + Fibra Óptica'}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {isEn
                          ? 'Preferential rate by project scope & duration'
                          : 'Tarifa preferencial por proyecto y duración'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {isEn
                          ? '28 to 50 Guests (Delegations, NGOs & Volunteers)'
                          : '28 a 50 Personas (Delegaciones, ONGs y Voluntarios)'}
                      </td>
                      <td className="py-3 px-4">
                        {isEn
                          ? 'Exclusive room wing + briefing room + bus lot'
                          : 'Bloque exclusivo + salón operativo + buses'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#A6823C]">
                        {isEn
                          ? 'From $45 / pax per night (3 full meals)'
                          : 'Desde $45 / pax por noche (3 comidas)'}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        {isEn
                          ? 'Special mission quote (HXP / IMC / Aid)'
                          : 'Cotización especial misiones (HXP / IMC)'}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {isEn
                          ? '50 to 80 Guests (Entire Wing · 14 Rooms)'
                          : '50 a 80 Personas (Bloque Completo 14 Habitaciones)'}
                      </td>
                      <td className="py-3 px-4 font-bold">
                        {isEn
                          ? 'Exclusive Hacienda buy-out ($980 base/night)'
                          : 'Hacienda en exclusividad ($980 base/noche)'}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#A6823C]">
                        {isEn
                          ? 'Full board + private halls + parking'
                          : 'Pensión completa + salones + parqueaderos'}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#071912]">
                        {isEn
                          ? 'Maximum volume & duration discount'
                          : 'Máximo beneficio por volumen y duración'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#0A1F17]/70 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#0A1F17]/10">
                <strong>{isEn ? 'Included facilities enhancing your stay:' : 'Complementos que fortalecen tu estadía:'}</strong>{' '}
                {isEn
                  ? 'Every plan enjoys coordinated access to our heated swimming pool (14×6m), on-site restaurant, and 5,000 m² of recreation grounds and sports courts in Quito–Píntag.'
                  : 'Todas las modalidades cuentan con acceso coordinado a nuestra piscina temperada (14×6m), restaurante propio y 5.000 m² de áreas recreativas y canchas deportivas en Quito–Píntag.'}
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#0A1F17]/10 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#0A1F17]/70 hover:bg-[#0A1F17]/10 transition-colors cursor-pointer"
              >
                {isEn ? 'Close' : 'Cerrar'}
              </button>
              <a
                href={buildContextualWhatsAppUrl({
                  phone: siteConfig.whatsappNumber,
                  context: 'hospedaje',
                  itemName: isEn ? 'Personalized Lodging Quote' : 'Cotización Hospedaje Personalizada',
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-[#071912] text-[#E2C585] hover:bg-[#123326] transition-colors cursor-pointer shadow-sm"
              >
                <span>{isEn ? 'Request Personalized Quote' : 'Solicitar Cotización Personalizada'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
export { LodgingPageMobile as LodgingPage };
export default LodgingPageMobile;
