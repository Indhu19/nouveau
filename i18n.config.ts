import * as i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-locize-backend';
import { initReactI18next } from 'react-i18next';

const LOCIZE_PROJECT_ID = 'f2ac2cea-8df1-43d3-b643-172606ce9673';
const LOCIZE_API_KEY = 'b64d46c2-b085-4259-920e-a3a6410c7004';

// Existing supported languages configuration
export const supportedLanguages = {
  'en-IN': {
    name: 'English (India)',
    nativeName: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
    shortCode: 'en',
  },
  'hi-IN': {
    name: 'Hindi (India)',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    dir: 'ltr',
    shortCode: 'hi',
  },
  'ta-IN': {
    name: 'Tamil (India)',
    nativeName: 'தமிழ்',
    flag: '🇮🇳',
    dir: 'ltr',
    shortCode: 'ta',
  },
};

// Existing namespaces configuration
export const namespaces = {
  common: 'common',
  auth: 'auth',
  dashboard: 'dashboard',
  users: 'users',
  errors: 'errors',
  forms: 'forms',
} as const;

// Development and production optimizations
const locizeOptions = {
  projectId: LOCIZE_PROJECT_ID,
  apiKey: LOCIZE_API_KEY,
  // Version your translations
  version: 'latest',

  // Caching strategy
  cache: {
    enabled: true,
    prefix: 'locize_',
    expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
};

// Initialize i18next with Locize
void i18n
  // Use Locize backend for translations
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    saveMissing: true,
    saveMissingPlurals: true,
    // Default language
    fallbackLng: 'en-IN',
    // Available languages
    supportedLngs: Object.keys(supportedLanguages),
    // Debug only in development
    debug: true,
    load: 'currentOnly',
    // Default namespace
    defaultNS: namespaces.common,
    // Fallback namespace
    fallbackNS: namespaces.common,
    // Load all namespaces on init
    ns: Object.values(namespaces),
    // Interpolation configuration
    interpolation: {
      // React already escapes values
      escapeValue: false,
    },
    // Locize backend configuration
    backend: {
      projectId: LOCIZE_PROJECT_ID,
      apiKey: LOCIZE_API_KEY,
      // version is optional
      version: locizeOptions.version,
    },
    // Language detection options
    detection: {
      // Order of detection
      order: ['localStorage', 'navigator'],
      // Cache user language
      caches: ['localStorage'],
      // localStorage key
      lookupLocalStorage: 'i18nextLng',
    },
  });
