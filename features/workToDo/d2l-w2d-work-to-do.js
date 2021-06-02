import './d2l-w2d-collections.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-navigation/d2l-navigation-immersive';
import { bodyStandardStyles, heading1Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

const rel = Object.freeze({
	myActivities: 'https://activities.api.brightspace.com/rels/my-activities#empty',
	myOrganizationActivities: 'https://activities.api.brightspace.com/rels/my-organization-activities#empty',
	organization: 'https://api.brightspace.com/rels/organization',
	organizationHomepage: 'https://api.brightspace.com/rels/organization-homepage',
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage',
	overdue: 'https://activities.api.brightspace.com/rels/overdue',
	root: 'https://api.brightspace.com/rels/root'
});

class w2dWorkToDo extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			allowUnclickableActivities: { type: Boolean, attribute: 'allow-unclickable-activities' },
			currentTime: { type: String, attribute: 'current-time' },
			collapsed: { type: Boolean },
			dataFullPagePath: { type: String, attribute: 'data-full-page-path' },
			groupByDays: { type: Number, attribute: 'group-by-days' },
			useFirstName: { type: Boolean, attribute: 'use-first-name' },
			startDate: { type: String, attribute: 'start-date' },
			endDate: { type: String, attribute: 'end-date' },
			overdueWeekLimit: { type: Number, attribute: 'data-overdue-week-limit' },
			_myActivitiesHref: { type: String, observable: observableTypes.link, rel: rel.myActivities, prime: true },
			_myOrganizationActivitiesHref: { type: String, observable: observableTypes.link, rel: rel.myOrganizationActivities, prime: true },
			_organizationHompage: { type: String, observable: observableTypes.link, rel: rel.organizationHomepage },
			_rootHomepage: {
				type: String,
				observable: observableTypes.link,
				rel: rel.organizationHomepage,
				route: [
					{observable: observableTypes.link, rel: rel.root},
					{observable: observableTypes.link, rel: rel.organization}
				]
			}
		};
	}

	static get styles() {
		return [bodyStandardStyles, heading1Styles, css`
			:host {
				display: block;
				position: relative;
			}
			:host([hidden]) {
				display: none;
			}
			:host(:not([collapsed])) {
				margin: auto;
				max-width: 1230px;
				padding: 0 52px;
			}
			.d2l-w2d-flex {
				align-items: center;
				border-bottom: 2px solid var(--d2l-color-mica);
				display: flex;
				justify-content: space-between;
				padding: 0 0 0.35rem 0;
			}
			.d2l-w2d-heading-1 {
				margin: 1.75rem 0 0 0;
			}
		`];
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	constructor() {
		super();
		this.collapsed = false;
	}

	get collapsed() {
		return this._collapsed;
	}

	set collapsed(collapsed) {
		const oldValue = this._collapsed;
		this._collapsed = collapsed;
		this._overdueGroupByDays = collapsed ? 0 : 1;
		this.requestUpdate('collapsed', oldValue);
		if (collapsed) {
			sessionStorage.setItem('d2l.workToDo.prevPage', window.location.href);
		}
	}

	render() {
		const immersiveNav = this.collapsed
			? null
			: html`
				<d2l-navigation-immersive back-link-href="${this._getHomeHref()}" back-link-text="${this.localize('backToD2L')}" width-type="normal"></d2l-navigation-immersive>
			`;
		const workToDoHeader = this.collapsed
			? null
			: html`
				<h1 class="d2l-w2d-heading-1 d2l-heading-1">
					${this.localize('workToDo')}
				</h1>
			`;
		return html`
			${immersiveNav}
			${workToDoHeader}
			<d2l-w2d-collections
				href="${this._myActivitiesHref ? this._myActivitiesHref : this._myOrganizationActivitiesHref}"
				.token="${this.token}"
				?collapsed="${this.collapsed}"
				group-by-days="${this.groupByDays}"
				overdue-group-by-days="${ifDefined(this._overdueGroupByDays)}"
				current-time="${this.currentTime}"
				start-date="${this.startDate}"
				end-date="${this.endDate}"
				data-full-page-path=${ifDefined(this.dataFullPagePath)}
				?use-first-name=${this.useFirstName}
				overdue-day-limit="${this.overdueWeekLimit * 7}"
				?skeleton="${!this._loaded}"
				user-url="${this.href}"
				?allow-unclickable-activities="${this.allowUnclickableActivities}"></d2l-w2d-collections>
		`;
	}

	_getHomeHref() {
		if (!this.collapsed) {
			const prevPage = sessionStorage.getItem('d2l.workToDo.prevPage');
			if (prevPage && (new URL(prevPage)).hostname === window.location.hostname) {
				return  prevPage;
			}
		}

		return this._organizationHompage ? this._organizationHompage : this._rootHomepage;
	}
}

customElements.define('d2l-w2d-work-to-do', w2dWorkToDo);
