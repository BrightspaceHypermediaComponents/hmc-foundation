import '../../../common/d2l-hc-name.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

const rels = Object.freeze({
	quiz: 'https://api.brightspace.com/rels/quiz'
});

export class ActivityNameQuiz extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_quizHref: { type: String, observable: observableTypes.link, rel: rels.quiz, prime: true }
		};
	}

	render() {
		return html`
			<d2l-hc-name href="${this._quizHref}" .token="${this.token}"></d2l-hc-name>
		`;
	}

}

customHypermediaElement('d2l-activity-name-quiz', ActivityNameQuiz, 'd2l-activity-name', [['user-quiz-activity'], ['user-quiz-attempt-activity']]);
