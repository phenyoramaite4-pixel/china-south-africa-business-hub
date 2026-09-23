import { createContext, useContext, useMemo, useState, useCallback } from "react";
import { translations, DEFAULT_LANGUAGE } from "../data/translations";

const STORAGE_KEY = "csa-hub-language";

const LanguageContext = createContext(null);

function readStoredLanguage() {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored && translations[stored] ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readStoredLanguage);

  const setLanguage = useCallback((code) => {
    if (!translations[code]) return;
    setLanguageState(code);
    try {
      window.localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // Storage may be unavailable (private browsing, etc.) — non-fatal.
    }
  }, []);

  const t = useCallback(
    (key) => {
      const dict = translations[language] || translations[DEFAULT_LANGUAGE];
      return dict[key] ?? translations[DEFAULT_LANGUAGE][key] ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
