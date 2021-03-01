import { assert, html } from '@open-wc/testing';
import { addToMock } from './data/fetchMock.js';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../test-util.js';
import { mockLink } from '../../data/fetchMocks.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

// to be imported: component implementation file, testing data

// replace tag with the html tag for the component
async function _createComponent(path) {
	return await createComponentAndWait(html`<tag href="${path}" token="test-token"></tag>`);
}

describe('component-name', () => {

	before(() => {
		mockLink.reset();
		// add appropriate data to fetch mock
		//addToMock('path', jsonResponse);
		addToMock();
	});
	after(() => {
		mockLink.reset();
	});

	describe('construction', () => {

		it('should construct', () => {
			// use the core runConstructor to ensure tag exists
			runConstructor('tag');
		});
	});

	describe('initialization', () => {
		// these tests should check that components are correctly initialized with various html responses
		beforeEach(() => {
			clearStore();
		});

		afterEach(() => {
			mockLink.resetHistory();
		});

		it('should initialize using ...', async() => {
			const element = await _createComponent('ref');

			// assert fields are assigned as desired
			assert(element);
		});

	});

	describe('functionality', () => {
		// tests to ensure component is functioning as desired
		beforeEach(() => {
			clearStore();
		});

		afterEach(() => {
			mockLink.resetHistory();
		});

		it('should ...', async() => {
			await _createComponent('path');
		});
	});
});
