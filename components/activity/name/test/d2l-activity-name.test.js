/* eslint-disable no-undef */
import { addToMock, mockLink } from '../../../../test/data/fetchMock.js';
import { assert, fixture, html } from '@open-wc/testing';
import { createComponentAndWait } from '../../../../test/test-util.js';
import { ActivityName } from '../d2l-activity-name.js';
import { ActivityNameCourse } from '../custom/d2l-activity-name-course.js';
import { courseExisting } from '../../../../test/data/course.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

async function _createNameCourse(path) {
	return await createComponentAndWait(html`<d2l-activity-name-course href="${path}" token="test-token"></d2l-activity-name-course>`);
}

describe('d2l-activity-name', () => {

	before(async() => {
		mockLink.reset();
		await addToMock('/course/existing', courseExisting, _createNameCourse);
	});
	after(() => {
		mockLink.reset();
	});

	describe('constructor', () => {
		it('should construct d2l-activity-name', () => {
			runConstructor('d2l-activity-name');
		});

		it('should construct d2l-activity-name-course', () => {
			runConstructor('d2l-activity-name-course');
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

mockLink.reset();
