import React, { useState } from 'react';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ScrollReveal } from '../ScrollReveal';
import { ExpansionGalleryImage } from '../../data/expansionProjects';

interface ExpansionDomeMobileFeatureProps {
  gallery: ExpansionGalleryImage[];
  onOpenLightbox: (index: number) => void;
  onReserve: () => void;
}

export const ExpansionDomeMobileFeature: React.FC<ExpansionDomeMobileFeatureProps> = ({
  gallery,
  onOpenLightbox,
  onReserve,
}) => {
  const { tr } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);

  const currentImg = gallery[activeSlide] || gallery[0];

  const getShortMobileCaption = (item: ExpansionGalleryImage): string => {
    switch (item.id) {
      case 'dome-complex':
        return tr(
          '20m × 10m dome: Bar, Kitchen, Storage & Baths',
          'Domo 20m × 10m: Bar, Cocina, Bodegas y Baños'
        );
      case 'dome-entrance':
        return tr(
          'Glass arrival portal for 200–250 guests',
          'Pórtico acristalado para 200 a 250 invitados'
        );
      case 'dome-interior':
        return tr(
          '10m dome hall for banquets up to 250 pax',
          'Cúpula de 10m para banquetes de hasta 250 pax'
        );
      default:
        return item.caption;
    }
  };

  return (
    <div className="w-full flex flex-col border-b border-white/10">
      {/* INTRO HEADER DIRECTLY BELOW SECTION TITLE (~3-LINE SUMMARY ABOVE PHOTO) */}
      <div className="px-5 pt-3 pb-5 bg-[#06150F]">
        <ScrollReveal once direction="up" delay={40} distance={24}>
          <span className="block text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E5C98B]">
            {tr('01 · MACRO-EVENTS, WEDDINGS & GALAS', '01 · MACROEVENTOS, BODAS Y CONVENCIONES')}
          </span>
          <h3 className="font-serif-luxury text-[28px] sm:text-3xl font-semibold text-white leading-[1.08] mt-1">
            {tr('Geodesic Event Dome', 'Gran Domo Geodésico de Eventos')}
          </h3>
          <p className="text-[13px] text-[#FAF7F2]/85 leading-relaxed mt-2">
            {tr(
              'Under construction for advance booking: 20m × 10m dome for 200–250 guests integrating Bar, Kitchen, Storage, and Restrooms in one area.',
              'Ya en construcción y en preventa: domo de 20m × 10m para 200 a 250 invitados, integrando Bar, Cocina, Bodegas y Baños en una sola área.'
            )}
          </p>
        </ScrollReveal>
      </div>

      {/* UNOBSTRUCTED PHOTO CAROUSEL + CAPTION BAR + RESERVE CTA */}
      <div className="flex flex-col bg-[#040D09]">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-clip group">
          {gallery.map((item, idx) => (
            <img
              key={item.id}
              src={item.src}
              alt={item.alt}
              loading={idx === 0 ? 'eager' : 'lazy'}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
                idx === activeSlide
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-105 pointer-events-none'
              }`}
            />
          ))}

          {/* Subtle top/bottom gradient only for corner badges */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040D09]/55 via-transparent to-[#040D09]/35"
            aria-hidden="true"
          />

          {/* Top-Left Minimal Status Badge */}
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 flex flex-wrap items-center gap-2 pr-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06150F]/85 backdrop-blur-md border border-[#E5C98B]/40 text-[#E5C98B] text-[10px] font-extrabold uppercase tracking-[0.14em]">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>{tr('Under Construction', 'En Construcción')}</span>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#06150F]/75 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
              Ø 20 m × 10 m
            </span>
          </div>

          {/* Left / Right Carousel Arrows */}
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev - 1 + gallery.length) % gallery.length)}
            aria-label={tr('Previous dome view', 'Vista anterior del domo')}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#06150F]/75 hover:bg-[#E5C98B] text-white hover:text-[#06150F] border border-white/20 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev + 1) % gallery.length)}
            aria-label={tr('Next dome view', 'Siguiente vista del domo')}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#06150F]/75 hover:bg-[#E5C98B] text-white hover:text-[#06150F] border border-white/20 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom-Right Expand Button */}
          <button
            type="button"
            onClick={() => onOpenLightbox(activeSlide)}
            aria-label={tr('Expand dome view', 'Ampliar fotografía del domo')}
            className="absolute bottom-3 right-3 z-10 w-11 h-11 rounded-full bg-[#06150F]/85 hover:bg-[#E5C98B] text-white hover:text-[#06150F] border border-white/25 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Clean Photo Caption Strip Below Photo + Quick Reserve CTA */}
        <div className="px-4 py-3 bg-[#05120D] border-t border-white/10 flex items-center justify-between gap-3">
          <p className="text-xs text-[#FAF7F2]/85 leading-relaxed">
            {getShortMobileCaption(currentImg)}
          </p>
          <button
            type="button"
            onClick={onReserve}
            className="shrink-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#E5C98B] via-[#C8A45D] to-[#DFB96E] hover:brightness-110 text-[#06150F] text-[11px] font-extrabold shadow-md shadow-[#C8A45D]/20 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{tr('Reserve', 'Reservar')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
