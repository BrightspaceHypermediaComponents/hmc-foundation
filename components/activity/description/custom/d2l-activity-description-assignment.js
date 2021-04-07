import { DescriptionMixin } from './DescriptionMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	assignment: 'https://api.brightspace.com/rels/assignment'
});

export class ActivityDescriptionAssignment extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				id:'instructionsText',
				observable: observableTypes.property,
				route:[{observable: observableTypes.link, rel: rels.assignment}]
			}
		};
	}
}

customHypermediaElement('d2l-activity-description-assignment', ActivityDescriptionAssignment, 'd2l-activity-description', [['user-assignment-activity']]);
