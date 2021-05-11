import '../d2l-discover-rule-picker.js';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
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
const selfHref = 'http://entitlement-rules/picker';
const conditionTypesHref = 'http://condition-types/picker';
const entitlementEntity = {
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
		{ rel: [rels.conditionType], properties: { type: 'Fruit' } },
		{ rel: [rels.conditionType], properties: { type: 'Entree' } }
	],
	links: [
		{ rel: ['self'], href: conditionTypesHref }
	]
};

describe('d2l-discover-rule-picker', () => {
	before(() => {
		fetchMock.mock(selfHref, JSON.stringify(entitlementEntity))
			.mock(conditionTypesHref, JSON.stringify(conditionTypesEntity));
	});

	describe('constructor', () => {
		it('constructs the rule picker component', () => {
			runConstructor('d2l-discover-rule-picker');
		});
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-discover-rule-picker></d2l-discover-rule-picker>`);
			const elFull = await createComponentAndWait(html`
				<d2l-discover-rule-picker href="${selfHref}" token="cake"></d2l-discover-rule-picker>
			`);
			await expect(el).to.be.accessible();
			await expect(elFull).to.be.accessible();
		});
	});

	describe('rendering', () => {
		beforeEach(() => clearStore());
		afterEach(() => fetchMock.resetHistory());

		it('renders the conditionTypes dropdown data', async() => {
			const el = await createComponentAndWait(html`
				<d2l-discover-rule-picker href="${selfHref}" token="cake"></d2l-discover-rule-picker>
			`);

			const conditionDropdown = el.shadowRoot.querySelector('select');
			const conditionPicker = el.shadowRoot.querySelector('d2l-discover-attribute-picker');

			expect(conditionDropdown).to.not.be.null;
			expect(conditionPicker).to.not.be.null;
			expect(conditionDropdown.options.length).to.equal(conditionTypesEntity.entities.length);

			expect(Array.from(conditionDropdown.options).map(option => option.value))
				.to.deep.equal(conditionTypesEntity.entities.map(type => type.properties.type));
		});

		it('renders the initialized conditions', async() => {
			const el = await createComponentAndWait(html`
				<d2l-discover-rule-picker href="${selfHref}" token="cake"></d2l-discover-rule-picker>
			`);
			const ruleIndex = 0;
			el.ruleIndex = 0;
			await el.updateComplete;
			const conditionDropdownList = el.shadowRoot.querySelectorAll('select');
			const conditionPickerList = el.shadowRoot.querySelectorAll('d2l-discover-attribute-picker');
			const rule = entitlementEntity.entities[ruleIndex];

			expect(conditionDropdownList.length).to.equal(rule.entities.length);
			expect(conditionPickerList.length).to.equal(rule.entities.length);

			//Ensure the data in the fields lines up with the passed data
			for (let i = 0 ; i < conditionDropdownList.options; i++) {
				expect(conditionDropdownList[i].value).to.equal(rule.entities[i].properties.type);
				expect(conditionPickerList[i].value).to.equal(rule.entities[i].properties.value);
			}
		});

		it('displays one empty condition by default', async() => {
			const el = await createComponentAndWait(html`
				<d2l-discover-rule-picker href="${selfHref}" token="cake"></d2l-discover-rule-picker>
			`);

			const conditionDropdownList = el.shadowRoot.querySelectorAll('select');
			const conditionPickerList = el.shadowRoot.querySelectorAll('d2l-discover-attribute-picker');

			expect(conditionDropdownList.length).to.equal(1);
			expect(conditionPickerList.length).to.equal(1);
		});
	});

	describe('interaction', () => {
		let el;
		beforeEach(async() => {
			clearStore();
			el = await createComponentAndWait(html`
				<d2l-discover-rule-picker href="${selfHref}" token="cake"></d2l-discover-rule-picker>
			`);
		});

		it('should add a new condition when the Add Condition button is pressed', async() => {
			const addButton = el.shadowRoot.querySelector('#add-another-condition-button');
			addButton.click();
			await el.updateComplete;

			const conditionDropdownList = el.shadowRoot.querySelectorAll('select');
			const conditionPickerList = el.shadowRoot.querySelectorAll('d2l-discover-attribute-picker');
			expect(conditionDropdownList.length).to.equal(2);
			expect(conditionPickerList.length).to.equal(2);
		});

		it('updates the condition information when a new attribute is added', async() => {
			el.conditions = [
				{ properties: { type: 'Fruit', values: ['Banana'] } }
			];
			await el.updateComplete;
			const discoverPicker = el.shadowRoot.querySelector('d2l-discover-attribute-picker');
			await waitUntil(() => discoverPicker.attributeList && discoverPicker.attributeList.length > 0, 'attributeList not initialized');

			discoverPicker.attributeList.push('Zebra');
			await el.updateComplete;

			expect(el.conditions[0].properties.values[0]).to.equal('Banana');
			expect(el.conditions[0].properties.values[1]).to.equal('Zebra');
		});

		it('updates the condition information when the dropdown field is modified', async() => {
			const conditionSelect = el.shadowRoot.querySelector('select');
			const newType = 'Entree';
			expect(el.conditions[0].properties.type).does.not.equal(newType);

			// safari is rude
			await waitUntil(() => {
				const attributePicker = el.shadowRoot.querySelector('d2l-discover-attribute-picker');
				return attributePicker !== null &&
					attributePicker.shadowRoot.querySelector('d2l-labs-attribute-picker') !== null &&
					attributePicker.shadowRoot.querySelector('d2l-labs-attribute-picker')
						.shadowRoot.querySelector('input') !== null;;
			});

			const listener = oneEvent(conditionSelect, 'change');
			conditionSelect.value = newType;
			setTimeout(() => {
				const event = document.createEvent('Events');
				event.initEvent('change', true, true);
				conditionSelect.dispatchEvent(event);
			});
			await listener;

			expect(el.conditions[0].properties.type).to.equal(newType);
		});

		it('displays the condition deletion button only if there is greater than one condition', async() => {
			let deleteButtonList = el.shadowRoot.querySelectorAll('.delete-condition-button');
			expect(deleteButtonList.length).to.be.equal(1);
			expect(deleteButtonList[0].hasAttribute('hidden')).to.be.true;
			// add new conditions
			const newConditions = [
				{ properties: { type: 'entree', values: ['spaghetti'] } },
				{ properties: { type: 'dessert', values: ['cake', 'pie'] } }
			];
			el.reload(newConditions);
			await el.updateComplete;

			deleteButtonList = el.shadowRoot.querySelectorAll('.delete-condition-button');
			expect(deleteButtonList.length).to.be.equal(2);
			expect(deleteButtonList[0].hasAttribute('hidden')).to.be.false;
		});

		describe('deletion', () => {
			beforeEach(async() => {
				clearStore();
				el = await createComponentAndWait(html`
					<d2l-discover-rule-picker href="${selfHref}" token="cake"></d2l-discover-rule-picker>
				`);
				el.conditions = [
					{ properties: { type: 'Entree', values: ['spaghetti'] } },
					{ properties: { type: 'Fruit', values: ['cake', 'pie'] } },
					{ properties: { type: 'Fruit', values: ['lemonade'] } }
				];
				await el.updateComplete;
			});

			const deletionTests = [
				{
					description: 'displays the condition information when the first condition has been deleted.',
					index: 0
				},
				{
					description: 'displays the condition information when the last condition has been deleted.',
					index: 2
				},
				{
					description: 'displays the condition information when the middle condition has been deleted.',
					index: 1
				}
			];
			for (const test of deletionTests) {
				it(test.description, async() => {
					const deleteButtonList = el.shadowRoot.querySelectorAll('.delete-condition-button');
					const newConditions = [...el.conditions];
					newConditions.splice(test.index, 1);

					deleteButtonList[test.index].click();
					await el.updateComplete;
					const conditionDropdownList = el.shadowRoot.querySelectorAll('select');
					const conditionPickerList = el.shadowRoot.querySelectorAll('d2l-discover-attribute-picker');
					await conditionPickerList.updateComplete;
					await oneEvent(el, 'd2l-rule-condition-removed');

					expect(el.conditions.length).to.equal(newConditions.length);
					expect(el.conditions).to.deep.equal(newConditions);
					for (let i = 0 ; i < el.conditions.length; i++) {
						//Ensure user facing data matches expected results
						expect(conditionDropdownList[i].value).to.equal(newConditions[i].properties.type);
						expect(conditionPickerList[i].attributeList).to.equal(newConditions[i].properties.values);
					}
				});
			}

		});

	});
});
