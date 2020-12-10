import '../../../components/activity/description/d2l-activity-description-editor.js';
import { assert, aTimeout, elementUpdated, expect, fixture, html } from '@open-wc/testing';
import { learningPathExisting, learningPathNew, learningPathUpdated } from '../../data.js';
import { mockLink } from '../../fetchMocks.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

// use the learningPathUpdated description as the text when updating textareas
const updatedDescriptionText = learningPathUpdated.properties.description;

async function _createComponentAndWait(path)
{
	const element = await fixture(html`<d2l-activity-description-editor href="${path}" token="test-token"></d2l-activity-description-editor>`);
	await _elementUpdated(element, 100);
	return element;
}

// using a delay to wait for fetchMock to be called
// would prefer a better way
async function _elementUpdated(element, delayMs) {
	return aTimeout(delayMs).then(async() => {
		await elementUpdated(element);
	});
}

describe('d2l-activity-description-editor', () => {

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-description-editor');
		});
	});

	describe('Component', () => {

		afterEach(() => {
			mockLink.resetHistory();
		});

		it('should initialize using defined path and expected values', async() => {
			const element = await _createComponentAndWait('/learning-path/new');

			// paths should be followed
			assert.isTrue(mockLink.called('path:/learning-path/new'), '/learing-path/new was not called');
			assert.isTrue(mockLink.called('path:/learning-path/new/object'), '/learing-path/new/object was not called');

			const textarea = element.shadowRoot.querySelector('label textarea');

			// classes are set
			expect(element.shadowRoot.querySelector('label'))
				.to.have.class('d2l-activity-description-editor', 'Label should have d2l-activity-description-editor class');
			expect(element.shadowRoot.querySelector('label span'))
				.to.have.class('d2l-input-label', 'span should have d2l-input-label class');
			expect(textarea)
				.to.have.class('d2l-input', 'textarea should have d2l-input class');

			// verify textarea element
			assert.equal(textarea.getAttribute('placeholder'), 'Write a description', 'Placeholder text does not match');
			assert.equal(textarea.value, learningPathNew.properties.description, 'textarea value does not match');

			assert.equal(element.description, learningPathNew.properties.description, 'description property should match');
		});

		it('description should be set when one is provided', async() => {
			const element = await _createComponentAndWait('/learning-path/existing');

			// new path should be followed
			assert.isTrue(mockLink.called('path:/learning-path/existing'), '/learing-path/exiting was not called');
			assert.isTrue(mockLink.called('path:/learning-path/existing/object'), '/learning-path/existing/object was not called');

			assert.equal(element.shadowRoot.querySelector('label textarea').value,
				learningPathExisting.properties.description, 'textarea value does not match');

			assert.equal(element.description, learningPathExisting.properties.description, 'description property should match');
		});

		it('updating should commit state, but not save it', async() => {
			const element = await _createComponentAndWait('/learning-path/existing');
			assert.equal(element.description, learningPathExisting.properties.description, 'description should match response');

			// update textarea
			const textarea = element.shadowRoot.querySelector('label textarea');
			textarea.value = updatedDescriptionText;

			// create spy and trigger input event
			const spy = sinon.spy(element.updateDescription);
			const inputEvent = new Event('input');
			textarea.dispatchEvent(inputEvent);

			assert.isTrue(spy.commit.called, 'Commit should be called when input event is triggered');
		});

		/* 	These are out of scope, but provided basic mock up for save / cancel
		*	Still need to figure out how to wait for element to be updated after push / reset
		*/
		it('pushing state should save description', async() => {
			const element = await _createComponentAndWait('/learning-path/existing');

			let textarea = element.shadowRoot.querySelector('label textarea');
			textarea.value = updatedDescriptionText;
			const inputEvent = new Event('input');
			textarea.dispatchEvent(inputEvent);

			const spy = sinon.spy(element);
			element._state.push();
			await _elementUpdated(element, 200);

			assert.isTrue(mockLink.called('path:/description/update'));

			assert.isTrue(spy.render.called);

			assert.equal(element.description, updatedDescriptionText, 'description should be updated after a push');
			textarea = element.shadowRoot.querySelector('label textarea');
			assert.equal(textarea.value, updatedDescriptionText, 'textarea value should be updated');
		});

		it('reset state should revert text', async() => {
			const element = await _createComponentAndWait('/learning-path/existing');

			const textarea = element.shadowRoot.querySelector('label textarea');
			textarea.value = updatedDescriptionText;
			const inputEvent = new Event('input');
			textarea.dispatchEvent(inputEvent);

			assert.equal(element.description, updatedDescriptionText, 'description should be updated');

			await aTimeout(1000);

			const spy = sinon.spy(element);
			element._state.reset();
			await _elementUpdated(element, 200);
			assert.equal(element.description, learningPathExisting.properties.description, 'description should be reset');

			assert.isTrue(spy.render.called);

			const textarea2 = element.shadowRoot.querySelector('label textarea');
			assert.equal(textarea2.value, learningPathExisting.properties.description, 'textarea value should be reset');
		});
	});

});
