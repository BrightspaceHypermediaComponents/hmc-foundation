import '../../../components/activity/name/d2l-activity-name.js';
// import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-description', () => {

	describe('constructor', () => {

		it('should construct d2l-activity-name-learning-path', () => {
			runConstructor('d2l-activity-name-learning-path');
		});

		it('should construct d2l-activity-name-course', () => {
			runConstructor('d2l-activity-name-course');
		});
	});
});
