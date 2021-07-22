import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

const rels = {
	desiredLinkRel: 'namedEntity'
};

export class HmcRoutingExample extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			// Get the property from a linked entity
			name: { type: String, observable: observableTypes.property, name: 'name', route: [{observable: observableTypes.link, rel: rels.desiredLinkRel}] },
		};
	}

	render() {
		return html`<div>Linked Entity's Name: ${this.name}</div>`;
	}
}

customHypermediaElement('d2l-hmc-routing', HmcRoutingExample);
