/* eslint-disable no-undef */
import '../d2l-activity-name-editor.js';
import { addToMock, mockLink } from '../../../../test/data/fetchMock.js';
import { assert, html } from '@open-wc/testing';
import { createComponentAndWait, fireEventAndWait } from '../../../../test/test-util.js';
import { learningPathExisting, learningPathMissingAction, learningPathNew } from '../../../../test/data/learningPath.js';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

const inputText = 'd2l-input-text';

async function _createNameEditor(path) {
	return await createComponentAndWait(html`<d2l-activity-name-editor href="${path}" token="test-token"></d2l-activity-name-editor>`);
}

async function updateName(element, updatedText) {
	const inputArea = element.shadowRoot.querySelector(inputText);
	inputArea.value = updatedText;

	await fireEventAndWait(inputArea, 'input', element);
}

describe('d2l-activity-name-editor', () => {

	before(async() => {
		mockLink.reset();
		await addToMock('/learning-path/new', learningPathNew, _createNameEditor);
		await addToMock('/learning-path/existing', learningPathExisting, _createNameEditor);
		await addToMock('/learning-path/missing-action', learningPathMissingAction, _createNameEditor, false);
	});
	after(() => {
		mockLink.reset();
	});

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-name-editor');
		});
	});

	describe('Component', () => {

		beforeEach(() => {
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

		describe('path:/learning-path/existing', () => {
			let element;
			beforeEach(async() => {
				clearStore();
				element = await _createNameEditor('/learning-path/existing');
				assert.equal(element.name, learningPathExisting.properties.name, 'name should match response');
			});

			it('name should be set when one is present', () => {
				// new path should be followed
				assert.isTrue(mockLink.called('path:/learning-path/existing'), '/learing-path/exiting was not called');
				assert.isTrue(mockLink.called('path:/learning-path/existing/object'), '/learning-path/existing/object was not called');

				assert.equal(element.shadowRoot.querySelector(inputText).value,
					learningPathExisting.properties.name, 'textarea value does not match');

				assert.equal(element.name, learningPathExisting.properties.name, 'name property should match');

			});

			it('updating should commit state', async() => {
				const spy = sinon.spy(element.updateName);
				await updateName(element, 'new name');

				assert.equal(element.name, 'new name', 'name was updated to match');
				assert.isTrue(spy.commit.called, 'onInputName should be called when input event is triggered');
			});

			it('extra whitespace is removed', async() => {
				const spy = sinon.spy(element.updateName);
				await updateName(element, '   new  name     ');

				assert.equal(element.name, 'new  name', 'name was updated to match');
				assert.isTrue(spy.commit.called, 'commit should be called when input event is triggered');
			});

			it('empty name is not committed', async() => {
				const name = element.name;
				const spy = sinon.spy(element.updateName);
				await updateName(element, '        ');

				assert.equal(element.name, name, 'name was updated to match');
				assert.isFalse(spy.commit.called, 'commit should not be called with empty input');
			});
		});
		describe('path:/learning-path/missing-action', () => {
			let element;
			beforeEach(async() => {
				clearStore();
				element = await _createNameEditor('learning-path/missing-action');
				assert.equal(element.name, learningPathMissingAction.properties.name, 'name should match response');
			});
			it('name not updated when action missing', async() => {
				const spy = sinon.spy(element.updateName);
				await updateName(element, 'new name');

				assert.equal(element.name, learningPathMissingAction.properties.name, 'name was unaltered');
				assert.isFalse(spy.commit.called, 'commit should not be called on update failure');
			});
		});
	});
});

mockLink.reset();
