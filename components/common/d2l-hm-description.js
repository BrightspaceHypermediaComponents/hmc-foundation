import { css, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes} from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

class HmDescription extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			description: { type: String, observable: observableTypes.property }
		};
	}

	static get styles() {
		return [ css`` ];
	}

	render() {
		return html`
			${this.description}
		`;
	}

}
customElements.define('d2l-hm-description', HmDescription);
