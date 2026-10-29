import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { SupportedLanguage, LanguageInfo, AVAILABLE_LANGUAGES, Translations } from '../i18n/types';
import { translationsMap, esTranslations } from '../i18n/translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  availableLanguages: LanguageInfo[];
  isEn: boolean;
  isEs: boolean;
}

const STORAGE_KEY = 'leplus_lang';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved === 'es' || saved === 'en')) {
        return saved as SupportedLanguage;
      }
    } catch {
      // ignore storage access error
    }
    return 'es';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    // Only switch to supported enabled languages in Phase 1
    if (lang === 'es' || lang === 'en') {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // ignore storage error
      }
    }
  };

  // Sync <html lang="es"|"en"> dynamically whenever language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const currentTranslations = useMemo(() => {
    if (language === 'en') {
      return translationsMap.en;
    }
    return translationsMap.es || esTranslations;
  }, [language]);

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      t: currentTranslations,
      availableLanguages: AVAILABLE_LANGUAGES,
      isEn: language === 'en',
      isEs: language === 'es',
    }),
    [language, currentTranslations]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
