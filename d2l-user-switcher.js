/**
`d2l-user-switcher`
@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import 'd2l-colors/d2l-colors.js';
import 'd2l-dropdown/d2l-dropdown.js';
import 'd2l-dropdown/d2l-dropdown-menu.js';
import { Rels } from 'd2l-hypermedia-constants';
import 'd2l-icons/d2l-icons.js';
import 'd2l-image/d2l-image.js';
import 'd2l-menu/d2l-menu.js';
import 'd2l-user-profile-behavior/d2l-user-profile-behavior.js';
import SirenParse from 'siren-parser';
import './d2l-user-switcher-item.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-user-switcher">
	<template strip-whitespace="">
		<style>
			d2l-dropdown {
				display: block;
			}
			.d2l-user-switcher-opener-container {
				display: flex;
				flex-direction: row;
				align-items: center;
				background: none;
				border: none;
				outline: none;
				font-family: inherit;
				font-size: inherit;
				font-weight: inherit;
				letter-spacing: inherit;
				line-height: inherit;
				color: inherit;
				padding: 0;
				height: 100%;
				max-width: 100%;
				width: 15rem;
			}
			p {
				margin: 0;
			}
			.pointer {
				cursor: pointer;
			}
			button p {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			button:focus > d2l-icon,
			button:hover > d2l-icon,
			button:focus > p,
			button:hover > p {
				text-decoration: underline;
				color: var(--d2l-color-celestine);
			}
			.d2l-user-switcher-opener-image {
				max-width: 35px;
				max-height: 35px;
				margin-right: 10px;
				border-radius: 6px;
				overflow: hidden;
			}
			:host(:dir(rtl)) .d2l-user-switcher-opener-image {
				margin-left: 10px;
				margin-right: 0;
			}
			.d2l-user-switcher-opener-chevron-down {
				margin-top: auto;
				margin-bottom: auto;
				padding: 0 5px;
				width: 15px;
				height: 15px;
			}
			.user-tile-default-icon {
				--d2l-icon-height: 100%;
				--d2l-icon-width: 100%;
			}
			.text-placeholder {
				width: 150px;
				background: var(--d2l-color-titanius);
			}
			[hidden] {
				display: none;
			}
			d2l-icon,
			d2l-image {
				transition: opacity 250ms;
			}
			.opaque {
				opacity: 1;
			}
			.transparent {
				opacity: 0;
			}
			.selected-user-name-dropdown {
				background-color: var(--d2l-color-celestine-plus-2);
				border-top: 1px var(--d2l-color-celestine) solid;
				border-bottom: 1px var(--d2l-color-celestine) solid;
				z-index: 2;
			}
			.selected-user-name {
				flex: 1;
				text-align: left;
			}
		</style>

		<template is="dom-if" if="[[hasUsers]]" class="has-users-template">
			<template is="dom-if" if="[[!multipleUsers]]" class="single-user-template">
				<div class="d2l-user-switcher-opener-container">
					<d2l-icon icon="d2l-tier3:profile-pic" class="user-tile-default-icon d2l-user-switcher-opener-image opaque">
					</d2l-icon>
					<d2l-image hidden="" image-url="[[_iconUrl]]" token="[[token]]" class="d2l-user-switcher-opener-image transparent">
					</d2l-image>
					<p hidden$="[[!placeholders]]" class="text-placeholder">&nbsp;</p>
					<p hidden$="[[placeholders]]" class="selected-user-name">[[_name]]</p>
				</div>
			</template>
			<template is="dom-if" if="[[multipleUsers]]" class="multiple-users-template">
				<d2l-dropdown>
					<button class="d2l-user-switcher-opener-container pointer d2l-dropdown-opener" on-mouseenter="_disableFocusOnClick" on-mouseleave="_enableFocusOnClick" aria-label$="[[localize('switchUser', 'name', _name)]]">
						<d2l-icon icon="d2l-tier3:profile-pic" class="user-tile-default-icon d2l-user-switcher-opener-image">
						</d2l-icon>
						<d2l-image hidden="" image-url="[[_iconUrl]]" token="[[token]]" class="d2l-user-switcher-opener-image">
						</d2l-image>
						<p hidden$="[[!placeholders]]" class="text-placeholder">&nbsp;</p>
						<p hidden$="[[placeholders]]" class="selected-user-name">[[_name]]</p>
						<d2l-icon class="d2l-user-switcher-opener-chevron-down" icon="d2l-tier1:chevron-down"></d2l-icon>
					</button>
					<d2l-dropdown-menu vertical-offset="5" no-auto-fit="false">
						<d2l-menu label="[[localize('userSwitcherMenu')]]">
							<template is="dom-repeat" items="[[parentData.entities]]">
								<d2l-user-switcher-item class$="[[_selectedUser(selectedUserId,item)]]" on-tap="_onItemClick" on-keydown="_onItemKeydown" user-url="[[_getUserUrl(item)]]" get-token="[[getToken]]">
								</d2l-user-switcher-item>
							</template>
						</d2l-menu>
					</d2l-dropdown-menu>
				</d2l-dropdown>
			</template>
		</template>
	</template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);

Polymer({
	is: 'd2l-user-switcher',

	properties: {
		parentData: Object,
		placeholders: {
			type: Boolean,
			value: false
		},
		selectedUserId: {
			type: String,
			value: null
		},
		hasUsers: {
			type: Boolean,
			value: false
		},
		multipleUsers: {
			type: Boolean,
			value: false
		},
		token: {
			type: String,
			value: null
		},
		getToken: {
			type: Object,
			value: null
		},
		_iconUrl: {
			type: String,
			value: '',
			observer: '_onIconUrlChanged'
		},
		_name: {
			type: String,
			value: null,
			observer: '_onNameChanged'
		},
		_focusOnClick: {
			type: Boolean,
			value: false
		}
	},

	behaviors: [
		window.D2L.UserProfileBehavior,
		window.D2L.UserSwitcher.LocalizeBehavior
	],

	observers: [
		'_onSelectedUserChanged(selectedUserId, parentData, getToken)'
	],

	listeners: {
		'd2l-dropdown-open': 'onOpen'
	},

	_parseEntity: function(entity) {
		return SirenParse(entity);
	},

	_getUserUrl: function(user) {
		var userEntity = this._parseEntity(user);
		return (userEntity.getLinkByRel(Rels.user) || {}).href;
	},

	_selectedUser: function(selectedUserId, item) {
		const user = this._getUserUrl(item);
		return selectedUserId === user.match(/[0-9a-zA-Z]+$/)[0] ? 'selected-user-name-dropdown' : '';
	},

	close: function() {
		this.$$('d2l-dropdown-menu').close();
	},

	onOpen: function() {
		var self = this;

		if (self._focusOnClick) {
			setTimeout(function() {
				self.$$('d2l-menu').focus();
			}, 0);
		}
	},

	_disableFocusOnClick: function() {
		this._focusOnClick = false;
	},

	_enableFocusOnClick: function() {
		this._focusOnClick = true;
	},

	_onIconUrlChanged: function(iconUrl) {
		var icon = this.multipleUsers ? this.$$('d2l-dropdown d2l-icon') : this.$$('d2l-icon');
		var image = this.multipleUsers ? this.$$('d2l-dropdown d2l-image') : this.$$('d2l-image');

		if (iconUrl) {
			icon.classList.add('transparent');
			setTimeout(function() {
				icon.setAttribute('hidden', true);
				image.removeAttribute('hidden');
			}, 250);
			setTimeout(function() {
				image.classList.remove('transparent');
			}, 300);
		} else if (icon && image) {
			icon.removeAttribute('hidden');
			icon.classList.remove('transparent');
			image.setAttribute('hidden', true);
		}
	},

	_onNameChanged: function(name) {
		if (name) {
			var textPlaceholder = this.multipleUsers ? this.$$('d2l-dropdown p.text-placeholder') : this.$$('p.text-placeholder');
			var text = this.multipleUsers ? this.$$('d2l-dropdown p.selected-user-name') : this.$$('p.selected-user-name');

			textPlaceholder.setAttribute('hidden', true);
			text.removeAttribute('hidden');
		}
	},

	_onSelectedUserChanged: function() {
		if (!this.parentData || !this.parentData.entities ||
			this.parentData.entities.length === 0 || typeof this.getToken !== 'function') {
			this.hasUsers = false;
			return;
		}

		this.hasUsers = true;
		this.multipleUsers = false;

		if (this.parentData.entities.length > 1) {
			this.multipleUsers = true;
		}

		this.parentData.entities.forEach(this._generateUserRequestFromEntity.bind(this));
	},

	_generateUserRequestFromEntity: function(student) {
		var self = this;
		var studentEntity = self._parseEntity(student);
		var studentLink = studentEntity.getLinkByRel(Rels.user);
		var studentId = studentLink.href.match(/[0-9a-zA-Z]+$/)[0];
		if (studentId === self.selectedUserId) {
			var userUrl = self._getUserUrl(student);
			self.getToken(userUrl)
				.then(function(token) {
					self.generateUserRequest(userUrl, token);
				});
		}
	},

	_onItemClick: function(e) {
		var data = e.model.item;
		this.close();
		this.dispatchEvent(new CustomEvent('studentSelected', { detail: { data: data }, bubbles: true, composed: true }));
	},

	_onItemKeydown: function(e) {
		if (e.keyCode === 13 || e.keyCode === 32) {
			var data = e.model.item;
			this.close();
			this.dispatchEvent(new CustomEvent('studentSelected', { detail: { data: data }, bubbles: true, composed: true }));
		}
	}
});
