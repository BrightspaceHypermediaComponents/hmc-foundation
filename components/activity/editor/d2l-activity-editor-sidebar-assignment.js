import './d2l-activity-editor-availability.js';

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
			<d2l-activity-editor-availability href="${this.href}" .token="${this.token}"></d2l-activity-editor-availability>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-sidebar-assignment', ActivityEditorSidebarAssignment, 'd2l-activity-editor-sidebar', [['assignment-activity']]);
