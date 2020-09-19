import { html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';
import { LitElement } from 'lit-element/lit-element.js';

class ActivityEditorSidebar extends HypermediaLitMixin(LitElement) {

	render() {
		return html`
			Sidebar
		`;
	}
}

customElements.define('d2l-activity-editor-sidebar', ActivityEditorSidebar);
