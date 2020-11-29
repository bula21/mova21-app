import i18n from "i18next";
import {initReactI18next} from "react-i18next";

import translationDE from '../translations/de.json';
import translationEN from '../translations/en.json';
import translationFR from '../translations/fr.json';
import translationIT from '../translations/it.json';

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
	.use(initReactI18next)
	.init({
		resources,
		lng: "de",
		fallbackLng: "de",
		react: {
			defaultTransParent: 'div',
			transSupportBasicHtmlNodes: true,
			transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
		},
		interpolation: {
			escapeValue: false, // not needed for react!!
			formatSeparator: ',',
			format(value, format) {
			  	if (format === 'uppercase') return value.toUpperCase();
			  	return value;
			},
		},
	});

export default i18n;
