import '../d2l-discover-rule-card.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const rels = Object.freeze({
	condition: 'https://discovery.brightspace.com/rels/condition',
	rule: 'https://discovery.brightspace.com/rels/rule',
});

const rule =  {
	entities: [
		{ properties: { type: 'Fruit', values: ['apple', 'orange'] }, rel: [rels.condition] },
		{ properties: { type: 'Entree', values: ['spaghetti'] }, rel: [rels.condition] }
	],
	rel: [rels.rule]
};

describe('d2l-discover-rule-card', () => {
	describe('constructor', () => {
		it('constructs the rule card component', () => {
			runConstructor('d2l-discover-rule-card');
		});
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-discover-rule-card></d2l-discover-rule-card>`);
			const elFull = await fixture(html`
				<d2l-discover-rule-card .rule="${rule}" token="cake"></d2l-discover-rule-card>
			`);
			await expect(el).to.be.accessible();
			await expect(elFull).to.be.accessible();
		});
	});
});
