import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { DescriptionMixin } from './DescriptionMixin.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	survey: 'https://surveys.api.brightspace.com/rels/survey',
	description: 'https://surveys.api.brightspace.com/rels/description'
});

export class ActivityDescriptionSurvey extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				id: 'text',
				observable: observableTypes.property,
				route:[
					{observable: observableTypes.link, rel: rels.survey},
					{observable: observableTypes.subEntity, rel: rels.description}
				]
			}
		};
	}
}

customHypermediaElement('d2l-activity-description-survey', ActivityDescriptionSurvey, 'd2l-activity-description', [['user-survey-activity']]);
