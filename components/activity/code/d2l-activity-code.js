import '../../common/d2l-hc-code.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

export class ActivityCode extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			_organizationHref: { type: String, observable: observableTypes.link, rel: rels.organization, prime: true }
		};
	}

	render() {
		return html`<d2l-hc-code href="${this._organizationHref}" .token="${this.token}"></d2l-hc-code>`;
	}
}

customHypermediaElement('d2l-activity-code', ActivityCode);
