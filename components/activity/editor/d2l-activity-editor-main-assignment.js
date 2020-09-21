import 'd2l-inputs/d2l-input-text.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

class ActivityEditorMainAssignment extends HypermediaLitMixin(LitElement) {

	static get properties() {
		return {
			_canEditName: { type: Boolean }
		};
	}

	constructor() {
		super();
		this._canEditName = true; //placeholder before we have actions
	}

	render() {
		return html`
			<div id="assignment-name-container">
				<div class="d2l-activity-label-container">
					<label class="d2l-label-text d2l-skeletize" for="assignment-name">Name*</label>
				</div>
				<d2l-input-text
					id="assignment-name"
					maxlength="128"
					value="${name}"
					aria-label="Name"
					?disabled="${!this._canEditName}"
					prevent-submit>
				</d2l-input-text>
			</div>
			<div>Score</div> <div>Due Date</div>
			<div>Instructions</div>
			<div>Upload attachmenmts</div>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-main-assignment', ActivityEditorMainAssignment, 'd2l-activity-editor-main', 'assignment-activity');
