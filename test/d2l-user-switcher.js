/* global describe, fixture, it, expect, beforeEach */
'use strict';

describe('d2l-user-switcher', function() {
	var component;

	beforeEach(function() {
		component = fixture('d2l-user-switcher-fixture');
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
				sinon.stub(component, '_generateUserRequestFromEntity');
				component.getToken = function() { return { then: function() { return 'tooken'; } }; };

				component.parentData = parentData;

				setTimeout(function() {
					var dropdown = component.querySelector('d2l-dropdown');
					expect(dropdown).to.not.exist;
					done();
				}, 0);
			});
		});

	// 	it('should be displaying the childs information', function() {
	// 		// expect(child name)
	// 		// expect(child profile image)
	// 	});
	});

	describe('Parent with two children', function() {
		var parentData = { entities: [{}, {}] };

		describe('user switcher', function() {
			it('should be a dropdown menu', function(done) {
				sinon.stub(component, '_generateUserRequestFromEntity');
				component.getToken = function() { return { then: function() { return 'tooken'; } }; };

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
