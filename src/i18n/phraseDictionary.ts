import { SupportedLanguage } from './types';

type DictionaryMap = Record<string, string>;

const loadedDictionaries: Partial<Record<SupportedLanguage, DictionaryMap>> = {
  es: {},
  en: {},
};

const pendingLoads: Partial<Record<SupportedLanguage, Promise<boolean>>> = {};

/**
 * Dynamically loads the phrase dictionary chunk for pt / fr / de / zh on demand.
 * Spanish (es) and English (en) need 0 KB of extra dictionary data.
 */
export async function ensureLanguageDictionary(lang: SupportedLanguage): Promise<boolean> {
  if (lang === 'es' || lang === 'en') return false;
  if (loadedDictionaries[lang]) return false;

  const existing = pendingLoads[lang];
  if (existing) return existing;

  const loadPromise = (async () => {
    try {
      let mod: { default: DictionaryMap };
      switch (lang) {
        case 'pt':
          mod = await import('./dicts/pt.json');
          break;
        case 'fr':
          mod = await import('./dicts/fr.json');
          break;
        case 'de':
          mod = await import('./dicts/de.json');
          break;
        case 'zh':
          mod = await import('./dicts/zh.json');
          break;
        default:
          return false;
      }
      loadedDictionaries[lang] = mod.default || {};
      return true;
    } catch (err) {
      console.warn(`Could not load i18n dictionary for ${lang}:`, err);
      return false;
    } finally {
      delete pendingLoads[lang];
    }
  })();

  pendingLoads[lang] = loadPromise;
  return loadPromise;
}

/**
 * Universal translation helper.
 * Resolves any text according to the active language:
 * - 'es' -> returns esText
 * - 'en' -> returns enText
 * - 'pt', 'fr', 'de', 'zh' -> resolves from lazily loaded dictionary with fallback to enText
 * - boolean (true/false) -> backwards-compatible with isEn
 */
export function tr(enText: string, esText: string, langOrIsEn?: SupportedLanguage | boolean): string {
  let targetLang: SupportedLanguage = 'es';
  if (typeof langOrIsEn === 'string') {
    targetLang = langOrIsEn;
  } else if (typeof langOrIsEn === 'boolean') {
    targetLang = langOrIsEn ? 'en' : 'es';
  } else if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('leplus_lang') as SupportedLanguage;
      if (saved && ['es', 'en', 'pt', 'fr', 'de', 'zh'].includes(saved)) {
        targetLang = saved;
      }
    } catch {
      // ignore
    }
  }

  if (targetLang === 'es') return esText;
  if (targetLang === 'en') return enText;

  const dict = loadedDictionaries[targetLang];
  if (dict) {
    if (dict[enText]) return dict[enText];
    if (dict[esText]) return dict[esText];
  }
  return enText; // fallback to English while async chunk loads
}

/**
 * Helper to translate string lists / arrays
 */
export function trList(enList: string[], esList: string[], langOrIsEn?: SupportedLanguage | boolean): string[] {
  return enList.map((enItem, idx) => tr(enItem, esList[idx] || enItem, langOrIsEn));
}
