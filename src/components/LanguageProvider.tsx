"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Lang = "en" | "ur";

const LanguageContext = createContext<{
  lang: Lang;
  toggle: () => void;
}>({ lang: "en", toggle: () => {} });

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = lang === "ur" ? "ur" : "en";
  }, [lang]);

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggle: () => setLang((l) => (l === "en" ? "ur" : "en")),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function T({
  en,
  ur,
  as: Tag = "span",
  className,
}: {
  en: string;
  ur: string;
  as?: "span" | "p" | "h1" | "h2" | "h3" | "h4";
  className?: string;
}) {
  const { lang } = useLanguage();
  return <Tag className={className}>{lang === "ur" ? ur : en}</Tag>;
}
