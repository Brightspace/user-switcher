/* global describe, fixture, it, expect, beforeEach */
'use strict';

describe('d2l-user-switcher', function() {
	var component;

	beforeEach(function() {
		component = fixture('d2l-user-switcher-fixture');
		sinon.stub(component, '_generateUserRequestFromEntity');
		component.getToken = function() { return { then: function() { return 'tooken'; } }; };
	});

	it('should exist on the page', function() {
		expect(component.is).to.equal('d2l-user-switcher');
	});

	describe('parent data tests', function() {
		var parentData;

		describe('Parent with no children', function() {
			beforeEach(function() {
				parentData = { entities: [] };
				component.parentData = parentData;
			});

			describe('user switcher', function() {
				it('should not have an opener container', function(done) {
					setTimeout(function() {
						var shouldNotExist = component.querySelector('.d2l-user-switcher-opener-container');
						expect(parentData.entities.length).to.equal(0);
						expect(shouldNotExist).to.not.exist;
						done();
					});
				});

				it('should not have a dropdown', function(done) {
					setTimeout(function() {
						var dropdown = component.querySelector('d2l-dropdown');
						expect(dropdown).to.not.exist;
						done();
					});
				});
			});

			describe('switch parent data', function() {
				var newParentData;

				describe('go to 1 child', function() {
					beforeEach(function() {
						newParentData = { entities: [{}] };
						component.parentData = newParentData;
					});

					it('now displays content', function(done) {
						setTimeout(function() {
							var container = component.querySelector('.d2l-user-switcher-opener-container');
							expect(container).to.exist;
							done();
						});
					});

					it('still does not have a dropdown', function(done) {
						setTimeout(function() {
							var dropdown = component.querySelector('d2l-dropdown');
							expect(dropdown).to.not.exist;
							done();
						});
					});
				});

				describe('go to 2 children', function() {
					beforeEach(function() {
						newParentData = { entities: [{}, {}] };
						component.parentData = newParentData;
					});

					it('now has dropdown', function(done) {
						setTimeout(function() {
							var dropdown = component.querySelector('d2l-dropdown');
							expect(dropdown).to.exist;
							done();
						});
					});
				});
			});
		});

		describe('Parent with one child', function() {
			beforeEach(function() {
				parentData = { entities: [{}] };
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

				it('should have content', function(done) {
					setTimeout(function() {
						var container = component.querySelector('.d2l-user-switcher-opener-container');
						expect(container).to.exist;
						done();
					});
				});

				describe('child has a name', function() {
					var name;

					beforeEach(function() {
						name = 'Fancy Pants Vance';

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

				describe('profile picture', function() {
					var defaultIcon;
					var customImage;

					beforeEach(function() {
						setTimeout(function() {
							defaultIcon = component.querySelector('d2l-icon.d2l-user-switcher-opener-image');
							customImage = component.querySelector('d2l-image.d2l-user-switcher-opener-image');
						});
					});

					describe('has custom profile picture', function() {
						var imageUrl;

						beforeEach(function() {
							imageUrl = 'http://lookatme';

							setTimeout(function() {
								component._iconUrl = imageUrl;
							});
						});

						it('should display custom profile picture', function(done) {
							setTimeout(function() {
								expect(customImage.hasAttribute('hidden')).to.not.equal(true);
								done();
							}, 350);
						});

						it ('should not display default icon', function(done) {
							setTimeout(function() {
								expect(defaultIcon.classList.contains('user-tile-default-icon')).to.equal(true);
								expect(defaultIcon.hasAttribute('hidden')).to.equal(true);
								done();
							}, 350);
						});
					});

					describe('does not have custom profile picture', function() {
						it('should display default icon', function(done) {
							setTimeout(function() {
								expect(defaultIcon).to.exist;
								expect(defaultIcon.classList.contains('user-tile-default-icon')).to.equal(true);
								expect(defaultIcon.hasAttribute('hidden')).to.not.equal(true);
								done();
							});
						});

						it('should not display custom profile picture', function(done) {
							setTimeout(function() {
								expect(customImage).to.exist;
								expect(customImage.hasAttribute('hidden')).to.equal(true);
								done();
							});
						});
					});
				});
			});

			describe('switch parent data', function() {
				var newParentData;

				describe('go to 2 children', function() {
					beforeEach(function() {
						newParentData = { entities: [{}, {}] };
						component.parentData = newParentData;
					});

					it('now displays dropdown', function(done) {
						setTimeout(function() {
							var dropdown = component.querySelector('d2l-dropdown');
							expect(dropdown).to.exist;
							done();
						});
					});
				});

				describe('go to 0 children', function() {
					beforeEach(function() {
						newParentData = { entities: [] };
						component.parentData = newParentData;
					});

					it('no longer has content', function(done) {
						setTimeout(function() {
							var shouldNotExist = component.querySelector('.d2l-user-switcher-opener-container');
							expect(shouldNotExist).to.not.exist;
							done();
						});
					});

					it('still does not have a dropdown', function(done) {
						setTimeout(function() {
							var dropdown = component.querySelector('d2l-dropdown');
							expect(dropdown).to.not.exist;
							done();
						});
					});
				});
			});
		});

		describe('Parent with two children', function() {
			beforeEach(function() {
				parentData = { entities: [{ id: '0' }, { id: '1' }] };
				sinon.stub(component, '_getUserUrl', function(user) { return user.id; });
				component.parentData = parentData;
			});

			describe('user switcher', function() {
				it('should display a dropdown menu', function(done) {
					setTimeout(function() {
						var dropdown = component.querySelector('d2l-dropdown');
						expect(dropdown).to.exist;
						done();
					});
				});

				describe('drop down', function() {
					var dropdown;
					var entries;

					beforeEach(function() {
						setTimeout(function() {
							dropdown = component.querySelector('d2l-dropdown');
							entries = Polymer.dom(dropdown).querySelectorAll('d2l-user-switcher-item');
						});
					});

					it('should have a user-switcher-item for each child', function(done) {
						setTimeout(function() {
							expect(entries.length).to.be.equal(parentData.entities.length);
							done();
						});
					});

					describe('student selected event', function() {
						var studentSelectedSpy;
						var event;

						beforeEach(function() {
							studentSelectedSpy = sinon.spy();
							component.addEventListener('studentSelected', studentSelectedSpy);
						});

						afterEach(function() {
							component.removeEventListener('studentSelected', studentSelectedSpy);
						});

						it('is fired on tap', function(done) {
							setTimeout(function() {
								event = new Event('tap');
								entries[0].dispatchEvent(event);

								setTimeout(function() {
									expect(studentSelectedSpy).to.be.called;
									done();
								});
							});
						});

						it('is fired on enter', function(done) {
							setTimeout(function() {
								event = new Event('keydown');
								event.keyCode = 13;
								entries[0].dispatchEvent(event);

								setTimeout(function() {
									expect(studentSelectedSpy).to.be.called;
									done();
								});
							});
						});

						it('is fired on space', function(done) {
							setTimeout(function() {
								event = new Event('keydown');
								event.keyCode = 32;
								entries[0].dispatchEvent(event);

								setTimeout(function() {
									expect(studentSelectedSpy).to.be.called;
									done();
								});
							});
						});

						it('is not fired on arbitrary non space or enter keys', function(done) {
							setTimeout(function() {
								event = new Event('keydown');
								event.keyCode = 70;
								entries[0].dispatchEvent(event);

								setTimeout(function() {
									expect(studentSelectedSpy).to.not.be.called;
									done();
								});
							});
						});
					});
				});
			});

			describe('switch parent data', function() {
				var newParentData;

				describe('go to 0 children', function() {
					beforeEach(function() {
						newParentData = { entities: [] };
						component.parentData = newParentData;
					});

					it('no longer has content', function(done) {
						setTimeout(function() {
							var shouldNotExist = component.querySelector('.d2l-user-switcher-opener-container');
							expect(shouldNotExist).to.not.exist;
							done();
						});
					});
				});

				describe('go to 1 child', function() {
					beforeEach(function() {
						newParentData = { entities: [{}] };
						component.parentData = newParentData;
					});

					it('no longer displays dropdown', function(done) {
						var dropdown = component.querySelector('d2l-dropdown');
						expect(dropdown).to.not.exist;
						done();
					});

					it('still has content', function(done) {
						setTimeout(function() {
							var container = component.querySelector('.d2l-user-switcher-opener-container');
							expect(container).to.exist;
							done();
						});
					});
				});
			});
		});
	});
});
