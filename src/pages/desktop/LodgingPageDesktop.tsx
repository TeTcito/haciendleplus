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
import { getCabinsData, getLodgingServicesData } from '../../data/resortSpaces';

export const LodgingPageDesktop: React.FC = () => {
  const { siteConfig, cabins, lodgingHeroBanner, lodgingServices, openQuoteModal, addLead } = useCMS();
  const { language, isEn, t, tr } = useLanguage();
  const [cabinPageStart, setCabinPageStart] = useState(0);

  // SEO Meta
  useDocumentMeta({
    title: 'Hospedaje para Empresas y Grupos (Larga Estadía) en Quito–Píntag | Hacienda Le Plus',
    title_en: 'Corporate & Group Long-Stay Lodging in Quito–Píntag | Hacienda Le Plus',
    description:
      'Hospedaje de larga estadía para personal de empresas, delegaciones, ONG, voluntarios y grupos en Quito–Píntag. Capacidad máxima 65 personas y 14 baños internos (7 camas matrimoniales + 59 individuales), 13.000 m² de jardines, 80–100 parqueaderos, piscina 84 m² (70 pax), fibra óptica y alimentación.',
    description_en:
      'Long-stay lodging for corporate staff, delegations, NGOs, volunteers and international groups in Quito–Píntag. Audited max capacity 65 guests with 14 internal baths (7 double + 59 single beds), 13,000 m² lawns, 80–100 parking spots, 84 m² pool (70 pax), full board, and fiber-optic Wi-Fi.',
    canonicalPath: '/hospedaje',
    lang: language,
  });

  // Fechas dinámicas automáticas para el widget de agendamiento
  const todayStr = new Date().toISOString().split('T')[0];

  // Estado del widget funcional de cotización según número de personas y duración (inicia vacío)
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

  // Función al hacer clic en el botón "Cotizar Estadía" de la barra de cotización: envía directamente a WhatsApp en formato formulario
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!destination || !guestsSelection || !stayDuration || !checkInDate) {
      alert(
        tr(
          "Please fill in all fields (group type, number of guests, stay duration, and check-in date) to check availability.",
          "Por favor completa todos los campos (tipo de grupo, número de personas, duración y fecha de ingreso) para consultar disponibilidad."
        )
      );
      return;
    }

    const formattedDate = checkInDate.includes('-')
      ? checkInDate.split('-').reverse().join('/')
      : checkInDate;

    const message = isEn
      ? `Hello, Hacienda Le Plus! I would like to check availability and request a quote for our stay:

📋 *BOOKING INQUIRY & QUOTE*
• *Group Profile / Room:* ${destination}
• *Number of Guests:* ${guestsSelection}
• *Stay Duration:* ${stayDuration}
• *Check-in Date:* ${formattedDate}

Could you please confirm availability for these dates and provide the proposal? Thank you!`
      : `¡Hola, Hacienda Le Plus! Deseo consultar disponibilidad y cotización para nuestra estadía:

📋 *CONSULTA DE DISPONIBILIDAD Y COTIZACIÓN*
• *Tipo de Grupo / Habitación:* ${destination}
• *N.º de Personas:* ${guestsSelection}
• *Duración de Estadía:* ${stayDuration}
• *Fecha de Ingreso:* ${formattedDate}

¿Me podrían confirmar la disponibilidad para estas fechas y remitir la cotización correspondiente? ¡Muchas gracias!`;

    addLead({
      clientName: destination,
      organizationOrCouple: destination,
      email: 'agendamiento-directo@haciendaleplus.com',
      phone: 'WhatsApp Directo',
      serviceType: 'hospedaje',
      tentativeDate: formattedDate,
      estimatedVolume: `${guestsSelection} · ${stayDuration}`,
      notes: `Barra de cotización Hospedaje: ${destination}, ${guestsSelection}, ${stayDuration}, fecha: ${formattedDate}`,
      targetCorporateEmail: siteConfig.corporateEmails.reservas,
      sourcePage: '/hospedaje',
    });

    const waUrl = buildContextualWhatsAppUrl({
      phone: siteConfig.whatsappNumber,
      context: 'hospedaje',
      customText: message,
    });

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Reseñas bilingües para el carrusel de testimonios (Larga Estadía, Empresas, ONGs y Grupos)
  const testimonials = [
    {
      id: 1,
      quote: tr(
        'We hosted our international HXP mission of 42 volunteers with full comfort. The 3-course meal plan, fiber-optic internet, and 80–100 private parking spaces for our buses performed flawlessly.',
        'Alojamos a nuestra misión internacional HXP de 42 voluntarios con capacidad holgada en nuestras suites y habitaciones compartidas. La alimentación de 3 tiempos, el internet por fibra óptica y los parqueaderos para buses funcionaron a la perfección.'
      ),
      author: 'Sarah Mitchell',
      role: tr('HXP Mission Coordinator · International NGO', 'Coordinación Misión HXP · ONG Internacional'),
      avatar: '/images/avatars/mision-hxp.jpg',
      rating: 5,
    },
    {
      id: 2,
      quote: tr(
        'Exceptional long-stay option for our technical and executive teams near Quito and the Airport. Comfortable rooms, reliable internet, punctual catering, and corporate billing.',
        'Excelente opción de larga estadía para nuestro personal técnico y directivo cerca de Quito y el Aeropuerto. Habitaciones cómodas, internet estable, alimentación puntual y facturación corporativa.'
      ),
      author: 'Dr. Carlos Enríquez',
      role: tr('Executive Board · Corporate & Project Operations', 'Directorio Ejecutivo · Empresas & Proyectos'),
      avatar: '/images/avatars/dr-carlos.jpg',
      rating: 5,
    },
    {
      id: 3,
      quote: tr(
        'Our international delegation stayed all week in Píntag. The heated pool, restaurant, and sports courts offered the perfect relaxation after intense working days.',
        'Tuvimos a nuestra delegación alojada toda la semana en Píntag. La piscina temperada, el restaurante y las canchas deportivas fueron el complemento ideal tras cada jornada de trabajo.'
      ),
      author: 'IMC Delegation',
      role: tr('International Delegation · Extended Stay', 'Delegación Internacional · Estadía Prolongada'),
      avatar: '/images/avatars/familia-andrade.jpg',
      rating: 5,
    },
    {
      id: 4,
      quote: tr(
        'We booked the entire room block for our guests and organizing committee. Spacious, 24/7 security, and transparent quotes based on headcount and stay duration.',
        'Reservamos el bloque de habitaciones para nuestros invitados y equipo organizador. Espacioso, seguro las 24 horas y con opciones claras de cotización según número de personas y días.'
      ),
      author: 'Valeria & Mateo',
      role: tr('Group Lodging & Events', 'Hospedaje Grupal & Eventos'),
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

  // Lista de habitaciones y cabañas con soporte bilingüe y sincronización completa con el Panel Admin
  const defaultCabins = getCabinsData(language);
  const allCabins: CabinRoom[] =
    cabins && cabins.length > 0
      ? cabins.map((cmsCabin) => {
          if (language !== 'es') {
            const matchedDefault = defaultCabins.find((c) => c.id === cmsCabin.id);
            if (matchedDefault) {
              return {
                ...matchedDefault,
                pricePerNight: cmsCabin.pricePerNight,
                showPrice: cmsCabin.showPrice,
                image: cmsCabin.image,
                imagePosition: cmsCabin.imagePosition,
                videoUrl: cmsCabin.videoUrl,
                mediaType: cmsCabin.mediaType,
              };
            }
          }
          return cmsCabin;
        })
      : defaultCabins;

  const visibleCabinsCount = 4;
  const displayCabins: CabinRoom[] =
    allCabins.length <= visibleCabinsCount
      ? allCabins
      : Array.from({ length: visibleCabinsCount }, (_, i) => allCabins[(cabinPageStart + i) % allCabins.length]);

  const defaultLodgingServices = getLodgingServicesData(language);
  const resolvedLodgingServices =
    lodgingServices && lodgingServices.length > 0
      ? lodgingServices.map((card) => {
          if (language !== 'es') {
            const matched = defaultLodgingServices.find((d) => d.id === card.id);
            if (matched) {
              return {
                ...matched,
                image: card.image,
                imagePosition: card.imagePosition,
                videoUrl: card.videoUrl,
                mediaType: card.mediaType,
                serviceType: card.serviceType,
              };
            }
          }
          return card;
        })
      : defaultLodgingServices;

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
                {tr("LONG-STAY LODGING: CORPORATE PRIORITY · QUITO – PÍNTAG", "LARGA ESTADÍA: PRIORIDAD COMERCIAL · QUITO – PÍNTAG")}
              </span>
            </ScrollReveal>

            {/* Título Principal de Gran Formato con relieve y degradado dorado en la palabra clave */}
            <ScrollReveal direction="blur-up" duration={850}>
              <h1 className="font-serif-luxury text-4xl sm:text-6xl md:text-6xl lg:text-7xl font-normal text-white leading-[1.05] tracking-tight drop-shadow-[0_6px_28px_rgba(0,0,0,0.9)]">
                {tr("Lodging for Companies,", "Hospedaje para Empresas,")} <br />
                <span className="italic font-light bg-gradient-to-r from-[#FAF7F2] via-[#E2C585] to-[#C8A45D] bg-clip-text text-transparent drop-shadow-[0_4px_30px_rgba(200,164,93,0.5)]">
                  {tr("Delegations & Groups", "Delegaciones y Grupos")}
                </span>
              </h1>
            </ScrollReveal>

            {/* Descripción en tamaño ampliado y badges de valor para máxima legibilidad */}
            <ScrollReveal direction="left" delay={120} duration={750}>
              <p className="text-base sm:text-lg md:text-xl text-[#FAF7F2] max-w-3xl leading-relaxed font-light drop-shadow-[0_2px_14px_rgba(0,0,0,0.9)]">
                {tr(
                  "A tranquil sanctuary near Quito designed for extended stays of corporate staff, delegations, NGOs, and international teams—blending comfortable rest, daily dining, seamless connectivity, and refreshing outdoor amenities.",
                  "Un entorno tranquilo cerca de Quito pensado para que equipos de empresas, delegaciones, ONGs y grupos internacionales descansen, trabajen con fluidez y disfruten de gastronomía diaria y espacios al aire libre."
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
                  <span>{tr("Request Quote", "Solicitar Cotización")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setShowComparisonModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/20 backdrop-blur-md font-semibold transition-all cursor-pointer"
                >
                  <span>{tr("View Options by Guests & Duration", "Ver Opciones según Personas y Duración")}</span>
                </button>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#06150F]/60 backdrop-blur-sm border border-white/15 text-[#E2C585] shadow-sm">
                  <Check className="w-3.5 h-3.5 text-[#C8A45D]" /> {tr("Up to 65 Pax · 14 Baths · 7 Double + 59 Single · 80–100 Parking", "Hasta 65 Pax · 14 Baños · 7 Matr. + 59 Indiv. · 80–100 Parqueaderos")}
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
                        {tr("Group Profile / Room", "Tipo de Grupo / Hab.")}
                      </label>
                      <select
                        id="booking-dest"
                        required
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className={`w-full text-xs sm:text-sm font-bold ${
                          destination ? 'text-[#06150F]' : 'text-[#0A1F17]/45'
                        } bg-transparent outline-none cursor-pointer truncate`}
                      >
                        <option value="" disabled hidden>
                          {tr("Select type...", "Seleccionar tipo...")}
                        </option>
                        <option value="Personal de Empresas / Equipos Técnicos" className="text-[#06150F]">
                          {tr("Corporate Staff", "Personal de Empresas")}
                        </option>
                        <option value="Delegaciones / ONG / Voluntarios (HXP / IMC)" className="text-[#06150F]">
                          {tr("Delegations & NGOs", "Delegaciones & ONGs")}
                        </option>
                        <option value="Grupos Internacionales y Misiones" className="text-[#06150F]">
                          {tr("International Groups", "Grupos Internacionales")}
                        </option>
                        <option value="Bloque Completo (Hasta 65 Pax · 14 Baños · 66 Camas)" className="text-[#06150F]">
                          {tr("Full Wing (Up to 65 Pax · 14 Baths)", "Bloque Completo (Hasta 65 Pax · 14 Baños)")}
                        </option>
                        <option value="Suites Ejecutivas & Casa Familiar (1-11 Pax)" className="text-[#06150F]">
                          {tr("Suites & Family House (1-11 Pax)", "Suites & Casa Familiar (1-11 Pax)")}
                        </option>
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
                        {tr("No. of Guests", "N.º de Personas")}
                      </label>
                      <select
                        id="booking-guests"
                        required
                        value={guestsSelection}
                        onChange={(e) => setGuestsSelection(e.target.value)}
                        className={`w-full text-xs sm:text-sm font-bold ${
                          guestsSelection ? 'text-[#06150F]' : 'text-[#0A1F17]/45'
                        } bg-transparent outline-none cursor-pointer truncate`}
                      >
                        <option value="" disabled hidden>
                          {tr("Select guests...", "Seleccionar personas...")}
                        </option>
                        <option value="1 a 11 Personas (Suites / Casa Familiar / Depto.)" className="text-[#06150F]">
                          {tr("1 to 11 Guests (Suites / House / Apt.)", "1 a 11 Personas (Suites / Casa / Depto.)")}
                        </option>
                        <option value="10 a 25 Personas (Equipo / Empresa)" className="text-[#06150F]">
                          {tr("10 to 25 Guests (Company)", "10 a 25 Personas (Empresa)")}
                        </option>
                        <option value="25 a 45 Personas (Delegación / ONG / Empresa)" className="text-[#06150F]">
                          {tr("25 to 45 Guests (Delegation/NGO)", "25 a 45 Personas (Delegación/ONG)")}
                        </option>
                        <option value="45 a 65 Personas (Bloque Completo · Máx. 65 Pax)" className="text-[#06150F]">
                          {tr("45 to 65 Guests (Max 65 · 14 Baths)", "45 a 65 Personas (Máx. 65 · 14 Baños)")}
                        </option>
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
                        {tr("Stay Duration", "Duración de Estadía")}
                      </label>
                      <select
                        id="booking-duration"
                        required
                        value={stayDuration}
                        onChange={(e) => setStayDuration(e.target.value)}
                        className={`w-full text-xs sm:text-sm font-bold ${
                          stayDuration ? 'text-[#06150F]' : 'text-[#0A1F17]/45'
                        } bg-transparent outline-none cursor-pointer truncate`}
                      >
                        <option value="" disabled hidden>
                          {tr("Select duration...", "Seleccionar duración...")}
                        </option>
                        <option value="3 a 6 Noches (Estadía Semanal Corta)" className="text-[#06150F]">
                          {tr("3 to 6 Nights (Short / Weekly)", "3 a 6 Noches (Corta / Semanal)")}
                        </option>
                        <option value="7 a 14 Noches (Estadía Semanal / Quincenal)" className="text-[#06150F]">
                          {tr("7 to 14 Nights (1 to 2 Weeks)", "7 a 14 Noches (1 a 2 Semanas)")}
                        </option>
                        <option value="15 a 30+ Noches (Larga Estadía Mensual)" className="text-[#06150F]">
                          {tr("15 to 30+ Nights (Monthly / Long)", "15 a 30+ Noches (Mensual / Larga)")}
                        </option>
                        <option value="Convenio Corporativo Recurrente" className="text-[#06150F]">
                          {tr("Corporate Agreement / Months", "Convenio Corporativo / Meses")}
                        </option>
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
                        {tr("Check-in Date", "Fecha de Ingreso")}
                      </label>
                      <input
                        ref={checkInInputRef}
                        id="booking-in"
                        required
                        type="date"
                        min={todayStr}
                        value={checkInDate}
                        onClick={(e) => handleOpenCheckInPicker(e)}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className={`w-full text-xs sm:text-sm font-bold ${
                          checkInDate ? 'text-[#06150F]' : 'text-[#0A1F17]/45'
                        } bg-transparent outline-none cursor-pointer`}
                      />
                    </div>
                  </div>

                  {/* 5. Botón COTIZAR POR PERSONAS Y DURACIÓN */}
                  <div className="sm:col-span-2 lg:col-span-1">
                    <button
                      type="submit"
                      className="w-full h-11 rounded-2xl bg-[#071912] hover:bg-[#123326] text-[#E2C585] hover:text-white text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl cursor-pointer group"
                    >
                      <span>{tr("Quote Stay", "Cotizar Estadía")}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </form>

              {/* Frase manuscrita en español */}
              <div className="hidden lg:flex items-center justify-end pt-2 pr-4">
                <span className="font-handwritten text-lg sm:text-xl text-[#E2C585] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] -rotate-2 select-none flex items-center gap-1.5">
                  {tr("Bespoke quotes tailored to guest count and stay duration", "Cotizaciones a medida según número de personas y duración")}
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
            {/* Pilar 1: Capacidad y Camas */}
            <ScrollReveal direction="up-left" delay={50} duration={650} className="pt-4 md:pt-0 md:px-4 first:pt-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <BedDouble className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    {tr("Up to 65 Pax · 14 Baths", "Hasta 65 Pax · 14 Baños")}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {tr("7 double beds + 59 single beds across all units", "7 camas matrimoniales + 59 camas individuales totales")}
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
                    {tr("Full-Board Catering", "Alimentación Completa")}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {tr("Breakfasts, lunches, dinners & coffee breaks", "Desayunos, almuerzos, cenas y coffee breaks")}
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
                    {tr("Fiber-Optic Internet", "Internet Fibra Óptica")}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {tr("Reliable connectivity for work & team sessions", "Conectividad estable para trabajo y sesiones")}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 4: Parqueaderos y Baños Externos */}
            <ScrollReveal direction="up" delay={260} duration={650} className="pt-4 md:pt-0 md:px-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    {tr("80–100 Parking · 8 Ext. Baths", "80–100 Parqueos · 8 Baños Ext.")}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {tr("13,000 m² gardens & fleet/bus parking access", "13.000 m² de jardines y estacionamiento para buses")}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Pilar 5: Complementos Incluidos */}
            <ScrollReveal direction="up-right" delay={330} duration={650} className="pt-4 md:pt-0 md:px-4 col-span-2 md:col-span-1">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#0A1F17]/10 flex items-center justify-center text-[#123326] shrink-0">
                  <Waves className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#06150F]">
                    {tr("Included Amenities", "Complementos Incluidos")}
                  </h4>
                  <p className="text-[11px] text-[#0A1F17]/65 leading-tight">
                    {tr("84 m² pool (70 pax), spa (hot tubs*), 7v7 soccer, b-ball & volley", "Piscina 84 m² (70 pax), spa (hidromasajes*), fútbol 7v7, básquet y vóley")}
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
              {tr("COMMERCIAL PRIORITY · LONG STAY", "PRIORIDAD COMERCIAL · LARGA ESTADÍA")}
            </span>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#06150F] leading-tight">
              {tr("Rooms for", "Habitaciones para")} <br className="hidden sm:block" />
              {tr("Companies & Groups", "Empresas y Grupos")}
            </h2>
            <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed font-light">
              {tr("Specialized lodging in Quito–Píntag for corporate personnel, delegations, NGOs, volunteers, and international groups, with daily meal plans, fiber-optic Wi-Fi, private parking, and tailored rates by guest count and duration.", "Alojamiento especializado en Quito–Píntag para personal de empresas, delegaciones, ONG, voluntarios y grupos internacionales, con alimentación diaria, internet por fibra óptica, parqueaderos privados y tarifas según número de personas y duración.")}
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={buildContextualWhatsAppUrl('hospedaje')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#071912] text-[#E2C585] hover:bg-[#123326] text-xs font-bold transition-all cursor-pointer group shadow-sm"
              >
                <span>{tr("Request Quote", "Solicitar Cotización")}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button
                type="button"
                onClick={() => setShowComparisonModal(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-white/70 hover:bg-white text-[#06150F] text-xs font-semibold transition-all border border-[#06150F]/10 cursor-pointer"
              >
                <span>{tr("View Options by Guests & Duration", "Ver Opciones según Personas y Duración")}</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Right Column: Carrusel de Habitaciones para Empresas y Grupos */}
          <div className="lg:col-span-9 space-y-4">
            {allCabins.length > 4 && (
              <div className="flex items-center justify-end gap-2">
                <span className="text-xs text-[#0A1F17]/60 mr-2">
                  {tr("Carousel", "Carrusel")}: {allCabins.length} {tr("options", "opciones")}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCabinPageStart((prev) => (prev - 1 + allCabins.length) % allCabins.length)
                  }
                  className="w-9 h-9 rounded-full bg-white border border-[#0A1F17]/15 hover:bg-[#071912] hover:text-[#E2C585] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  aria-label="Anterior"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCabinPageStart((prev) => (prev + 1) % allCabins.length)}
                  className="w-9 h-9 rounded-full bg-white border border-[#0A1F17]/15 hover:bg-[#071912] hover:text-[#E2C585] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  aria-label="Siguiente"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
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
                        {/* Imagen o Video de la habitación (Formato 1:1) */}
                        <div className="relative aspect-square w-full overflow-hidden bg-[#0A1F17]">
                          {cabin.mediaType === 'video' && cabin.videoUrl ? (
                            <video
                              src={cabin.videoUrl}
                              poster={cabin.image}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <img
                              src={cabin.image}
                              alt={cabin.name}
                              style={{ objectPosition: cabin.imagePosition || '50% 50%' }}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                              loading="lazy"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80 pointer-events-none" />
                          <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06150F]/85 backdrop-blur-sm text-[#E2C585] border border-[#C8A45D]/30">
                            {cabin.type || (tr("Long Stay", "Larga Estadía"))}
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
                              <span><strong className="text-[#06150F] font-semibold">{tr("Capacity:", "Capacidad:")}</strong> {cabin.capacity}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <BedDouble className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                              <span><strong className="text-[#06150F] font-semibold">{tr("Beds:", "Camas:")}</strong> {cabin.beds}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Bath className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                              <span><strong className="text-[#06150F] font-semibold">{tr("Bathrooms:", "Baños:")}</strong> {cabin.bathrooms} {cabin.bathrooms > 1 ? (tr("private bathrooms", "baños privados")) : (tr("private bathroom", "baño privado"))}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Utensils className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>{tr("Meals, fiber optic & private parking", "Alimentación, fibra óptica y parqueadero")}</span>
                            </li>
                            <li className="flex items-center gap-2">
                              <Waves className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                              <span>{tr("Included: Pool, restaurant & sports fields", "Comp.: Piscina, restaurante y canchas")}</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* Tarifa por noche y botón circular */}
                      <div className="p-4 sm:p-5 pt-2 flex items-center justify-between border-t border-[#0A1F17]/8 mt-1 bg-[#FAF7F2]/50">
                        {cabin.showPrice !== false ? (
                          <div className="flex items-baseline gap-1">
                            <span className="font-bold text-base sm:text-xl text-[#06150F]">
                              ${cabin.pricePerNight}
                            </span>
                            <span className="text-[11px] text-[#0A1F17]/60">/{tr(" ref. (long-stay discount)", " ref. (desc. larga estadía)")}</span>
                          </div>
                        ) : (
                          <span className="text-xs font-semibold text-[#A6823C]">
                            {tr("Preferential Rate", "Tarifa Preferencial")}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => setSelectedCabinModal(cabin)}
                          title={`${tr("View details of", "Ver detalles de")} ${cabin.name}`}
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
            {/* Lado izquierdo: 1ra Tarjeta Grande — Operación Completa para Larga Estadía (Con soporte de Video) */}
            <ScrollReveal direction="left" duration={850} className="lg:col-span-5 xl:col-span-5 h-full">
              <div className="relative rounded-3xl overflow-hidden min-h-[500px] sm:min-h-[560px] h-full flex flex-col justify-between p-8 sm:p-10 text-white shadow-2xl hover:scale-[1.015] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transition-all duration-300 group bg-[#06150F]">
                {lodgingHeroBanner.mediaType === 'video' && lodgingHeroBanner.videoUrl ? (
                  <video
                    key={lodgingHeroBanner.videoUrl}
                    src={lodgingHeroBanner.videoUrl}
                    poster={lodgingHeroBanner.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  />
                ) : (
                  <img
                    src={lodgingHeroBanner.image || '/images/hacienda/piscina-nocturna.jpg'}
                    alt="Instalaciones y Complementos para Empresas y Grupos en Quito–Píntag"
                    className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06150F] via-[#06150F]/65 to-[#06150F]/30 pointer-events-none" />

                {/* Textos sincronizados con CMS */}
                <div className="relative z-10 space-y-3.5">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E2C585] block">
                    {tr(
                      lodgingHeroBanner.overline === 'EMPRESAS, DELEGACIONES, ONGS Y VOLUNTARIOS'
                        ? 'COMPANIES, DELEGATIONS, NGOS & VOLUNTEERS'
                        : lodgingHeroBanner.overline,
                      lodgingHeroBanner.overline
                    )}
                  </span>
                  <h3 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white leading-tight max-w-md">
                    {tr(
                      lodgingHeroBanner.titleLine1 === 'Operación Completa'
                        ? 'Full Operation'
                        : lodgingHeroBanner.titleLine1,
                      lodgingHeroBanner.titleLine1
                    )}{' '}
                    <br />
                    {tr(
                      lodgingHeroBanner.titleLine2 === 'para Larga Estadía'
                        ? 'for Extended Stays'
                        : lodgingHeroBanner.titleLine2,
                      lodgingHeroBanner.titleLine2
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FAF7F2]/85 max-w-sm leading-relaxed font-light">
                    {tr(
                      lodgingHeroBanner.description.startsWith('Estadías prolongadas sin preocupaciones') ||
                        lodgingHeroBanner.description.startsWith('Alojamiento hasta 65 personas')
                        ? 'Worry-free extended stays under one roof: equipped accommodations, three daily meals from our kitchen, reliable connectivity, and peaceful access to gardens, pool, and recreation.'
                        : lodgingHeroBanner.description,
                      lodgingHeroBanner.description
                    )}
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#E2C585] pt-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>
                      {tr(
                        lodgingHeroBanner.locationBadge.startsWith('Quito – Píntag')
                          ? 'Quito – Píntag · 40 min from Quito & 30 min from the Airport'
                          : lodgingHeroBanner.locationBadge,
                        lodgingHeroBanner.locationBadge
                      )}
                    </span>
                  </div>
                </div>

                {/* Botón central de video */}
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
                      {tr(
                        lodgingHeroBanner.videoButtonText === 'Ver Instalaciones'
                          ? 'Tour Facilities'
                          : lodgingHeroBanner.videoButtonText,
                        lodgingHeroBanner.videoButtonText
                      )}
                    </span>
                  </button>
                </div>

                {/* Botones inferiores */}
                <div className="relative z-10 pt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={buildContextualWhatsAppUrl('hospedaje')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white text-[#06150F] hover:bg-[#E2C585] text-xs font-bold tracking-wide transition-colors shadow-md cursor-pointer"
                  >
                    <span>{tr("Request Quote", "Solicitar Cotización")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setShowComparisonModal(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/15 hover:bg-white/25 text-[#FAF7F2] border border-white/25 backdrop-blur-md text-xs font-semibold transition-all cursor-pointer"
                  >
                    <span>{tr("View Options by Guests & Duration", "Ver Opciones según Personas y Duración")}</span>
                  </button>
                </div>
              </div>
            </ScrollReveal>

            {/* Lado derecho: 4+ Tarjetas de Servicios Esenciales y Complementos (con soporte de Video e Imagen) */}
            <div className="lg:col-span-7 xl:col-span-7 flex flex-col justify-between space-y-6">
              <ScrollReveal direction="down" duration={700} className="space-y-1.5">
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#06150F]">
                  {tr("Extended-Stay Services & Amenities", "Servicios de Estadía y Complementos")}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/70 font-light">
                  {tr("Rooms, catering, internet, and parking, fortified by pool, restaurant, and sports fields.", "Habitaciones, alimentación, internet y parqueaderos, fortalecidos por piscina, restaurante y actividades recreativas.")}
                </p>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 flex-1 items-stretch">
                {resolvedLodgingServices.map((card, idx) => {
                  const directions: ('tilt-left' | 'zoom-in' | 'zoom-in' | 'tilt-right')[] = [
                    'tilt-left',
                    'zoom-in',
                    'zoom-in',
                    'tilt-right',
                  ];
                  return (
                    <ScrollReveal
                      key={card.id || idx}
                      direction={directions[idx % 4]}
                      delay={60 + idx * 80}
                      duration={750}
                      className="h-full"
                    >
                      <div
                        onClick={() => {
                          if (card.id === 'lodging-srv-3') {
                            setShowComparisonModal(true);
                          } else {
                            openQuoteModal({
                              serviceType: card.serviceType || 'hospedaje',
                              itemName: tr(card.itemName, card.itemName),
                            });
                          }
                        }}
                        className="group bg-white rounded-3xl overflow-hidden border border-[#0A1F17]/10 flex flex-col justify-between cursor-pointer hover:border-[#C8A45D]/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 h-full"
                      >
                        <div>
                          <div className="aspect-square w-full overflow-hidden relative bg-[#06150F]">
                            {card.mediaType === 'video' && card.videoUrl ? (
                              <video
                                key={card.videoUrl}
                                src={card.videoUrl}
                                poster={card.image}
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover object-center block"
                              />
                            ) : (
                              <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover object-center block group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#06150F]/85 text-[#E2C585] backdrop-blur-sm border border-[#C8A45D]/30">
                              {tr(card.badge, card.badge)}
                            </span>
                          </div>
                          <div className="p-4 space-y-2">
                            <h4 className="font-bold text-sm text-[#06150F] group-hover:text-[#A6823C] transition-colors">
                              {tr(card.title, card.title)}
                            </h4>
                            <p className="text-xs text-[#0A1F17]/75 leading-relaxed font-light">
                              {tr(card.description, card.description)}
                            </p>
                          </div>
                        </div>

                        <div className="p-4 pt-2 border-t border-[#0A1F17]/5 flex items-center justify-between text-[11px] font-semibold text-[#A6823C] group-hover:text-[#06150F] transition-colors">
                          <span>{tr(card.ctaText.replace(' →', ''), card.ctaText.replace(' →', ''))}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
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
                  {tr("CORPORATE & INSTITUTIONAL BACKING", "RESPALDO COMERCIAL E INSTITUCIONAL")}
                </span>
                <h3 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#06150F] leading-tight">
                  {tr("Advantages for", "Ventajas para")} <br className="hidden sm:block" />
                  {tr("Companies & Groups", "Empresas y Grupos")}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 font-light leading-relaxed">
                  {tr("We streamline accommodation logistics for corporate teams, delegations, NGOs, volunteers, and international groups with clear volume and duration rates.", "Simplificamos la logística de alojamiento para personal de empresas, delegaciones, ONGs, voluntarios y grupos internacionales con tarifas claras según número de personas y duración.")}
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
                        {tr("Rates by Volume & Days", "Tarifa por Personas y Días")}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {tr("Scales from 1 up to 65 guests", "Escalas de 1 hasta 65 huéspedes")}
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
                        {tr("Corporate Invoicing", "Facturación Corporativa")}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {tr("Agreements with firms & NGOs", "Convenios con empresas y ONGs")}
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
                        {tr("All-in-One Operation", "Operación Todo en Uno")}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {tr("Room + meals + high-speed Wi-Fi", "Habitación + comidas + internet")}
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
                        {tr("24/7 Security & Parking", "Seguridad & Parqueo 24/7")}
                      </h5>
                      <p className="text-[10px] text-[#0A1F17]/60">
                        {tr("Gated estate in Quito–Píntag", "Predio cerrado en Quito–Píntag")}
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
                      title={tr("Previous testimonial", "Testimonio anterior")}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextTestimonial}
                      className="w-8 h-8 rounded-full bg-white border border-[#0A1F17]/10 hover:bg-[#071912] hover:text-[#E2C585] flex items-center justify-center text-[#0A1F17] transition-colors cursor-pointer"
                      title={tr("Next testimonial", "Siguiente testimonio")}
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
                {tr("QUOTING TIERS · LONG-STAY COMPANIES & GROUPS", "OPCIONES DE COTIZACIÓN · LARGA ESTADÍA EMPRESAS Y GRUPOS")}
              </span>
              <h3 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-white leading-tight">
                {tr("Quotes Tailored to", "Cotización según Número")} <br className="hidden sm:block" />
                {tr("Guest Count & Duration", "de Personas y Duración")}
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-light">
                {tr("Tailored proposals crafted around your team's schedule and goals—by the day, week, or month—integrating comfortable rest, daily dining, connectivity, and full estate logistics in Píntag.", "Diseñamos propuestas flexibles adaptadas al ritmo de tu empresa o delegación, por días, semanas o meses, integrando descanso, alimentación diaria y logística completa en un entorno privado en Píntag.")}
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={buildContextualWhatsAppUrl('hospedaje')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#06150F] hover:bg-[#E2C585] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl cursor-pointer group"
                >
                  <span>{tr("Request Quote", "Solicitar Cotización")}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={() => setShowComparisonModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-[#E2C585] border border-[#C8A45D]/40 text-xs font-bold tracking-wide transition-all cursor-pointer"
                >
                  <span>{tr("View Tier Table", "Ver Tabla de Escalas")}</span>
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
                      itemName: tr("Quote 10 to 25 Guests (Corporate Staff / Technical Teams)", "Cotización 10 a 25 Personas (Personal de Empresas / Equipos)"),
                    })
                  }
                  className="px-2.5 sm:px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center min-w-[65px] sm:min-w-[82px] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold text-white block">
                    10–25
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 font-semibold block pt-1">
                    {tr("Pax · Companies", "Pax · Empresas")}
                  </span>
                </button>

                {/* Escala 2 */}
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      serviceType: 'grupos',
                      itemName: tr("Quote 25 to 45 Guests (Delegations / NGOs / Volunteers)", "Cotización 25 a 45 Personas (Delegaciones / ONGs / Voluntarios)"),
                    })
                  }
                  className="px-2.5 sm:px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center min-w-[65px] sm:min-w-[82px] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold text-white block">
                    25–45
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 font-semibold block pt-1">
                    {tr("Pax · NGOs", "Pax · ONGs")}
                  </span>
                </button>

                {/* Escala 3 */}
                <button
                  type="button"
                  onClick={() =>
                    openQuoteModal({
                      serviceType: 'grupos',
                      itemName: tr("Quote 45 to 65 Guests (Full Wing · Max 65 Pax · 14 Baths)", "Cotización 45 a 65 Personas (Bloque Completo · Máx. 65 Pax · 14 Baños)"),
                    })
                  }
                  className="px-2.5 sm:px-4 py-3 rounded-2xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-center min-w-[65px] sm:min-w-[82px] transition-colors cursor-pointer"
                >
                  <span className="font-serif-luxury text-xl sm:text-3xl font-bold text-white block">
                    45–65
                  </span>
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#FAF7F2]/70 font-semibold block pt-1">
                    {tr("Pax · 14 Baths", "Pax · 14 Baños")}
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
                    {tr("Nights · Long", "Noches · Larga")}
                  </span>
                </button>
              </div>
            </ScrollReveal>
          </div>

          {/* Formulario Directo Desplegable Opcional */}
          {isPromoExpired && (
            <div className="mt-8 p-6 sm:p-10 rounded-3xl bg-[#071912]/95 border border-[#C8A45D]/40 text-center space-y-4 max-w-2xl mx-auto shadow-2xl animate-fadeIn">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A45D] block">
                {tr("Direct Attention · Extended Stays", "Atención Directa Larga Estadía")}
              </span>
              <h4 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-white">
                {tr("Request your corporate or group quote", "Solicite su cotización corporativa o grupal")}
              </h4>
              <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed max-w-md mx-auto">
                {tr("Tell us the number of guests and estimated length of stay to send our preferential proposal.", "Indíquenos el número de personas y la duración estimada de su estadía para enviarle nuestra propuesta preferencial.")}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowExpiredForm(!showExpiredForm)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#C8A45D] hover:bg-[#E2C585] text-[#06150F] text-xs sm:text-sm font-bold tracking-wide transition-all shadow-xl cursor-pointer"
                >
                  <span>
                    {showExpiredForm
                      ? tr("Hide Form", "Ocultar Formulario")
                      : tr("Open Quote Form", "Abrir Formulario de Cotización")}
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
                      <Bath className="w-3.5 h-3.5" /> {selectedCabinModal.bathrooms} {tr("Bath(s)", "Baño(s)")}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] uppercase text-[#0A1F17]/60 block">
                    {tr("Base Rate", "Tarifa Base")}
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
                  {tr("Included Amenities & Facilities", "Instalaciones & Complementos Incluidos")}
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
                {tr("Close", "Cerrar")}
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
                <span>{tr("Quote by Guests & Duration", "Cotizar según Personas y Duración")}</span>
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
                  {tr("Extended-Stay Facilities · Hacienda Le Plus Quito–Píntag", "Instalaciones Larga Estadía · Hacienda Le Plus Quito–Píntag")}
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

            {/* Reproductor de Video de la Tarjeta Principal */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center">
              {lodgingHeroBanner.videoUrl ? (
                <video
                  key={lodgingHeroBanner.videoUrl}
                  src={lodgingHeroBanner.videoUrl}
                  poster={lodgingHeroBanner.image}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={lodgingHeroBanner.image || '/images/hacienda/lodging-hero-hacienda.jpg'}
                    alt="Vista Hacienda Le Plus"
                    className="w-full h-full object-cover opacity-85"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-[#C8A45D] text-[#06150F] flex items-center justify-center shadow-2xl animate-pulse">
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </div>
                    <h4 className="font-serif-luxury text-2xl sm:text-3xl text-white font-semibold">
                      {tr("Lodging for Companies, Delegations & Groups", "Hospedaje para Empresas, Delegaciones y Grupos")}
                    </h4>
                    <p className="text-xs text-[#FAF7F2]/80 max-w-md">
                      {tr("Discover our peaceful rooms, on-site dining room, landscaped gardens, pool, and recreational spaces designed for extended group stays in Quito–Píntag.", "Descubre nuestras habitaciones, restaurante propio, amplios jardines, piscina y áreas recreativas pensadas para el bienestar de tu equipo o delegación en Quito–Píntag.")}
                    </p>
                  </div>
                </>
              )}
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
                  {tr("Extended Stays · Companies, Delegations, NGOs & Groups", "Larga Estadía · Empresas, Delegaciones, ONGs y Grupos")}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold">
                  {tr("Quote Options by Group Size & Duration", "Opciones de Cotización según Número de Personas y Duración")}
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
                        {tr("Scale by Number of Guests / Profile", "Escala por N.º de Personas / Perfil")}
                      </th>
                      <th className="py-3 px-4 font-bold">
                        {tr("Short Stay (1 to 6 Nights)", "Estadía Corta (1 a 6 Noches)")}
                      </th>
                      <th className="py-3 px-4 font-bold text-[#A6823C]">
                        {tr("Weekly Stay (7 to 14 Nights)", "Estadía Semanal (7 a 14 Noches)")}
                      </th>
                      <th className="py-3 px-4 font-bold text-[#071912]">
                        {tr("Extended Stay (15 to 30+ Nights)", "Larga Estadía (15 a 30+ Noches)")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0A1F17]/10">
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {tr("1 to 11 Guests (Master Suites, Family House & Apt.)", "1 a 11 Personas (Suites, Casa Familiar & Depto.)")}
                      </td>
                      <td className="py-3 px-4">
                        {tr("From $55 / guest (Breakfast + Fiber Optic WiFi)", "Desde $55 / persona (Desayuno + Fibra Óptica)")}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        {tr("Weekly Corporate Rate (-15%)", "Tarifa Corporativa Semanal (-15%)")}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        {tr("Monthly Agreement (-25% + Catering)", "Convenio Mensual (-25% + Alimentación)")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {tr("10 to 25 Guests (Company Staff / Teams)", "10 a 25 Personas (Personal de Empresas / Equipos)")}
                      </td>
                      <td className="py-3 px-4">
                        {tr("Multiple-occupancy rooms + fleet parking (80–100 spots)", "Habitaciones múltiples + parqueadero (80–100 plazas)")}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {tr("Half board or 3 meals + Fiber Optic WiFi", "Media pensión o 3 tiempos + Fibra Óptica")}
                      </td>
                      <td className="py-3 px-4 font-semibold">
                        {tr("Preferential rate by project scope & duration", "Tarifa preferencial por proyecto y duración")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {tr("25 to 45 Guests (Delegations, NGOs & Volunteers)", "25 a 45 Personas (Delegaciones, ONGs y Voluntarios)")}
                      </td>
                      <td className="py-3 px-4">
                        {tr("Exclusive room wing + briefing hall + bus lot", "Bloque exclusivo + salón operativo + buses")}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#A6823C]">
                        {tr("From $45 / pax per night (3 full meals)", "Desde $45 / pax por noche (3 comidas)")}
                      </td>
                      <td className="py-3 px-4 font-semibold text-emerald-700">
                        {tr("Special mission quote (HXP / IMC / Aid)", "Cotización especial misiones (HXP / IMC)")}
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-semibold">
                        {tr("45 to 65 Guests (Full Wing · Max 65 Pax · 14 Baths)", "45 a 65 Personas (Bloque Completo · Máx. 65 Pax · 14 Baños)")}
                      </td>
                      <td className="py-3 px-4 font-bold">
                        {tr("Exclusive Hacienda wing (7 double + 59 single beds)", "Bloque total en exclusividad (7 matr. + 59 indiv.)")}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#A6823C]">
                        {tr("Full board + 8 ext. restrooms + 80–100 parking", "Pensión completa + 8 baños ext. + 80–100 parqueos")}
                      </td>
                      <td className="py-3 px-4 font-bold text-[#071912]">
                        {tr("Maximum volume & duration discount", "Máximo beneficio por volumen y duración")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Desglose Auditado de Capacidad, Áreas Externas, Deportes y Nota Operativa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#0A1F17]/10 space-y-2">
                  <h4 className="font-bold text-[#071912] uppercase tracking-wider text-[11px]">
                    {tr("Audited Lodging Distribution (Max 65 Pax · 14 Baths)", "Desglose Oficial de Hospedaje (65 Pax · 14 Baños)")}
                  </h4>
                  <ul className="space-y-1 text-[#0A1F17]/80">
                    <li>• <strong>{tr("2 Master Suites w/ TV:", "2 Suites Matrimoniales c/ TV:")}</strong> {tr("1 three-plaza + 1 single bed · 1 bath ea. (2–3 pax ea.)", "1 cama 3 plazas + 1 indiv. · 1 baño c/u (2–3 pax c/u)")}</li>
                    <li>• <strong>{tr("2 Family Master Suites:", "2 Suites Matrimoniales Familiares:")}</strong> {tr("1 three-plaza + additional singles · 1 bath ea. (2–5 pax ea.)", "1 cama 3 plazas + adicionales indiv. · 1 baño c/u (2–5 pax c/u)")}</li>
                    <li>• <strong>{tr("1 Family House + 2 Rooms:", "1 Casa Familiar + 2 Habitaciones:")}</strong> {tr("2 double rooms (1 w/ TV) + 7 two-tier bunks · 3 baths (11 pax)", "2 matrimoniales (1 c/ TV) + 7 literas x 2 pisos · 3 baños (11 pax)")}</li>
                    <li>• <strong>{tr("1 Apartment:", "1 Departamento:")}</strong> {tr("1 double w/ TV + 9 two-tier bunks · 2 baths (11 pax)", "1 matrimonial c/ TV + 9 literas x 2 pisos · 2 baños (11 pax)")}</li>
                    <li>• <strong>{tr("1 Shared Bunk Room:", "1 Hab. Compartida Literas:")}</strong> {tr("8 two-tier bunks + 9 two-tier bunks · 3 baths (17 pax)", "8 literas + 9 literas x 2 pisos · 3 baños (17 pax)")}</li>
                    <li>• <strong>{tr("1 Shared 10-Bed Room:", "1 Hab. Compartida 10 Camas:")}</strong> {tr("10 single beds · 2 baths (10 pax)", "10 camas individuales · 2 baños (10 pax)")}</li>
                  </ul>
                  <p className="text-[11px] font-bold text-[#06150F] pt-1 border-t border-[#0A1F17]/10">
                    {tr("Total audited inventory: 7 double beds + 59 single beds · 14 internal baths · 65 PAX max.", "Total inventario certificado: 7 camas matrimoniales + 59 individuales · 14 baños internos · 65 PAX máx.")}
                  </p>
                </div>

                <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#0A1F17]/10 space-y-2">
                  <h4 className="font-bold text-[#071912] uppercase tracking-wider text-[11px]">
                    {tr("External Grounds, Sports & Extra-Fee Services", "Áreas Externas, Deportes y Servicios con Pago Extra")}
                  </h4>
                  <ul className="space-y-1 text-[#0A1F17]/80">
                    <li>• <strong>{tr("External grounds:", "Áreas externas:")}</strong> {tr("8 external restrooms · 13,000 m² gardens · 80–100 parking spots.", "8 baños externos · 13.000 m² de jardines · 80–100 parqueaderos.")}</li>
                    <li>• <strong>{tr("Wet zone & spa:", "Piscina y spa:")}</strong> {tr("14×6m = 84 m² pool (70 pax) · 1 sauna/steam/jacuzzi (6–8 pax) · 2 hot tubs 2×2m (8–10 pax ea.).", "Piscina 14×6 m = 84 m² (70 pax) · 1 sauna/turco/jacuzzi (6–8 pax) · 2 hidromasajes 2×2 m (8–10 pax c/u).")}</li>
                    <li>• <strong>{tr("Sports areas:", "Áreas deportivas:")}</strong> {tr("7v7 grass soccer, pro basketball, reg. grass volleyball, ping pong & billiards.", "Fútbol en césped 7 vs 7, básquet profesional, vóley reglamentaria en césped, ping pong y billar.")}</li>
                    <li>• <strong>{tr("At an extra fee:", "Con pago extra adicional:")}</strong> {tr("Karaoke, Nightclub for 50 guests, Social Hall for events & coaching.", "Karaoke, Discoteca para 50 personas y Salón social para eventos y coaching.")}</li>
                  </ul>
                  <div className="bg-amber-100/90 border border-amber-400 text-amber-950 rounded-xl px-3 py-2 text-[11px] font-semibold">
                    {tr("Note: Hot tubs are heated exclusively for large groups and at an extra fee.", "Nota: Los hidromasajes se encienden únicamente en grupos grandes y con tarifa extra.")}
                  </div>
                </div>
              </div>

              <p className="text-xs text-[#0A1F17]/70 bg-[#FAF7F2] p-3.5 rounded-xl border border-[#0A1F17]/10">
                <strong>{tr("Included facilities enhancing your stay:", "Complementos que fortalecen tu estadía:")}</strong>{' '}
                {tr("Every plan enjoys coordinated access to our 84 m² pool (70 pax), 1 sauna/steam/jacuzzi (6–8 pax), on-site restaurant, 13,000 m² lawns, 8 external restrooms, 80–100 parking spots, and 5 sports disciplines in Quito–Píntag.", "Todas las modalidades cuentan con acceso coordinado a nuestra piscina de 84 m² (70 pax), 1 sauna/turco/jacuzzi (6–8 pax), restaurante propio, 13.000 m² de jardines, 8 baños externos, 80–100 parqueaderos y áreas deportivas en Quito–Píntag.")}
              </p>
            </div>

            <div className="p-4 sm:p-6 bg-[#FAF7F2] border-t border-[#0A1F17]/10 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowComparisonModal(false)}
                className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#0A1F17]/70 hover:bg-[#0A1F17]/10 transition-colors cursor-pointer"
              >
                {tr("Close", "Cerrar")}
              </button>
              <a
                href={buildContextualWhatsAppUrl({
                  phone: siteConfig.whatsappNumber,
                  context: 'hospedaje',
                  itemName: tr("Personalized Lodging Quote", "Cotización Hospedaje Personalizada"),
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-[#071912] text-[#E2C585] hover:bg-[#123326] transition-colors cursor-pointer shadow-sm"
              >
                <span>{tr("Request Personalized Quote", "Solicitar Cotización Personalizada")}</span>
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
