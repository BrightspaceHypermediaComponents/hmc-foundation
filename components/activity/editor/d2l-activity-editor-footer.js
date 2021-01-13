import '@brightspace-ui/core/components/backdrop/backdrop.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/alert/alert-toast.js';
import '../../common/d2l-activity-visibility.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LocalizeFoundationEditor } from './lang/localization.js';

class ActivityEditorFooter extends LocalizeFoundationEditor(HypermediaStateMixin(LitElement)) {

	static get properties() {
		return {
			up: { type: Object, observable: observableTypes.link, rel: 'up'}
		};
	}

	static get styles() {
		return [css`
			:host {
				align-items: baseline;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				max-width: 1230px;
			}
			.d2l-activity-editor-save-buttons-visibility {
				display: inline-block;
				margin-left: 0.6rem;
				width: 120px;
			}
			.d2l-activity-editor-save-button {
				margin-right: 0.4rem;
			}
			.d2l-activity-editor-save-buttons {
				display: flex;
			}
			@media only screen and (min-width: 650px) {
				.d2l-activity-editor-save-buttons-visibility {
					width: 300px;
				}
			}
		`];
	}

	constructor() {
		super();
		this.saveSucceededToast = getUniqueId();
		this.saveBackdrop = getUniqueId();
		this.saveButtons = getUniqueId();
	}

	render() {
		return html`
			<div class="d2l-activity-editor-save-buttons" id="${this.saveButtons}">
				<d2l-button class="d2l-activity-editor-save-button" primary @click="${this._onSaveClick}" ?disabled="${!this._loaded}">${this.localize('action-saveClose')}</d2l-button>
				<d2l-button class="d2l-activity-editor-save-button" @click="${this._onCancelClick}" ?disabled="${!this._loaded}">${this.localize('action-cancel')}</d2l-button>
				<d2l-hc-visibility-toggle class="d2l-activity-editor-save-buttons-visibility" href="${this.href}" .token="${this.token}" ?disabled="${!this._loaded}"></d2l-hc-visibility-toggle>
			</div>
			<d2l-alert-toast id="${this.saveSucceededToast}" type="success" announce-text="${this.localize('text-saveComplete')}">
				${this.localize('text-saveComplete')}
			</d2l-alert-toast>
			<d2l-backdrop id="${this.saveBackdrop}" for-target="${this.saveButtons}" no-animate-hide></d2l-backdrop>
		`;
	}

	async _onSaveClick() {
		const backdrop = this.shadowRoot.querySelector(`#${this.saveBackdrop}`);
		backdrop.shown = !backdrop.shown;
		await this.updateComplete;
		await this._state.push();

		this.shadowRoot.querySelector(`#${this.saveSucceededToast}`).open = true;
		backdrop.shown = !backdrop.shown;

		this._pageRedirect();
	}

	_onCancelClick() {
		this._state.reset();
		this._pageRedirect();
	}

	_pageRedirect() {
		if (this.up) {
			window.location.href = this.up;
		}
	}
}

customElements.define('d2l-activity-editor-footer', ActivityEditorFooter);
