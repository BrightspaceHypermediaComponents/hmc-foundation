import '../../../common/d2l-hc-name.js';
import { LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	checklist: 'https://checklists.api.brightspace.com/rels/checklist-item'
});

export class ActivityNameChecklist extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_checklistHref: { type: String, observable: observableTypes.link, rel: rels.checklist, prime: true }
		};
	}

	render() {
		return html`
			<d2l-hc-name href="${this._checklistHref}" .token="${this.token}"></d2l-hc-name>
		`;
	}

}

customHypermediaElement('d2l-activity-name-checklist', ActivityNameChecklist, 'd2l-activity-name', [['user-checklist-activity']]);
