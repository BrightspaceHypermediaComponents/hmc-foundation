import '../d2l-w2d-work-to-do.js';
import { expect, fixture, html } from '@open-wc/testing';
import {
	workToDoActivities,
	workToDoActivity,
	workToDoFolder,
	workToDoMain,
	workToDoOrgs,
	workToDoOverdue,
	workToDoOverdueLess,
	workToDoRoot,
} from '../../../test/data/workToDo.js';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../../test/test-util.js';
import { mockLink } from '../../../test/data/fetchMock.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const dataFullPagePath = 'test';

async function _createWorkToDo(path) {
	return await createComponentAndWait(
		html`<d2l-w2d-work-to-do
			href="${path}"
			class="d2l-token-receiver"
			data-token-receiver-scope="*:*:*"
			collapsed
			current-time="2021-06-28T00:00:00.000"
			data-overdue-week-limit="12"
			data-upcoming-week-limit="5"
			group-by-days="1"
			start-date="2021-06-28T15:50:18.230"
			end-date="2022-06-19T04:00:00.000Z"
			data-full-page-path="${dataFullPagePath}"
			role="presentation"
			token="test-token"
		></d2l-w2d-work-to-do>`
	);
}

describe('d2l-w2d-work-to-do', () => {
	describe('constructor', () => {
		it('constructs the attribute picker component', () => {
			runConstructor('d2l-w2d-work-to-do');
		});
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-w2d-work-to-do></d2l-w2d-work-to-do>`);
			await expect(el).to.be.accessible();
		});
	});

	describe('"View all work" button', () => {
		beforeEach(() => {
			clearStore();

			mockLink.reset();
			mockLink.mock('path:/w2d', workToDoMain);
			mockLink.mock('path:/w2d-activities', workToDoActivities);
			mockLink.mock('path:/w2d-root', workToDoRoot);
			mockLink.mock('path:/w2d-orgs', workToDoOrgs);
			mockLink.mock('path:/w2d-orgs-2', workToDoOrgs);
			mockLink.mock('path:/w2d-activity', workToDoActivity);
			mockLink.mock('path:/w2d-activity-4', workToDoActivity);
			mockLink.mock('path:/w2d-activity-5', workToDoActivity);
			mockLink.mock('path:/w2d-activity-6', workToDoActivity);
			mockLink.mock('path:/w2d-activity-7', workToDoActivity);
			mockLink.mock('path:/w2d-activity-8', workToDoActivity);
			mockLink.mock('path:/w2d-activity-9', workToDoActivity);
			mockLink.mock('path:/w2d-activity-10', workToDoActivity);
			mockLink.mock('path:/w2d-folder4', workToDoFolder);
		});

		afterEach(() => {
			mockLink.reset();
		});

		it('does not show if 6 or fewer items', async() => {
			// Arrange
			mockLink.mock('path:/w2d-activities/overdue', workToDoOverdueLess);

			const el = await _createWorkToDo('/w2d');
			const collectionsEl = el.shadowRoot.querySelector(
				'd2l-w2d-collections'
			).shadowRoot;

			// Act
			const button = collectionsEl.querySelector(
				`d2l-link[href=${dataFullPagePath}]`
			);

			// Assert
			expect(button).to.not.exist;
		});

		it('shows if 7 or more items', async() => {
			// Arrange
			mockLink.mock('path:/w2d-activities/overdue', workToDoOverdue);

			const el = await _createWorkToDo('/w2d');
			const collectionsEl = el.shadowRoot.querySelector(
				'd2l-w2d-collections'
			).shadowRoot;

			// Act
			const button = collectionsEl.querySelector(
				`d2l-link[href=${dataFullPagePath}]`
			);

			// Assert
			expect(button).to.exist;
		});
	});
});
