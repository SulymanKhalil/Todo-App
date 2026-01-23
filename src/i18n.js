import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ur from "./locales/ur.json";
import ar from "./locales/ar.json";
import zhTW from "./locales/zh-tw.json";

const getResource = (module) =>
  module && module.default ? module.default : module;

const getLanguage = () => {
  try {
    return localStorage.getItem("language") || "en";
  } catch {
    return "en";
  }
};

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: getResource(en) },
    ur: { translation: getResource(ur) },
    ar: { translation: getResource(ar) },
    "zh-TW": { translation: getResource(zhTW) },
  },
  lng: getLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "ur", "ar", "zh-TW"],
  preload: ["en"],
  load: "languageOnly",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
