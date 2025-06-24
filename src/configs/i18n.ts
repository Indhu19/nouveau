import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

void i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
  defaultNS: 'common',
  fallbackLng: 'en',
  ns: [],
  partialBundledLanguages: true,
  resources: {}
});

export default i18n;
