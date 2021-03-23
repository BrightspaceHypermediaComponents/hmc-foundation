import '../d2l-w2d-work-to-do.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

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

});
