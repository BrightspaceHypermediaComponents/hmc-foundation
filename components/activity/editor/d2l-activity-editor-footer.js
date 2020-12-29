import '@brightspace-ui/core/components/button/button.js';
import 'd2l-activities/components/d2l-activity-editor/d2l-activity-visibility-editor-toggle.js';
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
				padding: 0 0.35rem;
			}
			d2l-activity-visibility-editor-toggle {
				display: inline-block;
			}
		`];
	}

	render() {
		return html`
			<div>
				<d2l-button primary @click="${this._onSaveClick}">${this.localize('action.saveClose')}</d2l-button>
				<d2l-button @click="${this._onCancelClick}">${this.localize('action.cancel')}</d2l-button>
				<d2l-activity-visibility-editor-toggle can-edit-draft></d2l-activity-visibility-editor-toggle>
			</div>
			<div><slot name="save-status">${this.localize('text.saveStatus')}</slot></div>
		`;
	}

	_onSaveClick() {
		this._state.push();
	}

	_onCancelClick() {
		this._state.reset();
	}
}

customElements.define('d2l-activity-editor-footer', ActivityEditorFooter);
