import '../../../components/activity/code/d2l-activity-code-editor.js';
import '../../../components/activity/code/custom/d2l-activity-code-editor-learning-path.js';
import { assert, html } from '@open-wc/testing';
import { createComponentAndWait, fireEventAndWait } from '../../test-util.js';
import { learningPathExisting, learningPathMissingAction, learningPathNew } from '../../data/learningPath.js';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { mockLink } from '../../data/fetchMocks.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

const inputText = 'd2l-input-text';

async function _createCodeEditor(path) {
	return await createComponentAndWait(html`<d2l-activity-code-editor href="${path}" token="test-token"></d2l-activity-code-editor>`);
}

async function _createCodeEditorLearningPath(path) {
	return await createComponentAndWait(html`<d2l-activity-code-editor-learning-path href="${path}" token="test-token"></d2l-activity-code-editor-learning-path>`);
}

async function updateCode(element, updatedText) {
	const inputArea = element.shadowRoot.querySelector(inputText);
	inputArea.value = updatedText;

	await fireEventAndWait(inputArea, 'input', element);
}

describe('d2l-activity-code-editor', () => {

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-code-editor');
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
			const element = await _createCodeEditor('/learning-path/new');

			// paths should be followed
			assert.isTrue(mockLink.called('path:/learning-path/new'), '/learing-path/new was not called');
			assert.isTrue(mockLink.called('path:/learning-path/new/object'), '/learing-path/new/object was not called');

			assert.equal(element.code, learningPathNew.properties.code);
		});

		describe('path:/learning-path/existing', () => {
			let element;
			beforeEach(async() => {
				clearStore();
				element = await _createCodeEditor('/learning-path/existing');
				assert.equal(element.code, learningPathExisting.properties.code, 'name should match response');
			});

			it('name should be set when one is present', () => {
				// new path should be followed
				assert.isTrue(mockLink.called('path:/learning-path/existing'), '/learing-path/exiting was not called');
				assert.isTrue(mockLink.called('path:/learning-path/existing/object'), '/learning-path/existing/object was not called');

				assert.equal(element.shadowRoot.querySelector(inputText).value,
					learningPathExisting.properties.code, 'input value does not match');

				assert.equal(element.code, learningPathExisting.properties.code, 'code property should match');

			});

			it('updating should commit state', async() => {
				const spy = sinon.spy(element.updateCode);
				await updateCode(element, 'new code');

				assert.equal(element.code, 'new code', 'code was updated to match');
				assert.isTrue(spy.commit.called, 'onInputCode should be called when input event is triggered');
			});

			it('extra whitespace is removed', async() => {
				const spy = sinon.spy(element.updateCode);
				await updateCode(element, '   new  code     ');

				assert.equal(element.code, 'new  code', 'code was updated to match');
				assert.isTrue(spy.commit.called, 'commit should be called when input event is triggered');
			});
		});
		describe('path:/learning-path/missing-action', () => {
			let element;
			beforeEach(async() => {
				clearStore();
				element = await _createCodeEditor('learning-path/missing-action');
				assert.equal(element.code, learningPathMissingAction.properties.code, 'code should match response');
			});
			it('code not updated when action missing', async() => {
				const spy = sinon.spy(element.updateCode);
				await updateCode(element, 'new code');

				assert.equal(element.code, learningPathMissingAction.properties.code, 'code was unaltered');
				assert.isFalse(spy.commit.called, 'commit should not be called on update failure');
			});
		});
	});
});

describe('d2l-activity-code-editor-learning-path', () => {

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-code-editor-learning-path');
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
			const element = await _createCodeEditorLearningPath('/learning-path/new');

			// paths should be followed
			assert.isTrue(mockLink.called('path:/learning-path/new'), '/learing-path/new was not called');
			assert.isTrue(mockLink.called('path:/learning-path/new/object'), '/learing-path/new/object was not called');

			assert.equal(element.code, learningPathNew.properties.code);
		});

		describe('path:/learning-path/existing', () => {
			let element;
			beforeEach(async() => {
				clearStore();
				element = await _createCodeEditorLearningPath('/learning-path/existing');
				assert.equal(element.code, learningPathExisting.properties.code, 'name should match response');
			});

			it('name should be set when one is present', () => {
				// new path should be followed
				assert.isTrue(mockLink.called('path:/learning-path/existing'), '/learing-path/exiting was not called');
				assert.isTrue(mockLink.called('path:/learning-path/existing/object'), '/learning-path/existing/object was not called');

				assert.equal(element.shadowRoot.querySelector(inputText).value,
					learningPathExisting.properties.code, 'input value does not match');

				assert.equal(element.code, learningPathExisting.properties.code, 'code property should match');

			});

			it('updating should commit state', async() => {
				const spy = sinon.spy(element.updateCode);
				await updateCode(element, 'new code');

				assert.equal(element.code, 'new code', 'code was updated to match');
				assert.isTrue(spy.commit.called, 'onInputCode should be called when input event is triggered');
			});

			it('extra whitespace is removed', async() => {
				const spy = sinon.spy(element.updateCode);
				await updateCode(element, '   new  code     ');

				assert.equal(element.code, 'new  code', 'code was updated to match');
				assert.isTrue(spy.commit.called, 'commit should be called when input event is triggered');
			});
		});
		describe('path:/learning-path/missing-action', () => {
			let element;
			beforeEach(async() => {
				clearStore();
				element = await _createCodeEditorLearningPath('learning-path/missing-action');
				assert.equal(element.code, learningPathMissingAction.properties.code, 'code should match response');
			});
			it('code not updated when action missing', async() => {
				const spy = sinon.spy(element.updateCode);
				await updateCode(element, 'new code');

				assert.equal(element.code, learningPathMissingAction.properties.code, 'code was unaltered');
				assert.isFalse(spy.commit.called, 'commit should not be called on update failure');
			});
		});
	});
});
