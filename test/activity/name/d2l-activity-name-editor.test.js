import '../../../components/activity/name/d2l-activity-name-editor.js';
import { assert, elementUpdated, html } from '@open-wc/testing';
import { learningPathExisting, learningPathNew } from '../../data/learningPath.js';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../test-util.js';
import { mockLink } from '../../data/fetchMocks.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

// use the learningPathUpdated description as the text when updating textareas

async function _createNameEditor(path) {
	return await createComponentAndWait(html`<d2l-activity-name-editor href="${path}" token="test-token"></d2l-activity-name-editor>`);
}

async function updateName(element, updatedText) {
	element.value = updatedText;
	const inputEvent = new Event('input');

	element.dispatchEvent(inputEvent);

	await elementUpdated(element.name);

	// will use the generic function once things are sorted out
	// await fireEventAndWait(element, 'input', updatedText);
}

describe('d2l-activity-name-editor', () => {

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-name-editor');
		});
	});

	describe('Component', () => {

		beforeEach(async() => {
			clearStore();
		});

		afterEach(() => {
			mockLink.resetHistory();
		});

		it('should initialize using defined path and expected values', async() => {
			const element = await _createNameEditor('/learning-path/new');

			// paths should be followed
			assert.isTrue(mockLink.called('path:/learning-path/new'), '/learing-path/new was not called');
			assert.isTrue(mockLink.called('path:/learning-path/new/object'), '/learing-path/new/object was not called');

			assert.equal(element.name, learningPathNew.properties.name);
		});

		describe.only('path:/learning-path/existing', () => {
			let element;
			beforeEach(async() => {
				clearStore();
				element = await _createNameEditor('/learning-path/existing');
				assert.equal(element.name, learningPathExisting.properties.name, 'description should match response');
			});

			it('description should be set when one is provided', async() => {
				// new path should be followed
				assert.isTrue(mockLink.called('path:/learning-path/existing'), '/learing-path/exiting was not called');
				assert.isTrue(mockLink.called('path:/learning-path/existing/object'), '/learning-path/existing/object was not called');
			});

			it('updating should commit state', async() => {
				const spy = sinon.spy(element);
				await updateName(element, 'new name');

				assert.isTrue(spy._onInputName.called, 'onInputName should be called when input event is triggered');
				assert.equal(element.name, 'new name', 'name was updated to match');
			});
		});
	});
});
