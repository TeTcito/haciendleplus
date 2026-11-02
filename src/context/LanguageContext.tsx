import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { SupportedLanguage, LanguageInfo, AVAILABLE_LANGUAGES, Translations } from '../i18n/types';
import { translationsMap, esTranslations } from '../i18n/translations';
import { tr as trHelper } from '../i18n/phraseDictionary';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  tr: (enText: string, esText: string) => string;
  availableLanguages: LanguageInfo[];
  isEn: boolean;
  isEs: boolean;
  isPt: boolean;
  isFr: boolean;
  isDe: boolean;
  isZh: boolean;
}

const STORAGE_KEY = 'leplus_lang';
const VALID_LANGS: SupportedLanguage[] = ['es', 'en', 'pt', 'fr', 'de', 'zh'];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && VALID_LANGS.includes(saved as SupportedLanguage)) {
        return saved as SupportedLanguage;
      }
    } catch {
      // ignore storage access error
    }
    return 'es';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    if (VALID_LANGS.includes(lang)) {
      setLanguageState(lang);
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        // ignore storage error
      }
    }
  };

  // Sync <html lang="es"|"en"|"pt"|"fr"|"de"|"zh"> dynamically whenever language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const currentTranslations = useMemo(() => {
    return translationsMap[language] || translationsMap.es || esTranslations;
  }, [language]);

  const tr = useCallback(
    (enText: string, esText: string) => {
      return trHelper(enText, esText, language);
    },
    [language]
  );

  const contextValue = useMemo<LanguageContextType>(
    () => ({
      language,
      setLanguage,
      t: currentTranslations,
      tr,
      availableLanguages: AVAILABLE_LANGUAGES,
      isEn: language === 'en',
      isEs: language === 'es',
      isPt: language === 'pt',
      isFr: language === 'fr',
      isDe: language === 'de',
      isZh: language === 'zh',
    }),
    [language, currentTranslations, tr]
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
