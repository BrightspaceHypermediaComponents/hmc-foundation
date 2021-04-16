import '@brightspace-ui/core/components/link/link.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { img } from './d2l-w2d-empty-state-image.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeDynamicMixin } from '@brightspace-ui/core/mixins/localize-dynamic-mixin.js';

const weekCount = 2;

class w2dNoActivities extends LocalizeDynamicMixin(LitElement) {
	static get properties() {
		return {
			activities: { type: Boolean },
			complete: { type: Boolean },
			dataFullPagePath: { type: String, attribute: 'data-full-page-path' },
			collapse: { type: Boolean }
		};
	}

	static get styles() {
		return [labelStyles,
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
				.d2l-empty-icon {
					max-width: 18rem;
					width: 100%;
				}
				.d2l-link-button {
					border-radius: 0.3rem;
					border-style: none;
					box-shadow: 0 0 0 4px rgba(0, 0, 0, 0);
					box-sizing: border-box;
					cursor: pointer;
					display: inline-block;
					margin: 0;
					min-height: calc(2rem + 2px);
					outline: none;
					text-align: center;
					text-decoration: none;
					-webkit-user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					user-select: none;
					vertical-align: middle;
					white-space: nowrap;
					width: auto;
				}
				.d2l-link-button {
					font-family: inherit;
					padding: 0.55rem 1.5rem;
				}
				/* Firefox includes a hidden border which messes up button dimensions */
				.d2l-link-button::-moz-focus-inner {
					border: 0;
				}
				.d2l-link-button {
					background-color: var(--d2l-color-celestine);
					color: #ffffff;
				}
				.d2l-link-button:hover,
				.d2l-link-button:focus {
					background-color: var(--d2l-color-celestine-minus-1);
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
			<div class="d2l-empty-icon-container d2l-empty-icon">${img}</div>
			${this._renderEmptyViewHeader()}
			${this._renderEmptyViewText()}
			${this._renderEmptyViewButton()}
		</div>`;
	}

	_renderEmptyViewButton() {
		if (!this.activities) {
			return undefined;
		}
		return html`
			<div class="d2l-empty-button-container">
				<a class='d2l-link-button d2l-label-text' href="${this.dataFullPagePath}">
				${this.localize('viewAllWork')}
				</a>
			</div>
		`;

	}

	_renderEmptyViewHeader()  {
		const emptyViewHeader = this.activities ?
			this.localize('xWeeksClear', 'count', weekCount) :
			this.localize('allClear');

		return html`
				<div class="d2l-heading-3 d2l-empty-header-text-container">${emptyViewHeader}</div>
			`;
	}

	_renderEmptyViewText() {

		let emptyViewTextLabel = 'noActivitiesNoFutureActivities';
		if (this.activities && this.complete && this.collapse) {
			emptyViewTextLabel = 'activitiesAvailable';
		} else if (this.activities && this.collapse) {
			emptyViewTextLabel = 'noActivitiesFutureActivities';
		} else if (!this.collapse) {
			emptyViewTextLabel = 'noActivities';
		}

		return html`
			<div class="d2l-body-standard d2l-empty-body-text-container">
				${this.localize(emptyViewTextLabel)}
			</div>
			${!this.collapse ? html`<div class="d2l-body-standard d2l-empty-body-text-container">
			${this.localize('comeBackNoFutureActivities')}</div>` : html``}
			`;
	}

}

customElements.define('d2l-w2d-no-activities', w2dNoActivities);
