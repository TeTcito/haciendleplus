import React, { useRef, useState } from 'react';
import {
  Building2,
  CheckCircle2,
  Wifi,
  Presentation,
  Utensils,
  BedDouble,
  Car,
  ShieldCheck,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  Coffee,
  Trees,
  Sparkles,
  ChevronDown,
  Search,
  X,
  FileText,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { useCMS } from '../../context/CMSContext';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { useDocumentMeta } from '../../utils/seo';
import { DirectQuoteForm } from '../../components/DirectQuoteForm';
import { ScrollReveal } from '../../components/ScrollReveal';
import { CORPORATE_SPACES_TABLE, CORPORATE_SPACES_CARDS } from '../../data/resortSpaces';

export const CorporatePageMobile: React.FC = () => {
  const { siteConfig, packages, openQuoteModal } = useCMS();
  const aforosRef = useRef<HTMLDivElement | null>(null);
  const formatosCarouselRef = useRef<HTMLDivElement | null>(null);

  const scrollFormatos = (direction: 'left' | 'right') => {
    if (formatosCarouselRef.current) {
      const scrollAmount = 160;
      formatosCarouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const [currentPkgIndex, setCurrentPkgIndex] = useState(0);
  const [showAforosModal, setShowAforosModal] = useState(false);
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState<number | null>(null);
  const [quickEmail, setQuickEmail] = useState('');

  useDocumentMeta({
    title: 'Grandes Eventos y Experiencias Corporativas en Quito–Píntag | Hacienda Le Plus',
    description:
      'Macroeventos y encuentros empresariales en Quito–Píntag: eventos de fin de año, integración, convenciones y celebraciones de gran formato con carpas, jardines, catering, tarima, pista de baile, actividades deportivas, piscina y hospedaje complementario.',
    canonicalPath: '/corporativo',
  });

  const corpPackages = packages.filter((p) => p.category === 'corporativo');

  const extendedCorpPackages = [
    ...corpPackages,
    ...(corpPackages.length < 3
      ? [
          {
            id: 'pkg-corp-findeanio',
            category: 'corporativo' as const,
            title: 'Fiestas de Fin de Año & Celebraciones de Gran Formato',
            subtitle: 'Carpas, jardines, catering, tarima y pista de baile.',
            priceLabel: 'Desde',
            priceValue: 45,
            unit: 'por participante',
            capacity: '80 a 350+ participantes',
            setupInfo: 'Carpas + Jardines + Tarima + Pista de Baile + Catering',
            description:
              'Macroeventos empresariales y fiestas de fin de año con montaje de carpas, tarima profesional, pista de baile, banquete o parrillada y hospedaje complementario.',
            inclusions: [
              'Carpas estructurales, jardines iluminados, tarima y pista de baile',
              'Catering corporativo propio: menú de gala, buffet o parrillada campestre',
              'Complemento de piscina temperada, actividades deportivas y parqueaderos para buses',
              'Opción de hospedaje complementario en nuestras 14 habitaciones (28 a 80 pax)',
            ],
            highlightBadge: 'Fin de Año & Macroeventos',
            image: '/images/hacienda/boda-carpa-gala.jpg',
            whatsappIntent: 'Evento Corporativo de Fin de Año / Gran Formato',
            featuredInHome: false,
          },
          {
            id: 'pkg-corp-teambuilding',
            category: 'corporativo' as const,
            title: 'Integración Empresarial, Deportes & Piscina',
            subtitle: 'Actividades deportivas, piscina 14×6m, jardines y catering.',
            priceLabel: 'Desde',
            priceValue: 40,
            unit: 'por participante',
            capacity: 'Hasta 350 participantes',
            setupInfo: 'Jardines + Canchas Deportivas + Piscina + Catering',
            description:
              'Jornadas de integración corporativa y team building fortalecidas con nuestras canchas deportivas, piscina temperada, restaurante propio y hospedaje complementario.',
            inclusions: [
              'Uso exclusivo de jardines (5.000 m²) y canchas deportivas (fútbol, vóley, básquet)',
              'Catering y restaurante: desayuno, parrillada de integración y coffee breaks',
              'Acceso a piscina temperada (14×6m), 2 hidromasajes, sauna y turco como complemento',
              'Parqueaderos privados para autobuses y hospedaje complementario opcional',
            ],
            highlightBadge: 'Integración & Deportes',
            image: '/images/hacienda/jardines-teambuilding.jpg',
            whatsappIntent: 'Jornada de Integración y Deportes',
            featuredInHome: false,
          },
        ]
      : []),
  ];

  const currentPkg = extendedCorpPackages[currentPkgIndex] || extendedCorpPackages[0];

  const prevPkg = () => {
    setCurrentPkgIndex((prev) => (prev === 0 ? extendedCorpPackages.length - 1 : prev - 1));
  };

  const nextPkg = () => {
    setCurrentPkgIndex((prev) => (prev === extendedCorpPackages.length - 1 ? 0 : prev + 1));
  };

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    openQuoteModal({
      serviceType: 'corporativo',
      itemName: quickEmail ? `Dossier Corporativo (${quickEmail})` : 'Dossier Corporativo & Tarifario',
    });
  };

  const scrollToAforos = () => {
    if (aforosRef.current) {
      aforosRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#0A1F17] overflow-x-hidden">
      {/* =========================================================================
          SECCIÓN 1: HERO CORPORATIVO FORMATO 16:9
          - Formato 16:9 sin scroll inicial
          - Texto a la izquierda con ancho máximo de 50%
          - Título grande y elegante, sin etiquetas ni mensajes
          - Botón Solicitar con acción a WhatsApp (0969817891)
          - 3 Iconos mantenidos con micro-badges compactos
          ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#06150F] aspect-[16/9] min-h-[220px] flex flex-col justify-center">
        {/* Imagen de fondo integrada a todo el ancho */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hacienda/corporate-hero-composite.jpg"
            alt="Eventos y Convenciones en Salón de Hacienda Le Plus"
            className="w-full h-full object-cover object-[70%_center] select-none"
            fetchPriority="high"
          />
          {/* Sutil overlay para garantizar contraste de lectura óptimo en el lado izquierdo */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(to right, rgba(6, 21, 15, 0.95) 0%, rgba(6, 21, 15, 0.88) 46%, rgba(6, 21, 15, 0.38) 65%, rgba(6, 21, 15, 0.08) 100%)',
            }}
            aria-hidden="true"
          />
        </div>

        {/* Contenido en primer plano sobre el lado izquierdo del fondo (máximo 50% de ancho) */}
        <div className="relative z-10 w-full px-4 sm:px-6 py-2 flex flex-col justify-center">
          <div className="max-w-[50%] space-y-1.5 sm:space-y-2">
            <ScrollReveal direction="left" delay={60} distance={15}>
              <h1 className="text-white text-left font-serif-luxury font-bold text-[28px] sm:text-[36px] leading-[0.98] tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                Grandes Eventos &amp;{' '}
                <span className="italic font-light text-[21px] sm:text-[27px] bg-gradient-to-r from-[#FAF7F2] via-[#E2C585] to-[#C8A45D] bg-clip-text text-transparent block mt-0.5 leading-tight">
                  Experiencias Corporativas
                </span>
              </h1>
            </ScrollReveal>

            {/* 3 Iconos mantenidos con micro-badges compactos */}
            <ScrollReveal direction="up" delay={120} distance={10}>
              <div className="flex flex-col gap-1 pt-0.5 text-[8.5px] sm:text-[9.5px] text-[#FAF7F2]/90 leading-tight">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                    <Coffee className="w-2 h-2" />
                  </div>
                  <span className="truncate">Carpas, jardines &amp; catering</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                    <ShieldCheck className="w-2 h-2" />
                  </div>
                  <span className="truncate">Tarima, pista &amp; sonido pro</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                    <BedDouble className="w-2 h-2" />
                  </div>
                  <span className="truncate">Piscina &amp; 14 hab. complementarias</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Botón Cotizar al límite del texto debajo de los iconos */}
            <ScrollReveal direction="up" delay={180} distance={10}>
              <div className="pt-0.5">
                <a
                  href={buildContextualWhatsAppUrl('corporativo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center justify-center gap-1 rounded bg-[#13281F] hover:bg-[#0A1F17] text-[#E2C585] border border-[#C8A45D]/40 text-[9.5px] font-bold shadow-2xs active:scale-95 transition-all cursor-pointer"
                  style={{ padding: '2px 6px', lineHeight: 1 }}
                >
                  <span>Cotizar</span>
                  <ArrowRight className="w-2.5 h-2.5 text-[#E2C585] shrink-0" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 2: 4 PILARES EN UNA SOLA FILA CON SEPARACIÓN DE 15PX
          ========================================================================= */}
      <section className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="grid grid-cols-4 gap-[15px] text-center">
          {/* Pilar 1: Carpas, Tarima y Pista */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-xs">
              <Presentation className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </div>
            <span className="font-serif-luxury text-[11px] sm:text-xs font-bold text-[#071912] leading-tight line-clamp-2">
              Carpas &amp; Tarima
            </span>
          </div>

          {/* Pilar 2: Catering y Restaurante */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-xs">
              <Coffee className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </div>
            <span className="font-serif-luxury text-[11px] sm:text-xs font-bold text-[#071912] leading-tight line-clamp-2">
              Catering Propio
            </span>
          </div>

          {/* Pilar 3: Jardines, Deportes y Piscina */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-xs">
              <Trees className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </div>
            <span className="font-serif-luxury text-[11px] sm:text-xs font-bold text-[#071912] leading-tight line-clamp-2">
              Deportes &amp; Piscina
            </span>
          </div>

          {/* Pilar 4: Hospedaje Complementario */}
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-xs">
              <BedDouble className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </div>
            <span className="font-serif-luxury text-[11px] sm:text-xs font-bold text-[#071912] leading-tight line-clamp-2">
              14 Habitaciones
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3 Y 4: GRANDES EVENTOS & FORMATOS EXCLUSIVOS
          ========================================================================= */}
      <div className="w-full relative">
        {/* Sección 3: Grandes Eventos Corporativos (Título sin etiqueta ni mensaje, apartados en una sola fila) */}
        <section className="w-full bg-[#071912] text-[#FAF7F2] py-8 sm:py-10 px-4 sm:px-6 border-t border-b border-[#C8A45D]/20 relative z-10">
          <div className="w-full max-w-[1440px] mx-auto space-y-6">
            {/* Título en lado izquierdo sin etiqueta y sin mensaje */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-left">
              <h2 className="font-serif-luxury text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                Grandes Eventos Corporativos
              </h2>
              <button
                type="button"
                onClick={scrollToAforos}
                className="inline-flex w-fit items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#06150F] font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95"
              >
                <span>Ver aforos</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#A6823C]" />
              </button>
            </div>

            {/* Apartados en una sola fila */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 items-start">
              {/* Apartado 1: Fin de Año & Gran Formato */}
              <div
                onClick={() =>
                  openQuoteModal({
                    serviceType: 'corporativo',
                    itemName: 'Eventos de Fin de Año & Celebraciones de Gran Formato',
                  })
                }
                className="group cursor-pointer text-center p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-[#C8A45D]/60 shadow-md group-hover:border-[#DFB96E] group-hover:scale-105 transition-all duration-300 p-1">
                  <img
                    src="/images/hacienda/boda-carpa-gala.jpg"
                    alt="Eventos de Fin de Año, Carpas, Tarima y Pista de Baile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="font-serif-luxury text-xs sm:text-sm font-bold text-white group-hover:text-[#E2C585] transition-colors mt-2 line-clamp-2 leading-tight">
                  Fin de Año &amp; Gran Formato
                </h4>
                <div className="text-[10px] sm:text-xs font-bold text-[#E2C585] mt-1">
                  Hasta 350+ pax
                </div>
              </div>

              {/* Apartado 2: Integración, Deportes & Piscina */}
              <div
                onClick={() =>
                  openQuoteModal({
                    serviceType: 'corporativo',
                    itemName: 'Integración Empresarial, Actividades Deportivas y Piscina',
                  })
                }
                className="group cursor-pointer text-center p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-[#C8A45D]/60 shadow-md group-hover:border-[#DFB96E] group-hover:scale-105 transition-all duration-300 p-1">
                  <img
                    src="/images/hacienda/jardines-teambuilding.jpg"
                    alt="Integración, Actividades Deportivas y Piscina"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="font-serif-luxury text-xs sm:text-sm font-bold text-white group-hover:text-[#E2C585] transition-colors mt-2 line-clamp-2 leading-tight">
                  Integración &amp; Deportes
                </h4>
                <div className="text-[10px] sm:text-xs font-bold text-[#E2C585] mt-1">
                  Desde $40 / pax
                </div>
              </div>

              {/* Apartado 3: Convenciones + Hospedaje Complementario */}
              <div
                onClick={() =>
                  openQuoteModal({
                    serviceType: 'corporativo',
                    itemName: 'Convenciones con Hospedaje Complementario (14 Habitaciones)',
                  })
                }
                className="group cursor-pointer text-center p-2 rounded-xl hover:bg-white/5 transition-all duration-300"
              >
                <div className="w-20 h-20 sm:w-28 sm:h-28 mx-auto rounded-full overflow-hidden border-2 border-[#C8A45D]/60 shadow-md group-hover:border-[#DFB96E] group-hover:scale-105 transition-all duration-300 p-1">
                  <img
                    src="/images/hacienda/reunion-corporativa.jpg"
                    alt="Convenciones y Hospedaje Complementario"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h4 className="font-serif-luxury text-xs sm:text-sm font-bold text-white group-hover:text-[#E2C585] transition-colors mt-2 line-clamp-2 leading-tight">
                  Convenciones + Hospedaje
                </h4>
                <div className="text-[10px] sm:text-xs font-bold text-[#E2C585] mt-1">
                  28 a 80 huéspedes
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 4: Formatos Exclusivos (Título a la izquierda, carrusel de 2 tarjetas y media) */}
        <div className="w-full relative px-4 sm:px-6 lg:px-8 py-6 sm:py-8 bg-[#071912] border-b border-[#C8A45D]/20">
          <div className="max-w-6xl mx-auto space-y-4">
            {/* Cabecera con título generalizado a la izquierda y flechas de navegación a la derecha */}
            <div className="flex items-center justify-between">
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
                Formatos Exclusivos
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollFormatos('left')}
                  aria-label="Anterior formato"
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4 stroke-[1.75]" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollFormatos('right')}
                  aria-label="Siguiente formato"
                  className="w-8 h-8 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs"
                >
                  <ChevronRight className="w-4 h-4 stroke-[1.75]" />
                </button>
              </div>
            </div>

            {/* Pista de Carrusel táctil con 2.5 tarjetas visibles */}
            <div
              ref={formatosCarouselRef}
              className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 pt-1"
            >
              {extendedCorpPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="snap-start shrink-0 w-[38vw] min-w-[136px] max-w-[160px] rounded-2xl overflow-hidden bg-[#0A1F17] border border-[#C8A45D]/30 shadow-md flex flex-col justify-between"
                >
                  {/* Imagen */}
                  <div className="relative h-24 sm:h-28 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A1F17] via-transparent to-transparent" />
                    {pkg.highlightBadge && (
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full text-[8.5px] font-bold uppercase tracking-wider bg-black/70 text-[#E2C585] border border-white/10">
                        {pkg.highlightBadge}
                      </span>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-2.5 flex flex-col justify-between flex-1 gap-1.5">
                    <div>
                      <h4 className="font-serif-luxury text-xs sm:text-sm font-bold text-white line-clamp-2 leading-tight">
                        {pkg.title}
                      </h4>
                      <div className="text-[9.5px] sm:text-[10px] text-[#E2C585] font-semibold mt-1">
                        {pkg.capacity}
                      </div>
                      <div className="text-[9px] text-[#FAF7F2]/70">
                        Desde ${pkg.priceValue} / {pkg.unit}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        openQuoteModal({
                          serviceType: 'corporativo',
                          itemName: pkg.title,
                        })
                      }
                      className="w-full mt-1 py-1 rounded bg-[#13281F] hover:bg-[#06150F] text-[#FAF7F2] text-[9.5px] font-bold border border-[#C8A45D]/30 shadow-2xs active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-2.5 h-2.5 text-[#C8A45D]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECCIONES COMPLEMENTARIAS ARMONIZADAS CON LA PALETA DE LA MARCA
          ========================================================================= */}
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 space-y-16">

        {/* =========================================================================
            SECCIÓN B: ESPACIOS Y AFOROS (RÉPLICA EXACTA IMAGEN 2)
            - Fondo marfil claro (#FAF7F2).
            - Columna izquierda: Tag "✦ ESPACIOS Y AFOROS", titular serif en Cormorant Garamond,
              y enlace "Ver matriz técnica completa →" que abre el modal con la tabla completa.
            - Columna derecha: 4 tarjetas verticales redondeadas ([2rem]) con fotografía,
              título inferior y botón circular de flecha (→).
            ========================================================================= */}
        <section ref={aforosRef} id="tabla-aforos" className="scroll-mt-28 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Columna Izquierda: Titular y Enlace a Matriz */}
            <ScrollReveal direction="left" duration={850} className="lg:col-span-3 space-y-4 text-left">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#A6823C]">
                <span>✦</span>
                <span>INFRAESTRUCTURA & AFOROS</span>
              </div>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[#071912] leading-[1.12]">
                Carpas, jardines, tarima y espacios de gran formato
              </h3>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAforosModal(true)}
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#071912] cursor-pointer"
                >
                  <span className="border-b-2 border-[#A6823C] pb-0.5 group-hover:border-[#071912] transition-colors">
                    Ver matriz de espacios e instalaciones
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A6823C] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </ScrollReveal>

            {/* Columna Derecha: 4 Tarjetas Verticales de Espacios */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-4 lg:gap-5">
                {CORPORATE_SPACES_CARDS.map((card, idx) => {
                  const dirs: ('up-left' | 'up' | 'up' | 'up-right')[] = ['up-left', 'up', 'up', 'up-right'];
                  return (
                    <ScrollReveal key={card.id} direction={dirs[idx % 4]} delay={60 + idx * 70} duration={700} className="h-full">
                      <div
                        onClick={() => {
                          setSelectedSpaceIndex(idx);
                          setShowAforosModal(true);
                        }}
                        className="group relative h-80 sm:h-96 lg:h-[400px] rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-5 select-none h-full"
                      >
                        <img
                          src={card.image}
                          alt={card.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:opacity-90" />

                        {/* Badge superior */}
                        <div className="relative z-10 self-start mb-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#E2C585] backdrop-blur-sm border border-white/10">
                            {card.badge}
                          </span>
                        </div>

                        {/* Barra inferior: Título + Botón flecha circular */}
                        <div className="relative z-10 flex items-end justify-between gap-2">
                          <div className="space-y-0.5 text-left">
                            <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white leading-tight">
                              {card.title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-[#FAF7F2]/80 font-normal">
                              {card.subtitle}
                            </p>
                          </div>

                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 text-[#071912] flex items-center justify-center shrink-0 shadow-md group-hover:bg-[#C8A45D] group-hover:text-white transition-all duration-300 group-hover:scale-105">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6 Garantías Corporativas en carrusel de una sola fila sin títulos */}
        <section className="w-full">
          <div className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scrollbar-none px-1 pb-2 pt-1">
            {/* Card 1 */}
            <div className="snap-start shrink-0 w-[55vw] min-w-[200px] max-w-[240px] p-3.5 rounded-xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex flex-col justify-start gap-2 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                <Presentation className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-[10.5px] text-[#FAF7F2]/80 leading-relaxed">
                Montaje de carpas imperiales en jardines, tarima de escenario, pista de baile y producción técnica para eventos y convenciones.
              </p>
            </div>

            {/* Card 2 */}
            <div className="snap-start shrink-0 w-[55vw] min-w-[200px] max-w-[240px] p-3.5 rounded-xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex flex-col justify-start gap-2 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                <Utensils className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-[10.5px] text-[#FAF7F2]/80 leading-relaxed">
                Almuerzos ejecutivos, banquetes de gala, parrilladas de integración y coffee breaks continuos servidos puntualmente.
              </p>
            </div>

            {/* Card 3 */}
            <div className="snap-start shrink-0 w-[55vw] min-w-[200px] max-w-[240px] p-3.5 rounded-xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex flex-col justify-start gap-2 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                <Wifi className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-[10.5px] text-[#FAF7F2]/80 leading-relaxed">
                Complementos que fortalecen el evento: canchas deportivas, circuitos de team building, piscina cubierta e hidromasaje.
              </p>
            </div>

            {/* Card 4 */}
            <div className="snap-start shrink-0 w-[55vw] min-w-[200px] max-w-[240px] p-3.5 rounded-xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex flex-col justify-start gap-2 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                <BedDouble className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-[10.5px] text-[#FAF7F2]/80 leading-relaxed">
                14 habitaciones y suites privadas (28–80 huéspedes) para alojar a directivos, expositores o delegaciones in situ.
              </p>
            </div>

            {/* Card 5 */}
            <div className="snap-start shrink-0 w-[55vw] min-w-[200px] max-w-[240px] p-3.5 rounded-xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex flex-col justify-start gap-2 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                <Car className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-[10.5px] text-[#FAF7F2]/80 leading-relaxed">
                Amplio estacionamiento privado interno en Quito–Píntag con maniobra cómoda para buses corporativos y vehículos.
              </p>
            </div>

            {/* Card 6 */}
            <div className="snap-start shrink-0 w-[55vw] min-w-[200px] max-w-[240px] p-3.5 rounded-xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex flex-col justify-start gap-2 shadow-xs">
              <div className="w-7 h-7 rounded-lg bg-[#C8A45D]/20 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0">
                <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
              </div>
              <p className="text-[10.5px] text-[#FAF7F2]/80 leading-relaxed">
                RUC activo, facturación electrónica, hitos claros para compras y conectividad Wi-Fi por fibra óptica verificada.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* =========================================================================
          SECCIÓN C: COTIZACIÓN FORMAL - FULL WIDTH (A TODO EL ANCHO) HASTA EL FOOTER
          - Ocupa el 100% del ancho de la pantalla (w-full).
          - Termina verticalmente justo contra el footer (sin margen ni espacio inferior).
          - Fondo arena suave (#F4EFE6) con sutil borde superior (#E3DACB).
          ========================================================================= */}
      <section className="w-full bg-[#F4EFE6] border-t border-[#E3DACB] relative overflow-hidden mb-0 min-h-[180px] lg:h-[220px] flex items-center">
        {/* Imagen con silueta orgánica que topa el margen derecho de la pestaña y llena el 100% de la altura vertical */}
        <div className="absolute inset-y-0 right-0 h-full w-[36%] lg:w-[32%] xl:w-[28%] min-w-[320px] max-w-[500px] hidden lg:block overflow-hidden pointer-events-none z-0">
          <svg className="w-full h-full" viewBox="0 0 320 220" preserveAspectRatio="none">
            <defs>
              <clipPath id="organic-banner-mask">
                <path d="M 80,0 C 25,35 0,75 0,110 C 0,145 25,185 80,220 L 320,220 L 320,0 Z" />
              </clipPath>
            </defs>
            <image
              href="/images/hacienda/boda-suite-lounge.jpg"
              width="320"
              height="220"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#organic-banner-mask)"
            />
          </svg>
        </div>

        {/* Contenido compacto alineado con la altura de la imagen, con margen derecho reservado para la fotografía */}
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-6 lg:py-0 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8 pr-0 lg:pr-[34%] xl:pr-[30%]">
            {/* Lado Izquierdo: Titular y Explicación */}
            <ScrollReveal direction="left" duration={800} className="space-y-1.5 text-left max-w-lg">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A6823C] block">
                Macroeventos & Experiencias Corporativas
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-[#071912] leading-[1.12]">
                Cotización Formal para tu Empresa
              </h3>
              <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed font-normal">
                Solicita la propuesta para tu evento de fin de año, integración o convención con carpas, catering, tarima y hospedaje complementario.
              </p>
            </ScrollReveal>

            {/* Centro: Barra de Input tipo Píldora + Botón WhatsApp 0969817891 */}
            <ScrollReveal direction="right" delay={100} duration={800} className="w-full max-w-md shrink-0">
              <form onSubmit={handleQuickQuote} className="w-full">
                <div className="bg-white rounded-full p-1.5 sm:p-2 pl-5 sm:pl-6 shadow-sm border border-[#E5DDD0] flex items-center justify-between gap-2 focus-within:ring-2 focus-within:ring-[#C8A45D]/40 transition-all">
                  <input
                    type="email"
                    required
                    placeholder="Ingresa tu correo corporativo..."
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-[#071912] placeholder-[#0A1F17]/45 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full px-5 sm:px-6 py-2.5 sm:py-2.5 bg-[#11261D] hover:bg-[#071912] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer transition-all duration-200 shrink-0 shadow-sm active:scale-95"
                  >
                    <span>Cotizar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pl-3 pr-2 mt-2">
                  <a
                    href={buildContextualWhatsAppUrl('corporativo', {
                      customText: 'Hola Hacienda Le Plus, deseo solicitar una cotización para un gran evento / experiencia corporativa (fin de año, integración o convención).',
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#123326] hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>Cotizar por WhatsApp: 0969817891</span>
                  </a>
                  {siteConfig?.corporateEmails?.corporativo && (
                    <span className="text-[11px] text-[#0A1F17]/55 font-normal">
                      {siteConfig.corporateEmails.corporativo}
                    </span>
                  )}
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODAL DE FICHA TÉCNICA Y MATRIZ DE AFOROS
          - Se abre al pulsar "Ver matriz técnica completa" o al hacer clic en cualquier tarjeta de espacio.
          ========================================================================= */}
      {showAforosModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm animate-fade-in"
          onClick={() => setShowAforosModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#0A1F17]/10 max-h-[90vh] overflow-y-auto space-y-6"
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#0A1F17]/10 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A6823C]">
                  Planificación Técnica y Logística
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#071912] mt-1">
                  Matriz Técnica de Aforos por Espacio y Montaje
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/70 mt-1">
                  Capacidades cómodas calculadas para garantizar ventilación, flujo de circulación y visibilidad óptima.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAforosModal(false)}
                className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#071912] hover:text-white flex items-center justify-center text-[#071912] transition-colors cursor-pointer shrink-0"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[#0A1F17]/10">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[#0A1F17]/15 text-[#071912] bg-[#FAF7F2]">
                    <th className="py-3.5 px-4 font-bold">Espacio / Salón</th>
                    <th className="py-3.5 px-4 font-bold">Auditorio</th>
                    <th className="py-3.5 px-4 font-bold">Banquete</th>
                    <th className="py-3.5 px-4 font-bold">Escuela</th>
                    <th className="py-3.5 px-4 font-bold">Tipo U / Directorio</th>
                    <th className="py-3.5 px-4 font-bold">Equipamiento y Ventajas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A1F17]/10">
                  {CORPORATE_SPACES_TABLE.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`hover:bg-[#FAF7F2]/60 transition-colors ${
                        selectedSpaceIndex === idx ? 'bg-[#C8A45D]/10' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-[#071912]">{row.space}</td>
                      <td className="py-3.5 px-4 text-[#A6823C] font-semibold">{row.auditorium}</td>
                      <td className="py-3.5 px-4">{row.banquet}</td>
                      <td className="py-3.5 px-4">{row.school}</td>
                      <td className="py-3.5 px-4">{row.uShape}</td>
                      <td className="py-3.5 px-4 text-[#0A1F17]/75">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#0A1F17]/60 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#A6823C]" />
                Aforos auditados según normativa de eventos y bioseguridad
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAforosModal(false);
                  openQuoteModal({
                    serviceType: 'corporativo',
                    itemName:
                      selectedSpaceIndex !== null && CORPORATE_SPACES_TABLE[selectedSpaceIndex]
                        ? CORPORATE_SPACES_TABLE[selectedSpaceIndex].space
                        : 'Propuesta de Espacios y Aforos',
                  });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#C8A45D] text-[#06150F] hover:bg-[#E2C585] transition-colors cursor-pointer"
              >
                <span>Cotizar espacio seleccionado</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export { CorporatePageMobile as CorporatePage };
export default CorporatePageMobile;
