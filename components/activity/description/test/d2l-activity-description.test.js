import '../d2l-activity-description.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-activity-description', () => {

	describe('constructor', () => {

		it('should construct d2l-activity-description-learning-path', () => {
			runConstructor('d2l-activity-description-learning-path');
		});

		it('should construct d2l-activity-description-course', () => {
			runConstructor('d2l-activity-description-course');
		});
	});
});
