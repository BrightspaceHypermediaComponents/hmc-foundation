import '@brightspace-ui/core/components/alert/alert-toast.js';
import '@brightspace-ui/core/components/backdrop/backdrop.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '../../common/d2l-activity-visibility.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LocalizeFoundationEditor } from './lang/localization.js';

class ActivityEditorFooter extends LocalizeFoundationEditor(HypermediaStateMixin(LitElement)) {

	static get properties() {
		return {
			up: { type: Object, observable: observableTypes.link, rel: 'up'},
			_backdropOpen: { type: Boolean },
			_dialogOpen: { type: Boolean },
			_toastOpen: { type: Boolean }
		};
	}

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
				<d2l-button primary @click="${this._onSaveClick}" ?disabled="${!this._loaded}">${this.localize('action-saveClose')}</d2l-button>
				<d2l-button @click="${this._onCancelClick}" ?disabled="${!this._loaded}">${this.localize('action-cancel')}</d2l-button>
				<d2l-hc-visibility-toggle  href="${this.href}" .token="${this.token}" ?disabled="${!this._loaded}"></d2l-hc-visibility-toggle>
			</div>

			<d2l-alert-toast id="save-succeeded-toast" ?open="${this._toastOpen}" type="success"
				announce-text="${this.localize('text-saveComplete')}">
					${this.localize('text-saveComplete')}
			</d2l-alert-toast>

			<d2l-backdrop id="save-backdrop" for-target="#save-buttons" no-animate-hide ?shown="${this._backdropOpen}"></d2l-backdrop>
			<d2l-dialog id="save-failed-dialog" ?opened="${this._dialogOpen}" @d2l-dialog-close="${this._closeDialog}" title-text="${this.localize('text-dialogSaveTitle')}">
				<div>${this.localize('text-dialogSaveContent')}</div>
				<d2l-button slot="footer" primary data-dialog-action="okay">${this.localize('label-ok')}</d2l-button>
			</d2l-dialog>
			`;
	}

	_closeDialog() {
		this._dialogOpen = false;
		this._backdropOpen = false;
	}

	async _onSaveClick() {
		this._backdropOpen = true;
		try {
			await this.updateComplete;
			await this._state.push();
		} catch (err) {
			this._dialogOpen = true;
			return;
		}

		this._toastOpen = true;
		this._backdropOpen = false;

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
