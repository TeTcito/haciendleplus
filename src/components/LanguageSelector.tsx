import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

interface LanguageSelectorProps {
  variant?: 'navbar' | 'compact' | 'footer' | 'mobile-drawer';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { language, setLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const activeLangInfo = availableLanguages.find((l) => l.code === language) || availableLanguages[0];

  const handleSelect = (code: SupportedLanguage, enabled: boolean) => {
    if (!enabled) return;
    setLanguage(code);
    setIsOpen(false);
  };

  // Direct toggle between ES & EN
  const toggleQuick = () => {
    setLanguage(language === 'es' ? 'en' : 'es');
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center rounded-full border border-[#C8A45D]/40 bg-[#071912]/80 backdrop-blur-md p-1 shadow-sm ${className}`}>
        <button
          type="button"
          onClick={() => setLanguage('es')}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === 'es'
              ? 'bg-[#C8A45D] text-[#06150F] shadow-xs'
              : 'text-[#FAF7F2]/75 hover:text-white'
          }`}
          title="Cambiar a Español"
        >
          ES
        </button>
        <span className="text-white/20 text-xs px-0.5">·</span>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-[#C8A45D] text-[#06150F] shadow-xs'
              : 'text-[#FAF7F2]/75 hover:text-white'
          }`}
          title="Switch to English"
        >
          EN
        </button>
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
          <span className="text-[11px] text-white/50">Español · English</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {availableLanguages
            .filter((l) => l.enabled)
            .map((langItem) => {
              const active = language === langItem.code;
              return (
                <button
                  key={langItem.code}
                  type="button"
                  onClick={() => setLanguage(langItem.code)}
                  className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#C8A45D] text-[#06150F] shadow-sm'
                      : 'bg-white/5 text-[#FAF7F2]/80 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span className="text-base">{langItem.flag}</span>
                  <span>{langItem.name}</span>
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
      {/* Interactive Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={`${t.nav.langSelect}: ${activeLangInfo.name}`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-[#FAF7F2] border border-[#C8A45D]/30 hover:border-[#C8A45D]/60 transition-all cursor-pointer focus:outline-none"
      >
        <Globe className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
        <span className="tracking-wide">
          {activeLangInfo.code === 'es' ? 'Español' : 'English'}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-[#C8A45D]/80 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={t.nav.langSelect}
          className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#071912] border border-[#C8A45D]/40 shadow-2xl p-1.5 z-50 animate-fadeIn text-xs"
        >
          <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#C8A45D]/80 border-b border-white/10 mb-1">
            Español · English
          </div>

          {availableLanguages.map((langItem) => {
            const isSelected = language === langItem.code;
            const isEnabled = langItem.enabled;

            return (
              <button
                key={langItem.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                disabled={!isEnabled}
                onClick={() => handleSelect(langItem.code, isEnabled)}
                className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#C8A45D]/20 text-[#E2C585] font-bold'
                    : isEnabled
                    ? 'text-[#FAF7F2]/90 hover:bg-white/5 hover:text-white'
                    : 'text-white/35 cursor-not-allowed hover:bg-transparent'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{langItem.flag}</span>
                  <span>{langItem.name}</span>
                </div>

                {isSelected ? (
                  <Check className="w-3.5 h-3.5 text-[#C8A45D]" />
                ) : !isEnabled ? (
                  <span className="text-[9px] uppercase tracking-wider text-white/30 px-1 py-0.5 rounded bg-white/5">
                    {t.nav.comingSoon}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
