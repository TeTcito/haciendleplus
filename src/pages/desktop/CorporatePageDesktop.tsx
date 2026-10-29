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
  X,
  FileText,
} from 'lucide-react';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import { useCMS } from '../../context/CMSContext';
import { useLanguage } from '../../context/LanguageContext';
import { buildContextualWhatsAppUrl } from '../../utils/whatsapp';
import { useDocumentMeta } from '../../utils/seo';
import { DirectQuoteForm } from '../../components/DirectQuoteForm';
import { ScrollReveal } from '../../components/ScrollReveal';
import { RESORT_SPACES, CORPORATE_SPACES_TABLE, CORPORATE_SPACES_CARDS } from '../../data/resortSpaces';

export const CorporatePageDesktop: React.FC = () => {
  const { siteConfig, packages, openQuoteModal } = useCMS();
  const { language, isEn, t } = useLanguage();
  const aforosRef = useRef<HTMLDivElement | null>(null);

  const [currentPkgIndex, setCurrentPkgIndex] = useState(0);
  const [showAforosModal, setShowAforosModal] = useState(false);
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState<number | null>(null);
  const [quickEmail, setQuickEmail] = useState('');

  useDocumentMeta({
    title: 'Grandes Eventos y Experiencias Corporativas en Quito–Píntag | Hacienda Le Plus',
    title_en: 'Major Corporate Events, Retreats & Conventions in Quito–Píntag | Hacienda Le Plus',
    description:
      'Macroeventos y encuentros empresariales en Quito–Píntag: eventos de fin de año, integración, convenciones y celebraciones de gran formato con carpas, jardines, catering, tarima, pista de baile, actividades deportivas, piscina y hospedaje complementario.',
    description_en:
      'Major corporate events, team retreats and conventions in Quito–Píntag: year-end galas with structural tents, gardens, catering, stage, pool, and on-site lodging.',
    canonicalPath: '/corporativo',
    lang: language,
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
          SECCIÓN 1: HERO CORPORATIVO - FULL WIDTH CON IMAGEN ORIGINAL INTEGRADA
          - Paleta institucional: Obsidian (#06150F), Deep Forest (#0A1F17), Oro (#C8A45D / #DFB96E).
          - Fondo integrado con la fotografía original del salón con gente conversando
            (salon-reuniones.jpg) adaptada dentro de la silueta orgánica curva con marco oro/marfil.
          - Lado izquierdo: Tipografía Cormorant Garamond, botón dorado Le Plus y micro-badges oro.
          ========================================================================= */}
      <section className="w-full relative overflow-hidden bg-[#06150F] pt-24 sm:pt-28 min-h-[600px] lg:min-h-[660px] flex flex-col justify-between">
        {/* Imagen de fondo integrada a todo el ancho */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hacienda/corporate-hero-composite.jpg"
            alt="Eventos y Convenciones en Salón de Hacienda Le Plus"
            className="w-full h-full object-cover object-right sm:object-center select-none"
          />
          {/* Sutil overlay en móviles para garantizar contraste de lectura óptimo */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#06150F] via-[#06150F]/90 to-transparent lg:hidden pointer-events-none" />
        </div>

        {/* Contenido en primer plano sobre el lado izquierdo del fondo */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-14 pb-12 sm:pb-16 flex-1 flex items-center">
          <div className="max-w-lg lg:max-w-[34rem] xl:max-w-[38rem] space-y-6">
            <ScrollReveal direction="blur-up" duration={850}>
              <span className="inline-block text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.22em] text-[#E2C585] bg-[#06150F]/70 px-3.5 py-1 rounded-full border border-[#C8A45D]/35 mb-2">
                MACROEVENTOS Y ENCUENTROS EMPRESARIALES · QUITO – PÍNTAG
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.55rem] font-semibold text-white leading-[1.08] tracking-tight">
                Grandes Eventos y<br />
                <span className="italic font-normal text-[#E2C585]">Experiencias Corporativas</span> en Le Plus.
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={120} duration={750}>
              <p className="text-base sm:text-lg text-[#FAF7F2]/85 leading-relaxed max-w-xl font-normal">
                Eventos de fin de año, integración, convenciones y celebraciones de gran formato en Quito–Píntag. Contamos con <strong>carpas, jardines, catering propio, tarima y pista de baile</strong>, fortalecidos con actividades deportivas, piscina temperada y hospedaje complementario.
              </p>
            </ScrollReveal>

            {/* Botón Dorado Institucional Le Plus (redirige a WhatsApp) */}
            <ScrollReveal direction="up" delay={200} duration={650}>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={buildContextualWhatsAppUrl('corporativo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-xs sm:text-sm font-bold bg-gradient-to-r from-[#C8A45D] to-[#DFB96E] text-[#06150F] hover:brightness-110 shadow-xl transition-all cursor-pointer active:scale-95"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Solicitar propuesta empresarial</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Fila de 3 Micro-Badges con iconos y textos ampliados */}
            <ScrollReveal direction="up" delay={260} duration={700}>
              <div className="pt-6 flex flex-wrap items-center gap-8 sm:gap-10 border-t border-white/10">
                {/* Badge 1: Carpas, jardines y catering */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0 shadow-sm backdrop-blur-xs">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#FAF7F2] leading-snug">
                    <span>Carpas, jardines</span>
                    <br />
                    <span className="text-[#E2C585]">&amp; catering propio</span>
                  </div>
                </div>

                {/* Badge 2: Tarima & pista de baile */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0 shadow-sm backdrop-blur-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#FAF7F2] leading-snug">
                    <span>Tarima, pista</span>
                    <br />
                    <span className="text-[#E2C585]">&amp; sonido pro</span>
                  </div>
                </div>

                {/* Badge 3: Deportes, piscina & hospedaje */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0 shadow-sm backdrop-blur-xs">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#FAF7F2] leading-snug">
                    <span>Deportes, piscina</span>
                    <br />
                    <span className="text-[#E2C585]">&amp; 14 habitaciones</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Curva fluida tipo ola hacia el fondo crema de la sección 2 */}
        <div className="relative z-10 w-full overflow-hidden leading-none translate-y-[1px]">
          <svg
            className="w-full h-12 sm:h-16 lg:h-20 text-[#FAF7F2] fill-current"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C320,110 680,120 1020,70 C1200,45 1340,30 1440,55 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 2: 4 PILARES DE GRANDES EVENTOS Y EXPERIENCIAS CORPORATIVAS
          ========================================================================= */}
      <section className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-14 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 text-left">
          {/* Pilar 1: Carpas, Tarima y Pista */}
          <ScrollReveal direction="up-left" delay={60} duration={650}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                <Presentation className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#071912] leading-snug">
                  Carpas, Tarima &amp; Pista
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  Carpas estructurales, tarima profesional, pista de baile y salón de convenciones.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pilar 2: Catering y Restaurante */}
          <ScrollReveal direction="up" delay={130} duration={650}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                <Coffee className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#071912] leading-snug">
                  Catering &amp; Restaurante
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  Banquetes de fin de año, parrilladas de integración, coffee breaks y restaurante propio.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pilar 3: Jardines, Deportes y Piscina */}
          <ScrollReveal direction="up" delay={200} duration={650}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                <Trees className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#071912] leading-snug">
                  Deportes &amp; Piscina 14×6m
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  Jardines de 5.000 m², actividades deportivas y piscina temperada como complemento.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Pilar 4: Hospedaje Complementario */}
          <ScrollReveal direction="up-right" delay={270} duration={650}>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/30 text-[#A6823C] flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-105">
                <BedDouble className="w-7 h-7 sm:w-8 sm:h-8 stroke-[1.75]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#071912] leading-snug">
                  Hospedaje Complementario
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  14 habitaciones in situ (28 a 80 huéspedes) que fortalecen tu evento o convención.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN UNIFICADA EN FORMA DE "T" (OBJETO ESCULTÓRICO CONTINUO)
          ========================================================================= */}
      <div className="w-full relative">
        {/* Parte Superior Horizontal de la T (Full Width) */}
        <section className="w-full bg-[#071912] text-[#FAF7F2] pt-14 sm:pt-16 pb-12 sm:pb-14 px-6 sm:px-10 lg:px-16 border-t border-b border-[#C8A45D]/20 relative z-10">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Lado Izquierdo: Título y Acción */}
              <ScrollReveal direction="left" duration={850} className="lg:col-span-4 space-y-4 text-center lg:text-left">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C8A45D] block">
                  Macroeventos y Encuentros Empresariales
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                  Grandes Eventos<br />Corporativos
                </h2>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 mt-2 leading-relaxed max-w-xs mx-auto lg:mx-0 font-normal">
                  Eventos de fin de año, integración, convenciones y celebraciones de gran formato con carpas, jardines, catering, tarima, pista de baile, deportes, piscina y hospedaje complementario.
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToAforos}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#FAF7F2] hover:bg-white text-[#06150F] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <span>Ver espacios y aforos</span>
                    <ChevronDown className="w-4 h-4 text-[#A6823C]" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Lado Derecho: 3 Ítems Circulares con Divisor Vertical */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-center">
                  {/* Ítem Circular 1: Eventos de Fin de Año & Gran Formato */}
                  <ScrollReveal direction="zoom-in" delay={80} duration={700}>
                    <div
                      onClick={() =>
                        openQuoteModal({
                          serviceType: 'corporativo',
                          itemName: 'Eventos de Fin de Año & Celebraciones de Gran Formato',
                        })
                      }
                      className="group cursor-pointer text-center space-y-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden border-2 border-[#C8A45D]/60 shadow-xl group-hover:border-[#DFB96E] group-hover:scale-105 transition-all duration-300 p-1.5">
                        <img
                          src="/images/hacienda/boda-carpa-gala.jpg"
                          alt="Eventos de Fin de Año, Carpas, Tarima y Pista de Baile"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white group-hover:text-[#E2C585] transition-colors mt-2">
                          Fin de Año &amp; Gran Formato
                        </h4>
                        <p className="text-xs text-[#FAF7F2]/75 mt-1">
                          Carpas, jardines, tarima, pista de baile y catering
                        </p>
                        <div className="text-sm sm:text-base font-bold text-[#E2C585] mt-1.5">
                          Hasta 350+ pax
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Ítem Circular 2: Integración, Deportes & Piscina */}
                  <ScrollReveal direction="zoom-in" delay={160} duration={700}>
                    <div
                      onClick={() =>
                        openQuoteModal({
                          serviceType: 'corporativo',
                          itemName: 'Integración Empresarial, Actividades Deportivas y Piscina',
                        })
                      }
                      className="group cursor-pointer text-center space-y-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden border-2 border-[#C8A45D]/60 shadow-xl group-hover:border-[#DFB96E] group-hover:scale-105 transition-all duration-300 p-1.5">
                        <img
                          src="/images/hacienda/jardines-teambuilding.jpg"
                          alt="Integración, Actividades Deportivas y Piscina"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white group-hover:text-[#E2C585] transition-colors mt-2">
                          Integración &amp; Deportes
                        </h4>
                        <p className="text-xs text-[#FAF7F2]/75 mt-1">
                          Canchas deportivas, piscina 14×6m &amp; parrillada
                        </p>
                        <div className="text-sm sm:text-base font-bold text-[#E2C585] mt-1.5">
                          Desde $40 / pax
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Ítem Circular 3: Convenciones + Hospedaje Complementario */}
                  <ScrollReveal direction="zoom-in" delay={240} duration={700} className="sm:border-l sm:border-[#C8A45D]/20 sm:pl-6">
                    <div
                      onClick={() =>
                        openQuoteModal({
                          serviceType: 'corporativo',
                          itemName: 'Convenciones con Hospedaje Complementario (14 Habitaciones)',
                        })
                      }
                      className="group cursor-pointer text-center space-y-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
                    >
                      <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden border-2 border-[#C8A45D]/60 shadow-xl group-hover:border-[#DFB96E] group-hover:scale-105 transition-all duration-300 p-1.5">
                        <img
                          src="/images/hacienda/reunion-corporativa.jpg"
                          alt="Convenciones y Hospedaje Complementario"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white group-hover:text-[#E2C585] transition-colors mt-2">
                          Convenciones + Hospedaje
                        </h4>
                        <p className="text-xs text-[#FAF7F2]/75 mt-1">
                          Salón AV pro, catering y 14 hab. complementarias
                        </p>
                        <div className="text-sm sm:text-base font-bold text-[#E2C585] mt-1.5">
                          28 a 80 huéspedes
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Parte Inferior de la T: Bloque Centrado "Formato Exclusivo" (Carrusel) */}
        <div className="w-full relative px-4 sm:px-6 lg:px-8">
          {/* Contenedor relativo que define el ancho del bloque y posiciona los filetes curvos */}
          <div className="relative max-w-6xl mx-auto -mt-[1px]">
            {/* Filete Curvo Invertido Izquierdo (Une suavemente la barra horizontal con la pared vertical izquierda) */}
            <div className="absolute -top-[1px] right-full w-8 h-8 sm:w-10 sm:h-10 pointer-events-none -mr-[1px] hidden sm:block z-20">
              <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
                <path
                  d="M 40,40 L 40,0 L 0,0 A 40,40 0 0,1 40,40 Z"
                  fill="#071912"
                />
                <path
                  d="M 0,0 A 40,40 0 0,1 40,40"
                  stroke="#C8A45D"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>

            {/* Filete Curvo Invertido Derecho (Une suavemente la barra horizontal con la pared vertical derecha) */}
            <div className="absolute -top-[1px] left-full w-8 h-8 sm:w-10 sm:h-10 pointer-events-none -ml-[1px] hidden sm:block z-20">
              <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
                <path
                  d="M 0,40 L 0,0 L 40,0 A 40,40 0 0,0 0,40 Z"
                  fill="#071912"
                />
                <path
                  d="M 40,0 A 40,40 0 0,0 0,40"
                  stroke="#C8A45D"
                  strokeOpacity="0.25"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>

            {/* Bloque carrusel pegado arriba, sin borde inferior divisorio y sin sombras que creen líneas duras */}
            <div className="relative z-10 rounded-b-[2rem] sm:rounded-b-[2.5rem] bg-[#071912] border-x border-[#C8A45D]/20 text-[#FAF7F2] p-8 sm:p-12 lg:p-14 overflow-hidden">
              {/* Botones de navegación del carrusel en la esquina superior derecha */}
              <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-20 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={prevPkg}
                  aria-label="Formato anterior"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
                </button>
                <button
                  type="button"
                  onClick={nextPkg}
                  aria-label="Siguiente formato"
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <ChevronRight className="w-5 h-5 stroke-[1.75]" />
                </button>
              </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Lado izquierdo: Textos y CTA */}
              <ScrollReveal direction="left" duration={850} className="lg:col-span-5 space-y-4 sm:space-y-5 text-left pr-0 lg:pr-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#C8A45D]">
                  <span>✦</span>
                  <span>FORMATO EXCLUSIVO</span>
                  <span className="text-white/40 ml-2 font-mono text-[11px] tracking-normal">
                    0{currentPkgIndex + 1} / 0{extendedCorpPackages.length}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-white leading-[1.12]">
                  {currentPkg.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 leading-relaxed font-normal max-w-md">
                  {currentPkg.description}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#E2C585] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    {currentPkg.capacity}
                  </span>
                  <span className="text-white/30">•</span>
                  <span>Desde ${currentPkg.priceValue} / {currentPkg.unit}</span>
                </div>

                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      openQuoteModal({
                        serviceType: 'corporativo',
                        itemName: currentPkg.title,
                      })
                    }
                    className="group inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold text-white cursor-pointer relative"
                  >
                    <span className="border-b-2 border-[#C8A45D] pb-1 group-hover:border-[#E2C585] group-hover:text-[#E2C585] transition-colors">
                      Cotizar este formato
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#C8A45D] group-hover:text-[#E2C585] group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Lado derecho: Imagen del formato en carrusel */}
              <ScrollReveal direction="right" duration={850} className="lg:col-span-7">
                <div className="relative w-full h-64 sm:h-80 lg:h-[380px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src={currentPkg.image}
                    alt={currentPkg.title}
                    key={currentPkg.id}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06150F]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-[#071912]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <span className="font-semibold text-[#E2C585] truncate mr-2">
                      {currentPkg.setupInfo}
                    </span>
                    <span className="text-[11px] text-white/70 uppercase tracking-wider shrink-0">
                      {currentPkg.highlightBadge || 'Exclusivo'}
                    </span>
                  </div>
                </div>

                {/* Indicadores de diapositiva */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-4">
                  {extendedCorpPackages.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentPkgIndex(idx)}
                      aria-label={`Ir al formato ${idx + 1}`}
                      className={`h-1.5 transition-all rounded-full cursor-pointer ${
                        idx === currentPkgIndex ? 'w-8 bg-[#C8A45D]' : 'w-2 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </ScrollReveal>
            </div>
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

              <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed font-normal">
                Eventos de fin de año, integración, convenciones y celebraciones de gran formato (hasta 400 pax) con catering propio, pista de baile, actividades deportivas, piscina y hospedaje complementario.
              </p>

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
                {RESORT_SPACES.map((card, idx) => {
                  const dirs: ('up-left' | 'up' | 'up' | 'up-right')[] = ['up-left', 'up', 'up', 'up-right'];
                  const title = isEn ? card.title_en : card.title_es;
                  const subtitle = isEn ? card.subtitle_en : card.subtitle_es;
                  const badge = isEn ? card.badge_en : card.badge_es;

                  return (
                    <ScrollReveal key={card.id} direction={dirs[idx % 4]} delay={60 + idx * 70} duration={700} className="h-full">
                      <div
                        onClick={() => {
                          setSelectedSpaceIndex(idx);
                          setShowAforosModal(true);
                        }}
                        className="group relative h-80 sm:h-96 lg:h-[400px] rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-5 select-none h-full"
                      >
                        {card.videoUrl ? (
                          <video
                            src={card.videoUrl}
                            poster={card.image}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                          />
                        ) : (
                          <img
                            src={card.image}
                            alt={title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:opacity-90" />

                        {/* Badge superior */}
                        <div className="relative z-10 self-start mb-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#E2C585] backdrop-blur-sm border border-white/10">
                            {card.videoUrl && <span className="text-[9px]">▶</span>}
                            <span>{badge}</span>
                          </span>
                        </div>

                        {/* Barra inferior: Título + Botón flecha circular */}
                        <div className="relative z-10 flex items-end justify-between gap-2">
                          <div className="space-y-0.5 text-left">
                            <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white leading-tight">
                              {title}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-[#FAF7F2]/80 font-normal">
                              {subtitle}
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

        {/* 6 Garantías Corporativas e Instalaciones de Gran Formato */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ScrollReveal direction="up-left" delay={50} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <Presentation className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">Tarima, Pista de Baile & Carpas</h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  Montaje de carpas imperiales en jardines, tarima de escenario, pista de baile y producción técnica para eventos de fin de año y convenciones.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <Utensils className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">Catering Propio & Restaurante</h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  Almuerzos ejecutivos, banquetes de gala, parrilladas de integración y coffee breaks continuos servidos puntualmente desde nuestra cocina.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up-right" delay={150} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <Wifi className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">Actividades Deportivas & Piscina</h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  Complementos que fortalecen el evento: canchas deportivas, circuitos de team building en 5 hectáreas, piscina cubierta e hidromasaje.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down-left" delay={200} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <BedDouble className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">Hospedaje Complementario In Situ</h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  14 habitaciones y suites privadas (28–80 huéspedes) para alojar a directivos, expositores o delegaciones en convenciones de varios días.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down" delay={250} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <Car className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">Parqueaderos & Acceso Buses</h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  Amplio estacionamiento privado interno en Quito–Píntag con maniobra cómoda para buses corporativos, furgonetas y vehículos de invitados.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down-right" delay={300} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <ShieldCheck className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">Facturación & Internet Fibra Óptica</h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  RUC activo, facturación electrónica, hitos claros para departamentos de compras y conectividad Wi-Fi por fibra óptica verificada.
                </p>
              </div>
            </div>
          </ScrollReveal>
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
                    <th className="py-3.5 px-4 font-bold">{t.spaces.spaceCol}</th>
                    <th className="py-3.5 px-4 font-bold">{t.spaces.auditoriumCol}</th>
                    <th className="py-3.5 px-4 font-bold">{t.spaces.banquetCol}</th>
                    <th className="py-3.5 px-4 font-bold">{t.spaces.schoolCol}</th>
                    <th className="py-3.5 px-4 font-bold">{t.spaces.uShapeCol}</th>
                    <th className="py-3.5 px-4 font-bold">{t.spaces.notesCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#0A1F17]/10">
                  {RESORT_SPACES.map((space, idx) => (
                    <tr
                      key={space.id}
                      className={`hover:bg-[#FAF7F2]/60 transition-colors ${
                        selectedSpaceIndex === idx ? 'bg-[#C8A45D]/10' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-semibold text-[#071912]">
                        {isEn ? space.title_en : space.title_es}
                      </td>
                      <td className="py-3.5 px-4 text-[#A6823C] font-semibold">{space.capacities.auditorium}</td>
                      <td className="py-3.5 px-4">{space.capacities.banquet}</td>
                      <td className="py-3.5 px-4">{space.capacities.school}</td>
                      <td className="py-3.5 px-4">{space.capacities.uShape}</td>
                      <td className="py-3.5 px-4 text-[#0A1F17]/75">
                        {isEn ? space.notes_en : space.notes_es}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#0A1F17]/60 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#A6823C]" />
                {isEn
                  ? 'Audited capacities complying with event standards and optimal flow'
                  : 'Aforos auditados según normativa de eventos y bioseguridad'}
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAforosModal(false);
                  openQuoteModal({
                    serviceType: 'corporativo',
                    itemName:
                      selectedSpaceIndex !== null && RESORT_SPACES[selectedSpaceIndex]
                        ? (isEn ? RESORT_SPACES[selectedSpaceIndex].title_en : RESORT_SPACES[selectedSpaceIndex].title_es)
                        : 'Propuesta de Espacios y Aforos',
                  });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold bg-[#C8A45D] text-[#06150F] hover:bg-[#E2C585] transition-colors cursor-pointer"
              >
                <span>{t.spaces.quoteSpace}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export { CorporatePageDesktop as CorporatePage };
export default CorporatePageDesktop;
