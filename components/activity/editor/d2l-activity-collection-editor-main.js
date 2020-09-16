// START custom component imports
import '../collections/d2l-activity-collection-editor-learning-path.js'
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

customHypermediaElement('d2l-activity-collection-editor-main', ActivityCollectionEditorMain, 'd2l-activity-collection-editor-main');
