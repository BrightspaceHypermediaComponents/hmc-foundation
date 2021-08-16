import '../d2l-discover-rule-card-match-info.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

const rels = Object.freeze({
	condition: 'https://discovery.brightspace.com/rels/condition',
	rule: 'https://discovery.brightspace.com/rels/rule',
});

const ruleOne =  {
	entities: [
		{ properties: { type: 'Fruit', values: ['apple', 'orange'] }, rel: [rels.condition] },
		{ properties: { type: 'Entree', values: ['spaghetti'] }, rel: [rels.condition] }
	],
	properties: {
		matchCount: 2,
		userList: ['userHref1', 'userHref2'],
	},
	rel: [rels.rule],

};
const ruleTwo =  {
	entities: [
		{ properties: { type: 'Fruit', values: ['lemon', 'lime'] }, rel: [rels.condition] },
		{ properties: { type: 'Entree', values: ['salad'] }, rel: [rels.condition] }
	],
	properties: {
		matchCount: 50,
		userList: ['userHref1', 'userHref2', 'userHref3'],
	},
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
				<d2l-discover-rule-card-match-info .rule="${ruleOne}" token="cake"></d2l-discover-rule-card-match-info>
			`);
			await expect(el).to.be.accessible();
			await expect(elFull).to.be.accessible();
		});
	});

	describe('rendering', () => {
		let el;
		beforeEach(async() => {
			el = await fixture(html`
				<d2l-discover-rule-card-match-info .rule="${ruleOne}" token="cake"></d2l-discover-rule-card-match-info>
			`);
		});
		afterEach(async() => {
			el = null;
		});

		it('Updates the match info based on the rule', async() => {
			let profileImages = el.shadowRoot.querySelectorAll('d2l-profile-image');
			let moreProfilesIcon = el.shadowRoot.querySelector('.d2l-rule-card-profile-images-more');
			expect(el._matchCount).to.equal(2);
			expect(profileImages.length).to.equal(2);
			expect(moreProfilesIcon).to.be.null;

			el.rule = ruleTwo;
			await el.updateComplete;

			profileImages = el.shadowRoot.querySelectorAll('d2l-profile-image');
			moreProfilesIcon = el.shadowRoot.querySelector('.d2l-rule-card-profile-images-more');
			expect(el._matchCount).to.equal(50);
			expect(profileImages.length).to.equal(3);
			expect(moreProfilesIcon).to.not.be.null;
		});
	});
});
