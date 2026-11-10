import React from 'react';
import {
  Calendar,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ScrollReveal';
import { ExpansionGalleryImage } from '../../data/expansionProjects';

interface ExpansionCabinsMobileFeatureProps {
  image: ExpansionGalleryImage;
  onOpenLightbox: () => void;
  onReserve: () => void;
}

export const ExpansionCabinsMobileFeature: React.FC<ExpansionCabinsMobileFeatureProps> = ({
  image,
  onOpenLightbox,
  onReserve,
}) => {
  const { tr } = useLanguage();

  return (
    <div className="w-full flex flex-col">
      {/* INTRO HEADER ABOVE PHOTO (~3-LINE SUMMARY, MATCHING SECTION 01) */}
      <div className="px-5 pt-6 pb-5 bg-[#06150F]">
        <ScrollReveal once direction="up" delay={40} distance={24}>
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5C98B]">
            {tr('02 · EXPANDED LUXURY LODGING', '02 · NUEVA ÁREA DE HOSPEDAJE EXCLUSIVO')}
          </span>
          <h3 className="font-serif-luxury text-[28px] sm:text-3xl font-semibold text-white leading-[1.08] mt-1">
            {tr(
              'Two-Story Dome Cabins with Couple Jacuzzi',
              'Cabañas de Dos Pisos con Domo y Jacuzzi de Pareja'
            )}
          </h3>
          <p className="text-[13px] text-[#FAF7F2]/85 leading-relaxed mt-2">
            {tr(
              '4 two-story cabins: wood suite & balcony downstairs, rooftop dome & couple jacuzzi upstairs, with sofa beds for 16 to 32 guests.',
              '4 cabañas de 2 pisos: suite en madera con balcón abajo, domo con jacuzzi de pareja arriba y camas tipo sofá para 16 a 32 usuarios.'
            )}
          </p>
        </ScrollReveal>
      </div>

      {/* UNOBSTRUCTED CABINS PHOTO */}
      <div className="flex flex-col bg-[#040D09]">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-clip group">
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

        {/* Clean Photo Caption Strip Below Photo + Left Reserve CTA */}
        <div className="px-4 sm:px-6 py-3.5 bg-[#05120D] border-t border-white/10 flex items-center gap-3.5">
          <button
            type="button"
            onClick={onReserve}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#E5C98B] via-[#C8A45D] to-[#DFB96E] hover:brightness-110 text-[#06150F] text-[11px] font-extrabold shadow-md shadow-[#C8A45D]/20 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{tr('Reserve', 'Reservar')}</span>
          </button>
          <p className="text-xs sm:text-[13px] text-[#FAF7F2]/85 leading-relaxed">
            {image.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
