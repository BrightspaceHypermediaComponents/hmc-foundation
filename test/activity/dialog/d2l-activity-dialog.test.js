import '../../../components/activity/dialog/d2l-activity-dialog-load-failed.js';
import { assert, html } from '@open-wc/testing';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../test-util.js';
import { mockLink } from '../../data/fetchMocks.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

async function _createDialog(path) {
	return await createComponentAndWait(html`<d2l-activity-dialog-load-failed href="${path}" token="test-token"></d2l-activity-dialog-load-failed>`);
}

describe.only('d2l-activity-dialog-load-failed', () => {

	describe('constructor', () => {

		it('should construct', () => {
			runConstructor('d2l-activity-dialog-load-failed');
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
			await _createDialog('/learning-path/new');

			// paths should be followed
			assert.isTrue(mockLink.called('path:/learning-path/new'), '/learing-path/new was not called');
		});
	});
});
