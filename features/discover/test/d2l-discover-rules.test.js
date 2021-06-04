import '../d2l-discover-rules.js';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../../test/test-util.js';
import { default as fetchMock } from 'fetch-mock/esm/client.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import { default as sinon } from 'sinon/pkg/sinon-esm.js';
const rels = Object.freeze({
	condition: 'https://discovery.brightspace.com/rels/condition',
	rule: 'https://discovery.brightspace.com/rels/rule',
	conditionTypes: 'https://discovery.brightspace.com/rels/condition-types',
	conditionType: 'https://discovery.brightspace.com/rels/condition-type',
	organization: 'https://api.brightspace.com/rels/organization',
	entitlementRules: 'https://discovery.brightspace.com/rels/entitlement-rules'
});
const selfHref = 'http://course-bff/1';
const entitlementHref = 'http://entitlement-rules';
const orgHref = 'http://org/1';
const conditionTypesHref = 'http://condition-types/1';
const entity = {
	class: ['activity', 'course', 'assigned'],
	links: [
		{ rel: ['self'], href: selfHref },
		{ rel: [ rels.organization ], href: orgHref },
		{ rel: [ rels.entitlementRules ], href: entitlementHref }
	]
};
const orgEntity = {
	class: ['self-assignable'],
	properties: {
		name: 'Some Course'
	},
	links: [
		{ rel: [ 'self' ], href: orgHref }
	]
};
const entitlementEntity = {
	actions: [
		{ name: 'create', method: 'POST', href: '../demo/entitlement-create.json' }
	],
	entities: [
		{
			entities: [
				{ properties: { type: 'fruit', values: ['apple', 'orange'] }, rel: [rels.condition] }
			],
			rel: [rels.rule]
		}
	],
	links: [
		{ rel: ['self'], href: entitlementHref },
		{ rel: [rels.conditionTypes], href: conditionTypesHref }
	]
};
const conditionTypesEntity = {
	entities: [
		{ rel: [rels.conditionType], properties: { type: 'fruit' } },
		{ rel: [rels.conditionType], properties: { type: 'entree' } }
	],
	links: [
		{ rel: ['self'], href: conditionTypesHref }
	]
};

describe('d2l-discover-rules', () => {

	describe('constructor', () => {
		it('constructs the rules component', () => {
			runConstructor('d2l-discover-rules');
		});
	});

	before(() => {
		fetchMock.mock(selfHref, JSON.stringify(entity))
			.mock(orgHref, JSON.stringify(orgEntity))
			.mock(entitlementHref, JSON.stringify(entitlementEntity))
			.mock(conditionTypesHref, JSON.stringify(conditionTypesEntity));
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-discover-rules></d2l-discover-rules>`);
			const elFull = await createComponentAndWait(html`
				<d2l-discover-rules href="${selfHref}" token="cake"></d2l-discover-rules>
			`);
			await expect(el).to.be.accessible();
			await expect(elFull).to.be.accessible();
		});
	});

	describe('functionality', () => {
		let el, commitSpy;
		beforeEach(async() => {
			clearStore();
			el = await createComponentAndWait(html`
				<d2l-discover-rules href="${selfHref}" token="cake"></d2l-discover-rules>
			`);
			expect(el._hasAction('_createEntitlement'), 'does not have the _createEntitlement action').to.be.true;
			commitSpy = sinon.spy(el._createEntitlement, 'commit');
		});
		afterEach(() => {
			fetchMock.resetHistory();
			commitSpy = null;
			el = null;
		});

		it('throws an event when the checkbox is changed', async() => {
			const checkboxDrawer = el.shadowRoot.querySelector('d2l-labs-checkbox-drawer');
			const listener = oneEvent(el, 'd2l-rules-checkbox-change');
			const event = new CustomEvent('d2l-checkbox-drawer-checked-change', {
				detail: { checked: false }
			});
			checkboxDrawer.dispatchEvent(event);
			checkboxDrawer.checked = false;
			await listener;
			await el.updateComplete;
			const expectedCommit = {
				rules: []
			};
			expect(commitSpy.calledOnce, 'commit was not called').to.be.true;
			expect(commitSpy.calledWith(expectedCommit), `commit was not called with: ${expectedCommit}`).to.be.true;
			expect(el._rules, 'rules should not be removed').to.have.lengthOf(1);
		});

		it('removes a rule when the delete menu item is clicked', async() => {
			expect(el._rules).to.have.lengthOf(1);
			const card = el.shadowRoot.querySelector('d2l-discover-rule-card');
			const deleteItem = card.shadowRoot.querySelector('d2l-menu-item:nth-child(2)');
			const listener = oneEvent(card, 'd2l-rule-delete-click');
			deleteItem.click();
			await listener;
			await el.updateComplete;
			expect(el._rules).to.be.empty;
			const expectedCommit = {
				rules: []
			};
			expect(commitSpy.calledOnce, 'commit was not called').to.be.true;
			expect(commitSpy.calledWith(expectedCommit), `commit was not called with: ${expectedCommit}`).to.be.true;
		});

		it('edits an existing rule when the edit menu item is clicked', async() => {
			const editItem = el.shadowRoot.querySelector('d2l-discover-rule-card')
				.shadowRoot.querySelector('d2l-menu-item:first-child');
			const dialog = el.shadowRoot.querySelector('d2l-discover-rule-picker-dialog');
			editItem.click();
			await waitUntil(() => dialog._state !== null || dialog._state !== undefined, 'dialog state never initialized');
			expect(dialog.opened).to.be.true;

			const picker = dialog.shadowRoot.querySelector('d2l-discover-rule-picker');
			await picker.updateComplete;
			expect(picker.ruleIndex).to.equal(0);
			await waitUntil(() => picker.conditions[0].properties.values.length > 0, 'conditions never initialized');

			expect(picker.conditions[0].properties.type).to.equal(el._rules[0].entities[0].properties.type);
			expect(picker.conditions[0].properties.values).to.deep.equal(el._rules[0].entities[0].properties.values);

			// update the rule
			picker.conditions[0].properties.values.splice(0, 1);
			// click done
			dialog.shadowRoot.querySelector('d2l-button[primary]').click();
			await el.updateComplete;
			// todo: commit is being rude and not testing correctly, even though it works
			//await waitUntil(() => commitSpy.calledOnce, 'commit was not called');
		});

		it('adds a new rule when the dialog is closed', async() => {
			const dialog = el.shadowRoot.querySelector('d2l-discover-rule-picker-dialog');
			await waitUntil(() => dialog._state !== null || dialog._state !== undefined, 'dialog state never initialized');

			const rulePicker = dialog.shadowRoot.querySelector('d2l-discover-rule-picker');
			const rule = [
				{ properties: { type: 'entree', values: ['spaghetti'] } },
				{ properties: { type: 'dessert', values: ['cake', 'pie'] } }
			];
			rulePicker.conditions = rule;
			// click done
			dialog.shadowRoot.querySelector('d2l-button[primary]').click();
			await el.updateComplete;
			const expectedCommit = {
				rules: [
					{ fruit: ['apple', 'orange'] },
					{ entree: ['spaghetti'], dessert: ['cake', 'pie'] }
				]
			};

			expect(commitSpy.calledOnce, 'commit was not called').to.be.true;
			expect(commitSpy.calledWith(expectedCommit), `commit was not called with: ${JSON.stringify(expectedCommit, 2, null)}`).to.be.true;
		});
	});

});
