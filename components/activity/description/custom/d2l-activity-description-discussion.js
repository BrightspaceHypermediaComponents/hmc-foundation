import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { DescriptionMixin } from './DescriptionMixin.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	description: 'https://discussions.api.brightspace.com/rels/description',
	topic: 'https://discussions.api.brightspace.com/rels/topic'
});

export class ActivityDiscussionAssignment extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				id: 'text',
				observable: observableTypes.property,
				route:[
					{observable: observableTypes.link, rel: rels.topic},
					{observable: observableTypes.subEntity, rel: rels.description}
				]
			}
		};
	}
}

customHypermediaElement('d2l-activity-description-discussion', ActivityDiscussionAssignment, 'd2l-activity-description', [['user-discussion-activity']]);
