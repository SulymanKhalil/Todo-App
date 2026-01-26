import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// Import from JS modules instead of JSON for better build compatibility
import enTranslations from "./locales/en.js";
import urTranslations from "./locales/ur.js";
import arTranslations from "./locales/ar.js";
import zhTWTranslations from "./locales/zh-tw.js";

const getLanguage = () => {
  try {
    return localStorage.getItem("language") || "en";
  } catch {
    return "en";
  }
};

const instance = i18n.createInstance();

// Resources configuration - JS modules ensure proper bundling in production
const resources = {
  en: { translation: enTranslations || {} },
  ur: { translation: urTranslations || {} },
  ar: { translation: arTranslations || {} },
  "zh-TW": { translation: zhTWTranslations || {} },
  "zh-tw": { translation: zhTWTranslations || {} },
  zh: { translation: zhTWTranslations || {} },
  "zh-HK": { translation: zhTWTranslations || {} },
  "zh-MO": { translation: zhTWTranslations || {} },
};

instance.use(initReactI18next).init({
  resources,
  lng: getLanguage(),
  fallbackLng: "en",
  supportedLngs: ["en", "ur", "ar", "zh-TW", "zh-tw", "zh", "zh-HK", "zh-MO"],
  nonExplicitSupportedLngs: true,
  load: "currentOnly",
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
    bindI18n: "languageChanged loaded",
    bindI18nStore: "added removed",
    nsMode: "default",
  },

  initImmediate: true,
});

export default instance;
