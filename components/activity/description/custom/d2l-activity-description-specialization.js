import { DescriptionMixin } from './DescriptionMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityDescriptionSpecialization extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				observable: observableTypes.property,
				route:[{observable: observableTypes.link, rel: rels.specialization}]
			}
		};
	}
}

customHypermediaElement('d2l-activity-description-specialization', ActivityDescriptionSpecialization, 'd2l-activity-description', [['activity-usage']]);
