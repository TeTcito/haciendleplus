import React from 'react';
import { X, Sparkles } from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { useLanguage } from '../context/LanguageContext';
import { DirectQuoteForm } from './DirectQuoteForm';

export const QuickQuoteModal: React.FC = () => {
  const { isQuoteModalOpen, quoteModalPreset, closeQuoteModal, siteConfig } = useCMS();
  const { t, isEn } = useLanguage();

  if (!isQuoteModalOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-quote-title"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#071912] border border-[#C8A45D]/40 p-6 sm:p-8 text-[#FAF7F2] shadow-2xl">
        <button
          type="button"
          onClick={closeQuoteModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-[#FAF7F2]/80 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
          aria-label={t.modals.closeAria}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6 pr-8">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#C8A45D] font-semibold mb-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.modals.quickQuoteBadge}</span>
          </div>
          <h2 id="modal-quote-title" className="font-serif-luxury text-3xl sm:text-4xl font-semibold text-white">
            {t.modals.quickQuoteTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF7F2]/75 mt-1">
            {isEn
              ? 'Direct quotes tailored to headcount and duration via WhatsApp at +593 96 981 7891 and personalized assistance.'
              : siteConfig.responseCommitment}
          </p>
        </div>

        <DirectQuoteForm
          defaultService={quoteModalPreset.serviceType || 'bodas'}
          defaultItemName={quoteModalPreset.itemName || ''}
          darkTheme={true}
          onSuccessClose={closeQuoteModal}
        />
      </div>
    </div>
  );
};
