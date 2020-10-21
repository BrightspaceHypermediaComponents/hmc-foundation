import './d2l-activity-editor-name.js';
import './d2l-activity-editor-score.js';
import { customHypermediaElement, html } from '@brightspace-hmc/foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin } from '@brightspace-hmc/foundation-engine/framework/lit/HypermediaStateMixin.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LitElement } from 'lit-element/lit-element.js';
import { observableTypes } from '@brightspace-hmc/foundation-engine/state/sirenComponents/sirenComponentFactory.js';

const rels = Object.freeze({
	assignment: 'https://api.brightspace.com/rels/assignment',
	instructions: 'https://assignments.api.brightspace.com/rels/instructions'
});

class ActivityEditorMainAssignment extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			instructions: { type: String, observable: observableTypes.property, route: [{
				observable: observableTypes.link,
				rel: rels.assignment }]
			},
			_assignmentHref: { type: String, observable: observableTypes.link, rel: rels.assignment }
		};
	}

	static get styles() {
		return [
			labelStyles
		];
	}

	render() {
		return html`
			<d2l-activity-editor-name href="${this._assignmentHref}" .token="${this.token}"></d2l-activity-editor-name>
			<d2l-activity-editor-score href="${this.href}" .token="${this.token}"></d2l-activity-editor-score>
			<label class="d2l-label-text">Instructions</label>
			<div>${this.instructions}</div>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-main-assignment', ActivityEditorMainAssignment, 'd2l-activity-editor-main', 'assignment-activity');
