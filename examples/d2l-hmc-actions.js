import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

export class HmcActions extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			title: { type: String, observable: observableTypes.property, name: 'title' },
			updateTitle: { type: Object, observable: observableTypes.action, name: 'update-title' }
		};
	}

	render() {
		return html`<div>
			<d2l-input-text
				id="d2l-title-input"
				label="Title"
				placeholder="Enter some text"
				value="${this.title}"
				@input="${this._onInputTitle}"
			></d2l-input-text>
		</div>
		<div>
			<d2l-button primary @click="${this._onSaveClick}">Save</d2l-button>
		</div>
		`;
	}

	_onInputTitle(e) {
		if (this._hasAction('updateTitle')) {
			// The value is saved locally
			// The browser network tab should show that the action href was not called
			this.updateTitle.commit({ title: { observable: observableTypes.property, value: e.target.value } });
		}
	}

	async _onSaveClick() {
		if (this._hasAction('updateTitle')) {
			// the saved state is now pushed to the action href
			// The browser network tab should show that the action href was called for this action
			await this._state.push();
		}
	}
}

customHypermediaElement('d2l-hmc-actions', HmcActions);
