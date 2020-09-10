import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import en from "./translations/en";

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .init({
    detection: {
      order: ["localStorage"],
    },
    fallbackLng: "en",

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: ".",

    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },

    react: {
      useSuspense: false,
    },
  });

i18n.addResourceBundle("en", "translations", en);

export default i18n;
