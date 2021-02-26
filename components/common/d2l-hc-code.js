import { css, html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

class HmCode extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			code: { type: String, observable: observableTypes.property }
		};
	}

	static get styles() {
		return [css``];
	}

	render() {
		return html`${this.code}`;
	}

}
customElements.define('d2l-hc-code', HmCode);
