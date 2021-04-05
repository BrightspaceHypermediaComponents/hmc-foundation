import '@brightspace-ui/core/components/button/button.js';

import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

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
				#empty-icon {
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
				<d2l-work-to-do-empty-state-image id="empty-icon"></d2l-work-to-do-empty-state-image>
			</div>
			${this.emptyViewHeaderTemplate()}
			${this.emptyViewTextTemplate()}
			${this.emptyViewButtonTemplate()}
		</div>`;
	}

	emptyViewButtonTemplate() {
		if (this.activities) {
			return html `
				<div class="d2l-empty-button-container">
					<d2l-button primary>
					${this.localize('viewAllWork')}
					</d2l-button>
				</div>
			`;
		}

		return html``;
	}

	emptyViewHeaderTemplate()  {
		const emptyViewHeader = this.activities ?
			this.localize('xWeeksClear', 'count', 2) :
			this.localize('allClear');

		return html`
				<div class="d2l-heading-3 d2l-empty-header-text-container">
					${emptyViewHeader}
				</div>
			`;
	}

	emptyViewTextTemplate() {
		// taken from activities repo
		// just commenting as this might be needed somewhere?
		// if (this.fullscreen) {
		// 	return html`
		// 		<div class="d2l-body-standard d2l-empty-body-text-container">
		// 			${this.localize('noActivities')}
		// 		</div>
		// 		<div class="d2l-body-standard d2l-empty-body-text-container">
		// 			${this.localize('comeBackNoFutureActivities')}
		// 		</div>
		// 	`;
		// }

		let emptyViewText;
		if (this.activities && this.complete) {
			emptyViewText = this.localize('activitiesAvailable');
		} else if (this.activities) {
			emptyViewText = this.localize('noActivitiesFutureActivities');
		} else {
			emptyViewText = this.localize('noActivitiesNoFutureActivities');
		}

		return html`
			<div class="d2l-body-standard d2l-empty-body-text-container">
				${emptyViewText}
			</div>
		`;
	}

}

customElements.define('d2l-w2d-no-activities', w2dNoActivities);
