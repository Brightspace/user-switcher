/* global describe, fixture, it, expect, beforeEach */
'use strict';

describe('d2l-user-switcher', function() {
	var component;

	beforeEach(function() {
		component = fixture('d2l-user-switcher-fixture');
		sinon.stub(component, '_generateUserRequestFromEntity');
		component.getToken = function() { return { then: function() { return 'tooken'; } }; };
	});

	describe('smoke test', function() {
		it('should exist on the page', function() {
			expect(component.is).to.equal('d2l-user-switcher');
		});
	});

	describe('Parent with one child', function() {
		var parentData = { entities: [{}] };

		describe('user switcher', function() {
			it('should not be a dropdown menu', function(done) {
				component.parentData = parentData;

				setTimeout(function() {
					var dropdown = component.querySelector('d2l-dropdown');
					expect(dropdown).to.not.exist;
					done();
				}, 0);
			});
		});

		describe('child does not have profile image', function() {
			it ('displays default icon', function(done) {
				component.parentData = parentData;

				setTimeout(function() {
					var icon = component.querySelector('d2l-icon');

					expect(icon).to.exist;
					expect(icon.classList.contains('user-tile-default-icon')).to.equal(true);
					expect(icon.classList.contains('d2l-user-switcher-opener-image')).to.equal(true);
					done();
				}, 0);
			});
		});
	});

	describe('Parent with two children', function() {
		var parentData = { entities: [{}, {}] };

		describe('user switcher', function() {
			it('should be a dropdown menu', function(done) {
				component.parentData = parentData;

				setTimeout(function() {
					var dropdown = component.querySelector('d2l-dropdown');
					expect(dropdown).to.exist;
					done();
				}, 0);
			});
		});
	});
});
