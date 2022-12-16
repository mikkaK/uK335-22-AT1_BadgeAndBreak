import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "de",
    supportedLngs: ["de", "en"],
    resources: {
        de:{
            translation:{
                yourReminders: "Deine Erinnerugnen",
                placeholderTextFiled: "Titel der Erinnerung",
                enterTimeClock: "Zeit eingeben",
                cancel: "Abbrechen",
                save: "Speichern",
                never: "Niemals",
                daily: "Täglich",
                weekly: "Wöchentlich",
                monthly: "Monatlich",
                yearly: "Jährlich",
                MO:"MO",
                TU:"DI",
                WE:"MI",
                TH:"DO",
                FR:"FR",
                SA:"SA",
                SU:"SO",
                errorMessageFillAllFields:"Alle Felder müssen ausgefüllt werden!",
                errorMessageInvalidTime:"Bitte geben Sie eine valide Zeit ein",
            },
        },
        en:{
            translation:{
                yourReminders: "Your Reminders",
                placeholderTextFiled: "title of your reminder",
                enterTimeClock: "Enter Time",
                cancel: "cancel",
                save: "save",
                never: "Never",
                daily: "Daily",
                weekly: "Weekly",
                monthly: "Monthly",
                yearly: "Yearly",
                MO:"MO",
                TU:"TU",
                WE:"WE",
                TH:"TH",
                FR:"FR",
                SA:"SA",
                SU:"SU",
                errorMessageFillAllFields:"All fields need a value!",
                errorMessageInvalidTime:"Please enter a valid time",
            },
        },
        },
        });

        export default i18n;