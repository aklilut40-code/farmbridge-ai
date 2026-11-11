import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.js';
import am from './am.js';
import ti from './ti.js';

export const LANGUAGES = [
  { code: 'am', label: 'አማርኛ' },
  { code: 'ti', label: 'ትግርኛ' },
  { code: 'en', label: 'English' },
];

const DICTIONARIES = { en, am, ti };
const STORAGE_KEY = 'fb.lang';

// Saved choice first, then the browser language, then English.
function detectInitialLanguage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && DICTIONARIES[saved]) return saved;
  } catch {
    /* storage can be blocked; fall through */
  }
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return DICTIONARIES[browser] ? browser : 'en';
}

function lookup(dictionary, key) {
  return key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dictionary);
}

const I18nContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitialLanguage);

  const setLang = useCallback((code) => {
    if (!DICTIONARIES[code]) return;
    setLangState(code);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Falls back to English, then to the key itself, so a missing string is visible but never crashes.
  const t = useCallback(
    (key) => lookup(DICTIONARIES[lang], key) ?? lookup(DICTIONARIES.en, key) ?? key,
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <LanguageProvider>');
  return ctx;
}
