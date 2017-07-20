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
			expect(true).to.equal(true);
		});
	});

	describe('Parent with one child', function() {
		var parentData = { entities: [{
			links: [{
				href: 'https://mylink.com',
				rel: [ 'http://myrel/000/' ]
			}]
		}]};

		console.log(parentData); // eslint-disable-line no-console
		if (component) {
			component.parentData = parentData;
		}

		describe('user switcher', function() {
			it('should not be a dropdown menu', function() {
				var dropdown = component.querySelector('d2l-dropdown');
				expect(dropdown).to.not.exist;
			});
		});

	// 	it('should be displaying the childs information', function() {
	// 		// expect(child name)
	// 		// expect(child profile image)
	// 	});
	});

	describe('Parent with two children', function() {
		var targetUserId = '000';
		var parentData = { entities: [{
			links: [{
				href: 'https://mylink.com/000',
				rel: [ targetUserId ]
			}],
			properties: {
				token: 'faketoken'
			}
		}, {
			links: [{
				href: 'https://mysecondlink.com/001',
				rel: [ '001' ]
			}],
			properties: {
				token: 'faketoken2'
			}
		}]};

		describe('user switcher', function() {
			it('should be a dropdown menu', function(done) {
				component.selectedUserId = targetUserId;
				component.getToken = function() { return { then: function() { return 'tooken'; } }; };
				sinon.stub(component, '_parseEntity', function(student) {
					return {
						getLinkByRel: function() {
							return {
								href: student.links[0].rel[0]
							};
						}
					};
				});

				sinon.stub(component, '_getUserUrl');
				sinon.stub(component, 'generateUserRequest');

				component.parentData = parentData;

				setTimeout(function() {
					var dropdown = component.querySelector('d2l-dropdown');
					expect(dropdown).to.exist;
					done();
				}, 2000);
			});
		});
	});
});
