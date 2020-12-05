import i18n from "i18next"
import {initReactI18next} from "react-i18next";

import LanguageDetector from 'i18next-browser-languagedetector';

import translationEn from './translation/en.json';
import translationKo from './translation/ko.json';

const resource =  {
    en: {
        translation: translationEn
    },
    ko: {
        translation: translationKo
    }
};


const optionDetection = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: '/', sameSite: 'strict' }
};




const instanceI18n = i18n.createInstance();

instanceI18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)  // https://www.npmjs.com/package/i18next-browser-languagedetector
  
  .init({
    resources: resource,
    //lng: "en",
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false
    },
    detection: optionDetection
  });
  
 

export default instanceI18n;

