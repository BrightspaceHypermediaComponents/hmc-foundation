import '@brightspace-ui/core/components/button/button.js';
import '../visibility/d2l-activity-visibility.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

class ActivityEditorFooter extends HypermediaStateMixin(LitElement) {

	static get styles() {
		return [css`
			:host {
				align-items: baseline;
				display: flex;
				justify-content: space-between;
				padding: 0 0.35rem;
			}
			d2l-hc-visibility {
				display: inline-block;
			}
		`];
	}

	render() {
		return html`
			<div>
				<d2l-button primary @click="${this._onSaveClick}">Save and Close</d2l-button>
				<d2l-button @click="${this._onCancelClick}">Cancel</d2l-button>
				<d2l-hc-visibility  href="${this.href}" .token="${this.token}" can-edit-draft></d2l-hc-visibility>
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
