// START custom component imports
import './d2l-acitivity-editor-main-lp.js';
// END custom component imports

import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

class ActivityCollectionEditorMain extends HypermediaLitMixin(LitElement) {

	render() {
		return html`
			Main
		`;
	}
}

customHypermediaElement('d2l-activity-ecollection-editor', ActivityCollectionEditorMain, 'd2l-activity-ecollection-editor-main');
