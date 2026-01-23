import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.js";
import ur from "./locales/ur.js";
import ar from "./locales/ar.js";
import zhTW from "./locales/zh-tw.js";

const getLanguage = () => {
  try {
    return localStorage.getItem("language") || "en";
  } catch {
    return "en";
  }
};

const instance = i18n.createInstance();

instance.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ur: { translation: ur },
    ar: { translation: ar },
    "zh-TW": { translation: zhTW },
  },
  lng: getLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "ur", "ar", "zh-TW"],
  load: "languageOnly",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
    bindI18n: "languageChanged loaded",
    bindI18nStore: "added removed",
    nsMode: "default",
  },
});

export default instance;
