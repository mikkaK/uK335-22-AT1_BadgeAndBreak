import i18n from "i18next";
import {initReactI18next} from "react-i18next";

export const resources = {
    de: require('./de/deTranslation'),
    en: require('./en/enTranslation'),
} as const;

i18n
    .use(initReactI18next)
    .init({
        compatibilityJSON: 'v3',
        debug: true,
        fallbackLng: "de",
        supportedLngs: ["de", "en"],
        resources,
    })

export default i18n;