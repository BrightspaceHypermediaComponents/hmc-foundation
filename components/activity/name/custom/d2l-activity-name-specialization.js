import '../../../common/d2l-hc-name.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { ifDefined } from 'lit-html/directives/if-defined';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityNameSpecialization extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_specializationHref: { type: String, observable: observableTypes.link, rel: rels.specialization, prime: true }
		};
	}

	render() {
		return html`
			<d2l-hc-name href="${ifDefined(this._specializationHref)}" .token="${this.token}"></d2l-hc-name>
		`;
	}

}

customHypermediaElement(
	'd2l-activity-name-specialization',
	ActivityNameSpecialization,
	'd2l-activity-name',
	[['activity-usage']]);
