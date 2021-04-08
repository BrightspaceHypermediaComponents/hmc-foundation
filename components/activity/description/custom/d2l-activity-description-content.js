import { DescriptionMixin } from './DescriptionMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	content: 'https://api.brightspace.com/rels/content',
	description: 'https://sequences.api.brightspace.com/rels/description'
});

export class ActivityDescriptionContent extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				id: 'text',
				observable: observableTypes.property,
				route:[
					{observable: observableTypes.link, rel: rels.content},
					{observable: observableTypes.subEntity, rel: rels.description}
				]
			}
		}
	}
}

customHypermediaElement('d2l-activity-description-content', ActivityDescriptionContent, 'd2l-activity-description', [['user-content-activity']]);
