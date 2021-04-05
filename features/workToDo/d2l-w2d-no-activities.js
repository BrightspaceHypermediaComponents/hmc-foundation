import '@brightspace-ui/core/components/button/button.js';
import './d2l-w2d-empty-state-image.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

const weekCount = 2;

class w2dNoActivities extends LocalizeDynamicMixin(HypermediaStateMixin(LitElement)) {
	static get properties() {
		return {
			activities: { type: Boolean },
			complete: { type: Boolean }
		};
	}

	static get styles() {
		return [
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-empty-template {
					margin-left: auto;
					margin-right: auto;
				}
				.d2l-empty-icon-container {
					display: flex;
					justify-content: center;
					margin: 1.6rem auto 0 auto;
				}
				.d2l-empty-header-text-container,
				.d2l-empty-body-text-container {
					display: block;
					text-align: center;
					width: 100%;
				}
				.d2l-empty-header-text-container {
					margin: 1.2rem auto 0.3rem auto;
				}
				.d2l-empty-body-text-container {
					margin: 0 auto 0.9rem auto;
				}
				.d2l-empty-button-container {
					display: flex;
					justify-content: center;
					width: 100%;
				}
				.empty-icon {
					max-width: 18rem;
					width: 100%;
				}
			`
		];
	}

	static get localizeConfig() {
		return {
			importFunc: async lang => (await import(`./lang/${lang}.js`)).default
		};
	}

	render() {
		return html`
		<div class="d2l-empty-template">
			<div class="d2l-empty-icon-container">
				<d2l-work-to-do-empty-state-image class="empty-icon"></d2l-work-to-do-empty-state-image>
			</div>
			${this.renderEmptyViewHeader()}
			${this.renderEmptyViewText()}
			${this.renderEmptyViewButton()}
		</div>`;
	}

	renderEmptyViewButton() {
		if (!this.activities) {
			return undefined;
		}
		return html `
			<div class="d2l-empty-button-container">
				<d2l-button primary>
				${this.localize('viewAllWork')}
				</d2l-button>
			</div>
		`;

	}

	renderEmptyViewHeader()  {
		const emptyViewHeader = this.activities ?
			this.localize('xWeeksClear', 'count', weekCount) :
			this.localize('allClear');

		return html`
				<div class="d2l-heading-3 d2l-empty-header-text-container">${emptyViewHeader}</div>
			`;
	}

	renderEmptyViewText(collapse) {

		let emptyViewTextLabel = 'noActivitiesNoFutureActivities';
		if (this.activities && this.complete) {
			emptyViewTextLabel = 'activitiesAvailable';
		} else if (this.activities) {
			emptyViewTextLabel = 'noActivitiesFutureActivities';
		} else if (!collapse) {
			emptyViewTextLabel = 'noActivities';
		}

		return html`
			<div class="d2l-body-standard d2l-empty-body-text-container">
				${this.localize(emptyViewTextLabel)}
			</div>
			${!collapse ? html`<div class="d2l-body-standard d2l-empty-body-text-container">
			${this.localize('comeBackNoFutureActivities')}</div>` : html``}
			`;
	}

}

customElements.define('d2l-w2d-no-activities', w2dNoActivities);
