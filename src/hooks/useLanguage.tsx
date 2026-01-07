import { createContext, useContext, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { translations, Language } from "@/lib/translations";

interface LanguageContextType {
  lang: Language;
  t: typeof translations.de;
  otherLang: Language;
  otherLangPath: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // Determine language from URL path
  const lang: Language = location.pathname.startsWith("/fr") ? "fr" : "de";
  const t = translations[lang];
  const otherLang: Language = lang === "de" ? "fr" : "de";
  const otherLangPath = lang === "de" ? "/fr" : "/";

  return (
    <LanguageContext.Provider value={{ lang, t, otherLang, otherLangPath }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
