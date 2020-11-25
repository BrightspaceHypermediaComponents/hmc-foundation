import '@brightspace-ui/core/components/button/button.js';
import 'd2l-activities/components/d2l-activity-editor/d2l-activity-visibility-editor-toggle.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

class ActivityEditorFooter extends HypermediaStateMixin(LitElement) {

	static get styles() {
		return [css`
			:host {
				display: flex;
				justify-content: space-between;
				padding: 0 20px;
			}
			d2l-button {
				margin-bottom: 0.5rem;
			}
			d2l-activity-visibility-editor-toggle {
				display: inline-block;
			}
		`];
	}

	render() {
		return html`
			<div>
				<d2l-button primary @click="${this._onSaveClick}">Save and Close</d2l-button>
				<d2l-button @click="${this._onCancelClick}">Cancel</d2l-button>
				<d2l-activity-visibility-editor-toggle can-edit-draft></d2l-activity-visibility-editor-toggle>
			</div>
			<div><slot name="save-status">Save status</slot></div>
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
