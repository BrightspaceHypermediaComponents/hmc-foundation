import { DescriptionMixin } from './DescriptionMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	organization: 'https://api.brightspace.com/rels/organization'
});

class ActivityDescriptionCourse extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				observable: observableTypes.property,
				route:[{observable: observableTypes.link, rel: rels.organization}]
			}
		};
	}
}

customHypermediaElement('d2l-activity-description-course', ActivityDescriptionCourse, 'd2l-activity-description', [['activity-usage', 'course-offering'], ['user-course-offering-activity-usage']]);
