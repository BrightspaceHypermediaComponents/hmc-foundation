import { DescriptionMixin } from './DescriptionMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	checklist: 'https://checklists.api.brightspace.com/rels/checklist-item',
	description: 'https://checklists.api.brightspace.com/rels/description'
});

export class ActivityDescriptionChecklist extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				id:'text',
				observable: observableTypes.property,
				route:[
					{observable: observableTypes.link, rel: rels.checklist},
					{observable: observableTypes.subEntity, rel: rels.description}
				]
			}
		};
	}
}

customHypermediaElement('d2l-activity-description-checklist', ActivityDescriptionChecklist, 'd2l-activity-description', [['user-checklist-activity']]);
