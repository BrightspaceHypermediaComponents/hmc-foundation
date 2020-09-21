import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from '../../../framework/hypermedia-components.js';
import { HypermediaLitMixin } from '../../../framework/hypermedia-lit-mixin.js';

class ActivityEditorSidebarAssignment extends HypermediaLitMixin(LitElement) {

	static get styles() {
		return css`
			:host {
				background: var(--d2l-color-gypsum);
				display: block;
				height: 100%;
			}
		`;
	}

	render() {
		return html`
			Assignment sidebar
		`;
	}
}

customHypermediaElement('d2l-activity-editor-sidebar-assignment', ActivityEditorSidebarAssignment, 'd2l-activity-editor-sidebar', [['assignment-activity']]);
