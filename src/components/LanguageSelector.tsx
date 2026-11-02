import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../i18n/types';
import { FlagIcon } from './FlagIcon';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'compact' | 'footer' | 'mobile-drawer' | 'mobile-top-tag';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or touch
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick, { passive: true });
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const activeLangInfo = availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  const handleSelect = (code: SupportedLanguage) => {
    setLanguage(code);
    setIsOpen(false);
  };

  if (variant === 'mobile-top-tag') {
    return (
      <div ref={containerRef} className={`relative select-none ${className}`}>
        {/* Etiqueta / Badge de la Bandera activa */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={`${t.nav.langSelect}: ${activeLangInfo.name}`}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#071912]/92 hover:bg-[#071912] text-[#FAF7F2] border border-[#C8A45D]/65 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.5)] transition-all duration-200 active:scale-95 cursor-pointer"
        >
          <FlagIcon code={activeLangInfo.code} className="w-4 h-3 rounded-[2px] shadow-xs shrink-0" />
          <span className="text-[11px] font-bold tracking-wider uppercase text-[#FAF7F2]">
            {activeLangInfo.shortLabel}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-[#E2C585] transition-transform duration-250 ease-out ${
              isOpen ? 'rotate-180 text-[#C8A45D]' : ''
            }`}
          />
        </button>

        {/* Menú desplegable hacia abajo con efecto y animación táctil fluida */}
        {isOpen && (
          <div
            role="listbox"
            aria-label={t.nav.langSelect}
            className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-[#071912]/95 backdrop-blur-xl border border-[#C8A45D]/50 shadow-[0_14px_40px_rgba(0,0,0,0.7)] p-1.5 z-50 animate-in fade-in slide-in-from-top-2 zoom-in-95 duration-200 origin-top-right text-xs"
          >
            <div className="flex items-center justify-between px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C8A45D] border-b border-white/10 mb-1">
              <span>{t.nav.langSelect}</span>
              <span className="text-[9px] text-[#C8A45D]/75">6 {language === 'zh' ? '种语言' : 'Idiomas'}</span>
            </div>

            <div className="space-y-0.5">
              {availableLanguages.map((langItem) => {
                const isSelected = language === langItem.code;
                return (
                  <button
                    key={langItem.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(langItem.code)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#C8A45D]/25 text-[#E2C585] font-bold'
                        : 'text-[#FAF7F2]/90 hover:bg-white/10 active:bg-white/20 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FlagIcon code={langItem.code} className="w-4 h-3 rounded-[2px] shadow-xs shrink-0" />
                      <span className="truncate">{langItem.name}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center flex-wrap gap-1 rounded-full border border-[#C8A45D]/40 bg-[#071912]/85 backdrop-blur-md p-1 shadow-sm ${className}`}>
        {availableLanguages.map((langItem) => {
          const isActive = language === langItem.code;
          return (
            <button
              key={langItem.code}
              type="button"
              onClick={() => handleSelect(langItem.code)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#C8A45D] text-[#06150F] shadow-xs'
                  : 'text-[#FAF7F2]/75 hover:text-white hover:bg-white/5'
              }`}
              title={langItem.name}
            >
              <FlagIcon code={langItem.code} className="w-3.5 h-2.5 rounded-[1px] shadow-xs" />
              <span>{langItem.shortLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'mobile-drawer') {
    return (
      <div className={`space-y-2 pt-2 border-t border-white/10 ${className}`}>
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#C8A45D] flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>{t.nav.langSelect}</span>
          </span>
          <span className="text-[11px] text-white/50">{activeLangInfo.name}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
          {availableLanguages.map((langItem) => {
            const active = language === langItem.code;
            return (
              <button
                key={langItem.code}
                type="button"
                onClick={() => handleSelect(langItem.code)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#C8A45D] text-[#06150F] shadow-sm'
                    : 'bg-white/5 text-[#FAF7F2]/85 hover:bg-white/10 border border-white/10'
                }`}
              >
                <FlagIcon code={langItem.code} className="w-4 h-3 rounded-[2px] shadow-xs" />
                <span className="truncate">{langItem.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Default 'navbar' dropdown variant
  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Interactive Trigger Button with Flag & Native Name */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${t.nav.langSelect}: ${activeLangInfo.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#FAF7F2] border border-[#C8A45D]/30 hover:border-[#C8A45D]/60 transition-all cursor-pointer focus:outline-none shadow-xs"
      >
        <FlagIcon code={activeLangInfo.code} className="w-4 h-3 rounded-[2px] shadow-xs" />
        <span className="tracking-wide">{activeLangInfo.name}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#C8A45D]/80 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu featuring all 6 Official Languages with Flags */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={t.nav.langSelect}
          className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#071912] border border-[#C8A45D]/40 shadow-2xl p-1.5 z-50 animate-fadeIn text-xs"
        >
          <div className="flex items-center justify-between px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C8A45D]/80 border-b border-white/10 mb-1">
            <span>{t.nav.langSelect}</span>
            <span className="text-[9px] text-[#C8A45D]/60">6 {language === 'zh' ? '种语言' : 'Idiomas'}</span>
          </div>

          <div className="space-y-0.5">
            {availableLanguages.map((langItem) => {
              const isSelected = language === langItem.code;

              return (
                <button
                  key={langItem.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(langItem.code)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#C8A45D]/20 text-[#E2C585] font-bold'
                      : 'text-[#FAF7F2]/90 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FlagIcon code={langItem.code} className="w-4 h-3 rounded-[2px] shadow-xs" />
                    <span className="truncate">{langItem.name}</span>
                  </div>

                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
