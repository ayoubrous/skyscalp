import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locale/en.json'
import translationFR from './locale/fr.json'


i18n
  // detect user language
  // .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    debug: false,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en : {
        translation: translationEN
      },
    
      fr : {
        translation: translationFR
      }
    }
  });

export default i18n;