import '../../../common/d2l-hc-name.js';
import { LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	assignment: 'https://api.brightspace.com/rels/assignment'
});

export class ActivityNameAssignment extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_assignmentHref: { type: String, observable: observableTypes.link, rel: rels.assignment, prime: true }
		};
	}

	render() {
		return html`
			<d2l-hc-name href="${this._assignmentHref}" .token="${this.token}"></d2l-hc-name>
		`;
	}

}

customHypermediaElement('d2l-activity-name-assignment', ActivityNameAssignment, 'd2l-activity-name', [['user-assignment-activity']]);
