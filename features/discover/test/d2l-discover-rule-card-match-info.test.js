import '../d2l-discover-rule-card-match-info.js';
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

describe('d2l-discover-rule-card-match-info', () => {
	describe('constructor', () => {
		it('constructs the rule picker component', () => {
			runConstructor('d2l-discover-rule-card-match-info');
		});
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-discover-rule-card-match-info></d2l-discover-rule-card-match-info>`);
			const elFull = await fixture(html`
				<d2l-discover-rule-card-match-info .rule="${rule}" token="cake"></d2l-discover-rule-card-match-info>
			`);
			await expect(el).to.be.accessible();
			await expect(elFull).to.be.accessible();
		});
	});

});
