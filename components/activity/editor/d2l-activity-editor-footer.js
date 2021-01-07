import '@brightspace-ui/core/components/backdrop/backdrop.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/alert/alert-toast.js';
import '../../common/d2l-activity-visibility.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { LocalizeFoundationEditor } from './lang/localization.js';

class ActivityEditorFooter extends LocalizeFoundationEditor(HypermediaStateMixin(LitElement)) {

	static get styles() {
		return [css`
			:host {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
			}
			d2l-hc-visibility-toggle {
				display: inline-block;
			}
			#target {
				position: relative;
				z-index: 1000;
			}
			d2l-button {
				margin-right: 0.75rem;
			}
		`];
	}

	render() {
		return html`
			<div id="save-buttons">
				<d2l-button primary @click="${this._onSaveClick}">${this.localize('action.saveClose')}</d2l-button>
				<d2l-button @click="${this._onCancelClick}">${this.localize('action.cancel')}</d2l-button>
				<d2l-hc-visibility-toggle  href="${this.href}" .token="${this.token}"></d2l-hc-visibility-toggle>
			</div>
			</div>
			<d2l-alert-toast id="save-succeeded-toast" type="success" announce-text="${this.localize('text.saveComplete')}">
				${this.localize('text.saveComplete')}
			</d2l-alert-toast>
			<div><slot name="save-status">${this.localize('text.saveStatus')}</slot></div>
			<d2l-backdrop id="save-backdrop" for-target="save-buttons"></d2l-backdrop>

			`;
	}

	async _onSaveClick() {
		const backdrop = this.shadowRoot.querySelector('#save-backdrop');
		backdrop.shown = !backdrop.shown;
		await this._state.push();
		this.shadowRoot.querySelector('#save-succeeded-toast').open = true;
		backdrop.shown = !backdrop.shown;
	}

	async _onCancelClick() {
		await this._state.reset();
	}
}

customElements.define('d2l-activity-editor-footer', ActivityEditorFooter);
