import React, { useMemo, useState } from 'react';
import { ArrowRight, Calendar, Compass, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import { getCabinGalleryImage, getDomeGalleryImages } from '../data/expansionProjects';
import { ExpansionDomeFeature } from './ExpansionDomeFeature';
import { ExpansionCabinsFeature } from './ExpansionCabinsFeature';
import { ExpansionLightboxModal } from './ExpansionLightboxModal';

export const NewExpansionSection: React.FC = () => {
  const { openQuoteModal } = useCMS();
  const { language, tr } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const domeGallery = useMemo(() => getDomeGalleryImages(language), [language]);
  const cabinImage = useMemo(() => getCabinGalleryImage(language), [language]);
  const allImages = useMemo(() => [...domeGallery, cabinImage], [domeGallery, cabinImage]);

  const handleOpenAdvanceReservation = (
    serviceType: 'corporativo' | 'hospedaje',
    itemName: string
  ) => {
    openQuoteModal({
      serviceType,
      itemName,
    });
  };

  return (
    <section
      id="nuevas-construcciones"
      aria-labelledby="heading-nuevas-construcciones"
      className="w-full relative overflow-hidden bg-[#06150F] text-[#FAF7F2] border-b border-[#C8A45D]/25"
    >
      {/* Subtle ambient radial lighting matching Hacienda Le Plus palette */}
      <div
        className="pointer-events-none absolute top-28 right-0 w-[520px] h-[520px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(200,164,93,0.35) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* =====================================================================
          BAND 1: CENTERED ARCHITECTURAL TITLE DIVIDER BETWEEN SECTIONS
          Upper half blends seamlessly with Section 3 (#F4EFE6), lower half
          transitions into #06150F, with ONLY the centered title & gold design.
      ====================================================================== */}
      <div className="relative w-full py-5 sm:py-7 px-3 sm:px-8 lg:px-14 xl:px-20">
        {/* Dual-tone split seam background + fine bronze-gold horizon hairline */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-[#F4EFE6]" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-[#06150F]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-[#A6823C]/5 via-[#A6823C]/20 to-[#A6823C]/5"
          aria-hidden="true"
        />

        <ScrollReveal once direction="zoom-in" delay={30} scale={0.96} className="relative z-10 w-full">
          <div className="flex items-center justify-center gap-2 sm:gap-5 w-full">
            {/* Left Ornamental Divider Design */}
            <div className="flex-1 flex items-center justify-end gap-1.5 sm:gap-3 min-w-[28px]" aria-hidden="true">
              <div className="flex-1 flex flex-col gap-[3px]">
                <span className="hidden sm:block w-3/4 ml-auto h-[1px] bg-gradient-to-r from-transparent to-[#9E782F]/80" />
                <span className="block w-full h-[1.5px] bg-gradient-to-r from-[#9E782F]/20 via-[#A6823C] to-[#E5C98B]" />
                <span className="hidden sm:block w-3/4 ml-auto h-[1px] bg-gradient-to-r from-transparent to-[#E5C98B]/70" />
              </div>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#06150F] border border-[#C8A45D] shrink-0" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              >
                <rect x="12" y="2" width="14.14" height="14.14" transform="rotate(45 12 2)" fill="#06150F" stroke="#C8A45D" strokeWidth="1.6" />
                <rect x="12" y="7.5" width="6.36" height="6.36" transform="rotate(45 12 7.5)" fill="#E5C98B" />
              </svg>
            </div>

            {/* Centered Standalone Title Plaque */}
            <div className="shrink-0 max-w-[74%] sm:max-w-[76%] lg:max-w-none bg-[#06150F] border border-[#C8A45D]/80 ring-1 ring-[#E5C98B]/20 ring-inset rounded-2xl sm:rounded-full px-4 sm:px-9 py-2 sm:py-3 shadow-[0_8px_20px_-6px_rgba(6,21,15,0.32)]">
              <h2
                id="heading-nuevas-construcciones"
                className="font-serif-luxury text-[15px] sm:text-3xl lg:text-[34px] font-semibold text-white text-center leading-snug sm:leading-tight tracking-tight"
              >
                {tr('New Constructions: ', 'Nuevas Construcciones: ')}{' '}
                <em className="italic text-[#E5C98B] font-normal">
                  {tr('Geodesic Dome & Two-Story Cabins', 'Gran Domo & Cabañas de Dos Pisos')}
                </em>
              </h2>
            </div>

            {/* Right Ornamental Divider Design */}
            <div className="flex-1 flex items-center justify-start gap-1.5 sm:gap-3 min-w-[28px]" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-4 h-4 sm:w-5 sm:h-5 shrink-0"
              >
                <rect x="12" y="2" width="14.14" height="14.14" transform="rotate(45 12 2)" fill="#06150F" stroke="#C8A45D" strokeWidth="1.6" />
                <rect x="12" y="7.5" width="6.36" height="6.36" transform="rotate(45 12 7.5)" fill="#E5C98B" />
              </svg>
              <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#06150F] border border-[#C8A45D] shrink-0" />
              <div className="flex-1 flex flex-col gap-[3px]">
                <span className="hidden sm:block w-3/4 mr-auto h-[1px] bg-gradient-to-l from-transparent to-[#9E782F]/80" />
                <span className="block w-full h-[1.5px] bg-gradient-to-l from-[#9E782F]/20 via-[#A6823C] to-[#E5C98B]" />
                <span className="hidden sm:block w-3/4 mr-auto h-[1px] bg-gradient-to-l from-transparent to-[#E5C98B]/70" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* =====================================================================
          BAND 2: PROJECT 1 — GRAN DOMO GEODÉSICO (20m × 10m · 200-250 PAX)
      ====================================================================== */}
      <ExpansionDomeFeature
        gallery={domeGallery}
        onOpenLightbox={(idx) => setLightboxIndex(idx)}
        onReserve={() =>
          handleOpenAdvanceReservation(
            'corporativo',
            tr(
              'Advance Booking: 20m x 10m Event Dome (200-250 guests)',
              'Reserva Anticipada: Domo de Eventos 20m x 10m (200-250 invitados)'
            )
          )
        }
      />

      {/* =====================================================================
          BAND 3: PROJECT 2 — 4 CABAÑAS DE DOS PISOS CON DOMO Y JACUZZI
      ====================================================================== */}
      <ExpansionCabinsFeature
        image={cabinImage}
        onOpenLightbox={() => setLightboxIndex(domeGallery.length)}
        onReserve={() =>
          handleOpenAdvanceReservation(
            'hospedaje',
            tr(
              'Advance Booking: 4 Two-Story Dome Cabins with Jacuzzi (16-32 pax)',
              'Reserva Anticipada: 4 Cabañas Domo 2 Pisos con Jacuzzi (16-32 usuarios)'
            )
          )
        }
      />

      {/* =====================================================================
          BAND 4: FULL-WIDTH ADVANCE RESERVATION BANNER
      ====================================================================== */}
      <div className="w-full relative z-10 px-5 sm:px-8 lg:px-14 xl:px-20 py-7 sm:py-8 bg-gradient-to-r from-[#0A2218] via-[#0F2F22] to-[#0A2218] border-t border-[#C8A45D]/25">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#C8A45D]/15 border border-[#C8A45D]/40 text-[#E5C98B] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5C98B]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{tr('PRIORITY ACCESS TO NEW FACILITIES', 'ACCESO PRIORITARIO A NUEVAS INSTALACIONES')}</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-white mt-0.5">
                {tr(
                  'Lock in your wedding, corporate gala, or group stay date ahead of launch.',
                  'Asegura desde hoy tu fecha para eventos de 250 personas o estadías en nuestras nuevas cabañas domo.'
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() =>
                handleOpenAdvanceReservation(
                  'corporativo',
                  tr(
                    'Advance Reservation: New Dome (250 pax) + Two-Story Cabins',
                    'Reserva Anticipada: Nuevo Domo (250 pax) + Cabañas 2 Pisos'
                  )
                )
              }
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#E5C98B] hover:bg-[#C8A45D] text-[#06150F] text-xs sm:text-sm font-extrabold shadow-lg transition-all cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              <span>{tr('Book in Advance Now', 'Reservar con Antelación')}</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          FULL-SCREEN ARCHITECTURAL PHOTO LIGHTBOX MODAL
      ====================================================================== */}
      <ExpansionLightboxModal
        images={allImages}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onSelectIndex={(nextIdx) => setLightboxIndex(nextIdx)}
        onReserveClick={() => {
          const isCabin = lightboxIndex === domeGallery.length;
          handleOpenAdvanceReservation(
            isCabin ? 'hospedaje' : 'corporativo',
            isCabin
              ? tr(
                  'Advance Booking: 4 Two-Story Dome Cabins with Jacuzzi (16-32 pax)',
                  'Reserva Anticipada: 4 Cabañas Domo 2 Pisos con Jacuzzi (16-32 usuarios)'
                )
              : tr(
                  'Advance Booking: 20m x 10m Event Dome (200-250 guests)',
                  'Reserva Anticipada: Domo de Eventos 20m x 10m (200-250 invitados)'
                )
          );
        }}
      />
    </section>
  );
};
