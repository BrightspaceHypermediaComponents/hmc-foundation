import '../d2l-lti-activity.js';
import { expect, fixture, html } from '@open-wc/testing';
import { clearStore } from '@brightspace-hmc/foundation-engine/state/HypermediaState.js';
import { createComponentAndWait } from '../../../test/test-util';
import { default as fetchMock } from 'fetch-mock/esm/client';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper';
import { default as sinon } from 'sinon/pkg/sinon-esm.js';

const rels = Object.freeze({
	linkPlacement: 'https://lti.api.brightspace.com/rels/link-placement',
	activityUsage:  'https://activities.api.brightspace.com/rels/activity-usage'
});

const selfHref = 'http://lti-activity/1';
const ltiPlacementHref = 'http://lti-placement/1';

const activityUsageEntity = {
	class: ['activity-usage', 'lti-activity'],
	links: [
		{ rel: ['self', rels.activityUsage], href: selfHref },
		{ rel: ['lti-link', rels.linkPlacement], href: ltiPlacementHref }
	]
};

const ltiPlacementEntity = {
	class: [
		'named-entity',
		'describable-entity',
		'lti-link'
	],
	properties: {
		'name': 'What is the capital of Canada?',
		'description': 'Multiple Choice',
		'providerName': 'H5P',
		'launchUrl': 'http://example.com/',
		'iFrameWidth': '700',
		'iFrameHeight': '400'
	},
	links: [
		{ rel: ['self'], href: ltiPlacementHref }
	]
};

const spy = sinon.spy(window, 'open');

describe('d2l-lti-activity', () => {
	describe('constructor', () => {
		it('constructs the lti activity component', () => {
			runConstructor('d2l-lti-activity');
		});
	});

	before(() => {
		fetchMock.mock(selfHref, JSON.stringify(activityUsageEntity))
			.mock(ltiPlacementHref, JSON.stringify(ltiPlacementEntity));
	});

	describe('accessibility', () => {
		it('should pass all aXe tests', async() => {
			const el = await fixture(html`<d2l-lti-activity></d2l-lti-activity>`);
			await expect(el).to.be.accessible();
		});
	});

	describe('iframe functionality', () => {
		let element;
		beforeEach(async() => {
			clearStore();
			element = await createComponentAndWait(html`
				<d2l-lti-activity href="${selfHref}" token="cake"></d2l-lti-activity>
			`);
		});

		afterEach(() => {
			fetchMock.resetHistory();
			sinon.reset();
		});

		it ('launch in iFrame', async() => {
			expect(element.shadowRoot.querySelector('iframe').src).equals(ltiPlacementEntity.properties.launchUrl);
		});
		it ('launch in new window subtle button', () => {
			const openInNewWindowButton = element.shadowRoot.querySelector('d2l-button-subtle');
			openInNewWindowButton.click();
			sinon.assert.calledOnce(spy);
		});
		it ('does not include description', async() => {
			expect(element.shadowRoot.querySelector('d2l-hc-description')).to.be.null;
		});
	});

	describe('open as external functionality', () => {
		let element;
		beforeEach(async() => {
			clearStore();
			element = await createComponentAndWait(html`
				<d2l-lti-activity href="${selfHref}" token="cake" open-as-external></d2l-lti-activity>
			`);
		});
		afterEach(() => {
			fetchMock.resetHistory();
			sinon.reset();
		});
		it ('no iframe launch', async() => {
			expect(element.shadowRoot.querySelector('iframe')).to.be.null;
		});
		it ('launch in new window button', () => {
			const openInNewWindowButton = element.shadowRoot.querySelector('d2l-button[primary]');
			openInNewWindowButton.click();
			sinon.assert.calledOnce(spy);
		});
		it ('includes description', async() => {
			expect(element.shadowRoot.querySelector('d2l-hc-description')).to.not.be.null;
		});
	});
});
