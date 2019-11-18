import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import translationDE from './translations/de.json';
import translationEN from './translations/en.json';
import translationFR from './translations/fr.json';
import translationIT from './translations/it.json';

// the translations
const resources = {
	de: {
		translation: translationDE
	},
	en: {
		translation: translationEN
	},
	fr: {
		translation: translationFR
	},
	it: {
		translation: translationIT
	}
};

i18n
	.use(initReactI18next) // passes i18n down to react-i18next
	.init({
		resources,
		lng: "de",
		keySeparator: false, // we do not use keys in form messages.welcome
		interpolation: {
			escapeValue: false // react already safes from xss
		}
	});

export default i18n;
