import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin, observableTypes } from '../../../framework/hypermedia-lit-mixin.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityEditorSubmission extends HypermediaLitMixin(LitElement) {

	static get properties() {
		return {
			_specializationHref: { type: String, observable: observableTypes.link, rel: rels.specialization },
		};
	}

}

customHypermediaElement('d2l-activity-editor-submission', ActivityEditorSubmission, 'd2l-activity-name', [['assignment-activity']]);
