import '../d2l-discover-rule-picker-dialog.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../../test/test-util.js';
import { default as fetchMock } from 'fetch-mock/esm/client.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const rels = Object.freeze({
	condition: 'https://discovery.brightspace.com/rels/condition',
	rule: 'https://discovery.brightspace.com/rels/rule',
	conditionTypes: 'https://discovery.brightspace.com/rels/condition-types',
	conditionType: 'https://discovery.brightspace.com/rels/condition-type'
});

const selfHref = 'http://entitlement-new';
const conditionTypesHref = 'http://condition-types-href/dialog';
const entity = {
	actions: [
		{ name: 'create', method: 'POST', href: '../demo/entitlement-create.json' }
	],
	entities: [
		{
			entities: [
				{ properties: { type: 'Fruit', values: ['apple', 'orange'] }, rel: [rels.condition] },
				{ properties: { type: 'Entree', values: ['spaghetti'] }, rel: [rels.condition] }
			],
			rel: [rels.rule]
		}
	],
	links: [
		{ rel: ['self'], href: selfHref },
		{ rel: [rels.conditionTypes], href: conditionTypesHref }
	]
};
const conditionTypesEntity = {
	entities: [
		{ rel: [rels.conditionTypes], properties: { type: 'Fruit' } },
		{ rel: [rels.conditionType], properties: { type: 'Entree' } }
	],
	links: [
		{ rel: ['self'], href: conditionTypesHref }
	]
};

const ruleArray =  [{
	entities: [
		{ properties: { type: 'Fruit', values: ['apple', 'orange'] }, rel: [rels.condition] },
		{ properties: { type: 'Entree', values: ['spaghetti'] }, rel: [rels.condition] }
	],
	rel: [rels.rule]
}];

describe('d2l-discover-rule-picker-dialog', () => {

	before(() => {
		fetchMock.mock(selfHref, JSON.stringify(entity))
			.mock(conditionTypesHref, JSON.stringify(conditionTypesEntity));
	});

	describe('constructor', () => {
		it('constructs the rule picker dialog component', () => {
			runConstructor('d2l-discover-rule-picker-dialog');
		});
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-discover-rule-picker-dialog></d2l-discover-rule-picker-dialog>`);
			const elFull = await createComponentAndWait(html`
				<d2l-discover-rule-picker-dialog href="${selfHref}" token="cake"></d2l-discover-rule-picker-dialog>
			`);
			await expect(el).to.be.accessible();
			await expect(elFull).to.be.accessible();
		});
	});

	describe('functionality', () => {
		let el;
		beforeEach(async() => {
			clearStore();
			el = await createComponentAndWait(html`
				<d2l-discover-rule-picker-dialog href="${selfHref}" .rules=${ruleArray} token="cake"></d2l-discover-rule-picker-dialog>
			`);
		});
		afterEach(() => fetchMock.resetHistory());

		it('updates the state for an existing rule when done is pressed', async() => {
			el.ruleIndex = 0;
			el.opened = true;
			// simulate removal
			const rulePicker = el.shadowRoot.querySelector('d2l-discover-rule-picker');
			await rulePicker.updateComplete;
			expect(rulePicker.ruleIndex).to.equal(0);
			expect(el.rules, 'Rules do not have length 1 el').to.have.lengthOf(1);
			expect(rulePicker.rules, 'Rules do not have length 1').to.have.lengthOf(1);
			expect(rulePicker.rules[0].entities, 'Rule conditions do not have length 2').to.have.lengthOf(2);
			await waitUntil(() => rulePicker.conditions.length === 2, 'Conditions never initialized');
			rulePicker.conditions.splice(0, 1);

			await rulePicker.updateComplete;
			expect(rulePicker.conditions).to.have.lengthOf(1);

			// click done
			el.shadowRoot.querySelector('d2l-button[primary]').click();
			await el.updateComplete;
			expect(el.rules[0]).to.deep.equal(rulePicker.rules[0]);
		});

		it('resets the conditions back to empty when cancel is pressed', async() => {
			el.opened = true;
			await el.updateComplete;
			// simulate changing conditions
			const rulePicker = el.shadowRoot.querySelector('d2l-discover-rule-picker');
			rulePicker.conditions = [
				{ properties: { values: ['cake', 'pie'], type: 'dessert' }, rel: [rels.condition] },
				{ properties: { values: ['edible'], type: 'edibility' }, rel: [rels.condition] }
			];

			await rulePicker.updateComplete;
			expect(rulePicker.conditions).to.have.lengthOf(2);

			// click cancel
			el.shadowRoot.querySelectorAll('d2l-button')[1].click();
			await el.updateComplete;
			expect(rulePicker.conditions).to.be.have.lengthOf(1);
		});

		it('updates the state for a new rule when done is pressed', async() => {
			expect(el.rules).to.have.lengthOf(1);
			el.opened = true;
			await el.updateComplete;
			// simulate adding a new rule
			const rulePicker = el.shadowRoot.querySelector('d2l-discover-rule-picker');
			const newConditions = [
				{ properties: { values: ['cake', 'pie'], type: 'dessert' }, rel: [rels.condition] },
				{ properties: { values: ['edible'], type: 'edibility' }, rel: [rels.condition] }
			];
			rulePicker.conditions = newConditions;

			await rulePicker.updateComplete;
			expect(rulePicker.conditions, 'Rule picker does not have two conditions').to.have.lengthOf(2);

			// click done
			el.shadowRoot.querySelector('d2l-button[primary]').click();
			await el.updateComplete;
			expect(el.rules).to.have.lengthOf(2);
			expect(el.rules[1].entities).to.deep.equal(newConditions);
		});
	});

});
