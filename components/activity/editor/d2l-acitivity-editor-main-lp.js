import '../../activity-collection/editor/d2l-activity-collection-editor-lp.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

class ActivityEditorMainLP extends HypermediaLitMixin(LitElement) {

	render() {
		return html`
			<d2l-activity-collection-editor-lp href="${this.href}" .token="${this.token}"></d2l-activity-collection-editor-lp>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-main-lp', ActivityEditorMainLP, 'd2l-activity-editor-main', [['learning-path']]);
