import i181 from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import ur from "./locales/ur.json";
import ar from "./locales/ar.json";

i181.use(initReactI18next).init({
    resources: {
        en: {translation: en},
        ur: {translation: ur},
        ar: {translation: ar}
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i181;