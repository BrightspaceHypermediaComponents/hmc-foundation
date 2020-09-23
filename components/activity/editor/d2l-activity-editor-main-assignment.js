import './d2l-activity-editor-name.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';
import { observableTypes } from '../../../state/sirenComponents/sirenComponentFactory.js';

const rels = Object.freeze({
	assignment: 'https://api.brightspace.com/rels/assignment'
});

class ActivityEditorMainAssignment extends HypermediaLitMixin(LitElement) {

	static get properties() {
		return {
			_assignmentHref: { type: String, observable: observableTypes.link, rel: rels.assignment }
		};
	}

	render() {
		return html`
			<d2l-activity-editor-name href="${this._assignmentHref}" .token="${this.token}"></d2l-activity-editor-name>
			<div>Score</div> <div>Due Date</div>
			<div>Instructions</div>
			<div>Upload attachmenmts</div>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-main-assignment', ActivityEditorMainAssignment, 'd2l-activity-editor-main', 'assignment-activity');
