import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { SupportedLanguage, LanguageInfo, AVAILABLE_LANGUAGES, Translations } from '../i18n/types';
import { translationsMap, esTranslations } from '../i18n/translations';
import { tr as trHelper, ensureLanguageDictionary } from '../i18n/phraseDictionary';

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

const readLangFromUrl = (): SupportedLanguage | null => {
  if (typeof window === 'undefined') return null;
  try {
    const param = new URLSearchParams(window.location.search).get('lang')?.toLowerCase();
    if (param && VALID_LANGS.includes(param as SupportedLanguage)) {
      return param as SupportedLanguage;
    }
  } catch {
    // ignore URL parsing error
  }
  return null;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    // 1. Prioridad máxima: parámetro ?lang= en URL (indispensable para Googlebot hreflang y enlaces compartidos)
    const urlLang = readLangFromUrl();
    if (urlLang) {
      return urlLang;
    }
    // 2. Preferencia guardada del usuario en localStorage
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
      // Sincroniza ?lang= en la URL para mantener coherencia canonical/hreflang
      if (typeof window !== 'undefined') {
        try {
          const url = new URL(window.location.href);
          if (lang === 'es') {
            url.searchParams.delete('lang');
          } else {
            url.searchParams.set('lang', lang);
          }
          const nextSearch = url.searchParams.toString();
          const nextUrl = `${url.pathname}${nextSearch ? `?${nextSearch}` : ''}${url.hash}`;
          window.history.replaceState(window.history.state, '', nextUrl);
        } catch {
          // ignore history error
        }
      }
    }
  };

  // Mantener sincronizado el idioma al navegar atrás/adelante en el historial
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePopState = () => {
      const urlLang = readLangFromUrl();
      setLanguageState(urlLang || 'es');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [dictVersion, setDictVersion] = useState(0);

  // Sync <html lang="es"|"en"|"pt"|"fr"|"de"|"zh"> and lazily load pt/fr/de/zh dictionary on demand
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
    let cancelled = false;
    if (language !== 'es' && language !== 'en') {
      ensureLanguageDictionary(language).then((loaded) => {
        if (!cancelled && loaded) {
          setDictVersion((v) => v + 1);
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, [language]);

  const currentTranslations = useMemo(() => {
    return translationsMap[language] || translationsMap.es || esTranslations;
  }, [language]);

  const tr = useCallback(
    (enText: string, esText: string) => {
      void dictVersion;
      return trHelper(enText, esText, language);
    },
    [language, dictVersion]
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
    [language, currentTranslations, tr, dictVersion]
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
