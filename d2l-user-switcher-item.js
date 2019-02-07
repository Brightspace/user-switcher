import '@polymer/polymer/polymer-legacy.js';
import 'd2l-icons/d2l-icons.js';
import 'd2l-menu/d2l-menu-item-behavior.js';
import 'd2l-menu/d2l-menu-item-styles.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-image/d2l-image.js';
import 'd2l-user-profile-behavior/d2l-user-profile-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-user-switcher-item">
	<template strip-whitespace="">
		<style include="d2l-menu-item-styles">
			.d2l-user-switcher-item-link {
				text-decoration: none;
			}
			.d2l-user-switcher-item-container {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin: 10px 30px;
			}
			.d2l-user-switcher-item-image {
				max-width: 42px;
				max-height: 42px;
				margin-right: 15px;
				border-radius: 6px;
				overflow: hidden;
			}
			 :host-context([dir="rtl"]) .d2l-user-switcher-item-image {
				margin-right: 0;
				margin-left: 15px;
			}
			.d2l-user-switcher-item-info {
				display: flex;
				flex-direction: column;
				align-items: left;
			}
			.d2l-user-switcher-item-name {
				margin: 0;
				font-size: 19px;
				line-height: 24px;
				font-weight: normal;
				color: var(--d2l-color-celestine);
			}
			.user-tile-default-icon {
				--d2l-icon-height: 100%;
				--d2l-icon-width: 100%;
			}
			[hidden] {
				display: none;
			}
		</style>


		<a href="javascript:void(0);" class="d2l-user-switcher-item-link d2l-user-switcher-item-container" tabindex="-1">
			<d2l-icon hidden$="[[_hidePlaceholderIcon(_iconUrl)]]" icon="d2l-tier3:profile-pic" class="user-tile-default-icon d2l-user-switcher-item-image">
			</d2l-icon>
			<d2l-image hidden$="[[!_hidePlaceholderIcon(_iconUrl)]]" image-url="[[_iconUrl]]" token="[[token]]" class="d2l-user-switcher-item-image">
			</d2l-image>
			<div class="d2l-user-switcher-item-info">
				<p class="d2l-user-switcher-item-name">[[_name]]</p>
			</div>
		</a>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({
	is: 'd2l-user-switcher-item',

	properties: {
		userUrl: {
			type: String,
			value: null
		},
		getToken: {
			type: Object,
			value: null
		},
		token: {
			type: String,
			value: null
		},
		_iconUrl: {
			type: String,
			value: null
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.MenuItemBehavior,
		window.D2L.UserProfileBehavior
	],

	observers: [
		'_onUserChange( userUrl, getToken )'
	],

	_onUserChange: function(userUrl, getToken) {
		if (userUrl && typeof getToken === 'function') {
			var self = this;
			getToken(userUrl)
				.then(function(token) {
					self.generateUserRequest(userUrl, token);
				});
		}
	},

	_hidePlaceholderIcon: function(icon) {
		return !!icon;
	}
});
