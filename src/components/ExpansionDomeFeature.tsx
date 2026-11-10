import React, { useState } from 'react';
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCMS } from '../context/CMSContext';
import { ScrollReveal } from './ScrollReveal';
import { WhatsAppIcon } from './WhatsAppIcon';
import { buildContextualWhatsAppUrl } from '../utils/whatsapp';
import {
  ExpansionGalleryImage,
  getDomeIntegratedAreas,
  getDomeSpecs,
} from '../data/expansionProjects';

interface ExpansionDomeFeatureProps {
  gallery: ExpansionGalleryImage[];
  onOpenLightbox: (index: number) => void;
  onReserve: () => void;
}

export const ExpansionDomeFeature: React.FC<ExpansionDomeFeatureProps> = ({
  gallery,
  onOpenLightbox,
  onReserve,
}) => {
  const { language, tr } = useLanguage();
  const { siteConfig } = useCMS();
  const [activeSlide, setActiveSlide] = useState(0);

  const specs = getDomeSpecs(language);
  const integratedAreas = getDomeIntegratedAreas(language);
  const currentImg = gallery[activeSlide] || gallery[0];

  const whatsappUrl = buildContextualWhatsAppUrl({
    phone: siteConfig.whatsappNumber,
    context: 'corporativo',
    customText: tr(
      'Hello Hacienda Le Plus, I would like to request early booking information for the new 20m x 10m Geodesic Event Dome (200-250 guests) currently under construction.',
      'Hola Hacienda Le Plus, deseo información para reservar con antelación el nuevo Domo Geodésico de 20m x 10m (200 a 250 invitados) actualmente en construcción.'
    ),
  });

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-white/10">
      {/* LEFT 7 COLS: UNOBSTRUCTED PHOTO STAGE + ARCHITECTURAL CONTROL STRIP BELOW */}
      <div className="lg:col-span-7 flex flex-col bg-[#040D09]">
        {/* Clean Unobstructed Photograph */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:flex-1 lg:min-h-[430px] overflow-hidden group">
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
          <div className="absolute top-3 left-3 sm:top-5 sm:left-5 z-10 flex flex-wrap items-center gap-2 pr-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#06150F]/85 backdrop-blur-md border border-[#E5C98B]/40 text-[#E5C98B] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.14em]">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>{tr('Under Construction', 'En Construcción')}</span>
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#06150F]/75 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-[11px] font-bold">
              Ø 20 m × 10 m
            </span>
          </div>

          {/* Left / Right Carousel Arrows */}
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev - 1 + gallery.length) % gallery.length)}
            aria-label={tr('Previous dome view', 'Vista anterior del domo')}
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#06150F]/75 hover:bg-[#E5C98B] text-white hover:text-[#06150F] border border-white/20 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => (prev + 1) % gallery.length)}
            aria-label={tr('Next dome view', 'Siguiente vista del domo')}
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#06150F]/75 hover:bg-[#E5C98B] text-white hover:text-[#06150F] border border-white/20 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom-Right Expand Button (safe from mobile top-right lang switcher) */}
          <button
            type="button"
            onClick={() => onOpenLightbox(activeSlide)}
            aria-label={tr('Expand dome view', 'Ampliar fotografía del domo')}
            className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 w-11 h-11 rounded-full bg-[#06150F]/85 hover:bg-[#E5C98B] text-white hover:text-[#06150F] border border-white/25 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Dedicated Control Bar Below Photo (Never Covers Image) */}
        <div className="px-4 sm:px-6 py-4 bg-[#05120D] border-t border-white/10 space-y-3">
          <p className="text-xs sm:text-[13px] text-[#FAF7F2]/85 leading-relaxed">
            {currentImg.caption}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {gallery.map((item, idx) => {
              const isSelected = idx === activeSlide;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSlide(idx)}
                  aria-pressed={isSelected}
                  className={`inline-flex items-center gap-2 pl-1.5 pr-3.5 py-1.5 rounded-full border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#E5C98B] text-[#06150F] border-[#E5C98B] shadow-md'
                      : 'bg-white/[0.06] hover:bg-white/[0.12] text-[#FAF7F2] border-white/15'
                  }`}
                >
                  <img
                    src={item.src}
                    alt=""
                    aria-hidden="true"
                    className="w-7 h-7 rounded-full object-cover shrink-0 border border-black/25"
                  />
                  <span className="text-[11px] font-bold whitespace-nowrap">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RIGHT 5 COLS: ARCHITECTURAL SPECS & ADVANCE BOOKING PANEL */}
      <div className="lg:col-span-5 bg-[#081F16] lg:border-l border-white/10 px-5 sm:px-8 lg:px-10 xl:px-12 py-8 lg:py-11 flex flex-col justify-between gap-6">
        <div className="space-y-5">
          <ScrollReveal once direction="right" delay={40} distance={40}>
            <span className="block text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#E5C98B]">
              {tr('01 · MACRO-EVENTS, WEDDINGS & GALAS', '01 · MACROEVENTOS, BODAS Y CONVENCIONES')}
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-white leading-[1.1] mt-1.5">
              {tr('Geodesic Event Dome', 'Gran Domo Geodésico de Eventos')}
            </h3>
          </ScrollReveal>

          <ScrollReveal once direction="right" delay={90} distance={35}>
            <p className="text-sm text-[#FAF7F2]/85 leading-relaxed">
              {tr(
                'Currently under construction and open for early reservations: an iconic 20-meter diameter by 10-meter high dome engineered for 200 to 250 guests, integrating Bar, Kitchen, Storage, and Men/Women restrooms into one unified complex.',
                'Ya en construcción y abierto para promoción y reserva anticipada: un imponente domo de 20 metros de diámetro por 10 metros de altura diseñado para 200 a 250 invitados, integrando áreas de Bar, Cocina, Bodegas y Baños de Hombres y Mujeres en una sola área.'
              )}
            </p>
          </ScrollReveal>

          {/* 3 Architectural Spec Tiles */}
          <ScrollReveal once direction="up" delay={120} distance={25}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl bg-[#06150F]/90 border border-[#C8A45D]/25 p-3.5 sm:p-3 flex sm:block items-center justify-between gap-3"
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

          {/* Integrated Service Areas List */}
          <ScrollReveal once direction="up" delay={150} distance={25}>
            <ul className="space-y-2.5 pt-1">
              {integratedAreas.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#FAF7F2]/90 leading-snug">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C98B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
              <span>{tr('Reserve Dome in Advance', 'Reservar Domo con Antelación')}</span>
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
