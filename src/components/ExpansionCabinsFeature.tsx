import React from 'react';
import {
  ArrowRight,
  BedDouble,
  Calendar,
  Maximize2,
  Sparkles,
  Users,
  Waves,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { ScrollReveal } from './ScrollReveal';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildContextualWhatsAppUrl } from '../utils/whatsapp';
import { ExpansionGalleryImage, getCabinSpecs } from '../data/expansionProjects';

interface ExpansionCabinsFeatureProps {
  image: ExpansionGalleryImage;
  onOpenLightbox: () => void;
  onReserve: () => void;
}

export const ExpansionCabinsFeature: React.FC<ExpansionCabinsFeatureProps> = ({
  image,
  onOpenLightbox,
  onReserve,
}) => {
  const { language, tr } = useLanguage();
  const { siteConfig } = useCMS();

  const specs = getCabinSpecs(language);

  const whatsappUrl = buildContextualWhatsAppUrl({
    phone: siteConfig.whatsappNumber,
    context: 'hospedaje',
    customText: tr(
      'Hello Hacienda Le Plus, I would like to reserve in advance the new 4 Two-Story Dome Cabins with couple jacuzzi (16 to 32 additional guests).',
      'Hola Hacienda Le Plus, deseo información para reservar con antelación las nuevas 4 Cabañas Domo de Dos Pisos con jacuzzi de pareja (16 a 32 usuarios).'
    ),
  });

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0">
      {/* RIGHT ON DESKTOP (7 COLS), TOP ON MOBILE: UNOBSTRUCTED CABINS PHOTO */}
      <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col bg-[#040D09]">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:flex-1 lg:min-h-[460px] overflow-hidden group">
          <img
            src={image.src}
            alt={image.alt}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
          />

          {/* Subtle gradient only around corner controls */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040D09]/55 via-transparent to-[#040D09]/35"
            aria-hidden="true"
          />

          {/* Top-Left Minimal Badges */}
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 flex flex-wrap items-center gap-2 pr-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06150F]/85 backdrop-blur-md border border-[#E5C98B]/40 text-[#E5C98B] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em]">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>{tr('4 Two-Story Units', '4 Cabañas · 2 Pisos')}</span>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#06150F]/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-bold">
              {tr('+16 to 32 Guests', '+16 a 32 Usuarios')}
            </span>
          </div>

          {/* Bottom-Right Lightbox Trigger */}
          <button
            type="button"
            onClick={onOpenLightbox}
            aria-label={tr('Expand cabins view', 'Ampliar fotografía de cabañas')}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 w-11 h-11 rounded-full bg-[#06150F]/85 hover:bg-[#E5C98B] text-white hover:text-[#06150F] border border-white/25 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Architectural Caption Strip Below Photo */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#05120D] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <p className="text-xs sm:text-[13px] text-[#FAF7F2]/85 leading-relaxed">
            {image.caption}
          </p>
        </div>
      </div>

      {/* LEFT ON DESKTOP (5 COLS), BOTTOM ON MOBILE: SPECS & ADVANCE BOOKING */}
      <div className="order-2 lg:order-1 lg:col-span-5 bg-[#06150F] lg:border-r border-white/10 px-5 sm:px-8 lg:px-10 xl:px-12 py-8 lg:py-11 flex flex-col justify-between gap-6">
        <div className="space-y-5">
          <ScrollReveal once direction="left" delay={40} distance={40}>
            <span className="block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E5C98B]">
              {tr('02 · EXPANDED LUXURY LODGING', '02 · NUEVA ÁREA DE HOSPEDAJE EXCLUSIVO')}
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-white leading-[1.1] mt-1.5">
              {tr(
                'Two-Story Dome Cabins with Couple Jacuzzi',
                'Cabañas de Dos Pisos con Domo y Jacuzzi de Pareja'
              )}
            </h3>
          </ScrollReveal>

          <ScrollReveal once direction="left" delay={90} distance={35}>
            <p className="text-sm text-[#FAF7F2]/85 leading-relaxed">
              {tr(
                'Four newly constructed two-story cabins featuring 2 independent couple suites per cabin (8 suites total): a warm timber matrimonial room with balcony on the 1st floor, and a panoramic dome suite with private couple jacuzzi terrace on the 2nd floor.',
                'Área exclusiva de 4 cabañas de dos pisos diseñadas para el descanso premium: en el primer piso habitación matrimonial en madera con su balcón, y en el segundo piso domo matrimonial en terraza con jacuzzi de pareja.'
              )}
            </p>
          </ScrollReveal>

          {/* 3 Architectural Spec Tiles */}
          <ScrollReveal once direction="up" delay={120} distance={25}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl bg-[#0A2118] border border-[#C8A45D]/25 p-3.5 sm:p-3 flex sm:block items-center justify-between gap-3"
                >
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#E5C98B]/85">
                      {spec.label}
                    </span>
                    <span className="block font-serif-luxury text-xl font-bold text-white mt-0.5 leading-tight">
                      {spec.value}
                    </span>
                  </div>
                  <span className="block text-[11px] text-[#FAF7F2]/70 sm:mt-0.5 leading-snug text-right sm:text-left">
                    {spec.detail}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Two-Story Architectural Breakdown + Double Occupancy Highlight */}
          <ScrollReveal once direction="up" delay={150} distance={25}>
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3.5">
                  <div className="flex items-center gap-2 text-[#E5C98B] mb-1">
                    <BedDouble className="w-4 h-4 shrink-0" />
                    <h4 className="font-sans-ui text-xs font-extrabold uppercase tracking-wider text-white">
                      {tr('1st Floor · Timber Suite', '1er Piso · Madera & Balcón')}
                    </h4>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                    {tr(
                      'Matrimonial wooden bedroom with private balcony and convertible sofa bed.',
                      'Habitación matrimonial en madera con balcón panorámico y cama tipo sofá.'
                    )}
                  </p>
                </div>

                <div className="rounded-xl bg-white/[0.04] border border-[#C8A45D]/30 p-3.5">
                  <div className="flex items-center gap-2 text-[#E5C98B] mb-1">
                    <Waves className="w-4 h-4 shrink-0" />
                    <h4 className="font-sans-ui text-xs font-extrabold uppercase tracking-wider text-white">
                      {tr('2nd Floor · Dome & Jacuzzi', '2do Piso · Domo & Jacuzzi')}
                    </h4>
                  </div>
                  <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
                    {tr(
                      'Upper geodesic matrimonial dome opening onto a private terrace with couple jacuzzi.',
                      'Domo matrimonial en segundo piso con terraza privada y jacuzzi para pareja.'
                    )}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#0E2B20] border border-[#E5C98B]/30 px-4 py-3 flex items-start gap-3">
                <Users className="w-5 h-5 text-[#E5C98B] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-[13px] text-[#FAF7F2]/90 leading-relaxed">
                  <strong className="text-[#E5C98B]">
                    {tr('Doubled Occupancy (16 → 32 Guests): ', 'Ocupación Ampliada al Doble (16 a 32 Usuarios): ')}
                  </strong>
                  {tr(
                    'Each cabin includes 2 couple rooms equipped with sofa beds, expanding total capacity from 16 to 32 additional guests.',
                    'Son 2 habitaciones de parejas en cada cabaña equipadas con camas tipo sofá para duplicar el área de ocupación: de 16 hasta 32 usuarios más.'
                  )}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Action Buttons */}
        <ScrollReveal once direction="up" delay={180} distance={20}>
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={onReserve}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E5C98B] via-[#C8A45D] to-[#DFB96E] hover:brightness-110 text-[#06150F] text-xs sm:text-sm font-extrabold shadow-lg shadow-[#C8A45D]/15 transition-all cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{tr('Reserve Cabins in Advance', 'Reservar Cabañas con Antelación')}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-white/8 hover:bg-[#25D366] text-white hover:text-[#06150F] border border-white/20 hover:border-[#25D366] text-xs font-bold transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>{tr('WhatsApp', 'WhatsApp')}</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};
