import '../../../common/d2l-hc-name.js';
import { html, LitElement } from 'lit-element/lit-element.js';
import { HypermediaStateMixin, observableTypes } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { customHypermediaElement } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';

const rels = Object.freeze({
	survey: 'https://surveys.api.brightspace.com/rels/survey'
});

export class ActivityNameSurvey extends HypermediaStateMixin(LitElement) {
	static get properties() {
		return {
			_surveyHref: { type: String, observable: observableTypes.link, rel: rels.survey, prime: true }
		};
	}

	render() {
		return html`
			<d2l-hc-name href="${this._surveyHref}" .token="${this.token}"></d2l-hc-name>
		`;
	}

}

customHypermediaElement('d2l-activity-name-survey', ActivityNameSurvey, 'd2l-activity-name', [['user-survey-activity']]);
