import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";

import fr from "./fr.json";
import en from "./en.json";

export const resources = {
  fr: { translation: fr },
  en: { translation: en },
} as const;

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("lang") || "fr",
    fallbackLng: "fr",
    ns: ["translation", "projects"],
    defaultNS: "translation",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
