import '../d2l-discover-rules.js';
import { expect, fixture, html, waitUntil } from '@open-wc/testing';
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
	links: [
		{ rel: ['self'], href: entitlementHref },
		{ rel: [rels.conditionTypes], href: conditionTypesHref }
	]
};
const conditionTypesEntity = {
	entities: [
		{ rel: [rels.conditionType], properties: { type: 'Fruit' } },
		{ rel: [rels.conditionType], properties: { type: 'Entree' } }
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
		let el;
		beforeEach(async() => {
			clearStore();
			el = await createComponentAndWait(html`
				<d2l-discover-rules href="${selfHref}" token="cake"></d2l-discover-rules>
			`);
		});
		afterEach(() => fetchMock.resetHistory());

		it('commits an action when the dialog is closed', async() => {
			expect(el._hasAction('_createEntitlement'), 'does not have the _createEntitlement action').to.be.true;
			const spy = sinon.spy(el._createEntitlement, 'commit');
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
			await dialog.updateComplete;
			const expectedCommit = [
				{ entree: ['spaghetti'], dessert: ['cake', 'pie'] }
			];

			expect(spy.calledOnce, 'commit was not called').to.be.true;
			expect(spy.calledWith(expectedCommit), `commit was not called with: ${expectedCommit}`).to.be.true;
		});
	});

});
