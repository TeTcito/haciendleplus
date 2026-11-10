import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { ExpansionGalleryImage } from '../data/expansionProjects';
import { useLanguage } from '../context/LanguageContext';

interface ExpansionLightboxModalProps {
  images: ExpansionGalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (nextIndex: number) => void;
  onReserveClick: () => void;
}

export const ExpansionLightboxModal: React.FC<ExpansionLightboxModalProps> = ({
  images,
  activeIndex,
  onClose,
  onSelectIndex,
  onReserveClick,
}) => {
  const { tr } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeIndex === null) return;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onSelectIndex((activeIndex + 1) % images.length);
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex((activeIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, images.length, onClose, onSelectIndex]);

  if (activeIndex === null || !images[activeIndex]) return null;

  const current = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="expansion-lightbox-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-[#071912] border border-[#C8A45D]/35 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10 bg-[#06150F]">
          <div className="min-w-0">
            <span className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#E5C98B] block">
              {tr('UNDER CONSTRUCTION · ADVANCE BOOKING', 'EN CONSTRUCCIÓN · PREVENTA')} ({activeIndex + 1}/{images.length})
            </span>
            <h4
              id="expansion-lightbox-title"
              className="font-serif-luxury text-lg sm:text-xl font-semibold text-white truncate"
            >
              {current.label}
            </h4>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label={tr('Close preview', 'Cerrar vista ampliada')}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#C8A45D] text-white hover:text-[#06150F] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Image Stage */}
        <div className="relative bg-black flex items-center justify-center max-h-[68vh] overflow-hidden">
          <img
            src={current.src}
            alt={current.alt}
            className="w-full max-h-[68vh] object-contain"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex - 1 + images.length) % images.length)}
                aria-label={tr('Previous photo', 'Foto anterior')}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#06150F]/80 hover:bg-[#C8A45D] text-white hover:text-[#06150F] border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => onSelectIndex((activeIndex + 1) % images.length)}
                aria-label={tr('Next photo', 'Siguiente foto')}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#06150F]/80 hover:bg-[#C8A45D] text-white hover:text-[#06150F] border border-white/20 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Bottom Caption & Reserve CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4 sm:px-6 py-4 bg-[#06150F] border-t border-white/10">
          <p className="text-xs sm:text-sm text-[#FAF7F2]/85 leading-relaxed">
            {current.caption}
          </p>

          <button
            type="button"
            onClick={() => {
              onClose();
              onReserveClick();
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#E5C98B] hover:bg-[#C8A45D] text-[#06150F] text-xs font-extrabold whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            <Calendar className="w-4 h-4" />
            <span>{tr('Reserve in Advance', 'Reservar con Antelación')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
