import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import fr from "./fr.json";
import en from "./en.json";
import es from "./es.json";
import ja from "./ja.json";
import zh from "./zh.json";
import ar from "./ar.json";
import th from "./th.json";
import ru from "./ru.json";

export const resources = {
  fr: { translation: fr },
  en: { translation: en },
  es: { translation: es },
  ja: { translation: ja },
  zh: { translation: zh },
  ar: { translation: ar },
  th: { translation: th },
  ru: { translation: ru },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
