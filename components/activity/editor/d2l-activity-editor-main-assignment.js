import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

class ActivityEditorMainAssignment extends HypermediaLitMixin(LitElement) {

	render() {
		return html`
			Assignment main
		`;
	}
}

customHypermediaElement('d2l-activity-editor-main-assignment', ActivityEditorMainAssignment, 'd2l-activity-editor-main', [['assignment']]);
