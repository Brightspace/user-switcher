/* global describe, fixture, it, expect, beforeEach, MockInteractions */
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';

describe('d2l-user-switcher', function() {
	var component;
	var hasUsersTemplate;

	var componentQuerySelector = function(selector) {
		return component.shadowRoot.querySelector(selector);
	};

	beforeEach(function() {
		component = fixture('d2l-user-switcher-fixture');
		hasUsersTemplate = componentQuerySelector('.has-users-template');
		sinon.stub(component, '_generateUserRequestFromEntity');
		component.getToken = function() { return Promise.resolve('token'); };
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
					flush(function() {
						var shouldNotExist = componentQuerySelector('.d2l-user-switcher-opener-container');
						expect(parentData.entities.length).to.equal(0);
						expect(shouldNotExist).to.not.exist;
						done();
					});
				});

				it('should not have a dropdown', function(done) {
					flush(function() {
						var dropdown = componentQuerySelector('d2l-dropdown');
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
						flush(function() {
							var container = componentQuerySelector('.d2l-user-switcher-opener-container');
							expect(container).to.exist;
							done();
						});
					});

					it('still does not have a dropdown', function(done) {
						flush(function() {
							var dropdown = componentQuerySelector('d2l-dropdown');
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
						flush(function() {
							var dropdown = componentQuerySelector('d2l-dropdown');
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
					flush(function() {
						var dropdown = componentQuerySelector('d2l-dropdown');
						expect(dropdown).to.not.exist;
						done();
					});
				});

				it('should have content', function(done) {
					flush(function() {
						var container = componentQuerySelector('.d2l-user-switcher-opener-container');
						expect(container).to.exist;
						done();
					});
				});

				describe('child has a name', function() {
					var name;

					beforeEach(function() {
						name = 'Fancy Pants Vance';
						hasUsersTemplate.render();
						component._name = name;
					});

					it('displays childs name', function(done) {
						flush(function() {
							var nameElement = componentQuerySelector('p.selected-user-name');
							expect(nameElement.hasAttribute('hidden')).to.not.equal(true);
							expect(nameElement.innerText).to.equal(name);
							done();
						});
					});
				});

				describe('profile picture', function() {
					var defaultIcon;
					var customImage;

					beforeEach(function() {
						hasUsersTemplate.render();
						defaultIcon = componentQuerySelector('d2l-icon.d2l-user-switcher-opener-image');
						customImage = componentQuerySelector('d2l-image.d2l-user-switcher-opener-image');
					});

					describe('has custom profile picture', function() {
						var imageUrl;

						beforeEach(function() {
							imageUrl = 'http://lookatme';
							component._iconUrl = imageUrl;
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
							flush(function() {
								expect(defaultIcon).to.exist;
								expect(defaultIcon.classList.contains('user-tile-default-icon')).to.equal(true);
								expect(defaultIcon.hasAttribute('hidden')).to.not.equal(true);
								done();
							});
						});

						it('should not display custom profile picture', function(done) {
							flush(function() {
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
						flush(function() {
							var dropdown = componentQuerySelector('d2l-dropdown');
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
						flush(function() {
							var shouldNotExist = componentQuerySelector('.d2l-user-switcher-opener-container');
							expect(shouldNotExist).to.not.exist;
							done();
						});
					});

					it('still does not have a dropdown', function(done) {
						flush(function() {
							var dropdown = componentQuerySelector('d2l-dropdown');
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
					flush(function() {
						var dropdown = componentQuerySelector('d2l-dropdown');
						expect(dropdown).to.exist;
						done();
					});
				});

				describe('drop down', function() {
					var dropdown;
					var entries;

					beforeEach(function() {
						hasUsersTemplate.render();
						dropdown = componentQuerySelector('d2l-dropdown');
						entries = dom(dropdown).querySelectorAll('d2l-user-switcher-item');
					});

					it('should have a user-switcher-item for each child', function(done) {
						flush(function() {
							expect(entries.length).to.be.equal(parentData.entities.length);
							done();
						});
					});

					describe('student selected event', function() {
						var studentSelectedSpy;
						var entry;

						beforeEach(async() => {
							studentSelectedSpy = sinon.spy();
							component.addEventListener('studentSelected', studentSelectedSpy);

							entry = entries[0];
							await entry.updateComplete;
						});

						afterEach(function() {
							component.removeEventListener('studentSelected', studentSelectedSpy);
						});

						it('is fired on tap', function(done) {
							MockInteractions.tap(entry);

							flush(function() {
								expect(studentSelectedSpy).to.be.called;
								done();
							});
						});

						it('is fired on enter', function(done) {
							MockInteractions.pressEnter(entry);

							flush(function() {
								expect(studentSelectedSpy).to.be.called;
								done();
							});
						});

						it('is fired on space', function(done) {
							MockInteractions.pressSpace(entry);

							flush(function() {
								expect(studentSelectedSpy).to.be.called;
								done();
							});
						});

						it('is not fired on arbitrary non space or enter keys', function(done) {
							MockInteractions.pressAndReleaseKeyOn(entry, 70);

							flush(function() {
								expect(studentSelectedSpy).to.not.be.called;
								done();
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
						flush(function() {
							var shouldNotExist = componentQuerySelector('.d2l-user-switcher-opener-container');
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
						flush(function() {
							var dropdown = componentQuerySelector('d2l-dropdown');
							expect(dropdown).to.not.exist;
							done();
						});
					});

					it('still has content', function(done) {
						flush(function() {
							var container = componentQuerySelector('.d2l-user-switcher-opener-container');
							expect(container).to.exist;
							done();
						});
					});
				});
			});
		});
	});
});
