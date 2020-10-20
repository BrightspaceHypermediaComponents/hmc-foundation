import './d2l-activity-editor-availability.js';
import './d2l-activity-editor-submission.js';
import { css, LitElement } from 'lit-element/lit-element.js';
import { customHypermediaElement, html } from 'foundation-engine/framework/lit/hypermedia-components.js';
import { HypermediaStateMixin, observableTypes } from 'foundation-engine/framework/lit/HypermediaStateMixin.js';

const rels = Object.freeze({
	specialization: 'https://api.brightspace.com/rels/specialization'
});

class ActivityEditorSidebarAssignment extends HypermediaStateMixin(LitElement) {

	static get properties() {
		return {
			_specializationHref: { type: String, observable: observableTypes.link, rel: rels.specialization }
		};
	}

	static get styles() {
		return css`
			:host {
				background: var(--d2l-color-gypsum);
				display: block;
				height: 100%;
			}
			:host([hidden]) {
				display: none;
			}
			:host > * {
				display: block;
				background: var(--d2l-color-white);
				border-radius: 8px;
				margin-bottom: 10px;
				padding: 20px;
				padding-top: 0;
			}
		`;
	}

	render() {
		return html`
			<d2l-activity-editor-submission href="${this._specializationHref}" .token="${this.token}"></d2l-activity-editor-submission>
		`;
	}
}

customHypermediaElement('d2l-activity-editor-sidebar-assignment', ActivityEditorSidebarAssignment, 'd2l-activity-editor-sidebar', [['assignment-activity']]);
