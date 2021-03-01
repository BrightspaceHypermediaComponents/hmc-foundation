import { assert, html } from '@open-wc/testing';
import { createComponentAndWait, fireEventAndWait } from '../../test-util.js';
import { addToMock } from './data/fetchMock.js';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { mockLink } from '../../data/fetchMocks.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

// to be imported: component implementation file, testing data

// replace tag with the html tag for the component
async function _createComponent(path) {
	return await createComponentAndWait(html`<tag href="${path}" token="test-token"></tag>`);
}

describe('component-name', () => {

	beforeEach(() => {
		// add fecth data necessary for tests
		addToMock('ref', jsonObject);
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

			// ensure mocked fetchs were performed
			assert.isTrue(mockLink.called('path:/ref'), 'mock fetch was not called');
			assert.isTrue(mockLink.called('path:/ref/object'), 'mock fetch was not called for object');

			// assert fields are assigned
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
			const element = await _createComponent();

			// paths should be followed
			assert.isTrue(mockLink.called('path:/learning-path/new'), '/learing-path/new was not called');
			assert.isTrue(mockLink.called('path:/learning-path/new/object'), '/learing-path/new/object was not called');

			// call methods on element and ensure expected results
		});

	});
});
