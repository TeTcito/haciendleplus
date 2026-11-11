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
import { RESORT_SPACES, CORPORATE_SPACES_TABLE, CORPORATE_SPACES_CARDS, getCorporatePackages, getCorporateHighlightsData } from '../../data/resortSpaces';

export const CorporatePageDesktop: React.FC = () => {
  const { siteConfig, corporateExclusiveFormats, corporateHighlights, openQuoteModal } = useCMS();
  const { language, t, tr } = useLanguage();
  const aforosRef = useRef<HTMLDivElement | null>(null);

  const [currentPkgIndex, setCurrentPkgIndex] = useState(0);
  const [highlightStartIndex, setHighlightStartIndex] = useState(0);
  const [showAforosModal, setShowAforosModal] = useState(false);
  const [selectedSpaceIndex, setSelectedSpaceIndex] = useState<number | null>(null);
  const [quickEmail, setQuickEmail] = useState('');

  useDocumentMeta({
    title: 'Grandes Eventos y Experiencias Corporativas en Quito–Píntag | Hacienda Le Plus',
    title_en: 'Major Corporate Events, Retreats & Conventions in Quito–Píntag | Hacienda Le Plus',
    description:
      'Macroeventos y encuentros empresariales en Quito–Píntag hasta 1.000 personas en 13.000 m² de áreas verdes donde montamos carpas gigantes según el tamaño de cada evento: 20 baños externos, 80–100 parqueaderos, catering, tarima, deportes, piscina 84 m² (70 pax), discoteca 50 pax*, karaoke*, salón coaching* y hospedaje hasta 81 pax.',
    description_en:
      'Major corporate events, retreats & conventions in Quito–Píntag for up to 1,000 guests across 13,000 m² green areas with giant tents sized to each event: 20 external restrooms, 80–100 parking spots, catering, stage, sports, 84 m² pool (70 pax), 50-pax club*, karaoke*, social hall* & lodging up to 81 pax.',
    canonicalPath: '/corporativo',
    lang: language,
  });

  const defaultCorpPackages = getCorporatePackages(language);
  const extendedCorpPackages =
    corporateExclusiveFormats && corporateExclusiveFormats.length > 0
      ? corporateExclusiveFormats.map((cmsPkg) => {
          if (language !== 'es') {
            const matched = defaultCorpPackages.find((p) => p.id === cmsPkg.id);
            if (matched) {
              return {
                ...matched,
                priceValue: 0,
                priceLabel: '',
                unit: '',
                image: cmsPkg.image,
                imagePosition: cmsPkg.imagePosition,
                videoUrl: cmsPkg.videoUrl,
                mediaType: cmsPkg.mediaType,
              };
            }
          }
          return cmsPkg;
        })
      : defaultCorpPackages;

  const currentPkg = extendedCorpPackages[currentPkgIndex % extendedCorpPackages.length] || extendedCorpPackages[0];

  const prevPkg = () => {
    setCurrentPkgIndex((prev) => (prev === 0 ? extendedCorpPackages.length - 1 : prev - 1));
  };

  const nextPkg = () => {
    setCurrentPkgIndex((prev) => (prev === extendedCorpPackages.length - 1 ? 0 : prev + 1));
  };

  const defaultHighlights = getCorporateHighlightsData(language);
  const resolvedHighlights =
    corporateHighlights && corporateHighlights.length > 0
      ? corporateHighlights.map((item) => {
          if (language !== 'es') {
            const matched = defaultHighlights.find((h) => h.id === item.id);
            if (matched) {
              return {
                ...matched,
                image: item.image,
                imagePosition: item.imagePosition,
                videoUrl: item.videoUrl,
                mediaType: item.mediaType,
              };
            }
          }
          return item;
        })
      : defaultHighlights;

  const visibleHighlightsCount = Math.min(3, resolvedHighlights.length || 3);
  const visibleHighlights = Array.from(
    { length: visibleHighlightsCount },
    (_, i) => resolvedHighlights[(highlightStartIndex + i) % resolvedHighlights.length]
  );

  const prevHighlight = () => {
    setHighlightStartIndex((prev) =>
      (prev - 1 + resolvedHighlights.length) % resolvedHighlights.length
    );
  };

  const nextHighlight = () => {
    setHighlightStartIndex((prev) => (prev + 1) % resolvedHighlights.length);
  };

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    openQuoteModal({
      serviceType: 'corporativo',
      itemName: quickEmail
        ? `${tr('Corporate Dossier', 'Dossier Corporativo')} (${quickEmail})`
        : tr('Corporate Event Dossier', 'Dossier Corporativo de Eventos'),
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
            alt={tr("Corporate Events and Conventions at Hacienda Le Plus Hall", "Eventos y Convenciones en Salón de Hacienda Le Plus")}
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
                {tr("MAJOR EVENTS & CORPORATE RETREATS · QUITO – PÍNTAG", "MACROEVENTOS Y ENCUENTROS EMPRESARIALES · QUITO – PÍNTAG")}
              </span>
              <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[3.55rem] font-semibold text-white leading-[1.08] tracking-tight">
                {tr("Major Corporate Events &", "Grandes Eventos y")}<br />
                <span className="italic font-normal text-[#E2C585]">{tr("Executive Experiences", "Experiencias Corporativas")}</span> {tr("at Le Plus.", "en Le Plus.")}
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={120} duration={750}>
              <p className="text-base sm:text-lg text-[#FAF7F2]/85 leading-relaxed max-w-xl font-normal">
                {tr(
                  "Transform your company's year-end gala, team integration retreat, or convention into a memorable experience—set in a private estate just outside Quito with full-scale production, in-house dining, and restful hospitality.",
                  "Transforma tus eventos de fin de año, jornadas de integración o convenciones en encuentros memorables, rodeados de naturaleza a pocos minutos de Quito con producción integral, catering propio y descanso en un solo lugar."
                )}
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
                  <span>{tr("Request corporate proposal", "Solicitar propuesta empresarial")}</span>
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
                    <span>{tr("Green areas, giant tents", "Áreas verdes, carpas gigantes")}</span>
                    <br />
                    <span className="text-[#E2C585]">{tr("& in-house catering", "& catering propio")}</span>
                  </div>
                </div>

                {/* Badge 2: Tarima & pista de baile */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0 shadow-sm backdrop-blur-xs">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#FAF7F2] leading-snug">
                    <span>{tr("Stage, floor", "Tarima, pista")}</span>
                    <br />
                    <span className="text-[#E2C585]">{tr("& pro sound", "& sonido pro")}</span>
                  </div>
                </div>

                {/* Badge 3: Deportes, piscina & hospedaje */}
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#C8A45D]/15 border border-[#C8A45D]/40 flex items-center justify-center text-[#E2C585] shrink-0 shadow-sm backdrop-blur-xs">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#FAF7F2] leading-snug">
                    <span>{tr("Sports, 84 m² pool", "Deportes, piscina 84 m²")}</span>
                    <br />
                    <span className="text-[#E2C585]">{tr("& up to 81 pax lodging", "& hosp. hasta 81 pax")}</span>
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
                  {tr("Giant Tents, Stage & Floor", "Carpas Gigantes, Tarima & Pista")}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  {tr("Giant tents sized to your event on 13,000 m² green areas, elevated stage, dance floor & hall.", "Carpas gigantes según el evento en 13.000 m² de áreas verdes, tarima, pista y salón.")}
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
                  {tr("Catering & Dining Room", "Catering & Restaurante")}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  {tr("Year-end galas, integration BBQ banquets, continuous coffee breaks, and dedicated on-site restaurant.", "Banquetes de fin de año, parrilladas de integración, coffee breaks y restaurante propio.")}
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
                  {tr("Sports & 84 m² Pool (70 Pax)", "Deportes & Piscina 84 m²")}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  {tr("13,000 m² gardens, 7v7 soccer, pro b-ball, reg. volley, ping pong, billiards, 84 m² pool (70 pax), spa & hot tubs*.", "13.000 m² de jardines, fútbol 7v7, básquet pro, vóley regl., ping pong, billar, piscina 84 m² (70 pax) y spa*.")}
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
                  {tr("Lodging (Max 81 Pax · 18 Baths)", "Hospedaje (Máx. 81 Pax)")}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed">
                  {tr("Up to 81 guests with 18 internal baths (7 double + 75 single beds) plus 20 external restrooms & 80–100 parking spots.", "Hasta 81 huéspedes en 18 baños internos (7 camas matr. + 75 indiv.), además de 20 baños externos y 80–100 parqueos.")}
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
                  {tr("Major Events & Corporate Gatherings", "Macroeventos y Encuentros Empresariales")}
                </span>
                <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight">
                  {tr("Major Corporate Events", "Grandes Eventos Corporativos")}
                </h2>

                <p className="text-xs sm:text-sm text-[#FAF7F2]/80 mt-2 leading-relaxed max-w-xs mx-auto lg:mx-0 font-normal">
                  {tr("High-impact corporate gatherings executed with seamless logistics, versatile indoor and outdoor settings, chef-driven catering, and exclusive hospitality.", "Encuentros empresariales de alto impacto con producción integral, gastronomía propia y amplios espacios al aire libre para fortalecer el vínculo de tu equipo.")}
                </p>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={scrollToAforos}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#FAF7F2] hover:bg-white text-[#06150F] font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer active:scale-95"
                  >
                    <span>{tr("View spaces & capacities", "Ver espacios y aforos")}</span>
                    <ChevronDown className="w-4 h-4 text-[#A6823C]" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Lado Derecho: Carrusel Horizontal de Grandes Eventos Corporativos */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[11px] font-mono text-[#E2C585]/80 mr-1">
                    {resolvedHighlights.length} {tr("formats", "modalidades")}
                  </span>
                  <button
                    type="button"
                    onClick={prevHighlight}
                    aria-label={tr("Previous", "Anterior")}
                    className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextHighlight}
                    aria-label={tr("Next", "Siguiente")}
                    className="w-9 h-9 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 items-center">
                  {visibleHighlights.map((item, idx) => (
                    <ScrollReveal
                      key={`${item.id}-${idx}`}
                      direction="zoom-in"
                      delay={80 + idx * 80}
                      duration={700}
                      className={idx === 2 ? 'sm:border-l sm:border-[#C8A45D]/20 sm:pl-6' : ''}
                    >
                      <div
                        onClick={() =>
                          openQuoteModal({
                            serviceType: 'corporativo',
                            itemName: tr(item.whatsappItemName, item.whatsappItemName),
                          })
                        }
                        className="group cursor-pointer text-center space-y-3 p-3 rounded-2xl hover:bg-white/5 transition-all duration-300"
                      >
                        <div className="w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 mx-auto rounded-full overflow-hidden border-2 border-[#C8A45D]/60 shadow-xl group-hover:border-[#DFB96E] group-hover:scale-105 transition-all duration-300 p-1.5">
                          {item.mediaType === 'video' && item.videoUrl ? (
                            <video
                              src={item.videoUrl}
                              poster={item.image}
                              autoPlay
                              muted
                              loop
                              playsInline
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-full object-cover rounded-full"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white group-hover:text-[#E2C585] transition-colors mt-2">
                            {tr(item.title, item.title)}
                          </h4>
                          <p className="text-xs text-[#FAF7F2]/75 mt-1">
                            {tr(item.subtitle, item.subtitle)}
                          </p>
                          <div className="text-sm sm:text-base font-bold text-[#E2C585] mt-1.5">
                            {tr(item.highlightMetric, item.highlightMetric)}
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
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
                  aria-label={tr("Previous format", "Formato anterior")}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white/15 text-white/90 hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-sm"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[1.75]" />
                </button>
                <button
                  type="button"
                  onClick={nextPkg}
                  aria-label={tr("Next format", "Siguiente formato")}
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
                  <span>{tr("EXCLUSIVE FORMAT", "FORMATO EXCLUSIVO")}</span>
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
                      {tr("Quote this format", "Cotizar este formato")}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#C8A45D] group-hover:text-[#E2C585] group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </ScrollReveal>

              {/* Lado derecho: Imagen del formato en carrusel (Formato 1:1) */}
              <ScrollReveal direction="right" duration={850} className="lg:col-span-7 flex flex-col justify-center">
                <div className="relative w-full aspect-square max-w-[440px] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                  <img
                    src={currentPkg.image}
                    alt={currentPkg.title}
                    key={currentPkg.id}
                    style={{ objectPosition: currentPkg.imagePosition || '50% 50%' }}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06150F]/80 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 bg-[#071912]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
                    <span className="font-semibold text-[#E2C585] truncate mr-2">
                      {currentPkg.setupInfo}
                    </span>
                    <span className="text-[11px] text-white/70 uppercase tracking-wider shrink-0">
                      {currentPkg.highlightBadge || tr('Exclusive', 'Exclusivo')}
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
                      aria-label={`${tr("Go to format", "Ir al formato")} ${idx + 1}`}
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
                <span>{tr("INFRASTRUCTURE & CAPACITIES", "INFRAESTRUCTURA & AFOROS")}</span>
              </div>

              <h3 className="font-serif-luxury text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold text-[#071912] leading-[1.12]">
                {tr("Giant tents, green areas, stage & spaces", "Carpas gigantes, áreas verdes, tarima y espacios")}
              </h3>

              <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed font-normal">
                {tr("Our external grounds are 13,000 m² green areas where we mount giant tents sized to your event, alongside sports tournaments and coaching sessions.", "Nuestras áreas externas son 13.000 m² de áreas verdes donde montamos carpas gigantes según el tamaño de tu evento, junto con torneos deportivos y salones.")}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowAforosModal(true)}
                  className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#071912] cursor-pointer"
                >
                  <span className="border-b-2 border-[#A6823C] pb-0.5 group-hover:border-[#071912] transition-colors">
                    {tr("View spaces and facilities matrix", "Ver matriz de espacios e instalaciones")}
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
                  const title = tr(card.title_en, card.title_es);
                  const subtitle = tr(card.subtitle_en, card.subtitle_es);
                  const badge = tr(card.badge_en, card.badge_es);

                  return (
                    <ScrollReveal key={card.id} direction={dirs[idx % 4]} delay={60 + idx * 70} duration={700} className="h-full">
                      <div
                        onClick={() => {
                          setSelectedSpaceIndex(idx);
                          setShowAforosModal(true);
                        }}
                        className="group relative h-80 sm:h-96 lg:h-[400px] rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end p-5 select-none h-full"
                      >
                        {card.mediaType === 'video' && card.videoUrl ? (
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
                            style={{ objectPosition: card.imagePosition || '50% 50%' }}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity group-hover:opacity-90" />

                        {/* Badge superior */}
                        <div className="relative z-10 self-start mb-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 text-[#E2C585] backdrop-blur-sm border border-white/10">
                            {card.mediaType === 'video' && card.videoUrl && <span className="text-[9px]">▶</span>}
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
                <h4 className="font-semibold text-sm text-white">
                  {tr("Stage, Dance Floor & Giant Tents", "Tarima, Pista de Baile & Carpas Gigantes")}
                </h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  {tr("In our 13,000 m² green areas we mount giant tents sized to each event, with stage, dance floor & AV production.", "En nuestras 13.000 m² de áreas verdes montamos carpas gigantes según el tamaño de cada evento, con tarima, pista de baile y producción técnica.")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={100} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <Utensils className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">
                  {tr("In-House Catering & Dining Room", "Catering Propio & Restaurante")}
                </h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  {tr("Executive lunches, gala banquets, integration country BBQ, and continuous coffee breaks served punctually from our kitchen.", "Almuerzos ejecutivos, banquetes de gala, parrilladas de integración y coffee breaks continuos servidos punctualmente desde nuestra cocina.")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up-right" delay={150} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <Wifi className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">
                  {tr("Sports, 84 m² Pool (70 Pax) & Spa*", "Deportes, Piscina 84 m² & Spa*")}
                </h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  {tr("13,000 m² green areas, 7v7 grass soccer, pro basketball, reg. grass volley, ping pong, billiards, 84 m² pool (70 pax), sauna/steam/jacuzzi (6–8 pax) & 2 hot tubs (extra fee for large groups). Extra fee: Karaoke, 50-pax Nightclub & Social Hall (events/coaching).", "13.000 m² áreas verdes, fútbol 7v7, básquet pro, vóley regl., ping pong, billar, piscina 84 m² (70 pax), sauna/turco/jacuzzi (6–8 pax) y 2 hidromasajes (grupos grandes c/ costo adicional). Pago extra: Karaoke, Discoteca 50 pax y Salón social eventos/coaching.")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down-left" delay={200} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <BedDouble className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">
                  {tr("Complimentary Lodging (Max 81 Pax)", "Hospedaje (Hasta 81 Pax · 18 Baños)")}
                </h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  {tr("Audited capacity of 81 guests with 18 internal bathrooms (7 double + 75 single beds) across Suites, Panoramic Room, Family House, Apartment & Shared Rooms.", "Capacidad máxima de 81 personas y 18 baños internos (7 camas matrimoniales + 75 individuales) entre suites, hab. panorámica, casa familiar, depto. y hab. compartidas.")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down" delay={250} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <Car className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">
                  {tr("80–100 Parking Spots & 20 Ext. Baths", "80–100 Parqueaderos & 20 Baños Ext.")}
                </h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  {tr("80 to 100 gated parking spaces in Quito–Píntag with coach bus access, plus 20 external restrooms dedicated to outdoor areas.", "De 80 a 100 parqueaderos internos seguros en Quito–Píntag con maniobra cómoda para buses y vehículos, más 20 baños externos para eventos.")}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="down-right" delay={300} duration={650}>
            <div className="p-5 rounded-2xl bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/30 flex items-start gap-3.5 h-full">
              <ShieldCheck className="w-5 h-5 text-[#C8A45D] shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-sm text-white">
                  {tr("Tax Invoicing & Symmetrical Fiber", "Facturación & Internet Fibra Óptica")}
                </h4>
                <p className="text-xs text-[#FAF7F2]/75 mt-1 leading-relaxed">
                  {tr("Active tax status (RUC), electronic corporate billing, transparent milestones, and verified fiber-optic connectivity.", "RUC activo, facturación electrónica, hitos claros para departamentos de compras y conectividad Wi-Fi por fibra óptica verificada.")}
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
                {tr("Major Events & Corporate Experiences", "Macroeventos & Experiencias Corporativas")}
              </span>
              <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-[#071912] leading-[1.12]">
                {tr("Formal Proposal for Your Company", "Cotización Formal para tu Empresa")}
              </h3>
              <p className="text-xs sm:text-sm text-[#0A1F17]/75 leading-relaxed font-normal">
                {tr("Request a tailored proposal for your year-end gala, team integration retreat, or convention with giant tents on our green areas, catering, stage, and lodging.", "Solicita la propuesta para tu evento de fin de año, integración o convención con carpas gigantes según tu evento en áreas verdes, catering, tarima y hospedaje.")}
              </p>
            </ScrollReveal>

            {/* Centro: Barra de Input tipo Píldora + Botón WhatsApp 0969817891 */}
            <ScrollReveal direction="right" delay={100} duration={800} className="w-full max-w-md shrink-0">
              <form onSubmit={handleQuickQuote} className="w-full">
                <div className="bg-white rounded-full p-1.5 sm:p-2 pl-5 sm:pl-6 shadow-sm border border-[#E5DDD0] flex items-center justify-between gap-2 focus-within:ring-2 focus-within:ring-[#C8A45D]/40 transition-all">
                  <input
                    type="email"
                    required
                    placeholder={tr("Enter your corporate email...", "Ingresa tu correo corporativo...")}
                    value={quickEmail}
                    onChange={(e) => setQuickEmail(e.target.value)}
                    className="w-full bg-transparent border-none text-xs sm:text-sm text-[#071912] placeholder-[#0A1F17]/45 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full px-5 sm:px-6 py-2.5 sm:py-2.5 bg-[#11261D] hover:bg-[#071912] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 cursor-pointer transition-all duration-200 shrink-0 shadow-sm active:scale-95"
                  >
                    <span>{tr("Quote", "Cotizar")}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pl-3 pr-2 mt-2">
                  <a
                    href={buildContextualWhatsAppUrl('corporativo', {
                      customText: tr("Hello Hacienda Le Plus, I would like to request a corporate proposal for a major event, retreat or convention.", "Hola Hacienda Le Plus, deseo solicitar una cotización para un gran evento / experiencia corporativa (fin de año, integración o convención)."),
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#123326] hover:text-[#25D366] transition-colors"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>{tr("Quote via WhatsApp: +593 96 981 7891", "Cotizar por WhatsApp: 0969817891")}</span>
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
                  {tr("Technical & Logistics Planning", "Planificación Técnica y Logística")}
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-semibold text-[#071912] mt-1">
                  {tr("Technical Capacity Matrix by Space & Layout", "Matriz Técnica de Aforos por Espacio y Montaje")}
                </h3>
                <p className="text-xs sm:text-sm text-[#0A1F17]/70 mt-1">
                  {tr("Comfortable capacities calculated to ensure ventilation, smooth circulation flow, and optimal visibility.", "Capacidades cómodas calculadas para garantizar ventilación, flujo de circulación y visibilidad óptima.")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAforosModal(false)}
                className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#071912] hover:text-white flex items-center justify-center text-[#071912] transition-colors cursor-pointer shrink-0"
                aria-label={tr("Close modal", "Cerrar modal")}
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
                        {tr(space.title_en, space.title_es)}
                      </td>
                      <td className="py-3.5 px-4 text-[#A6823C] font-semibold">{space.capacities.auditorium}</td>
                      <td className="py-3.5 px-4">{space.capacities.banquet}</td>
                      <td className="py-3.5 px-4">{space.capacities.school}</td>
                      <td className="py-3.5 px-4">{space.capacities.uShape}</td>
                      <td className="py-3.5 px-4 text-[#0A1F17]/75">
                        {tr(space.notes_en, space.notes_es)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Desglose Auditado de Áreas Externas, Deportes, Servicios Pago Extra y Nota de Hidromasajes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#0A1F17]/10 space-y-2">
                <h4 className="font-bold text-[#071912] uppercase tracking-wider text-[11px]">
                  {tr("Green Areas (w/ Tents) & Wellness Facilities", "Áreas Verdes c/ Carpas & Zona Húmeda")}
                </h4>
                <ul className="space-y-1 text-[#0A1F17]/80">
                  <li>• <strong>{tr("Green Areas & Tents:", "Áreas Verdes & Carpas:")}</strong> {tr("13,000 m² green areas where we mount giant tents sized to your event (up to 1,000 pax) · 20 ext. restrooms · 80–100 parking.", "13.000 m² de áreas verdes donde montamos carpas gigantes según el evento (hasta 1.000 pax) · 20 baños ext. · 80–100 parqueos.")}</li>
                  <li>• <strong>{tr("Swimming Pool:", "Piscina:")}</strong> {tr("14×6 m = 84 m² · capacity 70 guests.", "14×6 m = 84 m² · capacidad 70 personas.")}</li>
                  <li>• <strong>{tr("Wellness Spa:", "Zona Spa:")}</strong> {tr("1 sauna, steam room & jacuzzi (capacity 6–8 guests).", "1 sauna, turco y jacuzzi (capacidad 6 a 8 personas).")}</li>
                  <li>• <strong>{tr("Hot Tubs (×2):", "Hidromasajes (×2):")}</strong> {tr("Two 2×2 m units (8–10 guests each).", "2 unidades de 2×2 m (capacidad 8 a 10 personas c/u).")}</li>
                </ul>
                <div className="bg-amber-100/90 border border-amber-400 text-amber-950 rounded-xl px-3 py-2 text-[11px] font-semibold">
                  {tr("Note: Hot tubs are heated exclusively for large groups and at an extra fee.", "Nota: Los hidromasajes se encienden únicamente en grupos grandes y con costo adicional.")}
                </div>
              </div>

              <div className="bg-[#FAF7F2] rounded-2xl p-4 border border-[#0A1F17]/10 space-y-2">
                <h4 className="font-bold text-[#071912] uppercase tracking-wider text-[11px]">
                  {tr("Sports Courts & Additional Paid Services", "Áreas Deportivas & Servicios con Pago Extra")}
                </h4>
                <ul className="space-y-1 text-[#0A1F17]/80">
                  <li>• <strong>{tr("Outdoor Sports:", "Canchas Deportivas:")}</strong> {tr("7 vs 7 grass soccer field, pro basketball court & regulation grass volleyball.", "Cancha de fútbol en césped 7 vs 7, básquet profesional y vóley en césped reglamentaria.")}</li>
                  <li>• <strong>{tr("Games Lounge:", "Juegos:")}</strong> {tr("Table tennis (ping pong) table & billiards table.", "Mesa de ping pong y mesa de billar.")}</li>
                  <li>• <strong>{tr("Extra-Fee Services:", "Con pago extra adicional:")}</strong> {tr("Karaoke, Nightclub (50 guests capacity), and Social Hall for events & coaching.", "Karaoke, Discoteca para 50 personas y Salón social para eventos y coaching.")}</li>
                  <li>• <strong>{tr("On-Site Lodging:", "Hospedaje:")}</strong> {tr("Max 81 PAX · 18 internal baths · 7 double + 75 single beds.", "Máx. 81 PAX · 18 baños internos · 7 matrimoniales + 75 individuales.")}</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-[#0A1F17]/60 flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#A6823C]" />
                {tr("Audited capacities complying with event standards and optimal flow", "Aforos auditados según normativa de eventos y bioseguridad")}
              </span>
              <button
                type="button"
                onClick={() => {
                  setShowAforosModal(false);
                  openQuoteModal({
                    serviceType: 'corporativo',
                    itemName:
                      selectedSpaceIndex !== null && RESORT_SPACES[selectedSpaceIndex]
                        ? tr(RESORT_SPACES[selectedSpaceIndex].title_en, RESORT_SPACES[selectedSpaceIndex].title_es)
                        : tr('Spaces & Capacities Proposal', 'Propuesta de Espacios y Aforos'),
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
