import '@brightspace-ui/core/components/dialog/dialog.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { LitElement } from 'lit-element/lit-element.js';
import { LocalizeDialog } from './lang/localize-dialog.js';

const getType = (classes) => {
	if (classes.includes('learning-path')) return 'learning-path';
	return 'activity-usage';
};

class ActivityDialogLoadFailed extends HypermediaStateMixin(LocalizeDialog(LitElement)) {

	static get properties() {
		return {
			_type: { type: String, observable: observableTypes.classes, method: getType },
			_loadFailureDialogOpen: { type: Boolean }
		};
	}

	render() {
		if (!this._type) return null;

		return html`
		<d2l-dialog title-text="${this.localize(`${this._type}-text-title`)}" ?opened="${this._loadFailureDialogOpen}" @d2l-dialog-close="${this._onDialogClose}">
			<div>${this.localize(`${this._type}-text-content`)}</div>
			<d2l-button slot="footer" primary data-dialog-action="done" @click=${this._attemptLoad}>${this.localize('action-tryagain')}</d2l-button>
			<d2l-button slot="footer" data-dialog-action>${this.localize('action-cancel')}</d2l-button>
		</d2l-dialog>
		`;
	}

	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has('_error') && this._error) {
			this._loadFailureDialogOpen = true;
		}
	}

	_attemptLoad() {
		window.location.reload();
	}

	_onDialogClose() {
		this._loadFailureDialogOpen = false;
	}
}

customElements.define('d2l-activity-dialog-load-failed', ActivityDialogLoadFailed);
