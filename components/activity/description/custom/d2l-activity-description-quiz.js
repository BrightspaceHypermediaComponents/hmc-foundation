import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { DescriptionMixin } from './DescriptionMixin.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	description: 'https://quizzes.api.brightspace.com/rels/description',
	quiz: 'https://api.brightspace.com/rels/quiz'
});

export class ActivityDescriptionQuiz extends DescriptionMixin {
	static get properties() {
		return {
			_description: {
				type: String,
				id:'text',
				observable: observableTypes.property,
				route:[
					{observable: observableTypes.link, rel: rels.quiz},
					{observable: observableTypes.subEntity, rel: rels.description}
				]
			}
		};
	}
}

customHypermediaElement('d2l-activity-description-quiz', ActivityDescriptionQuiz, 'd2l-activity-description', [['user-quiz-activity'], ['user-quiz-attempt-activity']]);
