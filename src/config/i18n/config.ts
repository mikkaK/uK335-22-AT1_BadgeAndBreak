import i18n from "i18next";
import {initReactI18next} from "react-i18next";

/**
 * configuration file for i18n (i18Next dependency)
 */
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
