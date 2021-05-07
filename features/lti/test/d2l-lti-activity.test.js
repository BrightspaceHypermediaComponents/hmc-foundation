import '../d2l-lti-activity.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper';

describe('d2l-lti-activity', () => {
	describe('constructor', () => {
		it('constructs the lti activity component', () => {
			runConstructor('d2l-lti-activity');
		});
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-lti-activity></d2l-lti-activity>`);
			await expect(el).to.be.accessible();
		});
	});
});
