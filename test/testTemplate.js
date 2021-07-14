import { assert, html } from '@open-wc/testing';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../test-util.js';
import fetchMock from 'fetch-mock/esm/client';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

// to be imported: component implementation file, testing data

// replace tag with the html tag for the component
async function _createComponent(path) {
	return await createComponentAndWait(html`<tag href="${path}" token="test-token"></tag>`);
}

const apiHref = 'http://api/';
const responseData = {
	properties: {
		name: 'test'
	}
};

describe('component-name', () => {

	before(() => {
		fetchMock.mock(apiHref, responseData);
	});
	after(() => {
		fetchMock.reset();
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
			fetchMock.resetHistory();
		});

		it('should initialize using ...', async() => {
			const element = await _createComponent(apiHref);

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
			fetchMock.resetHistory();
		});

		it('should ...', async() => {
			await _createComponent(apiHref);
		});
	});
});
