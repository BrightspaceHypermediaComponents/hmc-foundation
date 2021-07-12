import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

export class HmcExample extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			// Grab the `name` property from hypermedia response
			name: { type: String, observable: observableTypes.property, name: 'name' },
			// Get the element attribute
			description: { type: String, attribute: 'description'}
		};
	}

	render() {
		return html`<div>
			${this.name}: ${this.description}
		</div>
		`;
	}
}

customHypermediaElement('d2l-hmc-example', HmcExample);
