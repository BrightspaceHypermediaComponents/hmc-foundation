import { assert, fixture, html } from '@open-wc/testing';
import { createComponentAndWait, fireEventAndWait } from '../../test-util.js';
import { learningPathExisting, learningPathMissingAction, learningPathNew } from '../../data/learningPath.js';
import { ActivityName } from '../../../components/activity/name/d2l-activity-name.js';
import { ActivityNameCourse } from '../../../components/activity/name/custom/d2l-activity-name-course.js';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

async function _createNameLearningPath(path) {
	return await createComponentAndWait(html`<d2l-activity-name-learning-path href="${path}" token="test-token"></d2l-activity-name-learning-path>`);
}

async function _createNameCourse(path) {
	return await createComponentAndWait(html`<d2l-activity-name-course href="${path}" token="test-token"></d2l-activity-name-course>`);
}

async function updateName(inputArea, updatedText, component) {
	inputArea.value = updatedText;

	await fireEventAndWait(inputArea, 'input', component);
}

describe('d2l-activity-name', () => {

	describe('constructor', () => {
		it('should construct d2l-activity-name', () => {
			runConstructor('d2l-activity-name');
		});

		it('should construct d2l-activity-name-learning-path', () => {
			runConstructor('d2l-activity-name-learning-path');
		});

		it('should construct d2l-activity-name-course', () => {
			runConstructor('d2l-activity-name-course');
		});
	});

	it('creation', async() => {
		const element = await _createNameLearningPath('/learning-path/new');
		assert.equal(element.name, learningPathNew.properties.name, 'name should be blank in new learning path');
	});

	describe('activity-name-learning-path', () => {
		let element;
		beforeEach(async() => {
			clearStore();
			element = await _createNameLearningPath('/learning-path/existing');
			assert.equal(element.name, learningPathExisting.properties.name, 'name should match response');
		});

		it('updating should commit state', async() => {
			const spy = sinon.spy(element.updateName);
			const inputArea = element.shadowRoot.querySelector('d2l-input-text');
			await updateName(inputArea, 'new name', element);

			assert.equal(element.name, 'new name', 'name was updated to match');
			assert.isTrue(spy.commit.called, 'onInputName should be called when input event is triggered');
		});
	});
	describe('path:/learning-path/missing-action', () => {
		let element;
		beforeEach(async() => {
			clearStore();
			element = await _createNameLearningPath('learning-path/missing-action');
			assert.equal(element.name, learningPathMissingAction.properties.name, 'name should match response');
		});
		it('name not updated when action missing', async() => {
			const spy = sinon.spy(element.updateName);
			element._onInputName('new name');

			assert.equal(element.name, learningPathMissingAction.properties.name, 'name was unaltered');
			assert.isFalse(spy.commit.called, 'commit should not be called on update failure');
		});
	});

	describe('activity-name-course', () => {

		it('creation', async() => {
			const element = await _createNameCourse('/course/existing');
			assert.instanceOf(element, ActivityNameCourse, 'course name component should exist');
		});
	});
	it('generic name constructed', async() => {
		const element = await fixture(html`<d2l-activity-name></d2l-activity-name>`);
		await element.updateComplete;
		assert.instanceOf(element, ActivityName, 'should create basic name component');
	});
});
