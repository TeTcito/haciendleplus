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
  ChevronDown,
  Clock,
  Heart,
  FileText,
  Coffee,
  Search,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { useDocumentMeta } from '../../utils/seo';
import { DirectQuoteForm } from '../../components/DirectQuoteForm';
import { ScrollReveal } from '../../components/ScrollReveal';
import { CabinRoom } from '../../types/cms';
import { getCabinsData } from '../../data/resortSpaces';

export const LodgingPageDesktop: React.FC = () => {
  const { siteConfig, cabins, openQuoteModal } = useCMS();
  const { language, isEn, t } = useLanguage();

  // SEO Meta
  useDocumentMeta({
    title: 'Hospedaje para Empresas y Grupos (Larga Estadía) en Quito–Píntag | Hacienda Le Plus',
    title_en: 'Corporate & Group Long-Stay Lodging in Quito–Píntag | Hacienda Le Plus',
    description:
      'Hospedaje de larga estadía para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales en Quito–Píntag. 14 habitaciones (28 a 80 personas), alimentación, internet fibra óptica, parqueaderos y cotización según número de personas y duración.',
    description_en:
      'Long-stay lodging for corporate staff, delegations, NGOs, volunteers and international groups in Quito–Píntag. 14 rooms (28 to 80 guests), full board, fiber-optic Wi-Fi, and parking.',
    canonicalPath: '/hospedaje',
    lang: language,
  });

  // Fechas dinámicas automáticas para el widget de agendamiento
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  // Estado del widget funcional de cotización según número de personas y duración
  const [destination, setDestination] = useState('Personal de Empresas / Equipos Técnicos');
  const [checkInDate, setCheckInDate] = useState(tomorrowStr);
  const [stayDuration, setStayDuration] = useState('7 a 14 Noches (Estadía Semanal / Quincenal)');
  const [guestsSelection, setGuestsSelection] = useState('28 a 50 Personas (Delegación / ONG / Empresa)');

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
    openQuoteModal({
      serviceType: 'hospedaje',
      itemName: `${destination} | Ingreso: ${checkInDate} | Duración: ${stayDuration} | ${guestsSelection}`,
    });
  };

  // Reseñas bilingües para el carrusel de testimonios (Larga Estadía, Empresas, ONGs y Grupos)
  const testimonials = isEn
    ? [
        {
          id: 1,
          quote:
            'We hosted our international HXP mission of 42 volunteers across all 14 rooms. The 3-course meal plan, fiber-optic internet, and private bus parking performed flawlessly.',
          author: 'Sarah Mitchell',
          role: 'HXP Mission Coordinator · International NGO',
          avatar: '/images/avatars/mision-hxp.jpg',
          rating: 5,
        },
        {
          id: 2,
          quote:
            'Exceptional long-stay option for our technical and executive teams near Quito and the Airport. Comfortable rooms, reliable internet, punctual catering, and corporate billing.',
          author: 'Dr. Carlos Enríquez',
          role: 'Executive Board · Corporate & Project Operations',
          avatar: '/images/avatars/dr-carlos.jpg',
          rating: 5,
        },
        {
          id: 3,
          quote:
            'Our international delegation stayed all week in Píntag. The heated pool, restaurant, and sports courts offered the perfect relaxation after intense working days.',
          author: 'IMC Delegation',
          role: 'International Delegation · Extended Stay',
          avatar: '/images/avatars/familia-andrade.jpg',
          rating: 5,
        },
        {
          id: 4,
          quote:
            'We booked the entire room block for our guests and organizing committee. Spacious, 24/7 security, and transparent quotes based on headcount and stay duration.',
          author: 'Valeria & Mateo',
          role: 'Group Lodging & Events',
          avatar: '/images/avatars/valeria-mateo.jpg',
          rating: 5,
        },
      ]
    : [
        {
          id: 1,
          quote:
            'Alojamos a nuestra misión internacional HXP de 42 voluntarios en las 14 habitaciones. La alimentación de 3 tiempos, el internet por fibra óptica y los parqueaderos para buses funcionaron a la perfección.',
          author: 'Sarah Mitchell',
          role: 'Coordinación Misión HXP · ONG Internacional',
          avatar: '/images/avatars/mision-hxp.jpg',
          rating: 5,
        },
        {
          id: 2,
          quote:
            'Excelente opción de larga estadía para nuestro personal técnico y directivo cerca de Quito y el Aeropuerto. Habitaciones cómodas, internet estable, alimentación puntual y facturación corporativa.',
          author: 'Dr. Carlos Enríquez',
          role: 'Directorio Ejecutivo · Empresas & Proyectos',
          avatar: '/images/avatars/dr-carlos.jpg',
          rating: 5,
        },
        {
          id: 3,
          quote:
            'Tuvimos a nuestra delegación alojada toda la semana en Píntag. La piscina temperada, el restaurante y las canchas deportivas fueron el complemento ideal tras cada jornada de trabajo.',
          author: 'Coordinación IMC',
          role: 'Delegación Internacional · Estadía Prolongada',
          avatar: '/images/avatars/familia-andrade.jpg',
          rating: 5,
        },
        {
          id: 4,
          quote:
            'Reservamos el bloque de habitaciones para nuestros invitados y equipo organizador. Espacioso, seguro las 24 horas y con opciones claras de cotización según número de personas y días.',
          author: 'Valeria & Mateo',
          role: 'Hospedaje Grupal & Eventos',
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

  // Lista de habitaciones y cabañas con soporte bilingüe (Prioridad Larga Estadía Empresas y Grupos)
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

  return (
    <main className="w-full bg-[#FAF7F2] text-[#0A1F17] overflow-x-hidden selection:bg-[#C8A45D]/30 selection:text-[#06150F]">
      {/* =========================================================================
          SECCIÓN 1: HERO SECTION — HOSPEDAJE PARA EMPRESAS Y GRUPOS (LARGA ESTADÍA)
          (ANCHO COMPLETO - COTIZADOR SEGÚN NÚMERO DE PERSONAS Y DURACIÓN)
          ========================================================================= */}
      <section className="relative w-full min-h-[68vh] lg:min-h-[75vh] xl:min-h-[78vh] flex flex-col justify-between overflow-hidden bg-[#06150F] text-white">
        {/* Background Image: Auténtica foto de la hacienda nítida, sin logos y con luz cálida */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hacienda/lodging-hero-hacienda.jpg"
            alt="Hospedaje para Empresas, Delegaciones y Grupos en Hacienda Le Plus Quito–Píntag"
            className="w-full h-full object-cover object-center"
          />
          {/* Técnicas de contraste profesional: degradado direccional asimétrico para realzar la tipografía */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06150F]/95 via-[#06150F]/70 to-[#06150F]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06150F] via-transparent to-[#06150F]/50" />
        </div>

        {/* Top/Center Hero Content - Tipografía ampliada con alto impacto visual y técnicas de contraste */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-6">
          <div className="max-w-4xl space-y-4">
            <ScrollReveal direction="down" duration={650}>
              <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.24em] text-[#E2C585] bg-[#06150F]/70 px-3.5 py-1 rounded-full border border-[#C8A45D]/35">
                {isEn ? 'LONG-STAY LODGING: CORPORATE PRIORITY · QUITO – PÍNTAG' : 'LARGA ESTADÍA: PRIORIDAD COMERCIAL · QUITO – PÍNTAG'}
              </span>
            </ScrollReveal>

            {/* Título Principal de Gran Formato con relieve y degradado dorado en la palabra clave */}
            <ScrollReveal direction="blur-up" duration={850}>
              <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.05] tracking-tight drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)]">
                {isEn ? (
                  <>
                    Lodging for Companies, <br />
                    <span className="italic font-light bg-gradient-to-r from-[#FAF7F2] via-[#E2C585] to-[#C8A45D] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(200,164,93,0.5)]">
                      Delegations &amp; Groups
                    </span>
                  </>
                ) : (
                  <>
                    Hospedaje para Empresas, <br />
                    <span className="italic font-light bg-gradient-to-r from-[#FAF7F2] via-[#E2C585] to-[#C8A45D] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(200,164,93,0.5)]">
                      Delegaciones y Grupos
                    </span>
                  </>
                )}
              </h1>
            </ScrollReveal>

            {/* Descripción en tamaño ampliado y badges de valor para máxima legibilidad */}
            <ScrollReveal direction="left" delay={120} duration={750}>
              <p className="text-base sm:text-lg md:text-xl text-[#FAF7F2] max-w-3xl leading-relaxed font-light drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                {isEn ? (
                  <>
                    Long-stay lodging for corporate staff, delegations, NGOs, volunteers, and international groups in Quito–Píntag. <strong>14 rooms (28 to 80 guests)</strong>, full-board catering, fiber-optic Wi-Fi, and private parking, complemented by our heated pool, restaurant, and recreational sports grounds.
                  </>
                ) : (
                  <>
                    Alojamiento de larga estadía para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales en Quito–Píntag. <strong>14 habitaciones (28 a 80 huéspedes)</strong>, alimentación completa, internet por fibra óptica y parqueaderos privados, fortalecidos con piscina temperada, restaurante y áreas recreativas como complementos.
                  </>
                )}
              </p>
            </ScrollReveal>

            {/* Botón Principal a WhatsApp + Opciones según Personas y Duración */}
            <ScrollReveal direction="up" delay={200} duration={650}>
              <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs font-medium text-[#FAF7F2]">
                <a
                  href={buildContextualWhatsAppUrl('hospedaje')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E2C585] hover:bg-[#C8A45D] text-[#06150F] font-bold shadow-sm cursor-pointer transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-[#06150F]/80" />
                  <span>{isEn ? 'Request Quote' : 'Solicitar Cotización'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowComparisonModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 backdrop-blur-md font-semibold transition-all cursor-pointer"
                >
                  <span>{isEn ? 'View Options by Guests & Duration' : 'Ver Opciones según Personas y Duración'}</span>
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06150F]/60 backdrop-blur-sm border border-white/15 text-[#E2C585] shadow-sm">
                  <Check className="w-3.5 h-3.5 text-[#C8A45D]" /> {isEn ? '14 Rooms · Meal Plans · Fiber Optic · Bus Parking' : '14 Habitaciones · Alimentación · Fibra Óptica · Parqueaderos'}
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Bottom Booking Search Bar Funcional: Cotizador según Número de Personas y Duración */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-5 sm:pb-7">
          <ScrollReveal direction="up" delay={250} duration={850}>
            <div className="relative">
              {/* Formulario / Barra de Cotización según Número de Personas y Duración */}
              <form
                onSubmit={handleBookingSubmit}
                className="bg-white rounded-3xl p-3 sm:p-4 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] border border-black/5 text-[#0A1F17]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 lg:gap-2 items-center">
                  {/* 1. Perfil de Empresa / Grupo */}
                  <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors border border-[#0A1F17]/5">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C8A45D] shrink-0 shadow-sm">
                      <BedDouble className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label htmlFor="booking-dest" className="text-[10px] uppercase tracking-wider text-[#0A1F17]/50 font-bold block cursor-pointer">
                        {isEn ? 'Group Profile / Room' : 'Tipo de Grupo / Hab.'}
                      </label>
                      <select
                        id="booking-dest"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full text-xs sm:text-sm font-bold text-[#06150F] bg-transparent outline-none cursor-pointer truncate"
                      >
                        <option value="Personal de Empresas / Equipos Técnicos">{isEn ? 'Corporate Staff' : 'Personal de Empresas'}</option>
                        <option value="Delegaciones / ONG / Voluntarios (HXP / IMC)">{isEn ? 'Delegations & NGOs' : 'Delegaciones & ONGs'}</option>
                        <option value="Grupos Internacionales y Misiones">{isEn ? 'International Groups' : 'Grupos Internacionales'}</option>
                        <option value="Bloque Completo (14 Habitaciones · 28-80 Pax)">{isEn ? '14 Rooms Block' : 'Bloque 14 Habitaciones'}</option>
                        <option value="Suites Ejecutivas & Chalet (1-10 Pax)">{isEn ? 'Executive Suites & Chalet' : 'Suites Ejecutivas & Chalet'}</option>
                      </select>
                    </div>
                  </div>

                  {/* 2. Número de Personas */}
                  <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors border border-[#0A1F17]/5">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C8A45D] shrink-0 shadow-sm">
                      <Users className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label htmlFor="booking-guests" className="text-[10px] uppercase tracking-wider text-[#0A1F17]/50 font-bold block cursor-pointer">
                        {isEn ? 'No. of Guests' : 'N.º de Personas'}
                      </label>
                      <select
                        id="booking-guests"
                        value={guestsSelection}
                        onChange={(e) => setGuestsSelection(e.target.value)}
                        className="w-full text-xs sm:text-sm font-bold text-[#06150F] bg-transparent outline-none cursor-pointer truncate"
                      >
                        <option value="1 a 10 Personas (Suites / Chalet)">{isEn ? '1 to 10 Guests (Executive)' : '1 a 10 Personas (Ejecutivo)'}</option>
                        <option value="10 a 25 Personas (Equipo / Empresa)">{isEn ? '10 to 25 Guests (Company)' : '10 a 25 Personas (Empresa)'}</option>
                        <option value="28 a 50 Personas (Delegación / ONG / Empresa)">{isEn ? '28 to 50 Guests (Delegation/NGO)' : '28 a 50 Personas (Delegación/ONG)'}</option>
                        <option value="50 a 80 Personas (Bloque Completo 14 Hab.)">{isEn ? '50 to 80 Guests (14 Rooms)' : '50 a 80 Personas (14 Hab.)'}</option>
                      </select>
                    </div>
                  </div>

                  {/* 3. Duración de Estadía */}
                  <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors border border-[#0A1F17]/5">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C8A45D] shrink-0 shadow-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label htmlFor="booking-duration" className="text-[10px] uppercase tracking-wider text-[#0A1F17]/50 font-bold block cursor-pointer">
                        {isEn ? 'Stay Duration' : 'Duración de Estadía'}
                      </label>
                      <select
                        id="booking-duration"
                        value={stayDuration}
                        onChange={(e) => setStayDuration(e.target.value)}
                        className="w-full text-xs sm:text-sm font-bold text-[#06150F] bg-transparent outline-none cursor-pointer truncate"
                      >
                        <option value="3 a 6 Noches (Estadía Semanal Corta)">{isEn ? '3 to 6 Nights (Short / Weekly)' : '3 a 6 Noches (Corta / Semanal)'}</option>
                        <option value="7 a 14 Noches (Estadía Semanal / Quincenal)">{isEn ? '7 to 14 Nights (1 to 2 Weeks)' : '7 a 14 Noches (1 a 2 Semanas)'}</option>
                        <option value="15 a 30+ Noches (Larga Estadía Mensual)">{isEn ? '15 to 30+ Nights (Monthly / Long)' : '15 a 30+ Noches (Mensual / Larga)'}</option>
                        <option value="Convenio Corporativo Recurrente">{isEn ? 'Corporate Agreement / Months' : 'Convenio Corporativo / Meses'}</option>
                      </select>
                    </div>
                  </div>

                  {/* 4. Fecha Estimada de Ingreso */}
                  <div 
                    onClick={handleOpenCheckInPicker}
                    className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#FAF7F2]/60 hover:bg-[#FAF7F2] transition-colors border border-[#0A1F17]/5 cursor-pointer group"
                  >
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#C8A45D] shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <label 
                        htmlFor="booking-in" 
                        onClick={(e) => {
                          e.preventDefault();
                          handleOpenCheckInPicker(e);
                        }}
                        className="text-[10px] uppercase tracking-wider text-[#0A1F17]/50 font-bold block cursor-pointer"
                      >
                        {isEn ? 'Check-in Date' : 'Fecha de Ingreso'}
                      </label>
                      <input
                        ref={checkInInputRef}
                        id="booking-in"
                        type="date"
                        min={todayStr}
                        value={checkInDate}
                        onClick={(e) => handleOpenCheckInPicker(e)}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="w-full text-xs sm:text-sm font-bold text-[#06150F] bg-transparent outline-none cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* 5. Botón COTIZAR POR PERSONAS Y DURACIÓN */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <button
                      type="submit"
                      className="w-full h-11 rounded-2xl bg-[#071912] hover:bg-[#123326] text-[#E2C585] hover:text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer group"
                    >
                      <span>{isEn ? 'Quote Stay' : 'Cotizar Estadía'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Frase manuscrita en español */}
              <div className="hidden lg:flex items-center justify-end pt-2 pr-4">
                <span className="font-handwritten text-lg sm:text-xl text-[#E2C585] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] -rotate-2 select-none flex items-center gap-1.5">
                  {isEn ? 'Bespoke quotes tailored to guest count and stay duration' : 'Cotizaciones a medida según número de personas y duración'}
                  <Heart className="w-3.5 h-3.5 text-[#E2C585] fill-current" />
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 2: FRANJA DE 5 PILARES DE LARGA ESTADÍA (HABITACIONES, ALIMENTACIÓN, INTERNET, PARQUEADEROS, COTIZACIÓN)
          ========================================================================= */}
      <section className="w-full bg-white border-b border-[#0A1F17]/10 py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#0A1F17]/10">
            {/* Pilar 1: Habitaciones */}
            <ScrollReveal direction="up-left" delay={50} duration={650} className="pt-4 md:pt-0 md:px-4 first:pt-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <BedDouble className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    14 Habitaciones (28–80 Pax)
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {isEn ? 'For corporate staff, NGOs & delegations' : 'Para personal de empresas, ONGs y delegaciones'}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 2: Alimentación */}
            <ScrollReveal direction="up" delay={120} duration={650} className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <Utensils className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    {isEn ? 'Full-Board Catering' : 'Alimentación Completa'}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {isEn ? 'Breakfasts, lunches, dinners & coffee breaks' : 'Desayunos, almuerzos, cenas y coffee breaks'}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 3: Internet */}
            <ScrollReveal direction="zoom-in" delay={190} duration={650} className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <Globe className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    {isEn ? 'Fiber-Optic Internet' : 'Internet Fibra Óptica'}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {isEn ? 'Reliable connectivity for work & team sessions' : 'Conectividad estable para trabajo y sesiones'}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 4: Parqueaderos */}
            <ScrollReveal direction="up" delay={260} duration={650} className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    {isEn ? 'Private Parking' : 'Parqueaderos Privados'}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {isEn ? 'Spacious parking for cars, fleet vans & buses' : 'Amplio estacionamiento para autos, flotas y buses'}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 5: Cotización según Personas y Duración */}
            <ScrollReveal direction="up-right" delay={330} duration={650} className="pt-4 md:pt-0 md:px-4 col-span-2 md:col-span-1">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <Waves className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    {isEn ? 'Included Amenities' : 'Complementos Incluidos'}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {isEn ? '14×6m heated pool, restaurant & sports courts' : 'Piscina 14×6m, restaurante y áreas deportivas'}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3: HABITACIONES Y MODALIDADES DE ALOJAMIENTO PARA EMPRESAS Y GRUPOS
          ========================================================================= */}
      <section className="py-20 lg:py-24 w-full max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Títulos y botones de cotización */}
          <ScrollReveal direction="left" duration={800} className="lg:col-span-3 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A6823C] block">
              {isEn ? 'COMMERCIAL PRIORITY · LONG STAY' : 'PRIORIDAD COMERCIAL · LARGA ESTADÍA'}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#06150F] leading-tight">
              {isEn ? (
                <>
                  Rooms for <br className="hidden sm:block" />
                  Companies &amp; Groups
                </>
              ) : (
                <>
                  Habitaciones para <br className="hidden sm:block" />
                  Empresas y Grupos
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed font-light">
              {isEn
                ? 'Specialized lodging in Quito–Píntag for corporate personnel, delegations, NGOs, volunteers, and international groups, with daily meal plans, fiber-optic Wi-Fi, private parking, and tailored rates by guest count and duration.'
                : 'Alojamiento especializado en Quito–Píntag para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales, con alimentación diaria, internet por fibra óptica, parqueaderos privados y tarifas según número de personas y duración.'}
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={buildContextualWhatsAppUrl('hospedaje')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#071912] text-[#E2C585] hover:bg-[#123326] text-xs font-bold transition-all cursor-pointer group shadow-sm"
              >
                <span>{isEn ? 'Request Quote' : 'Solicitar Cotización'}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                type="button"
                onClick={() => setShowComparisonModal(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/70 hover:bg-white text-[#06150F] text-xs font-semibold transition-all border border-[#06150F]/10 cursor-pointer"
              >
                <span>{isEn ? 'View Options by Guests & Duration' : 'Ver Opciones según Personas y Duración'}</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column: 4 Tarjetas de Habitación con Alimentación, Internet y Parqueaderos */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {displayCabins.map((cabin, idx) => {
                const directions: ('up-left' | 'up' | 'up' | 'up-right')[] = ['up-left', 'up', 'up', 'up-right'];
                return (
                  <ScrollReveal
                    key={cabin.id || idx}
                    direction={directions[idx % 4]}
                    delay={80 + idx * 100}
                    duration={750}
                    className="h-full"
                  >
                    <article className="group bg-white rounded-3xl overflow-hidden border border-[#0A1F17]/10 hover:border-[#C8A45D]/50 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
                      <div>
                        {/* Imagen de la habitación */}
                        <div className="relative h-48 overflow-hidden bg-[#0A1F17]">
                          <img
                            src={cabin.image}
                            alt={cabin.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06150F]/85 backdrop-blur-sm text-[#E2C585] border border-[#C8A45D]/30">
                            {cabin.type || (isEn ? 'Long Stay' : 'Larga Estadía')}
                          </span>
                        </div>

                        {/* Contenido de la tarjeta */}
                        <div className="p-4 sm:p-5 space-y-3">
                          <div>
                            <h3 className="font-serif-luxury text-lg sm:text-xl font-bold text-[#06150F] group-hover:text-[#A6823C] transition-colors leading-snug">
                              {cabin.name}
                            </h3>
                          </div>

                          {/* Viñetas verticales con íconos en español */}
                          <ul className="space-y-2 pt-2 border-t border-[#0A1F17]/8 text-xs text-[#0A1F17]/80">
                            <li className="flex items-center gap-2">
                              <Users className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                              <span><strong className="text-[#06150F] font-semibold">{isEn ? 'Capacity:' : 'Capacidad:'}</strong> {cabin.capacity}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <BedDouble className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                              <span><strong className="text-[#06150F] font-semibold">{isEn ? 'Beds:' : 'Camas:'}</strong> {cabin.beds}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Bath className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                              <span><strong className="text-[#06150F] font-semibold">{isEn ? 'Bathrooms:' : 'Baños:'}</strong> {cabin.bathrooms} {cabin.bathrooms > 1 ? (isEn ? 'private bathrooms' : 'baños privados') : (isEn ? 'private bathroom' : 'baño privado')}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Utensils className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>{isEn ? 'Meals, fiber optic & private parking' : 'Alimentación, fibra óptica y parqueadero'}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Waves className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>{isEn ? 'Included: Pool, restaurant & sports fields' : 'Comp.: Piscina, restaurante y canchas'}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Tarifa por noche y botón circular */}
                      <div className="p-4 sm:p-5 pt-2 flex items-center justify-between border-t border-[#0A1F17]/8 mt-1 bg-[#FAF7F2]/50">
                        <div className="flex items-baseline gap-1">
                          <span className="font-bold text-base sm:text-xl text-[#06150F]">
                            ${cabin.pricePerNight}
                          </span>
                          <span className="text-[11px] text-[#0A1F17]/60">/{isEn ? ' ref. (long-stay discount)' : ' ref. (desc. larga estadía)'}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedCabinModal(cabin)}
                          title={`${isEn ? 'View details of' : 'Ver detalles de'} ${cabin.name}`}
                          className="w-9 h-9 rounded-full bg-white border border-[#0A1F17]/10 hover:bg-[#071912] hover:text-[#E2C585] flex items-center justify-center text-[#0A1F17] transition-all cursor-pointer shadow-sm group-hover:scale-105"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </article>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 4: SERVICIOS DE LARGA ESTADÍA (ALIMENTACIÓN, INTERNET, PARQUEADEROS) Y COMPLEMENTOS (PISCINA, RESTAURANTE Y ACTIVIDADES RECREATIVAS)
          ========================================================================= */}
      <section className="w-full bg-[#FAF7F2] border-t border-[#0A1F17]/10 py-16 lg:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
            {/* Lado izquierdo: Banner de Larga Estadía y Complementos */}
            <ScrollReveal direction="left" duration={850} className="lg:col-span-5 xl:col-span-5 h-full">
              <div className="relative rounded-3xl overflow-hidden min-h-[500px] sm:min-h-[560px] h-full flex flex-col justify-between p-8 sm:p-10 text-white shadow-2xl hover:scale-[1.015] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 group bg-[#06150F]">
                <img
                  src="/images/hacienda/piscina-nocturna.jpg"
                  alt="Instalaciones y Complementos para Empresas y Grupos en Quito–Píntag"
                  className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06150F] via-[#06150F]/65 to-[#06150F]/30 pointer-events-none" />

                {/* Textos en español */}
                <div className="relative z-10 space-y-3.5">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E2C585] block">
                    {isEn ? 'COMPANIES, DELEGATIONS, NGOS & VOLUNTEERS' : 'EMPRESAS, DELEGACIONES, ONGS Y VOLUNTARIOS'}
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white leading-tight max-w-md">
                    {isEn ? (
                      <>
                        Full Operation <br />
                        for Extended Stays
                      </>
                    ) : (
                      <>
                        Operación Completa <br />
                        para Larga Estadía
                      </>
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/85 max-w-sm leading-relaxed font-light">
                    {isEn
                      ? 'Lodging across 14 rooms with daily catering, fiber-optic internet, and private parking, fortified by our heated pool, restaurant, and recreational sports grounds.'
                      : 'Alojamiento en 14 habitaciones con alimentación diaria, internet por fibra óptica y parqueaderos privados, fortalecido con nuestra piscina temperada, restaurante y actividades recreativas como complementos.'}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#E2C585] pt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Quito – Píntag · 40 min from Quito & 30 min from the Airport' : 'Quito – Píntag · A 40 min de Quito y 30 min del Aeropuerto'}</span>
                  </div>
                </div>

                {/* Botón central de video en español */}
                <div className="relative z-10 my-auto py-6 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setShowVideoModal(true)}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white hover:text-[#06150F] text-white transition-all duration-300 shadow-xl cursor-pointer group/btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-white text-[#06150F] flex items-center justify-center group-hover/btn:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                    <span className="text-xs font-bold tracking-wider uppercase">
                      {isEn ? 'Tour Facilities' : 'Ver Instalaciones'}
                    </span>
                  </button>
                </div>

                {/* Botones inferiores en español */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={buildContextualWhatsAppUrl('hospedaje')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#06150F] hover:bg-[#E2C585] text-xs font-bold tracking-wide transition-colors shadow-md cursor-pointer"
                  >
                    <span>{isEn ? 'Request Quote' : 'Solicitar Cotización'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowComparisonModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/15 hover:bg-white/25 text-[#FAF7F2] border border-white/25 backdrop-blur-md text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>{isEn ? 'View Options by Guests & Duration' : 'Ver Opciones según Personas y Duración'}</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Lado derecho: 4 Tarjetas de Servicios Esenciales y Complementos que Fortalecen la Larga Estadía */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-6">
              <ScrollReveal direction="down" duration={700} className="space-y-1.5">
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#06150F]">
                  {isEn ? 'Extended-Stay Services & Amenities' : 'Servicios de Estadía y Complementos'}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/70 font-light">
                  {isEn
                    ? 'Rooms, catering, internet, and parking, fortified by pool, restaurant, and sports fields.'
                    : 'Habitaciones, alimentación, internet y parqueaderos, fortalecidos por piscina, restaurante y actividades recreativas.'}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 flex-1 items-stretch">
                {/* Card 1: Alimentación & Restaurante */}
                <ScrollReveal direction="tilt-left" delay={60} duration={750} className="h-full">
                  <div
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'hospedaje',
                        itemName: isEn ? '3-Meal Catering and Restaurant for Long Stay' : 'Alimentación 3 Tiempos y Restaurante para Larga Estadía',
                      })
                    }
                    className="group bg-white rounded-3xl overflow-hidden border border-[#0A1F17]/10 flex flex-col justify-between cursor-pointer hover:border-[#C8A45D]/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden relative bg-[#06150F]">
                        <img
                          src="/images/hacienda/gastronomia-parrillada.jpg"
                          alt="Alimentación y Restaurante en Hacienda Le Plus"
                          className="w-full h-full object-cover object-center block"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06150F]/85 text-[#E2C585] backdrop-blur-sm border border-[#C8A45D]/30">
                          {isEn ? 'Catering & Meals' : 'Alimentación & Comp.'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-sm text-[#06150F] group-hover:text-[#A6823C] transition-colors">
                          {isEn ? 'Catering & Restaurant' : 'Alimentación & Restaurante'}
                        </h4>
                        <p className="text-xs text-[#0A1F17]/75 leading-relaxed font-light">
                          {isEn
                            ? 'Scheduled breakfasts, lunches, dinners, and coffee breaks for companies and groups, with in-house restaurant.'
                            : 'Desayunos, almuerzos, cenas y coffee breaks programados para empresas y grupos, con restaurante propio como complemento.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-[#0A1F17]/5 flex items-center justify-between text-[11px] font-semibold text-[#A6823C] group-hover:text-[#06150F] transition-colors">
                      <span>{isEn ? 'Quote with meal plan' : 'Cotizar con pensión'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Card 2: Internet Fibra Óptica & Parqueaderos */}
                <ScrollReveal direction="zoom-in" delay={140} duration={750} className="h-full">
                  <div
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'hospedaje',
                        itemName: isEn ? 'Corporate Stay with Fiber-Optic Wi-Fi & Parking' : 'Estadía Corporativa con Internet Fibra Óptica y Parqueaderos',
                      })
                    }
                    className="group bg-white rounded-3xl overflow-hidden border border-[#0A1F17]/10 flex flex-col justify-between cursor-pointer hover:border-[#C8A45D]/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden relative bg-[#06150F]">
                        <img
                          src="/images/hacienda/grupos-hxp.jpg"
                          alt="Internet Fibra Óptica, Salones y Parqueaderos para Empresas y ONGs"
                          className="w-full h-full object-cover object-center block"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06150F]/85 text-[#E2C585] backdrop-blur-sm border border-[#C8A45D]/30">
                          {isEn ? 'Internet & Parking' : 'Internet & Parqueadero'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-sm text-[#06150F] group-hover:text-[#A6823C] transition-colors">
                          {isEn ? 'Internet & Parking' : 'Internet & Parqueaderos'}
                        </h4>
                        <p className="text-xs text-[#0A1F17]/75 leading-relaxed font-light">
                          {isEn
                            ? 'High-speed fiber-optic Wi-Fi, work meeting rooms, and secure internal parking for cars, vans, and buses.'
                            : 'Wi-Fi por fibra óptica de alta estabilidad, salones de trabajo y parqueaderos internos seguros para autos, camionetas y buses.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-[#0A1F17]/5 flex items-center justify-between text-[11px] font-semibold text-[#A6823C] group-hover:text-[#06150F] transition-colors">
                      <span>{isEn ? 'Inquire logistics' : 'Consultar logística'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Card 3: Complemento Piscina Temperada & Zona Húmeda */}
                <ScrollReveal direction="zoom-in" delay={220} duration={750} className="h-full">
                  <div
                    onClick={() => setShowComparisonModal(true)}
                    className="group bg-white rounded-3xl overflow-hidden border border-[#0A1F17]/10 flex flex-col justify-between cursor-pointer hover:border-[#C8A45D]/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden relative bg-[#06150F]">
                        <img
                          src="/images/hacienda/area-humeda.jpg"
                          alt="Complemento Piscina 14x6m y Hidromasajes"
                          className="w-full h-full object-cover object-center block"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06150F]/85 text-[#E2C585] backdrop-blur-sm border border-[#C8A45D]/30">
                          {isEn ? 'Amenity' : 'Complemento'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-sm text-[#06150F] group-hover:text-[#A6823C] transition-colors">
                          {isEn ? 'Amenity: Pool & Spa' : 'Comp.: Piscina & Bienestar'}
                        </h4>
                        <p className="text-xs text-[#0A1F17]/75 leading-relaxed font-light">
                          {isEn
                            ? '14×6 m heated pool, 2 hot tubs, sauna, and steam room as an amenity enhancing your staff and group rest.'
                            : 'Piscina temperada de 14×6 m, dos hidromasajes, sauna y turco como complemento que fortalece el descanso del personal y grupos.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-[#0A1F17]/5 flex items-center justify-between text-[11px] font-semibold text-[#A6823C] group-hover:text-[#06150F] transition-colors">
                      <span>{isEn ? 'View inclusions' : 'Ver inclusiones'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>

                {/* Card 4: Complemento Actividades Recreativas y Canchas */}
                <ScrollReveal direction="tilt-right" delay={300} duration={750} className="h-full">
                  <div
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'grupos',
                        itemName: isEn ? 'Group Lodging with Recreational Sports & Courts' : 'Hospedaje Grupal con Actividades Recreativas y Canchas',
                      })
                    }
                    className="group bg-white rounded-3xl overflow-hidden border border-[#0A1F17]/10 flex flex-col justify-between cursor-pointer hover:border-[#C8A45D]/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full"
                  >
                    <div>
                      <div className="h-44 w-full overflow-hidden relative bg-[#06150F]">
                        <img
                          src="/images/hacienda/jardines-teambuilding.jpg"
                          alt="Complemento Actividades Recreativas y Canchas Deportivas"
                          className="w-full h-full object-cover object-center block"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06150F]/85 text-[#E2C585] backdrop-blur-sm border border-[#C8A45D]/30">
                          {isEn ? 'Amenity' : 'Complemento'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-sm text-[#06150F] group-hover:text-[#A6823C] transition-colors">
                          {isEn ? 'Amenity: Sports & Nature' : 'Comp.: Recreación & Deportes'}
                        </h4>
                        <p className="text-xs text-[#0A1F17]/75 leading-relaxed font-light">
                          {isEn
                            ? '5,000 m² of gardens, soccer, volleyball, and basketball courts as recreational complements for groups and teams.'
                            : '5.000 m² de jardines, canchas de fútbol, vóley y básquetbol como complemento recreativo para delegaciones, ONGs y empresas.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-[#0A1F17]/5 flex items-center justify-between text-[11px] font-semibold text-[#A6823C] group-hover:text-[#06150F] transition-colors">
                      <span>{isEn ? 'Quote for group' : 'Cotizar grupo'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 5: EL PRIVILEGIO LE PLUS · VENTAJAS PARA EMPRESAS, ONGS Y GRUPOS
          ========================================================================= */}
      <section className="w-full bg-white border-t border-[#0A1F17]/10 py-20 lg:py-28">
        <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch w-full">
            {/* Columna izquierda: Títulos y 4 tarjetas de atributos en español */}
            <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
              <ScrollReveal direction="left" duration={750} className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A6823C] block">
                  {isEn ? 'CORPORATE & INSTITUTIONAL BACKING' : 'RESPALDO COMERCIAL E INSTITUCIONAL'}
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#06150F] leading-tight">
                  {isEn ? (
                    <>
                      Advantages for <br className="hidden sm:block" />
                      Companies &amp; Groups
                    </>
                  ) : (
                    <>
                      Ventajas para <br className="hidden sm:block" />
                      Empresas y Grupos
                    </>
                  )}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 font-light leading-relaxed">
                  {isEn
                    ? 'We streamline accommodation logistics for corporate teams, delegations, NGOs, volunteers, and international groups with clear volume and duration rates.'
                    : 'Simplificamos la logística de alojamiento para personal de empresas, delegaciones, ONGs, voluntarios y grupos internacionales con tarifas claras según número de personas y duración.'}
                </p>
              </ScrollReveal>

              {/* 4 Tarjetas en español (2x2 grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {/* 1: Cotización por Volumen y Duración */}
                <ScrollReveal direction="up-left" delay={60} duration={600}>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#0A1F17]/10 space-y-2 hover:border-[#C8A45D]/50 transition-colors h-full">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#123326] shadow-sm">
                      <Star className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#06150F]">
                        {isEn ? 'Rates by Volume & Days' : 'Tarifa por Personas y Días'}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {isEn ? 'Scales from 10 to 80 guests' : 'Escalas de 10 a 80 huéspedes'}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* 2: Facturación Corporativa */}
                <ScrollReveal direction="up-right" delay={120} duration={600}>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#0A1F17]/10 space-y-2 hover:border-[#C8A45D]/50 transition-colors h-full">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#123326] shadow-sm">
                      <ShieldCheck className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#06150F]">
                        {isEn ? 'Corporate Invoicing' : 'Facturación Corporativa'}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {isEn ? 'Agreements with firms & NGOs' : 'Convenios con empresas y ONGs'}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* 3: Alimentación, Internet y Parqueo */}
                <ScrollReveal direction="down-left" delay={180} duration={600}>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#0A1F17]/10 space-y-2 hover:border-[#C8A45D]/50 transition-colors h-full">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#123326] shadow-sm">
                      <Calendar className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#06150F]">
                        {isEn ? 'All-in-One Operation' : 'Operación Todo en Uno'}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {isEn ? 'Room + meals + high-speed Wi-Fi' : 'Habitación + comidas + internet'}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>

                {/* 4: Soporte y Seguridad 24/7 */}
                <ScrollReveal direction="down-right" delay={240} duration={600}>
                  <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#0A1F17]/10 space-y-2 hover:border-[#C8A45D]/50 transition-colors h-full">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-[#123326] shadow-sm">
                      <PhoneCall className="w-4 h-4 stroke-[1.5]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#06150F]">
                        {isEn ? '24/7 Security & Parking' : 'Seguridad & Parqueo 24/7'}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {isEn ? 'Gated estate in Quito–Píntag' : 'Predio cerrado en Quito–Píntag'}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            {/* Columna central: Foto nítida de la piscina y cabañas, limpia de logos y sin textos superpuestos */}
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

            {/* Columna derecha: Testimonios interactivos en español */}
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
                      title={isEn ? 'Previous testimonial' : 'Testimonio anterior'}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextTestimonial}
                      className="w-8 h-8 rounded-full bg-white border border-[#0A1F17]/10 hover:bg-[#071912] hover:text-[#E2C585] flex items-center justify-center text-[#0A1F17] transition-colors cursor-pointer"
                      title={isEn ? 'Next testimonial' : 'Siguiente testimonio'}
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
          SECCIÓN 6: OPCIONES DE COTIZACIÓN SEGÚN NÚMERO DE PERSONAS Y DURACIÓN
          ========================================================================= */}
      <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#06150F] text-[#FAF7F2] border-t border-[#C8A45D]/25">
        {/* Fondo panorámico */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hacienda/vista-aerea.jpg"
            alt="Cotización de Larga Estadía según Número de Personas y Duración en Hacienda Le Plus"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#06150F] via-[#06150F]/90 to-[#06150F]/70" />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10 xl:px-14 space-y-12">
          {/* Banner de Opciones de Cotización según Número de Personas y Duración */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center justify-between">
            {/* Lado izquierdo: Textos y botones de cotización */}
            <ScrollReveal direction="left" duration={850} className="lg:col-span-7 space-y-4 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E2C585] block">
                {isEn ? 'QUOTING TIERS · LONG-STAY COMPANIES & GROUPS' : 'OPCIONES DE COTIZACIÓN · LARGA ESTADÍA EMPRESAS Y GRUPOS'}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
                {isEn ? (
                  <>
                    Quotes Tailored to <br className="hidden sm:block" />
                    Guest Count &amp; Duration
                  </>
                ) : (
                  <>
                    Cotización según Número <br className="hidden sm:block" />
                    de Personas y Duración
                  </>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
                {isEn
                  ? 'We design tailored proposals for corporate staff, delegations, NGOs, volunteers, and international groups. Choose your guest range (from 1 up to 80 guests in 14 rooms) and duration (by days, weeks, or months) with catering, fiber-optic internet, and private parking.'
                  : 'Diseñamos propuestas a medida para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales. Elige el rango de huéspedes (de 1 hasta 80 personas en 14 habitaciones) y la duración (por días, semanas o meses) con alimentación, internet por fibra óptica y parqueaderos.'}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={buildContextualWhatsAppUrl('hospedaje')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#06150F] hover:bg-[#E2C585] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl cursor-pointer group"
                >
                  <span>{isEn ? 'Request Quote' : 'Solicitar Cotización'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => setShowComparisonModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E2C585] border border-[#C8A45D]/40 text-xs font-bold tracking-wide transition-all cursor-pointer"
                >
                  <span>{isEn ? 'View Tier Table' : 'Ver Tabla de Escalas'}</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Lado derecho: 4 Escalas de Cotización por Número de Personas y Duración (Conservando el diseño exacto de 4 cajas) */}
            <ScrollReveal direction="right" delay={150} duration={850} className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="grid grid-cols-4 gap-2 sm:gap-3 p-4 sm:p-5 rounded-3xl bg-[#071912]/80 backdrop-blur-md border border-[#C8A45D]/40 shadow-2xl">
                {/* Escala 1 */}
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      serviceType: 'hospedaje',
                      itemName: isEn ? 'Quote 10 to 25 Guests (Corporate Staff / Technical Teams)' : 'Cotización 10 a 25 Personas (Personal de Empresas / Equipos)',
                    })
                  }
                  className="px-2.5 sm:px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center min-w-[65px] sm:min-w-[82px] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold text-white block">
                    10–25
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 font-semibold block pt-1">
                    {isEn ? 'Pax · Companies' : 'Pax · Empresas'}
                  </span>
                </button>

                {/* Escala 2 */}
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      serviceType: 'grupos',
                      itemName: isEn ? 'Quote 28 to 50 Guests (Delegations / NGOs / Volunteers)' : 'Cotización 28 a 50 Personas (Delegaciones / ONGs / Voluntarios)',
                    })
                  }
                  className="px-2.5 sm:px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center min-w-[65px] sm:min-w-[82px] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold text-white block">
                    28–50
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 font-semibold block pt-1">
                    {isEn ? 'Pax · NGOs' : 'Pax · ONGs'}
                  </span>
                </button>

                {/* Escala 3 */}
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      serviceType: 'grupos',
                      itemName: isEn ? 'Quote 50 to 80 Guests (Full 14 Rooms Block)' : 'Cotización 50 a 80 Personas (Bloque Completo 14 Habitaciones)',
                    })
                  }
                  className="px-2.5 sm:px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center min-w-[65px] sm:min-w-[82px] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold text-white block">
                    50–80
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 font-semibold block pt-1">
                    {isEn ? 'Pax · 14 Rooms' : 'Pax · 14 Hab.'}
                  </span>
                </button>

                {/* Escala 4: Duración */}
                <button
                  type="button"
                  onClick={() => setShowComparisonModal(true)}
                  className="px-2.5 sm:px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center min-w-[65px] sm:min-w-[82px] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold text-[#E2C585] block animate-pulse">
                    7–30+
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 font-semibold block pt-1">
                    {isEn ? 'Nights · Long' : 'Noches · Larga'}
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Formulario Directo Desplegable Opcional */}
          {isPromoExpired && (
            <div className="mt-8 p-6 sm:p-10 rounded-3xl bg-[#071912]/95 border border-[#C8A45D]/40 text-center space-y-4 max-w-2xl mx-auto shadow-2xl animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A45D] block">
                {isEn ? 'Direct Attention · Extended Stays' : 'Atención Directa Larga Estadía'}
              </span>
              <h4 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white">
                {isEn ? 'Request your corporate or group quote' : 'Solicite su cotización corporativa o grupal'}
              </h4>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-md mx-auto">
                {isEn
                  ? 'Tell us the number of guests and estimated length of stay to send our preferential proposal.'
                  : 'Indíquenos el número de personas y la duración estimada de su estadía para enviarle nuestra propuesta preferencial.'}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpiredForm(!showExpiredForm)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8A45D] hover:bg-[#E2C585] text-[#06150F] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl cursor-pointer"
                >
                  <span>
                    {isEn
                      ? showExpiredForm
                        ? 'Hide Form'
                        : 'Open Quote Form'
                      : showExpiredForm
                      ? 'Ocultar Formulario'
                      : 'Abrir Formulario de Cotización'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {showExpiredForm && (
                <div className="pt-8 border-t border-white/10 text-left">
                  <DirectQuoteForm defaultService="hospedaje" darkTheme={true} />
                </div>
              )}
            </div>
          )}
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
export { LodgingPageDesktop as LodgingPage };
export default LodgingPageDesktop;
