import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from 'foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from 'foundation-engine/framework/lit/hypermedia-components.js';

class HmName extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			name: { type: String, observable: observableTypes.property }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			${this.name}
		`;
	}

}
customElements.define('d2l-hm-name', HmName);
