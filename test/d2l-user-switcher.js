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

		beforeEach(function() {
			component.parentData = parentData;
		});

		describe('user switcher', function() {
			it('should not be a dropdown menu', function(done) {
				setTimeout(function() {
					var dropdown = component.querySelector('d2l-dropdown');
					expect(dropdown).to.not.exist;
					done();
				});
			});
		});

		describe('child has a name', function() {
			var name = 'Fancy Pants Vance';
			beforeEach(function() {
				setTimeout(function() {
					component._name = name;
				});
			});

			it('displays childs name', function() {
				setTimeout(function() {
					var nameElement = component.querySelector('p.selected-user-name');
					expect(nameElement.hasAttribute('hidden')).to.not.equal(true);
					expect(nameElement.innerText).to.equal(name);
				});
			});
		});

		describe('child does not have profile image', function() {
			it ('displays default icon', function(done) {
				setTimeout(function() {
					var icon = component.querySelector('d2l-icon.d2l-user-switcher-opener-image');

					expect(icon).to.exist;
					expect(icon.classList.contains('user-tile-default-icon')).to.equal(true);
					expect(icon.hasAttribute('hidden')).to.not.equal(true);
					done();
				});
			});
			it ('does not display custom image', function(done) {
				setTimeout(function() {
					var image = component.querySelector('d2l-image.d2l-user-switcher-opener-image');

					expect(image).to.exist;
					expect(image.hasAttribute('hidden')).to.equal(true);
					done();
				});
			});
		});

		describe('child does have a profile image', function() {
			var imageUrl = 'http://lookatme';
			beforeEach(function() {
				setTimeout(function() {
					component._iconUrl = imageUrl;
				});
			});

			it('displays profile image', function(done) {
				setTimeout(function() {
					var image = component.querySelector('d2l-image.d2l-user-switcher-opener-image');

					expect(image.hasAttribute('hidden')).to.not.equal(true);
					done();
				}, 350);
			});

			it ('does not display default icon', function(done) {
				setTimeout(function() {
					var icon = component.querySelector('d2l-icon.d2l-user-switcher-opener-image');

					expect(icon.classList.contains('user-tile-default-icon')).to.equal(true);
					expect(icon.hasAttribute('hidden')).to.equal(true);
					done();
				}, 350);
			});
		});
	});

	describe('Parent with two children', function() {
		var parentData = { entities: [{ id: '0' }, { id: '1' }] };

		beforeEach(function() {
			sinon.stub(component, '_getUserUrl', function(user) { return user.id; });
			component.parentData = parentData;
		});

		describe('user switcher', function() {
			it('should be a dropdown menu', function(done) {
				setTimeout(function() {
					var dropdown = component.querySelector('d2l-dropdown');
					expect(dropdown).to.exist;
					done();
				});
			});
		});

		describe('drop down should contain', function() {
			it('an entry for each child', function(done) {
				setTimeout(function() {
					var dropdown = component.querySelector('d2l-dropdown');
					var entries = Polymer.dom(dropdown).querySelectorAll('d2l-user-switcher-item');

					expect(entries.length).to.be.equal(parentData.entities.length);
					done();
				});
			});
		});
	});
});
