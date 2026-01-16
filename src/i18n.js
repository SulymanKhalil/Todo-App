import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ur from "./locales/ur.json";
import ar from "./locales/ar.json";
import zhTW from "./locales/zh-tw.json"

i18n.use(initReactI18next).init({
    resources: {
        en: {translation: en},
        ur: {translation: ur},
        ar: {translation: ar},
        "zh-TW": {translation: zhTW}
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;