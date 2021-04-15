import '../d2l-discover-rules.js';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../../test/test-util.js';
import { default as fetchMock } from 'fetch-mock/esm/client.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import { default as sinon } from 'sinon/pkg/sinon-esm.js';
const selfHref = 'http://course-bff/1';
const newEntityHref = 'http://new-rule/1';
const entitlementHref = 'http://entitlement-rules';
const orgHref = 'http://org/1';
const entity = {
	class: ['activity', 'course', 'assigned'],
	links: [
		{
			rel: ['self'],
			href: selfHref
		},
		{
			rel: [
				'https://api.brightspace.com/rels/organization'
			],
			href: orgHref
		},
		{
			rel: [
				'https://discovery.brightspace.com/rels/entitlement-rules'
			],
			href: entitlementHref
		}
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
		{ rel: ['new-rule'], href: newEntityHref }
	]
};
const newEntity = {
	class: ['rule', 'creating'],
	links: [
		{ rel: ['self'], href: newEntityHref }
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
			.mock(newEntityHref, JSON.stringify(newEntity));
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
			el = await createComponentAndWait(html`
				<d2l-discover-rules href="${selfHref}" token="cake"></d2l-discover-rules>
			`);
			clearStore();
		});
		afterEach(() => fetchMock.resetHistory());

		it('commits an action when the dialog is closed', async() => {
			expect(el._hasAction('_createEntitlement')).to.be.true;
			const spy = sinon.spy(el._createEntitlement, 'commit');

			const dialog = el.shadowRoot.querySelector('d2l-discover-rule-picker-dialog');
			await waitUntil(() => dialog._state !== null || dialog._state !== undefined);
			dialog.opened = true;
			await dialog.updateComplete;
			const listener = oneEvent(dialog, 'd2l-discover-rules-changed');
			// click done
			/* eslint no-console: 0 */
			console.log(dialog.shadowRoot.querySelector('d2l-button'));
			dialog.shadowRoot.querySelector('d2l-button[primary]').click();
			await listener;
			const expectedCommit = JSON.stringify([]);
			expect(spy.calledWith(expectedCommit)).to.be.true;
		});
	});

});
