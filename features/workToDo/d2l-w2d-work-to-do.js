import './d2l-w2d-collections.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/link/link.js';
import 'd2l-navigation/d2l-navigation-immersive';
import { bodyStandardStyles, heading1Styles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

const rel = Object.freeze({
	myActivities: 'https://activities.api.brightspace.com/rels/my-activities#empty',
	userActivity: 'https://activities.api.brightspace.com/rels/user-activity-usage',
	overdue: 'https://activities.api.brightspace.com/rels/overdue'
});

class w2dWorkToDo extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			currentTime: { type: String, attribute: 'current-time' },
			collapsed: { type: Boolean },
			dataFullPagePath: { type: String, attribute: 'data-full-page-path' },
			fullscreen: { type: String, attribute: 'data-fullscreen' },
			groupByDays: { type: Number, attribute: 'group-by-days' },
			_myActivitiesHref: { type: String, observable: observableTypes.link, rel: rel.myActivities, prime: true }
		};
	}

	static get styles() {
		return [bodyStandardStyles, heading1Styles, css`
			:host {
				display: block;
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
				margin-top: 1.75rem;
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

	get fullscreen() {
		return !this.collapsed;
	}

	set fullscreen(isFullscreen) {
		this.collapsed = isFullscreen !== 'True';
	}

	render() {
		const immersiveNav = this.collapsed
			? null
			: html`
				<d2l-navigation-immersive back-link-href="#" back-link-text="${this.localize('backToD2L')}" width-type="normal">
					<div slot="middle" class="d2l-w2d-flex d2l-body-standard">${this.localize('myWorkToDo')}</div>
				</d2l-navigation-immersive>
			`;
		const workToDoHeader = this.collapsed
			? null
			: html`
				<h1 class="d2l-w2d-heading-1">
					${this.localize('workToDo')}
				</h1>
			`;
		return html`
			${immersiveNav}
			${workToDoHeader}
			<d2l-w2d-collections
				href="${this._myActivitiesHref}"
				.token="${this.token}"
				?collapsed="${this.collapsed}"
				group-by-days="${this.groupByDays}"
				current-time="${this.currentTime}"
				start-date="2021-04-13T17:02:08.559Z"
				end-date="2021-04-20T17:02:08.559Z"></d2l-w2d-collections>
			${this.dataFullPagePath && this._loaded && this.collapsed ? html`<d2l-link href="${this.dataFullPagePath}">${this.localize('fullViewLink')}</d2l-link>` : null}
		`;
	}

}

customElements.define('d2l-w2d-work-to-do', w2dWorkToDo);
