import { AppLocalizeBehavior } from 'd2l-localize-behavior/app-localize-behavior.js';
import './lang/ar.js';
import './lang/en.js';
import './lang/es.js';
import './lang/fr.js';
import './lang/ja.js';
import './lang/ko.js';
import './lang/nl.js';
import './lang/pt.js';
import './lang/sv.js';
import './lang/tr.js';
import './lang/zh-tw.js';
import './lang/zh.js';
window.D2L = window.D2L || {};
window.D2L.UserSwitcher = window.D2L.UserSwitcher || {};

/* @polymerBehavior */
var localizeBehaviorImpl = {
	properties: {
		language: {
			type: String,
			computed: '_determineLanguage(locale, resources)'
		},
		locale: {
			type: String,
			value: function() {
				return document.documentElement.lang
					|| document.documentElement.getAttribute('data-lang-default')
					|| 'en-us';
			}
		},
		resources: {
			value: function() {
				return {
					'en': this.en,
					'ar': this.ar,
					'es': this.es,
					'fr': this.fr,
					'ja': this.ja,
					'ko': this.ko,
					'nl': this.nl,
					'pt': this.pt,
					'sv': this.sv,
					'tr': this.tr,
					'zh': this.zh,
					'zh-tw': this.zhTw
				};
			}
		}
	},
	_determineLanguage: function(locale, resources) {
		locale = locale.toLowerCase();

		if (resources[locale]) {
			return locale;
		}

		var langAndRegion = locale.split('-');

		if (resources[langAndRegion[0]]) {
			return langAndRegion[0];
		}

		return 'en';
	}
};

/*
* Behavior for elements that require localization, based on `app-localize-behavior`
* @polymerBehavior window.D2L.UserSwitcher.LocalizeBehavior
*/
window.D2L.UserSwitcher.LocalizeBehavior = [
	AppLocalizeBehavior,
	localizeBehaviorImpl,
	window.D2L.UserSwitcher.LocalizeBehavior.LangArBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangEnBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangEsBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangFrBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangJaBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangKoBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangNlBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangPtBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangSvBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangTrBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangZhTwBehavior,
	window.D2L.UserSwitcher.LocalizeBehavior.LangZhBehavior
];
